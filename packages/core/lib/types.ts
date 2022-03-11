import { Component } from 'vue';

export interface ITreeNode {
  id: string;
  name: string;
  icon?: string;
  children: ITreeNode[];
}

export interface IBlockData<T> {
  id: string;
  name: string;
  data: T;
}

export interface IBlockProps<T> {
  blockId: string;
  data?: T,
  onUpdate?: (b?: IBlockData<T>) => void;
  onPrependBlock?: (b?: IBlockData<T>) => void;
  onAppendBlock?: (b?: IBlockData<T>) => void;
  onRemoveSelf?: () => void;
  onActivateNext?: () => void;
  onActivatePrevious?: () => void;
}

export interface IBlockDefinition<T> {
  name: string;
  icon?: string;
  getDefaultData: T;
  edit: Component<IBlockProps<T>>;
  display: Component<IBlockProps<T>>;
}

export interface IBlockLibrary {
  [name: string]: IBlockDefinition<any>;
}
