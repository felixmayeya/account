<template>
  <div v-loading="loading">
    <br>
    <el-transfer v-model="moduleList" :data="allModuleList" :titles="['模块列表', roleN + '中的模块列表']"></el-transfer><br>
    <el-button type="primary" @click="saveList">保存改动</el-button>
  </div>
</template>

<script>
import {
  moduleInRole,getModuleList
} from '../../config/api';

export default {
  data() {
    return {
      loading: false,
      roleID: '',
      roleN: '',
      moduleList: [],
      allModuleList: [],
    }
  },
  methods: {
    getModules: function() {
      let params = {role_id:this.roleID};
      getModuleList().then((res) => {
        for(let i = 0;i<res.data.length;i++){
          this.allModuleList.push({
            key: res.data[i].id,
            label: res.data[i].module_name
          })
        }
        moduleInRole(params).then((res) => {
          for(let i = 0;i<res.data.length;i++){
            res.data[i] = Number(res.data[i])
          }
          this.moduleList = res.data;
          this.loading = false;
        })
      })
    },
    saveList: function() {
      let that = this;
      console.log(this.moduleList);
      $.ajax({
        async: true,
        type: "post",
        data: {
          role_id: that.roleID,
          module_id: that.moduleList
        },
        url: "/account/role.open?cmd=WEL:BINDINGMODULE",
        success: (data => {
          if(data.code == "20000"){
            that.$message({
              message: data.msg,
              type: 'success'
            });
          }else {
            that.$message({
              message: data.msg,
              type: 'error'
            });
          }
        }),
        error: (data => {
            that.$message({
              message: "操作失败，请重试",
              type: 'error'
            });
        })

      })
    }
  },
  mounted() {
    this.loading = true,
    this.roleID = this.$route.params.roleId;
    this.roleN = this.$route.params.roleName;
    this.getModules();
  }
}
</script>

<style lang="scss" scoped>
  .el-transfer-panel{
    width: 300px;
  }
  .el-transfer-panel__body{
    height: 500px;
  }
  .el-transfer-panel__header{
    line-height: 50px;
    height: 50px;
  }
</style>
