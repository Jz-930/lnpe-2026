import type { Locale } from '../config';
import { productNames } from './product-names';

const en = {
  logoAlt: 'LNPE Logo',
  description: 'Focusing on Ultra-Fine Powder Grinding & Classification. Solving difficulties in the ultra-fine powder industry for customers globally.',
  copyright: '2025 LNPE, Inc. All rights reserved.',
  portal: 'Internal Portal',
  products: 'Products',
  jetMill: productNames.en['jet-mill'], impactMill: productNames.en['impact-mill'], jetPulverizer: productNames.en['jet-pulverizer'],
  turnkeyEpc: productNames.en['turnkey-epc'], shapingMill: productNames.en['shaping-mill'], airClassifier: productNames.en['air-classifier'], laboratory: 'Laboratory Equip.',
  company: 'Company', about: 'About Us', news: 'News', projects: 'Projects', contact: 'Contact Us', quote: 'Get a Quote',
};

const zh: typeof en = {
  logoAlt: 'LNPE 标志',
  description: '专注超细粉体粉碎与分级，为全球客户解决超细粉体行业难题。',
  copyright: '2025 LNPE, Inc. 保留所有权利。',
  portal: '内部入口',
  products: '产品',
  jetMill: productNames.zh['jet-mill'], impactMill: productNames.zh['impact-mill'], jetPulverizer: productNames.zh['jet-pulverizer'],
  turnkeyEpc: productNames.zh['turnkey-epc'], shapingMill: productNames.zh['shaping-mill'], airClassifier: productNames.zh['air-classifier'], laboratory: productNames.zh['laboratory-equipment'],
  company: '公司', about: '关于我们', news: '新闻', projects: '项目案例', contact: '联系我们', quote: '获取报价',
};

export const footerMessages: Record<Locale, typeof en> = { en, zh };
