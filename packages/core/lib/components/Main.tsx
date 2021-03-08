import {
  defineComponent,
  provide,
  shallowReactive,
} from 'vue';
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
      type: Array,
      default: () => [],
    },
    block: {
      type: Object,
      required: true,
    },
    onUpdate: { type: Function, default: () => {} },
  },

  setup(props) {
    const blockLibrary = shallowReactive({
      ...props.customBlocks.reduce(
        (blocks, block) => ({ ...blocks, [block.name]: block }),
        {},
      ),
    });

    provide(SymBlockLibrary, blockLibrary);

    return () => (
      <div class="sb-main">
        <SbBlock block={props.block} />
      </div>
    );
  },
});
