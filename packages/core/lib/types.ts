import { Component } from 'vue';

export interface TreeNode {
  id: string;
  name: string;
  icon?: string;
  children: TreeNode[];
}

export interface BlockData<T> {
  id: string;
  name: string;
  data: T;
}

export interface BlockProps<T> {
  blockId: string;
  data?: T,
  onUpdate?: (b?: BlockData<T>) => void;
  onPrependBlock?: (b?: BlockData<T>) => void;
  onAppendBlock?: (b?: BlockData<T>) => void;
  onRemoveSelf?: () => void;
  onActivateNext?: () => void;
  onActivatePrevious?: () => void;
}

export interface BlockDefinition<T> {
  name: string;
  icon?: string;
  getDefaultData: T;
  component: Component<BlockProps<T>>;
}

export interface BlockLibrary {
  [name: string]: BlockDefinition<any>;
}
