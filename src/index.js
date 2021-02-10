import { render } from "https://unpkg.com/uhtml?module";
import { reactive, effect } from "https://unpkg.com/@vue/reactivity/dist/reactivity.esm-browser.js";

let currentInstance;

const createLifecycleMethod = name => hook => {
  if (currentInstance) {
    (currentInstance[name] || (currentInstance[name] = [])).push(hook);
  }
}

const runLifeCycleMethod = hooks => {
  hooks?.forEach(hook => hook());
};

export const beforeCreate = createLifecycleMethod("hookBeforeCreate");
export const created = createLifecycleMethod("hookCreated");
export const beforeMount = createLifecycleMethod("hookBeforeMount");
export const mounted = createLifecycleMethod("hookMounted");
export const beforeUpdate = createLifecycleMethod("hookBeforeUpdate")
export const updated = createLifecycleMethod("hookUpdated");
export const unmounted = createLifecycleMethod("hookUnmounted");

export const emit = ctx => (name, payload) => {
  ctx.dispatchEvent(
    new CustomEvent(name, {
      detail: payload
    })
  );
};

export const defineComponent = (name, setup, {
  propDefs
} = {
  propDefs: []
}) => {
  customElements.define(
    name,
    class extends HTMLElement {
      static get observedAttributes() {
        return propDefs;
      }

      constructor() {
        super();

        // Execute beforeCreate hook
        runLifeCycleMethod(this.hookBeforeCreate);

        currentInstance = this;

        // Execute created hook
        runLifeCycleMethod(this.hookCreated);

        const props = this.props = reactive({});

        const template = setup.call(this, { props, ctx: this });

        const root = this.attachShadow({ mode: "closed" });

        // Execute beforeMount hook
        runLifeCycleMethod(this.hookBeforeMount);
        let isMounted = false;

        effect(() => {
          if (isMounted) {
            runLifeCycleMethod(this.hookBeforeUpdate);
          }

          render(root, template());
          
          if (isMounted) {
            // Execute updated hook
            runLifeCycleMethod(this.hookUpdated);
          } else {
            isMounted = true;
          }
        });
        
        currentInstance = null;
      }

      connectedCallback() {
        // Execute mounted hook
        runLifeCycleMethod(this.hookMounted);
      }

      disconnectedCallback() {
        // Execute unmounted hook
        runLifeCycleMethod(this.hookUnmounted);
      }

      attributeChangedCallback(name, oldValue, newValue) {
        this.props[name] = newValue;
      }
    }
  );
};
