import {
  defineAsyncComponent,
  computed,
  PropType,
} from 'vue';
import {
  model,
  blockProps,
  BlockProps,
} from '/@components/TreeElement';

import {
  getDefaultData,
  ParagraphData,
} from './util';

import './style.scss';

interface ParagraphProps extends BlockProps {
  data: ParagraphData;
}

export default defineAsyncComponent({
  name: 'sb-paragraph-display',

  model,

  props: {
    ...blockProps,
    data: {
      type: Object as PropType<ParagraphData>,
      default: getDefaultData,
    },
  },

  setup(props: ParagraphProps) {
    const classes = computed(() => ({
      'sb-paragraph': true,
      [`sb-paragraph_align-${props.data.align}`]: true,
    }));

    console.log('p display', props.data);

    return () => <p
      class={classes.value}
      {...{
        domProps: { innerHTML: props.data.value },
      }}
    ></p>;
  },
});
