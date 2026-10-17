"use client";

import { useMemo, useState } from "react";
import InteractiveImage from "@/components/content/InteractiveImage";
import Link from "@/components/i18n/LocalizedLink";
import { ArrowRight, Layers3, SlidersHorizontal } from "lucide-react";
import {
  getProductCatalog,
  PRODUCT_CATEGORIES,
  type ProductCategory,
  getProductListingImage,
} from "./product-catalog";

import { useLocale } from "@/i18n/LocaleProvider";
import { catalogUi, productCategoryLabels, formatCatalogMessage } from "@/i18n/messages/catalog";
import touchStyles from "@/components/applications/TouchCatalog.module.css";

export function ProductsCatalogClient() {
  const locale = useLocale();
  const ui = catalogUi[locale];
  const products = useMemo(() => getProductCatalog(locale), [locale]);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");

  const visibleProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((product) => product.categoryId === activeCategory);
  }, [activeCategory, products]);

  return (
    <section className="bg-[#f6f8fb] py-12 md:py-16 max-lg:py-9">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-6 lg:grid-cols-[240px_minmax(0,1fr)] max-lg:px-5">
        <aside className="hidden lg:block">
          <div className="sticky top-[112px] border border-[#dbe3ee] bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <div className="mb-5 flex items-center gap-2 border-b border-[#e5eaf2] pb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#536276]">
              <SlidersHorizontal size={15} />
              {ui.productFamilies}
            </div>
            <div className="space-y-1">
              {PRODUCT_CATEGORIES.map((category) => {
                const active = category === activeCategory;
                const count =
                  category === "all"
                    ? products.length
                    : products.filter((product) => product.categoryId === category).length;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveCategory(category)}
                    className={`flex w-full items-center justify-between border-l-2 px-3 py-3 text-left text-sm transition-colors ${
                      active
                        ? "border-[#f26522] bg-[#fff4ee] text-[#142033]"
                        : "border-transparent text-[#5f6f84] hover:border-[#9bb7d7] hover:bg-[#f7faff] hover:text-[#142033]"
                    }`}
                  >
                    <span>{productCategoryLabels[locale][category]}</span>
                    <span className={active ? "font-semibold text-[#f26522]" : "text-[#9aa8b8]"}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-4 text-xs text-[#62748a] lg:hidden">
            <span className="font-semibold text-[#314155]">{ui.productFamilies}</span>
            <span>{locale === "zh" ? "左右滑动选择" : "Swipe to explore"} <span aria-hidden="true">↔</span></span>
          </div>
          <div className={`${touchStyles.rail} mb-7 flex gap-3 overflow-x-auto pb-2 lg:hidden`} aria-label={ui.productFamilies}>
            {PRODUCT_CATEGORIES.map((category) => {
              const active = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={(event) => {
                    setActiveCategory(category);
                    const button = event.currentTarget;
                    const rail = button.parentElement;
                    if (rail) rail.scrollTo({ left: rail.scrollLeft + button.getBoundingClientRect().left - rail.getBoundingClientRect().left - (rail.clientWidth - button.clientWidth) / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
                  }}
                  className={`shrink-0 border px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "border-[#f26522] bg-[#f26522] text-white"
                      : "border-[#dbe3ee] bg-white text-[#536276]"
                  }`}
                >
                  {productCategoryLabels[locale][category]}
                </button>
              );
            })}
          </div>

          <div className="mb-6 flex flex-col gap-3 border-b border-[#dbe3ee] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[#142033] md:text-3xl">
                {ui.equipmentCatalog}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#62748a]">
                {ui.catalogIntro}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c]" role="status" aria-live="polite" aria-atomic="true">
              <Layers3 size={17} />
              {visibleProducts.length} {ui.systemsShown}
            </div>
          </div>

          <div className={`${touchStyles.productGrid} grid gap-5 md:grid-cols-2 xl:grid-cols-3 max-lg:gap-4`}>
            {visibleProducts.map((product) => (
              <article
                key={product.slug}
                className={`${touchStyles.productCard} flex min-h-[440px] flex-col overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] max-lg:min-h-0`}
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#f8fafc] via-[#edf3f9] to-[#e6edf5] max-lg:aspect-[8/5]">
                  <InteractiveImage
                    src={getProductListingImage(product)}
                    alt={formatCatalogMessage(ui.productAlt, { title: product.title })}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 90vw"
                    className="object-contain p-7 transition duration-500 motion-safe:group-hover/zoom:scale-[1.04] max-lg:p-5"
                  />
                  <div className="pointer-events-none absolute left-5 top-5 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#174a7c] shadow-sm max-lg:left-3 max-lg:top-3">
                    {product.series}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 max-lg:p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f26522]">
                        {product.category}
                      </p>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-[#142033] max-lg:text-[22px] max-lg:leading-snug">
                        <Link href={`/products/${product.slug}`} className="hover:text-lnpe-blue">{product.title}</Link>
                      </h3>
                    </div>
                    <Link href={`/products/${product.slug}`} aria-label={`${ui.productOverview}: ${product.title}`} className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#dbe3ee] text-[#174a7c] transition-colors hover:border-[#f26522] hover:text-[#f26522] max-lg:hidden">
                      <ArrowRight size={18} />
                    </Link>
                  </div>

                  <p className="mb-5 text-sm leading-6 text-[#5f6f84]">{product.summary}</p>
                  <details className="mb-5 border-t border-[#e8edf4] pt-3 text-sm text-[#536276]"><summary className="cursor-pointer font-medium text-[#174a7c]">{locale === "zh" ? "就地查看工作原理" : "Explore how it works"}</summary><p className="mt-3 leading-7">{product.principle}</p><Link href={`/products/${product.slug}`} className="mt-3 inline-flex items-center gap-2 text-[#174a7c]">{ui.productOverview}<ArrowRight size={14} /></Link></details>

                  <div className="mt-auto flex flex-wrap gap-2 border-t border-[#e8edf4] pt-5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#dbe3ee] bg-[#f8fafc] px-2.5 py-1 text-xs font-medium text-[#536276]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/products/${product.slug}`} className="mt-5 flex min-h-12 items-center justify-between gap-3 border-t border-[#dbe3ee] pt-3 text-sm font-semibold text-[#174a7c] active:text-[#f26522] lg:hidden">
                    {ui.productOverview}<ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
