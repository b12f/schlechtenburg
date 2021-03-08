import { BlockData } from '@schlechtenburg/core';

export interface LayoutData {
  orientation: string;
  children: BlockData<any>[];
}

export const getDefaultData: () => LayoutData = () => ({
  orientation: 'vertical',
  children: [],
});
