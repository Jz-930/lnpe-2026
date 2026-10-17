import materials from "@/content/materials-search-index.json";
import { PRODUCT_TECHNOLOGIES } from "@/content/product-technology";
import { newsEntries } from "@/content/news";

const topics = [
  { path: "/resources#videos", zh: "原理与设备视频", en: "Principle and equipment videos", keywords: "video videos 动画 视频 原理" },
  { path: "/research#trial", zh: "来料试验与检测", en: "Material trials and analysis", keywords: "trial test testing sample laboratory 实验 试验 检测 送样" },
  { path: "/support#oem", zh: "OEM粉体加工", en: "OEM powder processing", keywords: "oem toll processing 代工 加工" },
  { path: "/support#maintenance", zh: "设备维护与售后", en: "Maintenance and after-sales service", keywords: "maintenance repair service 维修 维保 售后" },
  { path: "/support#spares", zh: "备件与磨损件", en: "Spare and wear parts", keywords: "spare parts wear 备件 零件 配件" },
  { path: "/contact-us?service=selection", zh: "方案、报价与工程咨询", en: "Proposals, quotations and engineering enquiries", keywords: "price cost quote quotation footprint energy 价格 报价 成本 预算 场地 能耗" },
];
const normalise = (value: string) => value.toLowerCase().replace(/[–—-]/g, " ").replace(/\s+/g, " ").trim();
function relevance(query: string, labels: string[], body = "") {
  const names = labels.map(normalise);
  const exact = names.some(name => name === query) ? 100 : 0;
  const phrase = Math.max(0, ...names.filter(name => name.length >= 2 && (query.includes(name) || name.includes(query))).map(name => 25 + Math.min(name.length, 20)));
  const words = query.split(/[^\p{L}\p{N}]+/u).filter(word => word.length >= 3 && !["the", "and", "for", "with", "any", "show", "similar", "have", "does", "what"].includes(word));
  return exact + phrase + words.filter(word => names.some(name => name.includes(word))).length * 5 + words.filter(word => normalise(body).includes(word)).length;
}

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const locale = params.get("lang") === "zh" ? "zh" : "en";
  const q = normalise((params.get("q") || "").slice(0, 300));
  if (!q || (q.length < 2 && !/\p{Script=Han}/u.test(q))) return Response.json({ results: [] });
  const candidates = [
    ...materials.map(item => ({ title: item.name[locale], summary: item.summary[locale], href: `/applications/materials/${item.slug}`, kind: locale === "zh" ? "材料" : "Material", score: relevance(q, [...item.aliases, item.name.zh, item.name.en], `${item.summary.zh} ${item.summary.en}`) })),
    ...PRODUCT_TECHNOLOGIES.map(item => ({ title: item.title[locale], summary: item.summary[locale], href: `/products/technologies/${item.slug}`, kind: locale === "zh" ? "设备与工艺" : "Equipment & process", score: relevance(q, [item.title.zh, item.title.en, ...(item.models || [])], `${item.summary.zh} ${item.summary.en}`) })),
    ...newsEntries.map(item => ({ title: item.copy[locale].title, summary: item.copy[locale].desc, href: `/news/${item.slug}`, kind: locale === "zh" ? "历史动态" : "News archive", score: relevance(q, [item.copy.zh.title, item.copy.en.title]) })),
    ...topics.map(item => ({ title: item[locale], summary: locale === "zh" ? "查看相关说明与联系入口。" : "Read the relevant guidance and find a contact.", href: item.path, kind: locale === "zh" ? "资料与服务" : "Resources & service", score: relevance(q, [item.zh, item.en, ...item.keywords.split(" ")]) })),
  ];
  // Return public fields only; provenance and internal file paths stay on the server.
  const results = candidates.filter(item => item.score >= 5).sort((a, b) => b.score - a.score).slice(0, 6).map(({ title, summary, href, kind }) => ({ title, summary, href, kind }));
  return Response.json({ results }, { headers: { "Cache-Control": "no-store" } });
}
