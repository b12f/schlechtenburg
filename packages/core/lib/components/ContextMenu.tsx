import {
  watch,
  defineComponent,
  ref,
} from 'vue';
import { SbButton } from './Button';

import './ContextMenu.scss';

export const SbContextMenu = defineComponent({
  name: 'sb-context-menu',

  props: {
    onClose: { type: Function, default: () => {} },
    onOpen: { type: Function, default: () => {} },
  },

  setup(props, context) {
    const opened = ref(false);
    const open = () => { opened.value = true; };
    const close = () => { opened.value = false; };
    const closeOnEscape = ($event: KeyboardEvent) => {
      if ($event.key === 'Escape') {
        close();
      }
    };
    const toggle = () => { opened.value ? close() : open() };

    watch(opened, (curr, prev) => {
      if (curr === prev) {
        return;
      }

      if (!curr) {
        document.body.removeEventListener('click', close);
        document.body.removeEventListener('keypress', closeOnEscape);
        props.onClose();
      } else {
        setTimeout(() => {
          document.body.addEventListener('click', close);
          document.body.addEventListener('keypress', closeOnEscape);
          props.onOpen();
        });
      }
    });

    return () => (
      <div class="sb-context">
        {
          context.slots.context?.({
            opened,
            toggle,
            close,
            open,
          }) || <SbButton {...{ onClick: toggle }}>Menu</SbButton>
        }
        <dialog
          class="sb-context-menu"
          open={opened.value ? true : undefined}
          onClick={($event: Event) => {
            // Make sure clicks inside do not autoclose this
            $event.stopPropagation();
          }}
          {...{ onClose: close /* TODO: DialogHTMLAttributes needs an onClose handler type */ }}
        >
            {context.slots.default?.({
              opened,
              toggle,
              close,
              open,
            }) || null}
        </dialog>
      </div>
    );
  },
});
