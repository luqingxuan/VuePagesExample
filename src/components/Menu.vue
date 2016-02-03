<template>
	<div id="g_menu" class='pull-left g-menu'>
		<div class='g-container clearfix'>
			
			<div class="menu-toggle">
				<i class="fa fa-bars"></i>
			</div>
			
			<ul class="list-unstyled clearfix">
				<li class="pull-left menu-item">
					<a v-link="{path:'/dev/index'}">
						<span class="fa fa-home"></span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页
					</a>
				</li>
				<li class="pull-left menu-item">
					<a v-link="{path:'/dev/app/index'}">
						<span class="fa fa-legal"></span>应用管理
					</a>
				</li>
				<li class="pull-left menu-item">
					<a v-link="{path:'/dev/data/index'}">
						<span class="fa fa-eye"></span>数据管理
					</a>
				</li>
				<li class="pull-left menu-item">
					<a v-link="{path:'/dev/finance/index'}">
						<span class="fa fa-gears"></span>财务管理
					</a>
				</li>
				<li class="pull-left menu-item">
					<a v-link="{path:'/dev/user/index'}">
						<span class="fa fa-paw"></span>用户管理
					</a>
				</li><li class="pull-left menu-item">
					<a v-link="{path:'/dev/log/index'}">
						<span class="fa fa-rocket"></span>操作记录
					</a>
				</li>
			</ul>
		</div>
	</div>			
</template>

<script>

</script>

<style lang="less">
	
	.g-main{
		background-color:#293038;
	}
	
	.g-menu{
		width:130px;
		margin-left: -100%;
	}
	
	.g-menu .menu-toggle{
		background-color:#323A43;
		height:35px;
		line-height:35px;	
    	text-align: right;
    	color:#525961;
	}
	
	.g-menu .menu-toggle .fa{
		cursor:pointer;
		margin-right:10px;
		font-size: 1.2em;
	}
	
	.g-menu ul{
		margin:0;
	}
	
	.g-menu .menu-item{
		width:100%;
		cursor:pointer;
	}

	.g-menu a{
		display:block;
		padding:10px;
		outline:none;
		color:white;
		text-decoration:none;
	}
		
	.g-menu .v-link-active{
		background-color:#0098CE;
	}
	
	.g-menu .menu-item .fa{
		font-size:1.2em;
		margin-right:10px;
	}
	
	.g-body{
		width:100%;
	}
	
	.g-body .g-container{
		margin-left:130px;
		background-color:#EAEDF1;
	}
	
</style>