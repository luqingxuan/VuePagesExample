require('css/pages/index.css');

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueValidator from 'vue-validator';

// ecosystems
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueValidator);

import Test from 'components/Test.vue';

// class
var IndexView=Vue.extend({
	template:'hello index'
});

// class
var AboutView=Vue.extend({
	template:'hello about'
});

var router = new VueRouter();

// router map
router.map({
	'/':{
		component: IndexView
	},
    '/index': {
        component: IndexView
    },
    '/about': {
        component: AboutView
    }
});

// router processor
router.beforeEach(function (transition) {
	transition.next();
});

// router processor
router.afterEach(function (transition) {
});

var App=Vue.extend({
	components:{
		'test':Test
	},
	data : function() {
		return {
			message : "Hello World"
		};
	}
});

router.start(App,'#app');