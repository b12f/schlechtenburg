import { getDefaultData } from './util';

export default {
  name: 'sb-heading',
  getDefaultData,
  edit: () => import('./edit'),
  display: () => import('./edit'),
};
