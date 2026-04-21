import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Define the static project data
const PROJECTS_DATA: Record<string, { title: string; date: string; image?: string }> = {
  "shaping-mill-project": { title: "Shaping Mill Project", date: "8/1/2022", image: "/images/06_projects/project_01_shaping-mill-project/project_01_cover.png" },
  "jet-pulverizer-project": { title: "Jet Pulverizer Project", date: "5/1/2022", image: "/images/06_projects/project_02_jet-pulverizer-project/project_02_cover.png" },
  "epc-project": { title: "EPC Project", date: "12/1/2021", image: "/images/06_projects/project_03_epc-project/project_03_cover.webp" },
  "lithium-iron-phosphate-specialized-classified-jet-mill": { title: "Lithium Iron Phosphate Specialized Classified Jet Mill", date: "11/1/2021", image: "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_cover.png" },
  "air-classification-project": { title: "Air Classification Project", date: "7/1/2021", image: "/images/06_projects/project_05_air-classification-project/project_05_cover.png" },
  "impact-mill-project": { title: "Impact Mill Project", date: "10/1/2022", image: "/images/06_projects/project_06_impact-mill-project/project_06_cover.png" }
};

export function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) notFound();

  return (
    <main className="min-h-screen flex flex-col pt-[88px] bg-lnpe-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
      <Navbar />

      <div className="flex-1 container mx-auto px-6 py-24 relative z-10 max-w-4xl">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-lnpe-text hover:text-white font-mono text-sm tracking-widest uppercase mb-12 transition-colors group"
        >
          <ArrowLeft size={16} className="transform transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>
        
        <div className="border border-lnpe-border bg-lnpe-surface backdrop-blur-md clip-chamfer p-8 md:p-16">
          <div className="font-mono text-lnpe-kinetic tracking-widest text-sm mb-6 border-l border-lnpe-kinetic pl-4">
            DEPLOYMENT LOG {'//'} {project.date} {'//'} {slug.toUpperCase()}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-12">
            {project.title}
          </h1>

          {project.image && (
            <div className="relative w-full aspect-[21/9] mb-12 border border-lnpe-border bg-lnpe-bg-light clip-chamfer overflow-hidden">
              <Image 
                src={project.image}
                alt={`${project.title} cover`}
                fill
                className="object-cover opacity-80 mix-blend-lighten"
              />
            </div>
          )}
          
          <div className="prose prose-invert prose-lg max-w-none text-lnpe-text leading-relaxed">
            <p>
              Detailed deployment metrics and operations log for {project.title} are restricted to authorized personnel. Please contact LNPE engineering for complete architectural blueprints and performance data.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
