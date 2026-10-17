import { ArrowRight } from "lucide-react";
import Link from "@/components/i18n/LocalizedLink";
import DetailCard from "@/components/content/DetailCard";
import { getProductTechnologies, productTechnologyPath } from "@/content/product-technology";
import type { Locale } from "@/i18n/config";

type TechnologyEntry = ReturnType<typeof getProductTechnologies>[number];

/** Use the same published process copy for local previews and the full article. */
export default function TechnologyPreview({ entry, locale }: { entry: TechnologyEntry; locale: Locale }) {
  return <DetailCard title={entry.title} description={entry.summary}>
    <p>{entry.principle}</p>
    <div>
      <p className="font-semibold text-lnpe-dark">{locale === "zh" ? "选型需要哪些信息" : "Information needed for selection"}</p>
      <p className="mt-2">{entry.selection}</p>
    </div>
    <Link href={productTechnologyPath(entry.slug)} className="inline-flex items-center gap-2 font-medium text-lnpe-blue hover:underline">
      {locale === "zh" ? "阅读完整工艺说明" : "Read the full process notes"}<ArrowRight size={14} aria-hidden="true" />
    </Link>
  </DetailCard>;
}
