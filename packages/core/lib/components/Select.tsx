import { defineComponent } from 'vue';
import './Select.scss';

export const SbSelect = defineComponent({
  name: 'sb-select',

  inheritAttrs: false,

  setup(_, context) {
    return () => (
      <div class="sb-select">
        <select
          class="sb-select__input"
          {...context.attrs}
        >
          {context.slots.default?.()}
        </select>
      </div>
    );
  },
});
