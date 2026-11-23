import fs from 'node:fs/promises';
import path from 'node:path';
export async function collectAsos(page,base,indices){
 const selection=JSON.parse(await fs.readFile(path.join(base,'asos-selection.json'),'utf8'));
 for(const index of indices){
  const sku='SKU'+String(index+1).padStart(2,'0'),dir=path.join(base,sku);await fs.mkdir(dir,{recursive:true});
  await page.goto(selection[index],{timeout:60000});
  await page.waitForSelector('button[aria-label="View video"]',{state:'visible',timeout:20000});
  await page.click('button[aria-label="Product Details"]',{label:'读取对应款式商品信息'});
  const data=await page.evaluate(()=>({source:location.href,title:document.querySelector('h1')?.textContent,images:[...document.querySelectorAll('[aria-label="Product Gallery"] img')].filter(e=>/, [1-5] of /.test(e.alt)).map(e=>({src:e.currentSrc||e.src,alt:e.alt})),details:document.querySelector('[aria-label="PRODUCT INFORMATION"]')?.innerText||''}));
  await page.click('button[aria-label="View video"]',{label:'读取本款服装实拍展示视频'});
  await page.waitForFunction(()=>!!document.querySelector('video')?.src,undefined,{timeout:15000});
  data.video=await page.evaluate(()=>document.querySelector('video').currentSrc||document.querySelector('video').src);
  data.sku=sku;await fs.writeFile(path.join(dir,'source.json'),JSON.stringify(data,null,2));
  const video=await page.fetch(data.video,{saveAs:path.join(dir,sku+'-source.mp4'),timeout:40000});if(!video.ok)throw Error(sku+' video HTTP '+video.status);
  const unique=[...new Map(data.images.map(i=>[i.src,i])).values()];
  if(!unique.length)throw Error(sku+'没有已加载商品图片');
  for(let i=0;i<Math.min(index===9?1:3,unique.length);i++){
   const r=await page.fetch(unique[i].src,{saveAs:path.join(dir,sku+'-image-'+(i+1)+'.jpg'),timeout:30000});if(!r.ok)throw Error(sku+' image HTTP '+r.status);
  }
  console.log({sku,title:data.title,images:Math.min(index===9?1:3,unique.length),video:true});
 }
}

export async function collectNextAsos(page,base,wanted=3){
 const stateFile=path.join(base,'acquisition.json');let state;
 try{state=JSON.parse(await fs.readFile(stateFile,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;const first=JSON.parse(await fs.readFile(path.join(base,'SKU01/source.json'),'utf8'));state={queue:JSON.parse(await fs.readFile(path.join(base,'asos-selection.json'),'utf8')).slice(1),completed:[first],skipped:[]};}
 const save=()=>fs.writeFile(stateFile,JSON.stringify(state,null,2));let done=0;
 for(let attempt=0;attempt<8&&done<wanted&&state.completed.length<10&&state.queue.length;attempt++){
  const url=state.queue.shift(),pid=u=>/\/prd\/(\d+)/.exec(u)?.[1];await save();
  if(state.completed.some(c=>pid(c.source)===pid(url)))continue;
  await page.goto(url,{timeout:45000});await page.waitForSelector('[aria-label="Product Gallery"]',{state:'visible',timeout:20000});
  const more=await page.evaluate(()=>[...new Set([...document.querySelectorAll('a[href*="/prd/"]')].filter(a=>/dress/i.test(a.href)).map(a=>a.href.split('#')[0]))]);
  for(const u of more)if(!state.queue.includes(u)&&!state.completed.some(c=>c.source.split('#')[0]===u)&&!state.skipped.some(c=>c.source===u))state.queue.push(u);
  if(!await page.evaluate(()=>!!document.querySelector('button[aria-label="View video"]'))){state.skipped.push({source:url,reason:'商品页未提供对应实拍视频'});await save();console.log({skipped:url.split('/prd/')[1]});continue;}
  await page.waitForFunction(()=>!document.body.innerText.includes('DELIVER ELSEWHERE'),undefined,{timeout:20000});
  const data=await page.evaluate(()=>({source:location.href,title:document.querySelector('h1')?.textContent,images:[...document.querySelectorAll('[aria-label="Product Gallery"] img')].filter(e=>/, [1-5] of /.test(e.alt)).map(e=>({src:e.currentSrc||e.src,alt:e.alt})),details:document.querySelector('[aria-label="PRODUCT INFORMATION"]')?.innerText||''}));
  await page.click('button[aria-label="View video"]',{label:'读取对应女装实拍素材'});await page.waitForFunction(()=>!!document.querySelector('video')?.src,undefined,{timeout:10000});data.video=await page.evaluate(()=>document.querySelector('video').currentSrc||document.querySelector('video').src);
  if(state.completed.some(c=>pid(c.source)===pid(data.source)))continue;
  if(!data.video.includes(pid(data.source)+'-catwalk'))throw Error('商品与视频标识不一致，禁止纳入素材');
  const sku=data.sku='SKU'+String(state.completed.length+1).padStart(2,'0'),dir=path.join(base,sku);await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,'source.json'),JSON.stringify(data,null,2));
  const v=await page.fetch(data.video,{saveAs:path.join(dir,sku+'-source.mp4'),timeout:30000});if(!v.ok)throw Error(sku+' video HTTP '+v.status);
  const unique=[...new Map(data.images.map(i=>[i.src,i])).values()];if(!unique.length)throw Error(sku+'无原商品图片');
  for(let i=0;i<Math.min(sku==='SKU10'?1:3,unique.length);i++){const r=await page.fetch(unique[i].src,{saveAs:path.join(dir,sku+'-image-'+(i+1)+'.jpg'),timeout:30000});if(!r.ok)throw Error(sku+' image HTTP '+r.status);}
  state.completed.push(data);done++;await save();console.log({sku,title:data.title,video:true});
 }
 return {completed:state.completed.length,remainingQueue:state.queue.length};
}
