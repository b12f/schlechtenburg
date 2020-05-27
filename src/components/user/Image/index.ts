import { getDefaultData } from './util';

export default {
  name: 'sb-image',
  getDefaultData,
  edit: () => import('./edit'),
  display: () => import('./display'),
};
