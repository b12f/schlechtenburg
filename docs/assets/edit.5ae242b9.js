var a=Object.assign;import{k as e,m as n,b as t,l,n as o,o as u,u as s,p as i,q as r,s as p,t as d,S as v,v as c,x as f}from"./index.35b9a0ae.js";/* empty css              */import"./vendor.9babb3f5.js";var g=e({name:"sb-paragraph-edit",model:n,props:a(a({},t),{data:{type:null,default:l},onUpdate:{type:Function,default:()=>{}},onAppendBlock:{type:Function,default:()=>{}},onRemoveSelf:{type:Function,default:()=>{}},onActivateNext:{type:Function,default:()=>{}},onActivatePrevious:{type:Function,default:()=>{}}}),setup(a){const e=o({value:a.data.value,align:a.data.align,focused:!1}),n=u(null),{isActive:t,activate:g}=s(a.blockId),b=()=>{n.value&&t.value&&n.value.focus()};i((()=>{b(),n.value&&(n.value.innerHTML=e.value)})),r(t,b),r((()=>a.data),(()=>{e.value=a.data.value,e.align=a.data.align,n.value&&(n.value.innerHTML=e.value)}));const y=a=>{e.value=a.target.innerHTML},h=p((()=>({"sb-paragraph":!0,"sb-paragraph_focused":e.focused,[`sb-paragraph_align-${e.align}`]:!0}))),m=n=>{a.onUpdate({value:e.value,align:n.target.value})},A=()=>{e.focused=!0,g()},k=()=>{e.focused=!1,a.onUpdate({value:e.value,align:e.align})},w=e=>{if("Enter"===e.key&&!e.shiftKey){const n=""+ +new Date;a.onAppendBlock({id:n,name:"sb-paragraph",data:l()}),g(n),e.preventDefault()}},x=t=>{"Backspace"===t.key&&""===e.value&&a.onRemoveSelf();const l=window.getSelection().focusNode,o=Array.from(n.value.childNodes),u=o.indexOf(l);if(l===n.value||0===u||u===o.length-1)switch(t.key){case"ArrowDown":a.onActivateNext();break;case"ArrowUp":a.onActivatePrevious()}};return()=>d("div",{class:h.value},[d(v,null,{default:()=>[d(c,{value:e.align,onChange:m},{default:()=>[d("option",null,[f("left")]),d("option",null,[f("center")]),d("option",null,[f("right")])]})]}),d("p",{class:"sb-paragraph__input",ref:n,contenteditable:!0,onInput:y,onFocus:A,onBlur:k,onKeydown:w,onKeyup:x},null)])}});export default g;
