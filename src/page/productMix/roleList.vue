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
          <el-button type="primary" @click="newRole = true">新建角色</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="roleList" border style="width: 100%" v-loading="listLoading">
      <el-table-column prop="role_name" label="角色名" width="200">
      </el-table-column>
      <el-table-column prop="role_en_name" label="英文名" width="200">
      </el-table-column>
      <el-table-column prop="role_desc" label="角色描述" min-width="200">
      </el-table-column>
      <el-table-column prop="product_name" label="所属产品" width="200">
      </el-table-column>
      <el-table-column label="角色状态" width="120">
        <template scope="scope">
          {{role_status[scope.row.role_status]}}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价" width="120">
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="uptime" label="更新时间" width="120">
      </el-table-column>
      <el-table-column prop="remarks" label="备注" min-width="160">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="210">
        <template scope="scope">
          <el-button @click="editRole = true;handleClick(scope.row)" size="small" type="primary">编辑</el-button>
          <el-button @click="bindModule(scope.row.id,scope.row.role_name)" size="small" type="primary">模块</el-button>
          <el-button @click="deletRole(scope.row.id)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建角色" v-model="newRole" @close="resetForm('newRoleForm')">
      <el-form :model="newRoleForm" :rules="newRoleRules" ref="newRoleForm" label-width="120px" v-loading="loading1">
        <el-form-item label="角色名" prop="role_name">
          <el-input v-model="newRoleForm.role_name"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="role_en_name">
          <el-input v-model="newRoleForm.role_en_name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="role_desc">
          <el-input v-model="newRoleForm.role_desc"></el-input>
        </el-form-item>
        <el-form-item label="所属产品" prop="product_id">
          <el-select v-model="newRoleForm.product_id" clearable>
            <el-option v-for="item in productList" :key="item.id" :label="item.product_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色状态" prop="role_status">
          <el-select v-model="newRoleForm.role_status">
            <el-option v-for="(item, index) in role_status" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="newRoleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
          <el-input v-model="newRoleForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newRole = false;resetForm('newRoleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('newRoleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色" v-model="editRole" @close="resetForm('editRoleForm')">
      <el-form :model="editRoleForm" :rules="editRoleRules" ref="editRoleForm" label-width="120px" v-loading="loading2">
        <el-form-item label="角色名" prop="role_name">
          <el-input v-model="editRoleForm.role_name"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="role_en_name">
          <el-input v-model="editRoleForm.role_en_name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="role_desc">
          <el-input v-model="editRoleForm.role_desc"></el-input>
        </el-form-item>
        <el-form-item label="所属产品" prop="product_id">
          <el-select v-model="editRoleForm.product_id" clearable>
            <el-option v-for="item in productList" :key="item.id" :label="item.product_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色状态" prop="role_status">
          <el-select v-model="editRoleForm.role_status">
            <el-option v-for="(item, index) in role_status" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="editRoleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
          <el-input v-model="editRoleForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRole = false;resetForm('editRoleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm1('editRoleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  newRoleRule,
  editRoleRule
} from '../../data/detailData.js'
import {
  getRoleList,getProductList,newRole,editRole,deleteRole
} from '../../config/api';

export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      listLoading: false,
      roleList: [],
      productList: [],
      role_status: ['未开通','已开通'],
      newRole: false,
      editRole: false,
      newRoleForm: {
        role_name : '',
        role_en_name: '',
        role_desc : '',
        product_id : '',
        role_status : '',
        price: '',
        remarks: ''
      },
      editRoleForm: {
        id: '',
        role_name : '',
        role_en_name: '',
        role_desc : '',
        product_id : '',
        role_status : '',
        price: '',
        remarks: ''
      },
      newRoleRules: newRoleRule,
      editRoleRules: editRoleRule
    }
  },
  methods: {
    handleClick: function(rowData) {
      for (let i in this.editRoleForm) {
        this.editRoleForm[i] = rowData[i];
      }
      this.editRoleForm.role_status = Number(this.editRoleForm.role_status);
      if(this.editRoleForm.product_id == 0 || this.editRoleForm.product_id == null){
        this.editRoleForm.product_id = null;
      }else{
        this.editRoleForm.product_id = Number(this.editRoleForm.product_id);
      }
    },
    getRoles: function() {
      let params = {};
      getRoleList(params).then((res) => {
        this.roleList = res.data;
        getProductList(params).then((res) => {
          this.productList = res.data;
          this.listLoading = false;
        })
      })
    },
    bindModule: function(cid,cname) {
      this.$router.push({
        name: '角色绑定模块',
        params: {
          roleId: cid,
          roleName: cname
        }
      });
    },
    //新建角色submit
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认创建新角色吗？', '提示', {}).then(() => {
            this.loading1 = true;
            let para = Object.assign({}, this.newRoleForm);
            newRole(para).then((res) => {
              this.loading1 = false;
              if (res.data.code === "20000") {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.newRole = false;
                this.getRoles();
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
    //编辑角色
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改角色信息吗？', '提示', {}).then(() => {
            this.loading2 = true;
            let para = Object.assign({}, this.editRoleForm);
            editRole(para).then((res) => {
              this.loading2 = false;
              if (res.data.code === "20000") {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.editRole = false;
                this.getRoles();
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
    deletRole(roleId) {
      this.$confirm('确认删除角色吗？', '提示', {}).then(() => {
        let para = {id: roleId};
        deleteRole(para).then((res) => {
          if (res.data.code === "20000") {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getRoles();
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
    this.getRoles();
  }
}
</script>

<style lang="scss">

</style>
