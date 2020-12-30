import { defineComponent } from 'vue';
import './Select.scss';

export default defineComponent({
  name: 'sb-select',

  inheritAttrs: false,

  setup(props, context) {
    return () => (
      <div class="sb-select">
        <select
          class="sb-select__input"
          {...context.attrs}
        >
          {context.slots.default()}
        </select>
      </div>
    );
  },
});
