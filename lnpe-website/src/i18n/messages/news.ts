import type { Locale } from "@/i18n/config";

type NewsTag = "Company" | "Technology" | "Application" | "Project";
type NewsEntry = {
  slug: string;
  date: string;
  tag: NewsTag;
  image: string;
  copy: Record<Locale, { title: string; desc: string }>;
};

// Both languages and both page types share article identity, dates, and media.
const newsEntries: NewsEntry[] = [
  {
    "date": "6/1/2025",
    "tag": "Application",
    "slug": "lnpe-participated-in-the-advanced-ceramics-exhibition-and-concluded-successfully",
    "image": "/images/07_news/news_01_lnpe-participated-in-the-advanced-ceramics-exhibition-and-concluded-successfully/news_01_cover.jpg",
    "copy": {
      "en": {
        "title": "LNPE participated in the Advanced Ceramics Exhibition and concluded successfully",
        "desc": "LNPE made a wonderful appearance at the 17th China International Advanced Ceramics Exhibition (IACE CHINA 2025)."
      },
      "zh": {
        "title": "LNPE 圆满亮相先进陶瓷展",
        "desc": "LNPE 精彩亮相第十七届中国国际先进陶瓷展览会（IACE CHINA 2025）。"
      }
    }
  },
  {
    "date": "3/8/2025",
    "tag": "Technology",
    "slug": "lnpe-appeared-at-the-interbattery-2025-in-seoul-south-korea",
    "image": "/images/07_news/news_02_lnpe-appeared-at-the-interbattery-2025-in-seoul-south-korea/news_02_cover.png",
    "copy": {
      "en": {
        "title": "LNPE appeared at the INTERBATTERY 2025 in Seoul, South Korea",
        "desc": "At Seoul's 13th InterBattery expo, LNPE's display of high-efficiency, eco-friendly powder equipment for lithium-battery production drew strong visitor interest."
      },
      "zh": {
        "title": "LNPE 亮相韩国首尔 INTERBATTERY 2025",
        "desc": "在首尔举办的第十三届 InterBattery 展会上，LNPE 展示了面向锂电池生产的高效、环保粉体设备，吸引了众多参观者的关注。"
      }
    }
  },
  {
    "date": "2/8/2025",
    "tag": "Company",
    "slug": "lnpe-embarks-on-a-new-journey-see-you-in-seoul",
    "image": "/images/07_news/news_03_lnpe-embarks-on-a-new-journey-see-you-in-seoul/news_03_cover.png",
    "copy": {
      "en": {
        "title": "LNPE embarks on a new journey, see you in Seoul!",
        "desc": "LNPE welcomes global partners to explore its latest powder-technology innovations at the 2025 Seoul Battery Show this spring."
      },
      "zh": {
        "title": "LNPE 开启新征程，首尔见！",
        "desc": "LNPE 诚邀全球合作伙伴于今年春季相聚 2025 首尔电池展，共同探索最新粉体技术创新。"
      }
    }
  },
  {
    "date": "1/25/2025",
    "tag": "Company",
    "slug": "lnpe-and-new-district-map-out-the-2025-development-blueprint",
    "image": "/images/07_news/news_04_lnpe-and-new-district-map-out-the-2025-development-blueprint/news_04_cover.png",
    "copy": {
      "en": {
        "title": "LNPE and New District map out the 2025 development blueprint",
        "desc": "The Mianyang Science and Technology City New District held a grand conference on economic work and made comprehensive arrangements for 2025."
      },
      "zh": {
        "title": "LNPE 与新区共绘 2025 年发展蓝图",
        "desc": "绵阳科技城新区召开经济工作大会，对 2025 年工作作出全面部署。"
      }
    }
  },
  {
    "date": "10/12/2024",
    "tag": "Project",
    "slug": "lnpe-debuts-at-north-american-battery-show",
    "image": "/images/07_news/news_05_lnpe-debuts-at-north-american-battery-show/news_05_cover.png",
    "copy": {
      "en": {
        "title": "LNPE debuts at North American Battery Show",
        "desc": "LNPE recently made a splendid appearance at the 2024 North American Battery Show held at the Huntington Square Convention Center in Detroit."
      },
      "zh": {
        "title": "LNPE 亮相北美电池展",
        "desc": "LNPE 亮相于底特律 Huntington Square 会展中心举办的 2024 北美电池展。"
      }
    }
  }
];

export const newsTags: Record<Locale, Record<NewsTag, string>> = {
  en: { Company: "Company", Technology: "Technology", Application: "Application", Project: "Project" },
  zh: { Company: "公司动态", Technology: "技术资讯", Application: "应用资讯", Project: "项目动态" },
};

export function getNews(locale: Locale) {
  return newsEntries.map(({ copy, tag, ...article }) => ({
    ...article,
    ...copy[locale],
    tag: newsTags[locale][tag],
  }));
}

export function getNewsArticle(locale: Locale, slug: string) {
  return getNews(locale).find((article) => article.slug === slug);
}

const newsEn = {
  "eyebrow": "NEWS & EVENTS",
  "title": "Industry resources and LNPE updates.",
  "intro": "Stay informed about company activities, industry trends and powder processing technologies through a cleaner editorial system.",
  "read": "Read Story",
  "back": "Back to News",
  "featuredImage": "featured image",
  "paragraphs": [
    "To stay informed about the latest industry developments and technological advancements related to LNPE, you can visit the official news section, which offers updates on company activities, industry trends and powder processing technologies.",
    "Full article contents are provided via LNPE primary content and customer relationship systems."
  ]
};
export const newsMessages: Record<Locale, typeof newsEn> = {
  en: newsEn,
  zh: {
  "eyebrow": "新闻与活动",
  "title": "行业资讯与 LNPE 动态。",
  "intro": "了解公司活动、行业趋势与粉体加工技术的最新资讯。",
  "read": "阅读详情",
  "back": "返回新闻",
  "featuredImage": "新闻配图",
  "paragraphs": [
    "如需了解 LNPE 相关的最新行业发展与技术进展，可访问官方新闻栏目，获取公司活动、行业趋势与粉体加工技术动态。",
    "完整文章内容由 LNPE 的原始内容及客户关系系统提供。"
  ]
}
};
