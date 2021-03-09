import {
  defineComponent,
  inject,
  reactive,
  ref,
} from 'vue';
import { SymBlockLibrary } from '../use-dynamic-blocks';

import './Block.scss';

export const SbBlock = defineComponent({
  name: 'sb-block',

  props: {
    block: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const el = ref(null);
    const customBlocks = inject(SymBlockLibrary, reactive({}));
    const getBlock = (name) => customBlocks[name];

    return () => {
      const BlockComponent = getBlock(props.block.name)?.component || <span>Missing block {name}</span>;

      return <div
        ref={el}
        class="sb-block"
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
