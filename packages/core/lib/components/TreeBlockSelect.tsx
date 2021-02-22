import {
  defineComponent,
  PropType,
} from 'vue';
import { Block } from '../blocks';
import { SbContextMenu } from './ContextMenu';
import { SbButton } from './Button';

import './TreeBlockSelect.scss';

interface TreeBlockSelectProps {
  block: Block;
}

export const SbTreeBlockSelect = defineComponent({
  name: 'sb-main-menu',

  props: {
    block: {
      type: (null as unknown) as PropType<Block>,
      required: true,
    },
  },

  setup(props: TreeBlockSelectProps, context) {
    return () => (
      <SbContextMenu
        class="sb-tree-block-select"
        v-slots={{
          context: ({ toggle }) => <SbButton onClick={toggle}>Tree</SbButton>,
          default: () => <ul>
            <li>Test</li>
          </ul>,
        }}
      ></SbContextMenu>
    );
  },
});
