import { defineAsyncComponent } from 'vue';
import { getDefaultData } from './util';

export * from './util';
export const name = 'sb-heading';

export default {
  name,
  getDefaultData,
  edit: defineAsyncComponent(() => import('./edit')),
  display: defineAsyncComponent(() => import('./edit')),
};
