import { BlockProps } from '@components/TreeElement';

export interface ParagraphData {
  value: string;
  align: string;
}

export interface ParagraphProps extends BlockProps {
  data: ParagraphData;
}

export const getDefaultData: () => ParagraphData = () => ({
  value: '',
  align: 'left',
});
