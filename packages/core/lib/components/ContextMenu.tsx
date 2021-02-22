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
      } else {
        setTimeout(() => {
          document.body.addEventListener('click', close);
          document.body.addEventListener('keypress', closeOnEscape);
        });
      }
    });

    return () => (
      <div class="sb-context">
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
          class="sb-context-menu"
          open={opened.value ? true : undefined}
          onClose={close}
          onClick={($event: Event) => {
            // Make sure clicks inside do not autoclose this
            $event.stopPropagation();
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
