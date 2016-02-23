import Vue from 'vue';

import Router from 'vue-router';

import App from '../pages/App.vue';

import Login from '../pages/Login.vue';

import Index from '../pages/Index.vue';

// 路由规则
import RouterADM from './router1';

import RouterDEV from './router2';

import RouterADS from './router3';

Vue.use(Router);

// 用户认证信息标识
var user=null;

Object.defineProperties(Vue.prototype, {
    $user: {
        get: function () {
            return user;
        },
        set: function (obj) {
        	user = obj;
        }
    }
});

var router = new Router();

router.map({
	'/index':{
		component:Index,
		auth:false
	},
	'/login':{
		component:Login,
		auth:false
	}
});

router.map(RouterADM);

router.map(RouterDEV);

router.map(RouterADS);

router.beforeEach(function (transition) {
	
	window.scrollTo(0, 0);

    var user = router.app.$user;

    var to=transition.to;

    var auth = to.auth;
    
    // 配置声明无需登录访问 || 已经登录了，继续访问
    if (auth === false || user)
        transition.next();
    else{
    	
    	var path=to.path;
    	
    	if(path=='/login')
    		path='/index';
    	
    	localStorage.setItem('user_target_path',path);

    	router.go('/login');
    	
    }
            
    
});

// 默认开发者页面
router.redirect({
  '/': '/index'
});

router.start(App, '#app');