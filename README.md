# UI Design Guide · 界面设计指南

以搜索和分类浏览为入口的前端 UI 资源门户。面向设计新手与开发者，帮助选择灵感网站、工具、素材、案例和 Agent Skills。

**[立即打开界面设计指南 →](https://chrichuang218.github.io/awesome-ui-design/)**

A curated guide to UI design resources and AI skills. Find the right inspiration, tools, and workflow for your next interface.

[![界面设计指南首页](docs/home-preview.png)](https://chrichuang218.github.io/awesome-ui-design/)

## 本地使用

需要 Node.js 20.19+ 或 22.12+。

```sh
npm install
npm run dev
```

打开终端显示的本地网址。`npm run build` 构建到 `dist/`，`npm run preview` 预览构建结果。

## 功能

- 四种任务引导：找灵感、开始设计、改善现有 UI、交互动效。
- 寻找灵感与开始设计可直接选择产品界面、落地页或作品集；改善界面与交互动效直接提供三步路线。
- 设计网站与 Skill / 套件的搜索、分类、排序、分页；支持“最新收录”，数量由资源数据自动计算。
- 按用途、技术栈、费用组合筛选，条件随 URL 保存；费用未核实的资源明确标注。
- 每项资源有独立静态详情页，包含官方入口、费用与许可依据、同类替代和配套资源；保留快速预览与最多三项对比。
- 三个编辑专题：免费设计工具箱、React 界面与动效、前端设计 Skills；支持复制 Markdown 清单与分享链接。
- 生成可复制的 AI 使用提示；复制权限不足时提供手动复制。
- 搜索、排序与推荐条件记录在 URL，便于分享与刷新；无账号、无后台。
- 首页参考 TOOOLS.design：浮动导航、分类入口、图文推荐与资源卡片；保留搜索、对比、任务指南、键盘操作与减少动态效果适配。

页面改造的来源与有意差异见 `docs/toools-reference/README.md`。网站通过 GitHub Pages 发布。

## 数据维护

- `src/resources.js` 是目录数据；每项包括稳定 id、名称、类型、描述、URL、来源与注意事项。
- `src/catalog.js` 是编辑推荐路线与搜索逻辑。
- `src/portal-data.js` 维护用途、技术栈、已核实的费用与许可、资源关联和专题；核验依据见 `docs/portal-metadata.md`。新增资源时需同步补充元数据，未知费用标为 `unknown`。
- `src/portal-pages.js` 在开发与构建时使用同一模板生成 `resources/<id>.html` 和 `collections/<id>.html`，正文无需 JavaScript 即可阅读；复制按钮不可用时提供手动复制。
- `src/resource-icons.js` 对应本地图标，来源与文件哈希记录在 `docs/resource-icons.json`；GitHub 条目使用仓库作者头像，缺失或加载失败时自动显示名称字标。
- `docs/resource-research.md` 保存历史 Linux.do 整理，`docs/x-resource-research.md` 保存 X / Twitter 推荐及官方核验；页面不展示社区出处，构建产物不包含这些文档。
- 2026-09-26 新增 13 项 X / Twitter 来源资源，共 79 项；新增项已核验原帖或 X 官方嵌入正文及官网，未重新核验全部历史外站。请以官方最新说明为准。条目不代表排名或质量保证。
- 网站和 Skill 是不同记录，即使属于同一产品也分别呈现。条目数量不等于不同产品的数量。
- 添加资源时保留第一方链接和具体社区来源（Linux.do 主题或 X / Twitter 原帖）；在研究记录中区分第三方推荐与作者自荐，不编造安装量、评分、价格或实测体验。按收录顺序追加数据，以保持“最新收录”排序。

## 验证

```sh
npm test
npm run build
npm run test:browser
```

浏览器测试自动启动生产预览，优先使用本机 Chrome；未安装 Chrome 时可执行 `npx playwright install chromium` 并设 `PW_BROWSER=chromium` 后运行。覆盖搜索、筛选、推荐、对比、弹窗、复制与移动端布局。截图写入 `test-results/`。

## GitHub 首页与发布

仓库：[chrichuang218/awesome-ui-design](https://github.com/chrichuang218/awesome-ui-design)

在线指南：[chrichuang218.github.io/awesome-ui-design](https://chrichuang218.github.io/awesome-ui-design/)

GitHub 仓库主页展示本 README，点击上方入口或截图即可打开交互指南。网页通过 GitHub Pages 托管，无需额外服务器。

维护者更新代码并推送后，在 Actions 中手动运行 `Deploy Pages` 工作流，测试与构建通过后部署 `dist/`。Pages 的 Source 使用 GitHub Actions。本项目使用相对资源路径，支持仓库子路径。

## 授权与来源

本站代码采用 MIT License。资源链接及描述用于索引，第三方网站、商标、素材与 Skill 的许可由各自作者决定。完整来源见 `docs/resource-research.md` 与 `docs/x-resource-research.md`。

## 致谢

感谢 [LINUX DO](https://linux.do/) 社区的支持与讨论。
