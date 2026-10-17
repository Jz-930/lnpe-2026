import type { Locale } from "@/i18n/config";
import { newsEntries, type NewsTag } from "@/content/news";

export const newsTags: Record<Locale, Record<NewsTag, string>> = {
  en: { Company: "Company", Technology: "Technology", Application: "Application", Project: "Project", Industry: "Industry" },
  zh: { Company: "公司动态", Technology: "技术资讯", Application: "应用资讯", Project: "项目动态", Industry: "行业资讯" },
};
export function getNews(locale: Locale) {
  return newsEntries.map(({ copy, tag, ...article }) => ({ ...article, ...copy[locale], tagId: tag, tag: newsTags[locale][tag] }));
}
export function getNewsArticle(locale: Locale, slug: string) {
  return getNews(locale).find((article) => article.slug === slug || article.aliases?.includes(slug));
}
const newsEn = {
  eyebrow: "NEWS & EVENTS", title: "Industry resources and LNPE updates.",
  intro: "Company activities, industry exchanges and powder processing technology from LNPE.",
  read: "Read Story", back: "Back to News", featuredImage: "event image",
  archive: "Earlier news & technical archive", archiveIntro: "Browse earlier exhibitions, company milestones, technical reports and industry briefs.",
  all: "All categories", search: "Search the archive", searchPlaceholder: "Search a title or topic…", noResults: "No articles match this search.",
  historical: "Historical article", brief: "Archive brief", eventDate: "Event", published: "Published",
  sources: "Original publication", gallery: "Event photographs", related: "Explore the technology", count: "articles",
};
export const newsMessages: Record<Locale, typeof newsEn> = {
  en: newsEn,
  zh: {
    eyebrow: "新闻与活动", title: "行业资讯与 LNPE 动态。", intro: "了解 LNPE 的公司活动、行业交流与粉体加工技术。",
    read: "阅读详情", back: "返回新闻", featuredImage: "活动配图",
    archive: "历史新闻与技术资料", archiveIntro: "按主题查阅往期展会、公司动态、技术报告与行业简讯。",
    all: "全部分类", search: "搜索历史新闻", searchPlaceholder: "搜索标题或主题…", noResults: "没有符合条件的文章。",
    historical: "历史资讯", brief: "档案简讯", eventDate: "活动时间", published: "发布时间",
    sources: "原始报道", gallery: "活动图片", related: "了解相关技术", count: "篇",
  },
};
