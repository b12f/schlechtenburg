import { defineAsyncComponent } from 'vue';
import { getDefaultData } from './util';

export default {
  name: 'sb-image',
  getDefaultData,
  edit: defineAsyncComponent(() => import('./edit')),
  display: defineAsyncComponent(() => import('./display')),
};
