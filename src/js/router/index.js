import Vue from 'vue';
import VueRouter from 'vue-router';

// ecosystems
Vue.use(VueRouter);

// mapping
let routes = [{
    path: '/',
    component: require('modules/Hello.vue'),
    meta: {}
}, {
    path: '/login',
    component: require('modules/Login.vue'),
    meta: {}
}, {
    path: '/about',
    component: require('modules/About.vue'),
    meta: {}
}];

let router = new VueRouter({
    routes: routes,
    mode: 'hash'
});

// router processor
router.beforeEach(function(to, from, next) {
    next();
});

// router processor
router.afterEach(function(to, from, next) {

});

export default router;
