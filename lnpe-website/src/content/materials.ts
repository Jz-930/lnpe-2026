import data from './materials-data.json';
import materialSearchIndex from './materials-search-index.json';
import type { Locale } from '@/i18n/config';
import { productNames } from '@/i18n/messages/product-names';

export { materialSearchIndex };
export const materials = data.records;
export const materialEntries = data.entries;
export const applicationCategoryIds = ['battery-materials', 'chemicals', 'minerals', 'pharma-food', 'abrasives', 'metals', 'solid-waste', 'other'] as const;
export const materialCategories = {
  'battery-materials': { zh: '电池材料', en: 'Battery Materials' }, chemicals: { zh: '化工', en: 'Chemicals' },
  minerals: { zh: '矿物', en: 'Minerals' }, 'pharma-food': { zh: '医药与食品', en: 'Pharma & Food' },
  abrasives: { zh: '磨料', en: 'Abrasives' }, metals: { zh: '金属', en: 'Metals' },
  'solid-waste': { zh: '固体废弃物', en: 'Solid Waste' }, other: { zh: '其他', en: 'Other' },
} as const;
export type MaterialCategoryId = keyof typeof materialCategories;
export type Material = (typeof materials)[number];
type ProductSlug = keyof typeof productNames.en;
type Pair = { zh: string; en: string };
type Guidance = { title: Pair; steps: Pair[]; selection: Pair; inputs: Pair; checks: Pair; equipment: ProductSlug[]; technology: string };
const pair = (zh: string, en: string): Pair => ({ zh, en });

/** Shared unit-operation explanations are combined with each material's distinct focus.
 * These are conditional engineering starting points, never material-specific test claims. */
export const materialGuidance: Record<string, Guidance> = {
  graphite: {
    title: pair('粒度、形貌与收率的联合选择', 'Select size, shape and yield together'),
    steps: [pair('原料辨识与预处理：先区分焦、天然片状石墨、人造石墨以及包覆状态，去除不适合进入精细设备的硬杂物。', 'Identify and condition the feed: distinguish coke, natural flakes, artificial graphite and coating state; remove hard foreign matter before fine processing.'), pair('粉碎或解聚：需要缩小实体颗粒时选粉碎；只是包覆或热处理后的团聚，则比较较低强度的解聚。', 'Mill or deagglomerate: fracture particles only where size reduction is needed; compare lower-intensity dispersion for agglomerates after coating or heat treatment.'), pair('按需整形与脱细：仅在目标形貌需要时加入整形，分级分离目标产品和细粉，各物流独立称量并收集。', 'Shape and remove fines only as required: add shaping when morphology is a target, classify product and fine fractions, and weigh and collect each stream separately.')],
    selection: pair('机械或气流粉碎负责前段尺寸，整形机改变形貌，分级机整理粒级。三者并非每条线都要同时配置；以目标形貌、细粉增加和物料平衡比较候选组合。', 'Impact or jet milling controls feed size, shaping changes morphology, and classification separates grades. Not every line needs all three: compare configurations using target shape, added fines and mass balance.'),
    inputs: pair('原料来源、热处理/包覆状态、原料粒度与形貌、灰分、挥发分、目标粒级、振实密度要求、可接受细粉比例。', 'Origin, heat treatment/coating, feed size and morphology, ash, volatiles, target grade, tap-density requirements and acceptable fines.'),
    checks: pair('粒度分布、显微形貌、振实/堆积密度、产品与细粉收率；需要时比较比表面积和杂质。', 'Size distribution, microscopy, tap/bulk density and product/fines yield; surface area and impurities where relevant.'),
    equipment: ['jet-pulverizer','shaping-mill','air-classifier'], technology: 'graphite-production-line',
  },
  cathode: {
    title: pair('保持颗粒结构的解聚与粒度整理', 'Deagglomeration with particle-structure retention'),
    steps: [pair('检查来料：记录烧结、干燥、包覆或洗涤状态，用显微与粒度信息区分一次颗粒和团聚体。', 'Characterize feed: record calcination, drying, coating or washing and distinguish primary particles from agglomerates using microscopy and size data.'), pair('分级前解聚：从满足分散的较低强度开始，按团聚强度比较机械或气流作用，检查是否损伤目标颗粒或表层。', 'Deagglomerate before classification: start with the lowest useful intensity, compare mechanical and jet action against agglomerate strength, and check particle and surface damage.'), pair('粒级与环境控制：去除不合适的粗细部分，按材料需要采用干气或受控气氛，密闭收集并隔离异物。', 'Control grades and atmosphere: separate unwanted coarse/fine fractions, use dry or controlled gas where needed, and collect in an enclosed system with foreign-matter control.')],
    selection: pair('气流粉碎机或机械设备用于比较解聚强度，分级机控制粒度尾部。要求保留包覆或二次颗粒时，应先验证形貌，再谈扩大处理量；必要时从实验平台开始。', 'Compare jet and mechanical equipment for deagglomeration intensity and use classification to control size tails. Where coatings or secondary particles must survive, verify morphology before scaling throughput; start with laboratory equipment where needed.'),
    inputs: pair('化学体系、晶相/牌号、包覆状态、团聚与一次颗粒尺寸、目标D10/D50/D90、含水、金属杂质和气氛要求。', 'Chemistry, phase/grade, coating, agglomerate and primary-particle size, target D10/D50/D90, moisture, metal limits and atmosphere requirements.'),
    checks: pair('粒度与显微形貌、含水和杂质、各物流回收率；电化学或配方表现由对应下游试验确认。', 'Size and microscopy, moisture and impurities, and recovery by stream; electrochemical or formulation performance requires downstream testing.'),
    equipment: ['jet-pulverizer','air-classifier','laboratory-equipment'], technology: 'deagglomeration',
  },
  clean: {
    title: pair('低污染粉碎与均匀分散', 'Low-contamination milling and uniform dispersion'),
    steps: [pair('辨别粉体状态：核对晶相、纯度与干燥历史，确认需要打散团聚还是破碎实体颗粒。', 'Identify powder state: check phase, purity and drying history to decide between agglomerate dispersion and particle fracture.'), pair('比较粉碎强度：较脆粉可试气流路线，软团聚可用较低强度解聚；按杂质限值选择产品接触材质。', 'Compare processing intensity: trial jet milling for brittle powders and lower-intensity dispersion for soft agglomerates; choose contact materials against impurity limits.'), pair('分级及洁净收集：整理粗粒尾部，减少装置滞留与跨批残留，密闭转移至后续配料。', 'Classify and collect cleanly: control coarse tails, reduce hold-up and batch carryover, and transfer in an enclosed path to downstream blending.')],
    selection: pair('气流磨用于比较细化与污染控制，分级机适用于已有合格粒径主体的粉体；实验设备用于判断材质相容性和最小有效处理强度。', 'Use jet milling to assess fineness and contamination control, and classification when the main particle population is already suitable. Laboratory trials establish contact compatibility and the minimum useful intensity.'),
    inputs: pair('化学组成、晶相、纯度级别、原料尺寸与团聚状态、目标分布、杂质限值、温度与清洁要求。', 'Composition, phase, purity grade, feed size and agglomeration, target distribution, impurity limits, temperature and cleaning requirements.'),
    checks: pair('粒度尾部、元素杂质、分散性、清场回收率；按用途增加比表面积或烧结/配方测试。', 'Size tails, elemental impurities, dispersion and recovery including line clearance; surface area or sintering/formulation testing as required.'),
    equipment: ['jet-mill','air-classifier','laboratory-equipment'], technology: 'jet-mill-configurations',
  },
  moisture: {
    title: pair('隔湿供料与受控气体处理', 'Moisture-controlled feeding and gas handling'),
    steps: [pair('检查含水与相态：区分游离水、结晶水和吸湿结团，先明确是否允许干燥及允许的温度范围。', 'Check moisture and phase: distinguish free water, crystal water and moisture-induced caking; establish whether drying is allowed and within what temperature range.'), pair('稳定投料与粉碎：必要时先调质，在受控气体下比较粉碎或解聚，并跟踪温升和黏附。', 'Stabilize feed and processing: condition where needed, compare milling or deagglomeration under controlled gas, and track heating and adhesion.'), pair('分级、密闭收集与包装衔接：避免出料重新吸湿，检查收集滤材、管路滞留及输送后的结块。', 'Classify, collect and package in an enclosed path: limit renewed moisture uptake and check filters, line hold-up and caking after conveying.')],
    selection: pair('粉碎设备与干气、温控和收集系统须一起选择。闭路或惰性气体并不自动解决所有含水问题，应以露点、相态保持和稳定运行试验判断。', 'Select the mill together with dry-gas, temperature-control and collection systems. Closed-loop or inert gas does not automatically solve moisture problems; assess dew point, phase retention and stable operation.'),
    inputs: pair('物料化学形态、游离/结合水、吸湿趋势、可接受温度、结团强度、气体露点、目标含水与包装条件。', 'Chemical form, free/bound water, moisture uptake, acceptable temperature, caking strength, gas dew point, target moisture and packaging conditions.'),
    checks: pair('处理前后含水与相态、粒度、壁面残留和出料流动性，并在模拟储存后观察再结块。', 'Moisture and phase before/after processing, size, wall residues and discharge flow, followed by caking checks under representative storage.'),
    equipment: ['impact-mill','jet-mill','air-classifier'], technology: 'moisture-removal',
  },
  heat: {
    title: pair('温度受控的粒度整理', 'Temperature-controlled size conditioning'),
    steps: [pair('确定温度窗口：依据软化、熔融或分解特征确定可操作条件，区分干颗粒与黏性湿料。', 'Establish the temperature window from softening, melting or decomposition behaviour and distinguish dry particles from sticky wet feed.'), pair('预处理与短停留粉碎：必要时预切、预冷或调质，比较机械与气流路线中的实际物料温度和黏壁。', 'Pre-treat and mill with limited residence: cut, cool or condition where needed and compare actual material temperature and adhesion in impact and jet routes.'), pair('分级与快速收集：将符合粒级的物料及时移出，减少循环升温，检查包装后结块和表面变化。', 'Classify and collect promptly: remove on-size product to limit recycle heating and check caking and surface changes after packaging.')],
    selection: pair('机械冲击磨适合评估较大进料的处理，气流路线可用于比较温升与细化；冷却、气氛和防护配置以材料特性及试验为依据。硫磺等特殊粉体需单独系统选型。', 'Assess impact milling for larger feed and jet routes for temperature rise and fineness. Cooling, atmosphere and protection depend on material properties and trials; specialized powders such as sulfur require a dedicated system assessment.'),
    inputs: pair('成分、软化/熔融区间、热稳定性、添加剂、含水、允许温升、目标粒级以及粉尘资料。', 'Composition, softening/melting range, thermal stability, additives, moisture, allowed heating, target grade and dust data.'),
    checks: pair('全过程温度、粒度、黏壁与清场损失、表面或色泽变化、储存后的抗结块表现。', 'Process temperature, size, wall deposits and cleaning loss, surface/colour changes and caking resistance after storage.'),
    equipment: ['impact-mill','jet-mill','laboratory-equipment'], technology: 'impact-configurations',
  },
  porous: {
    title: pair('保留孔结构的温和处理', 'Gentle processing with pore-structure retention'),
    steps: [pair('评估结构：明确孔隙、密度和应用指标，区分完整颗粒、脆弱结构及软团聚。', 'Assess structure: establish pores, density and functional targets and distinguish intact particles, fragile structures and soft agglomerates.'), pair('小强度解聚或选择性磨细：先验证结构保持，必要时增加粉碎强度，并检查低密度粉体是否稳定进料。', 'Deagglomerate gently or grind selectively: verify structural retention before increasing intensity and check stable feeding of low-density powder.'), pair('粒级整理与轻质粉收集：根据目标去除粗粒或细粉，评估过滤、压差与管路残留造成的损失。', 'Grade and collect low-density powder: remove coarse particles or fines as required and assess losses from filtration, pressure drop and line residues.')],
    selection: pair('优先比较分级和温和解聚；只有目标要求实体颗粒变小才增加粉碎。以孔结构、目标性能和回收率共同决定气流磨、分级机或实验平台。', 'Compare classification and gentle deagglomeration first; add grinding only when solid particles must be smaller. Select jet, classifier or laboratory equipment using structure, function and recovery together.'),
    inputs: pair('堆积密度、孔结构或比表面积、原料粒级、含水、目标用途、允许结构变化和可燃粉尘资料（如适用）。', 'Bulk density, pores or surface area, feed grade, moisture, intended use, allowable structural change and combustible-dust data where relevant.'),
    checks: pair('粒度与收率、孔容/比表面积、密度及吸附/过滤/电极等实际用途指标。', 'Size and recovery, pore volume/surface area, density and application metrics for adsorption, filtration, electrodes or other intended uses.'),
    equipment: ['air-classifier','jet-mill','laboratory-equipment'], technology: 'deagglomeration',
  },
  flake: {
    title: pair('片状与针状形貌的保持', 'Retain plate-like and acicular morphology'),
    steps: [pair('定义形貌指标：将长度、片径、厚度及长径/径厚比与普通粒度分开记录。', 'Define shape metrics: record length, lateral size, thickness and aspect ratio separately from conventional particle-size values.'), pair('剥离、解聚或有限粉碎：按目标选择轻度作用，只有需要降低实体尺寸时才增加冲击，比较显微结构。', 'Delaminate, disperse or grind selectively: use gentle action for the target and increase impact only when solid dimensions must shrink, comparing microscopy.'), pair('分级及低损伤转移：整理粒级并检查不同形状的分选偏差，收集后再次核对形貌。', 'Classify and transfer with limited damage: grade the powder, check shape-dependent separation bias and verify morphology after collection.')],
    selection: pair('分级机用于粒级选择，适当粉碎或整形设备用于形貌调整；片层或针状材料不宜默认球化。选择依据是目标形状和功能表现，而不只是D50。', 'Classifiers select grades while suitable milling or shaping equipment changes morphology. Platelets and needles should not default to spheroidization; select for shape and function rather than D50 alone.'),
    inputs: pair('原料显微图、片径/厚度或长度/直径、目标形貌、涂层状态、粒度、含水及形貌损失容限。', 'Feed microscopy, lateral size/thickness or length/diameter, target shape, coating state, size, moisture and allowable morphology loss.'),
    checks: pair('加工前后显微图、长径/径厚比、粒级收率，及增强、光学、绝缘或导电用途的相应指标。', 'Before/after microscopy, aspect ratio and grade yield, plus relevant reinforcement, optical, insulating or conductive metrics.'),
    equipment: ['air-classifier','shaping-mill','laboratory-equipment'], technology: 'mechanical-shaping',
  },
  fibrous: {
    title: pair('预切与纤维长度控制', 'Pre-cutting and fibre-length control'),
    steps: [pair('除杂与预切：先去掉砂石、金属等异物，缩短长纤维并使供料尺寸适合设备。', 'Clean and pre-cut: remove sand, metal and foreign matter, shorten long fibres and size feed for the equipment.'), pair('调质与机械作用：按含水和韧性比较切断与冲击作用，记录温升、缠绕和筛余。', 'Condition and process mechanically: compare cutting and impact according to moisture and toughness, recording heating, wrapping and oversize residue.'), pair('分级回收：按尺寸要求分离合格粉与粗纤维，评估粗料是否适合回流，避免循环积热。', 'Classify and recover: separate acceptable powder from coarse fibres and assess whether coarse recycle is useful without excessive heating.')],
    selection: pair('机械冲击磨适合比较预切后物料，气流分级用于末端粒级整理。长纤维不能只凭粉体D值选设备，试验应同时检查纤维长度与喂料稳定性。', 'Assess impact mills after pre-cutting and air classification for final grading. Long fibres cannot be specified by powder D-values alone; trials also require fibre length and feed-stability checks.'),
    inputs: pair('物种/成分、部位、纤维长度、含水、预切尺寸、杂物比例、目标粉体与纤维要求。', 'Species/composition, plant part, fibre length, moisture, pre-cut size, foreign matter and target powder/fibre requirements.'),
    checks: pair('筛余与纤维长度、温升、流动性、供料稳定性及各物流回收率。', 'Oversize residue and fibre length, temperature rise, flow, feed stability and recovery by stream.'),
    equipment: ['impact-mill','air-classifier','laboratory-equipment'], technology: 'impact-configurations',
  },
  bio: {
    title: pair('温和加工与清洁换批', 'Gentle processing and clean batch changes'),
    steps: [pair('确认原料与前处理：核对来源、使用部位、干燥/熟化及预切状态，去除不适合进入设备的硬物。', 'Identify and pre-treat: confirm origin, plant part, drying/cooking and pre-cutting, removing hard foreign matter unsuitable for the equipment.'), pair('温控粉碎或解聚：根据纤维、淀粉、蛋白与脂质特征选择机械或气流试验，记录实际物料温度。', 'Mill or disperse with temperature control: select impact or jet trials for fibres, starch, protein and lipids, recording actual material temperature.'), pair('分级与清洁收集：控制粗颗粒及各组分偏析，使用适合清洁的接触部位，评估换批残留和回收。', 'Classify and collect cleanly: control coarse particles and component segregation, use cleanable contact surfaces and assess changeover residues and recovery.')],
    selection: pair('机械粉碎用于比较纤维和较大进料，气流设备用于细化或解聚，实验平台适合小批次回收评估。选型须与清洁、接触材质及食品/药用配方的实际要求一并确认。', 'Compare impact milling for fibres and larger feed, jet equipment for fine grinding or deagglomeration, and laboratory platforms for small-batch recovery. Confirm cleaning, contact materials and actual food or pharmaceutical formulation requirements together.'),
    inputs: pair('原料身份与来源、部位/配方、预处理、含水与脂质、目标粒度、允许温度、清洁及批次要求。', 'Identity and origin, plant part/formulation, pretreatment, moisture/lipids, target size, acceptable temperature, cleaning and batch requirements.'),
    checks: pair('粒度与粗纤维、温度、回收率、配方分散/溶解或黏度等指标；卫生及功效评价属于独立质量环节。', 'Size and coarse fibres, temperature, recovery and formulation dispersion/dissolution or viscosity; hygiene and efficacy evaluation are separate quality activities.'),
    equipment: ['impact-mill','jet-mill','laboratory-equipment'], technology: 'laboratory-modules',
  },
  spores: {
    title: pair('区分解聚、细化与破壁', 'Distinguish dispersion, size reduction and wall disruption'),
    steps: [pair('明确目标状态：先判断要保持完整颗粒还是进行破壁，核查原料含水、油脂及已处理状态。', 'Define target state: decide whether particles should remain intact or walls should be disrupted; check moisture, oil and prior processing.'), pair('小样强度比较：从适当作用强度开始，控制温升与停留，避免油脂释放造成黏壁和不可回收残留。', 'Compare intensity on small samples: control heating and residence time while avoiding oil-related adhesion and unrecoverable deposits.'), pair('收集与显微复核：对成品进行形态检查，并与粒度、温度和质量平衡同时记录。', 'Collect and inspect: verify morphology and record it alongside size, temperature and mass balance.')],
    selection: pair('先用实验设备建立目标和检测方法，再比较机械或气流作用。破壁率需有明确测法与样品条件，不能用设备名称或更小D50代替实测。', 'Use laboratory equipment to establish targets and measurement methods before comparing mechanical and jet action. Wall-disruption rates require defined methods and sample conditions; neither equipment name nor lower D50 substitutes for measurement.'),
    inputs: pair('物种、原料完整/破壁状态、含水和油脂、批次量、目标破壁或保形要求、允许温度和检测方法。', 'Species, intact/disrupted state, moisture and oil, batch size, disruption or retention target, acceptable temperature and measurement method.'),
    checks: pair('显微形态或约定破壁检测、温升、粒度、黏壁残留与清场回收率。', 'Microscopy or agreed wall-disruption measurement, heating, size, adhesion residues and recovery including line clearance.'),
    equipment: ['laboratory-equipment','jet-mill','impact-mill'], technology: 'three-in-one-laboratory',
  },
  hard: {
    title: pair('硬质颗粒的耐磨与粒级控制', 'Wear and grade control for hard particles'),
    steps: [pair('预破碎与除杂：将大块原料降至可稳定进料的尺寸，并剔除金属或异种硬颗粒。', 'Pre-crush and clean: reduce lumps to a stable feed size and remove metal and foreign hard particles.'), pair('按需气流粉碎：需要实体细化时比较颗粒碰撞路线；已有目标粒径主体时可先做分级试验。', 'Jet-mill as required: compare particle-collision processing when fracture is needed; trial classification first if the main population is already on-size.'), pair('精细分级与耐磨收集：整理粗粒尾部并独立收集不同粒级，检查接触件磨耗和成品杂质。', 'Classify precisely and collect with wear control: manage coarse tails, collect grades separately and inspect wear and product impurities.')],
    selection: pair('气流磨、分级机和耐磨材质作为组合评估。高硬度不能自动推出某一型号或无污染结论；需通过粒级收率、异物检测和部件磨耗选择配置。', 'Assess jet mills, classifiers and wear-resistant materials together. Hardness alone does not establish a model or zero-contamination claim; choose using grade yield, impurity testing and component wear.'),
    inputs: pair('化学/矿物组成、硬度与密度、原料块度、目标粗粒上限、棱角或形貌要求、杂质限值。', 'Chemical/mineral composition, hardness/density, feed lump size, coarse limit, angularity or shape targets and impurity limits.'),
    checks: pair('完整粒度分布与粗尾、显微形貌、目标粒级收率、外来元素及接触件磨耗。', 'Full distribution and coarse tail, microscopy, target-grade yield, foreign elements and contact-part wear.'),
    equipment: ['jet-mill','air-classifier','laboratory-equipment'], technology: 'precision-classification',
  },
  metal: {
    title: pair('先判断延展性，再选择保护性处理', 'Assess ductility before protected processing'),
    steps: [pair('识别金属与形态：核对单质/合金、制粉方式、表面氧化层和粉尘特性，判断脆性或延展性。', 'Identify metal and form: check elemental/alloy identity, production method, oxide layer and dust properties and determine brittleness or ductility.'), pair('优先比较分级与轻度解聚：保形粉体先避免不必要的破碎，只有实测可行时才采用进一步粉碎。', 'Compare classification and light deagglomeration first: avoid unnecessary fracture of shape-sensitive powders and add milling only where demonstrated suitable.'), pair('气氛与密闭回收：按氧化和粉尘特性评估保护气体、密闭转移和独立收集，防止跨合金混料。', 'Control atmosphere and recovery: assess protective gas, enclosed transfer and separate collection for oxidation and dust behaviour, avoiding cross-alloy contamination.')],
    selection: pair('分级机用于已有目标形貌的粒级选择；气流粉碎只作为可粉碎材料的候选，软质延展金属可能需要其他前处理。保护系统的气体循环、氧监测和收集应整体评估。', 'Classifiers grade powders with an established morphology. Jet milling is a candidate only for suitable feed; soft ductile metals may need other pretreatment. Assess gas circulation, oxygen monitoring and collection as one protection system.'),
    inputs: pair('金属/合金牌号、粒形与制粉方法、氧含量、延展性、粉尘特性、目标分布和可接受杂质。', 'Metal/alloy grade, morphology and production method, oxygen, ductility, dust properties, target distribution and acceptable impurities.'),
    checks: pair('氧与杂质增量、粒形、粒度、各级配成分一致性、回收率及密闭转移效果。', 'Added oxygen and impurities, shape, size, compositional consistency across fractions, recovery and enclosed-transfer performance.'),
    equipment: ['air-classifier','jet-mill','laboratory-equipment'], technology: 'inert-gas-classification',
  },
  mineral: {
    title: pair('矿物粒级与配方要求匹配', 'Match mineral grades to formulation requirements'),
    steps: [pair('原矿检查与调质：明确矿物组成、含水和杂质，先除杂、预破碎或必要干燥。', 'Inspect and condition ore: establish minerals, moisture and impurities, then clean, pre-crush or dry as needed.'), pair('按目标磨细：结合硬度和用途比较机械或气流路线，避免不必要的细粉和结构损失。', 'Grind to the target: compare impact and jet routes using hardness and application, avoiding unnecessary fines and structural loss.'), pair('分级闭路与独立收集：将粗料按需要返回，分别核查细粉、粗料及目标产品的成分和质量平衡。', 'Classify with optional recycle and separate collection: return coarse material where useful and check composition and mass balance of fines, coarse and target streams.')],
    selection: pair('机械粉碎、气流分级可组成基础路线，细度或杂质要求较高时再比较气流磨。矿物品位提升与粒度整理是不同目标，必要选矿不能由分级设备名称替代。', 'Impact milling and air classification form a starting route; compare jet milling where fineness or purity needs justify it. Mineral upgrading and size grading are different goals and required beneficiation is not replaced by a classifier name.'),
    inputs: pair('矿种与产地、矿物组成、原矿粒度、含水、硬度、白度/杂质、目标粒级与后续配方。', 'Mineral and origin, mineralogy, feed size, moisture, hardness, whiteness/impurities, target grade and downstream formulation.'),
    checks: pair('粒度级配、白度/杂质、磨耗、目标粒级收率，以及陶瓷/涂料/建材等相应配方表现。', 'Distribution, whiteness/impurities, wear, target-grade yield and relevant ceramic, coating or building-material formulation performance.'),
    equipment: ['impact-mill','air-classifier','turnkey-epc'], technology: 'multi-stage-classification',
  },
  waste: {
    title: pair('预处理、粒度整理与用途验证', 'Pretreatment, grading and end-use verification'),
    steps: [pair('来源与批次评估：核查组成、含水及不适合加工的夹杂，按需要分选、除金属、脱水或干燥。', 'Assess source and batch: characterize composition, moisture and unsuitable inclusions, then sort, remove metal, dewater or dry as required.'), pair('选择性粉碎或解离：明确是缩小颗粒、打开复合结构还是仅分离粒级，比较磨耗和能耗。', 'Grind selectively or liberate: distinguish size reduction, liberation of composites and simple grading, comparing wear and energy.'), pair('分级回收与用途检测：独立收集各组分或粒级，进行质量平衡，并验证目标用途所需的化学与性能指标。', 'Classify, recover and test use: collect components or grades separately, establish a mass balance and verify chemistry and performance for the intended application.')],
    selection: pair('机械磨与分级机处理基础粒级，EPC评估串联前处理、输送和收集。余热或蒸汽路线只有在热源品质、材料稳定性及完整系统能耗满足要求时才具备比较意义。', 'Impact mills and classifiers manage basic grading, while EPC assessment integrates pretreatment, conveying and collection. Waste-heat or steam routes are meaningful only when source quality, material stability and whole-system energy meet requirements.'),
    inputs: pair('产生工艺、批次组成、金属/有机夹杂、含水、矿物相、目标用途与适用检测要求、可用热源。', 'Generating process, batch composition, metal/organic inclusions, moisture, mineral phases, end use and required tests, available heat sources.'),
    checks: pair('粒度和质量平衡、残留杂质、磨耗及系统能耗；按用途验证活性、体积稳定性或浸出等指标。', 'Size and mass balance, residual impurities, wear and system energy; activity, volume stability, leaching or other application-specific metrics.'),
    equipment: ['impact-mill','air-classifier','turnkey-epc'], technology: 'steam-jet-mill',
  },
  pigment: {
    title: pair('以分散与色泽为目标的解聚', 'Deagglomeration for dispersion and colour'),
    steps: [pair('确认颜料与配方状态：记录化学组成、煅烧或表面处理、热敏性及团聚强度。', 'Identify pigment and formulation state: record composition, calcination or surface treatment, heat sensitivity and agglomerate strength.'), pair('温和解聚或必要磨细：优先打开软团聚，硬团聚再比较更高强度，检查色相和结构变化。', 'Disperse gently or grind as needed: first open soft agglomerates, increasing intensity for hard ones only while checking shade and structure.'), pair('粗粒控制与换色清洁：通过分级整理粗尾，减少管路残留，将回收、白度或色差列入评价。', 'Control coarse particles and clean for colour changes: classify coarse tails, reduce line residues and assess recovery, whiteness or colour difference.')],
    selection: pair('气流磨用于细化或解聚的对比，分级机用于剔除不合适粒级，实验设备确认目标配方中的效果。颜料分散、色相与着色力不能只由平均粒径推断。', 'Compare jet milling for fine grinding or dispersion, classifiers for unsuitable grades and laboratory equipment for formulation verification. Dispersion, shade and tinting strength cannot be inferred from mean size alone.'),
    inputs: pair('颜料/染料身份、牌号、表面处理、热稳定性、原料与目标粒度、使用介质和颜色容限。', 'Pigment/dye identity, grade, treatment, thermal stability, feed and target sizes, application medium and colour tolerance.'),
    checks: pair('粒度粗尾、分散性、色差/着色表现、外来颗粒、换色残留和收率。', 'Coarse tail, dispersion, colour/tinting behaviour, foreign particles, changeover residues and yield.'),
    equipment: ['jet-mill','air-classifier','laboratory-equipment'], technology: 'deagglomeration',
  },
  assess: {
    title: pair('先明确物料身份与加工目标', 'Establish material identity and processing goals first'),
    steps: [pair('材料范围确认：提供成分、来源、牌号及现有处理状态，区分单一材料、混合配方与回收物。', 'Confirm material scope: provide composition, origin, grade and treatment state, distinguishing single materials, formulations and recovered feeds.'), pair('确定真正任务：分别判断预切、干燥、解聚、粉碎、分级或形貌调整是否必要，选择可比较的小样试验。', 'Define the task: decide separately whether cutting, drying, dispersion, milling, classification or shape adjustment is needed, then choose comparable small-sample trials.'), pair('形成选型输入：以目标用途、完整物料平衡和质量检测结果确定路线、设备与工程边界。', 'Develop selection inputs: use intended application, full mass balance and quality measurements to establish the route, equipment and engineering scope.')],
    selection: pair('身份不明确或成分复杂的原料先进入技术评估；实验平台用于比较可能路线，整线设备应在物性、处理范围和检测方法明确后选择。', 'Unidentified or complex feedstocks start with technical assessment. Laboratory platforms compare candidate routes; production equipment follows once properties, handling scope and measurement methods are established.'),
    inputs: pair('准确物料名称、成分/安全资料、来源、含水、热敏和粉尘属性、原料尺寸、目标用途与验收方法。', 'Accurate identity, composition/safety data, origin, moisture, thermal and dust properties, feed size, end use and acceptance methods.'),
    checks: pair('先验证身份和路线适用性，再记录粒度、形貌、杂质、回收率以及用途对应指标。', 'Verify identity and route suitability first, then record size, shape, impurities, recovery and application-specific metrics.'),
    equipment: ['laboratory-equipment','turnkey-epc'], technology: 'specialist-processes',
  },
};

export function getMaterialSlugs() { return materials.map(({ slug }) => slug); }
export function getMaterial(slug: string) { return materials.find((item) => item.slug === slug); }
export function getMaterialEntries(categoryId: string) { return materialEntries.filter((item) => item.categoryId === categoryId); }
export function getMaterialEquipment(material: Material, locale: Locale) {
  return materialGuidance[material.profile].equipment.map((slug) => ({ href: `/products/${slug}`, name: productNames[locale][slug] }));
}
export function getMaterialInquiryHref(material: Material, locale: Locale) {
  return `/contact-us?material=${encodeURIComponent(material.name[locale])}&service=trial`;
}
