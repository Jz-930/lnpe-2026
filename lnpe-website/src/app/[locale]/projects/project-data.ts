import type { Locale } from "@/i18n/config";
import { projectCopy, projectFilterLabels, type ProjectCopy, type ProjectSlug } from "@/i18n/messages/catalog";

export type ProjectFilter = "all" | "morphology" | "battery" | "epc" | "classification" | "impact";
type ProjectDefinition = { slug: ProjectSlug; date: string; focusId: Exclude<ProjectFilter, "all">; image: string; gallery: string[] };
export type ProjectCase = ProjectDefinition & ProjectCopy & { focus: string };

const PROJECT_DEFINITIONS: ProjectDefinition[] = [
  {
    "slug": "shaping-mill-project",
    "date": "4/26/2025",
    "focusId": "morphology",
    "image": "/images/06_projects/project_01_shaping-mill-project/project_01_cover.png",
    "gallery": [
      "/images/06_projects/project_01_shaping-mill-project/project_01_content_01.png",
      "/images/06_projects/project_01_shaping-mill-project/project_01_content_02.png",
      "/images/06_projects/project_01_shaping-mill-project/project_01_content_03.png"
    ]
  },
  {
    "slug": "jet-pulverizer-project",
    "date": "3/19/2025",
    "focusId": "battery",
    "image": "/images/06_projects/project_02_jet-pulverizer-project/project_02_cover.png",
    "gallery": [
      "/images/06_projects/project_02_jet-pulverizer-project/project_02_content_01.png",
      "/images/06_projects/project_02_jet-pulverizer-project/project_02_content_02.png",
      "/images/06_projects/project_02_jet-pulverizer-project/project_02_content_03.png",
      "/images/06_projects/project_02_jet-pulverizer-project/project_02_content_04.webp"
    ]
  },
  {
    "slug": "epc-project",
    "date": "3/19/2025",
    "focusId": "epc",
    "image": "/images/06_projects/project_03_epc-project/project_03_cover.webp",
    "gallery": [
      "/images/06_projects/project_03_epc-project/project_03_content_01.png",
      "/images/06_projects/project_03_epc-project/project_03_content_02.png",
      "/images/06_projects/project_03_epc-project/project_03_content_03.png",
      "/images/06_projects/project_03_epc-project/project_03_content_04.png",
      "/images/06_projects/project_03_epc-project/project_03_content_05.png"
    ]
  },
  {
    "slug": "lithium-iron-phosphate-specialized-classified-jet-mill",
    "date": "2/1/2025",
    "focusId": "battery",
    "image": "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_cover.png",
    "gallery": [
      "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_content_01.png",
      "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_content_02.png"
    ]
  },
  {
    "slug": "air-classification-project",
    "date": "8/14/2024",
    "focusId": "classification",
    "image": "/images/06_projects/project_05_air-classification-project/project_05_cover.png",
    "gallery": [
      "/images/06_projects/project_05_air-classification-project/project_05_content_01.png",
      "/images/06_projects/project_05_air-classification-project/project_05_content_02.png"
    ]
  },
  {
    "slug": "impact-mill-project",
    "date": "3/17/2024",
    "focusId": "impact",
    "image": "/images/06_projects/project_06_impact-mill-project/project_06_cover.png",
    "gallery": [
      "/images/06_projects/project_06_impact-mill-project/project_06_content_01.png",
      "/images/06_projects/project_06_impact-mill-project/project_06_content_02.png",
      "/images/06_projects/project_06_impact-mill-project/project_06_content_03.png"
    ]
  }
];

export function getProjectCases(locale: Locale): ProjectCase[] {
  return PROJECT_DEFINITIONS.map((project) => ({ ...project, ...projectCopy[locale][project.slug], focus: projectFilterLabels[locale][project.focusId] }));
}

export const PROJECT_CASES = getProjectCases("en");
export const PROJECT_FILTERS: ProjectFilter[] = ["all", "morphology", "battery", "epc", "classification", "impact"];

export function getProjectBySlug(slug: string, locale: Locale = "en") {
  return getProjectCases(locale).find((project) => project.slug === slug);
}
