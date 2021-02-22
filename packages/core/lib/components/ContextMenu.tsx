import {
  watch,
  defineComponent,
  ref,
} from 'vue';

import { SbButton } from './Button';

import './ContextMenu.scss';

interface ContextMenuProps {
  onClose: () => void;
  onOpen: () => void;
}

export const SbContextMenu = defineComponent({
  name: 'sb-context-menu',

  props: {
    onClose: { type: Function, default: () => {} },
    onOpen: { type: Function, default: () => {} },
  },

  setup(props: ContextMenuProps, context) {
    const opened = ref(false);
    const close = () => { opened.value = false; }
    const closeOnEscape = ($event: KeyboardEvent) => {
      if ($event.key === 'Escape') {
        close();
      }
    };
    const open = () => {
      opened.value = true;
      document.addEventListener('click', close);
      document.addEventListener('keypress', closeOnEscape);
    }
    const toggle = () => { opened.value = !opened.value; }

    watch(opened, () => {
      if (!opened.value) {
        document.removeEventListener('click', close);
        document.removeEventListener('keypress', closeOnEscape);
      }
    });

    return () => (
      <div class="sb-context-menu">
        {
          context.slots.context({
            opened,
            toggle,
            close,
            open,
          }) ||
          <SbButton onClick={toggle}>Menu</SbButton>
        }
        <dialog
          open={opened.value}
          onClose={close}
          onClick={($event: Event) => {
            // Make sure clicks inside do not autoclose this
          }}
        >
            {context.slots.default({
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
