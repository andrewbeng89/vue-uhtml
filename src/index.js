import { render } from "uhtml";
import { reactive, effect } from "@vue/reactivity";

let currentInstance;

const createLifecycleMethod = (name) => (hook) => {
  if (currentInstance) {
    (currentInstance[name] || (currentInstance[name] = [])).push(hook);
  }
};

export const beforeCreate = createLifecycleMethod("hookBeforeCreate");
export const created = createLifecycleMethod("hookCreated");
export const beforeMount = createLifecycleMethod("hookBeforeMount");
export const mounted = createLifecycleMethod("hookMounted");
export const beforeUpdate = createLifecycleMethod("hookBeforeUpdate");
export const updated = createLifecycleMethod("hookUpdated");
export const unmounted = createLifecycleMethod("hookUnmounted");

export const useEmit = (ctx) => (event) => {
  ctx.dispatchEvent(event);
};

export const defineComponent = ({
  name,
  setup,
  propDefs = [],
  useShadowDOM = true,
  shadowMode = "closed",
}) => {
  customElements.define(
    name,
    class extends HTMLElement {
      static get observedAttributes() {
        return propDefs;
      }

      runLifeCycleMethod(hooks) {
        hooks && hooks.forEach((hook) => hook());
      }

      constructor() {
        super();

        // Execute beforeCreate hook
        this.runLifeCycleMethod(this.hookBeforeCreate);

        currentInstance = this;

        // Execute created hook
        this.runLifeCycleMethod(this.hookCreated);

        const props = (this.props = reactive({}));
        propDefs.forEach((key) => {
          Object.defineProperty(this, key, {
            get() {
              return this.props[key];
            },
            set(value) {
              this.props[key] = value;
            },
          });
        });

        const slots = useShadowDOM ? (this.slots = reactive({})) : undefined;

        const template = (this.template = setup.call(this, {
          props,
          ctx: this,
          emit: useEmit(this),
          refs: reactive({}),
          ...(slots ? { slots } : {}),
        }));

        this.useShadowDOM = useShadowDOM;
        const root = (this.root = useShadowDOM
          ? this.attachShadow({ mode: shadowMode })
          : this);

        this.render = () => {
          render(root, template());
        };

        // Execute beforeMount hook
        this.runLifeCycleMethod(this.hookBeforeMount);
        this.isMounted = false;

        this.effectCallback = () => {
          if (this.isMounted) {
            this.runLifeCycleMethod(this.hookBeforeUpdate);
          }

          this.render();

          if (this.isMounted) {
            // Execute updated hook
            this.runLifeCycleMethod(this.hookUpdated);
          } else {
            this.isMounted = true;
          }
        };

        if (useShadowDOM) {
          effect(this.effectCallback);
        }

        currentInstance = null;
      }

      connectedCallback() {
        if (!this.useShadowDOM) {
          effect(this.effectCallback);
        }

        // Execute mounted hook
        this.runLifeCycleMethod(this.hookMounted);

        if (this.useShadowDOM) {
          this.querySelectorAll("[slot]").forEach((slot) => {
            this.slots[slot.getAttribute("slot")] = slot;
          });
        }
      }

      disconnectedCallback() {
        // Execute unmounted hook
        this.runLifeCycleMethod(this.hookUnmounted);
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
