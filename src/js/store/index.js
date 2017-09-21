import Vuex from 'vuex';

import State from './states.js';
import Actions from './actions.js';
import Mutations from './mutations.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: State,
    actions: Actions,
    mutations: Mutations
});

export default store;
