<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="更改头像" name="head" class="head">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          action="/account/employee.open?cmd=WEL:CHANGEIMAGE"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleAvatarChange">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button style="margin-top: 10px;" type="primary" @click="submitUpload" :loading="loading1">上传头像</el-button>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="password">
        <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-width="150px">
          <el-form-item label="旧密码" prop="oldpassword">
            <el-input v-model="passwordForm.oldpassword" class="passwordInput"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input v-model="passwordForm.newpassword" class="passwordInput" type="password"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码" prop="passwordAgain">
            <el-input v-model="passwordForm.passwordAgain" class="passwordInput" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('passwordForm')">提交</el-button>
            <el-button @click="resetForm('passwordForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {resetPassword} from '../config/api';

export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次填写新密码'));
      }
      if (value != this.passwordForm.newpassword) {
        callback(new Error('请保持两次密码填写一致'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'head',
      imageUrl: '',
      imageFile: {},
      loading1: false,
      passwordForm:{
        oldpassword: '',
        newpassword: '',
        passwordAgain: ''
      },
      passwordRules:{
        oldpassword: [{
          required: true,
          message: '请填写旧密码',
          trigger: 'blur'
        }],
        newpassword: [{
          required: true,
          message: '请填写新密码',
          trigger: 'blur'
        }],
        passwordAgain: [{
          required: true,
          validator: checkPassword,
          trigger: 'blur'
        }],
      }
    }
  },
  methods: {
    submitUpload() {
      let that = this;
      this.loading1 = true;
      let reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      reader.onload = function(){
        $.ajax({
          async: true,
          type: "post",
          data: {
            image: reader.result
          },
          url: "/account/employee.open?cmd=WEL:CHANGEIMAGE",
          success: (data => {
            if(data.code === "20000"){
              that.$message({
                message: '上传成功,重新登录后生效',
                type: 'success'
              });
              that.$emit('message', that.imageUrl);
              that.loading1 = false;
            }
          })
        })
      }
    },
    handleAvatarChange(file) {
      this.imageFile = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pa = this.passwordForm.passwordAgain;
          delete this.passwordForm.passwordAgain;
          this.$confirm('确认修改密码吗？', '提示', {}).then(() => {
            let para = Object.assign({}, this.passwordForm);
            resetPassword(para).then((res) => {
              if(res.data.code === "20000"){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                setTimeout(()=>{
                  this.$alert('请重新登录', '', {
                    confirmButtonText: '确定',
                    callback: action => {
                      localStorage.setItem("CHANGEPASSWORD",1);
                      this.$router.push({path: '/'});
                    }
                  });
                },1000)
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
                this.passwordForm.passwordAgain = pa;
              }
            }).catch(() => {
              this.$message({
                message: '修改失败，请重试',
                type: 'error'
              });
              this.passwordForm.passwordAgain = pa;
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
  }
}
</script>

<style lang="scss">
  .head{
    padding:15px;
  }
  .passwordInput{
    width:300px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
