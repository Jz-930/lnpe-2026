import type { Locale } from '@/i18n/config';
import type { MaterialCategoryId } from './materials';

type IndustryGuide = { paragraphs: string[]; links: { href: string; label: string }[] };

/** Industry context complements the individual material records; routes remain conditional. */
export const materialIndustryGuides: Record<MaterialCategoryId, Record<Locale, IndustryGuide>> = {
  'battery-materials': {
    zh: {
      paragraphs: [
        '正极前驱体、烧结正极、石墨与硅基复合负极的加工任务不同：前驱体重视均匀配料，烧结粉关注团聚体打开，石墨可能需要整形，包覆复合材料则需保持表层和颗粒结构。',
        '除D10/D50/D90与粗粒上限外，应同时明确细粉比例、含水、金属杂质、包覆完整性及适用时的振实密度。不同电池体系和牌号分别评价，粒度合格不能直接证明电化学表现。',
        '根据团聚强度选择机械或气流解聚，按形貌目标决定是否配置整形与脱细；干气、受控气氛和密闭收集由原料敏感性确定。先比较同批原料的粒度、形貌与物料平衡，再评估连续运行和放大。',
      ],
      links: [{ href: '/projects/lithium-iron-phosphate-specialized-classified-jet-mill', label: '磷酸铁锂项目与工程说明' }, { href: '/research', label: '材料检测与试验流程' }],
    },
    en: {
      paragraphs: [
        'Cathode precursors, calcined cathodes, graphite and silicon-based composite anodes involve different tasks. Precursors need uniform blending; calcined powders may need deagglomeration; graphite may need shaping; coated composites require surface and particle-structure retention.',
        'Alongside D10/D50/D90 and the coarse limit, define fines, moisture, metallic impurities, coating integrity and, where relevant, tap density. Evaluate each chemistry and grade separately: size compliance alone does not establish electrochemical performance.',
        'Choose mechanical or jet deagglomeration for agglomerate strength, and add shaping or fines removal only for the morphology target. Dry gas, atmosphere control and enclosed collection depend on sensitivity. Compare size, shape and mass balance on one feed batch before continuous operation and scale-up.',
      ],
      links: [{ href: '/projects/lithium-iron-phosphate-specialized-classified-jet-mill', label: 'LFP project and engineering scope' }, { href: '/research', label: 'Material analysis and trial workflow' }],
    },
  },
  chemicals: {
    zh: {
      paragraphs: [
        '化工粉体既包括氧化物、盐类等脆性原料，也包括吸湿聚合物、低熔点树脂和表面处理填料。需要先辨明实体颗粒、软团聚或混合配方，再确定粉碎、解聚与粒级整理的任务。',
        '填料关注分散、粗粒与吸油量，高纯氧化物关注异种元素，聚合物还需检查软化、黏附和使用性能。混合配方分级可能引起组分偏析，应把粒度、成分均匀性和回收率一起评价。',
        '可根据脆性比较机械与气流路线，针对吸湿、热敏或反应性原料增加相应气体、温控及密闭条件。接触材质、换批清洁和收集滤材需与实际化学品相容，最终配置通过来料试验确定。',
      ],
      links: [{ href: '/research', label: '化工物料试验与检测方法' }, { href: '/products/technologies/jet-mill-configurations', label: '气流磨结构与材质选择' }],
    },
    en: {
      paragraphs: [
        'Chemical powders range from brittle oxides and salts to moisture-sensitive polymers, low-melting resins and surface-treated fillers. Identify solid particles, soft agglomerates or blended formulations before defining grinding, dispersion and grading tasks.',
        'Fillers require dispersion, coarse-particle and oil-absorption control; high-purity oxides emphasize foreign elements; polymers also require checks on softening, adhesion and function. Classification can segregate blends, so evaluate size, composition uniformity and recovery together.',
        'Compare impact and jet routes according to brittleness, adding suitable gas, temperature and enclosure conditions for moisture-sensitive, heat-sensitive or reactive feedstocks. Contact parts, cleaning and filter media must suit the chemistry; material trials establish the final configuration.',
      ],
      links: [{ href: '/research', label: 'Chemical-powder trials and analysis' }, { href: '/products/technologies/jet-mill-configurations', label: 'Jet-mill layouts and contact materials' }],
    },
  },
  minerals: {
    zh: {
      paragraphs: [
        '同为矿物原料，石英与长石的硬度、重晶石的密度，以及云母、硅灰石的片状或针状结构，会带来不同加工要求。原矿还需核查伴生矿物、含水与杂质，不能仅按矿物名称设定工况。',
        '普通填料关注级配、白度和分散，高纯用途增加杂质限值，增强填料则需控制长径比或径厚比。气流分级受到粒径、密度与形状共同影响，粒级整理与矿物提纯应分别评价。',
        '通常先除杂、预破碎和必要调质，再比较机械或气流粉碎与分级组合；保形材料优先温和处理。以目标粒级收率、磨耗、完整系统能耗及后续配方表现决定回料方式和设备配置。',
      ],
      links: [{ href: '/projects/air-classification-project', label: '分级项目：配置与检测参考' }, { href: '/research', label: '粒度与形貌评价' }],
    },
    en: {
      paragraphs: [
        'Quartz and feldspar hardness, barite density, and the plate-like or acicular structure of mica and wollastonite create different requirements. Ores also need checks for associated minerals, moisture and impurities; a mineral name alone does not define operating conditions.',
        'General fillers emphasize grading, whiteness and dispersion; high-purity uses add impurity limits; reinforcing fillers need aspect-ratio control. Air classification responds to size, density and shape, so grading and mineral purification must be evaluated separately.',
        'Cleaning, pre-crushing and any conditioning usually precede comparison of impact or jet milling with classification; shape-sensitive minerals favour gentler treatment. Select recycle and configuration using grade yield, wear, whole-system energy and downstream formulation performance.',
      ],
      links: [{ href: '/projects/air-classification-project', label: 'Classification project: configuration and testing' }, { href: '/research', label: 'Particle-size and morphology assessment' }],
    },
  },
  'pharma-food': {
    zh: {
      paragraphs: [
        '植物根茎、叶片与菌类多有纤维，花粉与孢子涉及完整颗粒或破壁目标，蛋白和复配食品粉又可能含脂质、糖或吸湿组分。原料身份、使用部位、干燥和熟化状态应先确认。',
        '除粒度与粗纤维外，应结合用途检查温升、色泽、分散、溶解或黏度，破壁要求采用明确检测方法。复配料还需检查组分偏析；粉碎细度本身不证明功效、卫生或食品品质。',
        '较长纤维先预切，随后比较温控机械粉碎、气流细化或温和解聚。产品接触材质、密闭转移、清洁换批及小批次回收应共同纳入试验，原料药还需按具体化合物确认晶型与处理要求。',
      ],
      links: [{ href: '/research', label: '小样试验与检测流程' }, { href: '/products/laboratory-equipment', label: '实验设备与批次比较' }],
    },
    en: {
      paragraphs: [
        'Roots, leaves and fungi often contain fibres; pollen and spores may require intact particles or wall disruption; protein and blended food powders may contain fats, sugars or moisture-sensitive components. Establish identity, plant part, drying and cooking state first.',
        'Alongside size and coarse fibres, assess heating, colour, dispersion, dissolution or viscosity for the intended use. Wall disruption requires a defined method and blends need segregation checks. Fineness alone does not establish efficacy, hygiene or food quality.',
        'Pre-cut long fibres, then compare temperature-controlled impact milling, jet finishing or gentle deagglomeration. Include contact materials, enclosed transfer, cleaning and small-batch recovery in trials. APIs also require compound-specific confirmation of crystal form and handling needs.',
      ],
      links: [{ href: '/research', label: 'Small-sample trials and analysis' }, { href: '/products/laboratory-equipment', label: 'Laboratory equipment and batch comparison' }],
    },
  },
  abrasives: {
    zh: {
      paragraphs: [
        '刚玉、碳化硅等磨粒，氧化物抛光粉，以及砂轮复合料的任务不同。切削磨粒可能需要保留棱角，精细抛光粉重视粗尾和异物，陶瓷原料则需兼顾纯度、团聚与后续烧结要求。',
        '除完整粒度分布外，应检查磨粒形状、硬异物、接触件磨耗及目标粒级收率。高硬度和高密度影响粉碎与分级，不能以平均粒径或总出料量代替合格磨粒的评价。',
        '已具有目标颗粒主体的原料可先试精密分级，需要实体细化时再比较气流粉碎和耐磨材质。棱角整理作为独立任务验证，并以实际磨削、抛光或陶瓷用途确定可接受的形貌变化。',
      ],
      links: [{ href: '/research', label: '硬质粉体试验与检测' }, { href: '/projects/air-classification-project', label: '精细分级工程参考' }],
    },
    en: {
      paragraphs: [
        'Alumina and silicon-carbide grains, oxide polishing powders and composite wheel materials involve different tasks. Cutting grains may need angular edges; polishing powders emphasize coarse tails and foreign particles; ceramic feedstocks also need purity, agglomeration and sintering control.',
        'Beyond full size distribution, check grain shape, hard foreign matter, contact-part wear and target-grade yield. Hardness and density affect both milling and classification; mean size or total discharge cannot replace evaluation of usable abrasive grains.',
        'Trial precision classification first when the main particle population is already suitable, then compare jet milling and wear-resistant materials where fracture is needed. Validate edge conditioning separately and define acceptable shape changes through grinding, polishing or ceramic-use requirements.',
      ],
      links: [{ href: '/research', label: 'Hard-powder trials and analysis' }, { href: '/projects/air-classification-project', label: 'Fine-classification engineering reference' }],
    },
  },
  metals: {
    zh: {
      paragraphs: [
        '金属粉既有单质和合金，也有铜包铁等包覆复合粉；雾化、还原或其他制粉方式形成的球状、树枝状、片状结构各有用途。软质延展金属与较脆合金不能直接使用同一种粉碎逻辑。',
        '评价重点包括粒形保持、氧与杂质增量、流动性及各粒级的成分一致性。混合金属粉分级可能发生配比变化，包覆材料则需检查表层完整性；相关粉尘属性必须作为系统设计输入。',
        '已有合适形貌的粉体优先比较分级或轻度解聚，确需破碎时再验证可粉碎性。根据氧化与粉尘特性选择气氛、气体循环、监测和密闭回收，并通过小样确认接触材质与清洁换牌号方案。',
      ],
      links: [{ href: '/research', label: '金属粉样品评估' }, { href: '/products/technologies/inert-gas-classification', label: '保护气氛分级系统' }],
    },
    en: {
      paragraphs: [
        'Metal powders include elements, alloys and coated composites such as copper-clad iron. Atomized, reduced and other powders have spherical, dendritic or flake forms for different uses. Soft ductile metals and brittle alloys do not share one milling approach.',
        'Evaluate shape retention, added oxygen and impurities, flow and composition consistency across size fractions. Classification can alter mixed-metal ratios, while coated materials need surface-integrity checks. Dust properties are required inputs to system design.',
        'Compare classification or light deagglomeration first when morphology is already suitable, and establish grindability before adding fracture. Select atmosphere, gas circulation, monitoring and enclosed recovery for oxidation and dust behaviour, using small trials to check contact materials and grade-change cleaning.',
      ],
      links: [{ href: '/research', label: 'Metal-powder sample assessment' }, { href: '/products/technologies/inert-gas-classification', label: 'Protected-atmosphere classification' }],
    },
  },
  'solid-waste': {
    zh: {
      paragraphs: [
        '粉煤灰、钢渣、赤泥、尾矿和副产石膏的来源、矿物相与含水差异很大；目录也包含关联的建材配料，不意味着所有条目本身都是废弃物。批次组成和预处理状态应先明确。',
        '粉体指标需要与资源化用途对应：胶凝配料可能关注活性与需水量，钢渣需要核查体积稳定性，其他来源还需按用途检查盐分、碱性或浸出。粒度改善不能单独证明已达到再利用要求。',
        '先考虑分选、金属回收和脱水，再确定仅分级还是需要磨细、解离与干燥组合。评价各物流质量平衡、磨耗与完整系统能耗；余热或蒸汽方案还应匹配热源品质及物料热稳定性。',
      ],
      links: [{ href: '/projects/epc-project', label: '成套工程与接口规划' }, { href: '/research', label: '资源化原料试验评价' }],
    },
    en: {
      paragraphs: [
        'Fly ash, steel slag, red mud, tailings and by-product gypsum differ markedly in source, mineral phases and moisture. This group also includes associated building-material ingredients, so not every entry is itself waste. Establish batch composition and pretreatment state first.',
        'Match powder metrics to reuse: binder additions may need activity and water-demand testing, steel slag needs volume-stability checks, and other sources may require salt, alkalinity or leaching evaluation. Better size distribution alone does not demonstrate suitability for reuse.',
        'Consider sorting, metal recovery and dewatering before deciding between classification alone and combined grinding, liberation and drying. Evaluate stream mass balance, wear and whole-system energy. Waste-heat or steam routes must also match heat-source quality and material thermal stability.',
      ],
      links: [{ href: '/projects/epc-project', label: 'Integrated engineering and interface planning' }, { href: '/research', label: 'Trials for resource-recovery feedstocks' }],
    },
  },
  other: {
    zh: {
      paragraphs: [
        '这一组覆盖颜料、树皮、蜡、再生塑料和其他特种配方，属于应用入口的集合，并不是物性一致的行业。先确认化学身份、原料来源和目标用途，名称不明确的物料从资料和小样评估开始。',
        '颜料关注色相与分散，珠光粉重视片层和涂层，纤维原料关注长度，蜡和树脂需要控制软化黏附。复合与回收料还需检查各组分差异、杂质和粉碎后的成分偏析。',
        '根据实际目标选用预切、温控粉碎、温和解聚或单独分级，避免将设备按分类名称直接匹配。以用途对应指标、收率、清洁和适用的气氛条件比较候选方案，再决定连续处理范围。',
      ],
      links: [{ href: '/research', label: '特种材料评估与试验' }, { href: '/products/technologies/specialist-processes', label: '特殊加工条件与系统选择' }],
    },
    en: {
      paragraphs: [
        'This group covers pigments, bark, waxes, recycled plastics and specialty formulations. It is a collection of applications rather than one family of physical properties. Confirm identity, origin and use, starting unclear feedstocks with documentation and small-sample assessment.',
        'Pigments emphasize shade and dispersion; pearlescent powders need platelet and coating retention; fibres require length control; waxes and resins need softening and adhesion control. Composite and recovered feeds also require checks for component differences, contamination and segregation.',
        'Choose pre-cutting, temperature-controlled milling, gentle deagglomeration or classification alone for the actual target instead of assigning equipment by category name. Compare application metrics, yield, cleaning and atmosphere requirements before defining continuous-processing scope.',
      ],
      links: [{ href: '/research', label: 'Specialty-material assessment and trials' }, { href: '/products/technologies/specialist-processes', label: 'Special processing conditions and systems' }],
    },
  },
};
