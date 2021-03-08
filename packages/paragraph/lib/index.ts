import { defineAsyncComponent } from 'vue';
import { getDefaultData } from './util';

export * from './util';

export default {
  name: 'sb-paragraph',
  getDefaultData,
  edit: defineAsyncComponent(() => import('./edit')),
  display: defineAsyncComponent(() => import('./display')),
};