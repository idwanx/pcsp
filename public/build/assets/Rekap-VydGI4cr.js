import{q as C,r as t,y as F,j as e,a as P}from"./app-uUVSNPES.js";import{A as D}from"./App-wdq27uX6.js";import{u as E,l as m}from"./usePrevious-mYs0hHnO.js";import I from"./SideBar-A9hdmu3g.js";import{S as A}from"./Select-5q1AahF3.js";import{A as R}from"./ArrowLeftCircleIcon-2Lq5UANl.js";import{U as j}from"./UsersIcon-MGNUkh6S.js";import{U}from"./UserCircleIcon-l5PLx7lO.js";import"./transition-vEcxNCpf.js";import"./dialog-tyCexP39.js";import"./XMarkIcon-0tfy3V0k.js";import"./Bars3Icon-unWwSI82.js";import"./UserIcon-0CTZX3rc.js";import"./ResponsiveSideBarLink-rWURwE2W.js";import"./ArrowRightIcon-UmeKIQgp.js";function B(){const{partai:n,tahun:u,pemilu:x,filtered:i,partais:c,dapils:g,totalpemilih:w}=C().props,[d,h]=t.useState([]),[o,p]=t.useState(null),y=()=>{window.history.back()};t.useEffect(()=>{if(o){async function l(){await fetch(route("rekapsuarapartai.getcalonpartai",{partai:o,tahun:u,pemilu:x.id,wilayah:i?i.wilayah:""})).then(a=>a.json()).then(a=>h(a.datacalon))}l()}},[o]);const s=w.reduce((l,a)=>l=l+a.total_pemilih,0),f=c.reduce((l,a)=>l=l+a.jumlah_suara,0),[r,N]=t.useState({wilayah:i.wilayah||""}),b=E(r),v=t.useCallback(m.debounce(l=>{F.get(route(route().current(),{partai:n,tahun:u,pemilu:x.id}),l,{replace:!0,preserveScroll:!0,preserveState:!0})},500),[]);t.useEffect(()=>{if(b){const l=Object.keys(m.pickBy(r)).length?m.pickBy(r):"";v(l)}},[r]);function _(l){const a=l.target.name,k=l.target.value;N($=>({...$,[a]:k})),h([]),p(null)}const S=l=>{p(l)};return e.jsxs(e.Fragment,{children:[e.jsx(P,{title:"Rekap Suara Partai"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-6 sm:gap-6",children:[e.jsx("div",{className:"hidden sm:w-1/5 lg:block md:hidden",children:e.jsx("div",{className:"space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden",children:e.jsx(I,{})})}),e.jsx("div",{className:"w-full lg:w-4/5 sm:w-full",children:e.jsxs("div",{className:"flex lg:gap-6 sm:gap-2 lg:p-0 p-2",children:[e.jsx("div",{className:"w-full shrink-0 lg:w-2/3 md:w-2/3",children:e.jsxs("div",{className:"space-y-3 bg-white shadow-sm sm:rounded-lg text-sm p-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:"focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600",children:"Rekapitulasi Suara Partai"}),e.jsx("button",{type:"button",onClick:()=>y(),children:e.jsx(R,{className:"w-7 h-7 text-gray-400 hover:text-purple-500"})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"flex items-center pt-4 justify-between w-full",children:[e.jsx("div",{className:"relative",children:e.jsxs(A,{id:"wilayah",name:"wilayah",className:"block w-full",value:r.wilayah,onChange:_,children:[e.jsx("option",{value:"",children:"Semua Dapil"}),g.map(l=>e.jsx("option",{value:l.id,children:l.nama_dapil},l.id))]})}),e.jsxs("div",{className:"flex tems-center text-base text-gray-600",children:["Total Pemilih: ",Number(s).toLocaleString("id-ID")]})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full table-fixed",children:[e.jsx("thead",{className:"uppercase text-xs rounded-t-lg bg-gray-100",children:e.jsxs("tr",{className:"text-center font-semibold text-gray-600 border-b",children:[e.jsx("th",{style:{width:"5%"},className:"p-3 text-center",children:"No"}),e.jsx("th",{style:{width:"45%"},className:"p-3 text-left",children:"Nama Partai"}),e.jsx("th",{style:{width:"20%"},className:"p-3 text-center",children:"Perolehan Suara"}),e.jsx("th",{style:{width:"20%"},className:"p-3 text-center",children:"Persentase"}),e.jsx("th",{style:{width:"10%"},className:"p-3 text-center",children:"Calon"})]})}),e.jsxs("tbody",{className:"text-gray-500",children:[c==null?void 0:c.map((l,a)=>e.jsxs("tr",{className:"border-b border-opacity-20 hover:bg-slate-50",children:[e.jsx("td",{className:"px-3 py-2 text-center font-medium",children:a+1}),e.jsx("td",{className:"px-3 py-2 text-left",children:e.jsxs("div",{className:"flex min-w-0 gap-x-4 items-center",children:[l.logo==null?e.jsx("img",{className:"h-14 w-14 flex-none rounded-md bg-gray-50",src:"/images/no-camera.png",alt:""}):e.jsx("img",{className:"h-14 w-14 flex-none rounded-md bg-gray-50",src:`/storage/${l.logo}`,alt:""}),e.jsx("div",{className:"min-w-0 flex-auto",children:e.jsx("p",{className:"text-base text-gray-600 leading-6",children:l.nama_partai})})]})}),e.jsx("td",{className:"px-3 py-2 text-center",children:l.jumlah_suara}),e.jsxs("td",{className:"px-3 py-2 text-center",children:[parseFloat(l.jumlah_suara/s*100).toFixed(2),"%"]}),e.jsx("td",{className:"px-3 py-2 text-center",children:e.jsx("button",{onClick:()=>S(l.alias),children:e.jsx(j,{className:"w-4 h-4 inline text-gray-600 -mt-0.5"})})})]},a)),e.jsxs("tr",{className:"border-b border-opacity-20 text-base font-semibold bg-slate-50",children:[e.jsx("td",{className:"px-3 py-2 text-center",colSpan:2,children:"Total"}),e.jsx("td",{className:"px-3 py-2 text-center",children:Number(f).toLocaleString("id-ID")}),e.jsxs("td",{className:"px-3 py-2 text-center",children:[parseFloat(f/s*100).toFixed(2),"%"]}),e.jsx("td",{className:"px-3 py-2 text-center"})]})]})]})})]})}),e.jsx("div",{className:"hidden md:block lg:w-1/3 md:w-1/3",children:e.jsx("div",{className:"space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden",children:e.jsx("div",{className:"flex",children:e.jsx("div",{className:"relative w-full overscroll-auto",children:e.jsx("div",{className:"relative bg-white py-2 rounded-lg border border-gray-200",children:e.jsxs("div",{className:"space-y-1.5",children:[e.jsx("div",{className:"sticky top-0 px-4",children:e.jsx("h3",{className:"text-lg font-medium text-gray-900",children:"Daftar Calon"})}),e.jsx("hr",{className:"mt-2"}),e.jsx("div",{className:"lg:h-[34rem] 2xl:h-[44rem] overflow-x-hidden overflow-y-auto pt-4 px-4",children:e.jsx("ul",{role:"list",className:"divide-y divide-gray-200",children:d.length>0?d.map((l,a)=>e.jsxs("li",{className:"flex py-3 items-center",children:[l.foto==null?e.jsx(U,{className:"w-16 h-16 stroke-gray-400 stroke-1 inline -mt-0.5"}):e.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:`/storage/${l.foto}`,alt:""}),e.jsxs("div",{className:"ml-4 flex flex-1 flex-col min-w-0",children:[e.jsxs("div",{className:"min-w-0 flex-auto",children:[e.jsx("div",{className:"flex justify-between text-md font-medium text-gray-600",children:e.jsx("h3",{className:"truncate max-w-readable",children:l.name})}),e.jsx("p",{className:"truncate text-xs text-gray-500 max-w-readable",children:l.nama_partai})]}),e.jsxs("div",{className:"flex items-center mt-2",children:[e.jsx("div",{className:"flex justify-center w-1/5 text-lg font-medium mr-0.5 text-gray-600",children:l.calontpsuaras_count}),e.jsxs("div",{className:"flex justify-center w-4/5",children:[e.jsx("div",{className:"flex items-center w-4/6 mr-2.5",children:e.jsx("div",{className:"overflow-hidden bg-gray-200 h-1.5 rounded-full w-full",children:l.warna=="merah"?e.jsx("span",{className:"h-full bg-red-600 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}}):l.warna=="rose"?e.jsx("span",{className:"h-full bg-rose-600 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}}):l.warna=="hijau"?e.jsx("span",{className:"h-full bg-green-600 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}}):l.warna=="orange"?e.jsx("span",{className:"h-full bg-orange-600 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}}):l.warna=="kuning"?e.jsx("span",{className:"h-full bg-yellow-500 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}}):l.warna=="biru"?e.jsx("span",{className:"h-full bg-blue-600 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}}):l.warna=="biru-langit"?e.jsx("span",{className:"h-full bg-sky-500 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}}):l.warna=="biru-tua"?e.jsx("span",{className:"h-full bg-blue-800 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}}):l.warna=="hitam"?e.jsx("span",{className:"h-full bg-gray-800 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}}):e.jsx("span",{className:"h-full bg-red-600 w-full block rounded-full",style:{width:`${l.calontpsuaras_count/s*100+"%"}`}})})}),e.jsxs("div",{className:"flex justify-center w-2/6 text-lg font-medium text-gray-600",children:[l.calontpsuaras_count&&s!==0?parseFloat(l.calontpsuaras_count/s*100).toFixed(2):0,"%"]})]})]})]})]},a)):e.jsxs("div",{children:["Silahkan klik ikon ",e.jsx(j,{className:"w-4 h-4 inline text-gray-600 -mt-0.5"})," pada tabel untuk melihat calon."]})})})]})})})})})})]})})]})]})}B.layout=n=>e.jsx(D,{children:n});export{B as default};
