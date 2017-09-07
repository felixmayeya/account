// 引入子路由
import Frame from '../frame/subroute.vue'

// 引用模板
import index from '../page/index.vue'
import userList from '../page/client/list.vue'
import userDetail from '../page/client/detail.vue'
import createUser from '../page/client/new.vue'
import employeeList from '../page/employee/list.vue'
import employeeDetail from '../page/employee/detail.vue'
import createEmployee from '../page/employee/new.vue'
import menuList from '../page/productMix/menuList.vue'
import moduleList from '../page/productMix/moduleList.vue'
import roleList from '../page/productMix/roleList.vue'
import productList from '../page/productMix/productList.vue'
import menuInModule from '../page/productMix/menuInModule.vue'
import moduleInRole from '../page/productMix/moduleInRole.vue'
import NotFoundComponent from '../page/404.vue'
import setting from '../page/setting.vue'
import help from '../page/help.vue'

// 配置路由
export default [{
    path: '/',
    component: index,
    name: '',
    hidden: true
}, {
    path: '/client',
    component: Frame,
    name: '客户管理',
    iconCls: 'el-icon-star-on',
    hidden: false,
    children: [
        { path: 'list', component: userList, name: '客戶列表',iconCls: 'el-icon-setting'},
        { path: 'new', component: createUser, name: '新建客户',iconCls: 'el-icon-document'},
        { path: 'detail/:clientId', component: userDetail, name: '客戶详情', hidden: true},
    ]
}, {
    path: '/employee',
    component: Frame,
    name:'员工管理',
    iconCls: 'el-icon-star-off',
    hidden: false,
    children: [
        { path: 'list', component: employeeList, name: '员工列表',iconCls: 'el-icon-setting'},
        { path: 'new', component: createEmployee, name: '新建员工',iconCls: 'el-icon-time'},
        { path: 'detail/:employeeId', component: employeeDetail, name: '员工详情', hidden: true},
        { path: 'setting', component: setting, name: '个人设置', hidden: true},
        { path: 'help', component: help, name: '使用指南', hidden: true},
    ]
}, {
    path: '/product_mix',
    component: Frame,
    name: '产品结构',
    iconCls: 'el-icon-menu',
    hidden: false,
    children: [
        { path: 'menuList', component: menuList, name: '菜单列表',iconCls: 'el-icon-setting'},
        { path: 'moduleList', component: moduleList, name: '模块列表',iconCls: 'el-icon-star-off'},
        { path: 'roleList', component: roleList, name: '角色列表',iconCls: 'el-icon-star-on'},
        { path: 'productList', component: productList, name: '产品列表',iconCls: 'el-icon-message'},
        { path: 'menuInModule/:moduleId', component: menuInModule, name: '模块绑定菜单', hidden: true},
        { path: 'moduleInRole/:roleId', component: moduleInRole, name: '角色绑定模块', hidden: true},
    ]
},{
	path: '*',
	component: NotFoundComponent,
    hidden: true
}]
