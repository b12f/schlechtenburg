import {
  Context,
} from '@vue/composition-api';

type IComponentDefinition = { [name: string]: () => Promise<any> };

type IBlockData = {
  name: string;
  id: string;
  data: { [name: string]: any };
}

type ITreeElementProps = {
  id: string;
  data: { [key: string]: any};
};

export const model = {
  prop: 'block',
  event: 'block-update',
};

export const blockProps = {
  id: { type: String, required: true },
  data: { type: Object, default: () => ({}) },
};

// export function useActivation

export function useDynamicBlocks(context: Context) {
  const getBlock = (name: string) => context.root.$sb.blocks[name];

  return { getBlock };
}
