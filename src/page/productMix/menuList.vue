<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <!-- <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="newMenu = true">新建菜单</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="menuList" border style="width: 100%" v-loading="listLoading">
      <el-table-column prop="menu_name" label="菜单名" width="160">
      </el-table-column>
      <el-table-column prop="menu_en_name" label="英文名" min-width="160">
      </el-table-column>
      <el-table-column prop="menu_desc" label="描述" width="180">
      </el-table-column>
      <el-table-column prop="menu_href" label="路由地址" width="180">
      </el-table-column>
      <el-table-column prop="menu_icon" label="图标" width="160">
      </el-table-column>
      <el-table-column prop="parent_menu_name" label="父级菜单" width="160">
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="uptime" label="更新时间" width="120">
      </el-table-column>
      <el-table-column label="菜单状态" width="120">
        <template scope="scope">
          {{menu_status[scope.row.menu_status]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="140">
        <template scope="scope">
          <el-button @click="editMenu = true;handleClick(scope.row)" size="small" type="primary">编辑</el-button>
          <el-button @click="deletMenu(scope.row.id)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建菜单" v-model="newMenu" @close="resetForm('newMenuForm')">
      <el-form :model="newMenuForm" :rules="newMenuRules" ref="newMenuForm" label-width="120px" v-loading="loading1">
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input v-model="newMenuForm.menu_name"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="menu_en_name">
          <el-input v-model="newMenuForm.menu_en_name"></el-input>
        </el-form-item>
        <el-form-item label="菜单描述" prop="menu_desc">
          <el-input v-model="newMenuForm.menu_desc"></el-input>
        </el-form-item>
        <el-form-item label="路由地址" prop="menu_href">
          <el-input v-model="newMenuForm.menu_href"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="menu_icon">
          <el-input v-model="newMenuForm.menu_icon"></el-input>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-select v-model="newMenuForm.parent_id" clearable>
            <el-option v-for="item in parentMenuList" :key="item.id" :label="item.menu_name" :value="item.menu_code"></el-option>
          </el-select>
          <br/> <span>（若此菜单为父级则不需要选择此项）</span>
        </el-form-item>
        <el-form-item label="菜单状态" prop="menu_status">
          <el-select v-model="newMenuForm.menu_status">
            <el-option v-for="(item, index) in menu_status" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
          <el-input v-model="newMenuForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newMenu = false;resetForm('newMenuForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('newMenuForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑菜单" v-model="editMenu" @close="resetForm('editMenuForm')">
      <el-form :model="editMenuForm" :rules="editMenuRules" ref="editMenuForm" label-width="120px" v-loading="loading2">
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input v-model="editMenuForm.menu_name"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="menu_en_name">
          <el-input v-model="editMenuForm.menu_en_name"></el-input>
        </el-form-item>
        <el-form-item label="菜单描述" prop="menu_desc">
          <el-input v-model="editMenuForm.menu_desc"></el-input>
        </el-form-item>
        <el-form-item label="路由地址" prop="menu_href">
          <el-input v-model="editMenuForm.menu_href"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="menu_icon">
          <el-input v-model="editMenuForm.menu_icon"></el-input>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-select v-model="editMenuForm.parent_id" clearable>
            <el-option v-for="item in parentMenuList" :key="item.id" :label="item.menu_name" :value="item.menu_code"></el-option>
          </el-select>
          <br/> <span>（若此菜单为父级则不需要选择此项）</span>
        </el-form-item>
        <el-form-item label="菜单状态" prop="menu_status">
          <el-select v-model="editMenuForm.menu_status">
            <el-option v-for="(item, index) in menu_status" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
          <el-input v-model="editMenuForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editMenu = false;resetForm('editMenuForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm1('editMenuForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  newMenuRule,
  editMenuRule
} from '../../data/detailData.js'
import {
  getMenuList,getParentMenuList,newMenu,editMenu,deleteMenu
} from '../../config/api';

export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      listLoading: false,
      menu_status: ["不可用","可用"],
      menuList: [],
      parentMenuList: [],
      newMenu: false,
      editMenu: false,
      newMenuForm: {
        menu_name: '',
        menu_en_name: '',
        menu_desc: '',
        menu_href: '',
        menu_icon: '',
        parent_id: '',
        menu_status: '',
        remarks: '',
      },
      editMenuForm: {
        id: '',
        menu_name: '',
        menu_en_name: '',
        menu_desc: '',
        menu_href: '',
        menu_icon: '',
        parent_id: '',
        menu_status: '',
        remarks: '',
      },
      newMenuRules: newMenuRule,
      editMenuRules: editMenuRule
    }
  },
  methods: {
    handleClick: function(rowData) {
      for (let i in this.editMenuForm) {
        this.editMenuForm[i] = rowData[i];
      }
      this.editMenuForm.menu_status = Number(this.editMenuForm.menu_status);
      if(this.editMenuForm.parent_id == 0 || this.editMenuForm.parent_id == null){
        this.editMenuForm.parent_id = null;
      }
    },
    getMenus: function() {
      let params = {};
      getMenuList(params).then((res) => {
        this.menuList = res.data;
        getParentMenuList(params).then((res) => {
          this.parentMenuList = res.data;
          this.listLoading = false;
        })
      })

      // $.ajax({
      //   async: true,
      //   type: "get",
      //   url: "http://localhost:3000/users/cost",
      //   success: (data => {
      //     that.menuList = data;
      //     for(let i = 0;i<that.menuList.length;i++){
      //       that.menuList[i].create_time = that.menuList[i].create_time.substring(0, 10);
      //       if(that.menuList[i].update_time == null){
      //         continue
      //       }
      //       that.menuList[i].update_time = that.menuList[i].update_time.substring(0, 10);
      //     }
      //     that.listLoading = false;
      //   }),
      //   error: (data => {
      //     console.log("请求失败")
      //   })
      // })
    },
    //新建菜单submit
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认创建新菜单吗？', '提示', {}).then(() => {
            this.loading1 = true;
            let para = Object.assign({}, this.newMenuForm);
            newMenu(para).then((res) => {
              this.loading1 = false;
              if (res.data.code === "20000") {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.newMenu = false;
                this.getMenus();
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
    //编辑菜单
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改菜单信息吗？', '提示', {}).then(() => {
            this.loading2 = true;
            let para = Object.assign({}, this.editMenuForm);
            editMenu(para).then((res) => {
              this.loading2 = false;
              if (res.data.code === "20000") {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.editMenu = false;
                this.getMenus();
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            }).catch(data => {
              this.logining2 = false;
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
    deletMenu(menuId) {
      this.$confirm('确认删除菜单吗？', '提示', {}).then(() => {
        let para = {id: menuId};
        deleteMenu(para).then((res) => {
          if (res.data.code === "20000") {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getMenus();
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch(data => {
          this.$message({
            message: "删除失败,请重试",
            type: 'error'
          });
        });
      });

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.listLoading = true;
    this.getMenus();
  }
}
</script>

<style lang="scss">

</style>
