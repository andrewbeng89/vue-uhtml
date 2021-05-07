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
  useShadowDOM: false,
});
</script>
```

## Legacy JS compatibility (IE 11 🙃)

```html
<my-component message="hello, vue-uhtml"></my-component>

<script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-bundle.js" nomodule></script>
<script src="https://unpkg.com/vue-uhtml/dist/index.legacy.js" nomodule></script>
<script nomodule>
  VueUhtml.defineComponent({
    name: "my-component",
    props: {
      message: String,
    },
    setup: function(ctx) {
      const state = VueUhtml.reactive({
        sum: 1,
      });
      function add() {
        state.sum = state.sum + 1;
        ctx.emit(new CustomEvent("add", { detail: state.sum }));
      };

      VueUhtml.onBeforeMount(function() { console.log("my-component: beforeMount") });
      VueUhtml.onMounted(function() { console.log("my-component: mounted") });
      VueUhtml.onBeforeUpdate(function() { console.log("my-component: beforeUpdate") });
      VueUhtml.onUpdated(function() { console.log("my-component: updated") });
      VueUhtml.onUnmounted(function() { console.log("my-component: unmounted") });

      return function() {
        return VueUhtml.html(
          [
            "<button onclick=",
            ">add</button> <p> <span>sum: ",
            "</span> </p> <p> <span>message: ",
            "</span> </p>"
          ],
          add,
          state.sum,
          ctx.props.message
        );
      }
    },
  });
</script>
```

## Tests
```sh
> yarn test
```
