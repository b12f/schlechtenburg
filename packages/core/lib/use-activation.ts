import {
  Ref,
  ref,
  inject,
  computed,
  onBeforeUnmount,
} from 'vue';

export const SymActiveBlock = Symbol('Schlechtenburg active block');
export function useActivation(currentBlockId: string|null = null) {
  const activeBlockId: Ref<string|null> = inject(SymActiveBlock, ref(null));

  const isActive = computed(() => activeBlockId.value === currentBlockId);

  const deactivate = (id: string|null = currentBlockId) => {
    if (activeBlockId.value !== id) {
      return;
    }

    activeBlockId.value = null;
  };

  const deactivateCb = (_:Event) => deactivate();

  onBeforeUnmount(() => {
    document.removeEventListener('click', deactivateCb);
  })

  const activate = (id: string|null = currentBlockId) => {
    document.addEventListener('click', deactivateCb, { once: true });
    activeBlockId.value = id;
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
    deactivate,
    requestActivation,
  };
}
