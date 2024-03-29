import debounce from 'lodash/debounce';
import {
  defineComponent,
  watch,
  reactive,
} from 'vue';
import { useBlockSizing } from '../use-resize-observer';

import './Toolbar.scss';

/**
 * Toolbar in the schlechtenburg theme
 * @sbui
 */
export const SbToolbar = defineComponent({
  name: 'sb-toolbar',

  setup(_, context) {
    const styles = reactive({
      bottom: '',
      left: '',
      maxWidth: '',
    });

    const { editorDimensions, blockDimensions } = useBlockSizing();
    const resetStyles = debounce(() => {
      if (!editorDimensions.value || !blockDimensions.value) {
        return;
      }

      const bottom = editorDimensions.value.height - blockDimensions.value.top;
      styles.bottom = `${bottom}px`;
      styles.left = `${blockDimensions.value.left}px`;
      styles.maxWidth = `${blockDimensions.value.width}px`;
    });
    watch(editorDimensions, resetStyles);
    watch(blockDimensions, resetStyles);

    return () => (
      <div
        class="sb-toolbar"
        style={styles}
        onClick={($event: MouseEvent) => $event.stopPropagation()}
      >
        {
          /**
           * The toolbar contents
           * @slot default
           */
          context.slots.default?.()
        }
      </div>
    );
  },
});
