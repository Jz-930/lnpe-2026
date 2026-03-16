from __future__ import annotations

import concurrent.futures
import hashlib
import json
import re
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, unquote, urljoin, urlparse, urlunparse

import requests
from bs4 import BeautifulSoup

ROOT_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = ROOT_DIR / "og_img"
SITE_BASE = "https://www.lnpe.net"
SITE_DOMAIN = "www.lnpe.net"
SANITY_API = "https://gzrvdxzr.api.sanity.io/v2021-10-21/data/query/production"
IMAGE_EXTS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".svg",
    ".ico",
    ".bmp",
    ".avif",
    ".tif",
    ".tiff",
}
SECTIONS = {
    "brand": "00_brand",
    "shared": "01_shared",
    "home": "02_home",
    "about": "03_about",
    "products": "04_products",
    "applications": "05_applications",
    "projects": "06_projects",
    "news": "07_news",
    "unmapped": "08_unmapped",
}

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (compatible; LNPEAssetDownloader/1.0)"})


@dataclass
class Entry:
    dest_rel: str
    source_url: str
    source_kind: str
    group: str
    series_key: str
    label: str
    pages: list[str] = field(default_factory=list)
    sanity_ref: str | None = None
    width: int | None = None
    height: int | None = None
    notes: list[str] = field(default_factory=list)


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def slugify(text: str | None, fallback: str = "item") -> str:
    if not text:
        return fallback
    cleaned = re.sub(r"[^A-Za-z0-9]+", "-", text.strip().lower()).strip("-")
    return cleaned or fallback


def canon(url: str) -> str:
    parsed = urlparse(url)
    return urlunparse((parsed.scheme or "https", parsed.netloc, parsed.path or "/", parsed.params, parsed.query, ""))


def strip_query(url: str) -> str:
    parsed = urlparse(url)
    return urlunparse((parsed.scheme, parsed.netloc, parsed.path, parsed.params, "", ""))


def same_site(url: str) -> bool:
    parsed = urlparse(url)
    return parsed.scheme in {"http", "https"} and parsed.netloc == SITE_DOMAIN


def is_image(url: str) -> bool:
    return any(urlparse(url).path.lower().endswith(ext) for ext in IMAGE_EXTS)


def css_urls(text: str, base_url: str) -> list[str]:
    results: list[str] = []
    for match in re.findall(r"url\(([^)]+)\)", text or ""):
        value = match.strip().strip("\"'")
        if value and not value.startswith("data:"):
            results.append(canon(urljoin(base_url, value)))
    return results


def srcset_urls(value: str) -> list[str]:
    results: list[str] = []
    for part in value.split(","):
        candidate = part.strip().split(" ")[0]
        if candidate:
            results.append(candidate)
    return results


def normalize_asset(url: str) -> str:
    resolved = canon(url)
    parsed = urlparse(resolved)
    if parsed.path == "/_next/image":
        raw = parse_qs(parsed.query).get("url", [""])[0]
        if raw:
            resolved = canon(urljoin(SITE_BASE, unquote(raw)))
    if "cdn.sanity.io/images/" in resolved:
        resolved = strip_query(resolved)
    return resolved


def file_ext(url: str, fallback: str = ".bin") -> str:
    return Path(urlparse(url).path).suffix.lower() or fallback


def local_stem(url: str) -> str:
    name = Path(urlparse(url).path).name
    stem = re.sub(r"\.[0-9a-f]{8,}(?=\.)", "", name)
    return slugify(Path(stem).stem, "asset")


def query(query_text: str) -> Any:
    response = session.get(SANITY_API, params={"query": query_text}, timeout=60)
    response.raise_for_status()
    return response.json()["result"]


def query_all(doc_type: str, projection: str = "{...}") -> list[dict[str, Any]]:
    count = query(f'count(*[_type=="{doc_type}"])')
    docs: list[dict[str, Any]] = []
    for start in range(0, count, 100):
        end = min(start + 100, count)
        docs.extend(query(f'*[_type=="{doc_type}"][{start}...{end}]{projection}'))
    return docs


def asset_ref(image_obj: Any) -> str | None:
    if isinstance(image_obj, dict):
        asset = image_obj.get("asset")
        if isinstance(asset, dict):
            return asset.get("_ref")
    return None


def collect_refs(obj: Any, refs: list[str]) -> None:
    if isinstance(obj, dict):
        if obj.get("_type") == "image":
            ref = asset_ref(obj)
            if ref:
                refs.append(ref)
        for value in obj.values():
            collect_refs(value, refs)
    elif isinstance(obj, list):
        for item in obj:
            collect_refs(item, refs)


def crawl_site() -> dict[str, Any]:
    queue = [f"{SITE_BASE}/"]
    visited: set[str] = set()
    page_assets: dict[str, set[str]] = defaultdict(set)
    pages: list[dict[str, Any]] = []
    inline_svgs: dict[str, dict[str, Any]] = {}
    script_to_pages: dict[str, set[str]] = defaultdict(set)
    css_to_pages: dict[str, set[str]] = defaultdict(set)

    while queue:
        page_url = queue.pop(0)
        if page_url in visited:
            continue
        visited.add(page_url)
        response = session.get(page_url, timeout=60)
        pages.append(
            {
                "url": page_url,
                "status": response.status_code,
                "content_type": response.headers.get("content-type", ""),
            }
        )
        if response.status_code != 200 or "text/html" not in response.headers.get("content-type", ""):
            continue

        soup = BeautifulSoup(response.text, "html.parser")
        for link in soup.find_all("a", href=True):
            target = canon(urljoin(page_url, link["href"]))
            if same_site(target):
                parsed = urlparse(target)
                target = urlunparse((parsed.scheme, parsed.netloc, parsed.path or "/", parsed.params, "", ""))
                if target not in visited and target not in queue:
                    queue.append(target)

        for tag in soup.find_all(True):
            values: list[str] = []
            for attr in ("src", "href", "content", "poster", "data-src"):
                value = tag.get(attr)
                if value:
                    values.append(value)
            for attr in ("srcset", "imagesrcset"):
                value = tag.get(attr)
                if value:
                    values.extend(srcset_urls(value))
            if tag.get("style"):
                values.extend(css_urls(tag.get("style"), page_url))

            for value in values:
                if value.startswith("data:"):
                    continue
                asset_url = canon(urljoin(page_url, value))
                normalized = normalize_asset(asset_url)
                if is_image(normalized) or urlparse(asset_url).path == "/_next/image":
                    page_assets[page_url].add(normalized)

            if tag.name == "script" and tag.get("src"):
                script_to_pages[canon(urljoin(page_url, tag["src"]))].add(page_url)
            if tag.name == "link" and tag.get("href"):
                rels = {rel.lower() for rel in tag.get("rel", [])}
                if "stylesheet" in rels:
                    css_to_pages[canon(urljoin(page_url, tag["href"]))].add(page_url)
            if tag.name == "svg":
                svg_text = str(tag)
                svg_hash = hashlib.sha1(svg_text.encode("utf-8")).hexdigest()
                info = inline_svgs.setdefault(svg_hash, {"svg": svg_text, "count": 0, "pages": set()})
                info["count"] += 1
                info["pages"].add(page_url)

        for asset_url in css_urls(response.text, page_url):
            normalized = normalize_asset(asset_url)
            if is_image(normalized):
                page_assets[page_url].add(normalized)

    asset_usage: dict[str, set[str]] = defaultdict(set)
    for page, assets in page_assets.items():
        for asset in assets:
            asset_usage[asset].add(page)

    for css_url, owner_pages in css_to_pages.items():
        response = session.get(css_url, timeout=60)
        response.raise_for_status()
        for asset_url in css_urls(response.text, css_url):
            normalized = normalize_asset(asset_url)
            if is_image(normalized):
                asset_usage[normalized].update(owner_pages)

    for script_url, owner_pages in script_to_pages.items():
        response = session.get(script_url, timeout=60)
        response.raise_for_status()
        for match in re.findall(r'/_next/static/media/[^"\' )]+', response.text):
            normalized = normalize_asset(urljoin(SITE_BASE, match))
            if is_image(normalized):
                asset_usage[normalized].update(owner_pages)

    return {
        "pages": pages,
        "asset_usage": {asset: sorted(pages) for asset, pages in asset_usage.items()},
        "inline_svgs": {
            svg_hash: {
                "svg": payload["svg"],
                "count": payload["count"],
                "pages": sorted(payload["pages"]),
            }
            for svg_hash, payload in inline_svgs.items()
        },
    }


def ordered_slugs(section: str) -> list[str]:
    response = session.get(urljoin(f"{SITE_BASE}/", section.lstrip("/")), timeout=60)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    prefix = section.rstrip("/") + "/"
    result: list[str] = []
    seen: set[str] = set()
    for link in soup.find_all("a", href=True):
        target = canon(urljoin(response.url, link["href"]))
        parsed = urlparse(target)
        if parsed.netloc != SITE_DOMAIN or not parsed.path.startswith(prefix):
            continue
        slug = parsed.path[len(prefix):].strip("/")
        if slug and "/" not in slug and slug not in seen:
            seen.add(slug)
            result.append(slug)
    return result


def sort_docs(docs: list[dict[str, Any]], order: list[str]) -> list[dict[str, Any]]:
    order_map = {slug: index for index, slug in enumerate(order)}
    return sorted(docs, key=lambda doc: (order_map.get(doc.get("slug", {}).get("current", ""), 10_000), doc.get("slug", {}).get("current", "")))


def build_entries(crawl: dict[str, Any], assets_by_ref: dict[str, dict[str, Any]]) -> tuple[list[Entry], dict[str, Any]]:
    ensure_dir(OUTPUT_DIR)
    entries: list[Entry] = []
    source_urls: set[str] = set()
    asset_usage = {url: set(pages) for url, pages in crawl["asset_usage"].items()}
    products = sort_docs(query_all("product"), ordered_slugs("/products"))
    projects = sort_docs(query_all("project"), ordered_slugs("/projects"))
    news = sort_docs(query_all("news"), ordered_slugs("/news"))
    categories = sorted(query_all("materialCategory"), key=lambda doc: (doc.get("title") or "", doc.get("slug", {}).get("current", "")))
    materials = query_all("materialItem")
    product_slugs = {doc.get("slug", {}).get("current", "") for doc in products}

    def asset_meta(ref: str | None) -> tuple[str | None, int | None, int | None]:
        if not ref:
            return None, None, None
        asset = assets_by_ref.get(ref)
        if not asset:
            return None, None, None
        dims = (asset.get("metadata") or {}).get("dimensions") or {}
        return asset.get("url"), dims.get("width"), dims.get("height")

    def add(entry: Entry) -> None:
        entries.append(entry)
        if entry.source_kind != "inline-svg":
            source_urls.add(normalize_asset(entry.source_url))

    for asset_url, pages in sorted(asset_usage.items()):
        stem = local_stem(asset_url)
        ext = file_ext(asset_url)
        paths = {urlparse(page).path for page in pages}
        if stem == "lnpe-logo":
            add(Entry(f"{SECTIONS['brand']}/logo_01_lnpe-logo{ext}", asset_url, "site-static", "brand", "brand", "logo", sorted(pages)))
        elif stem == "lnpe-icon":
            add(Entry(f"{SECTIONS['brand']}/icon_01_lnpe-icon{ext}", asset_url, "site-static", "brand", "brand", "icon", sorted(pages)))
        elif Path(urlparse(asset_url).path).name.lower() == "favicon.ico":
            add(Entry(f"{SECTIONS['brand']}/favicon_01{ext}", asset_url, "site-static", "brand", "brand", "favicon", sorted(pages)))
        elif stem == "hero-bg":
            add(Entry(f"{SECTIONS['shared']}/background_01_hero-bg{ext}", asset_url, "site-static", "shared", "shared", "hero-bg", sorted(pages)))
        elif stem == "path-to-grid-texture":
            add(Entry(f"{SECTIONS['shared']}/pattern_01_grid-texture{ext}", asset_url, "site-static", "shared", "shared", "grid-texture", sorted(pages)))
        elif stem == "research":
            add(Entry(f"{SECTIONS['home']}/home_01_research{ext}", asset_url, "site-static", "home", "home", "research", sorted(pages)))
        elif stem == "world-map":
            add(Entry(f"{SECTIONS['about']}/about_01_world-map{ext}", asset_url, "site-static", "about", "about", "world-map", sorted(pages)))
        elif stem == "jet-pulverizer" and "/about" in paths and "/products" not in paths and "/" not in paths:
            add(Entry(f"{SECTIONS['about']}/about_02_jet-pulverizer{ext}", asset_url, "site-static", "about", "about", "about-image", sorted(pages)))

    listing_assets: dict[str, str] = {}
    for asset_url, pages in asset_usage.items():
        stem = local_stem(asset_url)
        if stem in product_slugs:
            paths = {urlparse(page).path for page in pages}
            if "/about" in paths and "/products" not in paths and "/" not in paths:
                continue
            listing_assets.setdefault(stem, asset_url)

    for index, doc in enumerate(products, start=1):
        slug = doc.get("slug", {}).get("current") or f"product-{index:02d}"
        title = doc.get("title") or slug
        folder = f"{SECTIONS['products']}/product_{index:02d}_{slugify(slug)}"
        if listing_assets.get(slug):
            url = listing_assets[slug]
            add(Entry(f"{folder}/product_{index:02d}_listing{file_ext(url)}", url, "site-static", "products", folder, f"{title} listing", sorted(asset_usage.get(url, []))))
        used: set[str] = set()
        for role, ref, name in [("cover", asset_ref(doc.get("featuredImage")), "cover")]:
            url, width, height = asset_meta(ref)
            if url:
                add(Entry(f"{folder}/product_{index:02d}_{name}{file_ext(url)}", url, "sanity", "products", folder, f"{title} {name}", [f"{SITE_BASE}/products/{slug}"], ref, width, height))
                used.add(ref)
        for image_index, image_obj in enumerate(doc.get("gallery") or [], start=1):
            ref = asset_ref(image_obj)
            if not ref or ref in used:
                continue
            url, width, height = asset_meta(ref)
            if url:
                add(Entry(f"{folder}/product_{index:02d}_gallery_{image_index:02d}{file_ext(url)}", url, "sanity", "products", folder, f"{title} gallery {image_index:02d}", [f"{SITE_BASE}/products/{slug}"], ref, width, height))
                used.add(ref)
        extras: list[str] = []
        collect_refs(doc, extras)
        extra_index = 1
        for ref in extras:
            if ref in used:
                continue
            url, width, height = asset_meta(ref)
            if url:
                add(Entry(f"{folder}/product_{index:02d}_extra_{extra_index:02d}{file_ext(url)}", url, "sanity", "products", folder, f"{title} extra {extra_index:02d}", [f"{SITE_BASE}/products/{slug}"], ref, width, height))
                used.add(ref)
                extra_index += 1

    category_docs = {doc["_id"]: doc for doc in categories}
    items_by_category: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in materials:
        items_by_category[(item.get("category") or {}).get("_ref", "uncategorized")].append(item)
    for category_index, category in enumerate(categories, start=1):
        category_slug = category.get("slug", {}).get("current") or slugify(category.get("title"), f"category-{category_index:02d}")
        category_title = category.get("title") or category_slug
        folder = f"{SECTIONS['applications']}/category_{category_index:02d}_{slugify(category_slug)}"
        items = sorted(items_by_category.get(category["_id"], []), key=lambda item: (item.get("name") or "", item.get("slug", {}).get("current", "")))
        for item_index, item in enumerate(items, start=1):
            ref = asset_ref(item.get("image"))
            url, width, height = asset_meta(ref)
            if not url:
                continue
            item_slug = item.get("slug", {}).get("current") or slugify(item.get("name"), f"material-{item_index:03d}")
            add(Entry(f"{folder}/material_{item_index:03d}_{slugify(item_slug)}{file_ext(url)}", url, "sanity", "applications", folder, f"{category_title}: {item.get('name') or item_slug}", [f"{SITE_BASE}/applications"], ref, width, height))

    for index, docs in enumerate([projects, news], start=1):
        pass

    for index, doc in enumerate(projects, start=1):
        slug = doc.get("slug", {}).get("current") or f"project-{index:02d}"
        title = doc.get("title") or slug
        folder = f"{SECTIONS['projects']}/project_{index:02d}_{slugify(slug)}"
        used: set[str] = set()
        ref = asset_ref(doc.get("featuredImage"))
        url, width, height = asset_meta(ref)
        if url:
            add(Entry(f"{folder}/project_{index:02d}_cover{file_ext(url)}", url, "sanity", "projects", folder, f"{title} cover", [f"{SITE_BASE}/projects/{slug}"], ref, width, height))
            used.add(ref)
        content_index = 1
        for block in doc.get("content") or []:
            ref = asset_ref(block)
            if not ref or ref in used:
                continue
            url, width, height = asset_meta(ref)
            if url:
                add(Entry(f"{folder}/project_{index:02d}_content_{content_index:02d}{file_ext(url)}", url, "sanity", "projects", folder, f"{title} content {content_index:02d}", [f"{SITE_BASE}/projects/{slug}"], ref, width, height))
                used.add(ref)
                content_index += 1
        extras: list[str] = []
        collect_refs(doc, extras)
        extra_index = 1
        for ref in extras:
            if ref in used:
                continue
            url, width, height = asset_meta(ref)
            if url:
                add(Entry(f"{folder}/project_{index:02d}_extra_{extra_index:02d}{file_ext(url)}", url, "sanity", "projects", folder, f"{title} extra {extra_index:02d}", [f"{SITE_BASE}/projects/{slug}"], ref, width, height))
                used.add(ref)
                extra_index += 1

    for index, doc in enumerate(news, start=1):
        slug = doc.get("slug", {}).get("current") or f"news-{index:02d}"
        title = doc.get("title") or slug
        folder = f"{SECTIONS['news']}/news_{index:02d}_{slugify(slug)}"
        used: set[str] = set()
        ref = asset_ref(doc.get("featuredImage"))
        url, width, height = asset_meta(ref)
        if url:
            add(Entry(f"{folder}/news_{index:02d}_cover{file_ext(url)}", url, "sanity", "news", folder, f"{title} cover", [f"{SITE_BASE}/news/{slug}"], ref, width, height))
            used.add(ref)
        content_index = 1
        for block in doc.get("content") or []:
            ref = asset_ref(block)
            if not ref or ref in used:
                continue
            url, width, height = asset_meta(ref)
            if url:
                add(Entry(f"{folder}/news_{index:02d}_content_{content_index:02d}{file_ext(url)}", url, "sanity", "news", folder, f"{title} content {content_index:02d}", [f"{SITE_BASE}/news/{slug}"], ref, width, height))
                used.add(ref)
                content_index += 1
        extras: list[str] = []
        collect_refs(doc, extras)
        extra_index = 1
        for ref in extras:
            if ref in used:
                continue
            url, width, height = asset_meta(ref)
            if url:
                add(Entry(f"{folder}/news_{index:02d}_extra_{extra_index:02d}{file_ext(url)}", url, "sanity", "news", folder, f"{title} extra {extra_index:02d}", [f"{SITE_BASE}/news/{slug}"], ref, width, height))
                used.add(ref)
                extra_index += 1

    svg_items = sorted(crawl["inline_svgs"].items(), key=lambda item: (-item[1]["count"], item[0]))
    for index, (svg_hash, payload) in enumerate(svg_items, start=1):
        add(Entry(f"{SECTIONS['brand']}/inline_icon_{index:02d}.svg", svg_hash, "inline-svg", "brand", "brand", f"inline icon {index:02d}", payload["pages"]))

    unmapped_index = 1
    for asset_url, pages in sorted(asset_usage.items()):
        normalized = normalize_asset(asset_url)
        if normalized in source_urls:
            continue
        if not is_image(normalized):
            continue
        add(Entry(f"{SECTIONS['unmapped']}/unmapped_{unmapped_index:03d}_{local_stem(normalized)}{file_ext(normalized)}", normalized, "site-unmapped", "unmapped", "unmapped", local_stem(normalized), sorted(pages), notes=["Found on the live site but not mapped to a named content group."]))
        unmapped_index += 1

    manifest = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "site": SITE_BASE,
        "pages_discovered": sorted([page["url"] for page in crawl["pages"] if page["status"] == 200 and "text/html" in page["content_type"]]),
        "counts": {
            "products": len(products),
            "projects": len(projects),
            "news": len(news),
            "material_categories": len(categories),
            "material_items": len(materials),
            "inline_svgs": len(svg_items),
            "download_entries": len(entries),
            "unique_source_urls": len(source_urls),
        },
    }
    return entries, manifest


def save_entry(entry: Entry, inline_svgs: dict[str, Any]) -> dict[str, Any]:
    dest = OUTPUT_DIR / entry.dest_rel
    ensure_dir(dest.parent)
    if entry.source_kind == "inline-svg":
        svg_text = inline_svgs[entry.source_url]["svg"]
        dest.write_text(svg_text, encoding="utf-8")
        return {"dest_rel": entry.dest_rel, "status": "saved", "bytes": len(svg_text.encode("utf-8")), "content_type": "image/svg+xml"}
    response = session.get(entry.source_url, timeout=120)
    if response.status_code != 200:
        return {"dest_rel": entry.dest_rel, "status": "failed", "status_code": response.status_code, "source_url": entry.source_url}
    dest.write_bytes(response.content)
    return {"dest_rel": entry.dest_rel, "status": "saved", "bytes": len(response.content), "content_type": response.headers.get("content-type", "")}


def write_reports(entries: list[Entry], results: list[dict[str, Any]], manifest: dict[str, Any]) -> None:
    by_path = {result["dest_rel"]: result for result in results}
    files: list[dict[str, Any]] = []
    failed: list[dict[str, Any]] = []
    for entry in entries:
        result = by_path.get(entry.dest_rel, {})
        record = {
            "dest_rel": entry.dest_rel,
            "source_url": entry.source_url if entry.source_kind != "inline-svg" else "inline-svg",
            "source_kind": entry.source_kind,
            "group": entry.group,
            "series_key": entry.series_key,
            "label": entry.label,
            "pages": entry.pages,
            "sanity_ref": entry.sanity_ref,
            "width": entry.width,
            "height": entry.height,
            "status": result.get("status", "unknown"),
            "bytes": result.get("bytes"),
            "content_type": result.get("content_type"),
            "notes": entry.notes,
        }
        files.append(record)
        if record["status"] != "saved":
            failed.append(record)
    manifest["files"] = files
    manifest["failed"] = failed
    manifest["counts"]["saved_files"] = len(files) - len(failed)
    manifest["counts"]["failed_files"] = len(failed)
    (OUTPUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    readme = [
        "# LNPE asset export",
        "",
        f"- Source site: {SITE_BASE}",
        f"- Generated at (UTC): {manifest['generated_at']}",
        f"- Pages discovered: {len(manifest['pages_discovered'])}",
        f"- Saved files: {manifest['counts']['saved_files']}",
        f"- Failed files: {manifest['counts']['failed_files']}",
        "",
        "## Folder layout",
        "",
        "- `00_brand`: logo, icon, favicon, inline SVG icons",
        "- `01_shared`: shared backgrounds and patterns",
        "- `02_home`: homepage-only images",
        "- `03_about`: about-only images",
        "- `04_products`: one folder per product page",
        "- `05_applications`: materials grouped by category",
        "- `06_projects`: one folder per project page",
        "- `07_news`: one folder per news page",
        "- `08_unmapped`: live-site images that did not map cleanly",
        "",
        "See `manifest.json` for every source URL, saved path, page usage, and failed download.",
    ]
    if failed:
        readme.extend(["", "## Failed assets", ""])
        for item in failed:
            readme.append(f"- `{item['dest_rel']}` <- `{item['source_url']}`")
    (OUTPUT_DIR / "README.md").write_text("\n".join(readme) + "\n", encoding="utf-8")


def main() -> None:
    print("Crawling live site...")
    crawl = crawl_site()
    print("Fetching Sanity asset metadata...")
    assets_by_ref = {asset["_id"]: asset for asset in query_all("sanity.imageAsset", "{_id,url,metadata{dimensions}}")}
    print("Building download plan...")
    entries, manifest = build_entries(crawl, assets_by_ref)
    print(f"Prepared {len(entries)} files.")
    results: list[dict[str, Any]] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        futures = [executor.submit(save_entry, entry, crawl["inline_svgs"]) for entry in entries]
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())
    write_reports(entries, results, manifest)
    saved = sum(1 for result in results if result.get("status") == "saved")
    failed = sum(1 for result in results if result.get("status") != "saved")
    print(f"Saved {saved} files.")
    print(f"Failed {failed} files.")
    print(f"Output: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
