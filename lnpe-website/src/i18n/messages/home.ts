import type { Locale } from '../config';
import { productNames } from './product-names';

const COUNTRIES_SERVED = '20+';
const RESEARCH_EXPERTS = '20+';
export const HOME_PARTICLE_OPTIONS = ['D50 1-5 um', 'D50 5-20 um', 'D90 Controlled', 'Custom target'] as const;

type RecommendationInput = {
  route: string;
  material: string;
  particleSize: string;
  capacity: string;
  recommendation: string;
};

const en = {
  hero: {
    imageAlt: 'LNPE factory exterior and company signage',
    titleLines: ['Powder', 'Systems', 'Engineered', 'for Scale'],
    description: 'From lab trial to production line, LNPE builds grinding, classifying and particle modification systems for demanding powder materials.',
    configureRoute: 'Configure a Route',
    viewSystems: 'View Systems',
    specRail: [
      { label: 'Lab Trial', value: 'Material testing' },
      { label: 'Scale Up', value: 'Pilot to line' },
      { label: 'Core Routes', value: 'Grind / Classify' },
      { label: 'Delivery', value: `${COUNTRIES_SERVED} countries` },
    ],
    scrollHint: 'Scroll for system route',
  },
  trust: { labels: ['Industrial users', 'Patents', 'PhDs & professors', 'Countries served'] },
  products: {
    title: 'Equipment Discovery',
    description: 'A clean product catalog surface with stronger equipment imagery, hard specs and a lighter conversion path.',
    viewAll: 'View All Systems',
    featured: 'Featured equipment',
    detail: 'System Detail',
    emptyRelated: 'The selected category has one primary system. Use All to compare related equipment routes.',
    categories: {
      All: 'All', Grinding: 'Grinding', Classifying: 'Classifying', Modification: 'Modification', 'Turnkey Line': 'Turnkey Line',
    },
    items: {
      'turnkey-epc': {
        title: productNames.en['turnkey-epc'],
        desc: 'Battery material production lines from process design to site delivery.',
        specs: ['Cathode / Anode', 'Whole-line EPC', 'Lab to Production'],
        module: 'Integrated line',
      },
      'jet-pulverizer': {
        title: productNames.en['jet-pulverizer'],
        desc: 'Closed-loop grinding and classification for strict particle targets.',
        specs: [HOME_PARTICLE_OPTIONS[0], 'High Yield', 'Integrated Classifier'],
        module: 'Grinding route',
      },
      'jet-mill': {
        title: productNames.en['jet-mill'],
        desc: 'Fluidized bed jet grinding with optimized energy efficiency.',
        specs: ['Dry Grinding', 'Low Wear', 'Energy Saving'],
        module: 'Micronization',
      },
      'impact-mill': {
        title: productNames.en['impact-mill'],
        desc: 'Mechanical impact grinding for robust mineral and chemical routes.',
        specs: ['Hammer Impact', 'Compression', 'High Throughput'],
        module: 'Mechanical route',
      },
      'shaping-mill': {
        title: productNames.en['shaping-mill'],
        desc: 'Particle morphology control for surface and flowability requirements.',
        specs: ['Morphology', 'Surface Tuning', 'Particle Control'],
        module: 'Surface tuning',
      },
      'air-classifier': {
        title: productNames.en['air-classifier'],
        desc: 'Dry classification by particle size and density differences.',
        specs: ['Cut Point', 'Dry Separation', 'Density Split'],
        module: 'Separation',
      },
    },
  },
  factory: {
    title: 'Factory Capability',
    description: 'A darker factory band gives the homepage industrial weight between the clean catalog and the technical route diagram.',
    activeView: 'Active view',
    capabilityRoute: 'Capability route',
    routeStages: ['Trial', 'Process Design', 'Production System'],
    capabilities: {
      Manufacturing: {
        name: 'Manufacturing',
        headline: 'Factory floor capacity for complete powder processing systems.',
        body: 'LNPE combines welding, assembly, mechanical finishing and system integration inside the same industrial workflow, reducing the gap between process design and delivery.',
        metrics: [
          { label: 'Core build', value: 'Mills / classifiers' },
          { label: 'Workshop mode', value: 'System assembly' },
          { label: 'Scale signal', value: 'Production lines' },
        ],
      },
      'R&D Validation': {
        name: 'R&D Validation',
        headline: 'Material trials before production commitments.',
        body: 'Particle target, material behavior and route selection can be validated through testing and analysis before the production route is locked.',
        metrics: [
          { label: 'Test focus', value: 'Particle size' },
          { label: 'Route logic', value: 'Trial to pilot' },
          { label: 'Analysis', value: 'SEM / laser' },
        ],
      },
      Delivery: {
        name: 'Delivery',
        headline: 'Project delivery built around integrated routes, not loose machines.',
        body: 'A configured system can connect dosing, grinding, classification, collection and controls into a line that matches the material and throughput requirement.',
        metrics: [
          { label: 'Scope', value: productNames.en['turnkey-epc'] },
          { label: 'Controls', value: 'Closed route' },
          { label: 'Coverage', value: `${COUNTRIES_SERVED} countries` },
        ],
      },
    },
  },
  process: {
    title: 'Process Route Diagram',
    description: 'Particle flow is now the core technical module: route tabs, active nodes and a live step panel describe how LNPE connects feeding, grinding, classifying, modification and collection.',
    routeSelector: 'Route selector',
    activeStep: 'Active Step',
    output: 'Output',
    particleLoad: 'Particle Load',
    route: 'Route',
    routes: {
      'Battery Materials': { name: 'Battery Materials', note: 'Strict D50 control and closed-loop classification for cathode and anode routes.' },
      'Mineral Powders': { name: 'Mineral Powders', note: 'High-throughput grinding and separation for minerals, ceramics and inorganic materials.' },
      'Surface Modification': { name: 'Surface Modification', note: 'Morphology and coating modules for powder compatibility and downstream flowability.' },
    },
    steps: {
      Feeding: {
        name: 'Feeding', detail: 'Metered input and dosing stability',
        body: 'Raw material is buffered and fed into the route at a controlled rate so downstream grinding remains stable.',
        output: 'Stable feed rate',
      },
      Grinding: {
        name: 'Grinding', detail: 'Micronization and impact control',
        body: 'Jet or mechanical energy is selected around material hardness, heat sensitivity and target particle size.',
        output: 'D50 target path',
      },
      Classifying: {
        name: 'Classifying', detail: 'Particle size separation',
        body: 'Oversize particles return through the loop while qualified powder advances toward collection.',
        output: 'Cut point locked',
      },
      Modification: {
        name: 'Modification', detail: 'Surface and morphology tuning',
        body: 'Optional modification modules tune surface behavior, shape and downstream material compatibility.',
        output: 'Surface tuned',
      },
      Collection: {
        name: 'Collection', detail: 'Cyclone, filter and package flow',
        body: 'Cyclone, filter and packaging stages keep the system closed while preserving collection efficiency.',
        output: 'Closed discharge',
      },
    },
  },
  research: {
    titleProcess: 'Process &', titleEquipment: 'Equipment', titleConfigurator: 'Configurator.',
    description: 'Build a route from material, target particle size and capacity. The preview below changes as the selected route changes.',
    parameterSummary: 'Route / Material / Particle / Capacity',
    activeRoute: 'Active Route', routeModules: 'Route Modules',
    parameterPanel: 'Parameter Panel', materialSpecs: 'Material Specs for Analysis',
    material: 'Material', materialPlaceholder: 'e.g. LFP, silica, alumina',
    targetParticleSize: 'Target Particle Size', capacity: 'Capacity', capacityPlaceholder: 'kg/h or t/h',
    applicationIndustry: 'Application Industry', contactInformation: 'Contact Information',
    contactPlaceholder: 'Name, company, email, and process notes',
    recommendationPreview: 'Recommendation Preview', pending: 'Pending', target: 'Target', industry: 'Industry',
    stagedRecommendation: 'Staged Recommendation', recommendationStaged: 'Recommendation Staged', stageRecommendation: 'Stage Recommendation',
    submittedMaterial: 'the submitted material',
    stagedSummary: ({ route, material, particleSize, capacity, recommendation }: RecommendationInput) =>
      `LNPE should review a ${route.toLowerCase()} route for ${material}, targeting ${particleSize}${capacity ? ` at ${capacity}` : ''}. First pass: ${recommendation}`,
    particleOptions: { [HOME_PARTICLE_OPTIONS[0]]: HOME_PARTICLE_OPTIONS[0], [HOME_PARTICLE_OPTIONS[1]]: HOME_PARTICLE_OPTIONS[1], 'D90 Controlled': 'D90 Controlled', 'Custom target': 'Custom target' },
    industries: { 'Battery Materials': 'Battery Materials', Chemicals: 'Chemicals', Minerals: 'Minerals', 'Pharma and Food': 'Pharma and Food', 'Solid Waste': 'Solid Waste' },
    routes: {
      Grinding: {
        name: 'Grinding', summary: 'Micronization route for hardness, heat sensitivity and target D50 control.',
        recommendation: `${productNames.en['jet-pulverizer']} or ${productNames.en['jet-mill']} with closed-loop classifier.`, modules: ['Feeder', 'Mill Body', 'Classifier', 'Cyclone'],
      },
      Classifying: {
        name: 'Classifying', summary: 'Separation route for narrow particle distribution and oversize return.',
        recommendation: `${productNames.en['air-classifier']} with cyclone collection and filter system.`, modules: [productNames.en['air-classifier'], 'Cyclone', 'Filter', 'Return Line'],
      },
      Modification: {
        name: 'Modification', summary: 'Surface and morphology route for downstream flowability and compatibility.',
        recommendation: `${productNames.en['shaping-mill']} plus modification module and test validation.`, modules: [productNames.en['shaping-mill'], 'Modifier', 'Mixer', 'Lab Test'],
      },
      'Full Line': {
        name: 'Full Line', summary: 'Integrated process route from dosing to packaged powder output.',
        recommendation: `${productNames.en['turnkey-epc']} line with grinding, classifying and collection stages.`, modules: ['Dosing', 'Grinding', 'Classifying', 'Collection'],
      },
    },
    capabilities: [
      { title: 'Testing & Analysis', text: 'Laser particle analysis and electron microscopy support route validation.' },
      { title: 'R&D Capability', text: `${RESEARCH_EXPERTS} PhDs and professors support national projects and patent-backed process development.` },
      { title: 'Industrial Delivery', text: 'Equipment selection connects lab trials with deployable production systems.' },
    ],
  },
};

const zh: typeof en = {
  hero: {
    imageAlt: 'LNPE 工厂外景与公司标识',
    titleLines: ['粉体系统', '为规模生产', '而设计'],
    description: '从实验室试验到生产线，LNPE 为高要求的粉体材料打造粉碎、分级与颗粒改性系统。',
    configureRoute: '配置工艺路线', viewSystems: '查看设备系统',
    specRail: [
      { label: '实验室试验', value: '物料测试' },
      { label: '规模放大', value: '从中试到产线' },
      { label: '核心工艺', value: '粉碎 / 分级' },
      { label: '项目交付', value: `${COUNTRIES_SERVED} 个国家` },
    ],
    scrollHint: '向下查看系统工艺',
  },
  trust: { labels: ['工业用户', '专利', '博士与教授', '服务国家'] },
  products: {
    title: '探索设备',
    description: '清晰的产品目录，配合更直观的设备图片、关键参数与简洁的咨询流程。',
    viewAll: '查看全部系统', featured: '精选设备', detail: '系统详情',
    emptyRelated: '当前类别包含一款主要系统。选择“全部”，可对比相关设备工艺。',
    categories: { All: '全部', Grinding: '粉碎', Classifying: '分级', Modification: '改性', 'Turnkey Line': '成套产线' },
    items: {
      'turnkey-epc': { title: productNames.zh['turnkey-epc'], desc: '从工艺设计到现场交付的电池材料生产线。', specs: ['正极 / 负极', '整线 EPC', '从实验室到生产'], module: '集成产线' },
      'jet-pulverizer': { title: productNames.zh['jet-pulverizer'], desc: '闭路粉碎与分级，满足严格的粒径要求。', specs: [HOME_PARTICLE_OPTIONS[0], '高收率', '集成分级机'], module: '粉碎工艺' },
      'jet-mill': { title: productNames.zh['jet-mill'], desc: '采用流化床气流粉碎，优化能源效率。', specs: ['干法粉碎', '低磨损', '节能'], module: '超细粉碎' },
      'impact-mill': { title: productNames.zh['impact-mill'], desc: '机械冲击粉碎，适用于稳定高效的矿物与化工工艺。', specs: ['锤式冲击', '挤压', '高产能'], module: '机械粉碎工艺' },
      'shaping-mill': { title: productNames.zh['shaping-mill'], desc: '控制颗粒形貌，满足表面性能与流动性要求。', specs: ['形貌控制', '表面调节', '颗粒控制'], module: '表面调节' },
      'air-classifier': { title: productNames.zh['air-classifier'], desc: '依据粒径与密度差异进行干法分级。', specs: ['分级切割粒径', '干法分离', '密度分离'], module: '分离' },
    },
  },
  factory: {
    title: '工厂能力',
    description: '深色工厂展示区衔接清晰的产品目录与技术工艺图，为首页增添工业质感。',
    activeView: '当前视图', capabilityRoute: '能力路径', routeStages: ['物料试验', '工艺设计', '生产系统'],
    capabilities: {
      Manufacturing: {
        name: '制造能力', headline: '具备完整粉体加工系统的工厂制造能力。',
        body: 'LNPE 将焊接、装配、机械精加工与系统集成纳入同一制造流程，缩短工艺设计与项目交付之间的距离。',
        metrics: [{ label: '核心制造', value: '粉碎机 / 分级机' }, { label: '车间作业', value: '系统装配' }, { label: '规模能力', value: '生产线' }],
      },
      'R&D Validation': {
        name: '研发验证', headline: '在确定生产方案前开展物料试验。',
        body: '在最终确定生产工艺前，通过测试与分析验证目标粒径、物料特性与工艺选择。',
        metrics: [{ label: '测试重点', value: '粒径' }, { label: '工艺路径', value: '从试验到中试' }, { label: '分析手段', value: '扫描电镜 / 激光' }],
      },
      Delivery: {
        name: '项目交付', headline: '围绕集成工艺路线交付项目，而非单独提供设备。',
        body: '配置后的系统可将配料、粉碎、分级、收集与控制连接为完整产线，匹配物料与产能需求。',
        metrics: [{ label: '交付范围', value: productNames.zh['turnkey-epc'] }, { label: '系统控制', value: '闭路工艺' }, { label: '服务覆盖', value: `${COUNTRIES_SERVED} 个国家` }],
      },
    },
  },
  process: {
    title: '工艺路线图',
    description: '颗粒流动是核心技术模块：通过工艺选项卡、活动节点与实时步骤面板，展示 LNPE 如何连接给料、粉碎、分级、改性与收集。',
    routeSelector: '工艺选择', activeStep: '当前步骤', output: '输出', particleLoad: '颗粒负载', route: '工艺路线',
    routes: {
      'Battery Materials': { name: '电池材料', note: '针对正负极材料工艺，严格控制 D50，并采用闭路分级。' },
      'Mineral Powders': { name: '矿物粉体', note: '面向矿物、陶瓷与无机材料的高产能粉碎与分离。' },
      'Surface Modification': { name: '表面改性', note: '通过整形与包覆模块，改善粉体相容性及后续加工流动性。' },
    },
    steps: {
      Feeding: { name: '给料', detail: '定量输入与稳定配料', body: '原料经缓冲后，以受控速率送入工艺系统，保持后续粉碎过程稳定。', output: '稳定给料速率' },
      Grinding: { name: '粉碎', detail: '超细粉碎与冲击控制', body: '根据物料硬度、热敏性与目标粒径，选择气流或机械粉碎方式。', output: '目标 D50 工艺' },
      Classifying: { name: '分级', detail: '按粒径分离', body: '超粒径颗粒返回循环，合格粉体进入收集环节。', output: '锁定分级切割粒径' },
      Modification: { name: '改性', detail: '表面与形貌调节', body: '可选改性模块用于调节表面性能、颗粒形状及后续应用中的材料相容性。', output: '表面性能优化' },
      Collection: { name: '收集', detail: '旋风、过滤与包装流程', body: '旋风分离、过滤与包装环节保持系统密闭，同时保障收集效率。', output: '密闭出料' },
    },
  },
  research: {
    titleProcess: '工艺与', titleEquipment: '设备', titleConfigurator: '配置器。',
    description: '根据物料、目标粒径与产能配置工艺路线。下方预览会随所选工艺变化。',
    parameterSummary: '工艺 / 物料 / 粒径 / 产能', activeRoute: '当前工艺', routeModules: '工艺模块',
    parameterPanel: '参数面板', materialSpecs: '用于分析的物料参数',
    material: '物料', materialPlaceholder: '例如：磷酸铁锂、二氧化硅、氧化铝',
    targetParticleSize: '目标粒径', capacity: '产能', capacityPlaceholder: 'kg/h 或 t/h',
    applicationIndustry: '应用行业', contactInformation: '联系信息', contactPlaceholder: '姓名、公司、电子邮箱与工艺说明',
    recommendationPreview: '建议预览', pending: '待填写', target: '目标', industry: '行业',
    stagedRecommendation: '已生成的建议', recommendationStaged: '建议已生成', stageRecommendation: '生成建议',
    submittedMaterial: '所提交的物料',
    stagedSummary: ({ route, material, particleSize, capacity, recommendation }: RecommendationInput) =>
      `建议 LNPE 评估适用于${material}的${route}工艺，目标粒径为 ${particleSize}${capacity ? `，产能为 ${capacity}` : ''}。初步方案：${recommendation}`,
    particleOptions: { [HOME_PARTICLE_OPTIONS[0]]: HOME_PARTICLE_OPTIONS[0], [HOME_PARTICLE_OPTIONS[1]]: HOME_PARTICLE_OPTIONS[1], 'D90 Controlled': 'D90 控制', 'Custom target': '自定义目标' },
    industries: { 'Battery Materials': '电池材料', Chemicals: '化工', Minerals: '矿物', 'Pharma and Food': '医药与食品', 'Solid Waste': '固体废弃物' },
    routes: {
      Grinding: { name: '粉碎', summary: '针对硬度、热敏性与目标 D50 控制的超细粉碎工艺。', recommendation: `${productNames.zh['jet-pulverizer']}或${productNames.zh['jet-mill']}，配套闭路分级系统。`, modules: ['给料机', '磨机主体', '分级机', '旋风分离器'] },
      Classifying: { name: '分级', summary: '实现窄粒径分布与粗颗粒回料的分离工艺。', recommendation: `${productNames.zh['air-classifier']}，配套旋风收集与过滤系统。`, modules: [productNames.zh['air-classifier'], '旋风分离器', '过滤器', '回料管线'] },
      Modification: { name: '改性', summary: '改善后续加工流动性与相容性的表面及形貌处理工艺。', recommendation: `${productNames.zh['shaping-mill']}配合改性模块，并开展试验验证。`, modules: [productNames.zh['shaping-mill'], '改性机', '混合机', '实验室测试'] },
      'Full Line': { name: '整线', summary: '从配料到粉体包装出料的集成工艺路线。', recommendation: `包含粉碎、分级与收集环节的 ${productNames.zh['turnkey-epc']}产线。`, modules: ['配料', '粉碎', '分级', '收集'] },
    },
    capabilities: [
      { title: '测试与分析', text: '激光粒度分析与电子显微分析为工艺验证提供支持。' },
      { title: '研发能力', text: `${RESEARCH_EXPERTS} 位博士与教授参与国家项目，并支持以专利为基础的工艺研发。` },
      { title: '工业交付', text: '通过设备选型，将实验室试验衔接至可落地的生产系统。' },
    ],
  },
};

export const homeMessages: Record<Locale, typeof en> = { en, zh };
