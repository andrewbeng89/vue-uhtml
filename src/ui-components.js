import { defineComponent, reactive, computed, html } from "./index.js";
import rawStyles from "./main.css";

const styles = () => html`
  <style>
    ${rawStyles}
  </style>
`;

export const defineUiInput = (
  { name = "ui-input" } = {
    name: "ui-input",
  }
) => {
  defineComponent({
    name,

    setup: ({ props, refs, ctx }) => {
      const state = reactive({
        isFocused: false,
        // eslint-disable-next-line no-undef
        id: `id-${uuidv4()}`,
      });

      const updateValue = ({ target }) => {
        ctx.value = target.value;
      };

      const handleFocus = () => {
        state.isFocused = true;
      };

      const handleBlur = () => {
        state.isFocused = false;
      };

      const handleKeyup = ({ code }) => {
        if (code === "Escape") {
          refs.input?.blur();
        }
      };

      const isFilled = computed(() => !!props.value);

      const labelClassNames = computed(() => {
        const baseClasses =
          "ce-absolute ce-px-1 ce-transition-all ce-duration-150 ce-origin-left ce-transform ce-pointer-events-none ce-select-none ce-left-3";
        let result = "";

        if (state.isFocused || isFilled.value) {
          result = "ce--translate-y-1/2 ce-bg-white ce-text-xs";

          if (state.isFocused) {
            result += " ce-text-blue";
          }

          if (isFilled.value) {
            result += " ce-text-gray-500";
          }
        } else if (props.placeholder) {
          result =
            "ce--translate-y-1/2 ce-bg-white ce-text-xs ce-text-gray-700";
        } else {
          result = "ce-text-gray-500 ce-translate-y-4 ce-text-sm";
        }

        return `${baseClasses} ${result}`;
      });

      const inputClasses = computed(() => {
        const baseClasses =
          "ce-block ce-w-full ce-p-4 ce-text-gray-900 ce-placeholder-gray-400 ce-transition ce-duration-150 ce-rounded-none ce-outline-none ce-h-14 ce-hover:border-blue";

        const focusStateClasses = state.isFocused
          ? "ce-border-2 ce-border-blue ce--mx-px"
          : "ce-border";

        return `${baseClasses} ${focusStateClasses}`;
      });

      return () => html`
        ${styles()}
        <div class="ce-relative">
          <label class=${labelClassNames.value} for=${state.id}
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
            ref=${(node) => (refs.input = node)}
          />
        </div>
      `;
    },

    props: {
      value: {
        type: String,
        default: "",
      },
      label: {
        type: String,
        default: "",
      },
      placeholder: {
        type: String,
        default: "",
      },
      autofocus: {
        type: Boolean,
        default: false,
      },
      chevron: {
        default: false,
      },
      readonly: {
        default: false,
      },
      autocomplete: {
        default: "on",
      },
    },

    useShadowDOM: true,
  });
};

export const defineUiDialog = (
  { name = "ui-dialog" } = {
    name: "ui-dialog",
  }
) => {
  defineComponent({
    name,

    setup: ({ slots, emit }) => {
      return () => html`
        ${styles()}
        <div class="ce-fixed ce-inset-0 ce-z-50" role="dialog">
          <div
            class="ce-fixed ce-inset-0 ce-bg-black ce-opacity-60"
            data-test="background"
            onclick=${() => emit(new Event("close"))}
          ></div>
          <div
            class="ce-container ce-fixed ce-bg-white ce-shadow-lg"
            style="left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: 600px; width: calc(100% - 2rem);"
          >
            ${slots?.header
              ? html`
                  <header
                    class="ce-flex ce-itemsce-nter ce-justify-between ce-h-12 ce-py-3 ce-pl-4 ce-pr-2 ce-bg-gray-100 ce-lg:h-14 ce-lg:pr-3 ce-lg:pl-6 ce-lg:py-4"
                  >
                    <slot name="header"></slot>
                  </header>
                `
              : ""}
            <main class="ce-px-4 ce-pt-6 ce-pb-3 ce-lg:px-6">
              <slot></slot>
            </main>
            ${slots?.footer
              ? html`
                  <footer
                    class="ce-flex ce-justify-between ce-px-4 ce-py-6 ce-lg:px-6"
                  >
                    <slot name="footer"></slot>
                  </footer>
                `
              : ""}
          </div>
        </div>
      `;
    },
  });
};
