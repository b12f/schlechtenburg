import {
  defineComponent,
  computed,
  PropType,
} from 'vue';
import {
  model,
  blockProps,
  SbBlock,
} from '@schlechtenburg/core';

import {
  LayoutData,
  LayoutProps,
  getDefaultData,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-layout-display',

  model,

  props: {
    ...blockProps,
    data: {
      type: (null as unknown) as PropType<LayoutData>,
      default: getDefaultData,
    },
  },

  setup(props: LayoutProps) {
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
