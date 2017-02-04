//  Page CSS
require('css/pages/ideas/index.css');

import Vue from 'vue';
import App from 'modules/App.vue';
import store from 'store/index';
import router from 'router/index';

require('enhance/index.js');

window.App = new Vue({
    store: store,
    router: router,
    render: h => h(App)
});

window.App.$mount('#app');
