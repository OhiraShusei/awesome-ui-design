# X / Twitter 设计资源补充

核验日期：2026-09-26。收录用途与限制以当前官网为准，推文用于说明推荐出处，不沿用旧帖价格，也不代表本站实测或排名。

本轮新增 13 项：设计灵感 3 项、设计工具 4 项、素材组件 6 项，总目录由 66 项增加至 79 项。

## 核验方法

- 从设计开发者的公开 X 主页、原帖及回复，以及产品官网链接的推荐推文发现资源。
- 读取具体 `status` 原帖或 X 官方 `publish.twitter.com/oembed` 正文；官网独立核对用途、收费方式和使用边界。
- Google、DuckDuckGo 的公开搜索遇到验证码；Bing 的结果相关性不足，未将其摘要作为收录证据。部分资料通过公开 FxTwitter 镜像交叉核对，但下表均有原帖或官方嵌入接口证据。
- 推荐包含历史帖子和本月作者发布；不宣称是最新排行榜或全量检索。原帖链接留在资源 `sources`，前台继续只显示资源与官方入口。

## 设计方法、交互与实现

| ID / 资源 | 博主与原帖 | 已核验内容与官网 |
|---|---|---|
| r67 · Refactoring UI | [Wes Bos · 2018-12-11](https://x.com/wesbos/status/1072502089102880768) | 原帖与官方 oEmbed 均可读，推荐学习设计并引用 Steve Schoger 的发布帖。[官网](https://www.refactoringui.com/)确认内容包括层级、间距、排版、配色；付费书籍及套装，提供两章试读。 |
| r68 · Build UI | [Taylor Otwell · 2023-04-10](https://x.com/taylorotwell/status/1645511113470091265) | 原帖与官方 oEmbed 均可读，明确推荐 Sam Selikoff 的界面实现视频。[官网](https://buildui.com/)与 [Recipes](https://buildui.com/recipes)确认课程、公开轮播/滑块/数字动画代码示例；课程另行付费。 |
| r69 · Animations on the Web | [shadcn · 2025-07-14](https://x.com/shadcn/status/1944804313156419771)；[Max Barvian · 2024-09-04](https://x.com/MBarvian/status/1831280975109845099) | 两篇官方 oEmbed 正文可读，分别推荐课程的实用性和 UI 动画教学。[官网](https://animations.dev/)将对应帖子与课程关联，覆盖缓动、时长、CSS 和 Framer Motion；核验时报名关闭，提供预览申请。 |
| r70 · Devouring Details | [Andy Allen · 2025-07-09](https://x.com/asallen/status/1942969219379007930)；[Rauno · 2025-09-02](https://x.com/raunofreiberg/status/1962882635501330637) | Andy 原帖正文可读，称其为关注细节的参考手册；其引用的旧帖不可用，因此另核验 Rauno 的公开主页置顶发布帖与[官网](https://devouringdetails.com/)的同一推荐链接。付费互动手册、React 原型、部分免费预览。官网另一条 Benji Taylor 推荐已 404，未采用。 |
| r71 · Eased Gradient Cards | [Jhey 演示 · 2026-09-25](https://x.com/jh3yy/status/2103548937617731999)；[作者回复入口](https://x.com/jh3yy/status/2103551044039164301) | 两篇原帖正文可读；回复的短链实际跳转到[作者演示](https://www.jhey.dev/demos/2026/eased-gradient-cards/)。页面提供贝塞尔曲线调节、线性/缓动对比与 CSS 复制。属于作者自荐。 |
| r72 · shadcn/lint | [shadcn 发布 · 2026-09-14](https://x.com/shadcn/status/2099534231114314145)；[Vue / Svelte 更新 · 2026-09-22](https://x.com/shadcn/status/2102408442086556147) | 两篇原帖正文可读。[官方 README](https://github.com/shadcn-ui/lint)确认 Tailwind v4、ESLint/Oxlint、React/Vue/Svelte，以及 Oxlint 不检查 Vue/Svelte 模板的边界。属于作者发布；本次扩展收录直接服务 UI 设计系统的源码工具，未把它标成 Skill。 |

## 素材组件与设计工具

以下 7 项均已访问产品官网并读取 X 官方 oEmbed 正文；r73–r78 也直接读取了原帖。r79 先在 RicoUI 主帖下读取回复，再独立核验该回复的 oEmbed。除特别说明外，均为第三方推荐。

| ID / 资源 | 博主与原帖 | 推荐内容与官网核验 |
|---|---|---|
| r73 · Magic UI | [Mckay Wrigley · 2024-09-03](https://x.com/mckaywrigley/status/1831098800351719924) | 推荐 Cursor 与 Magic UI 制作落地页。[官网](https://magicui.design/)提供 React、TypeScript、Tailwind CSS、Motion 组件，免费开源组件与付费 Pro 模板并存。不采用原帖关于 AI 包办工作的效果承诺。 |
| r74 · Aceternity UI | [Adrian / JavaScript Mastery · 2024-02-08](https://x.com/jsmasterypro/status/1755637825964282097) | 推荐可复制的动画组件。[官网](https://ui.aceternity.com/)确认 React、Tailwind CSS、Motion 组件及页面区块；包含收费 All-Access，不笼统标为全部免费。 |
| r75 · daisyUI | [Dev Ed · 2023-03-09](https://x.com/developedbyed/status/1633913146422198276) | 分享使用 daisyUI 的体验。[官网](https://daisyui.com/)确认 Tailwind CSS 语义类名、组件和主题，样式本身不附带 JS bundle；原帖不作为当前版本兼容性承诺。 |
| r76 · Open Peeps | [Harika Bommu · 2020-03-10](https://x.com/harikabommu/status/1237408254398955522) | 分享使用 Open Peeps 绘制产品分镜。[官网](https://www.openpeeps.com/)确认可组合人物插画和 CC0，可用于个人及商业项目。 |
| r77 · SVG Backgrounds | [Jeffrey at Lytbox · 2019-01-20](https://x.com/jeffreyatlytbox/status/1086847076376313856) | 推荐其进入设计工作流。[官网](https://www.svgbackgrounds.com/)及[许可页](https://www.svgbackgrounds.com/license/)确认 SVG 背景工具、免费素材署名要求和付费免署名权益。官网旧账号 `lytbox_co` 已更名，采用 X 返回的当前账号；另一条 Jarod Peachey 推荐已 404，未采用。 |
| r78 · UI-Layouts | [RicoUI · 2025-08-17](https://x.com/ricouii/status/1956992888023417163) | 推荐组件的设计风格与细节。[官网](https://ui-layouts.com/)确认组件、视觉效果、页面区块及 Pro 内容。不将原帖 star 数和“更轻量”的评价作为当前事实。 |
| r79 · UI Tools | [RicoUI · 2025-08-17](https://x.com/ricouii/status/1956992892184264743) | 回复明确列出 SVG Line Draw、Shadows、Clip-Path、Mesh-Gradient、Background Snippets、Color Lab 六项工具。[官网](https://tools.ui-layouts.com/)仍展示这些入口。与 UI-Layouts 属于同一生态，作为用途独立的工具站单列。 |

X 官方嵌入接口复核格式：`https://publish.twitter.com/oembed?url=https://twitter.com/{handle}/status/{id}&omit_script=true`。读取其作者、规范 URL 和正文；网站保存的来源链接始终指向原帖。此次没有安装、购买或完整操作这些第三方产品。

## 未收录的候选

- Shift Nudge 与 CSS for JavaScript Developers 的 Twitter 推荐已核验，但本轮优先补充组件、素材及设计系统工具，避免新增内容偏重付费课程。
- Eldora UI 的[面条推荐帖](https://x.com/miantiao_me/status/1816325000426607083)已核验，本轮已有多套 React 动画组件，暂不重复扩充同类内容。
- Realtime Colors、Fontpair、Laws of UX、Polypane 等在本轮未找到充分的具体 Twitter 推荐帖证据，不因官网可访问就标为 Twitter 推荐。
