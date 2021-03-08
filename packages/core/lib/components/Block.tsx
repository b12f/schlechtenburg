import {
  defineComponent,
  computed,
  PropType,
  ref,
  Ref,
} from 'vue';
import { BlockData } from '../types';
import { useDynamicBlocks } from '../use-dynamic-blocks';

import './Block.scss';

export const SbBlock = defineComponent({
  name: 'sb-block',

  props: {
    block: {
      type: (null as unknown) as PropType<BlockData<any>>,
      required: true,
    },
  },

  setup(props, context) {
    const el: Ref<null|HTMLElement> = ref(null);
    const { getBlock } = useDynamicBlocks();
    const classes = computed(() => ({ 'sb-block': true }));

    return () => {
      const BlockComponent = getBlock(props.block.name)?.component as any;

      return <div
        ref={el}
        class={classes.value}
      >
        <BlockComponent
          data={props.block.data}
          blockId={props.block.id}
          {...context.attrs}
        />
      </div>;
    };
  },
});
