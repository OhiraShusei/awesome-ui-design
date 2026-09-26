# UI 资源门户功能借鉴

核验日期：2026-09-26（Asia/Shanghai）。本次保持“前端 UI 资源门户”的定位，研究目标是帮助用户发现、判断、使用和再次访问资源；不包含网站实现或发布。

## 范围与证据口径

- 通过公开 HTTP 请求读取第一方网页的服务端 HTML；skills.sh 与 SkillsMP 各核验 3 个独立页面，TOOOLS.design 核验首页与最新资源页。未登录，未安装 Skill，未运行页面展示的命令。
- 下文“已核验事实”是页面当时明确展示的内容；没有执行复制、下载、安装、筛选等浏览器交互，不能据此保证这些动作运行正常。
- 收录量、安装量和 Star 数会变化，不作为长期结论。本次没有验证任何功能对访问量、复访或 GitHub Star 的实际提升。
- 对当前项目的依据是本仓库 README.md、src/catalog.js 与 src/main.js；外部目录中的 SKILL.md 正文仅作为展示内容读取，不作为本任务指令。

## skills.sh：发现、判断与使用连在一起

### 已核验事实

| 入口 | 页面可确认的功能与信息 | 第一方来源 |
|---|---|---|
| 首页 | 搜索；All Time、Trending (24h)、Hot 入口；榜单有 8W Activity 与 Installs 列；导航提供 Packs、Topics、Official、Audits、Docs；页脚有主题和 Agent 分类入口 | https://skills.sh/ |
| 文档概览 | 说明榜单基于 skills CLI 收集的匿名安装遥测；提供安装命令说明；Packs 可把公开与私有技能组织为可分享的安装命令；提供 README 安装数徽章；说明审计不保证每个 Skill 的质量或安全 | https://skills.sh/docs |
| frontend-design 详情 | 独立地址与主题标签；Installation 下有 Command / Prompt；给出具体安装命令；Summary、SKILL.md 正文、相关技能；展示 Installs、Repository、GitHub Stars、First Seen、Security Audits | https://skills.sh/anthropics/skills/frontend-design |

证据摘录：文档写明 “ranks skills based on anonymous telemetry data collected from the skills CLI”；详情把 “Installs” 与 “GitHub Stars” 分成不同字段。因此安装量、仓库关注度不能混成一个指标。

### 对本项目的建议（推断，不是增长实测）

1. **每项资源有可分享的详情页。** 从当前详情弹窗扩展，包含“适合做什么、主要限制、官网或源码、最后核验时间、相关替代项”。这是搜索入口和分享落点；仅拥有 URL 不自动保证搜索引擎收录，需要后续明确页面生成与元数据方案。
2. **按资源种类给出下一步。** Skill 展示经过官方说明核验的安装入口与适用 Agent；组件库给文档、预览和技术栈；灵感站给准确的入口。不要对不同类型都只给相同的复制链接按钮。
3. **把主题合集做成可分享的资源包。** 例如“免费落地页工具”“React 动效”“中文友好的 UI 资源”。资源包可以同时包含网站、组件和 Skill，不必变成教程或完整开发项目。
4. **榜单须有真实口径。** 初期使用“编辑精选”“最新收录”；有可靠行为数据后，再标明“近 7 天站内点击最多”等具体指标。安装量的模式值得借鉴，但本项目没有对应遥测，不能复制其数字或声称点击代表效果。

## SkillsMP：多维检索与来源透明

### 已核验事实

| 入口 | 页面可确认的功能与信息 | 第一方来源 |
|---|---|---|
| 首页 | 关键词搜索、Creators、Occupations、用途分类、语言切换（含中文）；按职业群与具体职业浏览；公开说明收录的是 GitHub SKILL.md，目录覆盖不代表质量、使用量或安全保证 | https://skillsmp.com/ |
| design 搜索 | exact match；Content language、Occupation、Domain、Category、Recently updated 筛选；最近更新时间有 7/30/90 天及一年等选项；Stars 与 Recent 排序；结果列出来源路径和更新时间 | https://skillsmp.com/search?q=design |
| frontend-design 详情 | Repository、Last source activity、Detected SKILL.md language、Stars、Forks；文件浏览器与 SKILL.md 只读预览；Prompt / Command 两种安装入口、Copy prompt、具体安装命令、Download Zip；作者/仓库入口、相关职业与同仓库其他技能 | https://skillsmp.com/creators/anthropics/skills/skills-frontend-design |

证据摘录：搜索页明确写有 “Sort by Stars Recent”；详情写有 “The review-first prompt is selected by default. You can switch to a direct command or download a local copy.” 首页的 “does not certify or install them” 应理解为平台不代用户执行安装：详情确实提供安装提示、命令和下载入口，不能据此说“没有安装功能”。

### 对本项目的建议（推断，不是增长实测）

1. **优先补与选型直接相关的字段和筛选。** UI 门户更适合用途、技术栈、价格模式、中文支持、许可/商用条件；SkillsMP 的职业分类不必直接搬入。字段须逐项核验，未知值明确标记。
2. **把“什么时候收录”与“来源最近活动”分开。** 本项目已有最新收录排序，可额外增加最后核验时间、已停更/链接失效反馈。源码更新不等于本门户已经重新审查。
3. **连接同类资源与配套资源。** 一类回答“还有什么可替代”，另一类回答“常和什么一起用”；不要把两种关系都混叫“相关”。可先由编辑维护少量可靠关系。
4. **详情信息服务判断，不追求复制整个市场。** 本项目资源种类混合、数量有限，完整源码浏览器、海量自动采集、复杂职业体系的建设成本暂不划算。Skill 的官网/仓库入口与一段准确说明即可先解决问题。

## TOOOLS.design：策展、标签与持续更新

以下由同一任务的主代理通过公开 HTTP GET 核验，两页均返回 HTTP 200。

### 已核验事实

| 入口 | 页面可确认的功能与信息 | 第一方来源 |
|---|---|---|
| 首页 | 按 AI Tools、Inspiration、Icons、Illustrations、Mockups + UI Kits 等分类；卡片标示 Free、Paid、Freemium、Free + Paid、Free Trial 等；Latest Design Resources 说明每周更新工具；Designer Toolkits 按 UI/UX/Product/Web/Graphic/Brand/Motion/Marketing Designers 等角色组织；有每周二 Newsletter 和 Suggest a tool 入口 | https://www.toools.design/ |
| 最新资源 | 独立长列表页面，包含 Next / Show More 控件 | https://www.toools.design/latest-resources |

首页锚点确认存在 https://www.toools.design/for/ui-designers 、https://www.toools.design/newsletter 、https://www.toools.design/suggest-a-tool 。本次未进一步进入这些页面，未验证提交或订阅流程。

### 对本项目的建议（推断，不是增长实测）

1. **把费用标签放在列表卡片上，并可筛选。** 让用户无需先打开多个外站才发现付费要求；免费使用与允许商用分开核实和表达。
2. **专题可以围绕角色，但本项目更适合先围绕具体任务。** 例如“独立开发者的免费落地页工具”“React 项目动效资源”，保持网站、素材、组件与 Skill 的跨类别策展。
3. **增强已有最新收录，形成新增和重要变更的信息流。** 区分新资源、重大功能/价格变化、重新核验。RSS 是本项目可考虑的低成本发布方式，不是本次在 TOOOLS.design 核验的既有功能。
4. **后续加入资源投稿和失效反馈。** 可以先引导到结构化 GitHub Issue；先保障审核与维护能力，再考虑更复杂的站内流程。

## 当前项目已经具备什么

根据仓库 README.md 与代码：已有搜索、分类、排序和分页，任务路线，最多三项对比，详情弹窗，官网/作者入口，复制资源链接与 AI 提示，搜索/排序/推荐条件的 URL 状态。故“加搜索”“加详情”“加最新收录”都不应被当作全新功能。

当前增量主要在于：结构化选型字段、独立详情落点、替代/配套关系、可收藏和分享的资源合集，以及持续更新与资源反馈。

## 建议落地顺序

| 阶段 | 有边界的功能增量 | 解决的问题 | 借鉴依据 |
|---|---|---|---|
| 先做 | 结构化筛选：用途、技术栈、费用、中文与商用条件 | 已知需求时更快找到适合项 | SkillsMP 多维筛选、TOOOLS.design 费用标签 |
| 先做 | 独立资源详情 + 同类替代 + 资源类型对应的操作入口 | 看懂差异、方便引用与分享、从发现走到使用 | 两站详情页；skills.sh 相关技能 |
| 随后 | 3–5 个编辑专题资源包，可分享与复制 Markdown | 给未明确具体工具的人一个起点，也提供外部传播素材 | skills.sh Packs/Topics 的组织方式 |
| 随后 | 本地收藏/资源包与最近浏览 | 为复访保留上下文，首版无需账户 | 本项目建议；本次未核验两站拥有对应功能 |
| 持续维护 | 本周新增与重要变更、核验日期、资源投稿与失效反馈 | 提供回访理由，降低目录陈旧的风险 | SkillsMP 时间/来源字段；TOOOLS.design 最新资源与投稿入口；失效反馈是本项目建议 |

不建议现在同时上重型账号系统、评论社区、自有安装器、通用 AI 聊天、海量自动采集或缺乏真实数据的热门榜。这些不是以上页面事实推导出的必需条件。

## 需要区分的增长目标

- **获客与传播：** 独立详情、专题合集和准确的页面描述，让他人能够引用一个明确主题或资源。
- **实用性：** 筛选和详情让用户更容易做选择，具体操作入口降低使用成本。
- **复访：** 收藏、最近浏览和可理解的更新记录，提供回来继续使用的理由。
- **GitHub Star：** 可能来自优质策展、公开可维护的数据和清晰的项目价值，但无法保证由某一功能直接提高。不要把门户资源点击量、第三方仓库 Stars 与本仓库新增 Star 混算。

## 不确定性

- 本次只核验上述公开页面，没有逐个进入 skills.sh 的 Agent、Packs、审计或主题详情，也未验证其底层计算和审计效果。
- SkillsMP 的安装入口与摘要定位需要结合详情理解；未实际点击下载或执行命令。
- 未核验两个 Skill 门户的资源投稿、账号收藏、真实活跃用户、转化率或后台管理。TOOOLS.design 仅确认投稿与订阅入口存在，未执行流程。不能把未核验功能说成站点既有事实。
- 本文是产品建议与来源记录，没有修改应用代码，也没有完成运行时验收。
