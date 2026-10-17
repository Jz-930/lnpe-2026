import type { Locale } from "@/i18n/config";

export type EditorialSection = { id: string; title: string; intro: string; items: { title: string; text: string }[] };
const section = (id: string, title: string, intro: string, items: [string, string][]): EditorialSection => ({ id, title, intro, items: items.map(([title, text]) => ({ title, text })) });

export const companyDetails: Record<Locale, EditorialSection[]> = {
  zh: [
    section("history", "发展沿革 · 从研究到产业应用", "粉碎、分级与颗粒表面处理技术的积累，逐步延伸至成套粉体工程。", [
      ["2006 · 公司与研究所", "2006年2月成立绵阳流能粉体设备有限公司，同年与西南科技大学合作成立流能技术研究所，围绕气流粉碎与分级开展研究。"],
      ["2007—2009 · 控制性粉碎", "发展面向玻璃微珠、反光材料和人造金刚石微粉的控制性粉碎技术，关注粒度区间与颗粒形貌的协调。"],
      ["2010—2013 · 能源与新工艺", "拓展金属硅粉加工应用，发展节能型气流磨与大型蒸汽动能磨，探索不同工作介质的粉碎路线。"],
      ["2017—2019 · 新能源材料", "围绕磷酸铁锂，进一步拓展三元正极、负极和隔膜材料加工，并推进海外设备项目。"],
      ["2020—2023 · 加工基地与专用设备", "德阳金山工厂投入使用并开展粉体OEM加工；推进磷酸铁锂机械粉碎、三元材料射流粉碎及硅碳粉碎分级设备。"],
    ]),
    section("bases", "制造与加工基地", "两类基地分别承担装备制造与粉体加工任务，试验结果用于衔接设备选型和工艺放大。", [
      ["绵阳 · 总部与装备制造", "总部位于四川绵阳，业务涵盖研发、工艺设计、设备制造、装配与工程服务。产品展厅展示设备部件及工艺结构，来访可结合项目安排技术交流。"],
      ["德阳 · 微纳粉体加工", "四川流能微纳技术有限公司由绵阳流能投资建设，2020年建成投入使用。基地配置超微粉体加工与试验设备，提供粉体OEM加工及新材料开发协作。"],
      ["制造工艺", "车削、铣削、镗削、数控加工与激光切割等工序服务于设备零部件制造；接触物料部件可结合磨损、纯度与清洁要求评估陶瓷、金属及表面处理方案。"],
      ["质量检查", "依据部件功能安排尺寸、动平衡及相关检测。三坐标、三轴影像与探伤等检测手段用于不同零件，交付时按项目约定确认设备与文件。"],
    ]),
    section("purpose", "愿景、工作环境与人才发展", "以技术研究推动超微粉体材料加工能力的持续提升。", [
      ["愿景与使命", "面向高水平粉体装备制造，以科技创新支持超微粉体材料升级；将研发、实验和工程实施结合起来，围绕客户的实际加工目标完善设备。"],
      ["工作与交流", "办公区域、展厅与制造现场承担不同的协作任务；技术交流围绕材料、设备与生产场景展开，考察路线可在预约时确认。"],
      ["人才培养", "重视专业培养、职业规划与跨岗位交流。研发、机械、电气、工艺和服务方向的合作或人才咨询，可通过联系页说明专业背景与意向方向。"],
    ]),
    section("credentials", "研发成果与项目资料", "研究能力与工程经验需要落实到具体材料、设备和项目条件。", [
      ["研究合作", "流能技术研究所与西南科技大学开展合作，研究方向包括空气动力学、气固两相流、气流粉碎、分级、除尘与输送。"],
      ["成果与证书查询", "公司资料介绍了科研项目、专利与获奖成果。项目选型如需核对特定设备的专利、证书、适用主体或有效期，请说明设备名称与采购要求，申请对应资料。"],
      ["全球项目支持", "面向中国及海外客户提供咨询、物料试验、设备与整线工程支持。项目地区、语言、现场服务和交付范围在方案阶段共同确认。"],
    ]),
  ],
  en: [
    section("history", "Development · research into industrial practice", "Grinding, classification and particle treatment have developed into integrated powder engineering services.", [
      ["2006 · Company and institute", "Mianyang Liuneng Powder Equipment Co., Ltd. was established in February 2006. The Liuneng Technology Research Institute was formed with Southwest University of Science and Technology in the same year, focusing on jet grinding and classification."],
      ["2007–2009 · Controlled pulverization", "Controlled pulverization was developed for glass beads, reflective materials and synthetic diamond micropowders, with attention to both particle size fractions and particle morphology."],
      ["2010–2013 · Energy and process development", "The business expanded into silicon powder processing, energy-saving jet mills and large steam jet mills, exploring different grinding media and process routes."],
      ["2017–2019 · Battery materials", "Work on lithium iron phosphate expanded into ternary cathodes, anode materials and separator materials, alongside overseas equipment projects."],
      ["2020–2023 · Processing base and dedicated equipment", "The Deyang Jinshan factory began operation and powder OEM processing. Development included LFP mechanical grinding, ternary-material jet pulverization and silicon–carbon grinding and classification."],
    ]),
    section("bases", "Manufacturing and powder processing bases", "Equipment manufacturing and powder processing have distinct roles, connected through testing, equipment selection and scale-up.", [
      ["Mianyang · Headquarters and equipment", "The Sichuan headquarters brings together R&D, process design, manufacturing, assembly and engineering services. Its showroom presents equipment parts and process structures; technical visits can be arranged around a project brief."],
      ["Deyang · Micro and nano powder processing", "Sichuan Liuneng Micro-Nano Technology Co., Ltd., invested in by Mianyang Liuneng, began operation in 2020. Its processing and testing equipment supports powder OEM services and collaborative material development."],
      ["Manufacturing processes", "Turning, milling, boring, CNC machining and laser cutting support component production. Metal, ceramic and surface-treatment options for product-contact parts are evaluated against wear, purity and cleaning requirements."],
      ["Quality inspection", "Dimensional inspection, dynamic balancing and other checks are selected for each component's function. Coordinate measurement, optical measurement and flaw detection serve different parts; equipment and documentation are checked against the agreed project scope."],
    ]),
    section("purpose", "Purpose, workplace and professional development", "Research supports continued improvement in ultrafine powder processing.", [
      ["Vision and mission", "LNPE aims to advance powder equipment manufacturing through innovation that supports material development. Research, trials and engineering work together around the customer's processing objectives."],
      ["Work and collaboration", "Office areas, the showroom and manufacturing facilities support different forms of collaboration. Visits and technical discussions can focus on the materials, equipment and production conditions relevant to a project."],
      ["Professional development", "Professional training, career development and cross-functional collaboration are part of the company's approach. For opportunities in research, mechanical or electrical engineering, process development or service, contact LNPE with your background and area of interest."],
    ]),
    section("credentials", "Research achievements and project documentation", "Research capability and engineering experience are considered in relation to the material, equipment and project conditions.", [
      ["Research collaboration", "The Liuneng Technology Research Institute works with Southwest University of Science and Technology on aerodynamics, gas–solid flow, jet grinding, classification, dust collection and pneumatic conveying."],
      ["Patent and certificate enquiries", "Company literature describes research projects, patents and awards. For procurement checks, identify the equipment and documentation requirements so that relevant patents, certificates, issuing entities and validity can be confirmed."],
      ["International project support", "Consultation, material testing, equipment and integrated engineering services support customers in China and overseas. Destination, language, site services and delivery scope are agreed during project planning."],
    ]),
  ],
};

export const researchDetails: Record<Locale, EditorialSection[]> = {
  zh: [
    section("institute", "流能技术研究所", "以空气动力学与气固两相流为基础，连接设备结构、流场与粉体加工效果。", [
      ["研究方向", "研究范围包括气流粉碎、机械粉碎、气流分级、除尘净化和气力输送。关注颗粒受力、碰撞、分散及分离过程，使设备结构与物料特性相适应。"],
      ["合作研发", "与西南科技大学合作组建研究团队，结合教授、研究员与博士等人员的研究经验。针对新材料需求，可以围绕加工目标、测试方法和设备配置组织合作验证。"],
      ["数值模拟", "运用FLUENT等流体力学工具分析设备内气固两相流场，比较粉碎和分级结构参数与流动参数。模拟为结构设计提供参考，并与实际物料试验配合使用。"],
    ]),
    section("analysis", "实验中心与检测能力", "检测项目根据材料用途与加工目标选择，结果需要同时注明样品和测试方法。", [
      ["粒度分布", "激光粒度分析用于评价粉碎、分级前后的粒径分布。D10、D50、D90以及粗颗粒控制目标应与分散方式、测试条件一起确认。"],
      ["颗粒形貌", "电子显微镜及扫描电镜观察可用于比较颗粒形状、团聚状态和表面特征，辅助评价解聚、整形与粉碎效果。"],
      ["比表面积", "比表面积分析为细化程度、表面状态与材料使用需求提供补充信息。不同材料的预处理与测试条件需保持可比。"],
      ["振实性能", "振实比重测试帮助观察粉体堆积表现，适用于对装填与加工性能有要求的材料；结果应结合粒度和形貌共同分析。"],
      ["含水状态", "水分分析用于识别进料、结团与收集环节的相关影响，为微量水分去除、干燥和储存条件提供依据。"],
      ["综合评价", "可根据目标组合检测项目；最终报告内容、检测方法、留样及第三方检测要求，在试验前确认。"],
    ]),
    section("trial", "从来料试验到工艺放大", "先确认材料和目标，再用样品验证候选路线。", [
      ["1 · 提交任务", "提供物料名称、成分、来料粒度、含水量、目标粒度、产能以及纯度、形貌或温度等要求；附现有检测方法和物料安全信息。"],
      ["2 · 确认试验条件", "工程师评估设备配置、样品数量、包装运输与清洁要求，并确认需测试的工况和评价方式；请在寄样前取得接收安排。"],
      ["3 · 加工与取样", "按约定工况进行粉碎、解聚、分级或整形，记录原料、运行条件和样品编号，必要时比较不同配置。"],
      ["4 · 检测与讨论", "比较进出料及不同粒级的检测结果，识别粗粒、收率、磨损或团聚等影响因素，整理下一步调整建议。"],
      ["5 · 放大与工程设计", "结合连续运行、处理量、公用工程、收集和现场布局评估放大方案。实验室结果不直接等同于整线的合同指标。"],
    ]),
    section("collaboration", "新材料合作与成果资料", "工艺开发可以从一个明确的问题开始，例如粒度分布、杂质控制或形貌改善。", [
      ["合作内容", "可讨论小样验证、工艺比较、设备适配与OEM试制。双方在开始前确认样品使用范围、记录内容、知识产权与资料保密安排。"],
      ["研究成果", "研究所参与过科研项目并开展专利与论文研究。需要项目、专利或证书文件时，可按具体技术方向申请相应公开资料。"],
    ]),
  ],
  en: [
    section("institute", "Liuneng Technology Research Institute", "Aerodynamics and gas–solid flow connect equipment geometry, flow fields and powder processing behaviour.", [
      ["Research areas", "Research covers jet and mechanical grinding, air classification, dust collection and pneumatic conveying. Particle forces, collisions, dispersion and separation are studied to match equipment structures to material behaviour."],
      ["Collaborative development", "The institute was formed with Southwest University of Science and Technology, drawing on professors, researchers and doctoral specialists. New-material work can align processing goals, measurement methods and equipment trials."],
      ["Numerical simulation", "Fluid-dynamics tools including FLUENT are used to study gas–solid flow and compare grinding and classifier geometry with operating conditions. Simulation supports design alongside practical material trials."],
    ]),
    section("analysis", "Laboratory and analytical capabilities", "Choose measurements around the material's application and processing targets, with sample identity and test methods recorded together.", [
      ["Particle size distribution", "Laser particle size analysis compares feed and processed powders. D10, D50, D90 and oversize targets need to be specified with dispersion and measurement conditions."],
      ["Particle morphology", "Microscopy and scanning electron microscopy help compare particle shape, agglomeration and surface features when assessing deagglomeration, shaping and grinding."],
      ["Specific surface area", "Surface-area analysis supplements size and surface assessment. Pretreatment and measurement conditions must be comparable across samples."],
      ["Tapped density", "Tapped-density measurement helps assess powder packing behaviour for filling and processing applications, alongside particle size and morphology."],
      ["Moisture", "Moisture analysis informs feed handling, agglomeration, collection, trace-moisture removal, drying and storage considerations."],
      ["Combined assessment", "Tests can be combined around the project objective. Report contents, methods, sample retention and any third-party testing are agreed before the trial."],
    ]),
    section("trial", "From material trials to scale-up", "Identify the feed and targets before testing candidate process routes.", [
      ["1 · Define the brief", "Provide material identity, composition, feed size, moisture, target size and throughput, together with purity, morphology or temperature requirements, measurement methods and material safety information."],
      ["2 · Agree trial conditions", "Engineers review configuration, sample quantity, packaging, shipping and cleaning needs, then agree operating comparisons and assessment methods. Confirm sample receipt arrangements before shipping."],
      ["3 · Process and sample", "Grinding, deagglomeration, classification or shaping is tested under agreed conditions. Feed details, operating settings and sample identifiers support comparisons between configurations."],
      ["4 · Measure and review", "Compare feed, product and fractions to understand oversize, recovery, wear or agglomeration, and identify adjustments for the next stage."],
      ["5 · Evaluate scale-up", "Continuous operation, throughput, utilities, collection and site layout inform the production design. Laboratory results are not automatically contractual performance values for a production line."],
    ]),
    section("collaboration", "New-material collaboration and research records", "Development can begin with a specific question about size distribution, contamination or particle shape.", [
      ["Collaboration scope", "Small-sample validation, process comparisons, equipment adaptation and OEM trials can be discussed. Sample use, records, intellectual property and confidentiality arrangements are agreed before work starts."],
      ["Research documentation", "The institute has participated in research projects and patent and publication work. Relevant public project, patent or certificate documentation can be requested for a specific technology area."],
    ]),
  ],
};

export const supportDetails: Record<Locale, EditorialSection[]> = {
  zh: [
    section("selection", "选型、工艺与厂房布局咨询", "从物料和目标出发，把设备配置放在完整生产系统中评估。", [
      ["设备选型", "提供原料性质、进料粒度、目标分布和产能；比较机械、气流、蒸汽、分级与整形等路线，并评估耐磨、洁净、温度和气氛要求。"],
      ["工艺与布局", "讨论投料、粉碎、收集、除尘、输送和包装之间的接口；结合厂房尺寸、高度、检修通道以及电力、气源和其他公用工程条件安排设备。"],
      ["方案输出", "按项目阶段形成设备配置、流程与布局建议。最终供货边界、性能目标、配套责任和验收方法在技术协议中确认。"],
    ]),
    section("commissioning", "安装、调试与操作培训", "设备到场前的条件确认，有助于现场工作顺利衔接。", [
      ["安装准备", "核对基础、设备定位、吊装条件、电气和公用工程接口；明确供货、现场施工和指导工作的责任分工。"],
      ["调试与交接", "围绕设备连接、联锁、空载与带料运行进行约定范围内的检查，记录运行条件与问题处理，按双方确认的标准组织交接。"],
      ["操作培训", "结合实际配置说明开停机、参数调整、取样、清洁与异常反馈；培训范围与参加人员在服务安排中确认。"],
    ]),
    section("maintenance", "预防维护、诊断与设备档案", "机械、工艺、仪表控制和电气信息共同构成维护判断的依据。", [
      ["预防维护", "结合运行时间、材料磨蚀性与设备状态安排检查，关注磨损件、密封、轴承、过滤件及相关运行记录。"],
      ["故障与诊断", "提供型号、设备编号、报警、现象、发生工况及照片；保留近期维护和参数变化记录，帮助定位问题。具体检修操作按设备手册和现场规程执行。"],
      ["档案与升级", "维护咨询可结合设备档案、检测记录和历次处理方案；产能、材料或工艺目标发生变化时，评估技术升级与系统改造。"],
      ["定期服务", "可讨论巡检、培训及定期维护协议。服务地区、响应安排、费用和停机窗口按设备与项目需求确认。"],
    ]),
    section("spares", "备件、磨损件与专有备件库", "按设备版本和物料工况确认零件，避免仅凭外观替换。", [
      ["备件识别", "提供设备型号、序列号、零件名称或编号、照片和需求数量；说明接触物料、磨损或腐蚀状况。"],
      ["部件范围", "可咨询分级轮、内衬、密封、过滤组件、输送阀门及换向件等。金属、陶瓷和表面处理方案需要核对尺寸、相容性与设备配置。"],
      ["库存与更换", "按生产连续性要求讨论关键备件清单、专有备件库与现场更换服务。具体供货、兼容性和交期经技术核对后确认。"],
    ]),
    section("oem", "OEM粉体加工与新材料试制", "德阳加工基地承接粉体加工需求，并结合试验与检测讨论新材料开发。", [
      ["适配评估", "提供材料名称、成分、批量、进出料指标、污染限值与用途；评估粉碎、分级、整形和收集方式，以及清洁和换料要求。"],
      ["试样与确认", "先确认小样试验、测试方法和评价指标，再讨论放大加工。样品留存、批次标识、包装、运输和资料保密由双方约定。"],
      ["加工交付", "根据实际设备与材料匹配情况确认可加工范围、批次计划、检测报告和交付要求。费用、最小批量及周期按项目确认。"],
    ]),
    section("visit", "来料试验与工厂考察", "将技术问题、样品安排和考察对象提前对齐。", [
      ["预约试验", "填写材料与目标指标，说明样品状态和可提供数量；工程师确认试验项目、所需样品和接收信息后再安排寄送。"],
      ["预约考察", "说明希望考察绵阳装备制造还是德阳粉体加工、人员、时间和技术议题；现场设备与试验演示按实际排期协商。"],
      ["售后沟通", "通过联系页选择维保或备件，附设备信息与问题说明。服务计划、响应与责任边界以对应项目的约定为准。"],
    ]),
  ],
  en: [
    section("selection", "Equipment selection, process and site planning", "Evaluate equipment within the complete production system, starting with the material and target.", [
      ["Equipment selection", "Supply feed properties, size, target distribution and throughput. Compare mechanical, jet, steam, classification and shaping routes with wear, cleanliness, temperature and atmosphere requirements."],
      ["Process and layout", "Review interfaces between feeding, grinding, collection, dust removal, conveying and packaging. Building dimensions, headroom, maintenance access, electrical supply, gas and other utilities inform the layout."],
      ["Technical proposal", "Configuration, flowsheet and layout recommendations follow the project stage. Supply boundaries, performance targets, interface responsibilities and acceptance methods are confirmed in the technical agreement."],
    ]),
    section("commissioning", "Installation, commissioning and training", "Preparing site conditions helps connect equipment delivery with operation.", [
      ["Installation preparation", "Review foundations, positioning, lifting, electrical and utility connections, with responsibilities for supply, construction and installation guidance clearly assigned."],
      ["Commissioning and handover", "Agreed checks cover connections, interlocks, no-load and material runs. Operating conditions and issue resolution are recorded for handover against the agreed acceptance criteria."],
      ["Operator training", "Training follows the actual configuration and can cover start-up, shutdown, adjustment, sampling, cleaning and fault reporting. Scope and participants are confirmed in the service arrangements."],
    ]),
    section("maintenance", "Preventive maintenance, diagnostics and records", "Mechanical, process, instrumentation and electrical information supports maintenance decisions.", [
      ["Preventive maintenance", "Inspections reflect operating hours, material abrasiveness and equipment condition, including wear parts, seals, bearings, filters and operating records."],
      ["Fault diagnosis", "Provide the model, equipment number, alarms, symptoms, operating conditions and photographs. Recent maintenance and parameter changes help identify the cause. Physical servicing follows equipment manuals and site procedures."],
      ["Records and upgrades", "Maintenance consultation can draw on equipment records, inspection results and earlier service work. Changes in material, capacity or process targets can lead to assessment of upgrades and retrofits."],
      ["Scheduled services", "Inspection, training and periodic maintenance agreements can be discussed. Service region, response arrangements, charges and shutdown windows depend on the equipment and project."],
    ]),
    section("spares", "Spare parts, wear parts and dedicated inventory", "Confirm parts against the equipment version and material conditions, rather than appearance alone.", [
      ["Identify the part", "Provide model, serial number, part name or number, photographs and quantity, together with contact material and wear or corrosion conditions."],
      ["Component scope", "Enquiries can cover classifier wheels, liners, seals, filter elements, conveying valves and diverters. Metal, ceramic and surface-treatment options require dimensional, compatibility and configuration checks."],
      ["Stock and replacement", "Discuss critical spares, dedicated inventory and replacement services around production continuity. Availability, compatibility and delivery are confirmed after technical review."],
    ]),
    section("oem", "Powder OEM processing and material development", "The Deyang processing base supports powder processing requirements alongside trials and analytical work.", [
      ["Compatibility review", "Provide material identity, composition, batch size, feed and product specifications, contamination limits and application. Grinding, classification, shaping, collection and changeover needs are evaluated together."],
      ["Trials and confirmation", "Agree small-sample trials, measurement methods and assessment criteria before scale-up. Sample retention, batch identification, packaging, transport and confidentiality are agreed jointly."],
      ["Processing and delivery", "Actual material and equipment compatibility determine the processing scope, batch plan, report and delivery requirements. Pricing, minimum batch size and lead time are project-specific."],
    ]),
    section("visit", "Material trials and factory visits", "Align technical questions, sample arrangements and the facility to be visited in advance.", [
      ["Book a trial", "Describe the material, target specifications, sample condition and available quantity. Send samples after engineers confirm the trial scope, required quantity and receiving arrangements."],
      ["Plan a visit", "Specify Mianyang equipment manufacturing or Deyang powder processing, attendees, preferred dates and discussion topics. Equipment access and demonstrations depend on the agreed site schedule."],
      ["After-sales enquiries", "Select maintenance or spare parts on the contact page and include equipment details and the issue. Service timing, response arrangements and responsibilities follow the applicable project agreement."],
    ]),
  ],
};
