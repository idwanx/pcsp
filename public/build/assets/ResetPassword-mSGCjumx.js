import{W as w,r as f,j as s,a as x}from"./app-Kvhz7Ctj.js";import{G as j}from"./Guest-uurSWE88.js";import{I as m}from"./InputError-E-BZcTyw.js";import{I as l}from"./InputLabel-zaOqqgQE.js";import{P as h}from"./PrimaryButton-sCzcQVUm.js";import{T as i}from"./TextInput-aHB8RS30.js";function v({token:e,email:n}){const{data:r,setData:o,post:d,processing:p,errors:t,reset:c}=w({token:e,email:n,password:"",password_confirmation:""});f.useEffect(()=>()=>{c("password","password_confirmation")},[]);const u=a=>{a.preventDefault(),d(route("password.store"))};return s.jsxs(s.Fragment,{children:[s.jsx(x,{title:"Reset Password"}),s.jsxs("form",{onSubmit:u,children:[s.jsxs("div",{children:[s.jsx(l,{htmlFor:"email",value:"Email"}),s.jsx(i,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",onChange:a=>o("email",a.target.value)}),s.jsx(m,{message:t.email,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(l,{htmlFor:"password",value:"Password"}),s.jsx(i,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"new-password",isFocused:!0,onChange:a=>o("password",a.target.value)}),s.jsx(m,{message:t.password,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(l,{htmlFor:"password_confirmation",value:"Confirm Password"}),s.jsx(i,{type:"password",name:"password_confirmation",value:r.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:a=>o("password_confirmation",a.target.value)}),s.jsx(m,{message:t.password_confirmation,className:"mt-2"})]}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(h,{className:"ms-4",disabled:p,children:"Reset Password"})})]})]})}v.layout=e=>s.jsx(j,{children:e});export{v as default};