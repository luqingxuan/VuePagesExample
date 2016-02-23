import Page1 from '../pages/Page1.vue';

import Page2 from '../pages/Page2.vue';

import Page3 from '../pages/Page3.vue';

// 管理员路由配置
export default
{
	'/page1': {
	    component: Page1,
	    auth:false// 无需登录权限
	 },
	 '/page2': {
	    component: Page2
	 },
	 '/page3': {
	    component: Page3
	 }
};