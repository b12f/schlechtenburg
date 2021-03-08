import { defineAsyncComponent } from 'vue';

export default {
  name: 'sb-missing-block',
  edit: defineAsyncComponent(() => import('./display')),
  display: defineAsyncComponent(() => import('./display')),
};
