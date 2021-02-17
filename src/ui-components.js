import { defineComponent, reactive, computed, html } from "./index.js";

export const defineUiInput = ({
  name = "ui-input"
} = {
  name: "ui-input"
}) => {
  defineComponent({
    name,

    setup: ({ props, emit, refs, ctx }) => {
      const state = reactive({
        isFocused: false,
        id: `id-${uuidv4()}`
      });

      const emitEvent = ({ name, detail }) => {
        emit(`${name}.native`, detail);
      };
  
      const updateValue = ({ target }) => {
        ctx.value = target.value;
        emitEvent({
          name: "input",
          detail: {
            value: target.value
          }
        });
      };
  
      const handleFocus = ({ target }) => {
        state.isFocused = true;
        emitEvent({
          name: "focus",
          detail: {
            value: target.value
          }
        });
      };
  
      const handleBlur = ({ target }) => {
        state.isFocused = false;
        emitEvent({
          name: "blur",
          detail: {
            value: target.value
          }
        });
      };
  
      const handleKeyup = ({ code, keyCode }) => {
        emitEvent({
          name: "keyup",
          detail: {
            code,
            keyCode
          }
        });

        if (code === "Escape") {
          refs.input?.blur();
        }
      };
  
      const isFilled = computed(() => !!props.value);
  
      const labelClassNames = computed(() => {
        const baseClasses = "absolute px-1 transition-all duration-150 origin-left transform pointer-events-none select-none left-3";
        let result = "";
  
        if (state.isFocused || isFilled.value) {
          result = "-translate-y-1/2 bg-white text-xs";
  
          if (state.isFocused) {
            result += " text-blue";
          }
  
          if (isFilled.value) {
            result += " text-gray-500";
          }
        } else if (props.placeholder) {
          result = "-translate-y-1/2 bg-white text-xs text-gray-700";
        } else {
          result = "text-gray-500 translate-y-4 text-sm";
        }
  
        return `${baseClasses} ${result}`;
      });
  
      const inputClasses = computed(() => {
        const baseClasses = "block w-full p-4 text-gray-900 placeholder-gray-400 transition duration-150 rounded-none outline-none h-14 hover:border-blue";
  
        const focusStateClasses = state.isFocused ? "border-2 border-blue -mx-px" : "border";

        return `${baseClasses} ${focusStateClasses}`
      });
  
      return () => html`
        <link href="main.css" rel="stylesheet">
        <div class="relative">
          <label
            class=${labelClassNames.value}
            for=${state.id}
            >${props.label}</label
          >
          <input
            id=${state.id}
            value=${props.value || (props.value = "")}
            readonly=${props.readonly}
            oninput=${updateValue}
            onfocus=${handleFocus}
            onblur=${handleBlur}
            onkeyup=${handleKeyup}
            class=${inputClasses.value}
            type="text"
            autocomplete=${props.autocomplete}
            placeholder=${props.placeholder}
            ref=${node => refs.input = node}
          />
        </div>
      `;
    },

    propDefs: [
      "value",
      "label",
      "placeholder",
      "autofocus",
      "readonly",
      "autocomplete"
    ]
  });
};

export const defineUiDialog = ({
  name = "ui-dialog"
} = {
  name: "ui-dialog"
}) => {
  defineComponent({
    name,

    setup: ({ slots, emit }) => {
      return () => html`
        <link href="main.css" rel="stylesheet">
        <div class="fixed inset-0 z-50" role="dialog">
          <div
            class="fixed inset-0 bg-black opacity-60"
            data-test="background"
            onclick=${() => emit('close.native')}
          ></div>
          <div
            class="container fixed bg-white shadow-lg"
            style="left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: 600px; width: calc(100% - 2rem);"
          >
            ${
              slots.header ? html`
                <header
                  class="flex items-center justify-between h-12 py-3 pl-4 pr-2 bg-gray-100 lg:h-14 lg:pr-3 lg:pl-6 lg:py-4"
                >
                  <slot name="header"></slot>
                </header>
              ` : ""
            }
            <main class="px-4 pt-6 pb-3 lg:px-6">
              <slot></slot>
            </main>
            ${
              slots.footer ? html`
                <footer
                  class="flex justify-between px-4 py-6 lg:px-6"
                >
                  <slot name="footer"></slot>
                </footer>
              ` : ""
            }
          </div>
        </div>
      `;
    }
  })
};
