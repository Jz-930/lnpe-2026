import type { Locale } from '@/i18n/config';
import { fieldScenes } from './field-scenes';

const copy = {
  zh: [
    ['进料与调质', '先看清原料，再确定处理路线。连续稳定的进料，是后续粉碎与分级的共同起点。', '核对物料身份、粒径、含水和团聚状态，按需要进行预处理与异物去除。', '试验时记录原料批次和进料方式，将检测数据与实际来料关联起来。'],
    ['粉碎与解聚', '粉碎缩小实体颗粒；解聚拆开团聚体。根据材料与目标选择作用方式，而不是一味追求更细。', '比较气流碰撞、机械冲击与较低强度的分散，结合硬度、脆性、热敏性和纯度要求选择设备。', '用粒度与显微形貌共同评价结果，关注成品收率和不需要的细粉增量。'],
    ['分级与回路', '在气流中分离不同粒级，按工艺需要将粗颗粒返回处理，把目标产品从循环中及时取出。', '颗粒密度、形状和运行条件都会影响分离结果。分级不是化学提纯，粒度数据应注明测试方法。', '记录产品、粗料和细粉各物流，以质量平衡比较候选路线。'],
    ['颗粒整形', '围绕目标应用调整颗粒形貌，例如石墨球化或棱角整理；需要保形的材料采用不同策略。', '整形与粒度控制需要一起评估，并关注比表面积、堆积表现和产品收率。', '不是每条产线都需要整形。是否加入此步骤，由材料特性、目标形貌和来料试验决定。'],
    ['收集与转移', '将成品从气固混合物流中回收，并在后续转移中保持工艺连续性与物料状态。', '旋风、过滤与密闭转移按物料和工况组合，气氛、防潮、清洁及粉尘控制在方案阶段明确。', '成品、细粉与系统残留都纳入试验记录，关联收集方式与检测结果。'],
  ],
  en: [
    ['Feed & conditioning', 'Understand the feed before selecting a route. Stable feeding is the shared starting point for grinding and classification.', 'Check identity, particle size, moisture and agglomeration, then condition the feed and remove foreign matter as required.', 'Record feed batch and feeding method so trial measurements remain traceable to the actual material.'],
    ['Grinding & deagglomeration', 'Grinding fractures solid particles; deagglomeration separates clusters. Choose the action for the target rather than simply aiming finer.', 'Compare jet collision, mechanical impact and lower-intensity dispersion against hardness, brittleness, heat sensitivity and purity requirements.', 'Evaluate size and microscopy together, including product yield and the increase in unwanted fines.'],
    ['Classification & recirculation', 'Separate particle fractions in airflow, return coarse material where needed and withdraw the target fraction from the loop.', 'Density, shape and operating conditions affect separation. Classification is not chemical purification; report the particle-size test method.', 'Track product, coarse and fine streams to compare alternative routes with a mass balance.'],
    ['Particle shaping', 'Adjust morphology for the application, such as graphite spheroidization or edge conditioning. Shape-retaining materials need a different approach.', 'Evaluate shaping together with size control, surface area, packing behaviour and product yield.', 'Not every line needs a shaping stage. Material properties, morphology targets and feed trials determine whether to include it.'],
    ['Collection & transfer', 'Recover product from the gas–solid stream while maintaining process continuity and material condition during transfer.', 'Combine cyclone, filtration and enclosed transfer according to material and duty. Agree atmosphere, moisture, cleaning and dust-control needs during planning.', 'Include product, fines and system residues in the trial record, linking collection methods with measurements.'],
  ],
};
const sceneKeys = ['laboratory', 'production', 'classification', 'shaping', 'production'] as const;
const stepIds = ['feed', 'grinding', 'classification', 'shaping', 'collection'] as const;

export function getProcessInsights(locale: Locale) {
  return copy[locale].map(([title, description, ...details], index) => ({
    id: stepIds[index], title, description, details,
    image: fieldScenes[sceneKeys[index]].src,
    imageAlt: fieldScenes[sceneKeys[index]].alt[locale],
  }));
}
