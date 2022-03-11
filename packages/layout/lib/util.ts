import { IBlockData } from '@schlechtenburg/core';

export interface ILayoutData {
  orientation: string;
  children: IBlockData<any>[];
}

export const getDefaultData: () => ILayoutData = () => ({
  orientation: 'vertical',
  children: [],
});
