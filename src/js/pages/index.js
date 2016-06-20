import Test from 'components/Test.vue';

require('css/pages/index.css');

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