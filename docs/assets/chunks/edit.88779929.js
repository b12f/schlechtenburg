var g=Object.defineProperty;var h=Object.getOwnPropertySymbols;var U=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable;var u=(a,c,e)=>c in a?g(a,c,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[c]=e,r=(a,c)=>{for(var e in c||(c={}))U.call(c,e)&&u(a,e,c[e]);if(h)for(var e of h(c))p.call(c,e)&&u(a,e,c[e]);return a};import{m as w,g as y,u as S,S as A,a as M,b as F,c as P,d as C}from"../index.md.f2252493.js";import"./style.b4010a05.js";import{k as D,g as I,w as O,e as N,l as o,F as R,m as z}from"../app.87539bc2.js";var j=D({name:"sb-layout-edit",model:w,props:{onUpdate:{type:null,default:()=>{}},data:{type:null,default:y}},setup(a){const{activate:c}=S(),e=I({orientation:a.data.orientation,children:[...a.data.children]});O(()=>a.data,()=>{e.orientation=a.data.orientation,e.children=[...a.data.children]});const m=N(()=>({"sb-layout":!0,[`sb-layout_${e.orientation}`]:!0})),v=()=>{a.onUpdate({orientation:e.orientation==="vertical"?"horizontal":"vertical"})},f=(t,n)=>{const l=e.children.indexOf(t);l!==-1&&a.onUpdate({children:[...e.children.slice(0,l),r(r({},t),n),...e.children.slice(l+1)]})},k=t=>{e.children=[...e.children,t],a.onUpdate({children:[...e.children]}),c(t.id)},i=(t,n)=>{e.children=[...e.children.slice(0,t+1),n,...e.children.slice(t+1)],a.onUpdate({children:[...e.children]}),c(n.id)},d=t=>{e.children=[...e.children.slice(0,t),...e.children.slice(t+1)],a.onUpdate({children:[...e.children]});const n=Math.max(t-1,0);c(e.children[n].id)},s=t=>{const n=Math.max(Math.min(e.children.length-1,t),0);c(e.children[n].id)},B=t=>{if(t===0)return;const n=e.children[t],l=e.children[t-1];e.children=[...e.children.slice(0,t-1),n,l,...e.children.slice(t+1)],a.onUpdate({children:[...e.children]})},b=t=>{if(t===e.children.length-1)return;const n=e.children[t],l=e.children[t+1];e.children=[...e.children.slice(0,t),l,n,...e.children.slice(t+2)],a.onUpdate({children:[...e.children]})};return()=>o("div",{class:m.value},[o(A,null,{default:()=>[o(M,{type:"button",onClick:v},{default:()=>[e.orientation]})]}),o(R,null,[...e.children.map((t,n)=>o(F,z({key:t.id},{"data-order":n,block:t,onUpdate:l=>f(t,l),onRemoveSelf:()=>d(n),onPrependBlock:l=>i(n-1,l),onAppendBlock:l=>i(n,l),onActivatePrevious:()=>s(n-1),onActivateNext:()=>s(n+1)}),{"context-toolbar":()=>o(P,{onMoveBackward:()=>B(n),onMoveForward:()=>b(n),onRemove:()=>d(n),orientation:e.orientation},null)}))]),o(C,{onInsertBlock:k},null)])}});export{j as default};