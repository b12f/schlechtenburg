import {
  defineComponent,
  computed,
  PropType,
  h,
} from 'vue';
import {
  model,
} from '@schlechtenburg/core';
import {
  getDefaultData,
  IHeadingData,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-heading-display',

  model,

  props: {
    data: {
      type: Object as PropType<IHeadingData>,
      default: getDefaultData,
    },
  },

  setup(props) {
    const classes = computed(() => ({
      'sb-heading': true,
      [`sb-heading_align-${props.data.align}`]: true,
      [`sb-heading_${props.data.level}`]: true,
    }));

    return () => h(
      `h${props.data.level}`,
      {
        class: classes.value,
        innerHTML: props.data.value,
      },
    );
  },
});
