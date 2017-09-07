import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
let base = '/account/';

//登录
export const requestLogin = params => { return axios({method:'post',
url:`${base}index.open`,
data: qs.stringify(params),
}).then(res => res.data); };

//客户列表
export const getUserList = params => { return axios.get(`${base}customer.open`, { params: params }); };

//员工列表
export const getEmployeeList = params => { return axios.get(`${base}employee.open`, { params: params }); };

//获取销售人员
export const getSaler = params => { return axios.get(`${base}employee.open?cmd=WEL:GETSALER`, { params: params }); };

//新建客户
export const newClient = params => { return axios.get(`${base}customer.open?cmd=WEL:ADDEMPLOYEE`, { params: params }); };

//获取产品列表
export const getRole = params => { return axios.get(`${base}role.open`, { params: params }); };

//关闭账号
export const userClosed = params => { return axios.get(`${base}user.open?cmd=WEL:CLOSEUSER`, { params: params }); };

//删除套餐
export const packageDelete = params => { return axios.get(`${base}package.open?cmd=WEL:DELETEPACKAGES`, { params: params }); };

//升降级套餐
export const packageChange = params => { return axios.get(`${base}package.open?cmd=WEL:UPGRADEPACKAGE`, { params: params }); };

//关闭套餐
export const packageClosed = params => { return axios.get(`${base}package.open?cmd=WEL:COLSEPACKAGES`, { params: params }); };

//获取应收金额
export const packageGold = params => { return axios.get(`${base}package.open?cmd=WEL:GETPACKAGEAMOUNT`, { params: params }); };

//获取套餐选择下拉菜单
export const packageDrops = params => { return axios.get(`${base}package.open?cmd=WEL:SELECTPACKAGES`, { params: params }); };

//新建套餐
export const newPackage = params => { return axios({method:'post',
url:`${base}package.open?cmd=WEL:ADDPACKAGE`,
data: qs.stringify(params),
}); };

//新建账号
export const newUser = params => { return axios({method:'post',
url:`${base}user.open?cmd=WEL:ADDUSER`,
data: qs.stringify(params),
}); };

//新建签单
export const newSignBill = params => { return axios({method:'post',
url:`${base}signbill.open?cmd=WEL:ADDSIGNBILL`,
data: qs.stringify(params),
}); };

//套餐金额计算
export const getCount = params => { return axios({method:'post',
url:`${base}package.open?cmd=WEL:SELECTPACKAGEAMOUNT`,
data: qs.stringify(params),
}).then(res => res.data).catch(error => error); };


//编辑客户
export const editClients = params => { return axios({method:'post',
url:`${base}customer.open?cmd=WEL:UPDATEEMPLOYEE`,
data: qs.stringify(params),
}); };

//编辑套餐
export const editPackages = params => { return axios({method:'post',
url:`${base}package.open?cmd=WEL:CHANGEPACKAGE`,
data: qs.stringify(params),
}); };

//编辑账号
export const editUsers = params => { return axios({method:'post',
url:`${base}user.open?cmd=WEL:UPLOADUSER`,
data: qs.stringify(params),
}); };

//编辑签单
export const editSignBill = params => { return axios({method:'post',
url:`${base}signbill.open?cmd=WEL:UPDATESIGNBILL`,
data: qs.stringify(params),
}); };

//新建员工
export const newEmployee = params => { return axios({method:'post',
url:`${base}employee.open?cmd=WEL:ADDEMPLOYEE`,
data: qs.stringify(params),
}); };

//编辑员工
export const editEmployees = params => { return axios({method:'post',
url:`${base}employee.open?cmd=WEL:UODATEEMPLOYEE`,
data: qs.stringify(params),
}); };

//管理员重置密码
export const resetPass = params => { return axios.get(`${base}employee.open?cmd=WEL:RESETPASSWORDBYID`, { params: params }); };

//个人修改密码
export const resetPassword = params => { return axios({method:'post',
url:`${base}employee.open?cmd=WEL:CHANGEPASSWORD`,
data: qs.stringify(params),
}); };

//管理员修改登录名
export const changeLogin = params => { return axios({method:'post',
url:`${base}employee.open?cmd=WEL:CHANGELOGINNAME`,
data: qs.stringify(params),
}); };

//菜单列表
export const getMenuList = params => { return axios.get(`${base}menu.open?cmd=WEL:SELECTALLMENU`, { params: params }); };

//获取一级菜单
export const getParentMenuList = params => { return axios.get(`${base}menu.open?cmd=WEL:SELECTLEVELMENU`, { params: params }); };

//新建菜单
export const newMenu = params => { return axios({method:'post',
url:`${base}menu.open?cmd=WEL:SAVEMENU`,
data: qs.stringify(params),
}); };

//编辑菜单
export const editMenu = params => { return axios({method:'post',
url:`${base}menu.open?cmd=WEL:UPDATEMENU`,
data: qs.stringify(params),
}); };

//删除菜单
export const deleteMenu = params => { return axios.get(`${base}menu.open?cmd=WEL:DELETEMENU`, { params: params }); };

//模块列表
export const getModuleList = params => { return axios.get(`${base}module.open?cmd=WEL:SELECTALLMODULE`, { params: params }); };

//新建模块
export const newModule = params => { return axios({method:'post',
url:`${base}module.open?cmd=WEL:SAVEMODULE`,
data: qs.stringify(params),
}); };

//编辑模块
export const editModule = params => { return axios({method:'post',
url:`${base}module.open?cmd=WEL:UPDATEMODULE`,
data: qs.stringify(params),
}); };

//删除模块
export const deleteModule = params => { return axios.get(`${base}module.open?cmd=WEL:DELETEMODULE`, { params: params }); };

//角色列表
export const getRoleList = params => { return axios.get(`${base}role.open?cmd=WEL:SELECTALLROLE`, { params: params }); };

//新建角色
export const newRole = params => { return axios({method:'post',
url:`${base}role.open?cmd=WEL:SAVEROLE`,
data: qs.stringify(params),
}); };

//编辑角色
export const editRole = params => { return axios({method:'post',
url:`${base}role.open?cmd=WEL:UPDATEROLE`,
data: qs.stringify(params),
}); };

//删除角色
export const deleteRole = params => { return axios.get(`${base}role.open?cmd=WEL:DELETEROLE`, { params: params }); };

//产品列表
export const getProductList = params => { return axios.get(`${base}product.open?cmd=WEL:SELECTALLPRODUCT`, { params: params }); };

//新建产品
export const newProduct = params => { return axios({method:'post',
url:`${base}product.open?cmd=WEL:SAVEPRODUCT`,
data: qs.stringify(params),
}); };

//编辑产品
export const editProduct = params => { return axios({method:'post',
url:`${base}product.open?cmd=WEL:UPDATEPRODUCT`,
data: qs.stringify(params),
}); };

//删除产品
export const deleteProduct = params => { return axios.get(`${base}product.open?cmd=WEL:DELETEPRODUCT`, { params: params }); };

//根据模块id查询菜单id列表
export const menuInModule = params => { return axios.get(`${base}module.open?cmd=WEL:MENUIDBYMODULEID`, { params: params }); };

//根据角色id查询模块id列表
export const moduleInRole = params => { return axios.get(`${base}role.open?cmd=WEL:MODULEIDBYROLEID`, { params: params }); };
