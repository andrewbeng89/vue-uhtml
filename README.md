# vue-uhtml ("vue micro")

Resuable, reactive custom elements framework. Borrows and takes inspiration from [@vue/lit](https://github.com/yyx990803/vue-lit). Powered by [@vue/reactivity](https://github.com/vuejs/vue-next/tree/master/packages/reactivity) and [µhtml](https://github.com/WebReflection/uhtml)

## Example

[Codepen demo](https://codepen.io/andrewbeng89/pen/jOVodwW)

```html
<my-component></my-component>

<script type="module">
import {
  defineComponent,
  reactive,
  html,
  onMounted,
  onUpdated,
  onUnmounted
} from "https://unpkg.com/vue-uhtml?module";

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
});

defineComponent({
  name: "my-child",

  props: {
    msg: {
      type: String,
      default: "",
    },
  },

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
});
</script>
```

## Develop
```sh
npm run dev
```

## Build
```sh
npm run build
```

## Tests
```sh
> npm run test
```
