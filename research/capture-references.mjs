import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const urls = [
['artefakt','https://www.getlayers.ai/templates?layer=artefakt'],
['night-gallery','https://www.getlayers.ai/3d-scenes?layer=night-gallery-002'],
['product-rail','https://21st.dev/?preview=%2F%40dhxwhy%2Fcomponents%2Fproduct-rail-gallery'],
['border-beam','https://21st.dev/community/components/s/border?preview=%2F%40hyperiux%2Fcomponents%2Fborder-beam'],
['features-card','https://21st.dev/community/components/s/features?preview=%2F%40mokshithgujjeti%2Fcomponents%2Ffeatures-card'],
['footer','https://21st.dev/community/components/s/footer?preview=%2F%40kedhareswer%2Fcomponents%2Fbeam-wordmark-footer'],
['gallery','https://21st.dev/@n38693842/components/gallery-animation'],
['tunnel','https://21st.dev/@daiwiikharihar/components/perspective-tunnel-hero'],
['hello','https://21st.dev/@ncdai/components/apple-hello-effect'],
['eclipse','https://21st.dev/community/components/s/button?preview=%2F%40iamsatish4564%2Fcomponents%2Feclipse-button'],
['cursor','https://21st.dev/@jahed/components/magnetic-cursor'],
['neural','https://21st.dev/community/components/s/form?preview=%2F%40shivendra9795kumar%2Fcomponents%2Fneural-access-login'],
['signin','https://21st.dev/@diarmuradi/components/sign-in-3'],
['tabs','https://21st.dev/community/components/s/tabs?preview=%2F%40minhxthanh%2Fcomponents%2Fslide-tabs']
];
const browser=await chromium.launch({headless:true});
const results=[];
for(let i=0;i<urls.length;i+=3) {
 await Promise.all(urls.slice(i,i+3).map(async ([id,url])=>{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  try{
   const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
   await page.waitForTimeout(6500);
   await page.screenshot({path:'research/'+id+'-desktop.png'});
   const frames=await Promise.all(page.frames().map(async f=>({url:f.url(),text:await f.locator('body').innerText({timeout:4000}).catch(()=>''),video:await f.locator('video').evaluateAll(v=>v.map(x=>({src:x.currentSrc||x.src}))).catch(()=>[])})));
   await page.setViewportSize({width:390,height:844});
   await page.waitForTimeout(1000);
   await page.screenshot({path:'research/'+id+'-mobile.png'});
   const result={id,url,status:response?.status(),title:await page.title(),frames};
   results.push(result); console.log(id,response?.status(),frames.map(f=>f.text.slice(0,80)).join(' | '));
  }catch(error){results.push({id,url,error:String(error)}); console.log(id,String(error));}
  await page.close();
 }));
 await fs.writeFile('research/reference-results.json',JSON.stringify(results,null,2));
}
await browser.close();
