import type { Locale } from "@/i18n/config";
import { productCopy, productCategoryLabels, type ProductCopy, type ProductSlug } from "@/i18n/messages/catalog";

export type ProductCategory = "all" | "grinding" | "classification" | "morphology" | "turnkey" | "laboratory";
export type ProductSpec = ProductCopy["specs"][number];
type ProductDefinition = { slug: ProductSlug; categoryId: Exclude<ProductCategory, "all">; imageFolder: string; imagePrefix: string; galleryCount: number };
export type Product = ProductDefinition & ProductCopy & { category: string };

export const PRODUCT_CATEGORIES: ProductCategory[] = ["all", "grinding", "classification", "morphology", "turnkey", "laboratory"];
const PRODUCT_DEFINITIONS: ProductDefinition[] = [
  {
    "slug": "jet-mill",
    "categoryId": "grinding",
    "imageFolder": "product_01_jet-mill",
    "imagePrefix": "product_01",
    "galleryCount": 4
  },
  {
    "slug": "impact-mill",
    "categoryId": "grinding",
    "imageFolder": "product_02_impact-mill",
    "imagePrefix": "product_02",
    "galleryCount": 3
  },
  {
    "slug": "jet-pulverizer",
    "categoryId": "grinding",
    "imageFolder": "product_03_jet-pulverizer",
    "imagePrefix": "product_03",
    "galleryCount": 4
  },
  {
    "slug": "turnkey-epc",
    "categoryId": "turnkey",
    "imageFolder": "product_04_turnkey-epc",
    "imagePrefix": "product_04",
    "galleryCount": 4
  },
  {
    "slug": "shaping-mill",
    "categoryId": "morphology",
    "imageFolder": "product_05_shaping-mill",
    "imagePrefix": "product_05",
    "galleryCount": 0
  },
  {
    "slug": "air-classifier",
    "categoryId": "classification",
    "imageFolder": "product_06_air-classifier",
    "imagePrefix": "product_06",
    "galleryCount": 4
  },
  {
    "slug": "laboratory-equipment",
    "categoryId": "laboratory",
    "imageFolder": "product_07_laboratory-equipment",
    "imagePrefix": "product_07",
    "galleryCount": 4
  }
];

export function getProductCatalog(locale: Locale): Product[] {
  return PRODUCT_DEFINITIONS.map((product) => ({ ...product, ...productCopy[locale][product.slug], category: productCategoryLabels[locale][product.categoryId] }));
}

export const PRODUCT_CATALOG = getProductCatalog("en");

export function getProductBySlug(slug: string, locale: Locale = "en") {
  return getProductCatalog(locale).find((product) => product.slug === slug);
}

export function getProductListingImage(product: Product) {
  return `/images/04_products/${product.imageFolder}/${product.imagePrefix}_listing.webp`;
}

export function getProductCoverImage(product: Product) {
  return `/images/04_products/${product.imageFolder}/${product.imagePrefix}_cover.webp`;
}

export function getProductGalleryImages(product: Product) {
  return Array.from({ length: product.galleryCount }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `/images/04_products/${product.imageFolder}/${product.imagePrefix}_gallery_${number}.webp`;
  });
}
