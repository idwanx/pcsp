import{r as a,j as e,a as k,y as S}from"./app-Aqjzc6CF.js";import{A}from"./App-gSIzqCcB.js";import{P as F}from"./Pagination-xJwOs6Yl.js";import{B as D}from"./ButtonIcon-vbEGvu2T.js";import{M as n,D as I}from"./DangerButton-cREkMhnX.js";import h from"./CalonForm-poFwW0OJ.js";import{S as P}from"./SecondaryButton-E1NPS_xZ.js";import U from"./SideBar-cYMvGxRE.js";import{E as B,P as T,T as E}from"./TrashIcon-SsgTM6ZX.js";import{A as _}from"./ArrowLeftCircleIcon-ubqvwAKQ.js";import{P as z}from"./PlusIcon-dYfC7ZeU.js";import"./transition-AqpBqBiH.js";import"./dialog-h_B5HId6.js";import"./XMarkIcon-P9BV13W3.js";import"./Bars3Icon-0MxBJYI_.js";import"./UserCircleIcon-lFAAEkXN.js";import"./UserIcon-6-7jw0Ma.js";import"./PrimaryButton-hv2woEUw.js";import"./InputLabel-9SAwwLC1.js";import"./InputError-iP711LBa.js";import"./TextInput-EFg_gZ9a.js";import"./Select-xn2oFODf.js";import"./FileInput-Vjmgti4G.js";import"./ResponsiveSideBarLink-sNOlK3oh.js";import"./ArrowLongRightIcon-Z17tmbgp.js";function L(l){const{data:f,meta:i}=l.calons,[t,r]=a.useState([]),[j,c]=a.useState(!1),[g,m]=a.useState(!1),[N,d]=a.useState(!1),y=s=>{r(s),c(!0)},x=()=>{c(!1)},b=s=>{r(s),m(!0)},p=()=>{m(!1)},w=s=>{r(s),d(!0)},o=()=>{d(!1)},v=()=>{S.delete(route("datapemilu.destroycalon",t.id),{preserveScroll:!0,onSuccess:()=>{o()}})},C=()=>{window.history.back()};return e.jsxs(e.Fragment,{children:[e.jsx(k,{title:"Pemilu"}),e.jsx(n,{isOpen:j,closeable:!1,onClose:x,size:"md",children:e.jsx(h,{isClose:x,model:t,submitLabel:"Tambah",title:"Tambah Calon"})}),e.jsx(n,{isOpen:g,closeable:!1,onClose:p,size:"md",children:e.jsx(h,{isClose:p,model:t,submitLabel:"Update",title:"Update Calon"})}),e.jsxs(n,{isOpen:N,closeable:!0,onClose:o,size:"sm",children:[e.jsx("div",{className:"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4",children:e.jsxs("div",{className:"sm:flex sm:items-start",children:[e.jsx("div",{className:"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",children:e.jsx(B,{className:"h-6 w-6 text-red-600","aria-hidden":"true"})}),e.jsxs("div",{className:"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left",children:[e.jsx("h3",{className:"text-lg font-medium text-gray-900",children:"Konfirmasi"}),e.jsx("div",{className:"mt-2",children:e.jsxs("p",{className:"text-sm text-gray-500",children:["Apakah anda yakin ",e.jsx("span",{className:"text-red-500",children:t.name})," akan dihapus?"]})})]})]})}),e.jsxs("div",{className:"bg-slate-100 gap-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6",children:[e.jsx(I,{onClick:v,children:"Hapus"}),e.jsx(P,{onClick:o,children:"Batal"})]})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-6 sm:gap-6",children:[e.jsx(U,{}),e.jsx("div",{className:"w-full lg:w-4/5 sm:w-full",children:e.jsx("div",{className:"flex lg:gap-6 sm:gap-2 lg:p-0 p-2",children:e.jsx("div",{className:"w-full shrink-0",children:e.jsxs("div",{className:"space-y-3 bg-white shadow-sm sm:rounded-lg text-sm p-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:"focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600",children:"Data Dapil"}),e.jsx("button",{type:"button",onClick:()=>C(),children:e.jsx(_,{className:"w-7 h-7 text-gray-400 hover:text-purple-500"})})]}),e.jsx("hr",{}),e.jsx("div",{className:"flex flex-col sm:flex-row lg:items-center pt-2 justify-end",children:e.jsxs(D,{onClick:y,children:[e.jsx(z,{className:"hidden sm:block h-5 w-5 text-gray-400 group-hover:text-purple-500 group-focus:text-purple-500"}),e.jsx("span",{className:"sm:hidden xs:block",children:"Tambah"})]})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full table-fixed",children:[e.jsx("thead",{className:"uppercase text-xs rounded-t-lg bg-gray-100",children:e.jsxs("tr",{className:"text-center font-semibold text-gray-600 border-b",children:[e.jsx("th",{style:{width:"10%"},className:"p-3 text-center",children:"No"}),e.jsx("th",{style:{width:"25%"},className:"p-3 text-left",children:"Nama Calon"}),e.jsx("th",{style:{width:"25%"},className:"p-3 text-left",children:"No. Urut"}),e.jsx("th",{style:{width:"25%"},className:"p-3 text-left",children:"Nama Partai"}),e.jsx("th",{style:{width:"20%"},className:"p-3 text-center",children:"Nama Dapil"}),e.jsx("th",{style:{width:"20%"},className:"p-3 text-center",children:"Nama Pemilu"}),e.jsx("th",{style:{width:"20%"},className:"p-3 text-center",children:"Aksi"})]})}),e.jsx("tbody",{className:"text-gray-500",children:f.map((s,u)=>e.jsxs("tr",{className:"border-b border-opacity-20 hover:bg-slate-50",children:[e.jsx("td",{className:"px-3 py-2 text-center font-medium",children:i.from+u}),e.jsx("td",{className:"px-3 py-2 text-left",children:e.jsxs("div",{className:"flex min-w-0 gap-x-4",children:[s.foto==null?e.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:"/images/no-camera.png",alt:""}):e.jsx("img",{className:"h-16 w-16 flex-none rounded-full bg-gray-50",src:`/${s.foto}`,alt:""}),e.jsx("div",{className:"min-w-0 flex-auto",children:e.jsx("p",{className:"text-sm leading-6",children:s.name})})]})}),e.jsx("td",{className:"px-3 py-2 text-left",children:s.no_urut}),e.jsx("td",{className:"px-3 py-2 text-left",children:s.nama_partai}),e.jsx("td",{className:"px-3 py-2 text-left",children:s.nama_dapil}),e.jsxs("td",{className:"px-3 py-2 text-center",children:[s.nama_pemilu," ",s.tahun]}),e.jsx("td",{className:"px-3 py-2 text-center",children:e.jsxs("div",{className:"flex gap-1 w-full justify-center",children:[e.jsx("button",{type:"button",className:"group inline-flex justify-center rounded-md px-1 py-1 text-sm font-medium hover:ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:bg-purple-50 focus:ring-purple-300 transition ease-in-out duration-150",onClick:()=>b(s),children:e.jsx(T,{className:"h-4 w-4 text-gray-400 group-hover:text-purple-500 group-focus:text-purple-500"})}),e.jsx("button",{type:"button",className:"group inline-flex justify-center rounded-md px-1 py-1 text-sm font-medium hover:ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:bg-purple-50 focus:ring-purple-300 transition ease-in-out duration-150",onClick:()=>w(s),children:e.jsx(E,{className:"h-4 w-4 text-gray-400 group-hover:text-purple-500 group-focus:text-purple-500"})})]})})]},u))})]})}),e.jsx("div",{className:"flex justify-center text-sm pt-6",children:e.jsx(F,{meta:i})})]})})})})]})]})}L.layout=l=>e.jsx(A,{children:l});export{L as default};