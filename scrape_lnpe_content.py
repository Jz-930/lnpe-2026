from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as html_to_markdown


BASE_URL = "https://www.lnpe.net"
SANITY_API = "https://gzrvdxzr.api.sanity.io/v2021-10-21/data/query/production"
OUTPUT_DIR = Path("og_content")
TIMEZONE_LABEL = "America/Toronto"

INDIVIDUAL_EXPORTS = [
    ("/", "home.txt"),
    ("/about", "about.txt"),
    ("/applications", "applications.txt"),
    ("/contact-us", "contact-us.txt"),
    ("/news", "news.txt"),
    ("/products", "products.txt"),
    ("/projects", "projects.txt"),
]

GROUPED_EXPORTS = {
    "news": ("news__all_articles.txt", "/news/{slug}"),
    "product": ("products__all_product_pages.txt", "/products/{slug}"),
    "project": ("projects__all_project_pages.txt", "/projects/{slug}"),
}


def ensure_success(response: requests.Response) -> requests.Response:
    response.raise_for_status()
    return response


def query_sanity(session: requests.Session, query: str):
    response = ensure_success(
        session.get(SANITY_API, params={"query": query}, timeout=30)
    )
    payload = response.json()
    return payload["result"]


def get_grouped_paths(session: requests.Session) -> dict[str, list[str]]:
    queries = {
        "news": '*[_type == "news" && defined(slug.current)]{"slug": slug.current} | order(slug asc)',
        "product": '*[_type == "product" && defined(slug.current)]{"slug": slug.current} | order(slug asc)',
        "project": '*[_type == "project" && defined(slug.current)]{"slug": slug.current} | order(slug asc)',
        "material_category_count": 'count(*[_type == "materialCategory"])',
        "material_item_count": 'count(*[_type == "materialItem"])',
    }
    grouped_paths: dict[str, list[str]] = {}
    for key, query in queries.items():
        result = query_sanity(session, query)
        if key.endswith("_count"):
            grouped_paths[key] = [str(result)]
            continue
        grouped_paths[key] = [GROUPED_EXPORTS[key][1].format(slug=item["slug"]) for item in result]
    return grouped_paths


def get_application_materials(session: requests.Session):
    query = (
        '*[_type == "materialCategory"] | order(order asc){'
        'title, "slug": slug.current, '
        '"materials": *[_type == "materialItem" && references(^._id)] | order(name asc){name, "slug": slug.current}'
        "}"
    )
    return query_sanity(session, query)


def replace_form_controls(soup: BeautifulSoup) -> None:
    for tag in soup.find_all(["input", "textarea", "select"]):
        if tag.name == "input" and tag.get("type", "").lower() == "hidden":
            tag.decompose()
            continue

        fragments: list[str] = []
        placeholder = tag.get("placeholder")
        if placeholder:
            fragments.append(placeholder.strip())

        value = tag.get("value")
        if value and tag.name in {"input"}:
            fragments.append(value.strip())

        if tag.name == "select":
            options = [
                option.get_text(" ", strip=True)
                for option in tag.find_all("option")
                if option.get_text(" ", strip=True)
            ]
            if options:
                fragments.append("Options: " + "; ".join(options))

        if fragments:
            tag.replace_with(soup.new_string(" / ".join(dict.fromkeys(fragments))))
        else:
            tag.decompose()


def cleanup_dom(soup: BeautifulSoup) -> BeautifulSoup:
    for tag in soup.find_all(
        [
            "script",
            "style",
            "noscript",
            "template",
            "svg",
            "path",
            "meta",
            "link",
            "picture",
            "source",
            "iframe",
            "canvas",
            "img",
        ]
    ):
        tag.decompose()

    for tag in soup.select('[hidden], [aria-hidden="true"], .sr-only'):
        tag.decompose()

    for tag in soup.find_all(style=True):
        style_value = tag.get("style", "").replace(" ", "").lower()
        if "display:none" in style_value or "visibility:hidden" in style_value:
            tag.decompose()

    replace_form_controls(soup)
    return soup


def normalize_markdown(markdown: str) -> str:
    markdown = markdown.replace("\r\n", "\n").replace("\r", "\n")
    markdown = markdown.replace("\\*", "*")
    markdown = re.sub(r"\n{3,}", "\n\n", markdown)
    markdown = re.sub(r"[ \t]+\n", "\n", markdown)
    markdown = re.sub(r"\n +#", "\n#", markdown)
    return markdown.strip() + "\n"


def fetch_markdown(session: requests.Session, path: str) -> str:
    response = ensure_success(session.get(urljoin(BASE_URL, path), timeout=30))
    response.encoding = "utf-8"
    soup = BeautifulSoup(response.text, "html.parser")
    cleanup_dom(soup)
    body = soup.body or soup
    markdown = html_to_markdown(
        str(body),
        heading_style="ATX",
        bullets="-",
        strip=["img"],
    )
    return normalize_markdown(markdown)


def write_text(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")


def build_page_document(title: str, source_url: str, markdown: str) -> str:
    return (
        f"# {title}\n\n"
        f"- Source: {source_url}\n\n"
        f"{markdown}"
    )


def build_grouped_document(
    heading: str,
    intro_lines: Iterable[str],
    entries: list[tuple[str, str, str]],
) -> str:
    chunks = [f"# {heading}\n"]
    for line in intro_lines:
        chunks.append(f"- {line}\n")
    chunks.append("\n")
    for index, (path, source_url, markdown) in enumerate(entries, start=1):
        chunks.append(f"## {index}. {path}\n\n")
        chunks.append(f"- Source: {source_url}\n\n")
        chunks.append(markdown)
        if not markdown.endswith("\n"):
            chunks.append("\n")
        chunks.append("\n---\n\n")
    return "".join(chunks).rstrip() + "\n"


def build_application_materials_appendix(material_categories) -> str:
    chunks = [
        "## Full Application Material Categories",
        "",
        "The live applications page ships the full category/item data but only one category is rendered in the visible DOM at a time.",
        "This appendix adds every material category and material name found in that live page data so nothing is omitted.",
        "",
    ]
    for category in material_categories:
        chunks.append(f"### {category['title']}")
        chunks.append("")
        for material in category["materials"]:
            name = material["name"].replace("\u200b", "").strip()
            chunks.append(f"- {name}")
        chunks.append("")
    return "\n".join(chunks).rstrip() + "\n"


def main() -> None:
    OUTPUT_DIR.mkdir(exist_ok=True)
    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/123.0.0.0 Safari/537.36"
            )
        }
    )

    grouped_paths = get_grouped_paths(session)
    application_materials = get_application_materials(session)

    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    inventory_lines = [
        "# LNPE Export Inventory",
        "",
        f"- Base URL: {BASE_URL}",
        f"- Generated At: {generated_at} ({TIMEZONE_LABEL})",
        "- Export Format: `.txt` files containing markdown-formatted text extracted from the live site.",
        "- Broken Link Not Exported: `/aboout` returns HTTP 404 and was treated as a broken footer link, not a real content page.",
        "",
        "## Individual Page Exports",
    ]

    for page_path, filename in INDIVIDUAL_EXPORTS:
        source_url = urljoin(BASE_URL, page_path)
        markdown = fetch_markdown(session, page_path)
        if page_path == "/applications":
            markdown = (
                markdown.rstrip()
                + "\n\n"
                + build_application_materials_appendix(application_materials)
            )
        title = page_path if page_path != "/" else "/ (home)"
        document = build_page_document(title, source_url, markdown)
        write_text(OUTPUT_DIR / filename, document)
        inventory_lines.append(f"- `{filename}` <- `{page_path}`")

    inventory_lines.extend(
        [
            "",
            "## Grouped CMS Page Exports",
            f"- `news__all_articles.txt` <- {len(grouped_paths['news'])} news detail pages verified via Sanity CMS",
            f"- `products__all_product_pages.txt` <- {len(grouped_paths['product'])} product detail pages verified via Sanity CMS",
            f"- `projects__all_project_pages.txt` <- {len(grouped_paths['project'])} project detail pages verified via Sanity CMS",
            "",
            "## Applications Coverage Cross-Check",
            f"- Material categories visible through the site data: {grouped_paths['material_category_count'][0]}",
            f"- Material items visible through the site data: {grouped_paths['material_item_count'][0]}",
            "- These application materials are captured inside `applications.txt` because the live site does not expose separate public detail routes for them.",
            "",
            "## CMS Route Lists",
            "",
            "### News Routes",
        ]
    )
    inventory_lines.extend(f"- `{path}`" for path in grouped_paths["news"])
    inventory_lines.extend(["", "### Product Routes"])
    inventory_lines.extend(f"- `{path}`" for path in grouped_paths["product"])
    inventory_lines.extend(["", "### Project Routes"])
    inventory_lines.extend(f"- `{path}`" for path in grouped_paths["project"])
    inventory_lines.append("")

    grouped_docs_config = {
        "news": (
            "LNPE News Articles",
            [
                "Grouped because these detail pages are generated from the CMS.",
                f"Verified article count: {len(grouped_paths['news'])}",
            ],
        ),
        "product": (
            "LNPE Product Detail Pages",
            [
                "Grouped because these detail pages are generated from the CMS.",
                f"Verified product page count: {len(grouped_paths['product'])}",
            ],
        ),
        "project": (
            "LNPE Project Detail Pages",
            [
                "Grouped because these detail pages are generated from the CMS.",
                f"Verified project page count: {len(grouped_paths['project'])}",
            ],
        ),
    }

    for doc_type, (filename, _) in GROUPED_EXPORTS.items():
        entries: list[tuple[str, str, str]] = []
        for path in grouped_paths[doc_type]:
            source_url = urljoin(BASE_URL, path)
            markdown = fetch_markdown(session, path)
            entries.append((path, source_url, markdown))
        heading, intro_lines = grouped_docs_config[doc_type]
        document = build_grouped_document(heading, intro_lines, entries)
        write_text(OUTPUT_DIR / filename, document)

    write_text(OUTPUT_DIR / "00_inventory.txt", "\n".join(inventory_lines))
    print(f"Export complete: {OUTPUT_DIR.resolve()}")


if __name__ == "__main__":
    main()
