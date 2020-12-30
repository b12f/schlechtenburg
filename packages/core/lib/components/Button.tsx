import { defineComponent } from 'vue';

import './Button.scss';

export const SbButton = defineComponent({
  name: 'sb-button',

  inheritAttrs: false,

  setup(props, context) {
    return () => (
      <button
        {...{
          ...context.attrs,
          class: (context.attrs.class || '') + ' sb-button',
        }}
      >
        {context.slots.default()}
      </button>
    );
  },
});
