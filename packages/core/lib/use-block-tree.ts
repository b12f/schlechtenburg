import {
  ref,
  Ref,
  reactive,
  inject,
  provide,
  onUnmounted,
} from 'vue';
import {
  TreeNode,
  BlockData,
} from './types';

export const SymBlockTree= Symbol('Schlechtenburg block tree');
export const SymBlockTreeRegister = Symbol('Schlechtenburg block tree register');
export const SymBlockTreeUnregister = Symbol('Schlechtenburg block tree unregister');
export function useBlockTree() {
  const blockTree: Ref<TreeNode|null> = inject(SymBlockTree, ref(null));
  const registerWithParent = inject(SymBlockTreeRegister, (_: TreeNode) => {});
  const unregisterWithParent = inject(SymBlockTreeUnregister, (_: TreeNode) => {});

  const self: TreeNode = reactive({
    id: '',
    name: '',
    icon: '',
    children: [],
  });

  // Provide a registration function to child blocks
  provide(SymBlockTreeRegister, (block: TreeNode) => {
    if (self.children.find((child: TreeNode) => child.id === block.id)) {
      return;
    }

    self.children = [
      ...self.children,
      block,
    ];
  });

  // Provide an unregistration function to child blocks
  provide(SymBlockTreeUnregister, ({ id }: TreeNode) => {
    self.children = self.children.filter((child: TreeNode) => child.id !== id);
  });

  const register = (block: BlockData<any>) => {
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
