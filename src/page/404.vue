<template>
	<div class="container">
		<h3>404 <span>Not Found</span></h3>
		<img src="../img/kangnajiang.gif" class="kn"/>
		<p>您访问的页面找不到了！(＞﹏＜)</p>
		<a @click="$router.push(role_url)">回到首页</a>
	</div>
</template>

<script>
export default {
  data() {
    return {
      role_url: ''
    }
  },
  methods: {

  },
  mounted() {
		var role = localStorage.getItem("ROLE");
		if(role === "hr"){
			this.role_url = '/employee/list';
		}else{
			this.role_url = '/client/list';
		}
  }
}
</script>

<style scoped lang="scss">
	.container{
		box-sizing: border-box;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #F9F6F1;
		h3{
			margin:0;
			line-height: 140px;
			text-align: center;
			font-size: 80px;
			color: lightpink;
			span{
				font-size: 40px;
				color: #5b9bd1;
			}
		}
		.kn{
			display: block;
			width: 480px;
			margin:auto;
		}
		p{
			margin-top: 30px;
			text-align: center;
			font-size: 18px;
			color: #5b9bd1;
		}
		a{
			display: block;
			width: 80px;
			text-align: center;
			margin:auto;
			color: #5b9bd1;
			cursor: pointer;
			text-decoration: underline;
			&:hover{
				color: lightpink;
			}
		}
	}

</style>
