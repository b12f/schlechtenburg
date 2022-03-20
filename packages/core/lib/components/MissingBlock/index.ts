import { defineAsyncComponent } from 'vue';

export default {
  name: 'sb-missing-block',
  edit: defineAsyncComponent(() => import('./view')),
  view: defineAsyncComponent(() => import('./view')),
};
