import {
  defineComponent,
  computed,
  PropType,
} from 'vue';
import {
  model,
  SbBlock,
} from '@schlechtenburg/core';
import {
  LayoutData,
  getDefaultData,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-layout-display',

  model,

  props: {
    data: {
      type: (null as unknown) as PropType<LayoutData>,
      default: getDefaultData,
    },
  },

  setup(props) {
    const classes = computed(() => ({
      'sb-layout': true,
      [`sb-layout_${props.data.orientation}`]: true,
    }));

    return () => (
      <div class={classes.value}>
        {...props.data.children.map((child) => (
          <SbBlock
            key={child.id}
            block={child}
          />
        ))}
      </div>
    );
  },
});
