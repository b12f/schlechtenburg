import {
  BlockProps,
  Block,
  BlockData,
} from '/@/blocks';

export interface LayoutData {
  orientation: string;
  children: Block[];
}

export interface LayoutProps extends BlockProps {
  data: LayoutData;
  eventUpdate: (b?: BlockData) => void;
}

export const getDefaultData: () => LayoutData = () => ({
  orientation: 'vertical',
  children: [],
});
