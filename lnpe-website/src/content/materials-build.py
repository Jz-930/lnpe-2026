"""Rebuild the public material records from edited bilingual copy and local source locators."""
import json, re
from pathlib import Path
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
source = json.loads((ROOT / '网站内容补充审阅_2026-10-15/evidence_local/现站133物料补齐矩阵.json').read_text(encoding='utf-8-sig'))
category_ids = {'电池材料':'battery-materials','化工':'chemicals','矿物':'minerals','医药与食品':'pharma-food','磨料':'abrasives','金属':'metals','固体废弃物':'solid-waste','其他':'other'}
corrections = {
2:('沥青（碳材料用）','Pitch / asphalt','pitch'),11:('镍钴铝酸锂（NCA）','Lithium nickel cobalt aluminium oxide (NCA)','nca'),12:('镍钴锰酸锂（NCM）','Lithium nickel cobalt manganese oxide (NCM)','ncm'),
15:('硅碳复合（Si/C）','Silicon–carbon composite (Si/C)','silicon-carbon-composite'),16:('硅氧碳复合（SiO/C）','Silicon-oxide/carbon composite (SiO/C)','silicon-oxide-carbon-composite'),22:('炭黑','Carbon black','carbon-black'),41:('重质碳酸钙（GCC）','Ground calcium carbonate (GCC)','ground-calcium-carbonate'),43:('轻质碳酸钙（PCC）','Precipitated calcium carbonate (PCC)','precipitated-calcium-carbonate'),46:('石榴石','Garnet','garnet'),53:('刺五加','Eleuthero (Ciwujia)','eleuthero'),61:('香菇','Shiitake mushroom','shiitake'),63:('三七（田七）','Sanqi / Tianqi (Panax notoginseng)','sanqi'),109:('矿渣 / 炉渣','Slag','slag'),125:('云母钛珠光颜料','Mica–titania pearlescent pigment','mica-titania-pearlescent-pigment'),128:('银朱（成分需明确）','Vermilion (composition-specific)','vermilion')}
extras = '''134|chemicals|阻燃剂|Flame retardants|flame-retardants|local:364–366
135|chemicals|氧化钕|Neodymium oxide|neodymium-oxide|local:492–494
136|abrasives|天然彩砂|Natural coloured sand|natural-coloured-sand|local:498–500
137|battery-materials|生焦|Green coke|green-coke|impact-mill-shaper/59354914.html
138|battery-materials|石油焦|Petroleum coke|petroleum-coke|classifying-impact-mill/59806464.html
139|battery-materials|煅后焦|Calcined coke|calcined-coke|impact-mill-shaper/59355075.html
140|battery-materials|金属硅|Silicon metal|silicon-metal|target-type-jet-mill/59331747.html
141|battery-materials|氧化亚硅（SiO）|Silicon monoxide (SiO)|silicon-monoxide|energy-saving-jet-mill/59545038.html
142|battery-materials|钛酸锂（LTO）|Lithium titanate (LTO)|lithium-titanate|lab-scale-jet-mill/59396036.html
143|chemicals|硫磺|Sulfur|sulfur|sulfur-pulverizer/59373113.html
144|chemicals|高吸水性树脂（SAP）|Superabsorbent polymer (SAP)|superabsorbent-polymer|classifying-impact-mill/59360559.html
145|chemicals|聚丙烯酰胺（PAM）|Polyacrylamide (PAM)|polyacrylamide|classifying-impact-mill/59360559.html
146|chemicals|尿素|Urea|urea|classifying-impact-mill/59360559.html
147|chemicals|聚苯硫醚（PPS）|Polyphenylene sulfide (PPS)|polyphenylene-sulfide|classifying-impact-mill/59390852.html
148|chemicals|树脂粉|Resin powders|resin-powders|lab-scale-jet-mill/59396159.html
149|chemicals|气凝胶|Aerogel|aerogel|lab-scale-jet-mill/59396238.html
150|other|活性炭|Activated carbon|activated-carbon|fluidized-bed-jet-mill/59353960.html
151|other|石墨烯相关粉体|Graphene-related powders|graphene|fluidized-bed-jet-mill/59539640.html
152|metals|锰粉|Manganese powder|manganese-powder|lab-scale-jet-mill/59395649.html
153|metals|钕铁硼|Neodymium–iron–boron|ndfeb|lab-scale-jet-mill/59396079.html
154|metals|铬铁及合金粉|Ferrochrome and alloy powders|ferrochrome-alloy-powders|precision-air-classifier/59378761.html
155|metals|羰基铁粉|Carbonyl iron powder|carbonyl-iron-powder|precision-air-classifier/59378761.html
156|minerals|铝土矿|Bauxite|bauxite|lab-scale-jet-mill/59395606.html
157|minerals|方解石|Calcite|calcite|classifying-impact-mill/59806819.html
158|minerals|石灰石|Limestone|limestone|classifying-impact-mill/59806819.html
159|chemicals|氧化钨|Tungsten oxide|tungsten-oxide|fluidized-bed-jet-mill/60035021.html
160|pharma-food|燕麦与谷物|Oats and cereals|oats-cereals|classifying-impact-mill/59331961.html
161|pharma-food|蛋白粉|Protein powders|protein-powders|classifying-impact-mill/59332209.html
162|pharma-food|营养粉|Nutritional powders|nutritional-powders|classifying-impact-mill/59359225.html
163|pharma-food|代餐粉|Meal-replacement powders|meal-replacement-powders|classifying-impact-mill/59359225.html
164|pharma-food|玛咖|Maca|maca|fluidized-bed-jet-mill/59359329.html
165|pharma-food|原料药（API）|Active pharmaceutical ingredients (API)|active-pharmaceutical-ingredients|fluidized-bed-jet-mill/59911914.html
166|other|化妆品原料|Cosmetic ingredients|cosmetic-ingredients|fluidized-bed-jet-mill/59549516.html
167|other|碳粉 / 墨粉|Toner|toner|lab-scale-jet-mill/59396812.html
168|other|无机颜料|Inorganic pigments|inorganic-pigments|lab-scale-jet-mill/59395906.html
169|chemicals|可湿性粉剂等农化配方|Agrochemical powder formulations|agrochemical-powders|three-in-one-laboratory-grinding-classifier/63376816.html'''
extra = {int(r.split('|')[0]): r.split('|')[1:] for r in extras.splitlines()}
copy = {}
for line in (HERE/'materials-copy.tsv').read_text(encoding='utf-8-sig').splitlines():
    cells=line.split('|')
    assert len(cells)==6, (cells[0], len(cells))
    index, zh, en, zhf, enf, profile = cells
    copy[int(index)] = {'summary':{'zh':zh,'en':en},'focus':{'zh':zhf,'en':enf},'profile':profile}
records=[]; entries=[]; by_id={}
for i in range(1,170):
    if i<=133:
        s=source[i-1]
        cat=category_ids[s['category']]
        zh,en=s['material'],s['english']
        slug=re.sub(r'[^a-z0-9]+','-',en.lower()).strip('-')
        zh,en,slug=corrections.get(i,(zh,en,slug))
        source_ref={'kind':'local-copy','document':'LNPE-应用领域.docx','locator':s['source_locator'],'basis':'Material identity and uses; process explanation is conditional editorial guidance, not test results.'}
        images=[a['publicPath'] for a in s['local_assets'] if a.get('exists')]
        aliases=list(dict.fromkeys([s['material'],s['english'],s['source_name'],zh,en]))
    else:
        cat,zh,en,slug,ref=extra[i]
        source_ref={'kind':'local-copy','document':'LNPE-应用领域.docx','locator':ref[6:]} if ref.startswith('local:') else {'kind':'legacy-overseas','url':'https://www.lnpepowder.com/'+ref,'basis':'Material/application listing; does not establish a validated material-specific process.'}
        images=[]; aliases=[zh,en]
    # Incorrect legacy formulas, mistranslations and uncertain source matches are
    # retained only in provenance, never used as public search aliases.
    invalid_aliases = {
        11: ['Lithium nickel cobalt aluminate'],
        15: ['硅碳（SiC）', 'Silicon carbon (SiC)'],
        16: ['硅氧（SiOC）', 'Silicon oxygen (SiOC)'],
        46: ['Pomegranate stone'], 109: ['Slug'],
        114: ['杉树皮'], 125: ['Mica Titanium Pearllustia Pigments'],
        127: ['垃圾'], 128: ['Silver vermilion'],
    }.get(i, [])
    removed = [alias for alias in aliases if alias in invalid_aliases]
    aliases = [alias for alias in aliases if alias not in invalid_aliases]
    if removed:
        source_ref['originalLabels'] = removed
    short_names = {
        3: ['AlOOH'], 7: ['LFP', 'LiFePO4'], 10: ['LMFP'],
        11: ['NCA'], 12: ['NCM', 'NMC'], 15: ['Si/C'], 16: ['SiO/C'],
        17: ['NaFePO4'], 18: ['NVP', 'Na3V2(PO4)3'],
        20: ['Al2O3'], 21: ['ATH', 'Al(OH)3'], 27: ['MDH', 'Mg(OH)2'],
        28: ['MgO'], 34: ['ZnO'], 39: ['CaO'], 41: ['GCC'], 43: ['PCC'],
        63: ['Panax notoginseng'], 67: ['B4C'], 74: ['SiC'], 75: ['Si3N4'],
        76: ['WC'], 79: ['ZrO2'], 140: ['Si'], 141: ['SiO'], 142: ['LTO'],
        144: ['SAP'], 145: ['PAM'], 147: ['PPS'], 153: ['NdFeB'], 165: ['API'],
    }.get(i, [])
    aliases = list(dict.fromkeys(aliases + short_names))
    if i in [65,133]:
        target=by_id[{65:63,133:34}[i]]
        target['sources'].append(source_ref)
        target['entryIds'].append(i)
        target['aliases']=list(dict.fromkeys(target['aliases']+aliases))
        target['images']=list(dict.fromkeys(target['images']+images))
        target['categoryIds']=list(dict.fromkeys(target['categoryIds']+[cat]))
        slug=target['slug']
    else:
        r={'slug':slug,'name':{'zh':zh,'en':en},'categoryIds':[cat],'entryIds':[i],'aliases':aliases,'images':images,**copy[i],'sources':[source_ref]}
        records.append(r);by_id[i]=r
    entries.append({'id':i,'categoryId':cat,'slug':slug,'name':{'zh':zh,'en':en},'legacy':i<=133})
# Retain the alias in the category, while the detail has one canonical name.
entries[64]['name']={'zh':'田七（三七别名）','en':'Tianqi (Sanqi alias)'}
by_id[11]['sources'].append({'kind':'terminology-reference','url':'https://publications.anl.gov/anlpubs/2023/08/183571.pdf'})
by_id[15]['sources'].append({'kind':'terminology-reference','url':'https://www.energy.gov/sites/default/files/2015/04/f21/2014%20U.S.%20DRIVE%20Accomplishments%20Report.pdf'})
by_id[18]['sources'].append({'kind':'terminology-reference','url':'https://www.ornl.gov/publication/sodium-rich-vanadium-oxy-fluorophosphate-na32ni02v18po42f2o-advanced-cathode-sodium-ion'})
assert len(entries)==169 and len(records)==167
assert len({r['slug'] for r in records})==len(records)
(HERE/'materials-data.json').write_text(json.dumps({'entries':entries,'records':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(HERE/'materials-search-index.json').write_text(json.dumps([{k:r[k] for k in ['slug','name','aliases','summary','categoryIds']} for r in records],ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'{len(entries)} category entries, {len(records)} canonical materials, {sum(bool(r["images"]) for r in records)} illustrated records')
