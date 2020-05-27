import {
  defineComponent,
  computed,
  PropType,
} from '@vue/composition-api';
import {
  model,
  blockProps,
  BlockProps,
} from '@components/TreeElement';

import {
  getDefaultData,
  ParagraphData,
} from './util';

import './style.scss';

interface ParagraphProps extends BlockProps {
  data: ParagraphData;
}

export default defineComponent({
  name: 'sb-paragraph-display',

  model,

  props: {
    ...blockProps,
    data: {
      type: Object as PropType<ParagraphData>,
      default: getDefaultData,
    },
  },

  setup(props: ParagraphProps, context) {
    const classes = computed(() => ({
      'sb-paragraph': true,
      [`sb-paragraph_align-${props.data.align}`]: true,
    }));

    return () => <p class={classes}>{props.data.value}</p>;
  },
});
