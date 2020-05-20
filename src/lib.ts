import Vuex from 'vuex';
import storeModule from './store';
/* eslint no-param-reassign: 0 */

export default {
  install(Vue, { store }: { store: Vuex }) {

    store.registerModule('sb', storeModule);

    Vue.component('sb-layout', () => import('@user/Layout'));
    Vue.component('sb-image', () => import('@user/Image'));
    Vue.component('sb-paragraph', () => import('@user/Paragraph'));
    Vue.component('sb-heading', () => import('@user/Heading'));
  },
};
