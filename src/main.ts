import Vue from 'vue';
import Vuex from 'vuex';
import VueCompositionApi from '@vue/composition-api';
import VueSchlechtenburg from './lib';
import App from './App';

import './main.scss';

Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store({});
Vue.use(VueCompositionApi);
Vue.use(VueSchlechtenburg);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
