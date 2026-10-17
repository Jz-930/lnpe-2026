import type { Locale } from "@/i18n/config";

type Copy = Record<Locale, string>;
type Visual = { src: string; alt: Copy; label: Copy };
export type EditorialVisual = {
  number: string;
  code: string;
  primary: Visual;
  detail: Visual;
  closing: Visual;
  note: Copy;
  chapters: { href: string; label: Copy }[];
  closingTitle: Copy;
  closingText: Copy;
  action: { href: string; label: Copy };
};

const copy = (zh: string, en: string): Copy => ({ zh, en });
const visual = (name: string, label: Copy, alt: Copy): Visual => ({ src: `/images/10_editorial/${name}.webp`, label, alt });

/** Promotional scene illustrations. Captions describe a process, never a verified customer site. */
export const editorialVisuals: Record<string, EditorialVisual> = {
  "/research": {
    number: "01", code: "RESEARCH / VALIDATION",
    primary: visual("research-trial", copy("从一份来料，开始验证", "A process begins with a sample"), copy("小型粉体试验装置、连接管路和控制部件的场景示意", "Illustrative small-scale powder trial equipment, pipework and controls")),
    detail: visual("research-engineering", copy("研究与工程协同", "Research meets engineering"), copy("工程团队在电脑工作区开展设计的场景示意", "Illustrative engineering team working at design stations")),
    closing: visual("research-analysis", copy("粒度 · 形貌 · 综合评价", "Size · morphology · assessment"), copy("实验检测仪器及显微观察的横幅组合示意", "Illustrative panoramic montage of analytical instruments and microscopy")),
    note: copy("材料特性 → 试验验证 → 工艺方案", "Material properties → trials → process design"),
    chapters: [
      { href: "#institute", label: copy("技术研究", "Research") },
      { href: "#analysis", label: copy("检测能力", "Analysis") },
      { href: "#trial", label: copy("来料试验", "Material trials") },
      { href: "#collaboration", label: copy("合作开发", "Collaboration") },
    ],
    closingTitle: copy("让每一次试验，都有可比较的依据。", "Make every trial a meaningful comparison."),
    closingText: copy("把样品、工况与检测方法放在一起讨论，再判断粒度、形貌与放大方向。", "Review the sample, operating conditions and measurement method together to evaluate size, morphology and scale-up."),
    action: { href: "/contact-us?service=trial", label: copy("交流来料与试验目标", "Discuss your material and trial targets") },
  },
  "/support": {
    number: "02", code: "ENGINEERING / SERVICE",
    primary: visual("support-consultation", copy("围绕设备，衔接每一个阶段", "Support around the equipment"), copy("两位技术人员在设备旁交流运行与维护事项的场景示意", "Illustrative technicians discussing operation and maintenance beside equipment")),
    detail: visual("support-operation", copy("从调试到日常操作", "From commissioning to operation"), copy("技术人员操作设备控制界面的近景示意", "Illustrative close-up of a technician using equipment controls")),
    closing: visual("support-spares", copy("配套部件与维护准备", "Components and maintenance planning"), copy("成组电机与传动配套部件的场景示意", "Illustrative motors and drive components arranged for assembly")),
    note: copy("方案沟通 → 调试交接 → 运行维护", "Planning → commissioning → maintenance"),
    chapters: [
      { href: "#selection", label: copy("选型与布局", "Selection & layout") },
      { href: "#commissioning", label: copy("调试与培训", "Commissioning") },
      { href: "#maintenance", label: copy("维护与诊断", "Maintenance") },
      { href: "#spares", label: copy("备件支持", "Spare parts") },
      { href: "#oem", label: copy("OEM加工", "OEM processing") },
      { href: "#visit", label: copy("试验与考察", "Trials & visits") },
    ],
    closingTitle: copy("从一个部件，看到整套系统。", "Consider the component and the complete system."),
    closingText: copy("设备型号、部件编号、物料工况与运行记录，帮助工程人员更准确地理解维护和备件需求。", "Equipment models, part numbers, material conditions and operating records help engineers assess maintenance and spare-parts needs."),
    action: { href: "/contact-us?service=maintenance", label: copy("沟通维护与备件需求", "Discuss maintenance and spare parts") },
  },
  "/resources": {
    number: "03", code: "KNOWLEDGE / PROCESS",
    primary: visual("resources-planning", copy("把技术问题，放回工艺全貌", "See the process behind the question"), copy("配有工艺流程白板与会议桌的技术交流空间示意", "Illustrative technical meeting space with a process whiteboard")),
    detail: visual("resources-records", copy("让需求有据可查", "Keep requirements traceable"), copy("技术人员在设备旁核对并填写检查记录的场景示意", "Illustrative technician checking and writing equipment inspection records")),
    closing: visual("resources-liner", copy("接触物料的结构细节", "Product-contact details"), copy("金属设备壳体与内部陶瓷内衬的结构示意", "Illustrative metal equipment housing with an internal ceramic liner")),
    note: copy("认识材料 → 理解工艺 → 准备需求", "Know the material → understand the process → define the brief"),
    chapters: [
      { href: "#checklists", label: copy("需求清单", "Enquiry checklist") },
      { href: "#videos", label: copy("设备视频", "Equipment videos") },
      { href: "#faq", label: copy("常见问题", "Common questions") },
    ],
    closingTitle: copy("好的选型，始于具体的问题。", "Good equipment selection starts with a precise question."),
    closingText: copy("例如纯度与磨损要求，会影响接触物料部件的选择。准备材料、粒度、产能与使用条件，让资料交流更有效。", "Purity and wear requirements influence product-contact components. Bring material, particle-size, capacity and operating details to the technical discussion."),
    action: { href: "/contact-us?service=documents", label: copy("申请对应设备资料", "Request relevant equipment documents") },
  },
};
