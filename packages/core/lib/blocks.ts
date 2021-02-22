import { Component } from 'vue';

export interface BlockDefinition {
  name: string;
  getDefaultData: any;
  edit: Component;
  display: Component;
}

export interface BlockLibraryDefinition {
  [name: string]: BlockDefinition;
}

export interface BlockProps {
  blockId: string;
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
  blockId: {
    type: String,
    default: () => `${+(new Date())}`,
  },
  data: { type: Object, default: () => ({}) },
};
