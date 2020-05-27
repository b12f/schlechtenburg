import { getDefaultData } from './util';

export default {
  name: 'sb-layout',
  getDefaultData,
  edit: () => import('./edit'),
  display: () => import('./display'),
};
