import { BlockProps } from '@components/TreeElement';

export interface ImageData {
  src: string;
  alt: string;
}

export interface ImageProps extends BlockProps {
  data: ImageData;
}

export const getDefaultData: () => ImageData = () => ({
  src: '',
  alt: '',
});
