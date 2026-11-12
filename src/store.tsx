import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import type {Product} from '../shared/catalog';
export type Line={productId:string;size:string;color:string;quantity:number};
export const money=(amount:number)=>new Intl.NumberFormat('en-BD',{style:'currency',currency:'BDT',maximumFractionDigits:0}).format(amount);
export async function api<T>(path:string,body?:unknown):Promise<T>{const response=await fetch(path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:undefined);const data=await response.json();if(!response.ok)throw new Error(data.error||'Unable to complete this request. Please try again.');return data;}
type Store={products:Product[];error:string;loading:boolean;lines:Line[];add:(line:Line)=>void;update:(index:number,quantity:number)=>void;clear:()=>void;notice:string};
const Context=createContext<Store>(null!);
export const useStore=()=>useContext(Context);
function savedBag():Line[]{try{const value=JSON.parse(localStorage.getItem('snowlite-bag')||'[]');return Array.isArray(value)?value.filter(x=>typeof x.productId==='string'&&typeof x.size==='string'&&typeof x.color==='string'&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=10):[];}catch{return [];}}
export function StoreProvider({children}:{children:ReactNode}){const[products,setProducts]=useState<Product[]>([]),[error,setError]=useState(''),[loading,setLoading]=useState(true),[lines,setLines]=useState<Line[]>(savedBag),[notice,setNotice]=useState('');
 useEffect(()=>{api<{products:Product[]}>('/api/products').then(x=>setProducts(x.products)).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[]);
 useEffect(()=>{try{localStorage.setItem('snowlite-bag',JSON.stringify(lines));}catch{setNotice('Your browser could not save this bag. Keep this page open.');}},[lines]);
 useEffect(()=>{if(notice){const timer=setTimeout(()=>setNotice(''),4500);return()=>clearTimeout(timer);}},[notice]);
 function add(line:Line){setLines(old=>{const index=old.findIndex(x=>x.productId===line.productId&&x.size===line.size&&x.color===line.color);if(index<0)return [...old,line];return old.map((x,i)=>i===index?{...x,quantity:Math.min(10,x.quantity+line.quantity)}:x);});setNotice('Added to your bag');}
 return <Context.Provider value={{products,error,loading,lines,add,update:(index,quantity)=>setLines(old=>old.flatMap((x,i)=>i!==index?[x]:quantity>0?[{...x,quantity:Math.min(10,quantity)}]:[])),clear:()=>setLines([]),notice}}>{children}</Context.Provider>;
}
