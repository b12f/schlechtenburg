import {
  BlockData,
  generateBlockId,
} from '@schlechtenburg/core';
import {
  name as paragraphName,
  ParagraphData,
  getDefaultData as getDefaultParagraphData
} from '@schlechtenburg/paragraph';

export interface ImageData {
  src: string;
  alt: string;
  description: BlockData<ParagraphData>;
}

export const getDefaultData: () => ImageData = () => ({
  src: '',
  alt: '',
  description: {
    id: generateBlockId(),
    name: paragraphName,
    data: getDefaultParagraphData(),
  },
});
