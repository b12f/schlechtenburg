import {
  inject,
  reactive,
} from 'vue';
import { BlockLibrary } from './types';

export const SymBlockLibrary = Symbol('Schlechtenburg block library');
export function useDynamicBlocks() {
  const customBlocks: BlockLibrary = inject(SymBlockLibrary, reactive({}));
  const getBlock = (name: string) => customBlocks[name];

  return {
    customBlocks,
    getBlock,
  };
}
