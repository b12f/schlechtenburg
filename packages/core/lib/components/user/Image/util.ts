import { BlockData, BlockProps } from '/@components/TreeElement';

export interface ImageData {
  src: string;
  alt: string;
}

export interface ImageProps extends BlockProps {
  data: ImageData;
  eventUpdate: (b?: BlockData) => void;
}

export const getDefaultData: () => ImageData = () => ({
  src: '',
  alt: '',
});
