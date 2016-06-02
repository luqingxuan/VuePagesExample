import Test from '../component/Test.vue';

require('../../css/pages/index.css');

class App extends Vue{
	
	constructor(props) {
  
		super(props);
	
	}
}

new App({
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