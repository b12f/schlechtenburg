import { IBlockData } from '@schlechtenburg/core';

export interface LayoutData {
  orientation: string;
  children: IBlockData<any>[];
}

export const getDefaultData: () => LayoutData = () => ({
  orientation: 'vertical',
  children: [],
});
