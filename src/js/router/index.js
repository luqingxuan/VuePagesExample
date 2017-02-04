import Vue from 'vue';
import VueRouter from 'vue-router';

// ecosystems
Vue.use(VueRouter);

// mapping
let routes = [{
    path: '/',
    component: require('modules/Test.vue'),
    meta: {}
}, {
    path: '/login',
    component: require('modules/Login.vue'),
    meta: {
        auth: false
    }
}, {
    path: '/about',
    component: require('modules/About.vue'),
    meta: {
        auth: false
    }
}, {
    path: '/hello',
    component: require('modules/Hello.vue'),
    meta: {
        auth: false
    }
}];

let router = new VueRouter({
    routes: routes,
    mode: 'hash'
});

// router processor
router.beforeEach(function(to, from, next) {
    let meta = to.meta || {};

    // 不需要登陆即可访问 OR 已经登录
    if (meta.auth === false || Auth.isValid())
        next();
    else {
        // 页面跳转
        let goTo = {
            path: '/login',
            query: {}
        };

        // 根路径
        let isRootPath = to.path === '/';
        //登陆页
        let isLoginPath = /\/login/.test(to.path);

        // 登陆后跳转路径
        if (!isRootPath && !isLoginPath)
            goTo.query.redirectTo = to.path;

        next(goTo);
    }

});

// router processor
router.afterEach(function(to, from, next) {
    document.body.scrollTop = 0;
});

export default router;
