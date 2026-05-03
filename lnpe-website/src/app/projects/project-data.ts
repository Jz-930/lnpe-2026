export type ProjectCase = {
  slug: string;
  title: string;
  date: string;
  focus: string;
  system: string;
  description: string;
  image: string;
  gallery: string[];
  evidence: string[];
};

export const PROJECT_CASES: ProjectCase[] = [
  {
    slug: "shaping-mill-project",
    title: "Shaping Mill Project",
    date: "4/26/2025",
    focus: "Morphology Control",
    system: "Shaping Mill",
    description:
      "The Shaping Mill tailors particle morphology - spheroidal, multi-faceted, or high-aspect - while simultaneously trimming size to sub-micron levels. Its all-ceramic, metal-free lining preserves purity and the low-temperature process protects heat-sensitive powders. Ideal for: graphite spheroidisation, mica plate-edge rounding, wollastonite aspect-ratio enhancement, and other specialty fillers where shape directly drives performance.",
    image: "/images/06_projects/project_01_shaping-mill-project/project_01_cover.png",
    gallery: [
      "/images/06_projects/project_01_shaping-mill-project/project_01_content_01.png",
      "/images/06_projects/project_01_shaping-mill-project/project_01_content_02.png",
      "/images/06_projects/project_01_shaping-mill-project/project_01_content_03.png",
    ],
    evidence: ["All-ceramic lining", "Low-temperature process", "Graphite and specialty filler fit"],
  },
  {
    slug: "jet-pulverizer-project",
    title: "Jet Pulverizer Project",
    date: "3/19/2025",
    focus: "Battery Materials",
    system: "Jet Pulverizer",
    description:
      "The Jet Pulverizer offers single-pass, high-yield micronisation - coarse particles collide once in a sonic jet, are instantly re-classified, and re-circulate only if needed. Key uses: sintered ternary cathodes, Si-C composites, coated graphite anodes, glass beads, metallic silicon and other lithium-ion battery powders.",
    image: "/images/06_projects/project_02_jet-pulverizer-project/project_02_cover.png",
    gallery: [
      "/images/06_projects/project_02_jet-pulverizer-project/project_02_content_01.png",
      "/images/06_projects/project_02_jet-pulverizer-project/project_02_content_02.png",
      "/images/06_projects/project_02_jet-pulverizer-project/project_02_content_03.png",
      "/images/06_projects/project_02_jet-pulverizer-project/project_02_content_04.webp",
    ],
    evidence: ["Single-pass micronisation", "Instant re-classification", "Battery powder use cases"],
  },
  {
    slug: "epc-project",
    title: "EPC Project",
    date: "3/19/2025",
    focus: "Turnkey EPC",
    system: "Powder-Processing Line",
    description:
      "As a one-stop EPC partner, LNPE delivers turnkey powder-processing lines - from custom process design and in-house supply of mills, classifiers, mixers and conveyors, to on-site installation, commissioning, operator training and long-term maintenance. Backed by hundreds of successful projects worldwide, the integrated approach lets clients fast-track safe, energy-efficient and highly reliable production facilities.",
    image: "/images/06_projects/project_03_epc-project/project_03_cover.webp",
    gallery: [
      "/images/06_projects/project_03_epc-project/project_03_content_01.png",
      "/images/06_projects/project_03_epc-project/project_03_content_02.png",
      "/images/06_projects/project_03_epc-project/project_03_content_03.png",
      "/images/06_projects/project_03_epc-project/project_03_content_04.png",
      "/images/06_projects/project_03_epc-project/project_03_content_05.png",
    ],
    evidence: ["Custom process design", "In-house equipment supply", "Installation and lifecycle support"],
  },
  {
    slug: "lithium-iron-phosphate-specialized-classified-jet-mill",
    title: "Lithium Iron Phosphate Specialized Classified Jet Mill",
    date: "2/1/2025",
    focus: "Battery Materials",
    system: "Classified Jet Mill",
    description:
      "The Lithium Iron Phosphate (LFP) Specialized Classified Jet Mill marries LNPE's patented multi-nozzle jet-collision technology with a precision turbine classifier to produce sub-micron, high-purity cathode powder in a single, closed-loop operation. Ceramic, metal-free linings eliminate ferromagnetic contamination, while the ultrafast, low-temperature milling zone safeguards LFP's crystal integrity and electrochemical performance.",
    image:
      "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_cover.png",
    gallery: [
      "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_content_01.png",
      "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_content_02.png",
    ],
    evidence: ["Multi-nozzle jet collision", "Precision turbine classifier", "Ceramic metal-free lining"],
  },
  {
    slug: "air-classification-project",
    title: "Air Classification Project",
    date: "8/14/2024",
    focus: "Powder Classification",
    system: "Air Classifier",
    description:
      "Real-time air-classifying extracts in-spec particles on the first pass and automatically recycles coarse fractions, delivering a narrow particle-size distribution, superior tap density, and industry-leading energy efficiency - an ideal solution for next-generation lithium-ion battery manufacturing.",
    image: "/images/06_projects/project_05_air-classification-project/project_05_cover.png",
    gallery: [
      "/images/06_projects/project_05_air-classification-project/project_05_content_01.png",
      "/images/06_projects/project_05_air-classification-project/project_05_content_02.png",
    ],
    evidence: ["First-pass in-spec extraction", "Coarse fraction recycling", "Narrow particle-size distribution"],
  },
  {
    slug: "impact-mill-project",
    title: "Impact Mill Project",
    date: "3/17/2024",
    focus: "Impact Grinding",
    system: "Classifying Impact Mill",
    description:
      "The LNI Classifying Impact Mill combines high-speed hammer impact with an in-line turbine classifier to produce ultrafine powders in one continuous loop. Tunable rotor and classifier designs handle sticky or fibrous feeds while delivering high throughput, tight size control, and low specific energy consumption.",
    image: "/images/06_projects/project_06_impact-mill-project/project_06_cover.png",
    gallery: [
      "/images/06_projects/project_06_impact-mill-project/project_06_content_01.png",
      "/images/06_projects/project_06_impact-mill-project/project_06_content_02.png",
      "/images/06_projects/project_06_impact-mill-project/project_06_content_03.png",
    ],
    evidence: ["High-speed hammer impact", "In-line turbine classifier", "Sticky and fibrous feed handling"],
  },
];

export const PROJECT_FILTERS = ["All", ...Array.from(new Set(PROJECT_CASES.map((project) => project.focus)))];

export function getProjectBySlug(slug: string) {
  return PROJECT_CASES.find((project) => project.slug === slug);
}
