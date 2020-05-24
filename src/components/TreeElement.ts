import {
  Ref,
  ref,
  inject,
  reactive,
  computed,
} from '@vue/composition-api';

export const ActiveBlock = Symbol('Schlechtenburg active block');
export const BlockLibrary = Symbol('Schlechtenburg block library');

export interface BlockDefinition {
  name: string;
  edit: () => Promise<any>;
  display: () => Promise<any>;
}

export interface BlockLibraryDefinition {
  [name: string]: BlockDefinition;
}

export interface BlockData {
  name: string;
  blockId: string|number;
  data: { [name: string]: any };
}

export interface BlockProps {
  blockId: string|number;
  data: { [key: string]: any};
}

export const model = {
  prop: 'block',
  event: 'update',
};

export const blockProps = {
  blockId: { type: [String, Number], required: true },
  data: { type: Object, default: () => ({}) },
};

export function useDynamicBlocks() {
  const customBlocks: BlockLibraryDefinition = inject(BlockLibrary, reactive({}));
  const getBlock = (name: string) => customBlocks[name];

  return { customBlocks, getBlock };
}

export function useActivation(currentBlockId: string|number) {
  const activeBlockId: Ref<string|number|null> = inject(ActiveBlock, ref(null));
  const isActive = computed(() => activeBlockId.value === currentBlockId);
  const activate = (blockId?: string|number|null) => {
    activeBlockId.value = blockId !== undefined ? blockId : currentBlockId;
  };

  return {
    isActive,
    activate,
  };
}
