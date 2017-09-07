<template>
  <el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<img src="../img/LOGO_02.png" v-if="!collapsed" @click="logoClick"/>
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="el-icon-menu"></i>
				</div>
			</el-col>
      <el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<!-- <el-dropdown-item>我的消息</el-dropdown-item> -->
            <el-dropdown-item @click.native="$router.push('/employee/setting')">个人设置</el-dropdown-item>
						<el-dropdown-item @click.native="$router.push('/employee/help')">使用指南</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
  					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i> {{item.name}}</template>
							<el-menu-item v-for="child in item.children" :key="child" :index="item.path+'/'+child.path" v-if="!child.hidden" @click="$router.push(item.path+'/'+child.path)"><i :class="child.iconCls"></i> {{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.children[0].iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-if="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(item.path+'/'+child.path)"><i :class="child.iconCls"></i> {{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.children[0].iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">

						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view v-on:message="recieveMessage"></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>
<script>
	export default {
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
      recieveMessage: function (text) {
        this.sysUserAvatar = text;
      },
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
      logoClick: function() {
        let role = localStorage.getItem("ROLE");
        if(role === "hr"){
          this.$router.push('/employee/list');
        }else{
          this.$router.push('/client/list');
        }
      },
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
    mounted() {
      let role = localStorage.getItem("ROLE");
      if(role === "hr"){
        this.$router.options.routes[1].hidden = true;
        this.$router.options.routes[2].hidden = false;
        this.$router.options.routes[3].hidden = true;
      }else if(role === "sales"){
        this.$router.options.routes[1].hidden = false;
        this.$router.options.routes[2].hidden = true;
        this.$router.options.routes[3].hidden = true;
      }else{
        this.$router.options.routes[1].hidden = false;
        this.$router.options.routes[2].hidden = false;
        this.$router.options.routes[3].hidden = false;
      }
			let user = sessionStorage.getItem('user');
			if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name;
        if(user.head == null){return false;}
				this.sysUserAvatar = user.head;
			}
		}
	}
</script>
<style scoped lang="scss">
$color-primary: #3B3F51;//#18c79c
.el-dropdown-menu{
  z-index: 20000!important;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  padding:0;
  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color:#fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color:#fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height:100%;
      border-color: rgba(238,241,146,0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 210px;
        float: left;
        margin: 18px 0 0 10px;
        cursor: pointer;
      }
      .txt {
        color:#fff;
      }
    }
    .logo-width{
      width:230px;
    }
    .logo-collapse-width{
      width:60px
    }
    .tools{
      padding: 0px 23px;
      width:14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex:0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu{
        height: 100%;
      }
      .collapsed{
        width:60px;
        .item{
          position: relative;
        }
        .submenu{
          position:absolute;
          top:0px;
          left:60px;
          z-index:99999;
          height:auto;
          display:none;
        }

      }
    }
    .menu-collapsed{
      flex:0 0 60px;
      width: 60px;
    }
    .menu-expanded{
      flex:0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex:1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
          font-size: 22px;
          margin-bottom:10px;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
