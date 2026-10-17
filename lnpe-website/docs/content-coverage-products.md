# 产品与整线内容实施对应表

实施日期：2026-10-15。对应根目录《网站内容补充审阅_2026-10-15》03、04及06的产品、工艺与整线要求。

## 交付与呈现

- 保留7个产品母页、7张产品主卡、首页与原有主视觉。产品列表下增加默认折叠的低强调工艺目录。
- 7个母页概览后增加默认折叠的配置目录、系列/选型数据、术语和相关视频入口。表格在小屏可横向滚动。
- 新增 `/products/technologies` 及29个 `/products/technologies/[slug]` 详情；英文默认路由、中文 `/zh` 路由内容一致。
- 每个详情均有独立的说明、工作方式、3步工艺、2–6项配置说明、选型输入及试验/验收要点；配置正文默认折叠。专题使用小标题、正常可读的灰色正文，不新增一级导航。
- 数据文件 `src/content/product-technology.ts` 保留审阅ID和来源元数据。内部资料路径/标记不输出到网页，不发布PPT、内部图表或不匹配的试验报告。
- 产品页挂15个原站视频页面的外链（不是自动播放或媒体下载）；企业历史视频由资料页负责。所有链接标明原站外部页面。
- 选型入口使用 `/contact-us?equipment=...&service=selection`，母页和技术页均可带入设备/专题。

## 本地32项对应

| 审阅ID | 技术详情slug或位置 | 实施内容 |
|---|---|---|
| P01 | jet-mill-configurations | 喷嘴—对撞—分级—回料；低温、高温、低湿、接触件、空气/闭路区别 |
| P02 | inert-gas-jet-mill；inert-gas-classification | LNJST/LNCST、气体循环、气密进出料、监测/补气、应急过滤、PLC/DCS |
| P03 | energy-saving-jet-mill | 热压缩气体能量、矿物解理、干燥、热敏限制及能耗边界 |
| P04 | steam-jet-mill | 蒸汽粉碎分级与收集、余热接口、固废/矿物及耗汽/用电分开评价 |
| P05 | nano-steam-jet-mill | 亚微米试验、分散检测、实验/工业边界、相态与纯度验证 |
| P06 | impact-configurations | 锤头/齿圈/分级、纤维/黏性、冷却低湿、内衬及清洁 |
| P07 | impact-configurations；sulfur-pulverizer | 高温正压/LNS与LNIST硫磺保护气氛、监测、清洁、型号引用 |
| P08 | deagglomeration | 一次颗粒/团聚区别、造粒/碳化/石墨化物料、细粉控制、保护回路 |
| P09 | controlled-pulverization | 预分选—短停留碰撞—即时分选—粗料回流；LNJP旧称归并 |
| P10 | precision-classification | 密封、防旁路、二次风、分散、分级轮、磨耗维护 |
| P11 | precision-classification | O-Sepa与精细LNC的处理量/切割/压损取舍 |
| P12 | multi-stage-classification | 去粗/脱细、窄粒级、多出口及循环料质量平衡 |
| P13 | mechanical-shaping；continuous-shaping | 球形/片状/针状目标、石墨与焦类、连续与批次、形貌评价 |
| P14 | jet-shaping | 气流/机械整形区别，金刚石/SiC等硬质材料、细粉与磨耗 |
| P15 | laboratory-modules | 实验气流磨、LNJ-6A/18A、清洁、材质/保护气氛与放大 |
| P16 | laboratory-modules | 实验机械磨、陶瓷、处理效率、温升/积料/清洁 |
| P17 | laboratory-modules | 实验分级、密度/形貌作用、各出口粒度与质量 |
| P18 | laboratory-modules | 实验整形、强度/时间、振实/粒度/收率对照 |
| P19 | dosing-mes | 投储料、称量、配方执行、混合/输送与批次记录 |
| P20 | pneumatic-conveying | 正压密相、正负压稀相、氮气闭路及选择条件 |
| P21 | dosing-mes | PLC/DCS/MES职责、接口/信号/权限/历史存储、调试 |
| P22 | pneumatic-conveying | 加速室、气囊蝶阀、高压密封阀、陶瓷三通换向阀 |
| P23 | packaging | 上袋—接口密封—计量充填—封口—套膜—码垛、物料/袋材与精度口径 |
| P24 | moisture-removal | 水分种类、除湿/干燥、露点与粉体水分区别、回潮防护 |
| P25 | feeding-stations | 吨包/小包、搬运开袋、计量输送、集尘与吸湿材料 |
| P26 | battery-material-lines；graphite-production-line | LFP/LMFP/NCA/NCM/LCO/钠电/硅碳/石墨/锂盐的路线边界 |
| P27 | battery-material-lines；graphite-production-line | 重编LFP、NCA、石墨等已读流程节点为公开文字步骤；不公开内部原图 |
| P28 | dust-collection | 袋式、滤筒、烧结板、旋风、特殊气氛、车间净化/通风橱/手套箱 |
| P29 | dust-collection | 过滤材质、脉冲/诱导清灰、压差、氢氧化锂投料湿空气控制 |
| P30 | specialist-processes | 特殊结构名称的选型说明及磨料/稀土/医药食品/大豆/农药/焦/硅支线；不虚构专机参数 |
| P31 | powder-engineering | 超微粉体、大宗固废、输送工程及PCB分离的输入、过程评估与工程边界 |
| P32 | system-retrofits | 现状基线、诊断、接口、停机、施工联调、前后对比验收；无虚构改造案例 |

## 海外21家族对应

| 海外叶家族 | 覆盖slug |
|---|---|
| Jet Mill / Fluidized Bed | jet-mill-configurations |
| Inert Gas Jet Mill | inert-gas-jet-mill |
| Target Type Jet Mill | controlled-pulverization（LNJP与Jet Pulverizer归并） |
| Energy Saving Jet Mill | energy-saving-jet-mill |
| Lab Scale Jet Mill | laboratory-modules |
| Impact Mill System | impact-configurations |
| Precision Air Classifier | precision-classification |
| Multi Grade Air Classifier | multi-stage-classification |
| Inert Gas Air Classifier | inert-gas-classification |
| Jet Mill Shaper | jet-shaping |
| Impact Mill Shaper | mechanical-shaping |
| Continuous Shaping Mill | continuous-shaping |
| Nano Steam Jet Mill | nano-steam-jet-mill |
| Steam Kinetic Energy Mill | steam-jet-mill |
| Pneumatic Conveying | pneumatic-conveying |
| Bag Filter | dust-collection |
| Cartridge Filter | dust-collection |
| Cyclone Collector | dust-collection（不继承原站复用滤袋文案的效率） |
| Sulfur Pulverizer | sulfur-pulverizer |
| Graphite Production Line | graphite-production-line |
| Three-in-one Lab | three-in-one-laboratory |

附加的 `powder-terminology` 解释D值、切割、效率、收率、形貌、振实、比表面积、温度、纯度与能耗。所有母页可访问。

## 技术线索与证据边界

- T01–T03：控制性粉碎中的三元、玻璃微珠、金属硅工艺说明；未发布内部对比数字。
- T04：热气体能源利用与统一对比条件；未发布固定节能比例。
- T05–T12：蒸汽磨的粉煤灰、固硫灰、水渣/钢渣、脱硫石膏、石油焦、褐煤、拟薄水铝石、活性硅酸钙、亚微米矿物、重钙等试验目标与评价边界。
- T13：公开亚微米蒸汽试验方法；没有将P94石英报告和碳化硅正文拼成一项性能。
- T14：窄粒级分级、磨料及氧化铈去粗脱细；没有伪造产率。
- T15：石墨/焦类形貌、振实和质量平衡；未复用P136/P138矛盾样品数值。
- T16：LFP后处理步骤和完整验收字段；未把P187特定指标变成全部产线保证。
- T17：脉冲/诱导清灰方法及过滤维护；不发布内部视频。
- O-05：电池整线详情补需求、试验、方案、制造/FAT、运输、现场安装调试、培训及交付资料边界。服务页提供进一步内容。
- O-08：15条产品相关旧视频逐条挂外部原页，未宣称已逐帧复核或重新授权下载。
- O-09：不虚设产品样本下载；母页用选型输入/咨询入口，真实可下载文件由资料中心负责。

## 未以猜测填入的数据

内容层已补齐原理、用途、选择条件、流程和资料要求。以下原始证据缺口没有伪造成成品参数：

1. 各机型按物料的产量、粒度、耗气/耗汽、装机及系统能耗、尺寸。网页给出字段解释和需要提交的工况；需匹配有效型号表及试验后才可形成具体数值表。
2. 固定节能比例、氧浓度、除尘效率、通用收率、包装精度及无条件“纳米”保证。
3. 专机当前在售配置、PCB回收实测流程、现役接口协议、认证适用范围及商业时效承诺。
4. 内部PPT、未经许可的工程图/客户图、错配报告、未确认样品身份的SEM图。

母页原有不一致卖点已限定修正：去掉“无污染/近零污染”“70–93%固定效率”“毫秒固定停留”“24/7”“全部内部制造”“百余/数百项目”等缺少本次核准依据的表述，改成具体结构、控制目标或交付范围，未改变布局。

## 校验

- `npx tsc --noEmit --incremental false`：通过。
- `npx eslint src/content/product-technology.ts src/components/products/ProductTechnicalContent.tsx 'src/app/[locale]/products' src/i18n/messages/catalog.ts`：通过。
- 全站正式build、路由及浏览器核查由主任务统一执行，避免并发修改构建目录。
