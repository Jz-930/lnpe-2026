import type { Locale } from "@/i18n/config";
import { productNames } from './product-names';

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
    "items": [
      "Artificial graphite",
      "Asphalt",
      "Boehmite",
      "Hard carbon",
      "Iron phosphate",
      "Layered oxide",
      "Lithium Iron Phosphate",
      "Lithium carbonate",
      "Lithium hydroxide",
      "Lithium manganese iron phosphate",
      "Lithium nickel cobalt aluminate",
      "Lithium nickel cobalt manganese oxide",
      "Natural graphite",
      "Porous carbon",
      "Silicon carbon (SiC)",
      "Silicon oxygen (SiOC)",
      "Sodium iron phosphate",
      "Sodium vanadium phosphate",
      "Special carbon"
    ],
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
    "items": [
      "Alumina",
      "Aluminum hydroxide",
      "Black carbon black",
      "Calcium phosphate",
      "Cellulose",
      "Foaming agent",
      "Low melting point glass powder",
      "Magnesium hydroxide",
      "Magnesium oxide",
      "Precipitated barium sulfate",
      "Silica gel",
      "Strontium carbonate",
      "White carbon black",
      "Yttrium oxide",
      "Zinc oxide"
    ],
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
    "items": [
      "Andalusite",
      "Barite",
      "Bentonite",
      "Brucite",
      "Calcium oxide",
      "Diatomite",
      "Heavy calcium",
      "Kaolin",
      "Light calcium",
      "Mica",
      "Montmorillonite",
      "Pomegranate stone",
      "Potassium feldspar",
      "Quartz",
      "Talc",
      "Wollastonite"
    ],
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
    "items": [
      "Angelica",
      "Bee pollen",
      "Ciwujia",
      "Cordyceps sinensis",
      "Danshen",
      "Ganoderma powder",
      "Ganoderma spores",
      "Ginseng",
      "Green tea",
      "Konjac powder",
      "Lentinus edodes",
      "Pine pollen",
      "Sanqi",
      "Sheep placenta",
      "Tianqi",
      "Xiqingguo"
    ],
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
    "items": [
      "Boron carbide",
      "Brown corundum",
      "Chromium carbide",
      "Chromium oxide",
      "Grinding wheel material",
      "Pink fused alumina",
      "Rare earth polishing materials",
      "Silicon carbide",
      "Silicon nitride",
      "Tungsten carbide",
      "White corundum",
      "Zircon sand",
      "Zirconia",
      "Diamond"
    ],
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
    "items": [
      "Aluminum powder",
      "Cobalt powder",
      "Copper clad iron powder",
      "Copper lead powder",
      "Copper powder",
      "Copper tin powder",
      "Iron powder",
      "Lead tin alloy",
      "Molybdenum iron powder",
      "Nickel powder",
      "Niobium powder",
      "Silver powder",
      "Stainless steel powder",
      "Tantalum powder",
      "Tin powder",
      "Zinc powder"
    ],
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
    "items": [
      "Cement",
      "Cement additives",
      "Coal gangue",
      "Fly ash",
      "Furnace bottom slag",
      "Gypsum",
      "Lime",
      "Perlite",
      "Poor ore",
      "Quicklime",
      "Red mud",
      "Silicon ash",
      "Slug",
      "Steel slag",
      "Tailings",
      "Water slag"
    ],
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
    "items": [
      "Benzidine orange",
      "Cedar bark",
      "Chromium oxide green",
      "Clay",
      "Coal moss",
      "Cobalt blue",
      "Dyestuff",
      "Electronic waste",
      "Fluorescent pigment",
      "Fluorescent whitening agent",
      "Iron oxide red",
      "Lithopone",
      "Mica Titanium Pearllustia Pigments",
      "Phthalocyanine",
      "Recycled-plastic",
      "Silver vermilion",
      "Soap",
      "Toluidine Red",
      "Wax",
      "Wax substance",
      "Zinc oxide"
    ],
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
    "items": [
      "人造石墨",
      "沥青",
      "勃姆石",
      "硬碳",
      "磷酸铁",
      "层状氧化物",
      "磷酸铁锂",
      "碳酸锂",
      "氢氧化锂",
      "磷酸锰铁锂",
      "镍钴铝酸锂",
      "镍钴锰酸锂",
      "天然石墨",
      "多孔碳",
      "硅碳（SiC）",
      "硅氧（SiOC）",
      "磷酸铁钠",
      "磷酸钒钠",
      "特种碳"
    ]
  },
  "Chemicals": {
    "name": "化工",
    "challenge": "针对不同化工粉体的特性，实现稳定的超细粉碎与分级。",
    "route": "进料调质 → 机械 / 气流粉碎 → 分级 → 成品收集",
    "items": [
      "氧化铝",
      "氢氧化铝",
      "炭黑",
      "磷酸钙",
      "纤维素",
      "发泡剂",
      "低熔点玻璃粉",
      "氢氧化镁",
      "氧化镁",
      "沉淀硫酸钡",
      "硅胶",
      "碳酸锶",
      "白炭黑",
      "氧化钇",
      "氧化锌"
    ]
  },
  "Minerals": {
    "name": "矿物",
    "challenge": "按粒径和密度分离矿物粉体，同时保持工艺路线的能源效率。",
    "route": "破碎 → 粉碎 → 气流分级 → 细粉 / 粗粉分流",
    "items": [
      "红柱石",
      "重晶石",
      "膨润土",
      "水镁石",
      "氧化钙",
      "硅藻土",
      "重质碳酸钙",
      "高岭土",
      "轻质碳酸钙",
      "云母",
      "蒙脱石",
      "石榴石",
      "钾长石",
      "石英",
      "滑石",
      "硅灰石"
    ]
  },
  "Pharma & Food": {
    "name": "医药与食品",
    "challenge": "为敏感的食品和药用物料提供紧凑、易清洁的粉体加工方案。",
    "route": "可控进料 → 低温粉碎 → 分级 → 洁净收集",
    "items": [
      "当归",
      "蜂花粉",
      "刺五加",
      "冬虫夏草",
      "丹参",
      "灵芝粉",
      "灵芝孢子",
      "人参",
      "绿茶",
      "魔芋粉",
      "香菇",
      "松花粉",
      "三七",
      "羊胎盘",
      "田七",
      "西青果"
    ]
  },
  "Abrasives": {
    "name": "磨料",
    "challenge": "处理高硬度粉体和抛光材料，同时保持精确的粒径控制。",
    "route": "硬质粉体进料 → 气流 / 机械粉碎 → 分级 → 成品粉体",
    "items": [
      "碳化硼",
      "棕刚玉",
      "碳化铬",
      "氧化铬",
      "砂轮材料",
      "铬刚玉",
      "稀土抛光材料",
      "碳化硅",
      "氮化硅",
      "碳化钨",
      "白刚玉",
      "锆英砂",
      "氧化锆",
      "金刚石"
    ]
  },
  "Metals": {
    "name": "金属",
    "challenge": "通过可控的粉碎与分级工艺，稳定加工金属粉体。",
    "route": "金属粉体进料 → 保护性粉碎 → 分级 → 细粉收集",
    "items": [
      "铝粉",
      "钴粉",
      "铜包铁粉",
      "铜铅粉",
      "铜粉",
      "铜锡粉",
      "铁粉",
      "铅锡合金",
      "钼铁粉",
      "镍粉",
      "铌粉",
      "银粉",
      "不锈钢粉",
      "钽粉",
      "锡粉",
      "锌粉"
    ]
  },
  "Solid Waste": {
    "name": "固体废弃物",
    "challenge": "通过可靠的粉碎工艺，将工业固废转化为分级粉体。",
    "route": "固废进料 → 粉碎 → 气流分级 → 可再利用粉体",
    "items": [
      "水泥",
      "水泥添加剂",
      "煤矸石",
      "粉煤灰",
      "炉底渣",
      "石膏",
      "石灰",
      "珍珠岩",
      "贫矿",
      "生石灰",
      "赤泥",
      "硅灰",
      "炉渣",
      "钢渣",
      "尾矿",
      "水渣"
    ]
  },
  "Other": {
    "name": "其他",
    "challenge": "为多样化的特种物料匹配适用的粉碎、分级与收集路线。",
    "route": "物料评估 → 设备选型 → 工艺试验 → 生产路线",
    "items": [
      "联苯胺橙",
      "雪松树皮",
      "氧化铬绿",
      "黏土",
      "煤苔",
      "钴蓝",
      "染料",
      "电子废弃物",
      "荧光颜料",
      "荧光增白剂",
      "氧化铁红",
      "立德粉",
      "云母钛珠光颜料",
      "酞菁",
      "再生塑料",
      "银朱",
      "肥皂",
      "甲苯胺红",
      "蜡",
      "蜡质物",
      "氧化锌"
    ]
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

export function getApplications(locale: Locale): ApplicationCategory[] {
  if (locale === "en") return applicationsEn;
  return applicationsEn.map((category) => ({
    ...category,
    ...applicationsZh[category.name],
    relatedEquipment: category.relatedEquipment.map((equipment) => ({
      ...equipment,
      label: equipmentLabelsZh[equipment.label],
    })),
  }));
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
    "8 industries",
    "133 material samples",
    "Grinding and classification routes",
    "Equipment recommendation paths"
  ],
  "solutionsTitle": "Industry solution entries",
  "solutionsIntro": "Each application group keeps the original material coverage visible while making the recommended process route easier to scan.",
  "match": "Match Equipment",
  "group": "Application group",
  "materials": "materials",
  "problem": "Application problem",
  "process": "Recommended process",
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
    "8 大行业",
    "133 种物料样本",
    "粉碎与分级工艺路线",
    "设备选型推荐"
  ],
  "solutionsTitle": "行业解决方案",
  "solutionsIntro": "按应用领域展示物料范围，便于了解各类材料的推荐工艺路线。",
  "match": "匹配设备",
  "group": "应用领域",
  "materials": "种物料",
  "problem": "应用难点",
  "process": "推荐工艺",
  "sample": "物料样本"
}
};
