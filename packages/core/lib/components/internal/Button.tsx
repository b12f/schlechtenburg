import { defineComponent } from 'vue';
import './Button.scss';

export default defineComponent({
  name: 'sb-button',

  inheritAttrs: false,

  setup(props, context) {
    return () => (
      <button
        class="sb-button"
        {...{
          attrs: context.attrs,
          on: context.listeners,
        }}
      >
        {context.slots.default()}
      </button>
    );
  },
});
