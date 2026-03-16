import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChamferCard } from "@/components/ui/ChamferCard";
import Image from "next/image";
import Link from 'next/link';

const PROJECTS_DATA = [
  {
    title: "Shaping Mill Project",
    date: "8/1/2022",
    slug: "shaping-mill-project",
    desc: "Custom deployment of morphology control lines for advanced graphite anodes.",
    image: "/images/06_projects/project_01_shaping-mill-project/project_01_cover.png"
  },
  {
    title: "Jet Pulverizer Project",
    date: "5/1/2022",
    slug: "jet-pulverizer-project",
    desc: "High-yield powder processing line for specialized chemical applications.",
    image: "/images/06_projects/project_02_jet-pulverizer-project/project_02_cover.png"
  },
  {
    title: "EPC Project",
    date: "12/1/2021",
    slug: "epc-project",
    desc: "A massive turnkey engineering, procurement, and construction implementation.",
    image: "/images/06_projects/project_03_epc-project/project_03_cover.webp"
  },
  {
    title: "Lithium Iron Phosphate Specialized Classified Jet Mill",
    date: "11/1/2021",
    slug: "lithium-iron-phosphate-specialized-classified-jet-mill",
    desc: "Specialized jet milling for critical battery cathode materials.",
    image: "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_cover.png"
  },
  {
    title: "Air Classification Project",
    date: "7/1/2021",
    slug: "air-classification-project",
    desc: "Implementing a large-scale dry classification system for mineral processing.",
    image: "/images/06_projects/project_05_air-classification-project/project_05_cover.png"
  },
  {
    title: "Impact Mill Project",
    date: "10/1/2022",
    slug: "impact-mill-project",
    desc: "High-efficiency impact processing plant for robust material handling.",
    image: "/images/06_projects/project_06_impact-mill-project/project_06_cover.png"
  }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] relative bg-lnpe-bg">
      <Navbar />

      <div className="flex-1 pb-24">
        <section className="py-20 border-b border-lnpe-border bg-lnpe-bg/80 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6">
              Our Projects
            </h1>
            <p className="text-lnpe-text text-lg max-w-2xl leading-relaxed">
              Discover our latest equipment and projects—engineered for precision, performance, and industrial scale.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS_DATA.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="group h-full">
                  <ChamferCard variant="tl-br" className="flex flex-col h-full bg-lnpe-bg-light relative overflow-hidden">
                    {/* Background Image */}
                    {project.image && (
                      <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          fill 
                          className="object-cover mix-blend-lighten"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-lnpe-bg-light via-lnpe-bg-light/80 to-transparent" />
                      </div>
                    )}
                    
                    <div className="p-8 flex-1 flex flex-col relative z-10">
                      <div className="font-mono text-xs text-lnpe-kinetic mb-4 tracking-widest">
                        DEPLOYED // {project.date}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-wide group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-lnpe-text text-sm leading-relaxed mb-8">
                        {project.desc}
                      </p>
                    </div>
                    <div className="font-mono text-xs font-bold text-lnpe-bg bg-white self-start px-4 py-2 clip-chamfer uppercase tracking-wider group-hover:bg-lnpe-kinetic transition-colors">
                      View Deployment
                    </div>
                  </ChamferCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
