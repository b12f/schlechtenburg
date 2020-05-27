import {
  reactive,
  computed,
  defineComponent,
  watch,
  PropType,
} from '@vue/composition-api';
import {
  model,
  blockProps,
  useActivation,
  BlockData,
} from '@components/TreeElement';

import SbBlock from '@internal/Block';
import SbToolbar from '@internal/Toolbar';
import SbBlockPlaceholder from '@internal/BlockPlaceholder';

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

  setup(props: LayoutProps, context) {
    const classes = computed(() => ({
      'sb-layout': true,
      [`sb-layout_${props.data.orientation}`]: true,
    }));

    return () => (
      <div class={classes.value}>
        {...props.data.children.map((child, index) => (
          <SbBlock
            key={child.blockId}
            block={child}
          />
        ))}
      </div>
    );
  },
});
