import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import State from './states.js';
import Actions from './actions.js';
import Mutations from './mutations.js';

const store = new Vuex.Store({
    state: State,
    actions: Actions,
    mutations: Mutations
});

export default store;
