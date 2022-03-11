import {
  ref,
  Ref,
  reactive,
  inject,
  provide,
  onUnmounted,
} from 'vue';
import {
  ITreeNode,
  IBlockData,
} from './types';

export const SymBlockTree= Symbol('Schlechtenburg block tree');
export const SymBlockTreeRegister = Symbol('Schlechtenburg block tree register');
export const SymBlockTreeUnregister = Symbol('Schlechtenburg block tree unregister');

export function useBlockTree() {
  const blockTree: Ref<ITreeNode|null> = inject(SymBlockTree, ref(null));
  const registerWithParent = inject(SymBlockTreeRegister, (_: ITreeNode) => {});
  const unregisterWithParent = inject(SymBlockTreeUnregister, (_: ITreeNode) => {});

  const self: ITreeNode = reactive({
    id: '',
    name: '',
    icon: '',
    children: [],
  });

  // Provide a registration function to child blocks
  provide(SymBlockTreeRegister, (block: ITreeNode) => {
    if (self.children.find((child: ITreeNode) => child.id === block.id)) {
      return;
    }

    self.children = [
      ...self.children,
      block,
    ];
  });

  // Provide an unregistration function to child blocks
  provide(SymBlockTreeUnregister, ({ id }: ITreeNode) => {
    self.children = self.children.filter((child: ITreeNode) => child.id !== id);
  });

  const register = (block: IBlockData<any>) => {
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
