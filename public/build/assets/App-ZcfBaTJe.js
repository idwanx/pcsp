import{r as c,m as oe,j as l,d as S,q as ge}from"./app-7gaKABMg.js";import{l as L,o as b,O as ie,U as Q,y as q,s as je,u as he,d as H,C as V,p as xe,a as Ie,b as J,q as _}from"./transition-ulxZRUKJ.js";import{o as $e,y as Ne,I as ae,n as ke,h as Ee,T as Re,a as v,r as De,b as Se,M as le,D as ve,c as Fe,_ as ue}from"./dialog-9OoJXFx6.js";import{X as Me}from"./XMarkIcon-9ztkdqCQ.js";import{T as Pe,A as Te,B as Ce}from"./Bars3Icon-8XhBvAH0.js";import{U as Ae}from"./UserCircleIcon-ref6GM4w.js";import{U as _e}from"./UserIcon-N0nPbNyZ.js";let Oe={data:""},Le=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Oe,Ue=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Be=/\/\*[^]*?\*\/|  +/g,ce=/\n+/g,R=(e,t)=>{let r="",s="",n="";for(let a in e){let i=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+i+";":s+=a[1]=="f"?R(i,a):a+"{"+R(i,a[1]=="k"?"":t)+"}":typeof i=="object"?s+=R(i,t?t.replace(/([^,])+/g,o=>a.replace(/(^:.*)|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,o):o?o+" "+u:u)):a):i!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=R.p?R.p(a,i):a+":"+i+";")}return r+(t&&n?t+"{"+n+"}":n)+s},$={},ye=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+ye(e[r]);return t}return e},ze=(e,t,r,s,n)=>{let a=ye(e),i=$[a]||($[a]=(u=>{let d=0,p=11;for(;d<u.length;)p=101*p+u.charCodeAt(d++)>>>0;return"go"+p})(a));if(!$[i]){let u=a!==e?e:(d=>{let p,g,f=[{}];for(;p=Ue.exec(d.replace(Be,""));)p[4]?f.shift():p[3]?(g=p[3].replace(ce," ").trim(),f.unshift(f[0][g]=f[0][g]||{})):f[0][p[1]]=p[2].replace(ce," ").trim();return f[0]})(e);$[i]=R(n?{["@keyframes "+i]:u}:u,r?"":"."+i)}let o=r&&$.g?$.g:null;return r&&($.g=$[i]),((u,d,p,g)=>{g?d.data=d.data.replace(g,u):d.data.indexOf(u)===-1&&(d.data=p?u+d.data:d.data+u)})($[i],t,s,o),i},He=(e,t,r)=>e.reduce((s,n,a)=>{let i=t[a];if(i&&i.call){let o=i(r),u=o&&o.props&&o.props.className||/^go/.test(o)&&o;i=u?"."+u:o&&typeof o=="object"?o.props?"":R(o,""):o===!1?"":o}return s+n+(i??"")},"");function W(e){let t=this||{},r=e.call?e(t.p):e;return ze(r.unshift?r.raw?He(r,[].slice.call(arguments,1),t.p):r.reduce((s,n)=>Object.assign(s,n&&n.call?n(t.p):n),{}):r,Le(t.target),t.g,t.o,t.k)}let be,ee,te;W.bind({g:1});let N=W.bind({k:1});function Ke(e,t,r,s){R.p=t,be=e,ee=r,te=s}function D(e,t){let r=this||{};return function(){let s=arguments;function n(a,i){let o=Object.assign({},a),u=o.className||n.className;r.p=Object.assign({theme:ee&&ee()},o),r.o=/ *go\d+/.test(u),o.className=W.apply(r,s)+(u?" "+u:""),t&&(o.ref=i);let d=e;return e[0]&&(d=o.as||e,delete o.as),te&&d[0]&&te(o),be(d,o)}return t?t(n):n}}var Qe=e=>typeof e=="function",K=(e,t)=>Qe(e)?e(t):e,qe=(()=>{let e=0;return()=>(++e).toString()})(),we=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Ve=20,U=new Map,We=1e3,de=e=>{if(U.has(e))return;let t=setTimeout(()=>{U.delete(e),F({type:4,toastId:e})},We);U.set(e,t)},Xe=e=>{let t=U.get(e);t&&clearTimeout(t)},re=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,Ve)};case 1:return t.toast.id&&Xe(t.toast.id),{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return e.toasts.find(a=>a.id===r.id)?re(e,{type:1,toast:r}):re(e,{type:0,toast:r});case 3:let{toastId:s}=t;return s?de(s):e.toasts.forEach(a=>{de(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===s||s===void 0?{...a,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+n}))}}},B=[],z={toasts:[],pausedAt:void 0},F=e=>{z=re(z,e),B.forEach(t=>{t(z)})},Ye={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ge=(e={})=>{let[t,r]=c.useState(z);c.useEffect(()=>(B.push(r),()=>{let n=B.indexOf(r);n>-1&&B.splice(n,1)}),[t]);let s=t.toasts.map(n=>{var a,i;return{...e,...e[n.type],...n,duration:n.duration||((a=e[n.type])==null?void 0:a.duration)||(e==null?void 0:e.duration)||Ye[n.type],style:{...e.style,...(i=e[n.type])==null?void 0:i.style,...n.style}}});return{...t,toasts:s}},Ze=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||qe()}),T=e=>(t,r)=>{let s=Ze(t,e,r);return F({type:2,toast:s}),s.id},w=(e,t)=>T("blank")(e,t);w.error=T("error");w.success=T("success");w.loading=T("loading");w.custom=T("custom");w.dismiss=e=>{F({type:3,toastId:e})};w.remove=e=>F({type:4,toastId:e});w.promise=(e,t,r)=>{let s=w.loading(t.loading,{...r,...r==null?void 0:r.loading});return e.then(n=>(w.success(K(t.success,n),{id:s,...r,...r==null?void 0:r.success}),n)).catch(n=>{w.error(K(t.error,n),{id:s,...r,...r==null?void 0:r.error})}),e};var Je=(e,t)=>{F({type:1,toast:{id:e,height:t}})},et=()=>{F({type:5,time:Date.now()})},tt=e=>{let{toasts:t,pausedAt:r}=Ge(e);c.useEffect(()=>{if(r)return;let a=Date.now(),i=t.map(o=>{if(o.duration===1/0)return;let u=(o.duration||0)+o.pauseDuration-(a-o.createdAt);if(u<0){o.visible&&w.dismiss(o.id);return}return setTimeout(()=>w.dismiss(o.id),u)});return()=>{i.forEach(o=>o&&clearTimeout(o))}},[t,r]);let s=c.useCallback(()=>{r&&F({type:6,time:Date.now()})},[r]),n=c.useCallback((a,i)=>{let{reverseOrder:o=!1,gutter:u=8,defaultPosition:d}=i||{},p=t.filter(h=>(h.position||d)===(a.position||d)&&h.height),g=p.findIndex(h=>h.id===a.id),f=p.filter((h,j)=>j<g&&h.visible).length;return p.filter(h=>h.visible).slice(...o?[f+1]:[0,f]).reduce((h,j)=>h+(j.height||0)+u,0)},[t]);return{toasts:t,handlers:{updateHeight:Je,startPause:et,endPause:s,calculateOffset:n}}},rt=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,at=N`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,st=N`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,nt=D("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${rt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${at} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${st} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ot=N`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,it=D("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ot} 1s linear infinite;
`,lt=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ut=N`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ct=D("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${lt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ut} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,dt=D("div")`
  position: absolute;
`,mt=D("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,pt=N`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ft=D("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${pt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,gt=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?c.createElement(ft,null,t):t:r==="blank"?null:c.createElement(mt,null,c.createElement(it,{...s}),r!=="loading"&&c.createElement(dt,null,r==="error"?c.createElement(nt,{...s}):c.createElement(ct,{...s})))},ht=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,xt=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,vt="0%{opacity:0;} 100%{opacity:1;}",yt="0%{opacity:1;} 100%{opacity:0;}",bt=D("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,wt=D("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,jt=(e,t)=>{let r=e.includes("top")?1:-1,[s,n]=we()?[vt,yt]:[ht(r),xt(r)];return{animation:t?`${N(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${N(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},It=c.memo(({toast:e,position:t,style:r,children:s})=>{let n=e.height?jt(e.position||t||"top-center",e.visible):{opacity:0},a=c.createElement(gt,{toast:e}),i=c.createElement(wt,{...e.ariaProps},K(e.message,e));return c.createElement(bt,{className:e.className,style:{...n,...r,...e.style}},typeof s=="function"?s({icon:a,message:i}):c.createElement(c.Fragment,null,a,i))});Ke(c.createElement);var $t=({id:e,className:t,style:r,onHeightUpdate:s,children:n})=>{let a=c.useCallback(i=>{if(i){let o=()=>{let u=i.getBoundingClientRect().height;s(e,u)};o(),new MutationObserver(o).observe(i,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return c.createElement("div",{ref:a,className:t,style:r},n)},Nt=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:we()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...n}},kt=W`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,O=16,Et=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:n,containerStyle:a,containerClassName:i})=>{let{toasts:o,handlers:u}=tt(r);return c.createElement("div",{style:{position:"fixed",zIndex:9999,top:O,left:O,right:O,bottom:O,pointerEvents:"none",...a},className:i,onMouseEnter:u.startPause,onMouseLeave:u.endPause},o.map(d=>{let p=d.position||t,g=u.calculateOffset(d,{reverseOrder:e,gutter:s,defaultPosition:t}),f=Nt(p,g);return c.createElement($t,{id:d.id,key:d.id,onHeightUpdate:u.updateHeight,className:d.visible?kt:"",style:f},d.type==="custom"?K(d.message,d):n?n(d):c.createElement(It,{toast:d,position:p}))}))},Rt=w;function me(e){return[e.screenX,e.screenY]}function Dt(){let e=c.useRef([-1,-1]);return{wasMoved(t){let r=me(t);return e.current[0]===r[0]&&e.current[1]===r[1]?!1:(e.current=r,!0)},update(t){e.current=me(t)}}}function St({container:e,accept:t,walk:r,enabled:s=!0}){let n=c.useRef(t),a=c.useRef(r);c.useEffect(()=>{n.current=t,a.current=r},[t,r]),L(()=>{if(!e||!s)return;let i=$e(e);if(!i)return;let o=n.current,u=a.current,d=Object.assign(g=>o(g),{acceptNode:o}),p=i.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,d,!1);for(;p.nextNode();)u(p.currentNode)},[e,s,n,a])}function Ft(e){throw new Error("Unexpected object: "+e)}var I=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(I||{});function Mt(e,t){let r=t.resolveItems();if(r.length<=0)return null;let s=t.resolveActiveIndex(),n=s??-1;switch(e.focus){case 0:{for(let a=0;a<r.length;++a)if(!t.resolveDisabled(r[a],a,r))return a;return s}case 1:{for(let a=n-1;a>=0;--a)if(!t.resolveDisabled(r[a],a,r))return a;return s}case 2:{for(let a=n+1;a<r.length;++a)if(!t.resolveDisabled(r[a],a,r))return a;return s}case 3:{for(let a=r.length-1;a>=0;--a)if(!t.resolveDisabled(r[a],a,r))return a;return s}case 4:{for(let a=0;a<r.length;++a)if(t.resolveId(r[a],a,r)===e.id)return a;return s}case 5:return null;default:Ft(e)}}let pe=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function fe(e){var t,r;let s=(t=e.innerText)!=null?t:"",n=e.cloneNode(!0);if(!(n instanceof HTMLElement))return s;let a=!1;for(let o of n.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))o.remove(),a=!0;let i=a?(r=n.innerText)!=null?r:"":s;return pe.test(i)&&(i=i.replace(pe,"")),i}function Pt(e){let t=e.getAttribute("aria-label");if(typeof t=="string")return t.trim();let r=e.getAttribute("aria-labelledby");if(r){let s=r.split(" ").map(n=>{let a=document.getElementById(n);if(a){let i=a.getAttribute("aria-label");return typeof i=="string"?i.trim():fe(a).trim()}return null}).filter(Boolean);if(s.length>0)return s.join(", ")}return fe(e).trim()}function Tt(e){let t=c.useRef(""),r=c.useRef("");return b(()=>{let s=e.current;if(!s)return"";let n=s.innerText;if(t.current===n)return r.current;let a=Pt(s).trim().toLowerCase();return t.current=n,r.current=a,a})}var Ct=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Ct||{}),At=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(At||{}),_t=(e=>(e[e.OpenMenu=0]="OpenMenu",e[e.CloseMenu=1]="CloseMenu",e[e.GoToItem=2]="GoToItem",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.RegisterItem=5]="RegisterItem",e[e.UnregisterItem=6]="UnregisterItem",e))(_t||{});function G(e,t=r=>r){let r=e.activeItemIndex!==null?e.items[e.activeItemIndex]:null,s=Fe(t(e.items.slice()),a=>a.dataRef.current.domRef.current),n=r?s.indexOf(r):null;return n===-1&&(n=null),{items:s,activeItemIndex:n}}let Ot={1(e){return e.menuState===1?e:{...e,activeItemIndex:null,menuState:1}},0(e){return e.menuState===0?e:{...e,__demoMode:!1,menuState:0}},2:(e,t)=>{var r;let s=G(e),n=Mt(t,{resolveItems:()=>s.items,resolveActiveIndex:()=>s.activeItemIndex,resolveId:a=>a.id,resolveDisabled:a=>a.dataRef.current.disabled});return{...e,...s,searchQuery:"",activeItemIndex:n,activationTrigger:(r=t.trigger)!=null?r:1}},3:(e,t)=>{let r=e.searchQuery!==""?0:1,s=e.searchQuery+t.value.toLowerCase(),n=(e.activeItemIndex!==null?e.items.slice(e.activeItemIndex+r).concat(e.items.slice(0,e.activeItemIndex+r)):e.items).find(i=>{var o;return((o=i.dataRef.current.textValue)==null?void 0:o.startsWith(s))&&!i.dataRef.current.disabled}),a=n?e.items.indexOf(n):-1;return a===-1||a===e.activeItemIndex?{...e,searchQuery:s}:{...e,searchQuery:s,activeItemIndex:a,activationTrigger:1}},4(e){return e.searchQuery===""?e:{...e,searchQuery:"",searchActiveItemIndex:null}},5:(e,t)=>{let r=G(e,s=>[...s,{id:t.id,dataRef:t.dataRef}]);return{...e,...r}},6:(e,t)=>{let r=G(e,s=>{let n=s.findIndex(a=>a.id===t.id);return n!==-1&&s.splice(n,1),s});return{...e,...r,activationTrigger:1}}},se=c.createContext(null);se.displayName="MenuContext";function X(e){let t=c.useContext(se);if(t===null){let r=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,X),r}return t}function Lt(e,t){return he(t.type,Ot,e,t)}let Ut=c.Fragment;function Bt(e,t){let{__demoMode:r=!1,...s}=e,n=c.useReducer(Lt,{__demoMode:r,menuState:r?0:1,buttonRef:c.createRef(),itemsRef:c.createRef(),items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1}),[{menuState:a,itemsRef:i,buttonRef:o},u]=n,d=q(t);Ne([o,i],(h,j)=>{var x;u({type:1}),Ee(j,Re.Loose)||(h.preventDefault(),(x=o.current)==null||x.focus())},a===0);let p=b(()=>{u({type:1})}),g=c.useMemo(()=>({open:a===0,close:p}),[a,p]),f={ref:d};return oe.createElement(se.Provider,{value:n},oe.createElement(je,{value:he(a,{0:H.Open,1:H.Closed})},V({ourProps:f,theirProps:s,slot:g,defaultTag:Ut,name:"Menu"})))}let zt="button";function Ht(e,t){var r;let s=ae(),{id:n=`headlessui-menu-button-${s}`,...a}=e,[i,o]=X("Menu.Button"),u=q(i.buttonRef,t),d=xe(),p=b(x=>{switch(x.key){case v.Space:case v.Enter:case v.ArrowDown:x.preventDefault(),x.stopPropagation(),o({type:0}),d.nextFrame(()=>o({type:2,focus:I.First}));break;case v.ArrowUp:x.preventDefault(),x.stopPropagation(),o({type:0}),d.nextFrame(()=>o({type:2,focus:I.Last}));break}}),g=b(x=>{switch(x.key){case v.Space:x.preventDefault();break}}),f=b(x=>{if(De(x.currentTarget))return x.preventDefault();e.disabled||(i.menuState===0?(o({type:1}),d.nextFrame(()=>{var k;return(k=i.buttonRef.current)==null?void 0:k.focus({preventScroll:!0})})):(x.preventDefault(),o({type:0})))}),h=c.useMemo(()=>({open:i.menuState===0}),[i]),j={ref:u,id:n,type:Pe(e,i.buttonRef),"aria-haspopup":"menu","aria-controls":(r=i.itemsRef.current)==null?void 0:r.id,"aria-expanded":i.menuState===0,onKeyDown:p,onKeyUp:g,onClick:f};return V({ourProps:j,theirProps:a,slot:h,defaultTag:zt,name:"Menu.Button"})}let Kt="div",Qt=ie.RenderStrategy|ie.Static;function qt(e,t){var r,s;let n=ae(),{id:a=`headlessui-menu-items-${n}`,...i}=e,[o,u]=X("Menu.Items"),d=q(o.itemsRef,t),p=ke(o.itemsRef),g=xe(),f=Ie(),h=f!==null?(f&H.Open)===H.Open:o.menuState===0;c.useEffect(()=>{let m=o.itemsRef.current;m&&o.menuState===0&&m!==(p==null?void 0:p.activeElement)&&m.focus({preventScroll:!0})},[o.menuState,o.itemsRef,p]),St({container:o.itemsRef.current,enabled:o.menuState===0,accept(m){return m.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:m.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(m){m.setAttribute("role","none")}});let j=b(m=>{var P,A;switch(g.dispose(),m.key){case v.Space:if(o.searchQuery!=="")return m.preventDefault(),m.stopPropagation(),u({type:3,value:m.key});case v.Enter:if(m.preventDefault(),m.stopPropagation(),u({type:1}),o.activeItemIndex!==null){let{dataRef:y}=o.items[o.activeItemIndex];(A=(P=y.current)==null?void 0:P.domRef.current)==null||A.click()}ve(o.buttonRef.current);break;case v.ArrowDown:return m.preventDefault(),m.stopPropagation(),u({type:2,focus:I.Next});case v.ArrowUp:return m.preventDefault(),m.stopPropagation(),u({type:2,focus:I.Previous});case v.Home:case v.PageUp:return m.preventDefault(),m.stopPropagation(),u({type:2,focus:I.First});case v.End:case v.PageDown:return m.preventDefault(),m.stopPropagation(),u({type:2,focus:I.Last});case v.Escape:m.preventDefault(),m.stopPropagation(),u({type:1}),J().nextFrame(()=>{var y;return(y=o.buttonRef.current)==null?void 0:y.focus({preventScroll:!0})});break;case v.Tab:m.preventDefault(),m.stopPropagation(),u({type:1}),J().nextFrame(()=>{Se(o.buttonRef.current,m.shiftKey?le.Previous:le.Next)});break;default:m.key.length===1&&(u({type:3,value:m.key}),g.setTimeout(()=>u({type:4}),350));break}}),x=b(m=>{switch(m.key){case v.Space:m.preventDefault();break}}),k=c.useMemo(()=>({open:o.menuState===0}),[o]),C={"aria-activedescendant":o.activeItemIndex===null||(r=o.items[o.activeItemIndex])==null?void 0:r.id,"aria-labelledby":(s=o.buttonRef.current)==null?void 0:s.id,id:a,onKeyDown:j,onKeyUp:x,role:"menu",tabIndex:0,ref:d};return V({ourProps:C,theirProps:i,slot:k,defaultTag:Kt,features:Qt,visible:h,name:"Menu.Items"})}let Vt=c.Fragment;function Wt(e,t){let r=ae(),{id:s=`headlessui-menu-item-${r}`,disabled:n=!1,...a}=e,[i,o]=X("Menu.Item"),u=i.activeItemIndex!==null?i.items[i.activeItemIndex].id===s:!1,d=c.useRef(null),p=q(t,d);L(()=>{if(i.__demoMode||i.menuState!==0||!u||i.activationTrigger===0)return;let y=J();return y.requestAnimationFrame(()=>{var Y,ne;(ne=(Y=d.current)==null?void 0:Y.scrollIntoView)==null||ne.call(Y,{block:"nearest"})}),y.dispose},[i.__demoMode,d,u,i.menuState,i.activationTrigger,i.activeItemIndex]);let g=Tt(d),f=c.useRef({disabled:n,domRef:d,get textValue(){return g()}});L(()=>{f.current.disabled=n},[f,n]),L(()=>(o({type:5,id:s,dataRef:f}),()=>o({type:6,id:s})),[f,s]);let h=b(()=>{o({type:1})}),j=b(y=>{if(n)return y.preventDefault();o({type:1}),ve(i.buttonRef.current)}),x=b(()=>{if(n)return o({type:2,focus:I.Nothing});o({type:2,focus:I.Specific,id:s})}),k=Dt(),C=b(y=>k.update(y)),m=b(y=>{k.wasMoved(y)&&(n||u||o({type:2,focus:I.Specific,id:s,trigger:0}))}),P=b(y=>{k.wasMoved(y)&&(n||u&&o({type:2,focus:I.Nothing}))}),A=c.useMemo(()=>({active:u,disabled:n,close:h}),[u,n,h]);return V({ourProps:{id:s,ref:p,role:"menuitem",tabIndex:n===!0?void 0:-1,"aria-disabled":n===!0?!0:void 0,disabled:void 0,onClick:j,onFocus:x,onPointerEnter:C,onMouseEnter:C,onPointerMove:m,onMouseMove:m,onPointerLeave:P,onMouseLeave:P},theirProps:a,slot:A,defaultTag:Vt,name:"Menu.Item"})}let Xt=Q(Bt),Yt=Q(Ht),Gt=Q(qt),Zt=Q(Wt),M=Object.assign(Xt,{Button:Yt,Items:Gt,Item:Zt});function E({active:e=!1,className:t="",children:r,...s}){return l.jsx(S,{...s,className:"inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none "+(e?"border-gray-400 text-gray-900 focus:border-gray-700 ":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ")+t,children:r})}function Jt({title:e,titleId:t,...r},s){return c.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?c.createElement("title",{id:t},e):null,c.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"}))}const er=c.forwardRef(Jt),tr=er;function rr({title:e,titleId:t,...r},s){return c.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?c.createElement("title",{id:t},e):null,c.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"}))}const ar=c.forwardRef(rr),sr=ar,Z=({active:e=!1,className:t="",children:r,...s})=>l.jsx(S,{...s,className:`w-full flex items-start pl-3 pr-4 py-1 border-l-4 text-sm ${e?"border-gray-400 text-gray-700 bg-gray-100 focus:text-gray-800 focus:bg-gray-100 focus:border-gray-700":"border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"} text-base font-medium focus:outline-none transition duration-150 ease-in-out ${t}`,children:r});function nr(){const{auth:e,partai:t,tahun:r,jumlah_suara_global:s}=ge().props,[n,a]=c.useState(!1);return s.reduce((i,o)=>i=i+o.jlh_suara_masuk,0),l.jsxs("header",{className:"sticky top-0 z-10",children:[l.jsx(_.Root,{show:n,as:c.Fragment,children:l.jsxs(ue,{as:"div",className:"relative z-50 lg:hidden",onClose:a,children:[l.jsx(_.Child,{as:c.Fragment,enter:"transition-opacity ease-linear duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition-opacity ease-linear duration-300",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),l.jsx("div",{className:"fixed inset-0 z-40 flex",children:l.jsx(_.Child,{as:c.Fragment,enter:"transition ease-in-out duration-300 transform",enterFrom:"-translate-x-full",enterTo:"translate-x-0",leave:"transition ease-in-out duration-300 transform",leaveFrom:"translate-x-0",leaveTo:"-translate-x-full",children:l.jsxs(ue.Panel,{className:"relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl",children:[l.jsx("div",{className:"flex px-4 pb-2 pt-5",children:l.jsxs("button",{type:"button",className:"-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400",onClick:()=>a(!1),children:[l.jsx("span",{className:"sr-only",children:"Close menu"}),l.jsx(Me,{className:"h-6 w-6","aria-hidden":"true"})]})}),l.jsxs("div",{className:"space-y-6 py-2 pl-4",children:[l.jsx("div",{className:"flow-root",children:l.jsx("span",{className:"-m-2 block text-gray-500 text-sm",children:"MENU UTAMA"})}),l.jsx("div",{className:"flow-root",children:l.jsx(Z,{href:"#",className:"-m-2 block p-2 text-gray-600",children:"Dashboard idwan"})}),l.jsx("div",{className:"flow-root",children:l.jsx(Z,{href:"#",className:"-m-2 block p-2 text-gray-600",children:"Bos"})}),l.jsx("div",{className:"flow-root",children:l.jsx(Z,{href:"#",className:"-m-2 block p-2 text-gray-600",children:"Ijazah"})})]})]})})})]})}),l.jsx(Te,{as:"nav",className:"bg-white border-b border-gray-200",children:l.jsx("div",{className:"max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",children:l.jsxs("div",{className:"relative flex h-14 justify-between",children:[l.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center lg:hidden",children:l.jsxs("button",{type:"button",className:"rounded-md bg-white p-2 text-gray-400 lg:hidden",onClick:()=>a(!0),children:[l.jsx("span",{className:"sr-only",children:"Open menu"}),l.jsx(Ce,{className:"h-6 w-6","aria-hidden":"true"})]})}),l.jsxs("div",{className:"flex flex-1 items-center justify-center sm:items-stretch sm:justify-start",children:[l.jsxs("div",{className:"flex flex-shrink-0 items-center pr-8",children:[l.jsx(S,{href:"/",className:"block text-purple-600 lg:hidden",children:l.jsx("div",{className:"lg:mt-0 lg:col-span-5 lg:flex",children:l.jsx("img",{src:"/images/logo-bolsel.webp",width:30,height:16,alt:"hero image"})})}),l.jsx(S,{href:"/",className:"hidden text-purple-600 sm:block",children:l.jsx("div",{className:"hidden lg:mt-0 lg:block",children:l.jsx("img",{src:"/images/pdip-bolsel.png",width:105,height:10,alt:"hero image"})})})]}),l.jsxs("div",{className:"hidden space-x-6 sm:-my-px sm:ml-6 lg:flex",children:[e.user.largest_order.role_id=="1"?l.jsx(E,{href:route("dashboard.admin"),active:route().current("dashboard.admin"),children:"Dashboard"}):l.jsx(E,{href:route("dashboard.user",{partai:t,tahun:r}),active:route().current("dashboard.user"),children:"Dashboard"}),e.user.largest_order.role_id=="2"?l.jsx(E,{href:route("inputsuara.dashboard",{partai:t,tahun:r}),active:route().current("inputsuara.*"),children:"Input Suara"}):null,e.user.largest_order.role_id=="2"?l.jsx(E,{href:route("laporansuara.dashboard",{partai:t,tahun:r}),active:route().current("laporansuara.*"),children:"Laporan Suara"}):null,e.user.largest_order.role_id=="2"?l.jsx(E,{children:"Rekap Suara Partai"}):null,e.user.largest_order.role_id=="2"?l.jsx(E,{children:"Perolehan Kursi"}):null,e.user.largest_order.role_id=="5"?l.jsx(E,{href:route("laporsuara.dashboard",{partai:t,tahun:r}),active:route().current("laporsuara.*"),children:"Lapor Suara"}):null,e.user.largest_order.role_id==1?l.jsx(E,{href:route("datapemilu.pemilu"),active:route().current("datapemilu.*"),children:"Data Pemilu"}):null]})]}),l.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0",children:l.jsx("div",{className:"pl-2 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6",children:l.jsxs(M,{as:"div",className:"relative inline-block text-left",children:[l.jsx("div",{children:l.jsxs(M.Button,{className:"inline-flex w-full items-center rounded-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100",children:[l.jsx("div",{className:"uppercase hidden lg:block pr-2",children:e.user.name}),l.jsx(Ae,{className:"h-6 w-6","aria-hidden":"true"})]})}),l.jsx(_,{as:c.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:l.jsx(M.Items,{className:"absolute right-2 w-48 mt-1 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",children:l.jsxs("div",{className:"px-2 py-2",children:[l.jsx(M.Item,{children:({active:i})=>l.jsxs(S,{href:route("profile.edit"),className:`${i?"bg-gray-100 text-gray-700":"text-gray-500"} group flex w-full items-center rounded-md px-2 py-2 text-sm`,children:[l.jsx(_e,{className:"mr-2 w-4 h-4"}),"Profil"]})}),l.jsx(M.Item,{children:({active:i})=>l.jsxs(S,{href:route("password.edit"),className:`${i?"bg-gray-100 text-gray-700":"text-gray-500"} group flex w-full items-center rounded-md px-2 py-2 text-sm`,children:[l.jsx(sr,{className:"mr-2 w-4 h-4"}),"Ubah Password"]})}),l.jsx(M.Item,{children:({active:i})=>l.jsxs(S,{href:route("logout"),method:"post",as:"button",className:`${i?"bg-gray-100 text-gray-700":"text-gray-500"} group flex w-full items-center rounded-md px-2 py-2 text-sm`,children:[l.jsx(tr,{className:"mr-2 w-4 h-4"}),"Logout"]})})]})})})]})})})]})})})]})}function pr({children:e}){const{flash:t}=ge().props;return c.useEffect(()=>{t.type!=null&&t.message!=null&&t.type&&Rt[t.type](t.message)},[t]),l.jsxs("div",{className:"min-h-screen bg-gray-100 tracking-wide",children:[route().current("profile.edit")||route().current("password.edit")?null:l.jsx(nr,{}),l.jsx(Et,{position:"bottom-right"}),l.jsx("main",{children:l.jsx("div",{className:"mx-auto max-w-screen-2xl py-6 sm:px-2 lg:px-6 2xl:px-6",children:e})}),l.jsx("footer",{className:"mt-6 lg:mt-10 border-t border-gray-300",children:l.jsx("div",{className:"p-6",children:l.jsx("div",{className:"text-center",children:l.jsxs("span",{className:"block text-sm text-center text-gray-400",children:["Created ©",new Date().getFullYear()," by PCSP ™. ",l.jsx("br",{}),"Kabupaten Bolaang Mongondow Selatan."]})})})})]})}export{pr as A};
