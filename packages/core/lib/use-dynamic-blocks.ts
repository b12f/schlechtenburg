import {
  ref,
  inject,
  reactive,
} from 'vue';
import { IBlockLibrary } from './types';
import { Mode, SbMode } from './mode';

export const SymBlockLibrary = Symbol('Schlechtenburg block library');
export function useDynamicBlocks() {
  const mode = inject(Mode, ref(SbMode.Edit));
  const customBlocks: IBlockLibrary = inject(SymBlockLibrary, reactive({}));
  const getBlock = (name: string) => customBlocks[name];

  return {
    mode,
    customBlocks,
    getBlock,
  };
}
