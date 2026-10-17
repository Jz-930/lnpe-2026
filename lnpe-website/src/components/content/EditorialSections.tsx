import ContentDisclosure from "./ContentDisclosure";
import type { EditorialSection } from "@/content/company";

export default function EditorialSections({ sections }: { sections: EditorialSection[] }) {
  return <div className="border-t border-lnpe-border">{sections.map(section => (
    <ContentDisclosure key={section.id} id={section.id} title={section.title} intro={section.intro}>
      <dl className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        {section.items.map(item => <div key={item.title}>
          <dt className="mb-2 font-medium text-lnpe-dark">{item.title}</dt>
          <dd>{item.text}</dd>
        </div>)}
      </dl>
    </ContentDisclosure>
  ))}</div>;
}
