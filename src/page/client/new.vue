<template>
<el-col :span="18">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="客户性质" prop="type">
    <el-select v-model="ruleForm.type">
      <el-option
        v-for="item in typeList"
         :key="item.id"
        :label="item.name"
        :value="item.value" selected>
      </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="客户公司" prop="company">
      <el-input v-model="ruleForm.company"></el-input>
    </el-form-item>
    <el-form-item label="开户邮箱" prop="account_email">
      <el-input v-model="ruleForm.account_email"></el-input>
    </el-form-item>
    <el-form-item label="负责人姓名" prop="leader">
      <el-input v-model="ruleForm.leader"></el-input>
    </el-form-item>
    <el-form-item label="负责人手机号" prop="leader_phone">
      <el-input v-model="ruleForm.leader_phone"></el-input>
    </el-form-item>
    <el-form-item label="负责人部门" prop="leader_department">
      <el-input v-model="ruleForm.leader_department"></el-input>
    </el-form-item>
    <el-form-item label="公司所在地" prop="province">
      <v-distpicker @selected="onSelected" :placeholders="placeholders" ref="dist"></v-distpicker>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="ruleForm.address"></el-input>
    </el-form-item>
    <el-form-item label="销售员工" prop="saler_job_number">
      <el-select v-model="ruleForm.saler_job_number">
        <el-option
          v-for="item in salerList"
           :key="item.id"
          :label="item.name"
          :value="item.job_number">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="维护员工" prop="cs_job_number">
      <el-select v-model="ruleForm.cs_job_number">
        <el-option
          v-for="item in salerList"
           :key="item.id"
          :label="item.name"
          :value="item.job_number">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</el-col>
</template>
<script>
import {
  getSaler,newClient
} from '../../config/api';
export default {
  data() {
    var checkTel = (rule, value, callback) => {
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
    return {
      typeList: [
        {name:'对外客户',value:'C'},
        {name:'内部测试账户',value:'T'},
      ],
      placeholders: {
        province: '------- 省 --------',
        city: '--- 市 ---',
        area: '--- 区 ---',
      },
      salerList: [],
      ruleForm: {
        type: '',
        company: '',
        account_email: '',
        leader: '',
        leader_phone: '',
        leader_department: '',
        province: '',
        city: '',
        area: '',
        address: '',
        saler_job_number: '',
        cs_job_number: ''
      },
      rules: {
        type: [{
          required: true,
          message: '请至少选择一个客户性质',
          trigger: 'change'
        }],
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
    };
  },
  methods: {
    onSelected(region) {
        this.ruleForm.province = region.province;
        this.ruleForm.city = region.city;
        this.ruleForm.area = region.area;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认创建新客户吗？', '提示', {}).then(() => {
            let para = Object.assign({}, this.ruleForm);
            newClient(para).then((res) => {
              this.$message({
                message: '创建成功',
                type: 'success'
              });
              this.$router.push({ path: '/client/list' });
            }).catch(() => {
              this.$message({
                message: '创建失败，请重试',
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getSalers: function() {
      let params = {};
      getSaler(params).then((res) => {
        this.salerList = res.data;
      })
    }
  },
  mounted() {
    this.getSalers();
  }
}
</script>
