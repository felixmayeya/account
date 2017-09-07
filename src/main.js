import Vue from 'vue'
import VueRouter from 'vue-router'
import '../theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './config/routes'
import Mock from './mock'
import Distpicker from 'v-distpicker'
import $ from 'jquery'
// Mock.bootstrap();


Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.component('v-distpicker', Distpicker)

// Vue.prototype.$api = api

const router = new VueRouter({
	//mode: 'history',
  	routes: routes
})
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/') {
    sessionStorage.removeItem('user');
  }
  if (!sessionStorage.getItem('user') && to.path != '/') {
    next({ path: '/' })
  } else {
    next()
  }
})


new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
})
