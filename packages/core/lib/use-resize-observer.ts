import {
  Ref,
  ref,
  inject,
  watch,
  provide,
} from 'vue';

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
