//  Page CSS
require('css/pages/index.css');

import Vue from 'vue';
import VueValidate from 'vee-validate';

import App from 'modules/App.vue';
import store from 'store/index';
import router from 'router/index';

Vue.use(VueValidate);

require('enhance/index.js');

window.App = new Vue({
    store: store,
    router: router,
    render: h => h(App)
});

window.App.$mount('#app');
