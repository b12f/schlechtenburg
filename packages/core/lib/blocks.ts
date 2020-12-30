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

export interface BlockProps<T> {
  blockId: string;
  data: T;
}

export interface Block<T> extends BlockProps<T> {
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
