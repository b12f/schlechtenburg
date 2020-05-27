import {
  defineComponent,
  computed,
  ref,
} from '@vue/composition-api';

import './Modal.scss';

export default defineComponent({
  name: 'sb-modal',

  props: {
    open: {
      type: Boolean,
      default: false,
    },
    eventClose: {
      type: (Function as unknown) as () => void,
      default: () => () => undefined,
    },
  },

  setup(props, context) {
    const classes = computed(() => ({
      'sb-modal': true,
      'sb-modal_open': props.open,
    }));

    return () => (
      <div class={classes.value}>
        <div
          class="sb-modal__overlay"
          onClick={($event: MouseEvent) => {
            $event.stopPropagation();
            props.eventClose();
          }}
        >
          <div class="sb-modal__content">
            {context.slots.default()}
          </div>
        </div>
      </div>
    );
  },
});
