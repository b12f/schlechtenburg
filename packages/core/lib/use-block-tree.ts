import {
  Ref,
  reactive,
  inject,
  provide,
  onUnmounted,
} from 'vue';
import {
  BlockTree,
  Block,
} from './blocks';

export const BlockTreeSym = Symbol('Schlechtenburg block tree');
export const BlockTreeRegister = Symbol('Schlechtenburg block tree');
export const BlockTreeUnregister = Symbol('Schlechtenburg block tree');
export function useBlockTree() {
  const blockTree: Ref<BlockTree|null> = inject(BlockTreeSym, null);
  const registerWithParent = inject(BlockTreeRegister, (_: BlockTree) => {});
  const unregisterWithParent = inject(BlockTreeUnregister, (_: BlockTree) => {});

  const self: BlockTree= reactive({
    id: '',
    name: '',
    icon: '',
    children: [],
  });

  // Provide a registration function to child blocks
  provide(BlockTreeRegister, (block: BlockTree) => {
    if (self.children.find((child: BlockTree) => child.id === block.id)) {
      return;
    }

    self.children = [
      ...self.children,
      block,
    ];
  });

  // Provide an unregistration function to child blocks
  provide(BlockTreeUnregister, ({ id }: BlockTree) => {
    self.children = self.children.filter((child: BlockTree) => child.id !== id);
  });

  const register = (block: Block) => {
    if (!block.id) {
      throw new Error(`Cannot register a block without an id: ${JSON.stringify(block)}`);
    }

    self.id = block.id;
    self.name = block.name;

    // Register ourselves at the parent block
    registerWithParent(self);
  }

  // Unregister from parent when we get destroyed
  onUnmounted(() => {
    if (self.id) {
      unregisterWithParent(self);
    }
  });

  return {
    blockTree,
    register,
  };
}
