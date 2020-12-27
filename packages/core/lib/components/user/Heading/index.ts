import { defineAsyncComponent } from 'vue';
import { getDefaultData } from './util';

export default {
  name: 'sb-heading',
  getDefaultData,
  edit: defineAsyncComponent(() => import('./edit')),
  display: defineAsyncComponent(() => import('./edit')),
};
