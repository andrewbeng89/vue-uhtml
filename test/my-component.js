import {
  defineComponent,
  reactive,
  html,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onUnmounted,
} from "../dist/index.esm";

defineComponent({
  name: "my-component",
  setup: ({ emit }) => {
    const state = reactive({
      text: "hello",
      show: false,
    });
    const toggle = () => {
      state.show = !state.show;
      emit(new CustomEvent("toggle", { detail: state.show }));
    };
    const onInput = (e) => {
      state.text = e.target.value;
    };

    onBeforeMount(() => console.log("my-component: beforeMount"));
    onMounted(() => console.log("my-component: mounted"));
    onBeforeUpdate(() => console.log("my-component: beforeUpdate"));
    onUpdated(() => console.log("my-component: updated"));
    onUnmounted(() => console.log("my-component: unmounted"));

    return () => html`
      <button onclick=${toggle}>toggle child</button>
      <p>
        <span>${state.text}</span>
        <input value=${state.text} oninput=${onInput} />
      </p>
      ${state.show ? html`<my-child msg=${state.text}></my-child>` : ``}
    `;
  },
  shadowMode: "open",
});

defineComponent({
  name: "my-child",

  setup: ({ props }) => {
    const state = reactive({ count: 0 });
    const increase = () => {
      state.count++;
    };

    onMounted(() => {
      console.log("child mounted");
    });

    onUpdated(() => {
      console.log("child updated");
    });

    onUnmounted(() => {
      console.log("child unmounted");
    });

    return () => html`
      <p>${props.msg}</p>
      <p id="count">${state.count}</p>
      <button onclick=${increase}>increase</button>
    `;
  },
  shadowMode: "open",
  useShadowDOM: false,
  propDefs: ["msg"],
});
