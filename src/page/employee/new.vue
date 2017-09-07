<template>
<el-col :span="18">
  <el-form :model="ruleForm" :rules="newEmployeeRules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio class="radio" v-model="ruleForm.gender" label="男">男</el-radio>
      <el-radio class="radio" v-model="ruleForm.gender" label="女">女</el-radio>
    </el-form-item>
    <el-form-item label="出生日期" prop="birthday">
      <el-input v-model="ruleForm.birthday"></el-input>
    </el-form-item>
    <el-form-item label="身份证" prop="id_card">
      <el-input v-model="ruleForm.id_card"></el-input>
    </el-form-item>
    <el-form-item label="所在地" prop="province">
      <v-distpicker hide-area @selected="onSelected" :placeholders="placeholders" ref="dist"></v-distpicker>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="部门" prop="department">
      <el-input v-model="ruleForm.department"></el-input>
    </el-form-item>
    <el-form-item label="合同起始日期" prop="contract_start_date">
      <el-input v-model="ruleForm.contract_start_date"></el-input>
    </el-form-item>
    <el-form-item label="合同终止日期" prop="contract_end_date">
      <el-input v-model="ruleForm.contract_end_date"></el-input>
    </el-form-item>
    <el-form-item label="工号" prop="job_number">
      <el-input v-model="ruleForm.job_number"></el-input>
    </el-form-item>
    <el-form-item label="岗位" prop="position">
      <el-input v-model="ruleForm.position"></el-input>
    </el-form-item>
    <el-form-item label="住址" prop="address">
      <el-input v-model="ruleForm.address"></el-input>
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
  newEmployee
} from '../../config/api';
import {
  checkTel,newEmployeeRule
} from '../../data/detailData.js';
export default {
  data() {
    return {
      placeholders: {
        province: '------- 省 --------',
        city: '--- 市 ---',
      },
      ruleForm: {
        name: '',
        gender: '男',
        birthday: '',
        id_card: '',
        province: '',
        city: '',
        email: '',
        phone: '',
        department: '',
        contract_start_date: '',
        contract_end_date: '',
        job_number: '',
        position: '',
        address: ''
      },
      newEmployeeRules: newEmployeeRule
    };
  },
  methods: {
    onSelected(region) {
        this.ruleForm.province = region.province;
        this.ruleForm.city = region.city;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认创建新员工吗？', '提示', {}).then(() => {
            let para = Object.assign({}, this.ruleForm);
            newEmployee(para).then((res) => {
              this.$message({
                message: '创建成功',
                type: 'success'
              });
              this.$router.push({ path: '/employee/list' });
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
    }
  },
  mounted() {

  }
}
</script>
