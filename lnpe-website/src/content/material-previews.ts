import { getMaterial, materialGuidance, materialSearchIndex } from './materials';
import type { Locale } from '@/i18n/config';

/** One projection of the existing material library for all inline previews. */
export function getMaterialPreviews(locale: Locale) {
  return materialSearchIndex.map((item) => {
    const material = getMaterial(item.slug)!;
    const guidance = materialGuidance[material.profile];
    return {
      slug: item.slug, name: item.name[locale], summary: item.summary[locale],
      categoryIds: item.categoryIds,
      searchText: [item.name.zh, item.name.en, ...item.aliases].join(' ').toLocaleLowerCase(),
      focus: material.focus[locale], selection: guidance.selection[locale], inputs: guidance.inputs[locale],
      images: material.images,
    };
  });
}

export type MaterialPreview = ReturnType<typeof getMaterialPreviews>[number];
