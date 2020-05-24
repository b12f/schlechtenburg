import { BlockProps } from '@components/TreeElement';

export interface ParagraphData {
  value: string;
}

export interface ParagraphProps extends BlockProps {
  data: ParagraphData;
}

export const getDefaultData: () => ParagraphData = () => ({ value: '' });
