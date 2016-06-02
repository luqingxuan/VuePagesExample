require('../../css/pages/index.css');

var Test = require('../component/Test.vue');

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