import{_ as g,f as l,g as v,c as m,a,b as x,w,h as y,F as C,r as k,o as f,e as M}from"./index-C86FShNc.js";const P={class:"container bg-secondary py-2 my-2 mb-4"},S={"aria-label":"breadcrumb"},V={class:"breadcrumb m-0"},N={class:"breadcrumb-item fw-bold"},B={class:"container p-0 d-flex flex-column align-items-center justify-content-center"},D={class:"scratch-card-container mb-4"},I={key:0,id:"coupon-result",class:"text-primary fw-bold border border-2 border-primary"},R={__name:"couponsView",setup(F){const i=l(!1),c=l(!1),n=l(null);let s=null;const _=()=>{const t=n.value;s=t.getContext("2d"),s.fillStyle="#ccc",s.fillRect(0,0,t.width,t.height),s.globalCompositeOperation="destination-out"},p=t=>{c.value=!0,d(t)},d=t=>{if(!c.value)return;const e=t.offsetX,o=t.offsetY;s.beginPath(),s.arc(e,o,20,0,Math.PI*2),s.fill()},u=()=>{c.value=!1,b()&&(i.value=!0)},b=()=>{const t=n.value,o=s.getImageData(0,0,t.width,t.height).data;let h=0;for(let r=0;r<o.length;r+=4)o[r+3]===0&&h++;return h/(o.length/4)>.6};return v(()=>{_()}),(t,e)=>{const o=k("RouterLink");return f(),m(C,null,[a("div",P,[a("nav",S,[a("ol",V,[a("li",N,[x(o,{to:"/"},{default:w(()=>e[0]||(e[0]=[M("首頁")])),_:1})]),e[1]||(e[1]=a("li",{class:"breadcrumb-item fw-bold"},"庫彭",-1))])])]),a("div",B,[e[2]||(e[2]=a("h2",{class:"mb-4 text-primary fw-bold"},"請刮開灰色區塊",-1)),a("div",D,[a("canvas",{ref_key:"scratchCanvas",ref:n,id:"scratch-canvas",width:"300",height:"200",onMousedown:p,onMousemove:d,onMouseup:u,onMouseleave:u},null,544),i.value?(f(),m("div",I," 恭喜您獲得 神秘小禮物乙份 ")):y("",!0)])])],64)}}},E=g(R,[["__scopeId","data-v-a217e9ea"]]);export{E as default};