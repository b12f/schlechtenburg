import {
  Ref,
  ref,
  inject,
  computed,
} from 'vue';

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
