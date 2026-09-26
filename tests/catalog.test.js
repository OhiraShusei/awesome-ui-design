import test from 'node:test';
import assert from 'node:assert/strict';
import { resources } from '../src/resources.js';
import { facets, resourceMeta, collections } from '../src/portal-data.js';
import { categories, filterResources, getRoute, makePrompt, intents, usesProjectType } from '../src/catalog.js';
test('目录 ID 唯一、分类有效，且来源可追溯',()=>{
  assert.ok(resources.length > 0);
  assert.equal(new Set(resources.map(r=>r.id)).size,resources.length);
  for(const r of resources){
    assert.ok(categories[r.category]);assert.ok(r.name && r.description);
    assert.match(r.url,/^https?:\/\//);assert.ok(r.sources.length);
    for(const s of r.sources){
      assert.ok(s.label);
      const source=new URL(s.url);
      assert.equal(source.protocol,'https:');
      assert.ok(['linux.do','x.com','twitter.com'].includes(source.hostname));
      if(source.hostname!=='linux.do')assert.match(source.pathname,/^\/[A-Za-z0-9_]+\/status\/\d+$/);
    }
  }
});

test('可见的项目选择会改变路线，隐藏的选择不影响提示词',()=>{
  for(const intent of ['inspire','create']) {
    assert.equal(usesProjectType(intent),true);
    const routes=['product','marketing','portfolio'].map(project=>getRoute(intent,project));
    assert.equal(new Set(routes.map(route=>route.ids.join(','))).size,3);
    assert.equal(new Set(routes.map(route=>route.title)).size,3);
    assert.match(makePrompt(intent,'marketing'),/品牌 \/ 落地页/);
    assert.match(makePrompt(intent,'portfolio'),/博客 \/ 作品集/);
  }
  for(const intent of ['improve','motion']) {
    assert.equal(usesProjectType(intent),false);
    assert.equal(makePrompt(intent,'marketing'),makePrompt(intent,'product'));
    assert.equal(makePrompt(intent,'portfolio'),makePrompt(intent,'product'));
    assert.doesNotMatch(makePrompt(intent,'portfolio'),/项目类型是/);
  }
  assert.deepEqual(getRoute('create','invalid'),getRoute('create','product'));
});
test('搜索支持多个条件、分类、大小写与空结果',()=>{
  assert.ok(filterResources('react','assets').some(r=>r.name==='React Bits'));
  assert.deepEqual(filterResources('REACT','assets'),filterResources('react','assets'));
  assert.ok(filterResources('配色 字体','skills').some(r=>r.id==='r54'));
  assert.equal(filterResources('zzzzzzzzzz','all').length,0);
});
test('门户元数据和专题没有失效引用，已知费用有核验来源',()=>{
  const ids=new Set(resources.map(resource=>resource.id));
  assert.deepEqual(new Set(Object.keys(resourceMeta)),ids);
  for(const [id,meta] of Object.entries(resourceMeta)){
    for(const [field,facet] of [['uses','use'],['stacks','stack']]){
      assert.ok(meta[field].length,`${id} ${field}`);
      for(const value of meta[field])assert.ok(facets[facet].options[value],`${id} ${value}`);
    }
    assert.ok(facets.price.options[meta.price]);
    if(meta.price!=='unknown'){
      assert.match(meta.priceSource,/^https:\/\//,`${id} price source`);
      assert.match(meta.checkedAt,/^\d{4}-\d{2}-\d{2}$/,`${id} checked date`);
    }
    for(const field of ['alternatives','companions']){
      assert.equal(new Set(meta[field]).size,meta[field].length);
      for(const related of meta[field])assert.ok(ids.has(related)&&related!==id,`${id} ${related}`);
    }
  }
  assert.deepEqual(collections.map(collection=>collection.id).sort(),['design-skills','free-design-kit','react-motion']);
  for(const collection of collections){
    assert.ok(collection.title&&collection.description);
    assert.ok(collection.items.length>=5&&collection.items.length<=8);
    assert.equal(new Set(collection.items.map(item=>item.id)).size,collection.items.length);
    for(const item of collection.items)assert.ok(ids.has(item.id)&&item.reason);
  }
});
test('用途、技术栈与费用取交集，并继续受关键词和分类约束',()=>{
  const filters={use:'motion',stack:'react',price:'free'};
  const matches=filterResources('','assets',filters);
  assert.ok(matches.some(resource=>resource.id==='r31'));
  assert.ok(!matches.some(resource=>resource.id==='r73'));
  for(const resource of matches){
    const meta=resourceMeta[resource.id];
    assert.ok(meta.uses.includes('motion')&&meta.stacks.includes('react')&&meta.price==='free');
  }
  assert.deepEqual(filterResources('react bits','assets',filters).map(resource=>resource.id),['r31']);
  assert.equal(filterResources('react bits','skills',filters).length,0);
  assert.equal(filterResources('react bits','assets',{...filters,price:'paid'}).length,0);
  assert.deepEqual(filterResources('','all',{use:'',stack:'',price:''}),resources);
});
test('推荐按照任务和项目类型变化，所有推荐指向已收录资源',()=>{
  for(const i of intents)for(const project of ['product','marketing','portfolio']){
    const route=getRoute(i.id,project);assert.equal(route.ids.length,3);
    route.ids.forEach(id=>assert.ok(resources.find(r=>r.id===id)));
    assert.ok(makePrompt(i.id,project).includes(route.steps[0]));
  }
  assert.ok(getRoute('create','product').ids.includes('r66'));
  assert.ok(getRoute('create','marketing').ids.includes('r53'));
});
