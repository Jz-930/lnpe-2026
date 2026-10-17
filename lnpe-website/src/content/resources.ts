import type { Locale } from "@/i18n/config";

export const resourceVideos = [
  { id: "15913", zh: "LNJ-6A结构介绍", en: "LNJ-6A structure", group: "laboratory-equipment" },
  { id: "15914", zh: "LNJ-6A工作原理", en: "LNJ-6A working principle", group: "laboratory-equipment" },
  { id: "16024", zh: "机械冲击磨工作原理", en: "Impact mill working principle", group: "impact-mill" },
  { id: "16026", zh: "脉冲除尘系统", en: "Pulse-jet dust collection", group: "technologies/dust-collection" },
  { id: "16028", zh: "密相气力输送", en: "Dense-phase pneumatic conveying", group: "technologies/pneumatic-conveying" },
  { id: "16029", zh: "LNJ-18A-2设备介绍", en: "LNJ-18A-2 introduction", group: "laboratory-equipment" },
  { id: "16034", zh: "LNPE 2016企业影像", en: "LNPE 2016 company film", group: null },
  { id: "16064", zh: "气流分级机", en: "Air classifiers", group: "air-classifier" },
  { id: "16155", zh: "硫磺粉碎设备", en: "Sulphur grinding mill", group: "technologies/sulfur-pulverizer" },
  { id: "16256", zh: "LNSE-120HT节能气流磨", en: "LNSE-120HT energy-saving jet mill", group: "technologies/energy-saving-jet-mill" },
  { id: "23329", zh: "金属粉末气流分级", en: "Metal powder air classification", group: "air-classifier" },
  { id: "28710", zh: "LNP-18A设备记录", en: "LNP-18A equipment record", group: "shaping-mill" },
  { id: "32427", zh: "石墨粉碎与整形生产线", en: "Graphite milling and shaping line", group: "technologies/graphite-production-line" },
  { id: "42654", zh: "LNP-1200A设备记录", en: "LNP-1200A equipment record", group: "shaping-mill" },
  { id: "53726", zh: "机械冲击磨设备记录", en: "Impact mill equipment record", group: "impact-mill" },
  { id: "54055", zh: "气流磨设备记录", en: "Jet mill equipment record", group: "jet-mill" },
];

export const resourceFaq: Record<Locale, [string, string][]> = {
  zh: [
    ["粒度指标应该怎样描述？", "请同时提供来料粒度、目标D10/D50/D90或其他分位值，以及粗颗粒上限。D50是累计分布达到50%时的粒径，不代表最大粒径；不同检测方法和分散条件下的数据不能直接比较。"],
    ["粉碎、解聚、分级与整形有什么区别？", "粉碎以减小颗粒尺寸为主要目标；解聚重在分散团聚体；分级利用颗粒在流场中的运动差异分离粒级；整形调整颗粒外形。实际路线可能组合多个单元，且并非所有物料都适合相同顺序。"],
    ["气流磨与机械磨怎样选择？", "先看硬度、磨蚀性、韧性、热敏性与目标粒度，再比较纯度、形貌、产能和公用工程条件。机械作用、气流作用及分级结构各有适用条件，通常需用代表样品验证。"],
    ["哪些情况需要惰性气体系统？", "材料的氧敏感性、可燃性与工艺气氛要求是评估依据。需确认物料安全资料、氧含量目标、密封、气体循环与监测方案；采用惰性气体并不自动代表整套设备满足所有防爆要求。"],
    ["如何判断节能或处理量？", "比较时需保持原料、进出料粒度、测试方法与系统边界一致。气源、蒸汽、输送、收集等辅助单元的消耗也需明确；某次试验的单位能耗不能直接推广到其他物料。"],
    ["材料图库是否代表每项都有相同的试验记录？", "图库用于说明材料身份、加工关注点与候选路线。图片和目录条目不等同于性能保证；特定材料的样品来源、工况与结果应通过对应试验记录确认。"],
    ["能否先加工样品，再决定采购？", "可以通过来料试验讨论加工适配性，也可咨询OEM试制。先确认目标、方法、样品要求和可用设备，再安排试验或加工计划。"],
    ["项目报价需要哪些信息？", "材料与目标指标、处理量、运行时间、现场空间、公用工程、接触材质、自动化和供货范围共同影响方案。现有设备改造还需提供型号、流程与瓶颈说明。"],
    ["怎样获得型号参数、说明书或证书？", "在技术资料咨询中说明设备系列、型号、用途和所需文件。型号版本、配置与供货范围会影响文件适用性，设备操作应使用对应版本的手册。"],
    ["历史视频和新闻中的配置还能使用吗？", "历史资料用于了解原理和设备发展。具体型号的当前配置、可供范围和指标应在本次项目选型中确认。"],
  ],
  en: [
    ["How should particle size targets be specified?", "Provide feed size, target D10/D50/D90 or other percentiles, and an oversize limit. D50 is the diameter at 50% of a cumulative distribution, not the largest particle. Results from different measurement and dispersion methods are not directly interchangeable."],
    ["How do grinding, deagglomeration, classification and shaping differ?", "Grinding primarily reduces particle size; deagglomeration disperses clusters; classification separates fractions through different particle behaviour in a flow field; shaping changes particle morphology. A process may combine these operations, but one sequence does not suit every material."],
    ["How are jet and mechanical mills compared?", "Begin with hardness, abrasiveness, toughness, heat sensitivity and size targets, then consider purity, morphology, throughput and utilities. Mechanical action, gas-driven action and classifier arrangements suit different conditions; representative trials help establish the choice."],
    ["When is an inert-gas system relevant?", "Oxygen sensitivity, combustibility and process-atmosphere requirements guide the assessment. Material safety data, oxygen targets, sealing, gas circulation and monitoring need review. An inert atmosphere alone does not establish complete explosion-protection compliance."],
    ["How should energy use and throughput be assessed?", "Compare like-for-like feed, product size, measurement methods and system boundaries. Identify utilities consumed by gas or steam supply, conveying and collection. A trial's specific energy figure does not automatically apply to another material."],
    ["Does every directory entry represent an identical level of testing?", "The directory explains material identity, processing considerations and candidate routes. Photographs and entries are not performance guarantees. Sample origin, operating conditions and results require the corresponding trial record."],
    ["Can samples be processed before selecting equipment?", "Material trials can assess suitability, and OEM pilot processing can also be discussed. Agree objectives, methods, sample requirements and available equipment before scheduling work."],
    ["What information is needed for a quotation?", "Material and product targets, throughput, operating hours, space, utilities, contact materials, automation and supply scope determine the proposal. Retrofits also require existing equipment details, flowsheets and bottleneck descriptions."],
    ["How can I obtain model data, manuals or certificates?", "Specify the equipment family, model, intended use and documents required in a technical-document enquiry. Versions, configuration and supply scope affect applicability; operate equipment using the manual for its actual version."],
    ["Do historical videos and news describe current configurations?", "Historical material helps explain principles and equipment development. Current configurations, availability and performance requirements are confirmed during the new project's selection process."],
  ],
};
