<template>
<div v-loading="loading">
  <el-tabs v-model="activeName2" @tab-click="handleClick">
    <!-- 客户信息tab -->
    <el-tab-pane label="客户信息" name="first">
      <el-row class="button_row">
        <el-col :span="24">
          <el-button type="warning" @click="editClient = true">编辑客户</el-button>
        </el-col>
      </el-row>
      <el-row class="client_row" v-for="(value, key) in clientDefault" :key="key">
        <el-col :span="4" class="client_label">{{ value }}</el-col>
        <el-col :span="18">{{ clientList[key] }}</el-col>
      </el-row>
    </el-tab-pane>
    <!-- 套餐信息tab -->
    <el-tab-pane label="套餐信息" name="second">
      <el-row class="button_row">
        <el-col>
          <el-button type="info" @click="newPackage = true;userInPackage = true">新建套餐</el-button>
        </el-col>
      </el-row>
      <template>
        <el-table :data="packageList" stripe style="width: 100%" border>
          <el-table-column v-for="(value, key) in packageDefault" :key="key" :prop="key" :label="value[0]" :width="value[1]"></el-table-column>
          <!-- <el-table-column label="所属账号" width="150">
            <template scope="scope">
              <div v-for="item in scope.row.user_names">{{item}}</div>
            </template>
          </el-table-column> -->
          <el-table-column fixed="right" label="操作" width="210">
            <template scope="scope">
              <el-button size="small" @click="purChange(scope.row.id,scope.row.role_id)" :type="scope.row.role_id == 3?'danger':'success'" :disabled="scope.row.role_id == 3 || scope.row.role_id == 4?false:true">{{scope.row.role_id == 3?"降级":"升级"}}</el-button>
              <el-button size="small" @click="editPackage = true;packagePush(scope.row)" type="primary">编辑</el-button>
              <el-button size="small" @click="packageClose(scope.row.flag,scope.row.id)" :type="scope.row.flag?'danger':'success'">{{scope.row.flag?"关闭":"开启"}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
    <!-- 账号信息tab -->
    <el-tab-pane label="账号信息" name="third">
      <el-row class="button_row">
        <el-col :span="24">
          <el-button type="info" @click="newUser = true;packageInUser = true;packageDrop(0)">新建账号</el-button>
        </el-col>
      </el-row>
      <template>
        <el-table :data="userList" stripe style="width: 100%" border>
          <el-table-column v-for="(value, key) in userDefault" :key="key" :prop="key" :label="value[0]" :width="value[1]"></el-table-column>
          <el-table-column label="所属套餐" min-width="430">
            <template scope="scope">
              <div v-for="item in scope.row.package_names" :key="item">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template scope="scope">
              <el-button size="small" @click="editUser = true;userPush(scope.row);packageDrop(scope.row.user_id)" type="primary">编辑</el-button>
              <el-button size="small" @click="userClose(scope.row.is_open,scope.row.user_id)" :type="scope.row.is_open?'danger':'success'">{{scope.row.is_open?"关闭":"开启"}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
    <!-- 套餐变更历史tab -->
    <el-tab-pane label="套餐变更历史" name="fourth">
      <template>
        <el-table :data="historyList" stripe style="width: 100%" border>
          <el-table-column v-for="(value, key) in historyDefault" :key="key" :prop="key" :label="value[0]" :width="value[1]"></el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
    <!-- 签单信息tab -->
    <el-tab-pane label="销售及账单信息" name="fifth">
      <el-row class="button_row">
        <el-col>
          <el-button type="info" @click="newSignBill = true">新建销售及账单信息</el-button>
        </el-col>
      </el-row>
      <template>
        <el-table :data="signBillList" stripe style="width: 100%" border>
          <el-table-column v-for="(value, key) in signDefault" :key="key" :prop="key" :label="value[0]" :width="value[1]"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template scope="scope">
              <el-button size="small" @click="editSignBill = true;signBillPush(scope.row)" type="primary">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
  </el-tabs>
  <!-- 新建账号弹窗 -->
  <el-dialog title="新建账号" v-model="newUser" @close="resetForm('newUserForm')" size="800">
    <el-form :model="newUserForm" :rules="newUserRules" ref="newUserForm" :label-width="formLabelWidth" v-loading="loading2">
      <el-form-item label="账号" prop="name">
        <el-input v-model="newUserForm.name" @blur="checkUserName"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="truename">
        <el-input v-model="newUserForm.truename"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="sitename">
        <el-input v-model="newUserForm.sitename"></el-input>
      </el-form-item>
      <el-form-item label="账号初始密码" prop="password">
        <el-input v-model="newUserForm.password"></el-input>
      </el-form-item>
      <el-form-item label="通知手机号" prop="phone">
        <el-input v-model="newUserForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="通知邮箱" prop="email">
        <el-input v-model="newUserForm.email"></el-input>
      </el-form-item>
      <el-form-item label="所属套餐" prop="package_ids" v-if="packageInUser">
        <el-select multiple v-model="newUserForm.package_ids" class="longSelect">
          <el-option v-for="item in packageInUserList" :key="item.id" :label="item.package_name" :value="item.package_id"></el-option>
        </el-select>
        <el-button v-if="packageInUser" type="info" @click="newPackage = true;userInPackage = false">新建套餐</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="newUser = false;resetForm('newUserForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm1('newUserForm')">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 新建套餐弹窗 -->
  <el-dialog title="新建套餐" v-model="newPackage" @close="resetForm('newPackageForm')">
    <el-form :model="newPackageForm" :rules="newPackageRules" ref="newPackageForm" :label-width="formLabelWidth" v-loading="loading1">
      <el-form-item label="选择套餐性质" prop="type">
        <el-select v-model="newPackageForm.type">
          <el-option v-for="item in typeListC" :key="item" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择产品" prop="role_id">
        <el-select v-model="newPackageForm.role_id">
          <el-option v-for="item in roleList" :key="item.id" :label="item.role_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联账号" prop="user_id" v-if="userInPackage">
        <el-select v-model="newPackageForm.user_id">
          <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.user_id"></el-option>
        </el-select>
        <el-button v-if="userInPackage" type="info" @click="newUser = true;packageInUser = false">新建账号</el-button>
      </el-form-item>
      <el-form-item label="数据配置" prop="data_config">
        <el-select v-model="newPackageForm.data_config">
          <el-option v-for="item in data_config_list" :key="item.id" :label="item" :value="item"></el-option>
        </el-select> GB/月
      </el-form-item>
      <el-form-item label="合同期" prop="contract_period">
        <el-select v-model="newPackageForm.contract_period">
          <el-option v-for="item in contract_period_list" :key="item.id" :label="item" :value="item"></el-option>
        </el-select> 个月
      </el-form-item>
      <el-form-item label="数据存储有效期" prop="storage_days">
        <el-select v-model="newPackageForm.storage_days">
          <el-option v-for="item in storage_days_list" :key="item.id" :label="item" :value="item"></el-option>
        </el-select> 天
      </el-form-item>
      <el-form-item label="">
        <el-button :plain="true" type="info" @click="getPackageAmount">获取套餐金额</el-button>
      </el-form-item>
      <el-form-item label="套餐金额" prop="package_amount">
        <el-input v-model="newPackageForm.package_amount" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="可开账号数" prop="account_number">
        <el-input v-model="newPackageForm.account_number"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="newPackage = false;resetForm('newPackageForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('newPackageForm')">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 新建签单弹窗 -->
  <el-dialog title="新建销售及账单信息" v-model="newSignBill" @close="resetForm('newSignBillForm')">
    <el-form :model="newSignBillForm" :rules="newSignBillRules" ref="newSignBillForm" :label-width="formLabelWidth" v-loading="loading6">
      <el-form-item label="客户来源" prop="source">
        <el-select v-model="newSignBillForm.source">
          <el-option v-for="item in sourceList" :key="item.id" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属套餐" prop="package_id">
        <el-select v-model="newSignBillForm.package_id" @change="getGold">
          <el-option v-for="item in packageList" :key="item.id" :label="item.code +'_'+ item.role_name +'_'+ item.data_config +'GB/月'+ item.contract_period +'个月'+ item.storage_days +'天'" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应收金额" prop="receivable_amount">
        <el-input v-model="newSignBillForm.receivable_amount" readonly></el-input>
      </el-form-item>
      <el-form-item label="合同金额" prop="contract_amount">
        <el-input v-model="newSignBillForm.contract_amount"></el-input>
      </el-form-item>
      <el-form-item label="特批人（如有）" prop="approver">
        <el-input v-model="newSignBillForm.approver"></el-input>
      </el-form-item>
      <el-form-item label="回款金额" prop="received_amount">
        <el-input v-model="newSignBillForm.received_amount"></el-input>
      </el-form-item>
      <el-form-item label="回款日期" prop="received_date">
        <el-input v-model="newSignBillForm.received_date"></el-input>
      </el-form-item>
      <el-form-item label="是否开具发票" prop="invoice">
        <el-radio v-model="newSignBillForm.invoice" label="1">是</el-radio>
        <el-radio v-model="newSignBillForm.invoice" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="发票抬头" prop="invoice_header">
        <el-input v-model="newSignBillForm.invoice_header"></el-input>
      </el-form-item>
      <el-form-item label="寄送地省市区" prop="ira_province">
        <v-distpicker @selected="onSelected1" :placeholders="placeholders" ref="dist"></v-distpicker>
      </el-form-item>
      <el-form-item label="寄送地址" prop="invoice_receive_address">
        <el-input v-model="newSignBillForm.invoice_receive_address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="newSignBill = false;resetForm('newSignBillForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm5('newSignBillForm')">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 编辑客户信息弹窗 -->
  <el-dialog title="编辑客户信息" v-model="editClient">
    <el-form :model="clientEditForm" :rules="clientEditRules" ref="clientEditForm" label-width="120px" :label-width="formLabelWidth" v-loading="loading3">
      <el-form-item label="客户公司" prop="company">
        <el-input v-model="clientEditForm.company"></el-input>
      </el-form-item>
      <el-form-item label="开户邮箱" prop="account_email">
        <el-input v-model="clientEditForm.account_email"></el-input>
      </el-form-item>
      <el-form-item label="负责人姓名" prop="leader">
        <el-input v-model="clientEditForm.leader"></el-input>
      </el-form-item>
      <el-form-item label="负责人手机号" prop="leader_phone">
        <el-input v-model="clientEditForm.leader_phone"></el-input>
      </el-form-item>
      <el-form-item label="负责人部门" prop="leader_department">
        <el-input v-model="clientEditForm.leader_department"></el-input>
      </el-form-item>
      <el-form-item label="公司所在地" prop="province">
        <v-distpicker @selected="onSelected" ref="dist" :province="clientEditForm.province" :city="clientEditForm.city" :area="clientEditForm.area"></v-distpicker>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="clientEditForm.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editClient = false">取 消</el-button>
      <el-button type="primary" @click="submitForm2('clientEditForm')">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 编辑套餐弹窗 -->
  <el-dialog title="编辑套餐" v-model="editPackage">
    <el-form :model="packageEditForm" :rules="packageEditRules" ref="packageEditForm" :label-width="formLabelWidth" v-loading="loading4">
      <el-form-item label="数据配置" prop="data_config">
        <el-select v-model="packageEditForm.data_config" @change="typeSelect1">
          <el-option v-for="item in data_config_list" :key="item.id" :label="item" :value="item"></el-option>
        </el-select> GB/月
      </el-form-item>
      <el-form-item label="合同期" prop="contract_period">
        <el-select v-model="packageEditForm.contract_period" @change="typeSelect1">
          <el-option v-for="item in contract_period_list" :key="item.id" :label="item" :value="item"></el-option>
        </el-select> 个月
      </el-form-item>
      <el-form-item label="数据存储有效期" prop="storage_days">
        <el-select v-model="packageEditForm.storage_days" @change="typeSelect1">
          <el-option v-for="item in storage_days_list" :key="item.id" :label="item" :value="item"></el-option>
        </el-select> 天
      </el-form-item>
      <el-form-item label="">
        <el-button :plain="true" type="info" @click="getPackageAmount1">获取套餐金额</el-button>
      </el-form-item>
      <el-form-item label="套餐金额" prop="package_amount">
        <el-input v-model="packageEditForm.package_amount" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="可开账号数" prop="account_number">
        <el-input v-model="packageEditForm.account_number"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editPackage = false">取 消</el-button>
      <el-button type="primary" @click="submitForm3('packageEditForm')">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 编辑账号弹窗 -->
  <el-dialog title="编辑账号" v-model="editUser" size="800">
    <el-form :model="userEditForm" :rules="userEditRules" ref="userEditForm" :label-width="formLabelWidth" v-loading="loading5">
      <el-form-item label="账号" prop="name">
        <el-input v-model="userEditForm.name"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="truename">
        <el-input v-model="userEditForm.truename"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="sitename">
        <el-input v-model="userEditForm.sitename"></el-input>
      </el-form-item>
      <el-form-item label="通知手机号" prop="phone">
        <el-input v-model="userEditForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="通知邮箱" prop="email">
        <el-input v-model="userEditForm.email"></el-input>
      </el-form-item>
      <el-form-item label="所属套餐" prop="package_ids" v-if="packageInUser">
        <el-select multiple v-model="userEditForm.package_ids" class="longSelect">
          <el-option v-for="item in packageInUserList" :key="item.id" :label="item.package_name" :value="item.package_id"></el-option>
        </el-select>
        <el-button v-if="packageInUser" type="info" @click="newPackage = true;userInPackage = false">新建套餐</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editUser = false">取 消</el-button>
      <el-button type="primary" @click="submitForm4('userEditForm')">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 编辑签单弹窗 -->
  <el-dialog title="编辑销售及账单信息" v-model="editSignBill" @close="resetForm('signBillEditForm')">
    <el-form :model="signBillEditForm" :rules="signBillEditRules" ref="signBillEditForm" :label-width="formLabelWidth" v-loading="loading7">
      <el-form-item label="客户来源" prop="source">
        <el-select v-model="signBillEditForm.source">
          <el-option v-for="item in sourceList" :key="item.id" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应收金额" prop="receivable_amount">
        <el-input v-model="signBillEditForm.receivable_amount "></el-input>
      </el-form-item>
      <el-form-item label="合同金额" prop="contract_amount">
        <el-input v-model="signBillEditForm.contract_amount"></el-input>
      </el-form-item>
      <el-form-item label="特批人（如有）" prop="approver">
        <el-input v-model="signBillEditForm.approver"></el-input>
      </el-form-item>
      <el-form-item label="回款金额" prop="received_amount">
        <el-input v-model="signBillEditForm.received_amount"></el-input>
      </el-form-item>
      <el-form-item label="回款日期" prop="received_date">
        <el-input v-model="signBillEditForm.received_date"></el-input>
      </el-form-item>
      <el-form-item label="是否开具发票" prop="invoice">
        <el-radio-group v-model="signBillEditForm.invoice">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发票抬头" prop="invoice_header">
        <el-input v-model="signBillEditForm.invoice_header"></el-input>
      </el-form-item>
      <el-form-item label="寄送地省市区" prop="ira_province">
        <v-distpicker @selected="onSelected2" ref="dist" :province="signBillEditForm.ira_province" :city="signBillEditForm.ira_city" :area="signBillEditForm.ira_area"></v-distpicker>
      </el-form-item>
      <el-form-item label="寄送地址" prop="invoice_receive_address">
        <el-input v-model="signBillEditForm.invoice_receive_address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editSignBill = false;resetForm('signBillEditForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm6('signBillEditForm')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import {
  clientDefault,
  signDefault,
  historyDefault,
  packageDefault,
  userDefault,
  checkTel,
  newPackageRule,
  newUserRule,
  newSignBillRule,
  clientEditRule,
  packageEditRule,
  userEditRule,
  signBillEditRule
} from '../../data/detailData.js'
import {
  getSaler,
  newPackage,
  newUser,
  newSignBill,
  getRole,
  getCount,
  editClients,
  editPackages,
  editUsers,
  editSignBill,
  userClosed,
  packageClosed,
  packageGold,
  packageChange,
  packageDrops
} from '../../config/api';


export default {
  data() {
    return {
      //loading层声明
      loading: false,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      //tab
      activeName2: 'first',
      //全局客户ID
      clientID: '',
      //几全局数据list的声明
      data_config_list: [3, 10, 20, 50, 100, 200, 300, 400, 500],
      contract_period_list: [1, 6, 12],
      storage_days_list: [30, 90, 180, 365],
      salerList: [],
      roleList: [],
      placeholders: {
        province: '------- 省 --------',
        city: '--- 市 ---',
        area: '--- 区 ---',
      },
      typeChange: true,
      typeList: [
        {name:'对外客户',value:'C'},
        {name:'内部测试账户',value:'T'},
      ],
      typeListC: [],
      typeList1: [{
          name: '付费',
          value: 'C'
        },
        {
          name: '免费',
          value: 'F'
        },
        {
          name: '特殊',
          value: 'V'
        }
      ],
      typeList2: [{
          name: '内测',
          value: 'T'
        }
      ],
      sourceList: ["销售", "渠道", "其他"],
      closeT: 0,
      clientList: {},
      signBillList: [],
      historyList: [],
      packageList: [],
      userList: [],
      packageInUserList: [],
      //详情key对照表声明
      clientDefault: clientDefault,
      signDefault: signDefault,
      historyDefault: historyDefault,
      packageDefault: packageDefault,
      userDefault: userDefault,
      //弹窗model
      newPackage: false,
      newUser: false,
      newSignBill: false,
      editClient: false,
      editPackage: false,
      editUser: false,
      editSignBill: false,
      //表单label宽度
      formLabelWidth: '150px',
      //嵌套弹窗细节控制
      userInPackage: true,
      packageInUser: true,
      //几个表单的声明
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      newPackageForm: {
        type: '',
        customer_id: "",
        role_id: '',
        user_id: '',
        data_config: '',
        contract_period: '',
        storage_days: '',
        package_amount: '',
        account_number: ''
      },
      newUserForm: {
        customer_id: "",
        name: '',
        truename: '',
        sitename: '',
        password: '',
        phone: '',
        email: '',
        package_ids: []
      },
      newSignBillForm: {
        customer_id: '',
        package_id: '',
        source: '',
        receivable_amount: '',
        contract_amount: '',
        approver: '',
        received_amount: '',
        received_date: '',
        invoice: '0',
        invoice_header: '',
        ira_province: '',
        ira_city: '',
        ira_area: '',
        invoice_receive_address: ''
      },
      clientEditForm: {
        id: "",
        company: '',
        account_email: '',
        leader: '',
        leader_phone: '',
        leader_department: '',
        province: '',
        city: '',
        area: '',
        address: '',
        cs_job_number: ''
      },
      packageEditForm: {
        customer_id: '',
        package_id: '',
        role_id: '',
        data_config: '',
        contract_period: '',
        storage_days: '',
        package_amount: '',
        account_number: ''
      },
      userEditForm: {
        user_id: '',
        name: '',
        truename: '',
        sitename: '',
        phone: '',
        email: '',
        package_ids: []
      },
      signBillEditForm: {
        id: '',
        customer_id: '',
        source: '',
        receivable_amount: '',
        contract_amount: '',
        approver: '',
        received_amount: '',
        received_date: '',
        invoice: '0',
        invoice_header: '',
        ira_province: '',
        ira_city: '',
        ira_area: '',
        invoice_receive_address: ''
      },
      //表单验证规则
      newPackageRules: newPackageRule,
      newUserRules: newUserRule,
      newSignBillRules: newSignBillRule,
      clientEditRules: clientEditRule,
      packageEditRules: packageEditRule,
      userEditRules: userEditRule,
      signBillEditRules: signBillEditRule
    };
  },
  methods: {
    handleClick(tab, event) {

    },
    //获取销售员工
    getSalers: function() {
      let params = {};
      getSaler(params).then((res) => {
        this.salerList = res.data;
      })
    },
    //获取产品
    getRoles: function() {
      let params = {};
      getRole(params).then((res) => {
        this.roleList = res.data;
      })
    },
    //套餐金额计算
    getPackageAmount: function() {
      this.logining = true;
      let param = {
        role_id: this.newPackageForm.role_id,
        data_config: this.newPackageForm.data_config,
        storage_days: this.newPackageForm.storage_days,
        contract_period: this.newPackageForm.contract_period
      };
      getCount(param).then(data => {
        this.logining = false;
        if (data.msg) {
          this.$message({
            message: data.msg,
            type: 'warning'
          });
        } else {
          this.newPackageForm.package_amount = data.contractPrice;
        }
      }).catch(data => {
        this.logining = false;
        this.$message({
          message: "获取失败",
          type: 'error'
        });
      });
    },
    getPackageAmount1: function() {
      this.logining = true;
      let param = {
        role_id: this.packageEditForm.role_id,
        data_config: this.packageEditForm.data_config,
        storage_days: this.packageEditForm.storage_days,
        contract_period: this.packageEditForm.contract_period
      };
      getCount(param).then(data => {
        this.logining = false;
        if (data.msg) {
          this.$message({
            message: data.msg,
            type: 'warning'
          });
        } else {
          this.packageEditForm.package_amount = data.contractPrice;
        }
      }).catch(data => {
        this.logining = false;
        this.$message({
          message: "获取失败",
          type: 'error'
        });
      });
    },
    //获取客户全部信息（由于axios坑实在太多，采用此非常low的方法，后期优化再做更改）
    getInfo() {
      // getClient(this.clientID).then(data => {
      //   this.clientList = data;
      // })
      $.ajax({
        async: true,
        type: "get",
        data: {
          customer_id: this.clientID
        },
        url: "/account/customer.open?cmd=WEL:GETCUSTOMERBYID",
        success: (data => {
          this.clientList = data.customer;
          for (let i in this.clientEditForm) {
            this.clientEditForm[i] = this.clientList[i];
          };
          if(this.clientList.type === "T"){
            this.typeListC = this.typeList2;
          }else{
            this.typeListC = this.typeList1;
          }
          this.packageList = data.package;
          // for(let i=0;i<this.packageList.length;i++){
          //   let ulist = this.packageList[i].user_names;
          //   if(ulist == null){
          //     continue;
          //   }
          //   this.packageList[i].user_names = ulist.split(",");
          // }
          this.userList = data.user;
          // for(let i=0;i<this.userList.length;i++){
          //   let plist = this.userList[i].package_names;
          //   if(plist == null){
          //     continue;
          //   }
          //   this.userList[i].package_names = plist.split(",");
          // }
          this.historyList = data.history;
          if (data.bill != null) {
            this.signBillList = data.bill;
            for (let i in this.signBillEditForm) {
              this.signBillEditForm[i] = this.signBillList[i];
            };
          }
          // this.packageInUserList = data.packageDrop;
          this.loading = false;
        }),
        error: (data => {
          this.loading = false;
        })
      });
    },
    //省市联动选择后的回调
    onSelected(region) {
      this.clientEditForm.province = region.province;
      this.clientEditForm.city = region.city;
      this.clientEditForm.area = region.area;
    },
    onSelected1(region) {
        this.newSignBillForm.ira_province = region.province;
        this.newSignBillForm.ira_city = region.city;
        this.newSignBillForm.ira_area = region.area;
    },
    onSelected2(region) {
        this.signBillEditForm.ira_province = region.province;
        this.signBillEditForm.ira_city = region.city;
        this.signBillEditForm.ira_area = region.area;
    },
    //登录名验证
    checkUserName(val) {
      let that = this;
      $.ajax({
        async: true,
        type: "post",
        data: {
          name: this.newUserForm.name
        },
        url: "/account/user.open?cmd=WEL:IFUSEREXIST",
        success: (data => {
          console.log(data)
          if(data.code === "20000"){
            if(data.msg === "0"){
              that.$message({
                message: "该账号可使用",
                type: 'success'
              });
            }else{
              that.$message({
                message: "该账号已被注册",
                type: 'error'
              });
            }
          }else{
            that.$message({
              message: "账号验证失败",
              type: 'error'
            });
          }
        })
      })
    },
    //套餐信息push
    packagePush(rowData) {
      for (let i in this.packageEditForm) {
        this.packageEditForm[i] = rowData[i];
      }
      this.packageEditForm.package_id = rowData.id;
    },
    //账号信息push
    userPush(rowData) {
      console.log(rowData)
      for (let i in this.userEditForm) {
        this.userEditForm[i] = rowData[i];
      }
    },
    //签单信息push
    signBillPush(rowData) {
      for (let i in this.signBillEditForm) {
        this.signBillEditForm[i] = rowData[i];
      }
    },
    //获取套餐选择下拉菜单
    packageDrop(user) {
      let params = {user_id:user,customer_id:this.clientID};
      packageDrops(params).then((res) => {
        this.packageInUserList = res.data;
      }).catch((res) => {
        this.$message({
          message: "套餐获取失败，请重新唤起弹窗",
          type: 'error'
        });
      })
    },
    //新建账号选择套餐的双ID赋值（为此在form中添加一条package参数,此参数为array包含多个套餐信息object）
    // selectpinu(data) {
    //   if (data == undefined) {
    //     return false
    //   }
    //   // this.newUserForm.package_id = data.id;
    //   // this.newUserForm.role_id = data.role_id;
    //   let packageIdList = [];
    //   for (let i = 0; i < data.length; i++) {
    //     packageIdList.push(data[i].package_id);
    //   }
    //   this.newUserForm.package_id = packageIdList;
    // },
    //提交前验证
    typeCheck(formName) {
      for (let i in formName) {
        if (i !== "invoice") {
          formName[i] = formName[i] + "";
        }
      }
    },
    //select更改验证1
    typeSelect1(data) {
      for (let i in this.packageEditForm) {
        this.packageEditForm[i] = this.packageEditForm[i] + "";
      }
    },
    //获取应收金额
    getGold(data) {
      if(data == ''){
        return false;
      }
      let params = {package_id: data};
      packageGold(params).then((res) => {
        if(res.data.code === "20000"){
            this.newSignBillForm.receivable_amount= res.data.package_amount;
        }else{
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
    },
    //强制关闭账号
    userClose(open,id) {
      if(open == 1){
        open = 0;
      }else{
        open = 1;
      }
      let cl = ["关闭","开启"];
      this.$confirm('确认'+ cl[open] +'账号吗？', '提示', {}).then(() => {
        let params = {is_open:open,user_id: id};
        userClosed(params).then((res) => {
          if(res.data.code === "20000"){
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getInfo();
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch((res) => {
          this.$message({
            message: "关闭失败，请重试",
            type: 'error'
          });
        })
      });
    },
    //强制关闭套餐
    packageClose(open,data) {
      if(open == 1){
        open = 0;
      }else{
        open = 1;
      }
      let cl = ["关闭","开启"];
      this.$confirm('确认'+ cl[open] +'套餐吗？', '提示', {}).then(() => {
        let params = {is_open:open,package_id: data};
        packageClosed(params).then((res) => {
          if(res.data.code === "20000"){
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getInfo();
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch((res) => {
          this.$message({
            message: "关闭失败，请重试",
            type: 'error'
          });
        })
      });
    },
    //套餐升降级
    purChange(id,role) {
      let open = 0;
      if(role == 3){
        open = 0;
        role = 4;
      }else{
        open = 1;
        role = 3;
      }
      let cl = ["降级","升级"];
      this.$confirm('确认'+ cl[open] +'吗？', '提示', {}).then(() => {
        let params = {role_id:role,package_id: id};
        packageChange(params).then((res) => {
          if(res.data.code === "20000"){
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getInfo();
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch((res) => {
          this.$message({
            message: "关闭失败，请重试",
            type: 'error'
          });
        })
      });
    },
    //新建套餐submit
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认创建新套餐吗？', '提示', {}).then(() => {
            this.loading1 = true;
            let para = Object.assign({}, this.newPackageForm);
            newPackage(para).then((res) => {
              this.loading1 = false;
              if (res.data.code === "20000") {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.newPackage = false;
                this.getInfo();
                if(!this.userInPackage){
                  this.packageDrop(0);
                }
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            }).catch(data => {
              this.logining1 = false;
              this.$message({
                message: "创建失败,请重试",
                type: 'error'
              });
            });
          });
        } else {
          this.$message({
            message: '请填写完整的表单',
            type: 'error'
          });
          return false;
        }
      });
    },
    //新建账号submit
    submitForm1(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认创建新账号吗？', '提示', {}).then(() => {
            this.loading2 = true;
            let para = Object.assign({}, this.newUserForm);
            $.ajax({
		            async: true,
		            type: "post",
		            dataType: "json",
		            url: "/account/user.open?cmd=WEL:ADDUSER",
		            data: para,
                traditional: true,
		            success: function(data) {
                  that.loading2 = false;
                  if (data.code === "20000") {
                    that.newUser = false;
                    that.$message({
                      message: data.msg,
                      type: 'success'
                    });
                    that.getInfo();
                  } else{
                    that.$message({
                      message: data.msg,
                      type: 'error'
                    });
                  }
		            },
                error: function(){
                  that.$message({
                    message: "创建失败，请重试",
                    type: 'error'
                  });
                }
            });

            // newUser(para).then((res) => {
            //   this.loading2 = false;
            //   if (res.data.code === "20000") {
            //     this.newUser = false;
            //     this.$message({
            //       message: res.data.msg,
            //       type: 'success'
            //     });
            //     this.getInfo();
            //   } else {
            //     this.$message({
            //       message: "创建失败，请重试",
            //       type: 'error'
            //     });
            //   }
            // }).catch(data => {
            //   this.logining2 = false;
            //   this.$message({
            //     message: "创建失败,请重试",
            //     type: 'error'
            //   });
            // });
          });
        } else {
          this.$message({
            message: '请填写完整的表单',
            type: 'error'
          });
          return false;
        }
      });
    },
    //编辑客户submit
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改客户信息吗？', '提示', {}).then(() => {
            this.loading3 = true;
            let para = Object.assign({}, this.clientEditForm);
            editClients(para).then((res) => {
              this.loading3 = false;
              this.editClient = false;
              this.$message({
                message: "修改成功",
                type: 'success'
              });
              this.getInfo();
            }).catch(data => {
              this.logining3 = false;
              this.$message({
                message: "修改失败,请重试",
                type: 'error'
              });
            });
          });
        } else {
          this.$message({
            message: '请填写完整的表单',
            type: 'error'
          });
          return false;
        }
      });
    },
    //编辑套餐submit
    submitForm3(formName) {
      for (let i in this.packageEditForm) {
        this.packageEditForm[i] = this.packageEditForm[i] + "";
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改套餐信息吗？', '提示', {}).then(() => {
            this.loading4 = true;
            let para = Object.assign({}, this.packageEditForm);
            editPackages(para).then((res) => {
              this.loading4 = false;
              if (res.data.code === "20000") {
                this.editPackage = false;
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getInfo();
              } else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            }).catch(data => {
              this.logining4 = false;
              this.$message({
                message: "修改失败,请重试",
                type: 'error'
              });
            });
          });
        } else {
          this.$message({
            message: '请填写完整的表单',
            type: 'error'
          });
          return false;
        }
      });
    },
    //编辑账号submit
    submitForm4(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改账号吗？', '提示', {}).then(() => {
            this.logining5 = true;
            let para = Object.assign({}, this.userEditForm);
            $.ajax({
		            async: true,
		            type: "post",
		            dataType: "json",
		            url: "/account/user.open?cmd=WEL:UPLOADUSER",
		            data: para,
		            success: function(data) {
                  that.logining5 = false;
                  if (data.code === "20000") {
                    that.editUser = false;
                    that.$message({
                      message: data.msg,
                      type: 'success'
                    });
                    that.getInfo();
                  } else{
                    that.$message({
                      message: data.msg,
                      type: 'error'
                    });
                  }
		            },
                error: function(){
                  that.$message({
                    message: "创建失败，请重试",
                    type: 'error'
                  });
                }
            });
            // editUsers(para).then((res) => {
            //   this.loading5 = false;
            //   this.editUser = false;
            //   this.$message({
            //     message: "修改成功",
            //     type: 'success'
            //   });
            //   this.getInfo();
            // }).catch(data => {
            //   this.logining5 = false;
            //   this.$message({
            //     message: "修改失败,请重试",
            //     type: 'error'
            //   });
            // });
          });
        } else {
          this.$message({
            message: '请填写完整的表单',
            type: 'error'
          });
          return false;
        }
      });
    },
    //新建签单submit
    submitForm5(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认新建销售及账单信息吗？', '提示', {}).then(() => {
            this.loading6 = true;
            let para = Object.assign({}, this.newSignBillForm);
            newSignBill(para).then((res) => {
              this.loading6 = false;
              if (res.data.code === "20000") {
                this.newSignBill = false;
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getInfo();
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            }).catch(data => {
              this.logining6 = false;
              this.$message({
                message: "新建失败,请重试",
                type: 'error'
              });
            });
          });
        } else {
          this.$message({
            message: '请填写完整的表单',
            type: 'error'
          });
          return false;
        }
      });
    },
    //编辑签单submit
    submitForm6(formName) {
      this.typeCheck(this.signBillEditForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改销售及账单信息吗？', '提示', {}).then(() => {
            this.loading7 = true;
            let para = Object.assign({}, this.signBillEditForm);
            editSignBill(para).then((res) => {
              this.loading7 = false;
              if (res.data.code === "20000") {
                this.editSignBill = false;
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getInfo();
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            }).catch(data => {
              this.logining7 = false;
              this.$message({
                message: "修改失败,请重试",
                type: 'error'
              });
            });
          });
        } else {
          this.$message({
            message: '请填写完整的表单',
            type: 'error'
          });
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    //全局loading(进入页面加载数据)
    this.loading = true;
    //表单客户ID赋值
    this.clientID = this.$route.params.clientId;
    this.newPackageForm.customer_id = this.$route.params.clientId;
    this.newUserForm.customer_id = this.$route.params.clientId;
    this.newSignBillForm.customer_id = this.$route.params.clientId;
    this.packageEditForm.customer_id = this.$route.params.clientId;
    //初始调用方法
    this.getInfo();
    this.getSalers();
    this.getRoles();
  }
};
</script>

<style scoped>
.client_row {
  line-height: 30px;
}

.button_row {
  margin-bottom: 15px;
}

.client_label {
  text-align: right;
  margin-left: 20px;
  padding-right:30px;
  min-width: 200px;
}

table {
  width: 100%;
  text-align: center;
}

.cell {
  text-align: center;
}

.longSelect {
  min-width: 450px;
  margin-bottom: 15px;
}
</style>
