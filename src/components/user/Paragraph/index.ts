import { getDefaultData } from './util';

export default {
  name: 'sb-paragraph',
  getDefaultData,
  edit: () => import('./edit'),
  display: () => import('./edit'),
};
