import Vue from 'vue';

import Router from 'vue-router';

import App from '../pages/App.vue';
import Index from '../pages/Index.vue';

// 路由规则
import RouterADM from './router1';
import RouterDEV from './router2';
import RouterADS from './router3';

Vue.use(Router);

var router = new Router();

router.map({
	'/index':{
		component:Index
	}
});

router.map(RouterADM);

router.map(RouterDEV);

router.map(RouterADS);

router.beforeEach(function () {
	
  window.scrollTo(0, 0);

});

// 默认开发者页面
router.redirect({
  '/': '/index'
});

router.start(App, '#app');