var e=Object.assign;import{d as n,m as i,b as l,g as t,u as a,r as d,w as r,c as o,a as c,S as s,e as h,f as p,h as u,i as v,j as b}from"./index.35b9a0ae.js";/* empty css              */import"./vendor.9babb3f5.js";var f=n({name:"sb-layout-edit",model:i,props:e(e({},l),{onUpdate:{type:Function,default:()=>{}},data:{type:null,default:t}}),setup(n){const{activate:i}=a(n.id),l=d({orientation:n.data.orientation,children:[...n.data.children]});r((()=>n.data),(()=>{l.orientation=n.data.orientation,l.children=[...n.data.children]}));const t=o((()=>({"sb-layout":!0,[`sb-layout_${l.orientation}`]:!0}))),f=()=>{console.log("toggle"),n.onUpdate({orientation:"vertical"===l.orientation?"horizontal":"vertical"})},m=e=>{l.children=[...l.children,e],n.onUpdate({children:[...l.children]}),i(e.id)},U=(e,t)=>{l.children=[...l.children.slice(0,e+1),t,...l.children.slice(e+1)],n.onUpdate({children:[...l.children]}),i(t.id)},y=e=>{l.children=[...l.children.slice(0,e),...l.children.slice(e+1)],n.onUpdate({children:[...l.children]});const t=Math.max(e-1,0);i(l.children[t].id)},g=e=>{const n=Math.max(Math.min(l.children.length-1,e),0);i(l.children[n].id)};return()=>c("div",{class:t.value},[c(s,null,{default:()=>[c(h,{type:"button",onClick:f},{default:()=>[l.orientation]})]}),...l.children.map(((i,t)=>c(p,u({key:i.id},{"data-order":t,block:i,onUpdate:t=>((i,t)=>{const a=l.children.indexOf(i);-1!==a&&n.onUpdate({children:[...l.children.slice(0,a),e(e({},i),t),...l.children.slice(a+1)]})})(i,t),onRemoveSelf:()=>y(t),onPrependBlock:e=>U(t-1,e),onAppendBlock:e=>U(t,e),onActivatePrevious:e=>g(t-1),onActivateNext:e=>g(t+1)}),{"context-toolbar":()=>c(v,{onMoveBackward:()=>(e=>{if(0===e)return;const i=l.children[e],t=l.children[e-1];l.children=[...l.children.slice(0,e-1),i,t,...l.children.slice(e+1)],n.onUpdate({children:[...l.children]})})(t),onMoveForward:()=>(e=>{if(e===l.children.length-1)return;const i=l.children[e],t=l.children[e+1];l.children=[...l.children.slice(0,e),t,i,...l.children.slice(e+2)],n.onUpdate({children:[...l.children]})})(t),onRemove:()=>y(t),sortable:n.sortable},null)}))),c(b,{onInsertBlock:m},null)])}});export default f;