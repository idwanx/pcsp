import{W as n,j as e,a as d}from"./app-TSjUULqf.js";import{G as u}from"./Guest-JJWFEMga.js";import{I as c}from"./InputError-EvsvhDIQ.js";import{P as x}from"./PrimaryButton-SK66DgoI.js";import{T as p}from"./TextInput-_QkEppkL.js";function f({status:s}){const{data:t,setData:r,post:o,processing:m,errors:l}=n({email:""}),i=a=>{a.preventDefault(),o(route("password.email"))};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Forgot Password"}),e.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),s&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:s}),e.jsxs("form",{onSubmit:i,children:[e.jsx(p,{id:"email",type:"email",name:"email",value:t.email,className:"mt-1 block w-full",isFocused:!0,onChange:a=>r("email",a.target.value)}),e.jsx(c,{message:l.email,className:"mt-2"}),e.jsx("div",{className:"flex items-center justify-end mt-4",children:e.jsx(x,{className:"ms-4",disabled:m,children:"Email Password Reset Link"})})]})]})}f.layout=s=>e.jsx(u,{children:s});export{f as default};