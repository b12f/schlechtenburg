import { defineComponent } from 'vue';
import './Select.scss';

/**
 * A select input in the schlechtenburg theme
 * @sbui
 */
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
        {
          /**
           * The select options list
           * @slot default
           */
          context.slots.default?.()
        }
        </select>
      </div>
    );
  },
});
