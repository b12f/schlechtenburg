import { debounce } from 'lodash-es';
import {
  watch,
  reactive,
  computed,
  defineComponent,
} from 'vue';
import { useBlockSizing } from '../use-resize-observer';

import { SbButton } from './Button';

import './BlockOrdering.scss';

export const SbBlockOrdering = defineComponent({
  name: 'sb-block-ordering',

  props: {
    sortable: {
      type: String,
      default: null,
    },
    onRemove: { type: Function, default: () => {} },
    onMoveUp: { type: Function, default: () => {} },
    onMoveDown: { type: Function, default: () => {} },
  },

  setup(props) {
    const styles = reactive({
      top: '',
      right: '',
    });

    const classes = computed(() => ({
      'sb-block-ordering': true,
      [`sb-block-ordering_${props.sortable}`]: !!props.sortable,
    }));

    const { editorDimensions, blockDimensions } = useBlockSizing();
    const resetStyles = debounce(() => {
      if (!editorDimensions.value || !blockDimensions.value) {
        return;
      }

      const right = editorDimensions.value.width - blockDimensions.value.left;
      styles.top = `${blockDimensions.value.top}px`;
      styles.right = `${right}px`;
    });
    watch(editorDimensions, resetStyles);
    watch(blockDimensions, resetStyles);
    watch(() => props.sortable, resetStyles);

    return () => (
      <div
        class={classes.value}
        style={styles}
        onClick={($event: MouseEvent) => $event.stopPropagation()}
      >
        <SbButton onClick={props.onMoveUp}>{props.sortable === 'vertical' ? '↑' : '←'}</SbButton>
        <SbButton onClick={props.onRemove}>x</SbButton>
        <SbButton onClick={props.onMoveDown}>{props.sortable === 'vertical' ? '↓' : '→'}</SbButton>
      </div>
    );
  },
});
