<template>
	<div id="g_top" class='g-top'>
		<div class='g-container clearfix'>
			 <h1 class="pull-left top-logo">
			 	<a>ADroi 广告平台</a>
			 </h1>
			 <ul class="pull-right list-unstyled top-menu">
			 	<li class="pull-left menu-item">
			 		<a v-link="{path:'/dev/message/index'}">
			 			通知<i class="fa fa-angle-down"></i>
					</a>		
			 	<li class="pull-left menu-item">
			 		<a v-link="{path:'/dev/feedback/index'}">
			 			问题反馈<i class="fa fa-angle-down"></i></li></a>
			 	<li class="pull-left menu-item">
			 		<a>李鹏飞<i class="fa fa-angle-down"></i></li></a>
			 </ul>
		</div>
	</div>
</template>

<script>

</script>

<style lang="less">

	.g-top .g-container{
		color:white;
		padding:10px;
		background:#0098CB;
	}
	
	.g-top .top-logo,.g-top .top-menu{
		margin:0;
	}
	
	.g-top .top-logo{
		font-size:14px;
	}
	
	.g-top .top-logo a{
		color:white;
		text-decoration:none;
	}
	
	.g-top .menu-item{
		margin-left:30px;
	}
	
	.g-top .menu-item a{
		outline:none;
		cursor:pointer;
		text-decoration:none;
		color:white;
	}
	
	.g-top .menu-item .fa{
		margin-left:3px;
	}
	
</style>