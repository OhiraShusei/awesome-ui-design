# 门户筛选与专题数据

编辑日期：2026-09-26。数据维护在 `src/portal-data.js`，原有 79 条收录记录及其 ID、来源不变。

## 标注口径

- 用途与技术栈来自 `src/resources.js`、`docs/resource-research.md`、`docs/x-resource-research.md` 中已核验的用途描述；本轮只把事实整理成明确标签，不根据资源名称猜测框架或许可。
- “不限技术栈”表示作为参考、素材或设计方法使用时不绑定具体前端框架，不表示该网站的源码技术栈，也不承诺每个框架都经过安装测试。技术栈列出相关适用范围，不保证收录了项目支持的全部框架。
- 免费只描述本门户收录的核心资源范围；提供独立免费组件和收费内容的站点标为“部分免费”。付费书籍或课程即便有试读，仍标为“付费”；Build UI 的 Recipes 是可独立使用的公开代码示例，因此标为“部分免费”。
- 费用与许可分开记录。公开可读、存在 GitHub 仓库或没有看到价格，不足以自动标为免费或可商用；没有充分证据时保留“待核实”。
- `checkedAt` 是所引用费用证据的核验日期，不代表本轮安装、实际操作或完整测试了产品。继承此前同日官网研究的记录在下表单独注明。
- 许可说明只摘出选型时有用的边界，不替代完整许可；没有一方许可证据的记录不增加许可字段。

## 本轮第一方核验

下列页面于 2026-09-26 读取公开正文或作者仓库原始文件，均返回成功；未登录、购买或安装第三方产品。

| 资源 | 第一方来源与核验事实 | 标注与边界 |
| --- | --- | --- |
| r30 · Lucide | [官方许可](https://lucide.dev/license)明确 ISC 允许任何目的、有偿或无偿使用、复制、修改和分发；列出的 Feather 继承图标使用 MIT。 | 免费；保留相应版权与许可声明，不笼统写成全库 MIT。 |
| r31 · React Bits | [作者 README](https://github.com/DavidHDev/react-bits)明确 “free, customizable animations”；[许可](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)为 MIT + Commons Clause。 | 免费；允许作为网站或产品的一部分使用，禁止出售、再许可或再分发组件本身，不标为无条件 MIT。 |
| r32 · Vue Bits | [作者 README](https://github.com/DavidHDev/vue-bits)明确 “all free for you to use”；[许可](https://github.com/DavidHDev/vue-bits/blob/main/LICENSE.md)为 MIT + Commons Clause。 | 免费；包含对组件包、模板、移植版再分发的限制。 |
| r35 · Google Fonts | [Google 官方字体仓库](https://github.com/google/fonts)提供可下载字体文件，明确允许按各自许可再分发和自托管；[许可说明](https://github.com/google/fonts#license)列出 OFL、Apache 2 与 Ubuntu Font License。 | 免费字体资源；逐字体核对许可及 Reserved Font Name 等修改限制，不把全部字体当成同一种许可。 |
| r75 · daisyUI | [官网](https://daisyui.com/)明确 “Free and open-source” 和 “Free Component library”；[作者许可](https://github.com/saadeghi/daisyui/blob/master/LICENSE)为 MIT。 | 免费范围为组件库；不包含站点另外销售的模板。需要 Tailwind CSS，组件样式不提供业务交互。 |
| r76 · Open Peeps | [官网](https://www.openpeeps.com/)明确 “Free for commercial and personal use under CC0 License”，允许复制、修改、分发及商业使用。 | 免费；CC0。 |
| r77 · SVG Backgrounds | [许可页](https://www.svgbackgrounds.com/license/)区分无偿 Free Graphics 与订阅 Premium Graphics，并要求未持有有效订阅的使用者署名。 | 部分免费；免费素材按要求署名，不得单独再分发；订阅到期后的新项目使用也受限制，详情链接完整许可。 |

Google Fonts 的旧 FAQ 入口本轮重定向到只返回应用壳的页面，因此以 Google 官方仓库正文为证据。Color Hunt 官网、About 与 Terms 可以访问，但本轮正文没有找到明确的免费或商用授权承诺，因此仍标“待核实”，没有加入免费专题。

## 沿用已有官网核验的费用记录

以下事实来自 `docs/x-resource-research.md` 的 2026-09-26 官网核验和相应资源的 `note`，本轮没有重新安装或完整操作产品；`priceSource` 仍直接指向第一方页面，不向前台展示发现来源。

| 资源 | 第一方来源 | 采用的费用事实 |
| --- | --- | --- |
| r67 · Refactoring UI | [官网](https://www.refactoringui.com/) | 付费书籍与套装，提供两章试读；标付费。 |
| r68 · Build UI | [Recipes](https://buildui.com/recipes) | 公开代码示例与付费完整课程并存；标部分免费。 |
| r69 · Animations on the Web | [官网](https://animations.dev/) | 付费课程、阶段性开放报名；现有记录注明核验时报名关闭。 |
| r70 · Devouring Details | [官网](https://devouringdetails.com/) | 付费互动手册、部分预览；标付费。 |
| r73 · Magic UI | [官网](https://magicui.design/) | 免费开源组件与收费 Pro 区块、模板并存；标部分免费。 |
| r74 · Aceternity UI | [官网](https://ui.aceternity.com/) | 可复制组件与收费模板、All-Access 并存；标部分免费，不承诺具体组件的许可。 |
| r78 · UI-Layouts | [官网](https://ui-layouts.com/) | 现有核验记录区分免费内容与 Pro 页面区块；标部分免费。 |

其余 65 项费用仍为“待核实”，不使用推断值填满目录。所有免费专题条目都有上述证据；Magic UI 与 SVG Backgrounds 在专题选择理由中明确只推荐免费部分。

## 关联资源与专题

同类替代是按同一任务编选的其他入口，不代表价格、技术栈或功能完全相同；配套资源表示常见的下一步或同一作者的配套能力。它们是编辑建议，不是官方合作关系、安装依赖或自动计算的相似度。

具体选择依据包括：灵感画廊搭配页面设计 Skill；落地页参考搭配 React 营销组件；动效案例搭配 Emil / GSAP Skills；StyleKit、Impeccable、Design Prompts、UI-Layouts 与已有记录中的同作者配套能力互相连接；图标搭配产品界面组件；字体搭配配色与排版学习。没有合适替代的资源保留空数组。

三个专题分别覆盖免费设计起步、React 动效选型、设计 Skills 工作步骤。每项选择理由只描述可支持的任务与已知限制，合集中的资源无需全部使用，也不代表安装或付费推荐。
