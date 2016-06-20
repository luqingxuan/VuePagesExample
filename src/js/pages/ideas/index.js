require('css/pages/goods/index.css');

var Test = require('components/Test.vue');

module.exports = new Vue({
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