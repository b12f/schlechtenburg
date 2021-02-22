import {
  computed,
  defineComponent,
  PropType,
} from 'vue';
import {
  Block,
  BlockTree,
} from '../blocks';
import { useDynamicBlocks } from '../use-dynamic-blocks';

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
    const { getBlock } = useDynamicBlocks();

    const getTreeForBlock = (block: Block): BlockTree => {
      const getBlockChildren = getBlock(block.name)?.getChildren;
      // TODO: vue-jxs apparently cannot parse arrow functions here
      const getChildren = getBlockChildren || function ({ data }) { return data?.children; };
      const children = getChildren(block) || [];
      return {
        name: block.name,
        children: children.map(getTreeForBlock),
      };
    };

    const tree = computed(() => getTreeForBlock(props.block));

    const treeToHtml = (tree: BlockTree) => <li>
      {tree.name}
      {tree.children.length ? <ul>{tree.children.map(treeToHtml)}</ul> : null}
    </li>;

    return () => (
      <SbContextMenu
        class="sb-tree-block-select"
        v-slots={{
          context: ({ toggle }) => <SbButton onClick={toggle}>Tree</SbButton>,
          default: () => <ul>{treeToHtml(tree.value)}</ul>,
        }}
      />
    );
  },
});
