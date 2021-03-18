# vue-uhtml ("vue micro")

Resuable, reactive custom elements framework. Borrows and takes inspiration from [@vue/lit](https://github.com/yyx990803/vue-lit). Powered by [@vue/reactivity](https://github.com/vuejs/vue-next/tree/master/packages/reactivity) and [µhtml](https://github.com/WebReflection/uhtml)

## Example

```html
<my-component></my-component>

<script type="module">
defineComponent({
  name: "my-component",
  setup: () => {
    const state = reactive({
      text: "hello",
      show: true
    });
    const toggle = () => {
      state.show = !state.show;
    };
    const onInput = e => {
      state.text = e.target.value;
    };
    
    return () => html`
       <button onclick=${toggle}>toggle child</button>
      <p>
      ${state.text} <input value=${state.text} oninput=${onInput}>
      </p>
      ${state.show ? html`<my-child msg=${state.text}></my-child>` : ``}
    `;
  }
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
      <p>${state.count}</p>
      <button onclick=${increase}>increase</button>
    `;
  }
});
</script>
```

