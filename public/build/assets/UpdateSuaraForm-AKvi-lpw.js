import{q as d,W as h,j as a}from"./app-Kvhz7Ctj.js";import{S as j}from"./SecondaryButton-Aqz1mQGB.js";import{P as g}from"./PrimaryButton-sCzcQVUm.js";import{I as f}from"./InputError-E-BZcTyw.js";import{T as N}from"./TextInput-aHB8RS30.js";function w({model:s,isClose:r,submitLabel:t,title:l}){const{partai:n,tahun:i}=d().props,{data:c,setData:u,put:x,processing:m,errors:o}=h({jlh_suara_tps:(s==null?void 0:s.jlh_suara_tps)||""}),p=e=>{e.preventDefault(),x(route("suaramasuk.updatesuara",{partai:n,tahun:i,calonTpsuara:s.id}),{preserveScroll:!0,onSuccess:()=>{r()}})};return a.jsx(a.Fragment,{children:a.jsxs("form",{onSubmit:p,noValidate:!0,children:[a.jsx("div",{className:"text-sm text-gray-500 p-4",children:a.jsxs("div",{className:"text-center sm:text-left",children:[a.jsx("h3",{className:"text-lg font-medium text-gray-900",children:l}),a.jsx("ul",{role:"list",className:"py-4",children:a.jsx("li",{className:"px-3 p-3 ring-1 ring-inset rounded-lg ring-gray-600/20",children:a.jsxs("div",{className:"flex gap-x-4",children:[s.calon.foto==null?a.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:"/images/no-camera.png",alt:""}):a.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:`/${s.calon.foto}`,alt:""}),a.jsxs("div",{className:"flex-1",children:[a.jsx("h3",{className:"text-base font-semibold tracking-tight text-gray-700",children:s.calon.user.name}),a.jsx("p",{className:"truncate text-sm text-gray-500 max-w-readables",children:s.calon.partai.nama_partai}),a.jsxs("p",{className:"truncate text-sm text-gray-500 max-w-readables",children:["No. Urut : ",s.calon.no_urut]}),a.jsxs("div",{className:"grid grid-cols-2 gap-2 items-center mt-2",children:[a.jsx("div",{children:"Jumlah Suara"}),a.jsx("div",{children:a.jsx(N,{id:"jlh_suara_tps",type:"number",name:"jlh_suara_tps",value:c.jlh_suara_tps,className:"mt-1 block w-full",autoComplete:"jlh_suara_tps",onChange:e=>u("jlh_suara_tps",e.target.value),required:!0})})]}),a.jsx("div",{className:"flex justify-end",children:a.jsx(f,{message:o.jlh_suara_tps,className:"mt-2"})})]})]})})})]})}),a.jsxs("div",{className:"flex items-end bg-slate-100 gap-4 px-4 py-3 flex-row-reverse sm:px-6",children:[a.jsx(g,{disabled:m,children:t}),a.jsx(j,{onClick:r,children:"Tutup"})]})]})})}export{w as default};
