import{q as _,r as x,j as s,d as y}from"./app-nCXZzFNg.js";import{T as N}from"./TextInput-VI-YMmhl.js";import{X as v}from"./XMarkIcon-FFXCJTey.js";import{U as b}from"./UserCircleIcon-i5yCOVII.js";function D({setIsPanelKandidat:h,model:l,judul:p}){const{partai:c,dapil:f,tahun:d}=_().props,[n,o]=x.useState([{id:"",nama_partai:"",calons:[{id:"",foto:"",user:{name:""},calontpsuaras:{id:"",jlh_suara_tps:""}}]}]);x.useEffect(()=>{if(l.id){async function e(){await fetch(route("inputsuara.kandidat",{partai:c,tahun:d,dapil:f.id,tpsuara:l.id})).then(t=>t.json()).then(t=>{const a=t.dataKandidat.map(r=>({nama_partai:r.nama_partai,logo:r.logo,calons:[...r.calons.map(i=>{var m,u;return{...i,calon_id:(m=i.calontpsuaras)==null?void 0:m.calon_id,jlh_suara_tps:((u=i.calontpsuaras)==null?void 0:u.jlh_suara_tps)||""}})]}));o(a)})}e()}},[l.id]);const j=()=>{h(!1)},g=(e,t,a)=>{let r=[...n];r[e].calons[t][a.target.name]=a.target.value,o(r)};return s.jsx(s.Fragment,{children:s.jsxs("div",{className:"flex-1 overflow-y-auto py-4 px-4 sm:px-6",children:[s.jsxs("div",{className:"flex items-start justify-between",children:[s.jsx("h3",{className:"text-lg font-medium text-gray-900",children:p}),s.jsx("div",{className:"ml-3 flex h-7 items-center",children:s.jsxs("button",{type:"button",className:"-m-2 p-2 text-gray-400 hover:text-gray-500",onClick:()=>j(),children:[s.jsx("span",{className:"sr-only",children:"Close panel"}),s.jsx(v,{className:"h-6 w-6","aria-hidden":"true"})]})})]}),s.jsxs("span",{className:"text-sm font-normal text-gray-500",children:["Dari jumlah suara sah ",l.nama_tpsuara]}),s.jsx("hr",{className:"mt-2"}),s.jsx("div",{className:"py-4",children:s.jsx("div",{className:"flow-root",children:s.jsx("div",{className:"grid grid-cols-1 gap-2 divide-y",children:n==null?void 0:n.map((e,t)=>s.jsxs("div",{children:[s.jsxs("div",{className:"flex py-2 items-center",children:[s.jsx("div",{className:" truncate flex flex-1 flex-col min-w-0 text-base font-semibold",children:e.nama_partai}),s.jsx("img",{className:"h-16 w-16 flex-none rounded-md bg-gray-50",src:`/storage/${e.logo}`,alt:""})]}),s.jsx("div",{className:"ml-2 space-y-4 border-l-2 border-dashed",children:e==null?void 0:e.calons.map((a,r)=>s.jsxs("div",{className:"relative w-full",children:[s.jsx(b,{className:"h-7 w-7 absolute -top-0.5 z-10 -ml-3.5 text-gray-400"}),s.jsxs("div",{className:"ml-6",children:[s.jsx("h4",{className:"font-bold text-gray-800",children:a.user.name}),s.jsx("form",{children:s.jsxs("div",{class:"grid grid-cols-3 mt-2 gap-4 items-center",children:[s.jsx("div",{className:"text-gray-500 flex justify-end",children:"Jlh.Suara"}),s.jsx("div",{className:"max-w-screen-sm",children:s.jsx(N,{id:"jlh_suara_tps",type:"number",name:"jlh_suara_tps",value:a==null?void 0:a.jlh_suara_tps,className:"block w-full",autoComplete:"jlh_suara_tps",onChange:i=>g(t,r,i),required:!0})}),s.jsx("div",{className:"flex",children:s.jsx(y,{className:"inline-flex items-center px-4 py-2 bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150",method:"post",as:"button",href:route("inputsuara.storesuara",{partai:c,tahun:d}),data:{calon_id:a==null?void 0:a.id,tpsuara_id:l.id,jlh_suara_tps:a==null?void 0:a.jlh_suara_tps},children:s.jsx("span",{className:"text-white",children:"UPDATE"})})})]})})]})]},a.id))})]},t))})})})]})})}export{D as default};