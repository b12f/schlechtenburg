import {
  defineComponent,
  computed,
  PropType,
} from 'vue';
import {
  model,
  blockProps,
  BlockProps,
} from '@schlechtenburg/core';

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

  setup(props: ParagraphProps) {
    const classes = computed(() => ({
      'sb-paragraph': true,
      [`sb-paragraph_align-${props.data.align}`]: true,
    }));

    return () => <p
      class={classes.value}
      {...{
        innerHTML: props.data.value,
      }}
    ></p>;
  },
});
