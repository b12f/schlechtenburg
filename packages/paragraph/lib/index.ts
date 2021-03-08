import { defineAsyncComponent } from 'vue';
import { getDefaultData } from './util';

export * from './util';
export const name = 'sb-paragraph';

export default {
  name,
  getDefaultData,
  component: defineAsyncComponent(() => import('./edit')),
};
