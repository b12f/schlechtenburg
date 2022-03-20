import {
  defineComponent,
  computed,
  PropType,
} from 'vue';
import {
  model,
} from '@schlechtenburg/core';
import {
  getDefaultData,
  IParagraphData,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-paragraph-display',

  model,

  props: {
    data: {
      type: Object as PropType<IParagraphData>,
      default: getDefaultData,
    },
  },

  setup(props) {
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
