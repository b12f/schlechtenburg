import { defineComponent } from 'vue';
import { TreeNode } from '../types';
import { useBlockTree } from '../use-block-tree';
import { useActivation } from '../use-activation';

import { SbContextMenu } from './ContextMenu';
import { SbButton } from './Button';

import './TreeBlockSelect.scss';

export const SbTreeBlockSelect = defineComponent({
  name: 'sb-main-menu',

  setup() {
    const { blockTree } = useBlockTree();
    const {
      activate,
      activeBlockId,
    } = useActivation();

    const treeToHtml = (tree: TreeNode, close: Function) => <li
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
        onMouseenter={() => activate(tree.id)}
      >{tree.name}</button>
      {tree.children?.length
        ? <ul class="sb-tree-block-select__list">
          {tree.children?.map((child: TreeNode) => treeToHtml(child, close))}
        </ul>
          : null
      }
    </li>;

    return () => (
      blockTree.value
        ?  <SbContextMenu
          class="sb-tree-block-select"
          v-slots={{
            context: ({ toggle }: { toggle: Function }) => <SbButton {...{ onClick: toggle }}>Tree</SbButton>,
            default: ({ close }: { close: Function }) => <ul
              class="sb-tree-block-select__list sb-tree-block-select__list_base"
            >{treeToHtml(blockTree.value as TreeNode, close)}</ul>,
          }}
        />
        : ''
    );
  },
});
