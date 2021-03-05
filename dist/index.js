var e=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const t=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,n=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,r=/<[a-z][^>]+$/i,s=/>[^<>]*$/,o=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,i=/\s+$/,c=(e,t)=>0<t--&&(r.test(e[t])||!s.test(e[t])&&c(e,t)),l=(e,t,r)=>n.test(t)?e:`<${t}${r.replace(i,"")}></${t}>`;const{isArray:a}=Array,{indexOf:u,slice:h}=[],f=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;
/*! (c) Andrea Giammarchi - ISC */
var d=function(e){var t="fragment",n="template",r="content"in o(n)?function(e){var t=o(n);return t.innerHTML=e,t.content}:function(e){var r=o(t),i=o(n),c=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var l=RegExp.$1;i.innerHTML="<table>"+e+"</table>",c=i.querySelectorAll(l)}else i.innerHTML=e,c=i.childNodes;return s(r,c),r};return function(e,t){return("svg"===t?i:r)(e)};function s(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function o(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function i(e){var n=o(t),r=o("div");return r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",s(n,r.firstChild.childNodes),n}}(document);const p=({childNodes:e},t)=>e[t],_=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(u.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:v,importNode:g}=document,y=1!=g.length,w=y?(e,t,n)=>g.call(document,d(e,t,n),!0):d,m=y?e=>v.call(document,e,129,null,!1):e=>v.call(document,e,129),b=(e,t,n)=>((e,t,n,r,s)=>{const o=n.length;let i=t.length,c=o,l=0,a=0,u=null;for(;l<i||a<c;)if(i===l){const t=c<o?a?r(n[a-1],-0).nextSibling:r(n[c-a],0):s;for(;a<c;)e.insertBefore(r(n[a++],1),t)}else if(c===a)for(;l<i;)u&&u.has(t[l])||e.removeChild(r(t[l],-1)),l++;else if(t[l]===n[a])l++,a++;else if(t[i-1]===n[c-1])i--,c--;else if(t[l]===n[c-1]&&n[a]===t[i-1]){const s=r(t[--i],-1).nextSibling;e.insertBefore(r(n[a++],1),r(t[l++],-1).nextSibling),e.insertBefore(r(n[--c],1),s),t[i]=n[c]}else{if(!u){u=new Map;let e=a;for(;e<c;)u.set(n[e],e++)}if(u.has(t[l])){const s=u.get(t[l]);if(a<s&&s<c){let o=l,h=1;for(;++o<i&&o<c&&u.get(t[o])===s+h;)h++;if(h>s-a){const o=r(t[l],0);for(;a<s;)e.insertBefore(r(n[a++],1),o)}else e.replaceChild(r(n[a++],1),r(t[l++],-1))}else l++}else e.removeChild(r(t[l++],-1))}return n})(e.parentNode,t,n,f,e),k=(e,t)=>{switch(t[0]){case"?":return((e,t,n)=>r=>{n!==!!r&&((n=!!r)?e.setAttribute(t,""):e.removeAttribute(t))})(e,t.slice(1),!1);case".":return((e,t)=>"dataset"===t?(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e):n=>{e[t]=n})(e,t.slice(1));case"o":if("n"===t[1])return((e,t)=>{let n,r=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{const s=a(t)?t:[t,!1];n!==s[0]&&(n&&e.removeEventListener(r,n,s[1]),(n=s[0])&&e.addEventListener(r,n,s[1]))}})(e,t)}switch(t){case"ref":return(e=>t=>{"function"==typeof t?t(e):t.current=e})(e);case"aria":return(e=>t=>{for(const n in t){const r="role"===n?n:`aria-${n}`,s=t[n];null==s?e.removeAttribute(r):e.setAttribute(r,s)}})(e)}return((e,t)=>{let n,r=!0;const s=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?r||(e.removeAttributeNode(s),r=!0):(s.value=t,r&&(e.setAttributeNodeNS(s),r=!1)))}})(e,t)};function E(e){const{type:t,path:n}=e,r=n.reduceRight(p,this);return"node"===t?(e=>{let t,n,r=[];const s=o=>{switch(typeof o){case"string":case"number":case"boolean":t!==o&&(t=o,n?n.nodeValue=o:n=document.createTextNode(o),r=b(e,r,[n]));break;case"function":s(o(e));break;case"object":case"undefined":if(null==o){t!=o&&(t=o,r=b(e,r,[]));break}if(a(o)){t=o,0===o.length?r=b(e,r,[]):"object"==typeof o[0]?r=b(e,r,o):s(String(o));break}"ELEMENT_NODE"in o&&t!==o&&(t=o,r=b(e,r,11===o.nodeType?h.call(o.childNodes):[o]))}};return s})(r):"attr"===t?k(r,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(r)}const R=e(new WeakMap),S=/^(?:plaintext|script|style|textarea|title|xmp)$/i,x=(e,n)=>{const r=((e,n,r)=>{const s=[],{length:i}=e;for(let r=1;r<i;r++){const o=e[r-1];s.push(t.test(o)&&c(e,r)?o.replace(t,((e,t,s)=>`${n}${r-1}=${s||'"'}${t}${s?"":'"'}`)):`${o}\x3c!--${n}${r-1}--\x3e`)}s.push(e[i-1]);const a=s.join("").trim();return r?a:a.replace(o,l)})(n,"isµ","svg"===e),s=w(r,e),i=m(s),a=[],u=n.length-1;let h=0,f=`isµ${h}`;for(;h<u;){const e=i.nextNode();if(!e)throw`bad template: ${r}`;if(8===e.nodeType)e.nodeValue===f&&(a.push({type:"node",path:_(e)}),f="isµ"+ ++h);else{for(;e.hasAttribute(f);)a.push({type:"attr",path:_(e),name:e.getAttribute(f)}),e.removeAttribute(f),f="isµ"+ ++h;S.test(e.tagName)&&e.textContent.trim()===`\x3c!--${f}--\x3e`&&(e.textContent="",a.push({type:"text",path:_(e)}),f="isµ"+ ++h)}}return{content:s,nodes:a}},C=(e,t)=>{const{content:n,nodes:r}=R.get(t)||R.set(t,x(e,t)),s=g.call(document,n,!0);return{content:s,updates:r.map(E,s)}},M=(e,{type:t,template:n,values:r})=>{const{length:s}=r;N(e,r,s);let{entry:o}=e;o&&o.template===n&&o.type===t||(e.entry=o=((e,t)=>{const{content:n,updates:r}=C(e,t);return{type:e,template:t,content:n,updates:r,wire:null}})(t,n));const{content:i,updates:c,wire:l}=o;for(let e=0;e<s;e++)c[e](r[e]);return l||(o.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const r=h.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(r[t++])}return e}}})(i))},N=({stack:e},t,n)=>{for(let r=0;r<n;r++){const n=t[r];n instanceof O?t[r]=M(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):a(n)?N(e[r]||(e[r]={stack:[],entry:null,wire:null}),n,n.length):e[r]=null}n<e.length&&e.splice(n)};function O(e,t,n){this.type=e,this.template=t,this.values=n}const{create:A,defineProperties:$}=Object,j=t=>{const n=e(new WeakMap);return $(((e,...n)=>new O(t,e,n)),{for:{value(e,r){const s=n.get(e)||n.set(e,A(null));return s[r]||(s[r]=(e=>(n,...r)=>M(e,{type:t,template:n,values:r}))({stack:[],entry:null,wire:null}))}},node:{value:(e,...n)=>M({stack:[],entry:null,wire:null},{type:t,template:e,values:n}).valueOf()}})},T=e(new WeakMap),B=(e,t)=>{const n="function"==typeof t?t():t,r=T.get(e)||T.set(e,{stack:[],entry:null,wire:null}),s=n instanceof O?M(r,n):n;return s!==r.wire&&(r.wire=s,e.textContent="",e.appendChild(s.valueOf())),e},L=j("html"),P=j("svg"),z={},W=()=>{},D=Object.assign,U=Object.prototype.hasOwnProperty,H=(e,t)=>U.call(e,t),V=Array.isArray,q=e=>"[object Map]"===G(e),I=e=>"function"==typeof e,K=e=>"symbol"==typeof e,F=e=>null!==e&&"object"==typeof e,J=Object.prototype.toString,G=e=>J.call(e),Q=e=>"string"==typeof e&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,X=(e,t)=>e!==t&&(e==e||t==t),Y=new WeakMap,Z=[];let ee;const te=Symbol(""),ne=Symbol("");function re(e,t=z){(function(e){return e&&!0===e._isEffect})(e)&&(e=e.raw);const n=function(e,t){const n=function(){if(!n.active)return t.scheduler?void 0:e();if(!Z.includes(n)){ie(n);try{return ue(),Z.push(n),ee=n,e()}finally{Z.pop(),he(),ee=Z[Z.length-1]}}};return n.id=oe++,n.allowRecurse=!!t.allowRecurse,n._isEffect=!0,n.active=!0,n.raw=e,n.deps=[],n.options=t,n}(e,t);return t.lazy||n(),n}function se(e){e.active&&(ie(e),e.options.onStop&&e.options.onStop(),e.active=!1)}let oe=0;function ie(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let ce=!0;const le=[];function ae(){le.push(ce),ce=!1}function ue(){le.push(ce),ce=!0}function he(){const e=le.pop();ce=void 0===e||e}function fe(e,t,n){if(!ce||void 0===ee)return;let r=Y.get(e);r||Y.set(e,r=new Map);let s=r.get(n);s||r.set(n,s=new Set),s.has(ee)||(s.add(ee),ee.deps.push(s))}function de(e,t,n,r,s,o){const i=Y.get(e);if(!i)return;const c=new Set,l=e=>{e&&e.forEach((e=>{(e!==ee||e.allowRecurse)&&c.add(e)}))};if("clear"===t)i.forEach(l);else if("length"===n&&V(e))i.forEach(((e,t)=>{("length"===t||t>=r)&&l(e)}));else switch(void 0!==n&&l(i.get(n)),t){case"add":V(e)?Q(n)&&l(i.get("length")):(l(i.get(te)),q(e)&&l(i.get(ne)));break;case"delete":V(e)||(l(i.get(te)),q(e)&&l(i.get(ne)));break;case"set":q(e)&&l(i.get(te))}c.forEach((e=>{e.options.scheduler?e.options.scheduler(e):e()}))}const pe=new Set(Object.getOwnPropertyNames(Symbol).map((e=>Symbol[e])).filter(K)),_e=me(),ve=me(!1,!0),ge=me(!0),ye=me(!0,!0),we={};function me(e=!1,t=!1){return function(n,r,s){if("__v_isReactive"===r)return!e;if("__v_isReadonly"===r)return e;if("__v_raw"===r&&s===(e?Je:Fe).get(n))return n;const o=V(n);if(!e&&o&&H(we,r))return Reflect.get(we,r,s);const i=Reflect.get(n,r,s);if(K(r)?pe.has(r):"__proto__"===r||"__v_isRef"===r)return i;if(e||fe(n,0,r),t)return i;if(ct(i)){return!o||!Q(r)?i.value:i}return F(i)?e?Ye(i):Qe(i):i}}["includes","indexOf","lastIndexOf"].forEach((e=>{const t=Array.prototype[e];we[e]=function(...e){const n=st(this);for(let e=0,t=this.length;e<t;e++)fe(n,0,e+"");const r=t.apply(n,e);return-1===r||!1===r?t.apply(n,e.map(st)):r}})),["push","pop","shift","unshift","splice"].forEach((e=>{const t=Array.prototype[e];we[e]=function(...e){ae();const n=t.apply(this,e);return he(),n}}));function be(e=!1){return function(t,n,r,s){const o=t[n];if(!e&&(r=st(r),!V(t)&&ct(o)&&!ct(r)))return o.value=r,!0;const i=V(t)&&Q(n)?Number(n)<t.length:H(t,n),c=Reflect.set(t,n,r,s);return t===st(s)&&(i?X(r,o)&&de(t,"set",n,r):de(t,"add",n,r)),c}}const ke={get:_e,set:be(),deleteProperty:function(e,t){const n=H(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&de(e,"delete",t,void 0),r},has:function(e,t){const n=Reflect.has(e,t);return K(t)&&pe.has(t)||fe(e,0,t),n},ownKeys:function(e){return fe(e,0,V(e)?"length":te),Reflect.ownKeys(e)}},Ee={get:ge,set:(e,t)=>!0,deleteProperty:(e,t)=>!0},Re=D({},ke,{get:ve,set:be(!0)}),Se=D({},Ee,{get:ye}),xe=e=>F(e)?Qe(e):e,Ce=e=>F(e)?Ye(e):e,Me=e=>e,Ne=e=>Reflect.getPrototypeOf(e);function Oe(e,t,n=!1,r=!1){const s=st(e=e.__v_raw),o=st(t);t!==o&&!n&&fe(s,0,t),!n&&fe(s,0,o);const{has:i}=Ne(s),c=n?Ce:r?Me:xe;return i.call(s,t)?c(e.get(t)):i.call(s,o)?c(e.get(o)):void 0}function Ae(e,t=!1){const n=this.__v_raw,r=st(n),s=st(e);return e!==s&&!t&&fe(r,0,e),!t&&fe(r,0,s),e===s?n.has(e):n.has(e)||n.has(s)}function $e(e,t=!1){return e=e.__v_raw,!t&&fe(st(e),0,te),Reflect.get(e,"size",e)}function je(e){e=st(e);const t=st(this),n=Ne(t).has.call(t,e);return t.add(e),n||de(t,"add",e,e),this}function Te(e,t){t=st(t);const n=st(this),{has:r,get:s}=Ne(n);let o=r.call(n,e);o||(e=st(e),o=r.call(n,e));const i=s.call(n,e);return n.set(e,t),o?X(t,i)&&de(n,"set",e,t):de(n,"add",e,t),this}function Be(e){const t=st(this),{has:n,get:r}=Ne(t);let s=n.call(t,e);s||(e=st(e),s=n.call(t,e)),r&&r.call(t,e);const o=t.delete(e);return s&&de(t,"delete",e,void 0),o}function Le(){const e=st(this),t=0!==e.size,n=e.clear();return t&&de(e,"clear",void 0,void 0),n}function Pe(e,t){return function(n,r){const s=this,o=s.__v_raw,i=st(o),c=e?Ce:t?Me:xe;return!e&&fe(i,0,te),o.forEach(((e,t)=>n.call(r,c(e),c(t),s)))}}function ze(e,t,n){return function(...r){const s=this.__v_raw,o=st(s),i=q(o),c="entries"===e||e===Symbol.iterator&&i,l="keys"===e&&i,a=s[e](...r),u=t?Ce:n?Me:xe;return!t&&fe(o,0,l?ne:te),{next(){const{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:c?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function We(e){return function(...t){return"delete"!==e&&this}}const De={get(e){return Oe(this,e)},get size(){return $e(this)},has:Ae,add:je,set:Te,delete:Be,clear:Le,forEach:Pe(!1,!1)},Ue={get(e){return Oe(this,e,!1,!0)},get size(){return $e(this)},has:Ae,add:je,set:Te,delete:Be,clear:Le,forEach:Pe(!1,!0)},He={get(e){return Oe(this,e,!0)},get size(){return $e(this,!0)},has(e){return Ae.call(this,e,!0)},add:We("add"),set:We("set"),delete:We("delete"),clear:We("clear"),forEach:Pe(!0,!1)};function Ve(e,t){const n=t?Ue:e?He:De;return(t,r,s)=>"__v_isReactive"===r?!e:"__v_isReadonly"===r?e:"__v_raw"===r?t:Reflect.get(H(n,r)&&r in t?n:t,r,s)}["keys","values","entries",Symbol.iterator].forEach((e=>{De[e]=ze(e,!1,!1),He[e]=ze(e,!0,!1),Ue[e]=ze(e,!1,!0)}));const qe={get:Ve(!1,!1)},Ie={get:Ve(!1,!0)},Ke={get:Ve(!0,!1)},Fe=new WeakMap,Je=new WeakMap;function Ge(e){return e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}((e=>G(e).slice(8,-1))(e))}function Qe(e){return e&&e.__v_isReadonly?e:et(e,!1,ke,qe)}function Xe(e){return et(e,!1,Re,Ie)}function Ye(e){return et(e,!0,Ee,Ke)}function Ze(e){return et(e,!0,Se,Ke)}function et(e,t,n,r){if(!F(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const s=t?Je:Fe,o=s.get(e);if(o)return o;const i=Ge(e);if(0===i)return e;const c=new Proxy(e,2===i?r:n);return s.set(e,c),c}function tt(e){return nt(e)?tt(e.__v_raw):!(!e||!e.__v_isReactive)}function nt(e){return!(!e||!e.__v_isReadonly)}function rt(e){return tt(e)||nt(e)}function st(e){return e&&st(e.__v_raw)||e}function ot(e){return((e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})})(e,"__v_skip",!0),e}const it=e=>F(e)?Qe(e):e;function ct(e){return Boolean(e&&!0===e.__v_isRef)}function lt(e){return ht(e)}function at(e){return ht(e,!0)}class ut{constructor(e,t=!1){this._rawValue=e,this._shallow=t,this.__v_isRef=!0,this._value=t?e:it(e)}get value(){return fe(st(this),0,"value"),this._value}set value(e){X(st(e),this._rawValue)&&(this._rawValue=e,this._value=this._shallow?e:it(e),de(st(this),"set","value",e))}}function ht(e,t=!1){return ct(e)?e:new ut(e,t)}function ft(e){de(st(e),"set","value",void 0)}function dt(e){return ct(e)?e.value:e}const pt={get:(e,t,n)=>dt(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const s=e[t];return ct(s)&&!ct(n)?(s.value=n,!0):Reflect.set(e,t,n,r)}};function _t(e){return tt(e)?e:new Proxy(e,pt)}class vt{constructor(e){this.__v_isRef=!0;const{get:t,set:n}=e((()=>fe(this,0,"value")),(()=>de(this,"set","value")));this._get=t,this._set=n}get value(){return this._get()}set value(e){this._set(e)}}function gt(e){return new vt(e)}function yt(e){const t=V(e)?new Array(e.length):{};for(const n in e)t[n]=mt(e,n);return t}class wt{constructor(e,t){this._object=e,this._key=t,this.__v_isRef=!0}get value(){return this._object[this._key]}set value(e){this._object[this._key]=e}}function mt(e,t){return ct(e[t])?e[t]:new wt(e,t)}class bt{constructor(e,t,n){this._setter=t,this._dirty=!0,this.__v_isRef=!0,this.effect=re(e,{lazy:!0,scheduler:()=>{this._dirty||(this._dirty=!0,de(st(this),"set","value"))}}),this.__v_isReadonly=n}get value(){return this._dirty&&(this._value=this.effect(),this._dirty=!1),fe(st(this),0,"value"),this._value}set value(e){this._setter(e)}}function kt(e){let t,n;return I(e)?(t=e,n=W):(t=e.get,n=e.set),new bt(t,n,I(e)||!e.set)}let Et;const Rt=e=>t=>{Et&&(Et[e]||(Et[e]=[])).push(t)},St=e=>{e?.forEach((e=>e()))},xt=Rt("hookBeforeCreate"),Ct=Rt("hookCreated"),Mt=Rt("hookBeforeMount"),Nt=Rt("hookMounted"),Ot=Rt("hookBeforeUpdate"),At=Rt("hookUpdated"),$t=Rt("hookUnmounted"),jt=e=>t=>{e.dispatchEvent(t)},Tt=({name:e,setup:t,propDefs:n=[],useShadowDOM:r=!0})=>{customElements.define(e,class extends HTMLElement{static get observedAttributes(){return n}constructor(){super(),St(this.hookBeforeCreate),Et=this,St(this.hookCreated);const e=this.props=Qe({});n.forEach((e=>{Object.defineProperty(this,e,{get(){return this.props[e]},set(t){this.props[e]=t}})}));const s=r?this.slots=Qe({}):void 0,o=this.template=t.call(this,{props:e,ctx:this,emit:jt(this),refs:Qe({}),...s?{slots:s}:{}});this.useShadowDOM=r;const i=this.root=r?this.attachShadow({mode:"closed"}):this;this.render=()=>{B(i,o())},St(this.hookBeforeMount),this.isMounted=!1,this.effectCallback=()=>{this.isMounted&&St(this.hookBeforeUpdate),this.render(),this.isMounted?St(this.hookUpdated):this.mounted=!0},r&&re(this.effectCallback),Et=null}connectedCallback(){this.useShadowDOM||re(this.effectCallback),St(this.hookMounted),this.useShadowDOM&&this.querySelectorAll("[slot]").forEach((e=>{this.slots[e.getAttribute("slot")]=e}))}disconnectedCallback(){St(this.hookUnmounted)}attributeChangedCallback(e,t,n){let r;try{r=JSON.parse(n)}catch(e){r=n}this[e]=r}})};export{O as Hole,te as ITERATE_KEY,xt as beforeCreate,Mt as beforeMount,Ot as beforeUpdate,kt as computed,Ct as created,gt as customRef,Tt as defineComponent,re as effect,ue as enableTracking,L as html,rt as isProxy,tt as isReactive,nt as isReadonly,ct as isRef,ot as markRaw,Nt as mounted,ae as pauseTracking,_t as proxyRefs,Qe as reactive,Ye as readonly,lt as ref,B as render,he as resetTracking,Xe as shallowReactive,Ze as shallowReadonly,at as shallowRef,se as stop,P as svg,st as toRaw,mt as toRef,yt as toRefs,fe as track,de as trigger,ft as triggerRef,$t as unmounted,dt as unref,At as updated,jt as useEmit};
//# sourceMappingURL=index.js.map
