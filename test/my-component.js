import {
  defineComponent,
  reactive,
  html,
  mounted,
  updated,
  unmounted,
} from "../dist/index.esm";

defineComponent({
  name: "my-component",
  setup: () => {
    const state = reactive({
      text: "hello",
      show: false,
    });
    const toggle = () => {
      state.show = !state.show;
    };
    const onInput = (e) => {
      state.text = e.target.value;
    };

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

    mounted(() => {
      console.log("child mounted");
    });

    updated(() => {
      console.log("child updated");
    });

    unmounted(() => {
      console.log("child unmounted");
    });

    return () => html`
      <p>${props.msg}</p>
      <p id="count">${state.count}</p>
      <button onclick=${increase}>increase</button>
    `;
  },
  shadowMode: "open",
  propDefs: ["msg"],
});
