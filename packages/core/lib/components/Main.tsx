import {
  defineComponent,
  provide,
  shallowReactive,
  ref,
  PropType,
} from 'vue';
import {
  BlockData,
  BlockDefinition,
  BlockLibrary,
} from '../types';
import { SymBlockLibrary} from '../use-dynamic-blocks';

import { SbBlock } from './Block';

import './Main.scss';

export const SbMain = defineComponent({
  name: 'sb-main',

  model: {
    prop: 'block',
    event: 'update',
  },

  props: {
    customBlocks: {
      type: Array as PropType<BlockDefinition<any>[]>,
      default: () => [],
    },
    block: {
      type: Object as PropType<BlockData<any>>,
      required: true,
    },
    onUpdate: { type: Function, default: () => {} },
  },

  setup(props: any) { // TODO: why does the typing of props not work here?
    const blockLibrary: BlockLibrary = shallowReactive({
      ...props.customBlocks.reduce(
        (blocks: BlockLibrary, block: BlockDefinition<any>) => ({ ...blocks, [block.name]: block }),
        {},
      ),
    });

    provide(SymBlockLibrary, blockLibrary);

    return () => (
      <div class="sb-main">
        <SbBlock
          block={props.block}
          onUpdate={props.onUpdate}
        />
      </div>
    );
  },
});
