import {standData} from './stand-data.js';
// Reference orientation only: A left, B right, C down, D up. No confirmed show front.
export const mapPoint=([x,y])=>[(x-432)*.19,(y-373)*.19];
export const members=[{id:1,name:'Jin',color:'#e9a9ce',hair:'#28202a',style:'silk'},{id:2,name:'SUGA',color:'#b7c6ed',hair:'#17161c',style:'jacket'},{id:3,name:'j-hope',color:'#f3c5a0',hair:'#a38c69',style:'suit'},{id:4,name:'RM',color:'#a9d9c6',hair:'#4e382d',style:'sleeveless'},{id:5,name:'Jimin',color:'#efdb9d',hair:'#c59963',style:'long'},{id:6,name:'V',color:'#bcabec',hair:'#19171a',style:'fur'},{id:7,name:'Jung Kook',color:'#e6b5f3',hair:'#101017',style:'biker'}];
export const armEnds=[[-34,25],[-34,-25],[34,25],[34,-25]];
export const pads={back_left:[-23,-17],back_right:[23,-17],front_left:[-23,17],front_right:[23,17]};
export const quadrantNames={back_left:'後方左花道',back_right:'後方右花道',front_left:'正面左花道',front_right:'正面右花道'};
export const songs={
 center:{title:'全員 · 中央舞台'},
 fake:{title:'FAKE LOVE',phases:[{back_left:[4,5],back_right:[3,6],front_left:[1],front_right:[2,7]},{back_left:[2,7],back_right:[1],front_left:[3,6],front_right:[4,5]}]},
 fya:{title:'FYA',phases:[{back_left:[3,6],back_right:[4,7],front_left:[5],front_right:[1,2]}]},
 btb:{title:'Body to Body',phases:[{back_left:[1,7],back_right:[3,5],front_left:[2,6],front_right:[4]}]}
};
export function memberPositions(song='center',phase=0){
 const out={};
 if(song==='center'){members.forEach((m,i)=>out[m.id]={x:(i-3)*1.45,z:3.5,y:2.0,quadrant:'center'});return out;}
 const positions=songs[song].phases[phase]||songs[song].phases[0];
 for(const [quadrant,ids] of Object.entries(positions))ids.forEach((id,i)=>{const [x,z]=pads[quadrant];out[id]={x:x+(i-(ids.length-1)/2)*1.8,z:z+1,y:2.0,quadrant};});
 return out;
}

export const sections=[];
const rect=(x1,z1,x2,z2)=>[[x1,z1],[x2,z1],[x2,z2],[x1,z2]];
const left={
 A1:[[-32,-15],[-20,-7],[-32,-7]],
 A2:[[-32,-6],[-20,-6],[-12,0],[-20,6],[-32,6]],
 A3:[[-32,7],[-20,7],[-32,15]],
 A4:[[-44,-29],[-40,-29],[-35,-22],[-33,-17],[-44,-17]],
 A5:rect(-44,-16,-33,-7),A6:rect(-44,-6,-33,6),A7:rect(-44,7,-33,16),
 A8:[[-44,17],[-33,17],[-35,22],[-40,29],[-44,29]]
};
function addFloor(label,poly,rows){const cx=poly.reduce((a,p)=>a+p[0],0)/poly.length,cz=poly.reduce((a,p)=>a+p[1],0)/poly.length;sections.push({id:'floor:'+label,label,type:'floor',side:label[0],poly,cx,cz,y:0,rows,estimated:true});}
for(const [label,poly]of Object.entries(left)){addFloor(label,poly,+label.slice(1)<=3?10:18);const n=+label.slice(1),bn=n<=3?4-n:12-n;addFloor('B'+bn,poly.map(([x,z])=>[-x,z]),n<=3?10:18);}
for(let n=1;n<=7;n++){const a=-28+(n-1)*8+.3,b=a+7.4,front=x=>Math.max(15,Math.abs(x)*.735+5),poly=[[a,front(a)],[b,front(b)],[b,29],[a,29]];addFloor('C'+n,poly,n===1||n===7?10:18);addFloor('D'+n,poly.map(([x,z])=>[-x,-z]),n===1||n===7?10:18);}
function crossSection(poly,n,t,depth){const crossings=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],da=a[0]*n[0]+a[1]*n[1],db=b[0]*n[0]+b[1]*n[1];if((da<=depth&&db>depth)||(db<=depth&&da>depth)){const u=(depth-da)/(db-da),x=a[0]+u*(b[0]-a[0]),z=a[1]+u*(b[1]-a[1]);crossings.push(x*t[0]+z*t[1]);}}return crossings.sort((a,b)=>a-b);}
function populate(s){s.rowSeats=[];s.seats=[];if(s.type==='floor'){
 const len=Math.hypot(s.cx,s.cz),n=[s.cx/len,s.cz/len],t=[n[1],-n[0]],depths=s.poly.map(p=>p[0]*n[0]+p[1]*n[1]),min=Math.min(...depths),max=Math.max(...depths);
 for(let r=1;r<=s.rows;r++){const d=min+(max-min)*(.06+.88*(r-.5)/s.rows),xs=crossSection(s.poly,n,t,d);const lo=xs[0]+.18,hi=xs.at(-1)-.18,count=Math.max(1,Math.floor((hi-lo)/.56));const row=[];for(let j=1;j<=count;j++){const v=count===1?(lo+hi)/2:lo+(hi-lo)*(j-.5)/count;row.push({id:s.id+':'+r+':'+j,sectionId:s.id,row:r,number:j,x:n[0]*d+t[0]*v,z:n[1]*d+t[1]*v,y:.12});}s.rowSeats.push(row);s.seats.push(...row);}
 }
 return s;
}

sections.forEach(populate);
for(const raw of standData){const {label,tier,poly}=raw,s={id:'stand:'+label,label,tier,type:'stand',side:'stand',estimated:true,poly,cx:poly.reduce((a,p)=>a+p[0],0)/poly.length,cz:poly.reduce((a,p)=>a+p[1],0)/poly.length,rows:raw.rowSeats.length};
 s.rowSeats=raw.rowSeats.map((row,i)=>row.map(([x,z,y,sourceNumber,sourceIndex],j)=>({id:s.id+':'+(i+1)+':'+(j+1),sectionId:s.id,row:i+1,number:j+1,x,z,y,sourceNumber,sourceIndex})));
 s.seats=s.rowSeats.flat();s.y=Math.min(...s.seats.map(s=>s.y));sections.push(s);
}
export const sectionById=new Map(sections.map(s=>[s.id,s]));
export const allSeats=sections.flatMap(s=>s.seats);
export function getSeat(id,row,number){const s=sectionById.get(id);return s?.rowSeats[row-1]?.[number-1]||null;}
export function getSelection(params){const id=params.get('section')||'floor:C4',s=sectionById.get(id)||sectionById.get('floor:C4');const row=Math.max(1,Math.min(s.rows,parseInt(params.get('row'),10)||5)),number=Math.max(1,Math.min(s.rowSeats[row-1].length,parseInt(params.get('seat'),10)||8));return{section:s.id,row,seat:number,song:Object.hasOwn(songs,params.get('song'))?params.get('song'):'center',phase:params.get('phase')==='1'?1:0,member:Math.max(0,Math.min(7,parseInt(params.get('member'),10)||0))};}
export function polygonContains(poly,x,z){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;}
