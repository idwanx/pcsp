import{q as j,W as g,j as a}from"./app-Wj5c25pV.js";import{S as f}from"./SecondaryButton-hzSWlfYA.js";import{P as _}from"./PrimaryButton-YGe2QJXt.js";import{I as N}from"./InputError-Vo60Khwi.js";import{T as v}from"./TextInput-AiikX2xt.js";function D({model:s,dataTps:e,isClose:t,submitLabel:n,title:i}){var l;const{partai:c,tahun:m}=j().props,{data:o,setData:u,post:x,processing:d,errors:p}=g({calon_id:s.id||"",tpsuara_id:e.id||0,jlh_suara_tps:((l=s.calontpsuaras)==null?void 0:l.jlh_suara_tps)||""}),h=r=>{r.preventDefault(),x(route("laporsuara.storesuara",{partai:c,tahun:m,tpsuara:e.id}),{preserveScroll:!0,onSuccess:()=>{t()}})};return a.jsx(a.Fragment,{children:a.jsxs("form",{onSubmit:h,children:[a.jsx("div",{className:"text-sm text-gray-500 p-4",children:a.jsxs("div",{className:"text-center sm:text-left",children:[a.jsx("h3",{className:"text-lg font-medium text-gray-900",children:i}),a.jsxs("p",{className:"",children:[e.nama_tpsuara," Desa ",e.nama_desa," Kec. ",e.nama_kecamatan]}),a.jsx("ul",{role:"list",className:"py-4",children:a.jsx("li",{className:"px-3 p-3 ring-1 ring-inset rounded-lg ring-gray-600/20",children:a.jsxs("div",{className:"flex gap-x-4",children:[s.foto==null?a.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:"/images/no-camera.png",alt:""}):a.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:`/storage/${s.foto}`,alt:""}),a.jsxs("div",{className:"flex-1",children:[a.jsx("h3",{className:"text-base font-semibold tracking-tight text-gray-700",children:s.name}),a.jsx("p",{className:"truncate text-sm text-gray-500 max-w-readables",children:s.nama_partai}),a.jsxs("p",{className:"truncate text-sm text-gray-500 max-w-readables",children:["No. Urut : ",s.no_urut]}),a.jsxs("div",{className:"grid grid-cols-2 gap-2 items-center mt-2",children:[a.jsx("div",{children:"Jumlah Suara"}),a.jsx("div",{children:a.jsx(v,{id:"jlh_suara_tps",type:"number",name:"jlh_suara_tps",value:o.jlh_suara_tps,className:"mt-1 block w-full",autoComplete:"jlh_suara_tps",onChange:r=>u("jlh_suara_tps",r.target.value),required:!0})})]}),a.jsx("div",{className:"flex justify-end",children:a.jsx(N,{message:p.jlh_suara_tps,className:"mt-2"})})]})]})})})]})}),a.jsxs("div",{className:"flex items-end bg-slate-100 gap-4 px-4 py-3 flex-row-reverse sm:px-6",children:[a.jsx(_,{disabled:d,children:n}),a.jsx(f,{onClick:t,children:"Tutup"})]})]})})}export{D as default};
