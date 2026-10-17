import ContentDisclosure from "./ContentDisclosure";
import type { EditorialSection } from "@/content/company";
import DetailCard from "./DetailCard";

export default function EditorialSections({ sections }: { sections: EditorialSection[] }) {
  return <div className="border-t border-lnpe-border">{sections.map(section => (
    <ContentDisclosure key={section.id} id={section.id} title={section.title} intro={section.intro}>
      <div className="grid gap-4 md:grid-cols-2">
        {section.items.map(item => <DetailCard key={item.title} title={item.title}><p>{item.text}</p></DetailCard>)}
      </div>
    </ContentDisclosure>
  ))}</div>;
}
