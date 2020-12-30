import debounce from 'lodash-es/debounce';
import {
  watch,
  reactive,
  computed,
  defineComponent,
} from 'vue';
import { useBlockSizing } from '/@/use-resize-observer';

import SbButton from './Button';

import './BlockOrdering.scss';

export default defineComponent({
  name: 'sb-block-ordering',

  props: {
    sortable: {
      type: String,
      default: null,
    },
    eventRemoveBlock: { type: Function, default: () => {} },
    eventMoveUp: { type: Function, default: () => {} },
    eventMoveDown: { type: Function, default: () => {} },
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
        <SbButton onClick={props.eventMoveUp}>{props.sortable === 'vertical' ? '↑' : '←'}</SbButton>
        <SbButton onClick={props.eventRemoveBlock}>x</SbButton>
        <SbButton onClick={props.eventMoveDown}>{props.sortable === 'vertical' ? '↓' : '→'}</SbButton>
      </div>
    );
  },
});
