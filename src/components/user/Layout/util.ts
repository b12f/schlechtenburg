import {
  BlockProps,
  BlockData,
} from '@components/TreeElement';

export interface LayoutData {
  orientation: string;
  children: BlockData[];
}

export interface LayoutProps extends BlockProps {
  data: LayoutData;
  eventUpdate: (b?: BlockData) => void;
}

export const getDefaultData: () => LayoutData = () => ({
  orientation: 'vertical',
  children: [],
});
