import { Component } from 'vue';

export interface BlockTree {
  id: string;
  name: string;
  icon?: string;
  children?: BlockTree[];
}

export interface BlockDefinition {
  name: string;
  icon?: string;
  getDefaultData: any;
  edit: Component;
  display: Component;
  getChildren?: (block: Block) => Block[],
}

export interface BlockLibraryDefinition {
  [name: string]: BlockDefinition;
}

export interface BlockProps {
  id: string;
  data: any;
}

export interface Block extends BlockProps {
  name: string;
}

export const model = {
  prop: 'block',
  event: 'update',
};

export const blockProps = {
  id: {
    type: String,
    default: () => `${+(new Date())}`,
  },
  data: { type: Object, default: () => ({}) },
};
