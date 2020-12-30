import {
  ParagraphData,
  getDefaultData as getDefaultParagraphData
} from '/@user/Paragraph/util';
import { BlockData, BlockProps } from '/@/blocks';

export interface ImageData {
  src: string;
  alt: string;
  description: ParagraphData;
}

export interface ImageProps extends BlockProps {
  data: ImageData;
  eventUpdate: (b?: BlockData) => void;
}

export const getDefaultData: () => ImageData = () => ({
  src: '',
  alt: '',
  description: getDefaultParagraphData(),
});
