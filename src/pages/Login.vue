<template>
	<div class="text-center"> 
		<p>Login</p>
		<button @click="login">登录</button> 
	</div>

</template>

<script>

	module.exports={
		data:function(){
			return {};
		},
		methods:{
			login:function(){
			
				this.$user={
					user:"test",
					pass:"8888"
				};
				
				var path=localStorage.getItem('user_target_path');
				
				localStorage.removeItem('user_target_path');
				
				this.$route.router.go({
					path:path || '/index'
				});
			}
		}
	};
</script>

<style lang="less">
	
</style>