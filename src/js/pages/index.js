import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Test from 'components/Test.vue';

require('css/pages/index.css');

Vue.use(VueRouter);
Vue.use(VueResource);

module.exports=new Vue({
	el : '#vue_target',
	components : {
		test : Test
	},
	data : function() {
		return {
			message : "Hello World"
		};

	}
});