import {
  Ref,
  ref,
  inject,
  computed,
} from 'vue';

export const SymActiveBlock = Symbol('Schlechtenburg active block');
export function useActivation(currentBlockId: string|null = null) {
  const activeBlockId: Ref<string|null> = inject(SymActiveBlock, ref(null));
  const isActive = computed(() => activeBlockId.value === currentBlockId);
  const activate = (id?: string|null) => {
    activeBlockId.value = id !== undefined ? id : currentBlockId;
  };
  const requestActivation = () => {
    if (activeBlockId.value) {
      return;
    }

    activate();
  };

  return {
    activeBlockId,
    isActive,
    activate,
    requestActivation,
  };
}
