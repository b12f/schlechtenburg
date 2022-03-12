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

export type OnUpdateSelfCb<T> = (updated: Partial<T>) => void;
export type OnUpdateBlockCb = (updated: IBlockData<any>) => void;
export type OnPrependBlockCb =  (block: IBlockData<any>) => void;
export type OnAppendBlockCb =  (block: IBlockData<any>) => void;
export type OnRemoveSelfCb =  () => void;
export type OnActivatePreviousCb =  () => void;
export type OnActivateNextCb =  () => void;

export interface IBlockProps<T> {
  blockId?: string;
  data?: T,
  onUpdate?: OnUpdateSelfCb<T>;
  onPrependBlock?: OnPrependBlockCb;
  onAppendBlock?: OnAppendBlockCb;
  onRemoveSelf?: OnRemoveSelfCb;
  onActivateNext?: OnActivateNextCb;
  onActivatePrevious?: OnActivatePreviousCb;
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
