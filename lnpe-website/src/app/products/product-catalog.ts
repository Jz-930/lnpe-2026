export type ProductCategory =
  | "All Systems"
  | "Grinding & Pulverizing"
  | "Classification & Separation"
  | "Morphology Control"
  | "Turnkey Lines"
  | "Laboratory Systems";

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  title: string;
  category: Exclude<ProductCategory, "All Systems">;
  series: string;
  summary: string;
  principle: string;
  overview: string[];
  features: string[];
  applications: string[];
  technicalHighlights: string[];
  tags: string[];
  specs: ProductSpec[];
  imageFolder: string;
  imagePrefix: string;
  galleryCount: number;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "All Systems",
  "Grinding & Pulverizing",
  "Classification & Separation",
  "Morphology Control",
  "Turnkey Lines",
  "Laboratory Systems",
];

export const PRODUCT_CATALOG: Product[] = [
  {
    slug: "jet-mill",
    title: "Jet Mill",
    category: "Grinding & Pulverizing",
    series: "LNJ Series",
    summary: "Optimized structural and flow field design significantly enhances energy efficiency.",
    principle:
      "The LNJ Jet Mill utilizes multiple nozzles to generate high-velocity, sonic-speed airflow, enabling ultrafine pulverization of materials through particle-on-particle collisions. The finely ground particles are then carried into a high-efficiency turbine classifier, where oversized particles are separated and returned to the grinding chamber for further processing.",
    overview: [
      "Engineered based on theoretical modeling and advanced numerical simulations, and integrating both domestic and international technologies, the LNJ Jet Mill represents a new generation of precision grinding equipment.",
      "LNPE offers a versatile range of solutions tailored to specific material characteristics, including low-temperature jet mills, high-temperature variants, and inert gas-protected closed-loop systems.",
    ],
    features: [
      "Low energy consumption",
      "Materials collision each other without contamination, effective for Mohs 1-10 hard Material",
      "Fully automatic control, easy to operate",
      "Omniseal negative pressure operation, no contamination.",
    ],
    applications: ["Industrial powders", "Advanced materials", "Mohs 1-10 materials"],
    technicalHighlights: [
      "High-velocity sonic airflow",
      "Particle-on-particle collision path",
      "High-efficiency turbine classifier",
      "Oversize return loop",
    ],
    tags: ["Ultrafine grinding", "Low contamination", "Closed-loop options"],
    specs: [
      { label: "Process Role", value: "Ultrafine jet milling" },
      { label: "Particle Control", value: "Narrow size distribution" },
      { label: "Material Range", value: "Mohs 1-10" },
      { label: "System Type", value: "Negative pressure operation" },
    ],
    imageFolder: "product_01_jet-mill",
    imagePrefix: "product_01",
    galleryCount: 4,
  },
  {
    slug: "impact-mill",
    title: "Impact Mill",
    category: "Grinding & Pulverizing",
    series: "LNI Series",
    summary: "High-speed hammer impact and compression for ultrafine grinding with precise control.",
    principle:
      "The LNPE Impact Mill combines two size-reduction mechanisms - high-speed hammer impact and hammer-to-liner compression - to achieve ultrafine grinding in a single continuous process. After comminution, material enters the built-in turbine classifier.",
    overview: [
      "Engineered for a wide spectrum of feed characteristics, the LNI system optimizes rotor hammers, toothed stator rings, and classifier geometry within a precisely controlled airflow.",
      "Particles that meet the target size are discharged as product, while oversize fractions are automatically recirculated for further milling.",
    ],
    features: [
      "High-capacity throughput with exceptionally low specific energy consumption",
      "Optional full-ceramic process lining to virtually eliminate ferromagnetic contamination",
    ],
    applications: ["Adhesive feeds", "Fibrous feeds", "Heat-sensitive materials"],
    technicalHighlights: [
      "Hammer impact and liner compression",
      "Built-in turbine classifier",
      "Automatic oversize recirculation",
      "Optional ceramic process lining",
    ],
    tags: ["Impact grinding", "Built-in classifier", "Ceramic lining option"],
    specs: [
      { label: "Process Role", value: "Impact grinding" },
      { label: "Feed Fit", value: "Adhesive and fibrous materials" },
      { label: "Control Mode", value: "Integrated classification" },
      { label: "System Type", value: "Continuous milling loop" },
    ],
    imageFolder: "product_02_impact-mill",
    imagePrefix: "product_02",
    galleryCount: 3,
  },
  {
    slug: "jet-pulverizer",
    title: "Jet Pulverizer",
    category: "Grinding & Pulverizing",
    series: "Patented System",
    summary:
      "A newly developed grinding and classification system designed for materials with strict particle size requirements and high yield demands.",
    principle:
      "The Jet Pulverizer is a patented, next-generation grinding-and-classification system designed for processes that demand narrow particle-size distributions at high throughput with minimal energy draw.",
    overview: [
      "Immediate classification removes material already within specification as feed stock enters the unit.",
      "Oversized particles are channeled into the jet-milling chamber, where supersonic nozzles generate a single, high-energy impact before material returns to the classifier.",
      "Because each particle remains in the milling zone for mere milliseconds, secondary grinding is virtually eliminated, yields are maximized, and the generation of unwanted ultrafines is greatly reduced.",
    ],
    features: [
      "Controlled grinding, high yield, stable particle size, low energy consumption, and large output",
      "The milling strength is easy to control, high yield, low fine powder content",
      "Minimal impact on particle surface morphology, with little damage to the shape of particles",
    ],
    applications: [
      "Sintered ternary cathodes",
      "Si-C composites",
      "Coated graphite anodes",
      "Glass beads",
      "Metallic silicon",
    ],
    technicalHighlights: [
      "Immediate classification",
      "Single-collision milling",
      "Ultra-short residence time",
      "Low unwanted ultrafines",
    ],
    tags: ["High yield", "Battery materials", "Single-collision milling"],
    specs: [
      { label: "Process Role", value: "Grinding and classification" },
      { label: "Particle Control", value: "Strict size requirements" },
      { label: "Residence Time", value: "Milliseconds in milling zone" },
      { label: "System Type", value: "Classifier-first loop" },
    ],
    imageFolder: "product_03_jet-pulverizer",
    imagePrefix: "product_03",
    galleryCount: 4,
  },
  {
    slug: "turnkey-epc",
    title: "Turnkey EPC",
    category: "Turnkey Lines",
    series: "Powder-Processing Line",
    summary:
      "As a supplier of cathode and anode materials, LNPE has successfully delivered over a hundred EPC projects in the battery materials sector.",
    principle:
      "Leveraging decades of process-engineering expertise, LNPE delivers turnkey EPC solutions for powders ranging from specialty chemicals and minerals to high-purity electronic and energy materials.",
    overview: [
      "The one-stop approach covers process design, equipment manufacturing and supply, installation and commissioning, and training and lifecycle service.",
      "All core components are produced in-house, allowing tight quality control and seamless integration across grinding, classification, mixing, conveying, and packaging stages.",
    ],
    features: [
      "Custom-built powder-processing lines tuned to each client's material and throughput targets",
      "Full in-house equipment suite - crushers, mills, classifiers, mixers, conveyors, and more",
      "Rapid on-site install & commissioning by dedicated field engineers",
      "End-to-end technical support with operator training and 24 / 7 service",
      "Proven EPC track record spanning hundreds of projects worldwide",
    ],
    applications: ["Cathode materials", "Anode materials", "Specialty chemicals", "Minerals"],
    technicalHighlights: [
      "Process design",
      "Equipment manufacturing and supply",
      "Installation and commissioning",
      "Training and lifecycle service",
    ],
    tags: ["EPC", "Powder line", "Lifecycle service"],
    specs: [
      { label: "Process Role", value: "Turnkey powder line" },
      { label: "Scope", value: "Design to lifecycle service" },
      { label: "Equipment Suite", value: "Mills, classifiers, mixers, conveyors" },
      { label: "System Type", value: "Custom EPC delivery" },
    ],
    imageFolder: "product_04_turnkey-epc",
    imagePrefix: "product_04",
    galleryCount: 4,
  },
  {
    slug: "shaping-mill",
    title: "Shaping Mill",
    category: "Morphology Control",
    series: "Morphology System",
    summary:
      "Self-developed device for controlling powder morphology and particle size based on sphericity, angularity, or aspect-ratio requirements.",
    principle:
      "The LNPE Shaping Mill employs a high-speed rotor-stator assembly inside a precisely engineered airflow field. Feed powder is accelerated into the shaping zone, where controlled particle-particle and particle-wall collisions round sharp edges, smooth surfaces, or accentuate aspect ratios as required.",
    overview: [
      "A built-in dynamic classifier continuously extracts in-spec particles; oversize or under-shaped fractions are recirculated for additional passes.",
      "By tuning rotor speed, airflow, and classifier cut-point, the system delivers narrowly distributed particles in the target morphology.",
    ],
    features: [
      "Morphology on demand - spheroidal, prismatic, or high-aspect shapes",
      "One-pass shaping + sizing",
      "Modular rotor for diverse powders",
      "High yield, near-zero contamination",
      "Low energy, minimal OPEX",
    ],
    applications: [
      "Graphite spheroidisation",
      "Mica plate-edge rounding",
      "Wollastonite aspect-ratio enhancement",
      "Specialty fillers",
    ],
    technicalHighlights: [
      "High-speed rotor-stator assembly",
      "Controlled shaping zone",
      "Built-in dynamic classifier",
      "Recirculation for additional passes",
    ],
    tags: ["Morphology control", "Shaping + sizing", "High yield"],
    specs: [
      { label: "Process Role", value: "Particle morphology control" },
      { label: "Particle Outcome", value: "Spheroidal, prismatic, high-aspect" },
      { label: "Control Mode", value: "Rotor, airflow, classifier cut-point" },
      { label: "System Type", value: "Dynamic classifier loop" },
    ],
    imageFolder: "product_05_shaping-mill",
    imagePrefix: "product_05",
    galleryCount: 0,
  },
  {
    slug: "air-classifier",
    title: "Air Classifier",
    category: "Classification & Separation",
    series: "Precision Separator",
    summary: "Dry state classification based on differences in particle size and density.",
    principle:
      "LNPE air classifier separates powder exclusively by particle size and density. The high-speed rotation of the classifying wheel generates a strong centrifugal field, while the carrier airflow supplies an opposing drag force.",
    overview: [
      "Large or heavy particles experience a dominant centrifugal force, are flung outward beyond the wheel, and descend along the chamber wall to the coarse-product outlet.",
      "Small or light particles encounter a weaker centrifugal force; the drag of the airflow prevails, steering them through the wheel vanes into the fine-product stream.",
    ],
    features: [
      "Precision separation by particle size, density, and morphology",
      "CFD-optimised airflow, solids concentration, and pressure profile for each design",
      "High cut accuracy with classification efficiency of 70 - 93 %",
      "Multiple interchangeable classifier-wheel geometries for efficient handling of diverse powders",
    ],
    applications: ["Lithium-battery cathodes", "Anodes", "Separators", "Advanced powder materials"],
    technicalHighlights: [
      "Centrifugal and aerodynamic force balance",
      "Fine and coarse product streams",
      "Interchangeable classifier wheels",
      "Single-pass classification",
    ],
    tags: ["Dry classification", "70-93% efficiency", "Battery powders"],
    specs: [
      { label: "Process Role", value: "Particle classification" },
      { label: "Separation Basis", value: "Particle size and density" },
      { label: "Cut Accuracy", value: "70 - 93% efficiency" },
      { label: "System Type", value: "Airflow and classifying wheel" },
    ],
    imageFolder: "product_06_air-classifier",
    imagePrefix: "product_06",
    galleryCount: 4,
  },
  {
    slug: "laboratory-equipment",
    title: "Laboratory Equipment",
    category: "Laboratory Systems",
    series: "R&D Equipment",
    summary:
      "LNPE provides high-precision compact grinding equipment for laboratories, featuring easy cleaning and optional ceramic linings to reduce magnetic contamination.",
    principle:
      "LNPE supplies a full suite of high-performance laboratory systems purpose-built for powder-processing R&D. Each unit features a modular design that can be customised to meet precise experimental requirements.",
    overview: [
      "The line combines rapid, energy-efficient milling with tight particle-size control.",
      "Intuitive operation and low-maintenance construction keep long-term running costs to a minimum while maximising uptime.",
      "Widely adopted in research facilities across the United States, France, Russia, and other markets.",
    ],
    features: [
      "Custom-engineered lab mills deliver rapid, energy-efficient powder processing with tight size control.",
      "Modular, user-friendly design streamlines setup, operation, and maintenance for any R&D workflow.",
      "Proven worldwide - deployed in the U.S., France, Russia, and beyond for consistently reliable results.",
    ],
    applications: ["Powder-processing R&D", "Laboratory testing", "Small-batch experiments"],
    technicalHighlights: [
      "Compact grinding equipment",
      "Easy cleaning",
      "Optional ceramic linings",
      "Modular lab workflow",
    ],
    tags: ["R&D", "Compact systems", "Easy cleaning"],
    specs: [
      { label: "Process Role", value: "Laboratory powder processing" },
      { label: "Workflow Fit", value: "R&D and test batches" },
      { label: "Maintenance", value: "Easy cleaning" },
      { label: "System Type", value: "Modular compact equipment" },
    ],
    imageFolder: "product_07_laboratory-equipment",
    imagePrefix: "product_07",
    galleryCount: 4,
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCT_CATALOG.find((product) => product.slug === slug);
}

export function getProductListingImage(product: Product) {
  return `/images/04_products/${product.imageFolder}/${product.imagePrefix}_listing.webp`;
}

export function getProductCoverImage(product: Product) {
  return `/images/04_products/${product.imageFolder}/${product.imagePrefix}_cover.webp`;
}

export function getProductGalleryImages(product: Product) {
  return Array.from({ length: product.galleryCount }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `/images/04_products/${product.imageFolder}/${product.imagePrefix}_gallery_${number}.webp`;
  });
}
