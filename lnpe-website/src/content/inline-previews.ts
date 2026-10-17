import type { Locale } from '@/i18n/config';
import type { MaterialPreview } from './material-previews';
import { getProductCatalog, getProductListingImage } from '@/app/[locale]/products/product-catalog';

export function materialFact(item: MaterialPreview) {
  return { id: item.slug, title: item.name, description: item.summary, details: [item.focus, item.selection, item.inputs], image: item.images[0], href: `/applications/materials/${item.slug}` };
}

export function getEquipmentFacts(locale: Locale) {
  return getProductCatalog(locale).map((product) => ({
    id: product.slug, title: product.title, description: product.summary,
    details: [product.principle, product.features.join(locale === 'zh' ? '；' : ' · ')],
    image: getProductListingImage(product), href: `/products/${product.slug}`,
  }));
}
