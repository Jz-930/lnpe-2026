import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Beaker, Factory, GitBranch, Layers3 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type ApplicationCategory = {
  name: string;
  challenge: string;
  route: string;
  relatedEquipment: { label: string; href: string }[];
  items: string[];
  images: string[];
};

const APPLICATIONS: ApplicationCategory[] = [
  {
    name: "Battery Materials",
    challenge: "Control particle size, morphology, purity, and recirculation in cathode and anode powder processes.",
    route: "Jet milling / pulverizing -> classification -> shaping -> closed collection",
    relatedEquipment: [
      { label: "Jet Pulverizer", href: "/products/jet-pulverizer" },
      { label: "Shaping Mill", href: "/products/shaping-mill" },
      { label: "Air Classifier", href: "/products/air-classifier" },
    ],
    items: [
      "Artificial graphite",
      "Asphalt",
      "Boehmite",
      "Hard carbon",
      "Iron phosphate",
      "Layered oxide",
      "Lithium Iron Phosphate",
      "Lithium carbonate",
      "Lithium hydroxide",
      "Lithium manganese iron phosphate",
      "Lithium nickel cobalt aluminate",
      "Lithium nickel cobalt manganese oxide",
      "Natural graphite",
      "Porous carbon",
      "Silicon carbon (SiC)",
      "Silicon oxygen (SiOC)",
      "Sodium iron phosphate",
      "Sodium vanadium phosphate",
      "Special carbon",
    ],
    images: [
      "/images/05_applications/category_02_battery-materials/material_001_artificial-graphite.webp",
      "/images/05_applications/category_02_battery-materials/material_002_asphalt.jpg",
    ],
  },
  {
    name: "Chemicals",
    challenge: "Stabilize ultrafine grinding and classification across diverse chemical powder characteristics.",
    route: "Feed conditioning -> impact / jet grinding -> classification -> product collection",
    relatedEquipment: [
      { label: "Impact Mill", href: "/products/impact-mill" },
      { label: "Jet Mill", href: "/products/jet-mill" },
      { label: "Air Classifier", href: "/products/air-classifier" },
    ],
    items: [
      "Alumina",
      "Aluminum hydroxide",
      "Black carbon black",
      "Calcium phosphate",
      "Cellulose",
      "Foaming agent",
      "Low melting point glass powder",
      "Magnesium hydroxide",
      "Magnesium oxide",
      "Precipitated barium sulfate",
      "Silica gel",
      "Strontium carbonate",
      "White carbon black",
      "Yttrium oxide",
      "Zinc oxide",
    ],
    images: [
      "/images/05_applications/category_03_chemicals/material_001_alumina.png",
      "/images/05_applications/category_03_chemicals/material_002_aluminum-hydroxide.png",
    ],
  },
  {
    name: "Minerals",
    challenge: "Separate mineral powders by particle size and density while keeping processing routes energy-efficient.",
    route: "Crushing -> grinding -> air classification -> fine / coarse streams",
    relatedEquipment: [
      { label: "Air Classifier", href: "/products/air-classifier" },
      { label: "Impact Mill", href: "/products/impact-mill" },
      { label: "Turnkey EPC", href: "/products/turnkey-epc" },
    ],
    items: [
      "Andalusite",
      "Barite",
      "Bentonite",
      "Brucite",
      "Calcium oxide",
      "Diatomite",
      "Heavy calcium",
      "Kaolin",
      "Light calcium",
      "Mica",
      "Montmorillonite",
      "Pomegranate stone",
      "Potassium feldspar",
      "Quartz",
      "Talc",
      "Wollastonite",
    ],
    images: [
      "/images/05_applications/category_05_minerals/material_001_andalusite.png",
      "/images/05_applications/category_05_minerals/material_002_barite.png",
    ],
  },
  {
    name: "Pharma & Food",
    challenge: "Support compact, cleanable powder processing for sensitive food and pharmaceutical materials.",
    route: "Controlled feed -> low-temperature grinding -> classification -> clean collection",
    relatedEquipment: [
      { label: "Laboratory Equipment", href: "/products/laboratory-equipment" },
      { label: "Jet Mill", href: "/products/jet-mill" },
      { label: "Air Classifier", href: "/products/air-classifier" },
    ],
    items: [
      "Angelica",
      "Bee pollen",
      "Ciwujia",
      "Cordyceps sinensis",
      "Danshen",
      "Ganoderma powder",
      "Ganoderma spores",
      "Ginseng",
      "Green tea",
      "Konjac powder",
      "Lentinus edodes",
      "Pine pollen",
      "Sanqi",
      "Sheep placenta",
      "Tianqi",
      "Xiqingguo",
    ],
    images: [
      "/images/05_applications/category_07_pharma-and-food/material_001_angelica.png",
      "/images/05_applications/category_07_pharma-and-food/material_002_bee-pollen.png",
    ],
  },
  {
    name: "Abrasives",
    challenge: "Handle hard powders and polishing materials while maintaining precise size control.",
    route: "Hard-powder feed -> jet / impact milling -> classification -> finished powder",
    relatedEquipment: [
      { label: "Jet Mill", href: "/products/jet-mill" },
      { label: "Impact Mill", href: "/products/impact-mill" },
      { label: "Air Classifier", href: "/products/air-classifier" },
    ],
    items: [
      "Boron carbide",
      "Brown corundum",
      "Chromium carbide",
      "Chromium oxide",
      "Grinding wheel material",
      "Pink fused alumina",
      "Rare earth polishing materials",
      "Silicon carbide",
      "Silicon nitride",
      "Tungsten carbide",
      "White corundum",
      "Zircon sand",
      "Zirconia",
      "Diamond",
    ],
    images: [
      "/images/05_applications/category_01_abrasives/material_001_boron-carbide.png",
      "/images/05_applications/category_01_abrasives/material_002_brown-corundum.png",
    ],
  },
  {
    name: "Metals",
    challenge: "Process metal powders with controlled grinding and classification routes for stable powder outputs.",
    route: "Metal powder feed -> protected grinding -> classification -> fine stream",
    relatedEquipment: [
      { label: "Jet Mill", href: "/products/jet-mill" },
      { label: "Air Classifier", href: "/products/air-classifier" },
      { label: "Turnkey EPC", href: "/products/turnkey-epc" },
    ],
    items: [
      "Aluminum powder",
      "Cobalt powder",
      "Copper clad iron powder",
      "Copper lead powder",
      "Copper powder",
      "Copper tin powder",
      "Iron powder",
      "Lead tin alloy",
      "Molybdenum iron powder",
      "Nickel powder",
      "Niobium powder",
      "Silver powder",
      "Stainless steel powder",
      "Tantalum powder",
      "Tin powder",
      "Zinc powder",
    ],
    images: [
      "/images/05_applications/category_04_metals/material_001_aluminum-powder.png",
      "/images/05_applications/category_04_metals/material_002_cobalt-powder.png",
    ],
  },
  {
    name: "Solid Waste",
    challenge: "Convert industrial solid-waste streams into classified powders through robust grinding routes.",
    route: "Waste feed -> grinding -> air classification -> reusable powder streams",
    relatedEquipment: [
      { label: "Impact Mill", href: "/products/impact-mill" },
      { label: "Air Classifier", href: "/products/air-classifier" },
      { label: "Turnkey EPC", href: "/products/turnkey-epc" },
    ],
    items: [
      "Cement",
      "Cement additives",
      "Coal gangue",
      "Fly ash",
      "Furnace bottom slag",
      "Gypsum",
      "Lime",
      "Perlite",
      "Poor ore",
      "Quicklime",
      "Red mud",
      "Silicon ash",
      "Slug",
      "Steel slag",
      "Tailings",
      "Water slag",
    ],
    images: [
      "/images/05_applications/category_08_solid-waste/material_001_cement.png",
      "/images/05_applications/category_08_solid-waste/material_002_cement-additives.png",
    ],
  },
  {
    name: "Other",
    challenge: "Map varied specialty materials to practical grinding, classification, and collection paths.",
    route: "Material evaluation -> equipment selection -> process test -> production route",
    relatedEquipment: [
      { label: "Laboratory Equipment", href: "/products/laboratory-equipment" },
      { label: "Turnkey EPC", href: "/products/turnkey-epc" },
      { label: "Air Classifier", href: "/products/air-classifier" },
    ],
    items: [
      "Benzidine orange",
      "Cedar bark",
      "Chromium oxide green",
      "Clay",
      "Coal moss",
      "Cobalt blue",
      "Dyestuff",
      "Electronic waste",
      "Fluorescent pigment",
      "Fluorescent whitening agent",
      "Iron oxide red",
      "Lithopone",
      "Mica Titanium Pearllustia Pigments",
      "Phthalocyanine",
      "Recycled-plastic",
      "Silver vermilion",
      "Soap",
      "Toluidine Red",
      "Wax",
      "Wax substance",
      "Zinc oxide",
    ],
    images: [
      "/images/05_applications/category_06_other/material_001_benzidine-orange.png",
      "/images/05_applications/category_06_other/material_002_cedar-bark.png",
    ],
  },
];

const PROCESS_STEPS = [
  "Material Feed",
  "Grinding",
  "Classification",
  "Shaping",
  "Collection",
];

export default function ApplicationsPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
      <div className="absolute left-0 right-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" />
      <Navbar />

      <div className="flex-1">
        <section className="border-b border-[#dbe3ee] bg-[#eef3f8]">
          <div className="container mx-auto grid gap-10 px-6 py-14 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="min-w-0">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[#142033] md:text-6xl">
                Material Applications
              </h1>
              <p className="mt-6 max-w-3xl border-l-2 border-[#f26522] pl-5 text-base leading-7 text-[#536276] md:text-lg md:leading-8">
                Enhanced precision in grinding and classification processes enables the full realization of advanced materials&apos; industrial potential, paving the way for high-performance applications across diverse sectors.
              </p>
            </div>

            <div className="border border-[#dbe3ee] bg-white p-5 shadow-[0_22px_60px_rgba(15,23,42,0.1)]">
              <div className="mb-5 flex items-center justify-between border-b border-[#e5eaf2] pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f26522]">Route logic</p>
                  <h2 className="font-display text-2xl font-semibold text-[#142033]">Powder process map</h2>
                </div>
                <GitBranch className="text-[#174a7c]" size={24} />
              </div>
              <div className="grid gap-3 sm:grid-cols-5">
                {PROCESS_STEPS.map((step, index) => (
                  <div key={step} className="relative border border-[#dbe3ee] bg-[#f8fafc] p-4">
                    <div className="mb-5 flex h-9 w-9 items-center justify-center bg-[#142033] text-sm font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm font-semibold text-[#142033]">{step}</p>
                    {index < PROCESS_STEPS.length - 1 && (
                      <div className="absolute -right-3 top-1/2 hidden h-[2px] w-6 bg-[#f26522] sm:block" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container mx-auto grid gap-4 px-6 md:grid-cols-4">
            {[
              { icon: Factory, label: "8 industries" },
              { icon: Beaker, label: "133 material samples" },
              { icon: Layers3, label: "Grinding and classification routes" },
              { icon: GitBranch, label: "Equipment recommendation paths" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 border border-[#dbe3ee] bg-[#f8fafc] p-4">
                <item.icon size={20} className="text-[#174a7c]" />
                <span className="text-sm font-semibold text-[#314155]">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f6f8fb] py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">Industry solution entries</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#62748a]">
                  Each application group keeps the original material coverage visible while making the recommended process route easier to scan.
                </p>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] hover:text-[#f26522]">
                Match Equipment
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {APPLICATIONS.map((category) => (
                <article key={category.name} className="overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_14px_42px_rgba(15,23,42,0.06)]">
                  <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
                    <div className="grid grid-cols-2 border-b border-[#e5eaf2] bg-[#edf3f9] sm:block sm:border-b-0 sm:border-r">
                      {category.images.map((image, index) => (
                        <div key={image} className="relative aspect-square">
                          <Image
                            src={image}
                            alt={`${category.name} material sample ${index + 1}`}
                            fill
                            sizes="180px"
                            className="object-cover p-4"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="p-6">
                      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f26522]">
                            Application group
                          </p>
                          <h3 className="font-display text-2xl font-semibold text-[#142033]">{category.name}</h3>
                        </div>
                        <span className="w-fit border border-[#dbe3ee] bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#536276]">
                          {category.items.length} materials
                        </span>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7b8f]">Application problem</p>
                          <p className="mt-2 text-sm leading-6 text-[#536276]">{category.challenge}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7b8f]">Recommended process</p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-[#174a7c]">{category.route}</p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-[#e8edf4] pt-5">
                        {category.relatedEquipment.map((equipment) => (
                          <Link
                            key={equipment.href}
                            href={equipment.href}
                            className="inline-flex items-center gap-1 border border-[#dbe3ee] px-2.5 py-1.5 text-xs font-semibold text-[#142033] transition-colors hover:border-[#f26522] hover:text-[#f26522]"
                          >
                            {equipment.label}
                            <ArrowRight size={12} />
                          </Link>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <span key={item} className="bg-[#f6f8fb] px-2.5 py-1 text-xs text-[#5f6f84]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
