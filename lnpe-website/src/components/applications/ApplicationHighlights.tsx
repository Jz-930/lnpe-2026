import { Beaker, Factory, GitBranch, Layers3 } from 'lucide-react';
import { InlineMediaExplorer } from '@/components/content/InlineMediaExplorer';
import InlineFactList from '@/components/content/InlineFactList';
import MaterialDirectory from './MaterialDirectory';
import { applicationMessages, getApplications } from '@/i18n/messages/applications';
import { fieldScenes } from '@/content/field-scenes';
import { getProcessInsights } from '@/content/process-insights';
import { getMaterialPreviews } from '@/content/material-previews';
import { getEquipmentFacts } from '@/content/inline-previews';
import { materialEntries } from '@/content/materials';
import type { Locale } from '@/i18n/config';

export default function ApplicationHighlights({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const t = applicationMessages[locale];
  const groups = getApplications(locale);
  const previews = getMaterialPreviews(locale);
  const categories = groups.map((group) => ({ id: group.id, name: group.name }));
  const scene = (key: keyof typeof fieldScenes) => ({ image: fieldScenes[key].src, imageAlt: fieldScenes[key].alt[locale] });
  return <InlineMediaExplorer label={zh ? '探索材料与工艺' : 'Explore materials and processes'} layout="cards" autoPlay items={[
    {
      id: 'industries', title: t.stats[0], icon: <Factory size={22} />, ...scene('production'),
      description: zh ? '从电池材料、化工粉体到矿物、食品与医药，先了解应用目标，再选择合适的粉体处理方式。展开后可逐项查看各行业的加工难点与候选路线。' : 'From battery materials and chemicals to minerals, food and pharmaceuticals, start with the application target before selecting a powder process. Explore each group’s challenges and candidate routes below.',
      content: <InlineFactList label={zh ? '选择应用领域' : 'Choose an application group'} items={groups.map((group) => ({ id: group.id, title: group.name, description: group.challenge, details: [group.route, ...group.industryGuide.paragraphs], image: group.images[0], href: `#${group.id}` }))} />,
    },
    {
      id: 'materials', title: t.stats[1], icon: <Beaker size={22} />, ...scene('powder'),
      description: zh ? `${materialEntries.length} 个分类条目归并为 ${previews.length} 项材料说明。可直接在这里按中英文名称或别名搜索，了解材料特性、加工重点和试验前需要准备的信息。` : `${materialEntries.length} category entries share ${previews.length} material guides. Search names and aliases here to explore material properties, processing priorities and trial inputs.`,
      content: <MaterialDirectory locale={locale} items={previews} categories={categories} pageSize={12} />,
    },
    {
      id: 'processes', title: t.stats[2], icon: <Layers3 size={22} />, ...scene('classification'),
      description: zh ? '粉碎、解聚、分级与整形各自解决不同问题。路线需要围绕来料状态、目标粒度与形貌选择，各环节不必全部配置。点击具体工序查看作用与评价重点。' : 'Grinding, deagglomeration, classification and shaping solve different problems. Select operations for the feed, target size and morphology; a process does not necessarily need every stage.',
      content: <InlineFactList label={zh ? '选择工序' : 'Choose an operation'} items={getProcessInsights(locale)} />,
    },
    {
      id: 'equipment', title: t.stats[3], icon: <GitBranch size={22} />, ...scene('equipment'),
      description: zh ? '先确定需要的处理作用，再比较气流磨、机械磨、分级机、整形机与实验平台。这里可直接查看设备原理和特点，具体配置结合实际来料试验确认。' : 'Establish the required processing action, then compare jet mills, impact mills, classifiers, shaping systems and laboratory equipment. Preview principles and features here; confirm configurations through material trials.',
      content: <InlineFactList label={zh ? '选择设备' : 'Choose equipment'} items={getEquipmentFacts(locale)} />,
    },
  ]} />;
}
