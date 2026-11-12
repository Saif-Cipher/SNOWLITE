import {chromium} from '@playwright/test';import fs from 'node:fs/promises';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});
for(const [id,url,label] of [['artefakt','https://www.getlayers.ai/templates?layer=artefakt','Artefakt'],['night-gallery','https://www.getlayers.ai/3d-scenes?layer=night-gallery-002','Night Gallery']]){
await p.goto(url);await p.waitForTimeout(5000);
const matches=p.getByText(label,{exact:false});console.log(id,await matches.count());
console.log((await matches.allTextContents()).slice(0,8));
if(await matches.count()){await matches.first().click();await p.waitForTimeout(5000);await p.screenshot({path:'research/'+id+'-preview.png'});await fs.writeFile('research/'+id+'-preview.txt',await p.locator('body').innerText());console.log('frames',p.frames().map(f=>f.url()));}
}
await b.close();
