import {
  defineComponent,
  computed,
} from 'vue';

import './Modal.scss';

interface ModalProps {
  open: boolean;
  eventClose: () => void;
}

export default defineComponent({
  name: 'sb-modal',

  props: {
    open: {
      type: Boolean,
      default: false,
    },
    eventClose: { type: Function, default: () => {} },
  },

  setup(props: ModalProps, context) {
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
