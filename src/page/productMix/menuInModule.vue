<template>
  <div v-loading="loading">
    <br>
    <el-transfer v-model="menuList" :data="allMenuList" :titles="['菜单列表', moduleN+'中的菜单列表']"></el-transfer><br>
    <el-button type="primary" @click="saveList">保存改动</el-button>
  </div>
</template>

<script>
import {
  menuInModule,getMenuList
} from '../../config/api';

export default {
  data() {
    return {
      loading: false,
      moduleID: '',
      moduleN: '',
      menuList: [],
      allMenuList: [],
    }
  },
  methods: {
    getMenus: function() {
      let params = {module_id:this.moduleID};
      getMenuList().then((res) => {
        for(let i = 0;i<res.data.length;i++){
          this.allMenuList.push({
            key: res.data[i].id,
            label: res.data[i].menu_name
          })
        }
        menuInModule(params).then((res) => {
          for(let i = 0;i<res.data.length;i++){
            res.data[i] = Number(res.data[i])
          }
          this.menuList = res.data;
          this.loading = false;
        })
      })
    },
    saveList: function() {
      let that = this;
      console.log(this.menuList);
      $.ajax({
        async: true,
        type: "post",
        data: {
          module_id: that.moduleID,
          menu_id: that.menuList
        },
        url: "/account/module.open?cmd=WEL:BINDINGMENU",
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
    this.moduleID = this.$route.params.moduleId;
    this.moduleN = this.$route.params.moduleName;
    this.getMenus();
  }
}
</script>

<style lang="scss">
  .el-transfer-panel{
    width: 300px;
  }
  .el-transfer-panel__body{
    height: 500px;
  }
  .el-transfer-panel__list{
    height: 100%;
  }
  .el-transfer-panel__header{
    line-height: 50px;
    height: 50px;
  }
</style>
