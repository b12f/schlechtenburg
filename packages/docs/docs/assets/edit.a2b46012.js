var e=Object.defineProperty,n=Object.prototype.hasOwnProperty,i=Object.getOwnPropertySymbols,t=Object.prototype.propertyIsEnumerable,l=(n,i,t)=>i in n?e(n,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[i]=t,r=(e,r)=>{for(var a in r||(r={}))n.call(r,a)&&l(e,a,r[a]);if(i)for(var a of i(r))t.call(r,a)&&l(e,a,r[a]);return e};import{d as a,m as o,g as c,u as d,r as h,w as s,c as p,a as u,S as f,b,e as v,f as m,h as y,i as U}from"./index.db295836.js";/* empty css              */var k=a({name:"sb-layout-edit",model:o,props:{onUpdate:{type:null,default:()=>{}},data:{type:null,default:c}},setup(e){const{activate:n}=d(),i=h({orientation:e.data.orientation,children:[...e.data.children]});s((()=>e.data),(()=>{i.orientation=e.data.orientation,i.children=[...e.data.children]}));const t=p((()=>({"sb-layout":!0,[`sb-layout_${i.orientation}`]:!0}))),l=()=>{e.onUpdate({orientation:"vertical"===i.orientation?"horizontal":"vertical"})},a=t=>{console.log(a),i.children=[...i.children,t],e.onUpdate({children:[...i.children]}),n(t.id)},o=(t,l)=>{i.children=[...i.children.slice(0,t+1),l,...i.children.slice(t+1)],e.onUpdate({children:[...i.children]}),n(l.id)},c=t=>{i.children=[...i.children.slice(0,t),...i.children.slice(t+1)],e.onUpdate({children:[...i.children]});const l=Math.max(t-1,0);n(i.children[l].id)},k=e=>{const t=Math.max(Math.min(i.children.length-1,e),0);n(i.children[t].id)};return()=>u("div",{class:t.value},[u(f,null,{default:()=>[u(b,{type:"button",onClick:l},{default:()=>[i.orientation]})]}),...i.children.map(((n,t)=>u(v,m({key:n.id},{"data-order":t,block:n,onUpdate:t=>((n,t)=>{const l=i.children.indexOf(n);-1!==l&&e.onUpdate({children:[...i.children.slice(0,l),r(r({},n),t),...i.children.slice(l+1)]})})(n,t),onRemoveSelf:()=>c(t),onPrependBlock:e=>o(t-1,e),onAppendBlock:e=>o(t,e),onActivatePrevious:()=>k(t-1),onActivateNext:()=>k(t+1)}),{"context-toolbar":()=>u(y,{onMoveBackward:()=>(n=>{if(0===n)return;const t=i.children[n],l=i.children[n-1];i.children=[...i.children.slice(0,n-1),t,l,...i.children.slice(n+1)],e.onUpdate({children:[...i.children]})})(t),onMoveForward:()=>(n=>{if(n===i.children.length-1)return;const t=i.children[n],l=i.children[n+1];i.children=[...i.children.slice(0,n),l,t,...i.children.slice(n+2)],e.onUpdate({children:[...i.children]})})(t),onRemove:()=>c(t),orientation:i.orientation},null)}))),u(U,{onInsertBlock:a},null)])}});export default k;
//# sourceMappingURL=edit.a2b46012.js.map