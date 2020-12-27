import { defineAsyncComponent } from 'vue';
import { getDefaultData } from './util';

export default {
  name: 'sb-layout',
  getDefaultData,
  edit: defineAsyncComponent(() => import('./edit')),
  display: defineAsyncComponent(() => import('./display')),
};
