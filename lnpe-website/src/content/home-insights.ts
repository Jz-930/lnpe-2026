import type { Locale } from '@/i18n/config';
import { companyDetails, researchDetails, supportDetails, type EditorialSection } from './company';
import { getProductTechnology } from './product-technology';
import { fieldScenes } from './field-scenes';

export type HomeInsight = {
  id: string;
  title: string;
  description: string;
  details: { title: string; text: string }[];
  images: { src: string; alt: string; caption: string }[];
  href?: string;
};

type Scene = keyof typeof fieldScenes;

/** The homepage points into the maintained editorial records instead of inventing additional specifications. */
export function getHomeInsights(locale: Locale) {
  const photos = (keys: Scene[]) => keys.map((key) => ({
    src: fieldScenes[key].src,
    alt: fieldScenes[key].alt[locale],
    caption: fieldScenes[key].caption[locale],
  }));
  const editorial = (collection: EditorialSection[], sectionId: string, scenes: Scene[], href: string, indices?: number[]): HomeInsight => {
    const entry = collection.find((item) => item.id === sectionId)!;
    return {
      id: sectionId, title: entry.title, description: entry.intro,
      details: indices ? indices.map((index) => entry.items[index]) : entry.items,
      images: photos(scenes), href,
    };
  };
  const technical = (slug: string, scenes: Scene[]): HomeInsight => {
    const entry = getProductTechnology(slug, locale)!;
    return {
      id: slug, title: entry.title, description: entry.summary,
      details: entry.configurations.slice(0, 3).map((item) => ({ title: item.title, text: item.body })),
      images: photos(scenes), href: `/products/technologies/${slug}`,
    };
  };

  const trial = editorial(researchDetails[locale], 'trial', ['laboratory', 'analysis'], '/research#trial');
  const analysis = editorial(researchDetails[locale], 'analysis', ['analysis', 'laboratory'], '/research#analysis');
  const institute = editorial(researchDetails[locale], 'institute', ['engineering', 'laboratory'], '/research#institute');
  const manufacturing = editorial(companyDetails[locale], 'bases', ['machining', 'assembly', 'quality'], '/about#bases', [0, 2, 3]);
  const delivery = editorial(supportDetails[locale], 'commissioning', ['delivery', 'production'], '/support#commissioning');
  const planning = editorial(supportDetails[locale], 'selection', ['engineering', 'production'], '/support#selection');
  const industrial: HomeInsight = {
    ...editorial(companyDetails[locale], 'history', ['production', 'classification', 'engineering'], '/projects', [1, 2, 3, 4]),
    title: locale === 'zh' ? '工业应用与工程经验' : 'Industrial applications and engineering experience',
    description: locale === 'zh' ? '从玻璃微珠与反光材料，到金属硅、新能源正负极和隔膜材料，粉体处理路线随应用目标持续发展。项目交流可以围绕相近的物料、工艺和设备条件展开。' : 'From glass beads and reflective materials to silicon, battery electrodes and separator materials, powder-processing routes develop around application targets. Discuss project experience in terms of comparable materials, processes and equipment.',
  };
  const credentials = editorial(companyDetails[locale], 'credentials', ['engineering', 'quality'], '/about#credentials', [1]);
  const international = editorial(companyDetails[locale], 'credentials', ['delivery', 'factory'], '/about#credentials', [2]);

  const process = {
    Feeding: technical('feeding-stations', ['production', 'engineering']),
    Grinding: technical('jet-mill-configurations', ['production', 'ceramic']),
    Classifying: technical('precision-classification', ['classification', 'analysis']),
    Modification: technical('mechanical-shaping', ['shaping', 'analysis']),
    Collection: technical('dust-collection', ['production', 'assembly']),
  };
  const products = {
    'turnkey-epc': technical('battery-material-lines', ['production', 'engineering']),
    'jet-pulverizer': technical('deagglomeration', ['production', 'analysis']),
    'jet-mill': process.Grinding,
    'impact-mill': technical('impact-configurations', ['machining', 'ceramic']),
    'shaping-mill': process.Modification,
    'air-classifier': process.Classifying,
  };

  return {
    hero: [trial, planning, process.Grinding, delivery],
    trust: [industrial, credentials, institute, international],
    factory: { Manufacturing: manufacturing, 'R&D Validation': analysis, Delivery: delivery },
    process,
    products,
    research: [analysis, institute, planning],
    routes: { Grinding: process.Grinding, Classifying: process.Classifying, Modification: process.Modification, 'Full Line': products['turnkey-epc'] },
    parameters: technical('powder-terminology', ['analysis', 'laboratory']),
  };
}
