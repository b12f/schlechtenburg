var I=Object.defineProperty,T=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var b=(a,e,t)=>e in a?I(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,d=(a,e)=>{for(var t in e||(e={}))K.call(e,t)&&b(a,t,e[t]);if(p)for(var t of p(e))_.call(e,t)&&b(a,t,e[t]);return a},s=(a,e)=>T(a,U(e));import{m as L,e as M,u as C,S as H,f as y,h as F,i as P}from"../index.md.f2252493.js";import"./style.b4010a052.js";import{k as R,g as V,r as q,v as O,w as m,e as j,l,b as o}from"../app.87539bc2.js";var Q=R({name:"sb-heading-edit",model:L,props:{blockId:{type:String,required:!0},data:{type:null,default:M},onUpdate:{type:null,default:()=>{}},onAppendBlock:{type:null,default:()=>{}},onRemoveSelf:{type:null,default:()=>{}},onActivateNext:{type:null,default:()=>{}},onActivatePrevious:{type:null,default:()=>{}}},setup(a){const e=V({value:a.data.value,align:a.data.align,level:a.data.level,focused:!1}),t=q(null),{isActive:c,activate:v}=C(a.blockId),f=()=>{t.value&&c.value&&t.value.focus()};O(()=>{f(),t.value&&(t.value.innerHTML=e.value)}),m(c,f),m(()=>a.data,()=>{e.value=a.data.value,e.align=a.data.align,e.level=a.data.level,t.value&&(t.value.innerHTML=e.value)});const k=n=>{e.value=n.target.innerHTML},A=j(()=>({"sb-heading":!0,"sb-heading_focused":e.focused,[`sb-heading_align-${e.align}`]:!0,[`sb-heading_${e.level}`]:!0})),w=n=>{a.onUpdate(s(d({},e),{level:parseInt(n.target.value,10)}))},S=n=>{a.onUpdate(s(d({},e),{align:n.target.value}))},x=()=>{e.focused=!0,v()},D=()=>{e.focused=!1,a.onUpdate({value:e.value,align:e.align,level:e.level})},N=n=>{if(n.key==="Enter"&&!n.shiftKey){const u=F();a.onAppendBlock({id:u,name:"sb-paragraph",data:P()}),v(u),n.preventDefault()}},B=n=>{var h;n.key==="Backspace"&&e.value===""&&a.onRemoveSelf();const u=window.getSelection(),i=u==null?void 0:u.focusNode,r=Array.from(((h=t==null?void 0:t.value)==null?void 0:h.childNodes)||[]),g=i?r.indexOf(i):-1;if(i===t.value||g===0||g===r.length-1)switch(n.key){case"ArrowDown":a.onActivateNext();break;case"ArrowUp":a.onActivatePrevious();break}};return()=>l("div",{class:A.value},[l(H,null,{default:()=>[l(y,{value:e.level,onChange:w},{default:()=>[l("option",{value:1},[o("h1")]),l("option",{value:2},[o("h2")]),l("option",{value:3},[o("h3")]),l("option",{value:4},[o("h4")]),l("option",{value:5},[o("h5")]),l("option",{value:6},[o("h6")])]}),l(y,{value:e.align,onChange:S},{default:()=>[l("option",null,[o("left")]),l("option",null,[o("center")]),l("option",null,[o("right")])]})]}),l("p",{class:"sb-heading__input",ref:t,contenteditable:!0,onInput:k,onFocus:x,onBlur:D,onKeydown:N,onKeyup:B},null)])}});export{Q as default};