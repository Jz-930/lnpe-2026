import type { Locale } from "@/i18n/config";
import type { EditorialSection } from "@/content/company";
import { fieldScenes } from "@/content/field-scenes";
import { InlineMediaExplorer } from "./InlineMediaExplorer";

export default function EditorialExplorer({ sections, scenes, locale, label }: {
  sections: EditorialSection[];
  scenes: (keyof typeof fieldScenes)[];
  locale: Locale;
  label: string;
}) {
  return <div className="mb-10">
    <InlineMediaExplorer layout="cards" label={label} items={sections.map((section, index) => {
      const scene = fieldScenes[scenes[index % scenes.length]];
      return {
        id: section.id,
        title: section.title,
        description: section.intro,
        image: scene.src,
        imageAlt: scene.alt[locale],
        content: <div className="space-y-5">
          <p className="text-xs leading-6 text-lnpe-steel">{locale === "zh" ? "场景示意图" : "Illustrative scene"} · {scene.caption[locale]}</p>
          <dl className="grid gap-6 md:grid-cols-2">{section.items.map((item) => <div key={item.title}><dt className="font-semibold text-lnpe-dark">{item.title}</dt><dd className="mt-2 text-sm leading-7 text-lnpe-muted">{item.text}</dd></div>)}</dl>
        </div>,
      };
    })} />
    <p className="mt-3 text-xs text-lnpe-steel">{locale === "zh" ? "场景示意图用于说明工作环节。" : "Illustrative scenes explain the working stages."}</p>
  </div>;
}
