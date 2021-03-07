import {
  defineComponent,
  PropType,
} from 'vue';
import { Block } from '../blocks';

import './BlockToolbar.scss';

interface BlockToolbarProps {
  block: Block;
}

export const SbBlockToolbar = defineComponent({
  name: 'sb-block-toolbar',

  props: {
    block: {
      type: (null as unknown) as PropType<Block>,
      required: true,
    },
  },

  setup(props: BlockToolbarProps, context) {
    return () => (
      <div class="sb-block-toolbar"></div>
    );
  },
});
