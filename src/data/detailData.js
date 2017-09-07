export const clientDefault = {
  no:"客户编号",
  type_desc:"客户性质",
  company:"客户公司",
  create_time:"开户时间",
  account_email:"开户邮箱",
  leader:"负责人姓名",
  leader_phone:"负责人手机号",
  leader_department:"负责人部门",
  province:"公司所在省",
  city:"公司所在市",
  area:"公司所在区",
  address:"详细地址",
  openName:"操作人员姓名",
  salerName:"销售人员姓名",
  csName:"维护人员姓名",
  csProivince:"维护人员所在省",
  csCity:"维护人员所在市",
  csPhone:"维护人员手机号",
  csEmail:"维护人员邮箱"
}

export const signDefault = {
  source:["客户来源",100],
  package_name:["所选套餐",430],
  job_number:["签单员工工号",140],
  signName:["姓名",100],
  signProvince:["省",100],
  signCity:["市",130],
  signPhone:["手机号",130],
  signEmail:["邮箱",220],
  receivable_amount:["应收金额",150],
  contract_amount:["合同金额",150],
  approver:["特批人（如有）",140],
  received_amount:["回款金额",150],
  received_date:["回款日期",120],
  invoice_desc:["是否开具发票",130],
  invoice_header:["发票抬头",200],
  ira_province:["寄送地址省",120],
  ira_city:["寄送地址市",130],
  ira_area:["寄送地址区",120],
  invoice_receive_address:["寄送地址",300]
}

export const historyDefault = {
  data_config:["更改前数据配置（GB/月）",210],
  contract_period:["更改前合同期（个月）",180],
  begin_time:["更改前账户有效期（起始日期）",240],
  end_time:["更改前账户有效期（终止日期）",240],
  storage_days:["更改前数据存储有效期（天）",220],
  account_number:["更改前可开账户数",180],
  update_time:["变更时间",150],
  content:["变更内容",400]
}

export const packageDefault = {
  code:["编号",100],
  create_time:["开户日期",120],
  type:["套餐性质",100],
  valid:["套餐状态",100],
  open_staff_name:["开户员工姓名",130],
  role_name:["所属产品",200],
  data_config:["数据配置（GB/月）",170],
  contract_period:["合同期（个月）",140],
  begin_time:["合同有效期（起始日期）",200],
  end_time:["合同有效期（终止日期）",200],
  storage_days:["数据存储有效期（天）",180],
  package_amount:["套餐金额（元）",140],
  account_number:["可开账号数",120],
  opened_number:["已开账号数",120],
  user_names:["所属账号",200],
  update_time:["更新时间",120],
  update_staff_name:["更新操作员工",150]

}

export const userDefault = {
  name:["账号",120],
  truename:["真实姓名",120],
  sitename:["昵称",120],
  phone:["通知手机号",130],
  email:["通知邮箱",220]
}

export const employeeDefault = {
  name: '姓名',
  gender: '性别',
  birthday: '出生日期',
  id_card: '身份证',
  province: '省',
  city: '市',
  email: '邮箱',
  phone: '手机号',
  department: '部门',
  contract_start_date: '合同起始日期',
  contract_end_date: '合同终止日期',
  status_desc: '状态',
  job_number: '工号',
  position: '岗位',
  address: '住址',
};

export const checkTel = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入负责人手机号'));
  }
  if (!Number(value)) {
    callback(new Error('请输入数字值'));
  } else {
    if (value.length != 11) {
      callback(new Error('请输入正确的手机号'));
    } else {
      callback();
    }
  }
};

export const checkAmount = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请获取套餐金额'));
  }
  if (value == 0.00) {
    callback(new Error('请选择产品'));
  } else {
    callback();
  }
};

export const newPackageRule = {
  type: [{
    required: true,
    message: '请至少选择一个套餐性质',
    trigger: 'change'
  }],
  role_id: [{
    type: 'number',
    required: true,
    message: '请至少选择一个产品',
    trigger: 'change'
  }],
  user_id: [{
    type: 'number',
    required: true,
    message: '请至少选择一个关联账号',
    trigger: 'change'
  }],
  data_config: [{
    type: 'number',
    required: true,
    message: '请至少选择一个数据配置',
    trigger: 'change'
  }],
  contract_period: [{
    type: 'number',
    required: true,
    message: '请至少选择一个合同期',
    trigger: 'change'
  }],
  storage_days: [{
    type: 'number',
    required: true,
    message: '请至少选择一个数据存储有效期',
    trigger: 'change'
  }],
  package_amount: [{
    required: true,
    validator: checkAmount,
    trigger: 'change'
  }],
  account_number: [{
    required: true,
    message: '请填写可开账号数',
    trigger: 'blur'
  }]
}

export const newUserRule = {
  name: [{
    required: true,
    message: '请填写账号名',
    trigger: 'blur'
  }],
  truename: [{
    required: true,
    message: '请填写真实姓名',
    trigger: 'blur'
  }],
  sitename: [{
    required: true,
    message: '请填写昵称',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: '请填写密码',
    trigger: 'blur'
  }],
  phone: [{
    required: true,
    validator: checkTel,
    trigger: 'blur'
  }],
  email: [{
    type: 'email',
    required: true,
    message: '请填写邮箱',
    trigger: 'blur'
  }],
  package_ids: [{
    type: 'array',
    required: true,
    message: '请选择所属套餐',
    trigger: 'change'
  }]
}

export const clientEditRule = {
  company: [{
    required: true,
    message: '请输入公司名称',
    trigger: 'blur'
  }],
  account_email: [{
    type: 'email',
    required: true,
    message: '请输入开户邮箱',
    trigger: 'blur'
  }],
  leader: [{
    required: true,
    message: '请输入负责人姓名',
    trigger: 'blur'
  }],
  leader_phone: [{
    required: true,
    validator: checkTel,
    trigger: 'blur'
  }],
  leader_department: [{
    required: true,
    message: '请输入负责人部门',
    trigger: 'blur'
  }],
  province: [{
    required: true,
    message: '请选择所在地',
    trigger: 'change'
  }],
  address: [{
    required: true,
    message: '请输入详细地址',
    trigger: 'blur'
  }],
  saler_job_number: [{
    required: true,
    message: '请至少选择一个销售员工',
    trigger: 'change'
  }],
  cs_job_number: [{
    required: true,
    message: '请至少选择一个维护员工',
    trigger: 'change'
  }]
}

export const packageEditRule = {
  data_config: [{
    required: true,
    message: '请至少选择一个数据配置',
    trigger: 'change'
  }],
  contract_period: [{
    required: true,
    message: '请至少选择一个合同期',
    trigger: 'change'
  }],
  storage_days: [{
    required: true,
    message: '请至少选择一个数据存储有效期',
    trigger: 'change'
  }],
  package_amount: [{
    required: true,
    message: '请获取套餐金额',
    trigger: 'change'
  }],
  account_number: [{
    required: true,
    message: '请填写可开账号数',
    trigger: 'blur'
  }]
}

export const userEditRule = {
  name: [{
    required: true,
    message: '请填写账号名',
    trigger: 'blur'
  }],
  truename: [{
    required: true,
    message: '请填写真实姓名',
    trigger: 'blur'
  }],
  sitename: [{
    required: true,
    message: '请填写昵称',
    trigger: 'blur'
  }],
  phone: [{
    required: true,
    validator: checkTel,
    trigger: 'blur'
  }],
  email: [{
    type: 'email',
    required: true,
    message: '请填写邮箱',
    trigger: 'blur'
  }],
  package_ids: [{
    type: 'array',
    required: true,
    message: '请选择所属套餐',
    trigger: 'change'
  }]
}

export const newEmployeeRule = {
  name: [{
    required: true,
    message: '请填写员工姓名',
    trigger: 'blur'
  }],
  gender: [{
    required: true,
    message: '请选择员工性别',
    trigger: 'change'
  }],
  birthday: [{
    required: true,
    message: '请填写员工生日',
    trigger: 'blur'
  }],
  id_card: [{
    required: true,
    message: '请填写员工身份证号码',
    trigger: 'blur'
  }],
  province: [{
    required: true,
    message: '请选择员工身份证所在地',
    trigger: 'change'
  }],
  email: [{
    type: 'email',
    required: true,
    message: '请填写员工邮箱地址',
    trigger: 'blur'
  }],
  phone: [{
    required: true,
    validator: checkTel,
    trigger: 'blur'
  }],
  department: [{
    required: true,
    message: '请填写员工部门',
    trigger: 'blur'
  }],
  contract_start_date: [{
    required: true,
    message: '请填写员工合同起始日期',
    trigger: 'blur'
  }],
  contract_end_date: [{
    required: true,
    message: '请填写员工合同终止日期',
    trigger: 'blur'
  }],
  job_number: [{
    required: true,
    message: '请填写员工工号',
    trigger: 'blur'
  }],
  position: [{
    required: true,
    message: '请填写员工岗位',
    trigger: 'blur'
  }],
  address: [{
    required: true,
    message: '请填写员工住址',
    trigger: 'blur'
  }]
}

export const editEmployeeRule = {
  name: [{
    required: true,
    message: '请填写员工姓名',
    trigger: 'blur'
  }],
  gender: [{
    required: true,
    message: '请选择员工性别',
    trigger: 'change'
  }],
  birthday: [{
    required: true,
    message: '请填写员工生日',
    trigger: 'blur'
  }],
  id_card: [{
    required: true,
    message: '请填写员工身份证号码',
    trigger: 'blur'
  }],
  province: [{
    required: true,
    message: '请选择员工身份证所在地',
    trigger: 'blur'
  }],
  email: [{
    type: 'email',
    required: true,
    message: '请填写员工邮箱地址',
    trigger: 'blur'
  }],
  phone: [{
    required: true,
    validator: checkTel,
    trigger: 'blur'
  }],
  department: [{
    required: true,
    message: '请填写员工部门',
    trigger: 'blur'
  }],
  contract_start_date: [{
    required: true,
    message: '请填写员工合同起始日期',
    trigger: 'blur'
  }],
  contract_end_date: [{
    required: true,
    message: '请填写员工合同终止日期',
    trigger: 'blur'
  }],
  status: [{
    type: 'number',
    required: true,
    message: '请选择员工状态',
    trigger: 'change'
  }],
  job_number: [{
    required: true,
    message: '请填写员工工号',
    trigger: 'blur'
  }],
  position: [{
    required: true,
    message: '请填写员工岗位',
    trigger: 'blur'
  }],
  address: [{
    required: true,
    message: '请填写员工住址',
    trigger: 'blur'
  }]
}

export const newSignBillRule = {
  source : [{
    required: true,
    message: '请选择客户来源',
    trigger: 'change'
  }],
  package_id : [{
    type: "number",
    required: true,
    message: '请选择所属套餐',
    trigger: 'change'
  }],
  receivable_amount : [{
    type: 'number',
    required: true,
    message: '请选择所属套餐',
    trigger: 'change'
  }],
  contract_amount : [{
    required: true,
    message: '请填写合同金额',
    trigger: 'blur'
  }],
  received_amount : [{
    required: true,
    message: '请填写回款金额',
    trigger: 'blur'
  }],
  received_date: [{
    required: true,
    message: '请填写回款日期',
    trigger: 'blur'
  }],
  invoice : [{
    required: true,
    message: '请选择是否开具发票',
    trigger: 'change'
  }]
}

export const signBillEditRule = {
  source : [{
    required: true,
    message: '请选择客户来源',
    trigger: 'change'
  }],
  receivable_amount : [{
    required: true,
    message: '请填写应收金额',
    trigger: 'blur'
  }],
  contract_amount : [{
    required: true,
    message: '请填写合同金额',
    trigger: 'blur'
  }],
  received_amount : [{
    required: true,
    message: '请填写回款金额',
    trigger: 'blur'
  }],
  invoice : [{
    type: "number",
    required: true,
    message: '请选择是否开具发票',
    trigger: 'change'
  }]
}

export const newMenuRule = {
  menu_name: [{
    required: true,
    message: '请填写菜单名',
    trigger: 'blur'
  }],
  menu_en_name: [{
    required: true,
    message: '请填写菜单英文名',
    trigger: 'blur'
  }],
  menu_desc: [{
    required: true,
    message: '请填写菜单描述',
    trigger: 'blur'
  }],
  menu_status: [{
    type: 'number',
    required: true,
    message: '请填写菜单状态',
    trigger: 'change'
  }]
}

export const editMenuRule = {
  menu_name: [{
    required: true,
    message: '请填写菜单名',
    trigger: 'blur'
  }],
  menu_en_name: [{
    required: true,
    message: '请填写菜单英文名',
    trigger: 'blur'
  }],
  menu_desc: [{
    required: true,
    message: '请填写菜单描述',
    trigger: 'blur'
  }],
  menu_status: [{
    type: 'number',
    required: true,
    message: '请填写菜单状态',
    trigger: 'change'
  }]
}

export const newModuleRule = {
  module_code : [{
    required: true,
    message: '请填写模块代码',
    trigger: 'blur'
  }],
  module_name : [{
    required: true,
    message: '请填写角色名称',
    trigger: 'blur'
  }],
  module_desc : [{
    required: true,
    message: '请填写角色描述',
    trigger: 'blur'
  }],
  module_en_name : [{
    required: true,
    message: '请填写英文名称',
    trigger: 'blur'
  }],
  module_en_desc : [{
    required: true,
    message: '请填写英文描述',
    trigger: 'blur'
  }]
}

export const editModuleRule = {
  module_code : [{
    required: true,
    message: '请填写模块代码',
    trigger: 'blur'
  }],
  module_name : [{
    required: true,
    message: '请填写角色名称',
    trigger: 'blur'
  }],
  module_desc : [{
    required: true,
    message: '请填写角色描述',
    trigger: 'blur'
  }],
  module_en_name : [{
    required: true,
    message: '请填写英文名称',
    trigger: 'blur'
  }],
  module_en_desc : [{
    required: true,
    message: '请填写英文描述',
    trigger: 'blur'
  }]
}

export const newRoleRule = {
  role_name : [{
    required: true,
    message: '请填写角色名称',
    trigger: 'blur'
  }],
  role_en_name : [{
    required: true,
    message: '请填写角色英文名称',
    trigger: 'blur'
  }],
  role_desc : [{
    required: true,
    message: '请填写角色描述',
    trigger: 'blur'
  }],
  product_id : [{
    type: 'number',
    required: true,
    message: '请选择所属产品',
    trigger: 'change'
  }],
  role_status : [{
    type: 'number',
    required: true,
    message: '请选择角色状态',
    trigger: 'change'
  }],
  price : [{
    required: true,
    message: '请填写单价',
    trigger: 'blur'
  }],
}

export const editRoleRule = {
  role_name : [{
    required: true,
    message: '请填写角色名称',
    trigger: 'blur'
  }],
  role_en_name : [{
    required: true,
    message: '请填写角色英文名称',
    trigger: 'blur'
  }],
  role_desc : [{
    required: true,
    message: '请填写角色描述',
    trigger: 'blur'
  }],
  product_id : [{
    type: 'number',
    required: true,
    message: '请选择所属产品',
    trigger: 'change'
  }],
  role_status : [{
    type: 'number',
    required: true,
    message: '请选择角色状态',
    trigger: 'change'
  }],
  price : [{
    required: true,
    message: '请填写单价',
    trigger: 'blur'
  }],
}

export const newProductRule = {
  product_name : [{
    required: true,
    message: '请填写产品名称',
    trigger: 'blur'
  }],
  product_desc : [{
    required: true,
    message: '请填写产品描述',
    trigger: 'blur'
  }],
  product_en_name : [{
    required: true,
    message: '请填写产品英文名称',
    trigger: 'blur'
  }],
  product_en_desc : [{
    required: true,
    message: '请填写产品英文描述',
    trigger: 'blur'
  }]
}

export const editProductRule = {
  product_name : [{
    required: true,
    message: '请填写产品名称',
    trigger: 'blur'
  }],
  product_desc : [{
    required: true,
    message: '请填写产品描述',
    trigger: 'blur'
  }],
  product_en_name : [{
    required: true,
    message: '请填写产品英文名称',
    trigger: 'blur'
  }],
  product_en_desc : [{
    required: true,
    message: '请填写产品英文描述',
    trigger: 'blur'
  }]
}
