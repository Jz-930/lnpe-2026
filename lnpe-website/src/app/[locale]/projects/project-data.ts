import type { Locale } from "@/i18n/config";
import { projectCopy, projectFilterLabels, type ProjectCopy, type ProjectSlug } from "@/i18n/messages/catalog";
import { projectEngineering } from "@/content/projects";

export type ProjectFilter = "all" | "morphology" | "battery" | "epc" | "classification" | "impact";
type ProjectDefinition = { slug: ProjectSlug; date: string; focusId: Exclude<ProjectFilter, "all">; image: string; gallery: string[] };
export type ProjectCase = ProjectDefinition & ProjectCopy & { focus: string };

const PROJECT_DEFINITIONS: ProjectDefinition[] = [
  {
    "slug": "shaping-mill-project",
    "date": "2025-04-26",
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
    "date": "2025-03-19",
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
    "date": "2025-03-19",
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
    "date": "2025-02-01",
    "focusId": "battery",
    "image": "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_cover.png",
    "gallery": [
      "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_content_01.png",
      "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_content_02.png"
    ]
  },
  {
    "slug": "air-classification-project",
    "date": "2024-08-14",
    "focusId": "classification",
    "image": "/images/06_projects/project_05_air-classification-project/project_05_cover.png",
    "gallery": [
      "/images/06_projects/project_05_air-classification-project/project_05_content_01.png",
      "/images/06_projects/project_05_air-classification-project/project_05_content_02.png"
    ]
  },
  {
    "slug": "impact-mill-project",
    "date": "2024-03-17",
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
  return PROJECT_DEFINITIONS.map((project) => ({ ...project, ...projectCopy[locale][project.slug], description: projectEngineering[project.slug].copy[locale].description, evidence: projectEngineering[project.slug].copy[locale].evidence, focus: projectFilterLabels[locale][project.focusId] }));
}

export const PROJECT_CASES = getProjectCases("en");
export const PROJECT_FILTERS: ProjectFilter[] = ["all", "morphology", "battery", "epc", "classification", "impact"];

export function getProjectBySlug(slug: string, locale: Locale = "en") {
  return getProjectCases(locale).find((project) => project.slug === slug);
}
