var a=Object.assign;import{z as e,m as t,b as s,A as l,B as n,C as i,D as d,E as r,S as o,e as c,F as u,G as p,f}from"./index.35b9a0ae.js";/* empty css              */import"./vendor.9babb3f5.js";var m=e({name:"sb-image-edit",model:t,props:a(a({},s),{onUpdate:{type:Function,default:()=>{}},data:{type:null,default:l}}),setup(e){const t=n({src:e.data.src,alt:e.data.alt,description:e.data.description}),s=i(null);d((()=>e.data),(()=>{t.src=e.data.src,t.alt=e.data.alt,t.description=e.data.description}));const l=()=>{s.value&&s.value.click()},m=()=>{if(s.value&&s.value.files&&s.value.files.length){const a=new FileReader;a.addEventListener("load",(()=>{e.onUpdate({src:a.result,alt:e.data.alt,description:e.data.description})})),a.readAsDataURL(s.value.files[0])}};return()=>r("figure",{class:"sb-image"},[r(o,null,{default:()=>[t.src?r(c,{onClick:l},{default:()=>[u("Change Image")]}):null,r("input",{type:"file",ref:s,style:"display: none;",onInput:m},null)]}),t.src?r(p,null,[r("img",{src:t.src,alt:t.alt,class:"sb-image__content"},null),r(f,{block:t.description,onUpdate:t=>{return s=t,void e.onUpdate(a(a({},e.data),{description:s}));var s}},null)]):r(c,{onClick:l},{default:()=>[u("Select Image")]})])}});export default m;