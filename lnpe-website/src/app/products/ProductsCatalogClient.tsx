"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3, SlidersHorizontal } from "lucide-react";
import {
  PRODUCT_CATALOG,
  PRODUCT_CATEGORIES,
  type ProductCategory,
  getProductListingImage,
} from "./product-catalog";

export function ProductsCatalogClient() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All Systems");

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All Systems") return PRODUCT_CATALOG;
    return PRODUCT_CATALOG.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="bg-[#f6f8fb] py-12 md:py-16">
      <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[112px] border border-[#dbe3ee] bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <div className="mb-5 flex items-center gap-2 border-b border-[#e5eaf2] pb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#536276]">
              <SlidersHorizontal size={15} />
              Product Families
            </div>
            <div className="space-y-1">
              {PRODUCT_CATEGORIES.map((category) => {
                const active = category === activeCategory;
                const count =
                  category === "All Systems"
                    ? PRODUCT_CATALOG.length
                    : PRODUCT_CATALOG.filter((product) => product.category === category).length;

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
                    <span>{category}</span>
                    <span className={active ? "font-semibold text-[#f26522]" : "text-[#9aa8b8]"}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-8 flex gap-3 overflow-x-auto pb-2 lg:hidden">
            {PRODUCT_CATEGORIES.map((category) => {
              const active = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 border px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "border-[#f26522] bg-[#f26522] text-white"
                      : "border-[#dbe3ee] bg-white text-[#536276]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mb-6 flex flex-col gap-3 border-b border-[#dbe3ee] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[#142033] md:text-3xl">
                Equipment catalog
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#62748a]">
                Browse LNPE grinding, classification, morphology-control, EPC, and laboratory systems by process role.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c]">
              <Layers3 size={17} />
              {visibleProducts.length} systems shown
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex min-h-[440px] flex-col overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#b5c6dc] hover:shadow-[0_24px_56px_rgba(15,23,42,0.12)]"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#f8fafc] via-[#edf3f9] to-[#e6edf5]">
                  <Image
                    src={getProductListingImage(product)}
                    alt={`${product.title} product image`}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 90vw"
                    className="object-contain p-7 transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute left-5 top-5 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#174a7c] shadow-sm">
                    {product.series}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f26522]">
                        {product.category}
                      </p>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-[#142033]">
                        {product.title}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#dbe3ee] text-[#174a7c] transition-colors group-hover:border-[#f26522] group-hover:text-[#f26522]">
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-6 text-[#5f6f84]">{product.summary}</p>

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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
