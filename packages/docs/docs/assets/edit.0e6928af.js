var e=Object.defineProperty,n=Object.prototype.hasOwnProperty,i=Object.getOwnPropertySymbols,t=Object.prototype.propertyIsEnumerable,r=(n,i,t)=>i in n?e(n,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[i]=t,l=(e,l)=>{for(var a in l||(l={}))n.call(l,a)&&r(e,a,l[a]);if(i)for(var a of i(l))t.call(l,a)&&r(e,a,l[a]);return e};import{d as a,m as o,g as c,u as d,r as h,w as s,c as p,a as u,S as f,b,e as v,f as m,h as y,i as U}from"./index.2f19b693.js";/* empty css              */var k=a({name:"sb-layout-edit",model:o,props:{onUpdate:{type:Function,default:()=>{}},data:{type:null,default:c}},setup(e){const{activate:n}=d(),i=h({orientation:e.data.orientation,children:[...e.data.children]});s((()=>e.data),(()=>{i.orientation=e.data.orientation,i.children=[...e.data.children]}));const t=p((()=>({"sb-layout":!0,[`sb-layout_${i.orientation}`]:!0}))),r=()=>{e.onUpdate({orientation:"vertical"===i.orientation?"horizontal":"vertical"})},a=t=>{console.log(a),i.children=[...i.children,t],e.onUpdate({children:[...i.children]}),n(t.id)},o=(t,r)=>{i.children=[...i.children.slice(0,t+1),r,...i.children.slice(t+1)],e.onUpdate({children:[...i.children]}),n(r.id)},c=t=>{i.children=[...i.children.slice(0,t),...i.children.slice(t+1)],e.onUpdate({children:[...i.children]});const r=Math.max(t-1,0);n(i.children[r].id)},k=e=>{const t=Math.max(Math.min(i.children.length-1,e),0);n(i.children[t].id)};return()=>u("div",{class:t.value},[u(f,null,{default:()=>[u(b,{type:"button",onClick:r},{default:()=>[i.orientation]})]}),...i.children.map(((n,t)=>u(v,m({key:n.id},{"data-order":t,block:n,onUpdate:t=>((n,t)=>{const r=i.children.indexOf(n);-1!==r&&e.onUpdate({children:[...i.children.slice(0,r),l(l({},n),t),...i.children.slice(r+1)]})})(n,t),onRemoveSelf:()=>c(t),onPrependBlock:e=>o(t-1,e),onAppendBlock:e=>o(t,e),onActivatePrevious:()=>k(t-1),onActivateNext:()=>k(t+1)}),{"context-toolbar":()=>u(y,{onMoveBackward:()=>(n=>{if(0===n)return;const t=i.children[n],r=i.children[n-1];i.children=[...i.children.slice(0,n-1),t,r,...i.children.slice(n+1)],e.onUpdate({children:[...i.children]})})(t),onMoveForward:()=>(n=>{if(n===i.children.length-1)return;const t=i.children[n],r=i.children[n+1];i.children=[...i.children.slice(0,n),r,t,...i.children.slice(n+2)],e.onUpdate({children:[...i.children]})})(t),onRemove:()=>c(t),orientation:i.orientation},null)}))),u(U,{onInsertBlock:a},null)])}});export default k;
//# sourceMappingURL=edit.0e6928af.js.map
