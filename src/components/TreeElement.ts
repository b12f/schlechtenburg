import {
  Ref,
  ref,
  inject,
  reactive,
  computed,
} from '@vue/composition-api';

export interface BlockDefinition {
  name: string;
  getDefaultData: any;
  edit: () => Promise<any>;
  display: () => Promise<any>;
}

export interface BlockLibraryDefinition {
  [name: string]: BlockDefinition;
}

export interface BlockData {
  name: string;
  blockId: string;
  data: { [name: string]: any };
}

export interface BlockProps {
  blockId: string;
  data: { [key: string]: any};
}

export const model = {
  prop: 'block',
  event: 'update',
};

export const blockProps = {
  blockId: { type: String, required: true },
  eventUpdate: {
    type: (Function as unknown) as (b: any) => void,
    default: () => () => undefined,
  },
  data: { type: Object, default: () => ({}) },
};

export enum SbMode {
  Edit = 'edit',
  Display = 'display',
}
export const Mode = Symbol('Schlechtenburg mode');
export const BlockLibrary = Symbol('Schlechtenburg block library');
export function useDynamicBlocks() {
  const mode = inject(Mode, ref(SbMode.Edit));
  const customBlocks: BlockLibraryDefinition = inject(BlockLibrary, reactive({}));
  const getBlock = (name: string) => customBlocks[name][mode.value];

  return {
    mode,
    customBlocks,
    getBlock,
  };
}

export const ActiveBlock = Symbol('Schlechtenburg active block');
export function useActivation(currentBlockId: string) {
  const activeBlockId: Ref<string|null> = inject(ActiveBlock, ref(null));
  const isActive = computed(() => activeBlockId.value === currentBlockId);
  const activate = (blockId?: string|null) => {
    activeBlockId.value = blockId !== undefined ? blockId : currentBlockId;
  };
  const requestActivation = () => {
    if (activeBlockId.value) {
      return;
    }

    activate();
  };

  return {
    isActive,
    activate,
    requestActivation,
  };
}
