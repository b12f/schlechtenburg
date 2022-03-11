import {
  IBlockData,
  generateBlockId,
} from '@schlechtenburg/core';
import {
  name as paragraphName,
  IParagraphData,
  getDefaultData as getDefaultParagraphData
} from '@schlechtenburg/paragraph';

export interface IImageData {
  src: string;
  alt: string;
  description: IBlockData<IParagraphData>;
}

export const getDefaultData: () => IImageData = () => ({
  src: '',
  alt: '',
  description: {
    id: generateBlockId(),
    name: paragraphName,
    data: getDefaultParagraphData(),
  },
});
