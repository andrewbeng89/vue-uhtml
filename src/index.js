import { render } from "uhtml";
import { reactive, effect } from "@vue/reactivity";
import "./main.css";

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

export const useEmit = ctx => (name, payload) => {
  ctx.dispatchEvent(
    new CustomEvent(name, {
      detail: payload
    })
  );
};

export const defineComponent = ({
  name,
  setup,
  propDefs = []
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
        propDefs.forEach(key => {
          Object.defineProperty(this, key, {
            get() {
              return this.props[key];
            },
            set(value) {
              this.props[key] = value;
            }
          });
        });

        const slots = this.slots = reactive({});

        const template = setup.call(this, {
          props,
          ctx: this,
          emit: useEmit(this),
          refs: reactive({}),
          slots
        });

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

        this.querySelectorAll("[slot]").forEach(slot => {
          this.slots[slot.getAttribute("slot")] = slot
        });
      }

      disconnectedCallback() {
        // Execute unmounted hook
        runLifeCycleMethod(this.hookUnmounted);
      }

      attributeChangedCallback(name, oldValue, newValue) {
        let val;
        try {
          val = JSON.parse(newValue);
        } catch (e) {
          val = newValue;
        }
        this[name] = val;
      }
    }
  );
};

export * from "uhtml";
export * from "@vue/reactivity";
