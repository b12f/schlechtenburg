var a=Object.defineProperty,e=Object.prototype.hasOwnProperty,t=Object.getOwnPropertySymbols,l=Object.prototype.propertyIsEnumerable,r=(e,t,l)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[t]=l,s=(a,s)=>{for(var n in s||(s={}))e.call(s,n)&&r(a,n,s[n]);if(t)for(var n of t(s))l.call(s,n)&&r(a,n,s[n]);return a};import{d as n,m as o,s as i,r as d,k as c,w as u,a as p,S as f,b as v,n as m,F as b,e as y}from"./index.db295836.js";/* empty css              */var g=n({name:"sb-image-edit",model:o,props:{onUpdate:{type:null,default:()=>{}},data:{type:null,default:i}},setup(a){const e=d({src:a.data.src,alt:a.data.alt,description:a.data.description}),t=c(null);u((()=>a.data),(()=>{e.src=a.data.src,e.alt=a.data.alt,e.description=a.data.description}));const l=()=>{t.value&&t.value.click()},r=()=>{if(t.value&&t.value.files&&t.value.files.length){const e=new FileReader;e.addEventListener("load",(()=>{var t;const l=null==(t=null==e?void 0:e.result)?void 0:t.toString();if(!l)throw new Error("Couldn't load image src");a.onUpdate({src:l,alt:a.data.alt,description:a.data.description})})),e.readAsDataURL(t.value.files[0])}};return()=>p("figure",{class:"sb-image"},[p(f,null,{default:()=>[e.src?p(v,{onClick:l},{default:()=>[m("Select Image")]}):null,p("input",{type:"file",ref:t,style:"display: none;",onInput:r},null)]}),e.src?p(b,null,[p("img",{src:e.src,alt:e.alt,class:"sb-image__content"},null),p(y,{block:e.description,onUpdate:e=>{return t=e,void a.onUpdate(s(s({},a.data),{description:t}));var t}},null)]):p(v,{onClick:l},{default:()=>[m("Select Image")]})])}});export default g;
//# sourceMappingURL=edit.0b03ba30.js.map
