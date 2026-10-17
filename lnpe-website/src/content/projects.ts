import type { Locale } from "@/i18n/config";
import type { ProjectSlug } from "@/i18n/messages/catalog";

type EngineeringCopy = {
  description: string; evidence: string[]; scope: string[]; process: string[];
  inputs: string[]; validation: string[]; captions: string[];
};
type EngineeringRecord = { product: string; sources: string[]; copy: Record<Locale, EngineeringCopy> };

// Existing project pages are photo records, with no customer-specific acceptance
// reports. The text below describes engineering scope and proposed validation,
// not fabricated project conditions or achieved operating results.
export const projectEngineering: Record<ProjectSlug, EngineeringRecord> = {
  "shaping-mill-project": {
    product: "shaping-mill", sources: ["原官网项目1及配图", "LNPE-产品与系统：颗粒形貌控制", "PPT P133–138；冲突样品数据不发布"],
    copy: {
      en: {
        description: "Particle shaping combines controlled impact, friction and classification to adjust particle edges and morphology. This equipment record introduces the shaping route, its supporting systems and the information required to evaluate a similar application.",
        evidence: ["Morphology and particle-size control", "Shaping and fines separation", "Material-specific trials"],
        scope: ["The processing objective is defined by the material: graphite spheroidization, edge rounding or a particular aspect-ratio requirement. A shaping route is selected around these objectives rather than particle size alone.", "The engineering scope can combine feed preparation, a shaping stage, classification, collection and product handling. The number of stages, liner materials and gas circuit depend on the feed and product specification."],
        process: ["Characterize feed particle size, morphology and bulk properties.", "Compare processing intensity and residence time in a material trial.", "Separate fines or off-size fractions and collect the accepted product.", "Check morphology, particle-size distribution and mass balance together before scale-up."],
        inputs: ["Material identity and feed size distribution", "Target particle shape and size limits", "Tap density or surface-area targets, where relevant", "Accepted-product definition and allowable fines", "Throughput, contamination limits and utility conditions"],
        validation: ["A trial should compare before-and-after morphology using an agreed method. A rounder appearance alone does not establish electrochemical or end-use performance.", "Yield is calculated against the agreed accepted-product definition. Feed, accepted material, fines and retained material must be included in the mass balance."],
        captions: ["Shaping application: original project image 01", "Shaping application: original project image 02", "Shaping application: original project image 03"],
      },
      zh: {
        description: "颗粒整形通过受控冲击、摩擦与分级调整颗粒棱角和形貌。本设备记录介绍整形路线、配套环节及同类应用评估需要的信息。",
        evidence: ["形貌与粒度协同控制", "整形与细粉分离", "按物料开展试验"],
        scope: ["加工目标需按物料定义，包括石墨球化、棱角修整或特定长径比要求。路线选择应围绕这些目标，不能只看粒度。", "工程范围可组合来料预处理、整形、分级、收集及成品输送。级数、接触材质和气体回路依据来料与成品要求确定。"],
        process: ["检测来料粒度、形貌与堆积特性。", "通过来料试验比较加工强度和停留时间。", "分离细粉或不合格粒级，收集目标产品。", "结合形貌、粒度分布和物料衡算评估放大方案。"],
        inputs: ["物料身份及来料粒度分布", "目标形貌和粒度上下限", "适用时提供振实密度或比表面积目标", "合格产品定义及允许细粉比例", "处理量、污染控制要求和公用工程条件"],
        validation: ["试验应按约定方法比较加工前后形貌。外观更圆整本身不能证明电化学或终端应用性能。", "收率按约定的合格产品定义计算，衡算应涵盖进料、合格品、细粉及系统残留。"],
        captions: ["整形应用原始项目配图01", "整形应用原始项目配图02", "整形应用原始项目配图03"],
      },
    },
  },
  "jet-pulverizer-project": {
    product: "jet-pulverizer", sources: ["原官网项目2及配图", "产品Word射流/控制性粉碎", "PPT P52–54"],
    copy: {
      en: {
        description: "Controlled jet pulverization adjusts processing intensity for powders that need deagglomeration or limited size reduction. The route is evaluated against oversize removal, fines generation, particle integrity and contact-material requirements.",
        evidence: ["Adjustable processing intensity", "Agglomerate and oversize control", "Product integrity assessment"],
        scope: ["The application may call for breaking agglomerates while retaining primary particles, or reducing a feed to a specified size band. These are different objectives and require different trial settings.", "Source application discussions include post-sintering ternary materials, glass beads and metallic silicon. Mention of an application identifies a route to assess, not a confirmed result for this photo record."],
        process: ["Measure the feed and distinguish agglomerates from primary particles.", "Apply controlled jet processing at trial-selected intensity.", "Classify or screen the product where the specification requires it.", "Compare fines, oversize and particle damage with the untreated sample."],
        inputs: ["Material grade, coating and agglomeration state", "Primary-particle preservation requirements", "Required size band and acceptable fines", "Magnetic or metallic contamination limits", "Target throughput, gas availability and handling requirements"],
        validation: ["Particle-size results should be paired with microscopy or another agreed integrity assessment where coatings or primary particles matter.", "No single-pass recovery or energy-saving percentage can be inferred from the equipment photograph. Confirm recovery and energy consumption in a defined trial or acceptance test."],
        captions: ["Jet pulverization: original project image 01", "Jet pulverization: original project image 02", "Jet pulverization: original project image 03", "Jet pulverization: original project image 04"],
      },
      zh: {
        description: "控制性射流粉碎通过调节加工强度，处理需要解聚或适度减小粒度的粉体。方案应同时评价去粗、细粉生成、颗粒完整性及接触材质要求。",
        evidence: ["加工强度可调", "团聚体与粗颗粒控制", "颗粒完整性评价"],
        scope: ["应用目标可能是打散团聚体并保留一次颗粒，也可能是将来料加工至指定粒级。两类目标应采用不同的试验条件。", "应用资料涉及烧结后三元材料、玻璃微珠及金属硅。这些线索用于判断候选路线，不能视为本图集项目已取得相同结果。"],
        process: ["检测来料，区分团聚体与一次颗粒。", "按试验确定的强度实施射流处理。", "根据产品要求配置分级或筛分。", "对比处理前后的细粉、粗颗粒与颗粒损伤。"],
        inputs: ["材料牌号、包覆情况及团聚状态", "一次颗粒或包覆层保持要求", "目标粒级及允许细粉比例", "磁性物或金属污染限值", "处理量、气源及物料处置条件"],
        validation: ["当包覆层或一次颗粒完整性重要时，粒度检测应结合显微形貌或约定的完整性评价。", "设备图片不能证明单次处理收率或节能比例，回收率与能耗需在条件明确的试验或验收中确认。"],
        captions: ["射流粉碎原始项目配图01", "射流粉碎原始项目配图02", "射流粉碎原始项目配图03", "射流粉碎原始项目配图04"],
      },
    },
  },
  "epc-project": {
    product: "turnkey-epc", sources: ["原官网项目3及配图", "LNPE-产品与系统 EPC及输送", "LNPE-专属服务"],
    copy: {
      en: {
        description: "An integrated powder line connects material feeding, processing, separation, conveying and packaging. EPC planning coordinates equipment interfaces, site conditions, controls and the agreed installation and handover scope.",
        evidence: ["Process and layout coordination", "Equipment and control interfaces", "Commissioning and handover planning"],
        scope: ["A new line starts from the required product and feed characteristics. The process may include dosing, mixing, grinding, classification, screening, magnetic separation, collection and packaging as needed.", "A retrofit also requires an assessment of existing equipment capacity, layout, utilities and control interfaces. New and retained equipment must be assigned clear responsibilities and acceptance boundaries."],
        process: ["Define feed, product, capacity and site requirements.", "Agree the process flow, equipment list, layout and supply boundaries.", "Manufacture and inspect equipment; prepare interfaces and installation documentation.", "Complete installation, commissioning, training and the agreed acceptance and handover procedure."],
        inputs: ["Feed and product specifications, including all material variants", "Required line capacity and operating schedule", "Site dimensions, access, utilities and existing equipment", "Automation, production-data and packaging requirements", "Supply, installation and acceptance responsibilities"],
        validation: ["Agree the material and test conditions, sampling plan and acceptance criteria before commissioning. Mechanical completion and product-quality acceptance are separate milestones.", "The delivery package can include process and layout drawings, equipment manuals, operating guidance, maintenance information and agreed test records. The contract defines the final list."],
        captions: ["Integrated powder line: original project image 01", "Integrated powder line: original project image 02", "Integrated powder line: original project image 03", "Integrated powder line: original project image 04", "Integrated powder line: original project image 05"],
      },
      zh: {
        description: "粉体整线衔接投料、加工、分离、输送与包装。EPC规划协调设备接口、现场条件、控制系统及约定的安装交付范围。",
        evidence: ["工艺与布局协调", "设备及控制接口", "调试与交付计划"],
        scope: ["新建产线从来料与成品要求出发，可按需组合投配料、混合、粉碎、分级、筛分、除磁、收集及包装。", "系统改造还需评估现有设备能力、空间、公用工程及控制接口，明确新增与保留设备的责任分工和验收边界。"],
        process: ["明确原料、产品、产能与现场条件。", "确认流程、设备清单、布局及供货边界。", "组织制造检查，准备接口与安装文件。", "实施安装、调试、培训及约定的验收交付。"],
        inputs: ["包括不同牌号在内的进出料指标", "整线处理量与运行班次", "场地尺寸、进出通道、公用工程和已有设备", "自动化、生产数据与包装要求", "供货、安装及验收责任分工"],
        validation: ["调试前约定物料与试验条件、取样计划和验收指标。机械完工与产品质量验收属于不同节点。", "交付资料可包括工艺及布局图、设备手册、操作指导、维护资料与约定的测试记录，最终清单以合同范围为准。"],
        captions: ["粉体整线原始项目配图01", "粉体整线原始项目配图02", "粉体整线原始项目配图03", "粉体整线原始项目配图04", "粉体整线原始项目配图05"],
      },
    },
  },
  "lithium-iron-phosphate-specialized-classified-jet-mill": {
    product: "jet-mill", sources: ["原官网项目4及配图", "产品Word气流磨", "PPT P187", "海外新闻201157"],
    copy: {
      en: {
        description: "LFP post-treatment combines particle-size control with moisture and contamination management. Jet milling and classification are evaluated alongside collection, material-contact surfaces and subsequent handling.",
        evidence: ["Grinding and classification", "Moisture-control interfaces", "Contamination management"],
        scope: ["The objective is to obtain the agreed particle-size distribution while controlling moisture pickup and material contamination during post-treatment. The feed’s sintering history and agglomeration state affect the processing route.", "Source materials also discuss combining grinding with micro-moisture drying. Such integration is an optional process choice and does not establish that every LFP jet-mill installation has the same drying configuration."],
        process: ["Characterize feed agglomeration, size distribution and moisture.", "Set jet processing and classification conditions from a material trial.", "Collect the finished fraction and coordinate moisture-control and magnetic-separation stages as required.", "Sample the final product using agreed particle-size, moisture and contamination methods."],
        inputs: ["LFP grade, feed state and initial particle size", "Target size distribution and moisture limit", "Magnetic contamination definition and test method", "Required throughput and gas quality", "Material-contact, packaging and room-environment requirements"],
        validation: ["Ceramic or other selected contact surfaces are contamination-control measures; they do not by themselves establish zero contamination.", "Final moisture and particle size must be measured using agreed sample preparation and methods. Electrochemical performance requires the appropriate downstream material or cell evaluation."],
        captions: ["LFP processing: original project image 01", "LFP processing: original project image 02"],
      },
      zh: {
        description: "磷酸铁锂后处理需同时控制粒度、水分与污染。气流粉碎、分级应与收集、接触材质及后续物料处理一并评估。",
        evidence: ["粉碎与分级结合", "水分控制接口", "污染控制措施"],
        scope: ["工艺目标是在达到约定粒度分布的同时，控制后处理中的吸湿与物料污染。来料烧结历史及团聚状态会影响路线。", "资料还介绍了粉碎与微水分干燥的集成方向。这属于可评估的工艺配置，不代表每套磷酸铁锂气流磨都有相同干燥系统。"],
        process: ["检测来料团聚、粒度分布与水分。", "通过试验确定气流加工及分级条件。", "收集合格产品，按需衔接水分控制与除磁。", "依约定方法检测成品粒度、水分及污染指标。"],
        inputs: ["磷酸铁锂牌号、来料状态和初始粒度", "目标粒度分布与水分限值", "磁性物指标定义与检验方法", "处理量与气体品质", "接触材质、包装及环境要求"],
        validation: ["陶瓷等接触材质属于污染控制措施，不能仅凭材质宣称零污染。", "成品水分和粒度需采用约定的取样、制样及检测方法；电化学性能仍需相应材料或电池测试评价。"],
        captions: ["磷酸铁锂加工原始项目配图01", "磷酸铁锂加工原始项目配图02"],
      },
    },
  },
  "air-classification-project": {
    product: "air-classifier", sources: ["原官网项目5及配图", "产品Word气流分级", "PPT P99–100"],
    copy: {
      en: {
        description: "Air classification separates a feed into defined particle-size fractions. A project may remove coarse particles, reduce excess fines or produce a narrower size band, with collection paths selected for each fraction.",
        evidence: ["Coarse and fine fraction separation", "Adjustable cut-point evaluation", "Fraction recovery and collection"],
        scope: ["Classification uses the balance between aerodynamic drag and centrifugal separation around a rotating classifier. Its cut point depends on the material as well as operating conditions.", "Single-stage or multi-stage arrangements are evaluated according to the required product band. Coarse material may be retained, returned for grinding or collected separately; recirculation is a process decision."],
        process: ["Disperse and feed the powder consistently.", "Set airflow and classifier operation for the trial material.", "Collect coarse, accepted and fine fractions as required.", "Measure size distribution and recovery for each collected stream."],
        inputs: ["Material density, morphology and agglomeration", "Feed particle-size distribution and moisture", "Required cut point or accepted size band", "Recovery target and disposition of other fractions", "Throughput, collection and gas-circuit requirements"],
        validation: ["A narrow size distribution should be checked with both the fine and coarse tails of the distribution. A single D50 value does not establish the width of a product band.", "Recovery, separation sharpness and throughput must be evaluated together under the same feed and operating conditions."],
        captions: ["Air classification: original project image 01", "Air classification: original project image 02"],
      },
      zh: {
        description: "气流分级将来料分成指定粒级，可用于去粗、脱细或获得较窄粒度段，并为各股物料配置相应收集路径。",
        evidence: ["粗细粒级分离", "切割粒径调节评价", "各粒级回收与收集"],
        scope: ["分级通过气流曳力与旋转分级区的离心分离作用实现粒级划分，切割点受物料特性及运行条件影响。", "按目标粒级评估单级或多级方案。粗料可保留、回磨或单独收集，是否循环应由具体流程确定。"],
        process: ["稳定供料并使粉体分散。", "按试验物料调整气量与分级运行条件。", "按需收集粗料、目标产品及细粉。", "分别测量各股物料的粒度分布与回收率。"],
        inputs: ["材料密度、形貌与团聚情况", "来料粒度分布及水分", "目标切割点或合格粒级范围", "回收率目标和其他粒级去向", "处理量、收集及气体回路要求"],
        validation: ["评价窄粒级时应检查分布两端，单个D50数值不能说明产品粒级宽度。", "回收率、分离精度与处理量需在相同来料及运行条件下综合评价。"],
        captions: ["气流分级原始项目配图01", "气流分级原始项目配图02"],
      },
    },
  },
  "impact-mill-project": {
    product: "impact-mill", sources: ["原官网项目6及配图", "产品Word机械粉碎", "海外LNI系列文案"],
    copy: {
      en: {
        description: "A classifying impact mill combines mechanical size reduction with particle-size separation. Rotor configuration, classifier operation and the air circuit are selected around the feed’s hardness, stickiness, fibres and temperature sensitivity.",
        evidence: ["Mechanical impact grinding", "Integrated classification", "Feed and temperature assessment"],
        scope: ["Mechanical impact reduces particle size, while the classifier controls which fraction leaves the grinding stage. Coarser material remains for further processing according to the system design.", "Feed variability, wear, heat generation, adhesion and cleaning requirements influence configuration. A sticky or fibrous material needs a dedicated trial rather than an assumption of universal suitability."],
        process: ["Characterize feed size, moisture and processing sensitivity.", "Select rotor, contact surfaces and operating conditions for a trial.", "Coordinate milling, classification, airflow and product collection.", "Assess size distribution, throughput, temperature and cleaning access."],
        inputs: ["Material grade, hardness, moisture and feed size", "Target product distribution and throughput", "Softening, adhesion or thermal limits", "Contact-material and contamination requirements", "Cleaning frequency, product changes and utility availability"],
        validation: ["Measure product temperature at the agreed location and operating load. Air cooling or a short residence time does not imply that every feed experiences no temperature rise.", "Record wear and cleaning requirements alongside processing results to inform maintenance and product-change planning."],
        captions: ["Impact milling: original project image 01", "Impact milling: original project image 02", "Impact milling: original project image 03"],
      },
      zh: {
        description: "分级式机械磨将机械粉碎与粒级分离结合。转子、分级运行条件及气路需围绕来料硬度、黏性、纤维特征和温度敏感性配置。",
        evidence: ["机械冲击粉碎", "集成粒度分级", "来料与温度评价"],
        scope: ["机械冲击减小颗粒尺寸，分级环节控制离开粉碎段的粒级，粗颗粒根据系统结构继续加工。", "来料波动、磨损、温升、黏附及清洁要求影响配置。黏性或纤维材料需进行针对性试验，不能假定所有物料均适用。"],
        process: ["确认来料粒度、水分与加工敏感性。", "选择转子、接触材质及试验运行条件。", "协调粉碎、分级、气量与成品收集。", "评价粒度分布、处理量、温度及清洁可达性。"],
        inputs: ["材料牌号、硬度、水分及来料粒度", "成品粒度分布与处理量", "软化、黏附或温度限制", "接触材质与污染要求", "清洁频率、换料与公用工程条件"],
        validation: ["在约定测点与负荷下检测成品温度。气流冷却或短停留不等于所有物料均无温升。", "在加工结果之外记录磨损与清洁要求，为维护及换料计划提供依据。"],
        captions: ["机械粉碎原始项目配图01", "机械粉碎原始项目配图02", "机械粉碎原始项目配图03"],
      },
    },
  },
};

export const projectDetailLabels: Record<Locale, {
  scope: string; process: string; inputs: string; validation: string; enquiry: string; product: string; note: string;
  technical: string; technicalIntro: string; records: string; archive: string;
}> = {
  en: { scope: "Engineering scope", process: "Process and delivery sequence", inputs: "Information for a similar application", validation: "Validation and handover", enquiry: "Discuss this application", product: "Related equipment", note: "Engineering notes describe the process and evaluation requirements. Project-specific supply boundaries and acceptance results are established in the agreed technical documentation.", technical: "Application & process notes", technicalIntro: "Explore material-specific processing objectives and the tests that inform equipment selection.", records: "notes", archive: "Historical technical reports" },
  zh: { scope: "工程范围", process: "工艺与交付步骤", inputs: "同类应用的选型输入", validation: "验证与交付", enquiry: "咨询同类应用", product: "相关设备", note: "以下说明介绍工艺与评价要求，项目具体供货边界及验收结果以约定技术文件为准。", technical: "应用与工艺说明", technicalIntro: "按物料查阅加工目标，以及用于设备选型的试验与评价要点。", records: "项", archive: "历史技术报道" },
};

export type TechnicalNote = { id: string; product: string; source: string; copy: Record<Locale, { title: string; body: string; evaluation: string }> };
function note(id: string, product: string, source: string, zh: [string, string, string], en: [string, string, string]): TechnicalNote {
  return { id, product, source, copy: { zh: { title: zh[0], body: zh[1], evaluation: zh[2] }, en: { title: en[0], body: en[1], evaluation: en[2] } } };
}
export const technicalNotes: TechnicalNote[] = [
  note("T01", "jet-pulverizer", "PPT P52", ["单晶三元材料：控制粉碎与粒度分布", "烧结后三元材料的处理需区分团聚体解离与一次颗粒破碎，比较射流与常规气流路线时应采用相同来料和目标粒级。", "结合细粉比例、粗颗粒残留与显微形貌评价，不能只以D50判断一次颗粒保持情况。"], ["Single-crystal ternary materials: controlled grinding", "Post-sintering treatment must distinguish deagglomeration from primary-particle breakage. Compare controlled jet and conventional jet routes using the same feed and target band.", "Evaluate fines, remaining coarse particles and microscopy together; D50 alone does not establish particle preservation."]),
  note("T02", "jet-pulverizer", "PPT P53", ["玻璃微珠：目标粒级与磨耗控制", "玻璃微珠加工需控制目标尺寸区间，并关注细粉、铁污染与接触件磨耗。控制加工强度是候选工艺方向。", "评价需统一进料、合格品口径和能耗边界，电耗单位应包含明确的质量分母。"], ["Glass beads: size band and wear control", "Glass-bead processing requires a defined product band and attention to fines, iron contamination and contact-part wear. Controlled processing intensity is a route to assess.", "Use the same feed, accepted-product definition and energy boundary; specific energy must state its mass denominator."]),
  note("T03", "jet-pulverizer", "PPT P54", ["光伏金属硅：粒级与颗粒形貌", "金属硅粉路线需平衡目标粒级、颗粒形貌与污染控制，不能把某个窄粒级的收率套用于全部硅粉。", "试验应记录来料等级、目标上下限、细粉比例、铁含量方法及接触件状态。"], ["Metallic silicon: size band and morphology", "Metallic silicon processing balances product size band, morphology and contamination control. Recovery for one narrow band cannot be generalized to all silicon powders.", "Record feed grade, lower and upper size limits, fines, the iron-test method and contact-part condition."]),
  note("T04", "jet-mill", "PPT P65", ["气流磨：能耗比较的方法", "气流动力受压力、温度与流量共同影响。比较不同气流磨时，同喷嘴并不自动代表相同系统能耗。", "需同时记录气源制备、加热、主机及辅助系统能耗，以相同产品质量和处理量作为比较基础。"], ["Jet mills: comparing energy use", "Jet performance depends on pressure, temperature and flow. Identical nozzles do not automatically imply an identical system-energy boundary.", "Account for gas preparation, heating, the mill and auxiliaries at comparable product quality and throughput."]),
  note("T05", "technologies/steam-jet-mill", "PPT P75–77", ["粉煤灰：工业余热与建材用途", "可评估利用工业余热蒸汽进行粉煤灰分散、粉碎与分级，再围绕建材用途评价成品。", "原灰来源、含水与化学组成影响结果；掺合材料评价需明确掺量、龄期和所用试验方法。"], ["Fly ash: waste heat and building-material use", "Steam produced from industrial waste heat can be assessed for ash dispersion, grinding and classification, followed by evaluation for the intended building-material use.", "Ash origin, moisture and chemistry matter. Cementitious-use tests must define dosage, curing age and method."]),
  note("T06", "technologies/steam-jet-mill", "PPT P78–82", ["固硫灰：规模化处理与用途验证", "固硫灰的原料特征与普通粉煤灰不同，粉磨放大需考虑组成、水分、流动性及成品用途。", "历史设计规模不能作为新项目产能保证；需用代表性原料验证连续运行、收集与产品稳定性。"], ["Sulfur-fixing combustion ash: scale-up", "This ash differs from conventional fly ash. Scale-up must consider composition, moisture, flow and intended product use.", "Historic design capacities do not guarantee a new project. Representative feed is needed to verify continuous operation, collection and consistency."]),
  note("T07", "technologies/steam-jet-mill", "PPT P83–84", ["水渣与钢渣：粒径、活性与能源成本", "粒度变化可能影响矿渣类材料的活性评价，粉磨工艺应结合目标用途与能源条件选择。", "材料活性需按约定方法实测；电价、汽价和系统边界应按实际条件重算，历史测算不是报价。"], ["Granulated slag and steel slag: fineness and activity", "Particle size can affect activity evaluation. Select grinding conditions against product use and the available energy supply.", "Test activity using an agreed method and recalculate electricity and steam costs for actual conditions; historical estimates are not quotations."]),
  note("T08", "technologies/steam-jet-mill", "PPT P85–86", ["脱硫石膏：粉碎、干燥与水分形态", "石膏处理需区分游离水与结晶水，粉碎与干燥的温度选择必须考虑目标产品相态。", "试验需同时检测粒度、含水和适用时的相组成，不能仅凭总失重判定满足产品要求。"], ["Desulfurization gypsum: grinding and moisture", "Distinguish free moisture from crystal water. Grinding and drying temperatures must reflect the required product phase.", "Evaluate particle size, moisture and phase composition where applicable; total mass loss alone does not establish suitability."]),
  note("T09", "technologies/steam-jet-mill", "PPT P87–88", ["石油焦：余热粉磨与燃料应用", "玻璃生产余热与石油焦粉磨结合，需要共同评估热源波动、粉体粒度及后续燃料输送需求。", "原料与粉尘风险、气体回路、温度和监测要求应由系统设计明确，不能将蒸汽介质等同于无风险。"], ["Petroleum coke: waste-heat milling for fuel", "Combining glass-plant waste heat with coke milling requires assessment of heat-source variation, product size and subsequent fuel conveying.", "Define material and dust risks, gas circuit, temperature and monitoring in the system design. Steam use does not by itself establish risk-free operation."]),
  note("T10", "technologies/steam-jet-mill", "PPT P86", ["粉碎干燥：不同物料分别评估", "拟薄水铝石、褐煤、活性硅酸钙和石油焦具有不同的含水形态、热敏感性与终端用途，不能共用一套干燥结果。", "每种物料分别确认身份、初始水分、成品要求及热处理后的性能；拟薄水铝石不与勃姆石自动等同。"], ["Grinding and drying: separate material assessments", "Pseudo-boehmite, lignite, active calcium silicate and petroleum coke differ in moisture, thermal response and end use; one drying result cannot represent all four.", "Confirm each identity, initial moisture, product requirement and post-treatment properties. Pseudo-boehmite is not automatically interchangeable with boehmite."]),
  note("T11", "technologies/steam-jet-mill", "PPT P90", ["硬质矿物：细化与磨耗评价", "碳化硅、叶腊石、黑滑石、伊利石和石英的硬度、结构与纯度要求不同，应分别评价蒸汽加工路线。", "记录原料粒度、蒸汽条件、成品分布和接触件磨耗；不得从设备系列名称推导所有材料均可达到同一粒度。"], ["Hard minerals: fineness and wear", "Silicon carbide, pyrophyllite, black talc, illite and quartz differ in hardness, structure and purity requirements. Evaluate the steam-processing route separately.", "Record feed size, steam conditions, product distribution and contact-part wear. A series name does not establish the same achievable size for every material."]),
  note("T12", "technologies/steam-jet-mill", "PPT P91", ["重钙：细度与处理量的权衡", "重钙成品粒度目标变化会改变加工负荷，处理量与能耗应对应同一产品规格比较。", "保持原料批次与检测方法可比，并将全部能源消耗和实际能源价格纳入成本评价。"], ["Ground calcium carbonate: fineness and throughput", "Changing the product-size target changes processing duty. Compare throughput and energy at the same product specification.", "Use comparable feed and measurement methods, and include all energy inputs at actual prices in the cost evaluation."]),
  note("T13", "laboratory-equipment", "PPT P94；SiC文字与Quartz图冲突，数据不发布", ["超细加工试验：样品与报告对应", "超细粒度试验应建立来料名称、牌号、批次、处理条件与检测报告之间的一一对应关系。", "核对分散方法、仪器范围和报告样品编号后再比较数据，不将不同材料的文字与分布图组合成同一结果。"], ["Ultrafine trials: sample and report traceability", "Keep an explicit link between material name, grade, batch, processing conditions and the measurement report.", "Check dispersion method, instrument range and sample identifier before comparing results. Do not combine one material’s description with another material’s size plot."]),
  note("T14", "air-classifier", "PPT P99–100", ["氧化铈与磨料：去粗、脱细及窄粒级", "抛光与磨料应用可能同时限制粗颗粒和细粉，需要区分去粗、脱细和获取中间粒级三种任务。", "分别检测各股产品的粒度分布与回收率；只有D50或分级转速不足以描述分离质量。"], ["Ceria and abrasives: coarse and fine removal", "Polishing and abrasive applications may limit both coarse particles and fines. Distinguish coarse removal, fines removal and recovery of an intermediate band.", "Measure each product stream’s size distribution and recovery; D50 or classifier speed alone does not describe separation quality."]),
  note("T15", "shaping-mill", "PPT P133–138；P136/P138标签冲突，成组数据不发布", ["石墨与焦类：整形、振实与收率", "石墨碎、针状石油焦和天然石墨不能共用一组整形指标。路线需按原料形貌和目标产品定义选择。", "同步比较形貌、振实密度、粒度及合格品收率，保留样品编号与质量衡算。"], ["Graphite and coke: shaping, density and yield", "Graphite scrap, needle petroleum coke and natural graphite cannot share a single set of shaping claims. Select the route around feed morphology and the accepted product.", "Compare morphology, tap density, particle size and accepted-product yield, retaining sample identification and a mass balance."]),
  note("T16", "jet-mill", "PPT P187", ["磷酸铁锂后处理：多指标协同", "磷酸铁锂后处理应将粒度、水分、磁性物控制与输送、包装环节连贯考虑。", "磁性物数量、尺寸阈值、取样量和检验方法需共同定义；单一数量单位不能直接替代完整指标。"], ["LFP post-treatment: coordinating specifications", "Coordinate particle size, moisture and magnetic-contamination control with conveying and packaging.", "Define magnetic-particle count, size threshold, sample quantity and method together. A count unit alone is not a complete specification."]),
  note("T17", "turnkey-epc", "PPT P212–213", ["脉冲清灰：运行与过滤恢复", "脉冲喷吹与诱导气流用于清理滤材表面的积粉，清灰效果应与压差、过滤状态和粉体特性一同评价。", "试验应记录过滤面积、气量、压差、喷吹条件和排放检测。清灰原理本身不证明某个排放保证值。"], ["Pulse cleaning: filtration and operating recovery", "Pulse and induced airflow remove accumulated powder from filter surfaces. Evaluate cleaning with pressure drop, filtration state and powder characteristics.", "Record filter area, flow, pressure drop, pulse conditions and emission measurements. The cleaning principle alone does not establish an emission guarantee."]),
];
