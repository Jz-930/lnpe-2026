import type { Locale } from "@/i18n/config";
import { productNames } from './product-names';
import { applicationCategoryIds, getMaterialEntries, materialEntries } from '@/content/materials';
import { materialIndustryGuides } from '@/content/materials-industry-guides';

type ApplicationCategory = {
  name: string;
  challenge: string;
  route: string;
  relatedEquipment: { label: string; href: string }[];
  items: string[];
  images: string[];
};

const applicationsEn: ApplicationCategory[] = [
  {
    "name": "Battery Materials",
    "challenge": "Control particle size, morphology, purity, and recirculation in cathode and anode powder processes.",
    "route": "Jet milling / pulverizing -> classification -> shaping -> closed collection",
    "relatedEquipment": [
      {
        "label": "Jet Pulverizer",
        "href": "/products/jet-pulverizer"
      },
      {
        "label": "Shaping Mill",
        "href": "/products/shaping-mill"
      },
      {
        "label": "Air Classifier",
        "href": "/products/air-classifier"
      }
    ],
    "items": [],
    "images": [
      "/images/05_applications/category_02_battery-materials/material_001_artificial-graphite.webp",
      "/images/05_applications/category_02_battery-materials/material_002_asphalt.jpg"
    ]
  },
  {
    "name": "Chemicals",
    "challenge": "Stabilize ultrafine grinding and classification across diverse chemical powder characteristics.",
    "route": "Feed conditioning -> impact / jet grinding -> classification -> product collection",
    "relatedEquipment": [
      {
        "label": "Impact Mill",
        "href": "/products/impact-mill"
      },
      {
        "label": "Jet Mill",
        "href": "/products/jet-mill"
      },
      {
        "label": "Air Classifier",
        "href": "/products/air-classifier"
      }
    ],
    "items": [],
    "images": [
      "/images/05_applications/category_03_chemicals/material_001_alumina.png",
      "/images/05_applications/category_03_chemicals/material_002_aluminum-hydroxide.png"
    ]
  },
  {
    "name": "Minerals",
    "challenge": "Separate mineral powders by particle size and density while keeping processing routes energy-efficient.",
    "route": "Crushing -> grinding -> air classification -> fine / coarse streams",
    "relatedEquipment": [
      {
        "label": "Air Classifier",
        "href": "/products/air-classifier"
      },
      {
        "label": "Impact Mill",
        "href": "/products/impact-mill"
      },
      {
        "label": "Turnkey EPC",
        "href": "/products/turnkey-epc"
      }
    ],
    "items": [],
    "images": [
      "/images/05_applications/category_05_minerals/material_001_andalusite.png",
      "/images/05_applications/category_05_minerals/material_002_barite.png"
    ]
  },
  {
    "name": "Pharma & Food",
    "challenge": "Support compact, cleanable powder processing for sensitive food and pharmaceutical materials.",
    "route": "Controlled feed -> low-temperature grinding -> classification -> clean collection",
    "relatedEquipment": [
      {
        "label": "Laboratory Equipment",
        "href": "/products/laboratory-equipment"
      },
      {
        "label": "Jet Mill",
        "href": "/products/jet-mill"
      },
      {
        "label": "Air Classifier",
        "href": "/products/air-classifier"
      }
    ],
    "items": [],
    "images": [
      "/images/05_applications/category_07_pharma-and-food/material_001_angelica.png",
      "/images/05_applications/category_07_pharma-and-food/material_002_bee-pollen.png"
    ]
  },
  {
    "name": "Abrasives",
    "challenge": "Handle hard powders and polishing materials while maintaining precise size control.",
    "route": "Hard-powder feed -> jet / impact milling -> classification -> finished powder",
    "relatedEquipment": [
      {
        "label": "Jet Mill",
        "href": "/products/jet-mill"
      },
      {
        "label": "Impact Mill",
        "href": "/products/impact-mill"
      },
      {
        "label": "Air Classifier",
        "href": "/products/air-classifier"
      }
    ],
    "items": [],
    "images": [
      "/images/05_applications/category_01_abrasives/material_001_boron-carbide.png",
      "/images/05_applications/category_01_abrasives/material_002_brown-corundum.png"
    ]
  },
  {
    "name": "Metals",
    "challenge": "Process metal powders with controlled grinding and classification routes for stable powder outputs.",
    "route": "Metal powder feed -> protected grinding -> classification -> fine stream",
    "relatedEquipment": [
      {
        "label": "Jet Mill",
        "href": "/products/jet-mill"
      },
      {
        "label": "Air Classifier",
        "href": "/products/air-classifier"
      },
      {
        "label": "Turnkey EPC",
        "href": "/products/turnkey-epc"
      }
    ],
    "items": [],
    "images": [
      "/images/05_applications/category_04_metals/material_001_aluminum-powder.png",
      "/images/05_applications/category_04_metals/material_002_cobalt-powder.png"
    ]
  },
  {
    "name": "Solid Waste",
    "challenge": "Convert industrial solid-waste streams into classified powders through robust grinding routes.",
    "route": "Waste feed -> grinding -> air classification -> reusable powder streams",
    "relatedEquipment": [
      {
        "label": "Impact Mill",
        "href": "/products/impact-mill"
      },
      {
        "label": "Air Classifier",
        "href": "/products/air-classifier"
      },
      {
        "label": "Turnkey EPC",
        "href": "/products/turnkey-epc"
      }
    ],
    "items": [],
    "images": [
      "/images/05_applications/category_08_solid-waste/material_001_cement.png",
      "/images/05_applications/category_08_solid-waste/material_002_cement-additives.png"
    ]
  },
  {
    "name": "Other",
    "challenge": "Map varied specialty materials to practical grinding, classification, and collection paths.",
    "route": "Material evaluation -> equipment selection -> process test -> production route",
    "relatedEquipment": [
      {
        "label": "Laboratory Equipment",
        "href": "/products/laboratory-equipment"
      },
      {
        "label": "Turnkey EPC",
        "href": "/products/turnkey-epc"
      },
      {
        "label": "Air Classifier",
        "href": "/products/air-classifier"
      }
    ],
    "items": [],
    "images": [
      "/images/05_applications/category_06_other/material_001_benzidine-orange.png",
      "/images/05_applications/category_06_other/material_002_cedar-bark.png"
    ]
  }
];

// Translated copy shares the original image paths and product routes.
const applicationsZh: Record<string, Pick<ApplicationCategory, "name" | "challenge" | "route" | "items">> = {
  "Battery Materials": {
    "name": "电池材料",
    "challenge": "控制正负极粉体加工中的粒径、形貌、纯度与循环回料。",
    "route": "气流粉碎 → 分级 → 整形 → 密闭收集",
    "items": []
  },
  "Chemicals": {
    "name": "化工",
    "challenge": "针对不同化工粉体的特性，实现稳定的超细粉碎与分级。",
    "route": "进料调质 → 机械 / 气流粉碎 → 分级 → 成品收集",
    "items": []
  },
  "Minerals": {
    "name": "矿物",
    "challenge": "按粒径和密度分离矿物粉体，同时保持工艺路线的能源效率。",
    "route": "破碎 → 粉碎 → 气流分级 → 细粉 / 粗粉分流",
    "items": []
  },
  "Pharma & Food": {
    "name": "医药与食品",
    "challenge": "为敏感的食品和药用物料提供紧凑、易清洁的粉体加工方案。",
    "route": "可控进料 → 低温粉碎 → 分级 → 洁净收集",
    "items": []
  },
  "Abrasives": {
    "name": "磨料",
    "challenge": "处理高硬度粉体和抛光材料，同时保持精确的粒径控制。",
    "route": "硬质粉体进料 → 气流 / 机械粉碎 → 分级 → 成品粉体",
    "items": []
  },
  "Metals": {
    "name": "金属",
    "challenge": "通过可控的粉碎与分级工艺，稳定加工金属粉体。",
    "route": "金属粉体进料 → 保护性粉碎 → 分级 → 细粉收集",
    "items": []
  },
  "Solid Waste": {
    "name": "固体废弃物",
    "challenge": "通过可靠的粉碎工艺，将工业固废转化为分级粉体。",
    "route": "固废进料 → 粉碎 → 气流分级 → 可再利用粉体",
    "items": []
  },
  "Other": {
    "name": "其他",
    "challenge": "为多样化的特种物料匹配适用的粉碎、分级与收集路线。",
    "route": "物料评估 → 设备选型 → 工艺试验 → 生产路线",
    "items": []
  }
};
const equipmentLabelsZh: Record<string, string> = {
  "Jet Pulverizer": productNames.zh['jet-pulverizer'],
  "Shaping Mill": productNames.zh['shaping-mill'],
  "Air Classifier": productNames.zh['air-classifier'],
  "Impact Mill": productNames.zh['impact-mill'],
  "Jet Mill": productNames.zh['jet-mill'],
  "Turnkey EPC": productNames.zh['turnkey-epc'],
  "Laboratory Equipment": productNames.zh['laboratory-equipment']
};

export function getApplications(locale: Locale) {
  return applicationsEn.map((category, index) => {
    const localized = locale === "en" ? category : {
      ...category,
      ...applicationsZh[category.name],
      relatedEquipment: category.relatedEquipment.map((equipment) => ({ ...equipment, label: equipmentLabelsZh[equipment.label] })),
    };
    const id = applicationCategoryIds[index];
    const materials = getMaterialEntries(id).map((item) => ({ id: item.id, name: item.name[locale], slug: item.slug, legacy: item.legacy }));
    return { ...localized, id, materials, items: materials.map((item) => item.name), industryGuide: materialIndustryGuides[id][locale] };
  });
}

const applicationsUiEn = {
  "title": "Material Applications",
  "intro": "Enhanced precision in grinding and classification processes enables the full realization of advanced materials' industrial potential, paving the way for high-performance applications across diverse sectors.",
  "routeLabel": "Route logic",
  "routeTitle": "Powder process map",
  "steps": [
    "Material Feed",
    "Grinding",
    "Classification",
    "Shaping",
    "Collection"
  ],
  "stats": [
    "8 application groups",
    `${materialEntries.length} material entries`,
    "Grinding and classification routes",
    "Equipment recommendation paths"
  ],
  "solutionsTitle": "Industry solution entries",
  "solutionsIntro": "Explore each material for its properties, process choices and trial inputs. Routes are selected according to the actual feed and targets.",
  "match": "Match Equipment",
  "group": "Application group",
  "materials": "materials",
  "problem": "Application problem",
  "process": "Candidate process",
  "sample": "material sample"
};
export const applicationMessages: Record<Locale, typeof applicationsUiEn> = {
  en: applicationsUiEn,
  zh: {
  "title": "材料应用",
  "intro": "精准的粉碎与分级工艺，充分释放先进材料的工业潜能，助力各行业实现高性能应用。",
  "routeLabel": "工艺逻辑",
  "routeTitle": "粉体工艺流程",
  "steps": [
    "物料进料",
    "粉碎",
    "分级",
    "整形",
    "收集"
  ],
  "stats": [
    "8 大应用领域",
    `${materialEntries.length} 个物料条目`,
    "粉碎与分级工艺路线",
    "设备选型推荐"
  ],
  "solutionsTitle": "行业解决方案",
  "solutionsIntro": "按应用领域查看物料范围，点击名称了解材料特性、工艺选择与来料试验要求。",
  "match": "匹配设备",
  "group": "应用领域",
  "materials": "个条目",
  "problem": "应用难点",
  "process": "候选工艺",
  "sample": "物料样本"
}
};
