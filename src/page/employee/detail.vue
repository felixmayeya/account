<template>
  <div v-loading="loading">
    <el-row class="button_row">
      <el-col :span="24">
        <el-button type="warning" @click="editEmployee = true">编辑员工信息</el-button>
        <el-button type="danger" v-if="admin === 'admin'" @click="resetLoginName = true">管理员修改登录名</el-button>
        <el-button type="danger" v-if="admin === 'admin'" @click="resetPassword">管理员重置密码</el-button>
      </el-col>
    </el-row>
    <el-row class="client_row" v-for="(value, key) in employeeDefault" :key="key">
      <el-col :span="4" class="client_label">{{ value }}</el-col>
      <el-col :span="18">{{ employeeList[key] }}</el-col>
    </el-row>
    <el-dialog title="编辑员工信息" v-model="editEmployee" @close="resetForm('editEmployeeForm')">
      <el-form :model="editEmployeeForm" :rules="editEmployeeRules" ref="editEmployeeForm" :label-width="formLabelWidth" v-loading="loading2">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editEmployeeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio class="radio" v-model="editEmployeeForm.gender" label="男">男</el-radio>
          <el-radio class="radio" v-model="editEmployeeForm.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-input v-model="editEmployeeForm.birthday"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="id_card">
          <el-input v-model="editEmployeeForm.id_card"></el-input>
        </el-form-item>
        <el-form-item label="所在地" prop="province">
          <v-distpicker hide-area @selected="onSelected" :province="employeeList.province" :city="employeeList.city" ref="dist"></v-distpicker>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editEmployeeForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editEmployeeForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="editEmployeeForm.department"></el-input>
        </el-form-item>
        <el-form-item label="合同起始日期" prop="contract_start_date">
          <el-input v-model="editEmployeeForm.contract_start_date"></el-input>
        </el-form-item>
        <el-form-item label="合同终止日期" prop="contract_end_date">
          <el-input v-model="editEmployeeForm.contract_end_date"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="editEmployeeForm.status">
            <el-radio :label="1">在职</el-radio>
            <el-radio :label="0">离职</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工号" prop="job_number">
          <el-input v-model="editEmployeeForm.job_number"></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="position">
          <el-input v-model="editEmployeeForm.position"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="editEmployeeForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editEmployee = false;resetForm('editEmployeeForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('editEmployeeForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改登录名" v-model="resetLoginName" @close="resetForm('resetLoginNameForm')" size="tiny">
      <el-form :model="resetLoginNameForm" :rules="resetLoginNamRule" ref="resetLoginNameForm" label-width="100px">
        <el-form-item label="登录名" prop="login_name">
          <el-input v-model="resetLoginNameForm.login_name" style="width:240px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetLoginName = false">取 消</el-button>
        <el-button type="primary" @click="submitForm1('resetLoginNameForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  editEmployees,resetPass,changeLogin
} from '../../config/api';
import {
  checkTel,editEmployeeRule,employeeDefault
} from '../../data/detailData.js';
export default {
  data() {
    return {
      admin: '',
      resetLoginName: false,
      formLabelWidth: '150px',
      employeeID: '',
      loading: false,
      loading2: false,
      employeeList: {},
      editEmployee: false,
      editEmployeeRules: editEmployeeRule,
      employeeDefault: employeeDefault,
      editEmployeeForm: {
        id: '',
        name: '',
        gender: '',
        birthday: '',
        id_card: '',
        province: '',
        city: '',
        email: '',
        phone: '',
        department: '',
        contract_start_date: '',
        contract_end_date: '',
        status : '',
        job_number: '',
        position: '',
        address: ''
      },
      resetLoginNameForm: {
        emloyee_id: '',
        login_name: ''
      },
      resetLoginNamRule: {
        login_name: [{
          required: true,
          message: '请填写登录名',
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    //获取客户全部信息（由于axios坑实在太多，采用此非常low的方法，后期优化再做更改）
    getInfo() {
      // getClient(this.clientID).then(data => {
      //   this.clientList = data;
      // })
      $.ajax({
        async: true,
        type: "get",
        data: {
          emloyee_id: this.employeeID
        },
        url: "/account/employee.open?cmd=WEL:GETEMPLOYEEBYID",
        success: (data => {
          this.employeeList = data;
          for(let i in this.editEmployeeForm){
            this.editEmployeeForm[i] = this.employeeList[i];
          };
          this.editEmployeeForm.status = data.status;
          console.log(this.editEmployeeForm)
          this.loading = false;
        })
      });
    },
    //省市联动选择后的回调
    onSelected(region) {
        this.editEmployeeForm.province = region.province;
        this.editEmployeeForm.city = region.city;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改员工信息吗？', '提示', {}).then(() => {
            let para = Object.assign({}, this.editEmployeeForm);
            editEmployees(para).then((res) => {
              this.editEmployee = false;
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getInfo();
            }).catch(() => {
              this.$message({
                message: '修改失败，请重试',
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
    submitForm1(formName) {
      this.resetLoginNameForm.emloyee_id = this.employeeID;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改登录名吗？', '提示', {}).then(() => {
            let para = Object.assign({}, this.resetLoginNameForm);
            changeLogin(para).then((res) => {
              this.resetLoginName = false;
              if(res.data.code == "20000"){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
              }else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            }).catch(() => {
              this.$message({
                message: '修改失败，请重试',
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
    resetPassword() {
      this.$confirm('确认重置密码吗？', '提示', {}).then(() => {
        let para = {emloyee_id: this.employeeID};
        resetPass(para).then((res) => {
          if(res.data.code == "20000"){
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
          }else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '重置失败，请重试',
            type: 'error'
          });
        });
      });

    }
  },
  mounted() {
    this.admin = localStorage.getItem("ROLE");
    this.loading = true,
    this.employeeID = this.$route.params.employeeId;
    this.editEmployeeForm.id = this.$route.params.employeeId;
    this.getInfo();
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
</style>
