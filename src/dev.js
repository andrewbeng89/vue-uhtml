import {
  html,
  defineComponent,
  reactive,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onUnmounted,
} from "./index";

defineComponent({
  name: "my-message",
  props: {
    message: String,
  },
  setup: ({ props }) => () => {
    onBeforeMount(() => {
      console.log("my-message: beforeMount");
    });
    onMounted(() => {
      console.log("my-message: mounted");
    });
    onBeforeUpdate(() => {
      console.log("my-message: beforeUpdate");
    });
    onUpdated(() => {
      console.log("my-message: updated");
    });
    onUnmounted(() => {
      console.log("my-message: unmounted");
    });
    return html`
      <p>
        <span>Message: ${props.message}</span>
      </p>
    `;
  },
});

defineComponent({
  name: "my-component",
  setup: ({ emit }) => {
    const state = reactive({
      sum: 1,
      message: "hello, vue-uhtml!",
      showMessage: false,
    });

    const add = () => {
      state.sum = state.sum + 1;
      emit(new CustomEvent("add", { detail: state.sum }));
    };

    const oninput = ({ target }) => {
      state.message = target.value;
      emit(new CustomEvent("message", { detail: target.value }));
    };

    onBeforeMount(() => {
      console.log("my-component: beforeMount");
    });
    onMounted(() => {
      console.log("my-component: mounted");
    });
    onBeforeUpdate(() => {
      console.log("my-component: beforeUpdate");
    });
    onUpdated(() => {
      console.log("my-component: updated");
    });
    onUnmounted(() => {
      console.log("my-component: unmounted");
    });

    const toggleMessage = () => {
      state.showMessage = !state.showMessage;
    };

    return () =>
      html`
        <button onclick=${add}>add</button>
        <button onclick=${toggleMessage}>Toggle child component</button>
        <p>
          <span>sum: ${state.sum}</span>
        </p>
        <input type="text" oninput=${oninput} value=${state.message} />
        ${state.showMessage
          ? html`<my-message message=${state.message}></my-message>`
          : ""}
      `;
  },
});
