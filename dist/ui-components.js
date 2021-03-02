import{defineComponent as e,reactive as t,computed as o,html as i}from"./index.js";var a="/*! tailwindcss v2.0.3 | MIT License | https://tailwindcss.com*/\n\n/*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji}hr{height:0;color:inherit}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button}legend{padding:0}progress{vertical-align:baseline}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}button{background-color:transparent;background-image:none}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}fieldset,ol,ul{margin:0;padding:0}ol,ul{list-style:none}html{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{font-family:inherit;line-height:inherit}*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-moz-placeholder, textarea::-moz-placeholder{opacity:1;color:#9ca3af}input:-ms-input-placeholder, textarea:-ms-input-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{padding:0;line-height:inherit;color:inherit}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}.ce-container{width:100%}@media (min-width:640px){.ce-container{max-width:640px}}@media (min-width:768px){.ce-container{max-width:768px}}@media (min-width:1024px){.ce-container{max-width:1024px}}@media (min-width:1280px){.ce-container{max-width:1280px}}@media (min-width:1536px){.ce-container{max-width:1536px}}.ce-bg-black{--tw-bg-opacity:1;background-color:rgba(0,0,0,var(--tw-bg-opacity))}.ce-bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.ce-bg-gray-100{--tw-bg-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity))}.ce-rounded-none{border-radius:0}.ce-border-2{border-width:2px}.ce-border{border-width:1px}.ce-block{display:block}.ce-flex{display:flex}.ce-justify-between{justify-content:space-between}.ce-h-12{height:3rem}.ce-h-14{height:3.5rem}.ce-text-xs{font-size:.75rem;line-height:1rem}.ce-text-sm{font-size:.875rem;line-height:1.25rem}.ce--mx-px{margin-left:-1px;margin-right:-1px}.ce-mt-4{margin-top:1rem}.ce-opacity-60{opacity:.6}.ce-outline-none{outline:2px solid transparent;outline-offset:2px}.ce-p-4{padding:1rem}.ce-px-1{padding-left:.25rem;padding-right:.25rem}.ce-py-3{padding-top:.75rem;padding-bottom:.75rem}.ce-px-4{padding-left:1rem;padding-right:1rem}.ce-py-6{padding-top:1.5rem;padding-bottom:1.5rem}.ce-pr-2{padding-right:.5rem}.ce-pb-3{padding-bottom:.75rem}.ce-pl-4{padding-left:1rem}.ce-pt-6{padding-top:1.5rem}.ce-placeholder-gray-400::-moz-placeholder{--tw-placeholder-opacity:1;color:rgba(156,163,175,var(--tw-placeholder-opacity))}.ce-placeholder-gray-400:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgba(156,163,175,var(--tw-placeholder-opacity))}.ce-placeholder-gray-400::placeholder{--tw-placeholder-opacity:1;color:rgba(156,163,175,var(--tw-placeholder-opacity))}.ce-pointer-events-none{pointer-events:none}.ce-fixed{position:fixed}.ce-absolute{position:absolute}.ce-relative{position:relative}.ce-inset-0{top:0;right:0;bottom:0;left:0}.ce-left-3{left:.75rem}*{--tw-shadow:0 0 transparent}.ce-shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}*{--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,0.5);--tw-ring-offset-shadow:0 0 transparent;--tw-ring-shadow:0 0 transparent}.ce-text-gray-500{--tw-text-opacity:1;color:rgba(107,114,128,var(--tw-text-opacity))}.ce-text-gray-700{--tw-text-opacity:1;color:rgba(55,65,81,var(--tw-text-opacity))}.ce-text-gray-900{--tw-text-opacity:1;color:rgba(17,24,39,var(--tw-text-opacity))}.ce-select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-w-full{width:100%}.ce-z-50{z-index:50}.ce-transform{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.ce-origin-left{transform-origin:left}.ce-translate-y-4{--tw-translate-y:1rem}.ce--translate-y-1\\/2{--tw-translate-y:-50%}.ce-transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.ce-transition{transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.ce-duration-150,.ce-transition{transition-duration:.15s}@-webkit-keyframes ce-spin{to{transform:rotate(1turn)}}@keyframes ce-spin{to{transform:rotate(1turn)}}@-webkit-keyframes ce-ping{75%,to{transform:scale(2);opacity:0}}@keyframes ce-ping{75%,to{transform:scale(2);opacity:0}}@-webkit-keyframes ce-pulse{50%{opacity:.5}}@keyframes ce-pulse{50%{opacity:.5}}@-webkit-keyframes ce-bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@keyframes ce-bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}";!function(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===o&&i.firstChild?i.insertBefore(a,i.firstChild):i.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}(a);const r=()=>i`
  <style>
    ${a}
  </style>
`,n=({name:a="ui-input"}={name:"ui-input"})=>{e({name:a,setup:({props:e,refs:a,ctx:n})=>{const c=t({isFocused:!1,id:`id-${uuidv4()}`}),l=({target:e})=>{n.value=e.value},s=()=>{c.isFocused=!0},p=()=>{c.isFocused=!1},d=({code:e})=>{"Escape"===e&&a.input?.blur()},m=o((()=>!!e.value)),u=o((()=>{let t="";return c.isFocused||m.value?(t="ce--translate-y-1/2 ce-bg-white ce-text-xs",c.isFocused&&(t+=" ce-text-blue"),m.value&&(t+=" ce-text-gray-500")):t=e.placeholder?"ce--translate-y-1/2 ce-bg-white ce-text-xs ce-text-gray-700":"ce-text-gray-500 ce-translate-y-4 ce-text-sm",`ce-absolute ce-px-1 ce-transition-all ce-duration-150 ce-origin-left ce-transform ce-pointer-events-none ce-select-none ce-left-3 ${t}`})),b=o((()=>`ce-block ce-w-full ce-p-4 ce-text-gray-900 ce-placeholder-gray-400 ce-transition ce-duration-150 ce-rounded-none ce-outline-none ce-h-14 ce-hover:border-blue ${c.isFocused?"ce-border-2 ce-border-blue ce--mx-px":"ce-border"}`));return()=>i`
        ${r()}
        <div class="ce-relative">
          <label class=${u.value} for=${c.id}
            >${e.label}</label
          >
          <input
            id=${c.id}
            value=${e.value||(e.value="")}
            readonly=${e.readonly}
            oninput=${l}
            onfocus=${s}
            onblur=${p}
            onkeyup=${d}
            class=${b.value}
            type="text"
            autocomplete=${e.autocomplete}
            placeholder=${e.placeholder}
            ref=${e=>a.input=e}
          />
        </div>
      `},propDefs:["value","label","placeholder","autofocus","readonly","autocomplete"]})},c=({name:t="ui-dialog"}={name:"ui-dialog"})=>{e({name:t,setup:({slots:e,emit:t})=>()=>i`
        ${r()}
        <div class="ce-fixed ce-inset-0 ce-z-50" role="dialog">
          <div
            class="ce-fixed ce-inset-0 ce-bg-black ce-opacity-60"
            data-test="background"
            onclick=${()=>t(new Event("close"))}
          ></div>
          <div
            class="ce-container ce-fixed ce-bg-white ce-shadow-lg"
            style="left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: 600px; width: calc(100% - 2rem);"
          >
            ${e.header?i`
                  <header
                    class="ce-flex ce-itemsce-nter ce-justify-between ce-h-12 ce-py-3 ce-pl-4 ce-pr-2 ce-bg-gray-100 ce-lg:h-14 ce-lg:pr-3 ce-lg:pl-6 ce-lg:py-4"
                  >
                    <slot name="header"></slot>
                  </header>
                `:""}
            <main class="ce-px-4 ce-pt-6 ce-pb-3 ce-lg:px-6">
              <slot></slot>
            </main>
            ${e.footer?i`
                  <footer
                    class="ce-flex ce-justify-between ce-px-4 ce-py-6 ce-lg:px-6"
                  >
                    <slot name="footer"></slot>
                  </footer>
                `:""}
          </div>
        </div>
      `})};export{c as defineUiDialog,n as defineUiInput};
