import {
  defineComponent,
  computed,
} from 'vue';

import './Modal.scss';

export const SbModal = defineComponent({
  name: 'sb-modal',

  props: {
    open: {
      type: Boolean,
      default: false,
    },
    onClose: { type: Function, default: () => {} },
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
            props.onClose();
          }}
        >
          <div class="sb-modal__content">
            {context.slots.default?.()}
          </div>
        </div>
      </div>
    );
  },
});
