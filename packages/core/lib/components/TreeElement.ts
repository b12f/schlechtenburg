import {
  Ref,
  ref,
  inject,
  reactive,
  computed,
  watch,
  provide,
} from 'vue';

export interface BlockDefinition {
  name: string;
  getDefaultData: any;
  edit: () => Promise<any>;
  display: () => Promise<any>;
}

export interface BlockLibraryDefinition {
  [name: string]: BlockDefinition;
}

export interface BlockData { [name: string]: any }

export interface Block {
  name: string;
  blockId: string;
  data: BlockData;
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

interface BlockRect {
  height: number;
  width: number;
  left: number;
  top: number;
}

export const BlockDimensions = Symbol('Schlechtenburg block dimensions');
export const EditorDimensions = Symbol('Schlechtenburg editor dimensions');
export function useResizeObserver(el: Ref<null|HTMLElement>, symbol: symbol) {
  const dimensions: Ref<null|BlockRect> = ref(null);
  provide(symbol, dimensions);
  const triggerSizeCalculation = () => {
    if (!el.value) {
      return;
    }

    const clientRect = el.value.getBoundingClientRect();
    dimensions.value = {
      width: clientRect.width,
      height: clientRect.height,
      left: el.value.offsetLeft,
      top: el.value.offsetTop,
    };
  };

  const resizeObserver = new ResizeObserver(triggerSizeCalculation);
  const mutationObserver = new MutationObserver(triggerSizeCalculation);

  watch(el, () => {
    if (!el.value) {
      return;
    }
    resizeObserver.observe(el.value);
    mutationObserver.observe(el.value, { attributes: true, childList: false, subtree: false });
  });

  return { triggerSizeCalculation, dimensions };
}

export function useBlockSizing() {
  const editorDimensions: Ref<BlockRect|null> = inject(EditorDimensions, ref(null));
  const blockDimensions: Ref<BlockRect|null> = inject(BlockDimensions, ref(null));

  return { editorDimensions, blockDimensions };
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
