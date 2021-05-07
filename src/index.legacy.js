import { reactive, watchEffect as effect } from "vue-demi";
import createDefineComponent from "./main";

export const defineComponent = createDefineComponent({ reactive, effect });

export {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onUnmounted,
  useEmit,
} from "./main";
export * from "uhtml";
export * from "vue-demi";
