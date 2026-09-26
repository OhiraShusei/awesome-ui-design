import { resources } from './resources.js';
import { categories } from './catalog.js';
import { facets, resourceMeta, collections } from './portal-data.js';

const esc = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const byId = new Map(resources.map(resource => [resource.id, resource]));
const devStyles = ['../src/style.css', '../src/portal.css'];
const resourcePath = id => `../resources/${id}.html`;
const collectionPath = id => `../collections/${id}.html`;
const external = (url, label, className = '') => `<a class="${className}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
const labels = (facet, values) => values.map(value => facets[facet].options[value]).filter(Boolean).join('、') || '待补充';

function page(title, description, content, styles, markdown = '') {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)} · 界面设计指南">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#f3f4fd">
  <title>${esc(title)} · 界面设计指南</title>
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  ${styles.map(href => `<link rel="stylesheet" href="${esc(href)}">`).join('\n  ')}
</head>
<body>
  <a class="skip" href="#main">跳到正文</a>
  <header class="header-shell toolbar"><div class="nav-main"><a class="brand" href="../index.html" aria-label="界面设计指南首页"><span class="brand-rings" aria-hidden="true"><i></i><i></i><i></i></span><span class="brand-label">界面设计指南<small>UI DESIGN GUIDE</small></span></a><nav aria-label="主导航"><a href="../index.html#library">全部资源</a><a href="../index.html#collections">专题合集</a></nav></div></header>
  <main id="main" class="page-shell">
    <nav class="page-breadcrumb" aria-label="面包屑"><a href="../index.html#library">← 返回资源目录</a><span aria-current="page">${esc(title)}</span></nav>
    ${content}
    <p id="copy-status" class="copy-status" role="status" aria-live="polite"></p>
    <div id="copy-fallback" class="copy-fallback" hidden><label for="copy-text">浏览器未允许自动复制，请选中下方内容后手动复制。</label><textarea id="copy-text" readonly rows="8"></textarea></div>
  </main>
  <footer class="page-footer"><a href="../index.html">界面设计指南</a><span>为你的下一个好界面，找到合适的起点。</span></footer>
  <script>
    const markdown = ${JSON.stringify(markdown).replace(/</g, '\\u003c')};
    document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
      const text = button.dataset.copy === 'markdown' ? markdown + '\\n\\n专题链接：' + location.href : location.href;
      const fallback = document.querySelector('#copy-fallback');
      const status = document.querySelector('#copy-status');
      button.closest('.page-header').append(status, fallback);
      try {
        await navigator.clipboard.writeText(text);
        fallback.hidden = true;
        status.textContent = button.dataset.copy === 'markdown' ? '专题清单已复制。' : '页面链接已复制。';
      } catch {
        const field = document.querySelector('#copy-text');
        fallback.hidden = false;
        field.value = text;
        field.focus();
        field.select();
        status.textContent = '自动复制失败，内容已展开，请手动复制。';
      }
    }));
  </script>
</body>
</html>`;
}

function relatedSection(id, title, description, ids) {
  if (!ids.length) return '';
  return `<section id="${id}" class="page-section" aria-labelledby="${id}-title"><div class="section-heading"><div><h2 id="${id}-title">${title}</h2><p>${description}</p></div></div><div class="related-grid">${ids.map(resourceId => {
    const resource = byId.get(resourceId);
    return `<a class="related-card" href="${resourcePath(resource.id)}"><span class="page-kicker">${esc(categories[resource.category])}</span><h3>${esc(resource.name)} <span aria-hidden="true">→</span></h3><p>${esc(resource.description)}</p></a>`;
  }).join('')}</div></section>`;
}

export function renderResourcePage(resource, styles = devStyles) {
  const meta = resourceMeta[resource.id];
  const memberships = collections.filter(collection => collection.items.some(item => item.id === resource.id));
  const details = [
    ['适用任务', esc(labels('use', meta.uses))],
    ['技术栈', esc(labels('stack', meta.stacks))],
    ['费用', esc(facets.price.options[meta.price])],
    ['费用核验', meta.checkedAt ? `${esc(meta.checkedAt)}${meta.priceSource ? ` · ${external(meta.priceSource, '查看依据')}` : ''}` : '待核实']
  ];
  if (meta.licenseNote) details.push(['使用许可', `${esc(meta.licenseNote)}${meta.licenseSource ? ` · ${external(meta.licenseSource, '许可说明')}` : ''}`]);
  return page(resource.name, resource.description, `
    <header class="page-header"><span class="page-kicker">${esc(categories[resource.category])}</span><h1 class="page-title">${esc(resource.name)}</h1><p class="page-description">${esc(resource.description)}</p><div class="page-actions">${external(resource.url, resource.category === 'skills' ? '打开 Skill 与使用说明' : '访问资源', 'primary-link')}<button class="text-button" type="button" data-copy="link">复制页面链接</button></div></header>
    <section class="page-section" aria-labelledby="resource-facts"><div class="section-heading"><h2 id="resource-facts">适合你的项目吗？</h2></div><dl class="metadata-grid">${details.map(([label, value]) => `<div class="metadata-item"><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>${resource.note ? `<p class="editor-note">${esc(resource.note.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'))}</p>` : ''}</section>
    ${resource.related.length ? `<section class="page-section" aria-labelledby="official-links"><div class="section-heading"><h2 id="official-links">相关入口</h2></div><div class="page-actions">${resource.related.map(item => external(item.url, item.label, 'text-button')).join('')}</div></section>` : ''}
    ${relatedSection('alternatives', '同类替代', '用途相近，可以结合你的项目需求比较。', meta.alternatives)}
    ${relatedSection('companions', '配套资源', '帮助你从参考、设计继续走到实现。', meta.companions)}
    ${memberships.length ? `<section class="page-section" aria-labelledby="in-collections"><div class="section-heading"><h2 id="in-collections">收录在这些专题中</h2></div><div class="related-grid">${memberships.map(collection => `<a class="related-card" href="${collectionPath(collection.id)}"><span class="page-kicker">${collection.items.length} 个精选资源</span><h3>${esc(collection.title)} <span aria-hidden="true">→</span></h3><p>${esc(collection.description)}</p></a>`).join('')}</div></section>` : ''}
  `, styles);
}

export function renderCollectionPage(collection, styles = devStyles) {
  const markdown = `# ${collection.title}\n\n${collection.description}\n\n${collection.items.map((item, index) => {
    const resource = byId.get(item.id);
    return `${index + 1}. [${resource.name}](${resource.url})\n   ${item.reason}`;
  }).join('\n\n')}`;
  return page(collection.title, collection.description, `
    <header class="page-header"><span class="page-kicker">编辑专题 · ${collection.items.length} 个精选资源</span><h1 class="page-title">${esc(collection.title)}</h1><p class="page-description">${esc(collection.description)}</p><div class="page-actions"><button class="primary-button" type="button" data-copy="markdown">复制 Markdown 清单</button><button class="text-button" type="button" data-copy="link">复制专题链接</button></div></header>
    <ol class="collection-list">${collection.items.map((item, index) => {
      const resource = byId.get(item.id);
      const meta = resourceMeta[resource.id];
      return `<li class="collection-item"><span class="collection-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><div><p class="page-kicker">${esc(categories[resource.category])} · ${esc(facets.price.options[meta.price])}</p><h2><a href="${resourcePath(resource.id)}">${esc(resource.name)}</a></h2><p>${esc(resource.description)}</p><p class="editor-note">${esc(item.reason)}</p><div class="page-actions"><a class="text-button" href="${resourcePath(resource.id)}">查看详情 →</a>${external(resource.url, '打开资源', 'text-button')}</div></div></li>`;
    }).join('')}</ol>
    <section class="page-section" aria-labelledby="other-collections"><div class="section-heading"><h2 id="other-collections">继续探索</h2></div><div class="related-grid">${collections.filter(item => item.id !== collection.id).map(item => `<a class="related-card" href="${collectionPath(item.id)}"><span class="page-kicker">${item.items.length} 个精选资源</span><h3>${esc(item.title)} <span aria-hidden="true">→</span></h3><p>${esc(item.description)}</p></a>`).join('')}</div></section>
  `, styles, markdown);
}

export function portalPages() {
  const pages = new Map([
    ...resources.map(resource => [`resources/${resource.id}.html`, styles => renderResourcePage(resource, styles)]),
    ...collections.map(collection => [`collections/${collection.id}.html`, styles => renderCollectionPage(collection, styles)])
  ]);
  return {
    name: 'portal-pages',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = new URL(request.url, 'http://localhost').pathname;
        const base = server.config.base === './' ? '/' : server.config.base;
        if (!pathname.startsWith(base)) return next();
        const path = pathname.slice(base.length);
        const render = pages.get(path);
        if (!render && !/^(resources|collections)\//.test(path)) return next();
        response.statusCode = render ? 200 : 404;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(render ? render(devStyles) : '<!doctype html><html lang="zh-CN"><meta charset="UTF-8"><title>页面未找到</title><h1>页面未找到</h1><a href="../index.html#library">返回资源目录</a></html>');
      });
    },
    generateBundle(_options, bundle) {
      const styles = Object.values(bundle).filter(file => file.type === 'asset' && file.fileName.endsWith('.css')).map(file => `../${file.fileName}`);
      if (!styles.length) this.error('资源详情页未找到构建后的 CSS 文件。');
      for (const [fileName, render] of pages) this.emitFile({ type: 'asset', fileName, source: render(styles) });
    }
  };
}
