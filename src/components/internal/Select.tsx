import { defineComponent } from '@vue/composition-api';

import './Select.scss';

export default defineComponent({
  name: 'sb-select',

  inheritAttrs: false,

  setup(props, context) {
    return () => (
      <div class="sb-select">
        <select
          class="sb-select__input"
          {...{
            attrs: context.attrs,
            on: context.listeners,
          }}
        >
          {context.slots.default()}
        </select>
      </div>
    );
  },
});
