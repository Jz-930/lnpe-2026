import type { Locale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import ReferencePage from "@/components/content/ReferencePage";
import Link from "@/components/i18n/LocalizedLink";

const copy = {
  zh: { title: "网站与联系信息说明", description: "了解咨询需求的整理、邮件联系与资料使用方式。" },
  en: { title: "Website & contact information", description: "How enquiry preparation, email contact and reference information work on this website." },
};
type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) { return createPageMetadata((await params).locale, "/privacy", copy); }
export default async function InformationPage({ params }: Props) {
  const { locale } = await params; const zh = locale === "zh";
  const paragraphs = zh ? [
    ["咨询需求", "联系页将您填写的信息整理成需求文本。点击“整理咨询需求”不会向公司提交信息；您可以复制文本或打开邮件草稿，确认收件人和内容后自行发送。"],
    ["邮件与资料", "邮件发送后由您选择的联系窗口接收。涉及样品、工艺机密或客户资料时，可先说明合作需求，与接收方约定资料范围和保密安排。"],
    ["浏览与参考", "站内材料、设备与历史内容用于技术交流。选型、性能、供货、服务与交付范围按具体项目条件确认；历史新闻与视频保留其对应时期的语境。"],
    ["外部网站", "公开视频链接会打开外部网站，其播放、访问与信息处理方式由该网站提供。"],
    ["信息咨询", "如需核对或更正已发出的咨询资料，请联系原收件窗口，并说明相关项目或邮件主题。"],
  ] : [
    ["Enquiry preparation", "The contact page formats the information you enter into a brief. Preparing a brief does not submit it to the company. Copy the text or open an email draft, then review the recipient and contents before sending it yourself."],
    ["Email and documents", "Sent email is received by your selected contact office. For samples, confidential process information or customer records, first describe the collaboration and agree the scope of information and confidentiality arrangements with the recipient."],
    ["Reference information", "Material, equipment and historical content supports technical discussion. Selection, performance, supply, services and delivery depend on the project conditions. Historical news and videos retain the context of their original period."],
    ["External websites", "Public video links open an external website. Playback, access and information handling are provided by that website."],
    ["Information enquiries", "To check or correct information already sent, contact the original recipient and identify the project or email subject."],
  ];
  return <ReferencePage title={copy[locale].title} intro={copy[locale].description} eyebrow="LNPE" back={{ href: "/contact-us", label: zh ? "联系流能" : "Contact LNPE" }}>
    <div className="max-w-3xl space-y-8 text-sm leading-7 text-lnpe-muted">{paragraphs.map(([title, body]) => <section key={title}><h2 className="mb-3 text-base font-medium text-lnpe-dark">{title}</h2><p>{body}</p></section>)}<Link href="/contact-us" className="inline-block text-lnpe-blue">{zh ? "查看联系窗口 →" : "View contact offices →"}</Link></div>
  </ReferencePage>;
}
