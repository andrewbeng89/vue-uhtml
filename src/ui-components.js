import { html } from "https://unpkg.com/uhtml?module";
import { reactive, computed } from "https://unpkg.com/@vue/reactivity/dist/reactivity.esm-browser.js";
import { defineComponent } from "./index.js";

export const defineUiInput = ({
  name = "ui-input"
} = {
  name: "ui-input"
}) => {
  defineComponent(
    name,
    ({ props, emit }) => {
      const state = reactive({
        isFocused: false,
        id: `id-${uuidv4()}`
      });

      const emitEvent = ({ name, detail }) => {
        emit(`${name}.native`, detail);
      };
  
      const updateValue = ({ target }) => {
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
            value=${props.value}
            readonly=${props.readonly}
            oninput=${updateValue}
            onfocus=${handleFocus}
            onblur=${handleBlur}
            onkeyup=${handleKeyup}
            class=${inputClasses.value}
            type="text"
            autocomplete=${props.autocomplete}
            placeholder=${props.placeholder}
          />
        </div>
      `;
    },
    {
      propDefs: [
        "value",
        "label",
        "placeholder",
        "autofocus",
        "readonly",
        "autocomplete"
      ]
    }
  );
};
