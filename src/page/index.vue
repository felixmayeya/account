<template>
<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
  <h3 class="title">开数管理系统</h3>
  <el-form-item prop="account">
    <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
  </el-form-item>
  <el-form-item prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
  </el-form-item>
  <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
  <el-form-item style="width:100%;">
    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import {
  requestLogin
} from '../config/api';
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          //{ validator: validaePass }
        ],
        checkPass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleSubmit2() {
      var _this = this;
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true;
          let loginParams = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          };
          requestLogin(loginParams).then(data => {
            this.logining = false;
            if (data == null) {
              this.$message({
                message: "该用户名不存在",
                type: 'error'
              });
              return false;
            }
            if (data.statu === 'fail') {
              this.$message({
                message: "密码错误，请重新输入",
                type: 'error'
              });
            } else if (data.statu === 'expire') {
              this.$message({
                message: "账户到期无法使用",
                type: 'error'
              });
            } else if (data.statu === "noauth") {
              this.$message({
                message: "该账号无法登录",
                type: 'error'
              });
            } else {
              let user = {
                name:data.name,
                head:data.image
              }
              sessionStorage.setItem('user', JSON.stringify(user));
              let rmbUser = {
                username: this.ruleForm2.account,
                password: this.ruleForm2.checkPass
              }
              if(this.checked){
                localStorage.setItem('RMBUSER',JSON.stringify(rmbUser))
              }else{
                localStorage.removeItem('RMBUSER')
              }
              localStorage.setItem('ROLE',data.role);
          		if(data.role === "hr"){
                this.$router.push({
                  path: '/employee/list'
                });
          		}else{
                this.$router.push({
                  path: '/client/list'
                });
          		}

            }
          });
        } else {
          this.$message({
            message: "请填写完整",
            type: 'error'
          });
          return false;
        }
      });
    }
  },
  mounted() {
    var user = localStorage.getItem('RMBUSER');
    if(user){
      user = JSON.parse(user)
      this.ruleForm2.account = user.username;
      this.ruleForm2.checkPass = user.password;
    }
    if(localStorage.getItem("CHANGEPASSWORD") == 1){
      this.ruleForm2.checkPass = '';
      localStorage.setItem("CHANGEPASSWORD",0);
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
        margin: 0 auto 40px;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0 0 35px;
    }
}
</style>
