import Vue from 'vue';

import { domain, fromNow } from './filters';

Vue.use(require('vue-resource'));

Vue.http.options.root = '/v1';

Vue.http.options.emulateHTTP = true;

Vue.http.options.emulateJSON = true;

Vue.filter('fromNow', fromNow);

Vue.filter('domain', domain);

require('./router/router');
