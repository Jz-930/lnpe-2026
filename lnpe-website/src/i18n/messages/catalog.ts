import type { Locale } from "@/i18n/config";
import { productNames } from './product-names';

export type ProductCopy = {
  title: string; series: string; summary: string; principle: string; overview: string[];
  features: string[]; applications: string[]; technicalHighlights: string[]; tags: string[];
  specs: { label: string; value: string }[];
};
export type ProjectCopy = { title: string; system: string; description: string; evidence: string[] };

export const productCopyEn = {
  "jet-mill": {
    "title": productNames.en['jet-mill'],
    "series": "LNJ Series",
    "summary": "Optimized structural and flow field design significantly enhances energy efficiency.",
    "principle": "The LNJ Jet Mill utilizes multiple nozzles to generate high-velocity, sonic-speed airflow, enabling ultrafine pulverization of materials through particle-on-particle collisions. The finely ground particles are then carried into a high-efficiency turbine classifier, where oversized particles are separated and returned to the grinding chamber for further processing.",
    "overview": [
      "Engineered based on theoretical modeling and advanced numerical simulations, and integrating both domestic and international technologies, the LNJ Jet Mill represents a new generation of precision grinding equipment.",
      "LNPE offers a versatile range of solutions tailored to specific material characteristics, including low-temperature jet mills, high-temperature variants, and inert gas-protected closed-loop systems."
    ],
    "features": [
      "Low energy consumption",
      "Materials collision each other without contamination, effective for Mohs 1-10 hard Material",
      "Fully automatic control, easy to operate",
      "Omniseal negative pressure operation, no contamination."
    ],
    "applications": [
      "Industrial powders",
      "Advanced materials",
      "Mohs 1-10 materials"
    ],
    "technicalHighlights": [
      "High-velocity sonic airflow",
      "Particle-on-particle collision path",
      "High-efficiency turbine classifier",
      "Oversize return loop"
    ],
    "tags": [
      "Ultrafine grinding",
      "Low contamination",
      "Closed-loop options"
    ],
    "specs": [
      {
        "label": "Process Role",
        "value": "Ultrafine jet milling"
      },
      {
        "label": "Particle Control",
        "value": "Narrow size distribution"
      },
      {
        "label": "Material Range",
        "value": "Mohs 1-10"
      },
      {
        "label": "System Type",
        "value": "Negative pressure operation"
      }
    ]
  },
  "impact-mill": {
    "title": productNames.en['impact-mill'],
    "series": "LNI Series",
    "summary": "High-speed hammer impact and compression for ultrafine grinding with precise control.",
    "principle": "The LNPE Impact Mill combines two size-reduction mechanisms - high-speed hammer impact and hammer-to-liner compression - to achieve ultrafine grinding in a single continuous process. After comminution, material enters the built-in turbine classifier.",
    "overview": [
      "Engineered for a wide spectrum of feed characteristics, the LNI system optimizes rotor hammers, toothed stator rings, and classifier geometry within a precisely controlled airflow.",
      "Particles that meet the target size are discharged as product, while oversize fractions are automatically recirculated for further milling."
    ],
    "features": [
      "High-capacity throughput with exceptionally low specific energy consumption",
      "Optional full-ceramic process lining to virtually eliminate ferromagnetic contamination"
    ],
    "applications": [
      "Adhesive feeds",
      "Fibrous feeds",
      "Heat-sensitive materials"
    ],
    "technicalHighlights": [
      "Hammer impact and liner compression",
      "Built-in turbine classifier",
      "Automatic oversize recirculation",
      "Optional ceramic process lining"
    ],
    "tags": [
      "Impact grinding",
      "Built-in classifier",
      "Ceramic lining option"
    ],
    "specs": [
      {
        "label": "Process Role",
        "value": "Impact grinding"
      },
      {
        "label": "Feed Fit",
        "value": "Adhesive and fibrous materials"
      },
      {
        "label": "Control Mode",
        "value": "Integrated classification"
      },
      {
        "label": "System Type",
        "value": "Continuous milling loop"
      }
    ]
  },
  "jet-pulverizer": {
    "title": productNames.en['jet-pulverizer'],
    "series": "Patented System",
    "summary": "A newly developed grinding and classification system designed for materials with strict particle size requirements and high yield demands.",
    "principle": "The Jet Pulverizer is a patented, next-generation grinding-and-classification system designed for processes that demand narrow particle-size distributions at high throughput with minimal energy draw.",
    "overview": [
      "Immediate classification removes material already within specification as feed stock enters the unit.",
      "Oversized particles are channeled into the jet-milling chamber, where supersonic nozzles generate a single, high-energy impact before material returns to the classifier.",
      "Because each particle remains in the milling zone for mere milliseconds, secondary grinding is virtually eliminated, yields are maximized, and the generation of unwanted ultrafines is greatly reduced."
    ],
    "features": [
      "Controlled grinding, high yield, stable particle size, low energy consumption, and large output",
      "The milling strength is easy to control, high yield, low fine powder content",
      "Minimal impact on particle surface morphology, with little damage to the shape of particles"
    ],
    "applications": [
      "Sintered ternary cathodes",
      "Si-C composites",
      "Coated graphite anodes",
      "Glass beads",
      "Metallic silicon"
    ],
    "technicalHighlights": [
      "Immediate classification",
      "Single-collision milling",
      "Ultra-short residence time",
      "Low unwanted ultrafines"
    ],
    "tags": [
      "High yield",
      "Battery materials",
      "Single-collision milling"
    ],
    "specs": [
      {
        "label": "Process Role",
        "value": "Grinding and classification"
      },
      {
        "label": "Particle Control",
        "value": "Strict size requirements"
      },
      {
        "label": "Residence Time",
        "value": "Milliseconds in milling zone"
      },
      {
        "label": "System Type",
        "value": "Classifier-first loop"
      }
    ]
  },
  "turnkey-epc": {
    "title": productNames.en['turnkey-epc'],
    "series": "Powder-Processing Line",
    "summary": "As a supplier of cathode and anode materials, LNPE has successfully delivered over a hundred EPC projects in the battery materials sector.",
    "principle": "Leveraging decades of process-engineering expertise, LNPE delivers turnkey EPC solutions for powders ranging from specialty chemicals and minerals to high-purity electronic and energy materials.",
    "overview": [
      "The one-stop approach covers process design, equipment manufacturing and supply, installation and commissioning, and training and lifecycle service.",
      "All core components are produced in-house, allowing tight quality control and seamless integration across grinding, classification, mixing, conveying, and packaging stages."
    ],
    "features": [
      "Custom-built powder-processing lines tuned to each client's material and throughput targets",
      "Full in-house equipment suite - crushers, mills, classifiers, mixers, conveyors, and more",
      "Rapid on-site install & commissioning by dedicated field engineers",
      "End-to-end technical support with operator training and 24 / 7 service",
      "Proven EPC track record spanning hundreds of projects worldwide"
    ],
    "applications": [
      "Cathode materials",
      "Anode materials",
      "Specialty chemicals",
      "Minerals"
    ],
    "technicalHighlights": [
      "Process design",
      "Equipment manufacturing and supply",
      "Installation and commissioning",
      "Training and lifecycle service"
    ],
    "tags": [
      "EPC",
      "Powder line",
      "Lifecycle service"
    ],
    "specs": [
      {
        "label": "Process Role",
        "value": "Turnkey powder line"
      },
      {
        "label": "Scope",
        "value": "Design to lifecycle service"
      },
      {
        "label": "Equipment Suite",
        "value": "Mills, classifiers, mixers, conveyors"
      },
      {
        "label": "System Type",
        "value": "Custom EPC delivery"
      }
    ]
  },
  "shaping-mill": {
    "title": productNames.en['shaping-mill'],
    "series": "Morphology System",
    "summary": "Self-developed device for controlling powder morphology and particle size based on sphericity, angularity, or aspect-ratio requirements.",
    "principle": "The LNPE Shaping Mill employs a high-speed rotor-stator assembly inside a precisely engineered airflow field. Feed powder is accelerated into the shaping zone, where controlled particle-particle and particle-wall collisions round sharp edges, smooth surfaces, or accentuate aspect ratios as required.",
    "overview": [
      "A built-in dynamic classifier continuously extracts in-spec particles; oversize or under-shaped fractions are recirculated for additional passes.",
      "By tuning rotor speed, airflow, and classifier cut-point, the system delivers narrowly distributed particles in the target morphology."
    ],
    "features": [
      "Morphology on demand - spheroidal, prismatic, or high-aspect shapes",
      "One-pass shaping + sizing",
      "Modular rotor for diverse powders",
      "High yield, near-zero contamination",
      "Low energy, minimal OPEX"
    ],
    "applications": [
      "Graphite spheroidisation",
      "Mica plate-edge rounding",
      "Wollastonite aspect-ratio enhancement",
      "Specialty fillers"
    ],
    "technicalHighlights": [
      "High-speed rotor-stator assembly",
      "Controlled shaping zone",
      "Built-in dynamic classifier",
      "Recirculation for additional passes"
    ],
    "tags": [
      "Morphology control",
      "Shaping + sizing",
      "High yield"
    ],
    "specs": [
      {
        "label": "Process Role",
        "value": "Particle morphology control"
      },
      {
        "label": "Particle Outcome",
        "value": "Spheroidal, prismatic, high-aspect"
      },
      {
        "label": "Control Mode",
        "value": "Rotor, airflow, classifier cut-point"
      },
      {
        "label": "System Type",
        "value": "Dynamic classifier loop"
      }
    ]
  },
  "air-classifier": {
    "title": productNames.en['air-classifier'],
    "series": "Precision Separator",
    "summary": "Dry state classification based on differences in particle size and density.",
    "principle": "LNPE air classifier separates powder exclusively by particle size and density. The high-speed rotation of the classifying wheel generates a strong centrifugal field, while the carrier airflow supplies an opposing drag force.",
    "overview": [
      "Large or heavy particles experience a dominant centrifugal force, are flung outward beyond the wheel, and descend along the chamber wall to the coarse-product outlet.",
      "Small or light particles encounter a weaker centrifugal force; the drag of the airflow prevails, steering them through the wheel vanes into the fine-product stream."
    ],
    "features": [
      "Precision separation by particle size, density, and morphology",
      "CFD-optimised airflow, solids concentration, and pressure profile for each design",
      "High cut accuracy with classification efficiency of 70 - 93 %",
      "Multiple interchangeable classifier-wheel geometries for efficient handling of diverse powders"
    ],
    "applications": [
      "Lithium-battery cathodes",
      "Anodes",
      "Separators",
      "Advanced powder materials"
    ],
    "technicalHighlights": [
      "Centrifugal and aerodynamic force balance",
      "Fine and coarse product streams",
      "Interchangeable classifier wheels",
      "Single-pass classification"
    ],
    "tags": [
      "Dry classification",
      "70-93% efficiency",
      "Battery powders"
    ],
    "specs": [
      {
        "label": "Process Role",
        "value": "Particle classification"
      },
      {
        "label": "Separation Basis",
        "value": "Particle size and density"
      },
      {
        "label": "Cut Accuracy",
        "value": "70 - 93% efficiency"
      },
      {
        "label": "System Type",
        "value": "Airflow and classifying wheel"
      }
    ]
  },
  "laboratory-equipment": {
    "title": productNames.en['laboratory-equipment'],
    "series": "R&D Equipment",
    "summary": "LNPE provides high-precision compact grinding equipment for laboratories, featuring easy cleaning and optional ceramic linings to reduce magnetic contamination.",
    "principle": "LNPE supplies a full suite of high-performance laboratory systems purpose-built for powder-processing R&D. Each unit features a modular design that can be customised to meet precise experimental requirements.",
    "overview": [
      "The line combines rapid, energy-efficient milling with tight particle-size control.",
      "Intuitive operation and low-maintenance construction keep long-term running costs to a minimum while maximising uptime.",
      "Widely adopted in research facilities across the United States, France, Russia, and other markets."
    ],
    "features": [
      "Custom-engineered lab mills deliver rapid, energy-efficient powder processing with tight size control.",
      "Modular, user-friendly design streamlines setup, operation, and maintenance for any R&D workflow.",
      "Proven worldwide - deployed in the U.S., France, Russia, and beyond for consistently reliable results."
    ],
    "applications": [
      "Powder-processing R&D",
      "Laboratory testing",
      "Small-batch experiments"
    ],
    "technicalHighlights": [
      "Compact grinding equipment",
      "Easy cleaning",
      "Optional ceramic linings",
      "Modular lab workflow"
    ],
    "tags": [
      "R&D",
      "Compact systems",
      "Easy cleaning"
    ],
    "specs": [
      {
        "label": "Process Role",
        "value": "Laboratory powder processing"
      },
      {
        "label": "Workflow Fit",
        "value": "R&D and test batches"
      },
      {
        "label": "Maintenance",
        "value": "Easy cleaning"
      },
      {
        "label": "System Type",
        "value": "Modular compact equipment"
      }
    ]
  }
} satisfies Record<string, ProductCopy>;

export type ProductSlug = keyof typeof productCopyEn;

export const projectCopyEn = {
  "shaping-mill-project": {
    "title": "Shaping Mill Project",
    "system": "Shaping Mill",
    "description": "The Shaping Mill tailors particle morphology - spheroidal, multi-faceted, or high-aspect - while simultaneously trimming size to sub-micron levels. Its all-ceramic, metal-free lining preserves purity and the low-temperature process protects heat-sensitive powders. Ideal for: graphite spheroidisation, mica plate-edge rounding, wollastonite aspect-ratio enhancement, and other specialty fillers where shape directly drives performance.",
    "evidence": [
      "All-ceramic lining",
      "Low-temperature process",
      "Graphite and specialty filler fit"
    ]
  },
  "jet-pulverizer-project": {
    "title": "Jet Pulverizer Project",
    "system": "Jet Pulverizer",
    "description": "The Jet Pulverizer offers single-pass, high-yield micronisation - coarse particles collide once in a sonic jet, are instantly re-classified, and re-circulate only if needed. Key uses: sintered ternary cathodes, Si-C composites, coated graphite anodes, glass beads, metallic silicon and other lithium-ion battery powders.",
    "evidence": [
      "Single-pass micronisation",
      "Instant re-classification",
      "Battery powder use cases"
    ]
  },
  "epc-project": {
    "title": "EPC Project",
    "system": "Powder-Processing Line",
    "description": "As a one-stop EPC partner, LNPE delivers turnkey powder-processing lines - from custom process design and in-house supply of mills, classifiers, mixers and conveyors, to on-site installation, commissioning, operator training and long-term maintenance. Backed by hundreds of successful projects worldwide, the integrated approach lets clients fast-track safe, energy-efficient and highly reliable production facilities.",
    "evidence": [
      "Custom process design",
      "In-house equipment supply",
      "Installation and lifecycle support"
    ]
  },
  "lithium-iron-phosphate-specialized-classified-jet-mill": {
    "title": "Lithium Iron Phosphate Specialized Classified Jet Mill",
    "system": "Classified Jet Mill",
    "description": "The Lithium Iron Phosphate (LFP) Specialized Classified Jet Mill marries LNPE's patented multi-nozzle jet-collision technology with a precision turbine classifier to produce sub-micron, high-purity cathode powder in a single, closed-loop operation. Ceramic, metal-free linings eliminate ferromagnetic contamination, while the ultrafast, low-temperature milling zone safeguards LFP's crystal integrity and electrochemical performance.",
    "evidence": [
      "Multi-nozzle jet collision",
      "Precision turbine classifier",
      "Ceramic metal-free lining"
    ]
  },
  "air-classification-project": {
    "title": "Air Classification Project",
    "system": "Air Classifier",
    "description": "Real-time air-classifying extracts in-spec particles on the first pass and automatically recycles coarse fractions, delivering a narrow particle-size distribution, superior tap density, and industry-leading energy efficiency - an ideal solution for next-generation lithium-ion battery manufacturing.",
    "evidence": [
      "First-pass in-spec extraction",
      "Coarse fraction recycling",
      "Narrow particle-size distribution"
    ]
  },
  "impact-mill-project": {
    "title": "Impact Mill Project",
    "system": "Classifying Impact Mill",
    "description": "The LNI Classifying Impact Mill combines high-speed hammer impact with an in-line turbine classifier to produce ultrafine powders in one continuous loop. Tunable rotor and classifier designs handle sticky or fibrous feeds while delivering high throughput, tight size control, and low specific energy consumption.",
    "evidence": [
      "High-speed hammer impact",
      "In-line turbine classifier",
      "Sticky and fibrous feed handling"
    ]
  }
} satisfies Record<string, ProjectCopy>;

export type ProjectSlug = keyof typeof projectCopyEn;

const productCopyZh = {
  "jet-mill": {
    title: productNames.zh['jet-mill'], series: "LNJ 系列",
    summary: "优化设备结构与流场设计，显著提升能源利用效率。",
    principle: "LNJ 气流磨通过多个喷嘴产生高速音速气流，使物料颗粒相互碰撞，实现超细粉碎。粉碎后的颗粒随气流进入高效涡轮分级机，超大颗粒被分离并返回粉碎腔继续处理。",
    overview: ["LNJ 气流磨以理论建模和先进数值模拟为基础，融合国内外技术，是新一代精密粉碎设备。", "LNPE 可根据物料特性提供多种解决方案，包括低温气流磨、高温机型和惰性气体保护的闭路系统。"],
    features: ["能耗低", "物料相互碰撞，无污染，适用于莫氏硬度 1-10 的物料", "全自动控制，操作便捷", "全密封负压运行，无污染。"],
    applications: ["工业粉体", "先进材料", "莫氏硬度 1-10 的物料"],
    technicalHighlights: ["高速音速气流", "颗粒间碰撞粉碎", "高效涡轮分级机", "粗颗粒回流循环"],
    tags: ["超细粉碎", "低污染", "可选闭路系统"],
    specs: [{ label: "工艺用途", value: "超细气流粉碎" }, { label: "粒度控制", value: "窄粒径分布" }, { label: "物料范围", value: "莫氏硬度 1-10" }, { label: "系统类型", value: "负压运行" }],
  },
  "impact-mill": {
    title: productNames.zh['impact-mill'], series: "LNI 系列",
    summary: "结合高速锤击与挤压，实现精准可控的超细粉碎。",
    principle: "LNPE 机械冲击磨结合高速锤击与锤头对衬板挤压两种粉碎机制，在连续工艺中实现超细粉碎。粉碎后的物料进入内置涡轮分级机。",
    overview: ["LNI 系统针对不同进料特性，在精准控制的气流中优化转子锤头、齿形定子环和分级机结构。", "达到目标粒径的颗粒作为成品排出，超大颗粒自动回流，继续粉碎。"],
    features: ["处理能力高，单位能耗低", "可选全陶瓷工艺内衬，最大限度减少铁磁性污染"],
    applications: ["黏性物料", "纤维状物料", "热敏性材料"],
    technicalHighlights: ["锤击与衬板挤压", "内置涡轮分级机", "粗颗粒自动回流", "可选陶瓷工艺内衬"],
    tags: ["冲击粉碎", "内置分级机", "可选陶瓷内衬"],
    specs: [{ label: "工艺用途", value: "冲击粉碎" }, { label: "适用进料", value: "黏性和纤维状物料" }, { label: "控制方式", value: "集成分级" }, { label: "系统类型", value: "连续粉碎循环" }],
  },
  "jet-pulverizer": {
    title: productNames.zh['jet-pulverizer'], series: "专利系统",
    summary: "新一代粉碎分级系统，适用于粒度要求严格、收率要求高的物料。",
    principle: "气流粉碎机是一款新一代专利粉碎分级系统，适用于要求高处理量、窄粒径分布和低能耗的工艺。",
    overview: ["物料进入设备后立即进行分级，已满足粒度要求的物料直接分离排出。", "超大颗粒进入气流粉碎腔，由超音速喷嘴产生一次高能碰撞，随后返回分级机。", "每个颗粒在粉碎区仅停留数毫秒，基本避免二次粉碎，提高收率，并显著减少不需要的超细粉体。"],
    features: ["粉碎可控，收率高，粒度稳定，能耗低，产量大", "粉碎强度易调节，收率高，细粉含量低", "对颗粒表面形貌影响小，颗粒形状损伤少"],
    applications: ["烧结三元正极材料", "硅碳复合材料", "包覆石墨负极材料", "玻璃微珠", "金属硅"],
    technicalHighlights: ["即时分级", "单次碰撞粉碎", "超短停留时间", "减少不需要的超细粉体"],
    tags: ["高收率", "电池材料", "单次碰撞粉碎"],
    specs: [{ label: "工艺用途", value: "粉碎与分级" }, { label: "粒度控制", value: "满足严格粒度要求" }, { label: "停留时间", value: "粉碎区内数毫秒" }, { label: "系统类型", value: "先分级后粉碎循环" }],
  },
  "turnkey-epc": {
    title: productNames.zh['turnkey-epc'], series: "粉体加工生产线",
    summary: "作为正负极材料领域的供应商，LNPE 已在电池材料行业成功交付百余项 EPC 项目。",
    principle: "依托数十年的工艺工程经验，LNPE 为特种化学品、矿物、高纯电子材料及能源材料等粉体提供 EPC 总包解决方案。",
    overview: ["一站式服务涵盖工艺设计、设备制造与供应、安装调试，以及培训和全生命周期服务。", "核心部件均由内部制造，严格控制质量，实现粉碎、分级、混合、输送和包装各环节的顺畅集成。"],
    features: ["根据客户物料与处理量目标定制粉体加工生产线", "自有完整设备体系，包括破碎机、粉碎机、分级机、混合机、输送设备等", "专业现场工程师快速完成安装与调试", "提供全流程技术支持、操作培训和 24 / 7 服务", "在全球数百项项目中积累了成熟的 EPC 交付经验"],
    applications: ["正极材料", "负极材料", "特种化学品", "矿物"],
    technicalHighlights: ["工艺设计", "设备制造与供应", "安装与调试", "培训与全生命周期服务"],
    tags: ["EPC", "粉体生产线", "全生命周期服务"],
    specs: [{ label: "工艺用途", value: "粉体生产线总包" }, { label: "服务范围", value: "从设计到全生命周期服务" }, { label: "设备体系", value: "粉碎机、分级机、混合机、输送设备" }, { label: "系统类型", value: "定制 EPC 交付" }],
  },
  "shaping-mill": {
    title: productNames.zh['shaping-mill'], series: "形貌控制系统",
    summary: "自主研发的粉体形貌与粒度控制设备，满足球形度、棱角度或长径比要求。",
    principle: "LNPE 整形机在精密设计的流场中采用高速转子—定子组件。进料粉体加速进入整形区，通过可控的颗粒间及颗粒与腔壁间碰撞，按需修圆棱角、平滑表面或提高长径比。",
    overview: ["内置动态分级机持续提取合格颗粒，粒径过大或整形不足的物料回流进行多次处理。", "通过调节转子转速、气流及分级切割粒径，获得形貌符合目标且粒径分布集中的颗粒。"],
    features: ["按需控制形貌：球形、棱柱形或高长径比", "单次完成整形与粒度控制", "模块化转子适配多种粉体", "收率高，接近零污染", "低能耗，低运营成本"],
    applications: ["石墨球化", "云母片边缘修圆", "硅灰石长径比提升", "特种填料"],
    technicalHighlights: ["高速转子—定子组件", "可控整形区", "内置动态分级机", "回流多次处理"],
    tags: ["形貌控制", "整形与粒度控制", "高收率"],
    specs: [{ label: "工艺用途", value: "颗粒形貌控制" }, { label: "颗粒形态", value: "球形、棱柱形、高长径比" }, { label: "控制方式", value: "转子、气流与分级切割粒径" }, { label: "系统类型", value: "动态分级循环" }],
  },
  "air-classifier": {
    title: productNames.zh['air-classifier'], series: "精密分级设备",
    summary: "根据颗粒粒径和密度差异进行干法分级。",
    principle: "LNPE 气流分级机根据粒径与密度分离粉体。分级轮高速旋转产生强离心场，载气流则提供方向相反的曳力。",
    overview: ["较大或较重的颗粒受到的离心力占主导，被甩向分级轮外侧，并沿腔壁下降至粗粉出口。", "较小或较轻的颗粒受到的离心力较弱，气流曳力占主导，使其穿过分级轮叶片进入细粉流。"],
    features: ["依据粒径、密度和形貌进行精密分离", "通过 CFD 优化各机型的气流、固相浓度和压力分布", "切割精度高，分级效率为 70 - 93 %", "多种可互换的分级轮结构，高效适配不同粉体"],
    applications: ["锂电池正极材料", "负极材料", "隔膜材料", "先进粉体材料"],
    technicalHighlights: ["离心力与气动力平衡", "细粉与粗粉分别输出", "可互换分级轮", "单次分级"],
    tags: ["干法分级", "70-93% 效率", "电池粉体"],
    specs: [{ label: "工艺用途", value: "颗粒分级" }, { label: "分离依据", value: "粒径与密度" }, { label: "分级精度", value: "70 - 93% 效率" }, { label: "系统类型", value: "气流与分级轮" }],
  },
  "laboratory-equipment": {
    title: productNames.zh['laboratory-equipment'], series: "研发设备",
    summary: "LNPE 为实验室提供高精度紧凑型粉碎设备，易于清洁，并可选配陶瓷内衬以减少磁性污染。",
    principle: "LNPE 提供专为粉体加工研发设计的完整高性能实验室系统。各设备采用模块化设计，可按具体实验要求定制。",
    overview: ["设备兼顾快速、节能的粉碎与严格的粒度控制。", "直观的操作方式与低维护结构，有助于降低长期运行成本并提高设备利用率。", "已广泛应用于美国、法国、俄罗斯及其他市场的科研机构。"],
    features: ["定制实验室粉碎机，实现快速、节能的粉体加工与严格粒度控制。", "模块化、人性化设计，简化各类研发流程中的安装、操作和维护。", "已在美国、法国、俄罗斯等地应用，提供稳定可靠的结果。"],
    applications: ["粉体加工研发", "实验室测试", "小批量实验"],
    technicalHighlights: ["紧凑型粉碎设备", "易于清洁", "可选陶瓷内衬", "模块化实验流程"],
    tags: ["研发", "紧凑型系统", "易于清洁"],
    specs: [{ label: "工艺用途", value: "实验室粉体加工" }, { label: "适用流程", value: "研发与试验批次" }, { label: "维护特点", value: "易于清洁" }, { label: "系统类型", value: "模块化紧凑设备" }],
  },
} satisfies Record<ProductSlug, ProductCopy>;

const projectCopyZh = {
  "shaping-mill-project": {
    title: "整形机项目", system: "整形机",
    description: "整形机可按需形成球形、多面形或高长径比颗粒，同时将粒径减小至亚微米级。全陶瓷、无金属内衬保持物料纯度，低温工艺保护热敏性粉体。适用于石墨球化、云母片边缘修圆、硅灰石长径比提升，以及其他形状直接影响性能的特种填料。",
    evidence: ["全陶瓷内衬", "低温工艺", "适用于石墨与特种填料"],
  },
  "jet-pulverizer-project": {
    title: "气流粉碎机项目", system: "气流粉碎机",
    description: "气流粉碎机提供单次、高收率的微粉化处理：粗颗粒在音速气流中碰撞一次，随后立即重新分级，仅在需要时回流。主要应用包括烧结三元正极材料、硅碳复合材料、包覆石墨负极材料、玻璃微珠、金属硅及其他锂电池粉体。",
    evidence: ["单次微粉化", "即时重新分级", "电池粉体应用"],
  },
  "epc-project": {
    title: "EPC 总包项目", system: "粉体加工生产线",
    description: "作为一站式 EPC 合作伙伴，LNPE 提供粉体加工生产线总包服务，从定制工艺设计、自有粉碎机、分级机、混合机与输送设备供应，到现场安装、调试、操作培训和长期维护。依托全球数百项成功项目，这一集成方案帮助客户快速建设安全、节能且可靠的生产设施。",
    evidence: ["定制工艺设计", "自有设备供应", "安装与全生命周期支持"],
  },
  "lithium-iron-phosphate-specialized-classified-jet-mill": {
    title: "磷酸铁锂专用分级式气流磨", system: "分级式气流磨",
    description: "磷酸铁锂（LFP）专用分级式气流磨，将 LNPE 专利多喷嘴气流碰撞技术与精密涡轮分级机结合，在一次闭路运行中生产亚微米级高纯正极粉体。陶瓷无金属内衬消除铁磁性污染，超快速、低温粉碎区保护磷酸铁锂的晶体完整性与电化学性能。",
    evidence: ["多喷嘴气流碰撞", "精密涡轮分级机", "陶瓷无金属内衬"],
  },
  "air-classification-project": {
    title: "气流分级项目", system: "气流分级机",
    description: "实时气流分级可在首轮提取合格颗粒，并自动循环处理粗颗粒，实现窄粒径分布、更高振实密度和行业领先的能效，是面向新一代锂离子电池制造的理想解决方案。",
    evidence: ["首轮提取合格颗粒", "粗颗粒循环处理", "窄粒径分布"],
  },
  "impact-mill-project": {
    title: "机械冲击磨项目", system: "分级式机械冲击磨",
    description: "LNI 分级式机械冲击磨将高速锤击与在线涡轮分级机结合，在单一连续循环中生产超细粉体。可调节的转子与分级机设计可处理黏性或纤维状物料，同时实现高处理量、严格的粒度控制与低单位能耗。",
    evidence: ["高速锤击", "在线涡轮分级机", "适配黏性与纤维状物料"],
  },
} satisfies Record<ProjectSlug, ProjectCopy>;

export const productCopy: Record<Locale, Record<ProductSlug, ProductCopy>> = { en: productCopyEn, zh: productCopyZh };
export const projectCopy: Record<Locale, Record<ProjectSlug, ProjectCopy>> = { en: projectCopyEn, zh: projectCopyZh };

export const productCategoryLabels = {
  en: { all: "All Systems", grinding: "Grinding & Pulverizing", classification: "Classification & Separation", morphology: "Morphology Control", turnkey: "Turnkey Lines", laboratory: "Laboratory Systems" },
  zh: { all: "全部系统", grinding: "研磨与粉碎", classification: "分级与分离", morphology: "形貌控制", turnkey: "整线总包", laboratory: "实验室系统" },
} satisfies Record<Locale, Record<string, string>>;

export const projectFilterLabels = {
  en: { all: "All", morphology: "Morphology Control", battery: "Battery Materials", epc: "Turnkey EPC", classification: "Powder Classification", impact: "Impact Grinding" },
  zh: { all: "全部", morphology: "形貌控制", battery: "电池材料", epc: "EPC 总包", classification: "粉体分级", impact: "冲击粉碎" },
} satisfies Record<Locale, Record<string, string>>;

export const catalogMetadata = {
  en: {
    title: "LNPE | Advanced Powder Technology",
    description: "A globally recognized powder equipment expert, specializing in grinding, conveying, and particle modification.",
  },
};

const catalogUiEn = {
  productsTitle: "Our Products",
  productsIntro: "Precision Equipment Manufacturing. Dispersion equipment, (nano) grinding equipment, Ingredient system, conveying system.",
  requestSolution: "Request Solution", viewApplications: "View Applications", contactUs: "Contact Us",
  productCapability1: "Grinding, classification, EPC", productCapability2: "Low-contamination process paths", productCapability3: "R&D to production systems",
  featuredSystem: "Featured System", systems: "systems", productFamilies: "Product Families",
  equipmentCatalog: "Equipment catalog",
  catalogIntro: "Browse LNPE grinding, classification, morphology-control, EPC, and laboratory systems by process role.",
  systemsShown: "systems shown", backToProducts: "Back to Products", productOverview: "Technical overview",
  keyFeatures: "Key Features", applications: "Applications", technicalHighlights: "Technical Highlights",
  relatedSystems: "Related systems", relatedSystemsIntro: "Continue comparing LNPE process equipment and solution paths.", allProducts: "All Products",
  equipmentView: "Equipment View", coverAlt: "{title} cover", productAlt: "{title} product image", listingAlt: "{title} listing",
  selectedViewAlt: "{title} selected view", showImage: "Show {title} image {number}", thumbnailAlt: "{title} thumbnail {number}",
  projectsTitle: "Our Projects", projectsIntro: "Discover our latest equipment and projects - engineered for precision, performance, and industrial scale.",
  projectCapability1: "Documented process benefits", projectCapability2: "Equipment-led case evidence", projectCapability3: "EPC and production systems",
  featuredProjectAlt: "{title} featured project", viewFeaturedCase: "View featured case",
  projectWall: "Project evidence wall", projectWallIntro: "Filter documented LNPE equipment deployments by application focus and process role.",
  viewCase: "View case", backToProjects: "Back to Projects", evidenceMarker: "Evidence marker",
  projectImageRecord: "Project image record", projectImageIntro: "Existing project media is presented with a consistent technical case-study crop.",
  discussSystem: "Discuss a Similar System", projectContentAlt: "{title} content image {number}", caseImage: "Case image",
  relatedCases: "Related cases", relatedCasesIntro: "Compare other LNPE projects by process role and application focus.", allProjects: "All Projects",
  relatedProjectAlt: "{title} related project",
};

type CatalogUi = { [Key in keyof typeof catalogUiEn]: string };
export const catalogUi: Record<Locale, CatalogUi> = {
  en: catalogUiEn,
  zh: {
    productsTitle: "产品中心", productsIntro: "精密设备制造。分散设备、（纳米）研磨设备、配料系统及输送系统。",
    requestSolution: "获取解决方案", viewApplications: "查看应用领域", contactUs: "联系我们",
    productCapability1: "粉碎、分级与 EPC", productCapability2: "低污染工艺路径", productCapability3: "从研发到生产的系统",
    featuredSystem: "推荐系统", systems: "套系统", productFamilies: "产品类别", equipmentCatalog: "设备目录",
    catalogIntro: "按工艺用途浏览 LNPE 粉碎、分级、形貌控制、EPC 总包和实验室系统。",
    systemsShown: "套系统", backToProducts: "返回产品中心", productOverview: "技术概述", keyFeatures: "主要特点", applications: "应用领域", technicalHighlights: "技术亮点",
    relatedSystems: "相关系统", relatedSystemsIntro: "继续比较 LNPE 工艺设备与解决方案。", allProducts: "全部产品",
    equipmentView: "设备视图", coverAlt: "{title}封面", productAlt: "{title}产品图片", listingAlt: "{title}目录图片",
    selectedViewAlt: "{title}当前视图", showImage: "查看{title}第 {number} 张图片", thumbnailAlt: "{title}第 {number} 张缩略图",
    projectsTitle: "项目案例", projectsIntro: "了解我们的最新设备与项目，以精密设计满足性能和工业化生产需求。",
    projectCapability1: "有据可查的工艺优势", projectCapability2: "以设备为核心的案例记录", projectCapability3: "EPC 与生产系统",
    featuredProjectAlt: "{title}推荐案例", viewFeaturedCase: "查看推荐案例",
    projectWall: "项目案例展示", projectWallIntro: "按应用领域与工艺用途筛选已有的 LNPE 设备应用案例。",
    viewCase: "查看案例", backToProjects: "返回项目案例", evidenceMarker: "项目要点",
    projectImageRecord: "项目图片记录", projectImageIntro: "已有项目图片采用统一的技术案例展示比例。",
    discussSystem: "咨询类似系统", projectContentAlt: "{title}第 {number} 张项目图片", caseImage: "案例图片",
    relatedCases: "相关案例", relatedCasesIntro: "按工艺用途和应用领域比较其他 LNPE 项目。", allProjects: "全部项目", relatedProjectAlt: "{title}相关案例",
  },
};

export function formatCatalogMessage(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}
