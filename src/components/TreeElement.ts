import {
  reactive,
  watchEffect,
  PropType,
} from '@vue/composition-api';

type IComponentDefinition = { [name: string]: () => Promise<any> };

type ITreeElement = {
  component: string;
  id: string;
  data: { [name: string]: any };
}

type ITreeElementProps = {
  userComponents: IComponentDefinition;
  id: string;
  data: { [key: string]: any};
};

export const model = {
  prop: 'tree',
  event: 'tree-update',
};

export const treeElementProps = {
  userComponents: {
    type: (Object as unknown) as PropType<IComponentDefinition>,
    required: true,
  },
  component: { type: Object, required: true },
  id: { type: String, required: true },
  data: { type: Object, default: () => ({}) },
};

// export function useActivation

export function useDynamicComponents(components: IComponentDefinition) {
  const getComponent = (name: string) => components[name];

  return { getComponent };
}
