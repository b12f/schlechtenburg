import { defineComponent } from 'vue';

import './Button.scss';

/**
 * A button in the schlechtenburg theme
 * @sbui
 */
export const SbButton = defineComponent({
  name: 'sb-button',

  inheritAttrs: false,

  setup(_, context) {
    return () => (
      <button
        {...{
          ...context.attrs,
          class: (context.attrs.class || '') + ' sb-button',
        }}
      >
        {
          /**
           * The button contents
           * @slot default
           */
          context.slots.default?.()
        }
      </button>
    );
  },
});
