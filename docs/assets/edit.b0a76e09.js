import{j as a,m as e,k as n,l as t,n as l,u as o,o as u,p as i,q as s,s as r,S as d,t as p,v}from"./index.a48301fd.js";/* empty css              */import"./vendor.a029424f.js";var c=a({name:"sb-paragraph-edit",model:e,props:{blockId:{type:String,required:!0},data:{type:null,default:n},onUpdate:{type:Function,default:()=>{}},onAppendBlock:{type:Function,default:()=>{}},onRemoveSelf:{type:Function,default:()=>{}},onActivateNext:{type:Function,default:()=>{}},onActivatePrevious:{type:Function,default:()=>{}}},setup(a){const e=t({value:a.data.value,align:a.data.align,focused:!1}),c=l(null),{isActive:f,activate:g}=o(a.blockId),y=()=>{c.value&&f.value&&c.value.focus()};u((()=>{y(),c.value&&(c.value.innerHTML=e.value)})),i(f,y),i((()=>a.data),(()=>{e.value=a.data.value,e.align=a.data.align,c.value&&(c.value.innerHTML=e.value)}));const h=a=>{e.value=a.target.innerHTML},b=s((()=>({"sb-paragraph":!0,"sb-paragraph_focused":e.focused,[`sb-paragraph_align-${e.align}`]:!0}))),m=n=>{a.onUpdate({value:e.value,align:n.target.value})},k=()=>{e.focused=!0,g()},A=()=>{e.focused=!1,a.onUpdate({value:e.value,align:e.align})},w=e=>{if("Enter"===e.key&&!e.shiftKey){const t=""+ +new Date;a.onAppendBlock({id:t,name:"sb-paragraph",data:n()}),g(t),e.preventDefault()}},F=n=>{var t;"Backspace"===n.key&&""===e.value&&a.onRemoveSelf();const l=window.getSelection(),o=null==l?void 0:l.focusNode,u=Array.from((null==(t=null==c?void 0:c.value)?void 0:t.childNodes)||[]),i=o?u.indexOf(o):-1;if(o===c.value||0===i||i===u.length-1)switch(n.key){case"ArrowDown":a.onActivateNext();break;case"ArrowUp":a.onActivatePrevious()}};return()=>r("div",{class:b.value},[r(d,null,{default:()=>[r(p,{value:e.align,onChange:m},{default:()=>[r("option",null,[v("left")]),r("option",null,[v("center")]),r("option",null,[v("right")])]})]}),r("p",{class:"sb-paragraph__input",ref:c,contenteditable:!0,onInput:h,onFocus:k,onBlur:A,onKeydown:w,onKeyup:F},null)])}});export default c;
//# sourceMappingURL=edit.b0a76e09.js.map