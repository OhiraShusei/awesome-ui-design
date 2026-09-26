import { chromium } from 'playwright';
import { resources } from '../src/resources.js';
import { resourceIcons } from '../src/resource-icons.js';
import { collections, resourceMeta } from '../src/portal-data.js';
const totalPages = Math.ceil(resources.length / 12);
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';

// Exercise the production build under a repository subpath, as GitHub Pages will serve it.
const root=resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.md':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(!pathname.startsWith('/awesome-ui-design/')){res.writeHead(404).end();return;}
  const relative=decodeURIComponent(pathname.slice('/awesome-ui-design/'.length))||'index.html';
  const file=resolve(root,relative);
  if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  try{const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'}).end(body);}
  catch{res.writeHead(404).end();}
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const origin=`http://127.0.0.1:${server.address().port}`;
const base=`${origin}/awesome-ui-design/`;
let browser;
try{
  browser=await chromium.launch({channel:process.env.PW_BROWSER==='chromium'?undefined:'chrome',headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1040},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(base);await page.locator('.resource').first().waitFor();
  assert.equal(await page.locator('.resource').count(),12);
  assert.equal(await page.locator('a[href*="directions.html"], a[href*="resource-research.md"], a[href="#about"]').count(),0);
  assert.equal(await page.locator('#result-count').textContent(),`找到 ${resources.length} 个资源`);
  await page.locator('#sort').selectOption('newest');
  assert.equal(await page.locator('#resources [data-detail]').first().getAttribute('data-detail'),resources.at(-1).id);
  await page.reload();
  assert.equal(await page.locator('#sort').inputValue(),'newest');
  await page.locator('[data-category="assets"]').click();
  const newestAsset=resources.filter(resource=>resource.category==='assets').at(-1);
  assert.equal(await page.locator('#resources [data-detail]').first().getAttribute('data-detail'),newestAsset.id);
  await page.locator('#search').fill(newestAsset.name);
  await page.locator(`#resources [data-detail="${newestAsset.id}"]`).click();
  assert.equal(await page.locator('#detail-title').textContent(),newestAsset.name);
  assert.equal(await page.locator('#detail-body .primary-link').getAttribute('href'),newestAsset.url);
  await page.keyboard.press('Escape');
  await page.goto(base);
  const decodedIcons = await page.evaluate(async ({base,icons}) => Promise.all(icons.map(file => new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve({file,loaded:image.naturalWidth > 0 && image.naturalHeight > 0});
    image.onerror = () => resolve({file,loaded:false});
    image.src = base + file;
  }))), {base,icons:Object.values(resourceIcons).map(icon=>icon.file)});
  assert.deepEqual(decodedIcons.filter(icon=>!icon.loaded),[], 'every local resource icon decodes');
  assert.equal(await page.locator('.resource-cover').count(),0);
  const fallbackPage=await context.newPage();
  try {
    await fallbackPage.route(`**/${resourceIcons.r19.file}`,route=>route.abort());
    await fallbackPage.goto(base+'?category=tools');
    const styleKit=fallbackPage.locator('.resource').filter({has:fallbackPage.locator('[data-detail="r19"]')});
    await styleKit.locator('.resource-avatar img').waitFor({state:'detached'});
    assert.equal(await styleKit.locator('.resource-monogram').textContent(),'SK');
    assert.match(await styleKit.locator('h3').textContent(),/StyleKit/);
  } finally { await fallbackPage.close(); }
  await mkdir('test-results',{recursive:true});
  await page.screenshot({path:'test-results/home-overview.png'});
  await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});
  await page.locator('[data-intent="create"]').click();
  assert.match(await page.locator('#route-items').textContent(),/app-shell-ui/);
  await page.locator('[data-project="marketing"]').click();
  assert.match(await page.locator('#route-items').textContent(),/frontend-design/);
  await page.locator('#copy-prompt').click();
  const copied=await page.evaluate(()=>navigator.clipboard.readText());assert.match(copied,/品牌 \/ 落地页/);
  await page.reload();assert.equal(await page.locator('[data-project="marketing"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('[data-intent="create"]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-project="portfolio"]').click();
  assert.match(await page.locator('#route-title').textContent(),/作品集/);
  assert.match(await page.locator('#route-items').textContent(),/Awwwards/);
  assert.equal(await page.locator('[data-project="portfolio"]').evaluate(e=>e===document.activeElement),true);
  await page.locator('[data-intent="improve"]').click();
  assert.equal(await page.locator('#project-options').isVisible(),false);
  assert.equal(new URL(page.url()).searchParams.has('project'),false);
  await page.locator('#copy-prompt').click();
  assert.doesNotMatch(await page.evaluate(()=>navigator.clipboard.readText()),/项目类型是|博客 \/ 作品集/);
  await page.locator('[data-intent="motion"]').click();
  assert.equal(await page.locator('#project-options').isVisible(),false);
  await page.locator('[data-intent="inspire"]').click();
  assert.equal(await page.locator('#project-options').isVisible(),true);
  assert.equal(await page.locator('[data-project="portfolio"]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-project="marketing"]').click();
  assert.match(await page.locator('#route-items').textContent(),/Landingfolio/);
  await page.locator('[data-category="skills"]').click();
  assert.equal(await page.locator('#result-count').textContent(),`找到 ${resources.filter(r=>r.category==='skills').length} 个资源`);
  await page.locator('#search').fill('claude-design');assert.equal(await page.locator('.resource').count(),1);
  await page.locator('#resources [data-detail]').click();assert.equal(await page.locator('#detail').evaluate(e=>e.open),true);
  assert.equal(await page.locator('#detail a[href="https://github.com/jiji262/claude-design-skill"]').count(),1);
  assert.equal(await page.locator('#detail .source-list').count(),0);
  await page.keyboard.press('Escape');assert.equal(await page.locator('#detail').evaluate(e=>e.open),false);
  await page.locator('#search').fill('zzzzzzzzzz');assert.equal(await page.locator('#empty').isVisible(),true);
  await page.locator('#reset').click();assert.equal(await page.locator('#result-count').textContent(),`找到 ${resources.length} 个资源`);
  await page.locator('#resources [data-compare="r1"]').click();
  await page.locator('#resources [data-compare="r2"]').click();
  await page.locator('#resources [data-compare="r3"]').click();
  await page.locator('#resources [data-compare="r4"]').click();assert.match(await page.locator('#notification').textContent(),/最多对比 3/);
  await page.locator('#compare-open').click();assert.equal(await page.locator('.comparison-item').count(),3);
  await page.keyboard.press('Escape');await page.locator('#compare-clear').click();
  assert.equal(await page.locator('#compare-tray').isVisible(),false);
  await page.locator('#next').click();assert.equal(await page.locator('#page-count').textContent(),`2 / ${totalPages}`);
  await page.locator('#sort').selectOption('name');assert.equal(await page.locator('#page-count').textContent(),`1 / ${totalPages}`);
  await page.locator('#sort').blur();await page.keyboard.press('/');assert.equal(await page.locator('#search').evaluate(e=>e===document.activeElement),true);
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}}));
  await page.locator('#copy-prompt').click();assert.equal(await page.locator('#prompt-fallback').evaluate(e=>e.open),true);
  assert.match(await page.locator('#prompt-text').inputValue(),/建议路线/);await page.keyboard.press('Escape');
  // Selection survives filtering; removing a chip restores a usable keyboard target.
  await page.goto(base);
  await page.locator('#resources [data-compare="r1"]').click();
  assert.equal(await page.locator('#resources [data-compare="r1"]').evaluate(e=>e===document.activeElement),true);
  await page.locator('#resources [data-compare="r2"]').click();
  await page.locator('[data-category="skills"]').click();
  assert.equal(await page.locator('#featured').isVisible(),false);
  assert.equal(await page.locator('#compare-names button').count(),2);
  await page.locator('[data-remove="r1"]').click();
  assert.equal(await page.locator('[data-remove="r2"]').evaluate(e=>e===document.activeElement),true);
  assert.equal(await page.locator('#compare-open').isDisabled(),true);
  await page.locator('[data-remove="r2"]').click();
  assert.equal(await page.locator('#compare-tray').isVisible(),false);
  await page.locator('#clear-filter').click();
  assert.equal(await page.locator('#featured').isVisible(),true);
  assert.equal(await page.locator('#search').evaluate(e=>e===document.activeElement),true);
  await page.locator('[data-intent="improve"]').click();
  assert.equal(await page.locator('[data-intent="improve"]').evaluate(e=>e===document.activeElement),true);
  await page.locator('#resources [data-detail="r1"]').click();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#resources [data-detail="r1"]').evaluate(e=>e===document.activeElement),true);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('#resources [data-detail="r1"]').click();
  assert.equal(await page.locator('#detail').evaluate(e=>getComputedStyle(e).animationName),'none');
  await page.keyboard.press('Escape');
  await page.emulateMedia({reducedMotion:'no-preference'});
  // Filters survive sharing, refresh and a visit to a static detail page.
  await page.goto(base);
  await page.locator('[data-category="assets"]').click();
  for(const [facet,value] of Object.entries({use:'motion',stack:'react',price:'free'})){
    await page.locator(`#filter-${facet}`).selectOption(value);
    assert.equal(new URL(page.url()).searchParams.get(facet),value);
  }
  await page.locator('#search').fill('react bits');
  assert.equal(await page.locator('.resource').count(),1);
  const filteredUrl=page.url();
  await page.reload();
  for(const [facet,value] of Object.entries({use:'motion',stack:'react',price:'free'}))assert.equal(await page.locator(`#filter-${facet}`).inputValue(),value);
  await page.locator('#resources [data-detail="r31"]').click();
  assert.equal(await page.locator('#detail a[href$="resources/r31.html"]').count(),1);
  await page.keyboard.press('Escape');
  await page.locator('#resources h3 a[href$="resources/r31.html"]').click();
  assert.equal(page.url(),base+'resources/r31.html');
  assert.equal(await page.locator('h1').textContent(),resources.find(resource=>resource.id==='r31').name);
  assert.equal(await page.locator('.metadata-grid').count(),1);
  for(const field of ['alternatives','companions'])for(const id of resourceMeta.r31[field]){
    const href=await page.locator(`#${field} .related-grid a[href$="/${id}.html"]`).getAttribute('href');
    assert.equal(new URL(href,page.url()).href,base+`resources/${id}.html`);
  }
  await page.locator('[data-copy="link"]').click();
  await page.waitForFunction(()=>document.querySelector('#copy-status').textContent.trim());
  assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),page.url());
  await page.screenshot({path:'test-results/detail-desktop.png',fullPage:true});
  await page.goBack();
  assert.equal(page.url(),filteredUrl);
  assert.equal(await page.locator('#filter-price').inputValue(),'free');
  assert.equal(await page.locator('.resource').count(),1);
  await page.locator('#clear-filter').click();
  for(const facet of ['use','stack','price']){
    assert.equal(await page.locator(`#filter-${facet}`).inputValue(),'');
    assert.equal(new URL(page.url()).searchParams.has(facet),false);
  }
  assert.equal(await page.locator('#search').inputValue(),'');
  assert.equal(await page.locator('#result-count').textContent(),`找到 ${resources.length} 个资源`);
  await page.goto(base+'?use=invalid&stack=invalid&price=invalid');
  assert.equal(await page.locator('#result-count').textContent(),`找到 ${resources.length} 个资源`);
  for(const facet of ['use','stack','price'])assert.equal(await page.locator(`#filter-${facet}`).inputValue(),'');

  // Every curated page is emitted with readable HTML; Markdown remains available when clipboard access fails.
  for(const path of [...resources.map(resource=>`resources/${resource.id}.html`),...collections.map(collection=>`collections/${collection.id}.html`)]){
    assert.match(await readFile(resolve(root,path),'utf8'),/<h1\b[^>]*>[^<]+<\/h1>/,path);
  }
  await page.goto(base);
  for(const collection of collections)assert.equal(await page.locator(`#collections a[href$="collections/${collection.id}.html"]`).count(),1);
  const collection=collections.find(item=>item.id==='free-design-kit');
  await page.locator(`#collections a[href$="collections/${collection.id}.html"]`).click();
  assert.equal(page.url(),base+`collections/${collection.id}.html`);
  assert.equal(await page.locator('h1').textContent(),collection.title);
  await page.locator('[data-copy="markdown"]').click();
  await page.waitForFunction(()=>document.querySelector('#copy-status').textContent.trim());
  const markdown=await page.evaluate(()=>navigator.clipboard.readText());
  assert.ok(markdown.includes(collection.title)&&markdown.includes(page.url()));
  for(const item of collection.items){
    const resource=resources.find(resource=>resource.id===item.id);
    assert.ok(markdown.includes(resource.name)&&markdown.includes(resource.url)&&markdown.includes(item.reason));
  }
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}}));
  await page.locator('[data-copy="markdown"]').click();
  await page.locator('#copy-fallback').waitFor({state:'visible'});
  // Windows clipboard uses CRLF; textarea values normalize line endings to LF.
  assert.equal(await page.locator('#copy-text').inputValue(),markdown.replace(/\r\n/g,'\n'));
  assert.equal(await page.locator('#copy-text').evaluate(element=>element===document.activeElement&&element.selectionStart===0&&element.selectionEnd===element.value.length),true);
  for(const width of [320,390,1440]){
    await page.setViewportSize({width,height:900});
    for(const path of ['resources/r31.html',`collections/${collection.id}.html`]){
      await page.goto(base+path);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${path} overflow ${width}`);
    }
    if(width===390)await page.screenshot({path:'test-results/collection-mobile.png',fullPage:true});
  }
  const staticContext=await browser.newContext({javaScriptEnabled:false});
  try{
    const staticPage=await staticContext.newPage();
    for(const path of ['resources/r31.html',`collections/${collection.id}.html`]){
      await staticPage.goto(base+path);
      assert.equal(await staticPage.locator('h1').isVisible(),true);
      assert.ok(await staticPage.locator('main a[href]').count()>0);
    }
  }finally{await staticContext.close();}
  // Header controls and source-derived image geometry remain usable after restyling.
  await page.goto(base);
  await page.locator('#menu-open').click();
  assert.equal(await page.locator('#site-menu').evaluate(e=>e.matches(':popover-open')),true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#site-menu').evaluate(e=>e.matches(':popover-open')),false);
  await page.locator('#search-open').click();
  assert.equal(await page.locator('#search').evaluate(e=>e===document.activeElement),true);
  await page.locator('#featured').scrollIntoViewIfNeeded();
  await page.locator('.feature-image > img').first().waitFor();
  const featuredImages=await page.locator('.feature-image > img').evaluateAll(images=>images.map(image=>({loaded:image.complete&&image.naturalWidth>0,ratio:image.getBoundingClientRect().width/image.getBoundingClientRect().height})));
  assert.ok(featuredImages.every(image=>image.loaded),'featured images load locally');
  assert.ok(featuredImages.every(image=>Math.abs(image.ratio-16/9)<0.02),'16:9 image geometry from reference');
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900});await page.goto(base);await page.locator('.resource').first().waitFor();
    await page.locator('[data-intent="create"]').click();
    await page.locator('[data-project="portfolio"]').click();
    assert.equal(await page.locator('#project-options').isVisible(),true);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false,`overflow ${width}`);
    if(width===390){
      await page.locator('[data-intent="motion"]').click();assert.match(await page.locator('#route-title').textContent(),/反馈/);
      await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
    }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: production subpath, static resource + collection pages, facet intersections + URL restore, guided recommendations, clipboard + fallback, details, compare limit, paging, keyboard, 320/390/768/1440 layouts, navigation menu, local image geometry. Console clean.');
}finally{if(browser)await browser.close();await new Promise(done=>server.close(done));}
