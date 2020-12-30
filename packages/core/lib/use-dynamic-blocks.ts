import {
  ref,
  inject,
  reactive,
} from 'vue';
import { BlockLibraryDefinition } from '/@/blocks';
import { Mode, SbMode } from '/@/mode';

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
