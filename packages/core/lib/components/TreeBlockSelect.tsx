import {
  defineComponent,
  PropType,
} from 'vue';
import {
  Block,
  BlockTree,
} from '../blocks';
import { useBlockTree } from '../use-block-tree';
import { useActivation } from '../use-activation';

import { SbContextMenu } from './ContextMenu';
import { SbButton } from './Button';

import './TreeBlockSelect.scss';

interface TreeBlockSelectProps {
  block: Block;
}

export const SbTreeBlockSelect = defineComponent({
  name: 'sb-main-menu',

  setup() {
    const { blockTree } = useBlockTree();
    const {
      activate,
      activeBlockId,
    } = useActivation();

    const treeToHtml = (tree: BlockTree, close: Function) => <li
      class={{
        'sb-tree-block-select__block': true,
        'sb-tree-block-select__block_active': activeBlockId.value === tree.id,
      }}
    >
      <button
        class="sb-tree-block-select__block-name"
        onClick={() => {
          activate(tree.id);
          close();
        }}
        onMouseEnter={() => activate(tree.id)}
      >{tree.name}</button>
      {tree.children.length
        ? <ul class="sb-tree-block-select__list">
          {tree.children.map((child: BlockTree) => treeToHtml(child, close))}
        </ul>
          : null
      }
    </li>;

    return () => (
      blockTree.value
        ?  <SbContextMenu
          class="sb-tree-block-select"
          v-slots={{
            context: ({ toggle }) => <SbButton onClick={toggle}>Tree</SbButton>,
            default: ({ close }) => <ul
              class="sb-tree-block-select__list sb-tree-block-select__list_base"
            >{treeToHtml(blockTree.value, close)}</ul>,
          }}
        />
        : ''
    );
  },
});
