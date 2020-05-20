/* eslint no-param-reassign: 0 */
import { GetterTree, MutationTree, ActionTree } from 'vuex';

interface State {
  activeBlockId: number|null;
}

const state: State = {
  activeBlockId: null,
};

const getters = {
  activeBlockId: (s) => s.activeBlockId,
} as GetterTree<State, any>;

const actions = {
  setActiveBlock({ commit }, id) {
    commit('setActiveBlock', id);
  },
} as ActionTree<State, any>;

const mutations = {
  setActiveBlock(s, id) {
    s.activeBlockId = id;
  },
} as MutationTree<State>;

const SchlechtenburgModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default SchlechtenburgModule;
