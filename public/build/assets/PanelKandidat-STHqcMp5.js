import{q as h,r as t,j as s}from"./app-Kvhz7Ctj.js";import"./TextInput-aHB8RS30.js";import{X as x}from"./XMarkIcon-0EW0DAC8.js";function w({setIsPanelKandidat:u,model:e,judul:n}){const{partai:c,tahun:o}=h().props,[r,i]=t.useState([]);t.useState([]),t.useEffect(()=>{if(e.id){async function l(){await fetch(route("laporansuara.kandidat",{partai:c,tahun:o,tpsuara:e.id})).then(a=>a.json()).then(a=>i(a.dataKandidat))}l()}},[e.id]);const f=()=>{u(!1)};return s.jsx(s.Fragment,{children:s.jsxs("div",{className:"flex-1 overflow-y-auto py-4 px-4 sm:px-6",children:[s.jsxs("div",{className:"flex items-start justify-between",children:[s.jsx("h3",{className:"text-lg font-medium text-gray-900",children:n}),s.jsx("div",{className:"ml-3 flex h-7 items-center",children:s.jsxs("button",{type:"button",className:"-m-2 p-2 text-gray-400 hover:text-gray-500",onClick:()=>f(),children:[s.jsx("span",{className:"sr-only",children:"Close panel"}),s.jsx(x,{className:"h-6 w-6","aria-hidden":"true"})]})})]}),s.jsxs("span",{className:"text-sm font-normal text-gray-500",children:["Dari jumlah suara sah ",e.nama_tpsuara]}),s.jsx("hr",{className:"mt-2"}),s.jsx("div",{className:"py-6",children:s.jsx("div",{className:"flow-root",children:s.jsx("ul",{role:"list",className:"divide-y divide-gray-200",children:r==null?void 0:r.map((l,a)=>s.jsxs("li",{className:"flex py-3 items-center",children:[l.foto==null?s.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:"/images/no-camera.png",alt:""}):s.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:`/${l.foto}`,alt:""}),s.jsxs("div",{className:"ml-4 flex flex-1 flex-col min-w-0",children:[s.jsxs("div",{className:"min-w-0 flex-auto",children:[s.jsx("div",{className:"flex justify-between text-md font-medium text-gray-600",children:s.jsx("h3",{className:"truncate max-w-readable",children:l.name})}),s.jsx("p",{className:"truncate text-xs text-gray-500 max-w-readable",children:l.nama_partai})]}),s.jsxs("div",{className:"flex items-center mt-1",children:[s.jsx("div",{className:"flex justify-center w-1/5 text-lg font-medium mr-0.5 text-gray-600",children:l.jlh_suara_tps}),s.jsxs("div",{className:"flex justify-center w-4/5 gap-2",children:[s.jsx("div",{className:"flex items-center w-4/6",children:s.jsx("div",{className:"overflow-hidden bg-gray-200 h-1.5 rounded-full w-full",children:l.warna=="merah"?s.jsx("span",{className:"h-full bg-red-600 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}}):l.warna=="rose"?s.jsx("span",{className:"h-full bg-rose-600 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}}):l.warna=="hijau"?s.jsx("span",{className:"h-full bg-green-600 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}}):l.warna=="orange"?s.jsx("span",{className:"h-full bg-orange-600 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}}):l.warna=="kuning"?s.jsx("span",{className:"h-full bg-yellow-500 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}}):l.warna=="biru"?s.jsx("span",{className:"h-full bg-blue-600 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}}):l.warna=="biru-langit"?s.jsx("span",{className:"h-full bg-sky-500 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}}):l.warna=="biru-tua"?s.jsx("span",{className:"h-full bg-blue-800 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}}):l.warna=="hitam"?s.jsx("span",{className:"h-full bg-gray-800 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}}):s.jsx("span",{className:"h-full bg-red-600 w-full block rounded-full",style:{width:`${l.jlh_suara_tps/e.calontpsuaras_count*100+"%"}`}})})}),s.jsxs("div",{className:"flex justify-center w-2/6 text-lg font-medium text-gray-600",children:[l.jlh_suara_tps&&e.calontpsuaras_count!==0?parseFloat(l.jlh_suara_tps/e.calontpsuaras_count*100).toFixed(2):0,"%"]})]})]})]})]},a))})})})]})})}export{w as default};
