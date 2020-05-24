import {
  BlockProps,
  BlockDefinition,
} from '@components/TreeElement';

export interface LayoutData {
  orientation: string;
  children: BlockDefinition[];
}

export interface LayoutProps extends BlockProps {
  data: LayoutData;
}

export const getDefaultData: () => LayoutData = () => ({
  orientation: 'vertical',
  children: [],
});
