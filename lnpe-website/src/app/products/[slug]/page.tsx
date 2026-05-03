import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  PRODUCT_CATALOG,
  getProductBySlug,
  getProductCoverImage,
  getProductGalleryImages,
  getProductListingImage,
} from "../product-catalog";
import { ProductImageGallery } from "./ProductImageGallery";

export function generateStaticParams() {
  return PRODUCT_CATALOG.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCT_CATALOG.filter((item) => item.slug !== product.slug).slice(0, 3);
  const galleryImages = getProductGalleryImages(product);

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
      <div className="absolute left-0 right-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" />
      <Navbar />

      <div className="flex-1">
        <section className="border-b border-[#dbe3ee] bg-[#eef3f8]">
          <div className="container mx-auto px-6 py-10 md:py-16">
            <Link
              href="/products"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#536276] transition-colors hover:text-[#174a7c]"
            >
              <ChevronLeft size={17} />
              Back to Products
            </Link>

            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="min-w-0">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#f26522]">
                  {product.series} / {product.category}
                </p>
                <h1 className="font-display text-4xl font-semibold tracking-tight text-[#142033] md:text-6xl">
                  {product.title}
                </h1>
                <p className="mt-6 text-base leading-7 text-[#536276] md:text-lg md:leading-8">{product.principle}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/contact-us"
                    className="inline-flex min-w-max shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-[#142033] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f26522]"
                  >
                    <span className="whitespace-nowrap">Contact Us</span>
                    <ArrowRight size={17} />
                  </Link>
                  <Link
                    href="/contact-us"
                    className="inline-flex min-w-max shrink-0 items-center justify-center gap-2 whitespace-nowrap border border-[#cbd7e6] bg-white px-5 py-3 text-sm font-semibold text-[#142033] transition-colors hover:border-[#174a7c] hover:text-[#174a7c]"
                  >
                    <span className="whitespace-nowrap">Request Solution</span>
                    <ArrowRight size={17} />
                  </Link>
                  <Link
                    href="/applications"
                    className="inline-flex min-w-max shrink-0 items-center justify-center gap-2 whitespace-nowrap border border-[#cbd7e6] bg-white px-5 py-3 text-sm font-semibold text-[#142033] transition-colors hover:border-[#174a7c] hover:text-[#174a7c]"
                  >
                    <span className="whitespace-nowrap">View Applications</span>
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>

              <ProductImageGallery
                title={product.title}
                coverImage={getProductCoverImage(product)}
                galleryImages={galleryImages}
              />
            </div>
          </div>
        </section>

        <section className="border-b border-[#dbe3ee] bg-white">
          <div className="container mx-auto px-6 py-8">
            <div className="grid gap-4 md:grid-cols-4">
              {product.specs.map((spec) => (
                <div key={spec.label} className="border-l-2 border-[#f26522] bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7b8f]">{spec.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-5 text-[#142033]">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f8fb] py-14 md:py-20">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">Technical overview</h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-[#536276]">
                {product.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
                <h3 className="font-display text-xl font-semibold text-[#142033]">Key Features</h3>
                <div className="mt-5 space-y-4">
                  {product.features.map((feature, index) => (
                    <div key={feature} className="flex gap-3">
                      <span className="mt-1 text-xs font-bold text-[#f26522]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-6 text-[#536276]">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
                <h3 className="font-display text-xl font-semibold text-[#142033]">Applications</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.applications.map((application) => (
                    <span key={application} className="border border-[#dbe3ee] bg-[#f8fafc] px-3 py-2 text-sm text-[#536276]">
                      {application}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-[#dbe3ee] bg-[#142033] p-6 text-white md:col-span-2">
                <h3 className="font-display text-xl font-semibold">Technical Highlights</h3>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {product.technicalHighlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-3 border border-white/10 bg-white/5 px-4 py-3">
                      <span className="h-2 w-2 bg-[#f26522]" aria-hidden="true" />
                      <span className="text-sm text-[#dbe3ee]">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 md:py-18">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">Related systems</h2>
                <p className="mt-2 text-sm text-[#62748a]">Continue comparing LNPE process equipment and solution paths.</p>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] hover:text-[#f26522]">
                All Products
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/products/${related.slug}`}
                  className="group overflow-hidden border border-[#dbe3ee] bg-white transition hover:-translate-y-1 hover:border-[#b5c6dc] hover:shadow-[0_20px_44px_rgba(15,23,42,0.1)]"
                >
                  <div className="relative aspect-[16/10] bg-[#f2f6fa]">
                    <Image
                      src={getProductListingImage(related)}
                      alt={`${related.title} listing`}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-contain p-5 transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f26522]">{related.category}</p>
                    <h3 className="font-display text-xl font-semibold text-[#142033]">{related.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
