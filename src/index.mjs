import { render } from "https://unpkg.com/uhtml?module";
import { reactive, effect } from "https://unpkg.com/@vue/reactivity/dist/reactivity.esm-browser.js";

let currentInstance;

const createLifecycleMethod = name => hook => {
  if (currentInstance) {
    (currentInstance[name] || (currentInstance[name] = [])).push(hook);
  }
}

export const beforeCreate = createLifecycleMethod("hookBeforeCreate");
export const created = createLifecycleMethod("hookCreated");
export const beforeMount = createLifecycleMethod("hookBeforeMount");
export const mounted = createLifecycleMethod("hookMounted");
export const beforeUpdate = createLifecycleMethod("hookBeforeUpdate")
export const updated = createLifecycleMethod("hookUpdated");
export const unmounted = createLifecycleMethod("hookUnmounted");

export const defineComponent = (name, factory, propDefs = []) => {
  console.log(customElements);
  customElements.define(
    name,
    class extends HTMLElement {
      static get observedAttributes() {
        return propDefs;
      }

      constructor() {
        super();

        // Execute beforeCreate hook
        this.hookBeforeCreate?.forEach(hook => hook());

        currentInstance = this;

        // Execute created hook
        this.hookCreated?.forEach(hook => hook());

        const props = this.props = reactive({});
        const template = factory.call(this, props);

        currentInstance = null;

        const root = this.attachShadow({ mode: "closed" });

        // Execute beforeMount hook
        this.hookBeforeMount?.forEach(hook => hook());
        let isMounted = false;

        effect(() => {
          if (isMounted) {
            this.hookBeforeUpdate?.forEach(hook => hoook());
          }

          render(root, template());
          
          if (isMounted) {
            // Execute updated hook
            this.hookUpdated?.forEach(hook => hook());
          } else {
            isMounted = true;
          }
        });
      }

      connectedCallback() {
        // Execute mounted hook
        this.hookMounted?.forEach(hook => hook());
      }

      disconnectedCallback() {
        // Execute unmounted hook
        this.hookUnmounted?.forEach(hook => hook());
      }

      attributeChangedCallback(name, oldValue, newValue) {
        this.props[name] = newValue;
      }
    }
  );
};
