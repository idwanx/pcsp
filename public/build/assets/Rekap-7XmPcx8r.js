import{q as I,r,y as F,j as e,a as L}from"./app-83AyuERe.js";import{A as P}from"./App-cUmvJ9wG.js";import{u as E,l as u}from"./usePrevious-RLoLkQsn.js";import A from"./SideBar-TTtMRYpt.js";import{S as R}from"./Select-GRYKle2R.js";import{A as U}from"./ArrowLeftCircleIcon-14wbY4mL.js";import{U as g}from"./UsersIcon-UrWx6SVe.js";import{U as B}from"./UserCircleIcon-bEe3yVPJ.js";import"./transition--5Zuqvfd.js";import"./dialog-0Wvf9AVi.js";import"./XMarkIcon-ZdrAVdC_.js";import"./Bars3Icon-tBWomh4J.js";import"./UserIcon-gc2rOCwy.js";import"./ResponsiveSideBarLink-irFcABOE.js";import"./ArrowRightIcon-bdIAz9iL.js";function q(){const{partai:n,tahun:m,pemilu:x,filtered:i,partais:t,dapils:w,totalpemilih:y}=I().props,[d,h]=r.useState([]),[o,p]=r.useState(null),N=()=>{window.history.back()};r.useEffect(()=>{if(o){async function s(){await fetch(route("rekapsuarapartai.getcalonpartai",{partai:o,tahun:m,pemilu:x.id,wilayah:i?i.wilayah:""})).then(l=>l.json()).then(l=>h(l.datacalon))}s()}},[o]);const a=y.reduce((s,l)=>s=s+l.total_pemilih,0),f=t.reduce((s,l)=>s=s+l.jumlah_suara,0),j=t.reduce((s,l)=>s=s+l.suara_partai,0),b=t.reduce((s,l)=>s=s+l.jumlah_suara+l.suara_partai,0),[c,v]=r.useState({wilayah:i.wilayah||""}),_=E(c),S=r.useCallback(u.debounce(s=>{F.get(route(route().current(),{partai:n,tahun:m,pemilu:x.id}),s,{replace:!0,preserveScroll:!0,preserveState:!0})},500),[]);r.useEffect(()=>{if(_){const s=Object.keys(u.pickBy(c)).length?u.pickBy(c):"";S(s)}},[c]);function k(s){const l=s.target.name,$=s.target.value;v(D=>({...D,[l]:$})),h([]),p(null)}const C=s=>{p(s)};return e.jsxs(e.Fragment,{children:[e.jsx(L,{title:"Rekap Suara Partai"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-6 sm:gap-6",children:[e.jsx("div",{className:"hidden sm:w-1/5 lg:block md:hidden",children:e.jsx("div",{className:"space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden",children:e.jsx(A,{})})}),e.jsx("div",{className:"w-full lg:w-4/5 sm:w-full",children:e.jsxs("div",{className:"flex lg:gap-6 sm:gap-2 lg:p-0 p-2",children:[e.jsx("div",{className:"w-full shrink-0 lg:w-2/3 md:w-2/3",children:e.jsxs("div",{className:"space-y-3 bg-white shadow-sm sm:rounded-lg text-sm p-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:"focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600",children:"Rekapitulasi Suara Partai"}),e.jsx("button",{type:"button",onClick:()=>N(),children:e.jsx(U,{className:"w-7 h-7 text-gray-400 hover:text-purple-500"})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"flex items-center pt-4 justify-between w-full",children:[e.jsx("div",{className:"relative",children:e.jsxs(R,{id:"wilayah",name:"wilayah",className:"block w-full",value:c.wilayah,onChange:k,children:[e.jsx("option",{value:"",children:"Semua Dapil"}),w.map(s=>e.jsx("option",{value:s.id,children:s.nama_dapil},s.id))]})}),e.jsxs("div",{className:"flex tems-center text-base text-gray-600",children:["Total Pemilih: ",Number(a).toLocaleString("id-ID")]})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full table-fixed",children:[e.jsx("thead",{className:"uppercase text-xs rounded-t-lg bg-gray-100",children:e.jsxs("tr",{className:"text-center font-semibold text-gray-600 border-b",children:[e.jsx("th",{style:{width:"5%"},className:"p-3 text-center",children:"No"}),e.jsx("th",{style:{width:"36%"},className:"p-3 text-left",children:"Nama Partai"}),e.jsx("th",{style:{width:"13%"},className:"p-3 text-center",children:"Suara Calon"}),e.jsx("th",{style:{width:"13%"},className:"p-3 text-center",children:"Suara Partai"}),e.jsx("th",{style:{width:"13%"},className:"p-3 text-center",children:"Jumlah"}),e.jsx("th",{style:{width:"10%"},className:"p-3 text-center",children:"%"}),e.jsx("th",{style:{width:"10%"},className:"p-3 text-center",children:"Calon"})]})}),e.jsxs("tbody",{className:"text-gray-500",children:[t==null?void 0:t.map((s,l)=>e.jsxs("tr",{className:"border-b border-opacity-20 hover:bg-slate-50",children:[e.jsx("td",{className:"px-3 py-2 text-center font-medium",children:l+1}),e.jsx("td",{className:"px-3 py-2 text-left",children:e.jsxs("div",{className:"flex min-w-0 gap-x-4 items-center",children:[s.logo==null?e.jsx("img",{className:"h-14 w-14 flex-none rounded-md bg-gray-50",src:"/images/no-camera.png",alt:""}):e.jsx("img",{className:"h-14 w-14 flex-none rounded-md bg-gray-50",src:`/storage/${s.logo}`,alt:""}),e.jsx("div",{className:"min-w-0 flex-auto",children:e.jsx("p",{className:"text-base text-gray-600 leading-6",children:s.nama_partai})})]})}),e.jsx("td",{className:"px-3 py-2 text-center",children:Number(s.jumlah_suara).toLocaleString("id-ID")}),e.jsx("td",{className:"px-3 py-2 text-center",children:s.suara_partai}),e.jsx("td",{className:"px-3 py-2 text-center",children:Number(s.jumlah_suara+s.suara_partai).toLocaleString("id-ID")}),e.jsxs("td",{className:"px-3 py-2 text-center",children:[parseFloat((s.jumlah_suara+s.suara_partai)/a*100).toFixed(2),"%"]}),e.jsx("td",{className:"px-3 py-2 text-center",children:e.jsx("button",{onClick:()=>C(s.alias),children:e.jsx(g,{className:"w-4 h-4 inline text-gray-600 -mt-0.5"})})})]},l)),e.jsxs("tr",{className:"border-b border-opacity-20 text-base font-semibold bg-slate-50",children:[e.jsx("td",{className:"px-3 py-2 text-center",colSpan:2,children:"Total"}),e.jsx("td",{className:"px-3 py-2 text-center",children:Number(f).toLocaleString("id-ID")}),e.jsx("td",{className:"px-3 py-2 text-center",children:Number(j).toLocaleString("id-ID")}),e.jsx("td",{className:"px-3 py-2 text-center",children:Number(b).toLocaleString("id-ID")}),e.jsxs("td",{className:"px-3 py-2 text-center",children:[parseFloat((f+j)/a*100).toFixed(2),"%"]}),e.jsx("td",{className:"px-3 py-2 text-center"})]})]})]})})]})}),e.jsx("div",{className:"hidden md:block lg:w-1/3 md:w-1/3",children:e.jsx("div",{className:"space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden",children:e.jsx("div",{className:"flex",children:e.jsx("div",{className:"relative w-full overscroll-auto",children:e.jsx("div",{className:"relative bg-white py-2 rounded-lg border border-gray-200",children:e.jsxs("div",{className:"space-y-1.5",children:[e.jsx("div",{className:"sticky top-0 px-4",children:e.jsx("h3",{className:"text-lg font-medium text-gray-900",children:"Daftar Calon"})}),e.jsx("hr",{className:"mt-2"}),e.jsx("div",{className:"lg:h-[34rem] 2xl:h-[44rem] overflow-x-hidden overflow-y-auto pt-4 px-4",children:e.jsx("ul",{role:"list",className:"divide-y divide-gray-200",children:d.length>0?d.map((s,l)=>e.jsxs("li",{className:"flex py-3 items-center",children:[s.foto==null?e.jsx(B,{className:"w-16 h-16 stroke-gray-400 stroke-1 inline -mt-0.5"}):e.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:`/storage/${s.foto}`,alt:""}),e.jsxs("div",{className:"ml-4 flex flex-1 flex-col min-w-0",children:[e.jsxs("div",{className:"min-w-0 flex-auto",children:[e.jsx("div",{className:"flex justify-between text-md font-medium text-gray-600",children:e.jsx("h3",{className:"truncate max-w-readable",children:s.name})}),e.jsx("p",{className:"truncate text-xs text-gray-500 max-w-readable",children:s.nama_partai})]}),e.jsxs("div",{className:"flex items-center mt-2",children:[e.jsx("div",{className:"flex justify-center w-1/5 text-lg font-medium mr-0.5 text-gray-600",children:s.calontpsuaras_count}),e.jsxs("div",{className:"flex justify-center w-4/5",children:[e.jsx("div",{className:"flex items-center w-4/6 mr-2.5",children:e.jsx("div",{className:"overflow-hidden bg-gray-200 h-1.5 rounded-full w-full",children:s.warna=="merah"?e.jsx("span",{className:"h-full bg-red-600 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}}):s.warna=="rose"?e.jsx("span",{className:"h-full bg-rose-600 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}}):s.warna=="hijau"?e.jsx("span",{className:"h-full bg-green-600 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}}):s.warna=="orange"?e.jsx("span",{className:"h-full bg-orange-600 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}}):s.warna=="kuning"?e.jsx("span",{className:"h-full bg-yellow-500 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}}):s.warna=="biru"?e.jsx("span",{className:"h-full bg-blue-600 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}}):s.warna=="biru-langit"?e.jsx("span",{className:"h-full bg-sky-500 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}}):s.warna=="biru-tua"?e.jsx("span",{className:"h-full bg-blue-800 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}}):s.warna=="hitam"?e.jsx("span",{className:"h-full bg-gray-800 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}}):e.jsx("span",{className:"h-full bg-red-600 w-full block rounded-full",style:{width:`${s.calontpsuaras_count/a*100+"%"}`}})})}),e.jsxs("div",{className:"flex justify-center w-2/6 text-lg font-medium text-gray-600",children:[s.calontpsuaras_count&&a!==0?parseFloat(s.calontpsuaras_count/a*100).toFixed(2):0,"%"]})]})]})]})]},l)):e.jsxs("div",{children:["Silahkan klik ikon ",e.jsx(g,{className:"w-4 h-4 inline text-gray-600 -mt-0.5"})," pada tabel untuk melihat calon."]})})})]})})})})})})]})})]})]})}q.layout=n=>e.jsx(P,{children:n});export{q as default};
