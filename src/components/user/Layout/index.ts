import { getDefaultData } from './util';

export default {
  name: 'sb-layout',
  getDefaultData,
  edit: () => import('./edit.tsx'),
  display: () => import('./display.tsx'),
};
