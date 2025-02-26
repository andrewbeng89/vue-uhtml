/* eslint-disable @typescript-eslint/no-this-alias */
import { Hole, render } from "uhtml";
import {
  parsePropDefs,
  getPropValidators,
  validateProp,
  PropType,
} from "./utils";
import { reactive, effect, type Reactive } from "@vue/reactivity";

interface VueUHtmlCustomElement extends HTMLElement {
  isMounted: boolean;
  render: () => ((() => Hole) | Hole) | void;
  root: ShadowRoot | this;
  effectCallback: () => void;
  ctx?: VueUHtmlCustomElement;
  slots?: Reactive<object>;
  hookBeforeMount?: (() => void)[];
  hookMounted?: (() => void)[];
  hookBeforeUpdate?: (() => void)[];
  hookUpdated?: (() => void)[];
  hookUnmounted?: (() => void)[];
  emit?: (event: Event | CustomEvent) => void;
  refs?: Reactive<object>;
}

let currentInstance: VueUHtmlCustomElement;

const createLifecycleMethod =
  (
    name:
      | "hookBeforeMount"
      | "hookMounted"
      | "hookBeforeUpdate"
      | "hookUpdated"
      | "hookUnmounted",
  ) =>
  (hook: () => void) => {
    if (currentInstance) {
      (currentInstance![name] || (currentInstance[name] = [])).push(hook);
    }

    if (!currentInstance.isMounted && name === "hookBeforeMount") hook();
  };

export const onBeforeMount = createLifecycleMethod("hookBeforeMount");
export const onMounted = createLifecycleMethod("hookMounted");
export const onBeforeUpdate = createLifecycleMethod("hookBeforeUpdate");
export const onUpdated = createLifecycleMethod("hookUpdated");
export const onUnmounted = createLifecycleMethod("hookUnmounted");

export const useEmit = (ctx: EventTarget) => (event: Event | CustomEvent) => {
  ctx.dispatchEvent(event);
};

export default ({
  name,
  setup,
  props = [],
  useShadowDOM = true,
  shadowMode = "closed",
}: {
  name: string;
  setup: (
    this: VueUHtmlCustomElement,
    args: {
      props: Reactive<object>;
      ctx: VueUHtmlCustomElement;
      emit: (event: Event | CustomEvent) => void;
      refs: Reactive<object>;
      slots?: Reactive<object>;
    },
  ) => () => (() => Hole) | Hole;
  props?: string[] | { [key: string]: PropType | (new () => object) };
  useShadowDOM?: boolean;
  shadowMode?: ShadowRootMode;
}) => {
  customElements.define(
    name,
    class extends HTMLElement implements VueUHtmlCustomElement {
      isMounted = false;
      props: Reactive<object>;
      render: () => void;
      root: ShadowRoot | this;
      effectCallback: () => void;
      slots?: { [key: string]: Element };
      hookBeforeMount?: (() => void)[];
      hookMounted?: (() => void)[];
      hookBeforeUpdate?: (() => void)[];
      hookUpdated?: (() => void)[];
      hookUnmounted?: (() => void)[];
      [key: string]: unknown;
      static get observedAttributes() {
        return parsePropDefs(props);
      }

      runLifeCycleMethod(hooks: (() => void)[]) {
        hooks?.forEach((hook) => hook());
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
                !validateProp(value, propValidators[key].type!)
              ) {
                throw new Error(
                  `Invalid property type of ${key}: expected instance of ${
                    propValidators[key].type!.name
                  }, but received a ${typeof value}`,
                );
              }

              if (
                propValidators &&
                propValidators[key]!.type === Boolean &&
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
          ? this.attachInternals?.()?.shadowRoot ||
            this.attachShadow({ mode: shadowMode, serializable: true })
          : this);
        const initialStyles = Array.from(root.querySelectorAll("style"));

        const prependInitialStyles = () => {
          if (initialStyles.length) {
            initialStyles.forEach((styleElement) => {
              this.root.prepend(styleElement);
            });
          }
        };

        this.render = () => {
          render(root, template());
        };

        this.effectCallback = () => {
          if (this.isMounted) {
            this.runLifeCycleMethod(this.hookBeforeUpdate!);
          }

          this.render();

          if (this.isMounted) {
            // Execute updated hook
            this.runLifeCycleMethod(this.hookUpdated!);
          } else {
            prependInitialStyles();
            this.isMounted = true;
          }
        };
      }

      connectedCallback() {
        effect(this.effectCallback);

        // Execute mounted hook
        this.runLifeCycleMethod(this.hookMounted!);

        if (this.useShadowDOM) {
          this.querySelectorAll("[slot]").forEach((slot) => {
            this.slots![slot.getAttribute("slot")!] = slot;
          });
        }

        const propValidators = getPropValidators(props);
        parsePropDefs(props).forEach((key) => {
          if (
            propValidators &&
            propValidators[key].required &&
            !(this.props as { [key: string]: unknown })[key]
          ) {
            throw new Error(`Missing required property: ${key}`);
          }
        });
      }

      disconnectedCallback() {
        // Execute unmounted hook
        this.runLifeCycleMethod(this.hookUnmounted!);
      }

      attributeChangedCallback(
        name: string,
        _oldValue: unknown,
        newValue: unknown,
      ) {
        let val;
        try {
          val = JSON.parse(newValue as string);
        } catch (e) {
          val = newValue;
        }

        const propValidators = getPropValidators(props);

        if (
          propValidators &&
          !validateProp(
            val,
            propValidators[name].type!,
            propValidators[name].validator,
          )
        ) {
          throw new Error(
            `Invalid property type of ${name}: expected instance of ${
              propValidators[name].type!.name
            }, but received a ${typeof val}`,
          );
        }

        if (propValidators && propValidators.default && !val) {
          val =
            propValidators.default instanceof Function
              ? propValidators.default()
              : propValidators.default;
        }

        this[name] = val;
      }
    },
  );
};
