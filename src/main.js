import { render } from "uhtml";
import { parsePropDefs, getPropValidators, validateProp } from "./utils";

let currentInstance;

const createLifecycleMethod = (name) => (hook) => {
  if (currentInstance) {
    (currentInstance[name] || (currentInstance[name] = [])).push(hook);
  }
};

export const onBeforeMount = createLifecycleMethod("hookBeforeMount");
export const onMounted = createLifecycleMethod("hookMounted");
export const onBeforeUpdate = createLifecycleMethod("hookBeforeUpdate");
export const onUpdated = createLifecycleMethod("hookUpdated");
export const onUnmounted = createLifecycleMethod("hookUnmounted");

export const useEmit = (ctx) => (event) => {
  ctx.dispatchEvent(event);
};

export default ({ reactive, effect, isLegacy = false }) => ({
  name,
  setup,
  props = [],
  useShadowDOM = true,
  shadowMode = "closed",
}) => {
  customElements.define(
    name,
    class extends HTMLElement {
      static get observedAttributes() {
        return parsePropDefs(props);
      }

      runLifeCycleMethod(hooks) {
        hooks && hooks.forEach((hook) => hook());
      }

      constructor() {
        super();

        currentInstance = this;

        this.props = reactive({});
        const propValidators = getPropValidators(props);
        parsePropDefs(props).forEach((key) => {
          Object.defineProperty(this, key, {
            get() {
              return this.props[key];
            },
            set(value) {
              if (
                propValidators &&
                !validateProp(value, propValidators[key].type)
              ) {
                throw new Error(
                  `Invalid property type of ${key}: expected instance of ${
                    propValidators[key].type.name
                  }, but received a ${typeof value}`
                );
              }

              if (
                propValidators &&
                propValidators[key].type === Boolean &&
                value === ""
              ) {
                value = true;
              }

              this.props[key] = value;
            },
          });
        });

        const slots = useShadowDOM ? (this.slots = reactive({})) : undefined;

        const template = (this.template = setup.call(this, {
          props: this.props,
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

        currentInstance = null;
      }

      connectedCallback() {
        // Execute beforeMount hook
        this.runLifeCycleMethod(this.hookBeforeMount);

        effect(this.effectCallback);

        // Execute mounted hook
        this.runLifeCycleMethod(this.hookMounted);

        if (this.useShadowDOM) {
          this.querySelectorAll("[slot]").forEach((slot) => {
            this.slots[slot.getAttribute("slot")] = slot;
          });
        }

        const propValidators = getPropValidators(props);
        parsePropDefs(props).forEach((key) => {
          if (
            propValidators &&
            propValidators[key].required &&
            !this.props[key]
          ) {
            throw new Error(`Missing required property: ${key}`);
          }
        });
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

        const propValidators = getPropValidators(props);

        if (
          propValidators &&
          !validateProp(
            val,
            propValidators[name].type,
            propValidators[name].validator
          )
        ) {
          throw new Error(
            `Invalid property type of ${name}: expected instance of ${
              propValidators[name].type.name
            }, but received a ${typeof val}`
          );
        }

        if (propValidators && propValidators.default && !val) {
          val =
            propValidators.default instanceof Function
              ? propValidators.default()
              : propValidators.default;
        }

        this[name] = val;

        if (isLegacy) this.effectCallback();
      }
    }
  );
};
