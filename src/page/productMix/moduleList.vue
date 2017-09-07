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
          <el-button type="primary" @click="newModule = true">新建模块</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="moduleList" border style="width: 100%" v-loading="listLoading">
      <el-table-column prop="module_code" label="模块代码" width="120">
      </el-table-column>
      <el-table-column prop="module_name" label="模块名" min-width="160">
      </el-table-column>
      <el-table-column prop="module_desc" label="描述" width="200">
      </el-table-column>
      <el-table-column prop="module_en_name" label="英文名" width="180">
      </el-table-column>
      <el-table-column prop="module_en_desc" label="英文描述" width="200">
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="uptime" label="更新时间" width="120">
      </el-table-column>
      <el-table-column prop="remarks" label="备注" min-width="160">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="210">
        <template scope="scope">
          <el-button @click="editModule = true;handleClick(scope.row)" size="small" type="primary">编辑</el-button>
          <el-button @click="bindMenu(scope.row.id,scope.row.module_name)" size="small" type="primary">菜单</el-button>
          <el-button @click="deletModule(scope.row.id)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建模块" v-model="newModule" @close="resetForm('newModuleForm')">
      <el-form :model="newModuleForm" :rules="newModuleRules" ref="newModuleForm" label-width="120px" v-loading="loading1">
        <el-form-item label="模块代码" prop="module_code">
          <el-input v-model="newModuleForm.module_code"></el-input>
        </el-form-item>
        <el-form-item label="模块名" prop="module_name">
          <el-input v-model="newModuleForm.module_name"></el-input>
        </el-form-item>
        <el-form-item label="模块描述" prop="module_desc">
          <el-input v-model="newModuleForm.module_desc"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="module_en_name">
          <el-input v-model="newModuleForm.module_en_name"></el-input>
        </el-form-item>
        <el-form-item label="英文描述" prop="module_en_desc">
          <el-input v-model="newModuleForm.module_en_desc"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
          <el-input v-model="newModuleForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newModule = false;resetForm('newModuleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('newModuleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑模块" v-model="editModule" @close="resetForm('editModuleForm')">
      <el-form :model="editModuleForm" :rules="editModuleRules" ref="editModuleForm" label-width="120px" v-loading="loading2">
        <el-form-item label="模块代码" prop="module_code">
          <el-input v-model="editModuleForm.module_code"></el-input>
        </el-form-item>
        <el-form-item label="模块名" prop="module_name">
          <el-input v-model="editModuleForm.module_name"></el-input>
        </el-form-item>
        <el-form-item label="模块描述" prop="module_desc">
          <el-input v-model="editModuleForm.module_desc"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="module_en_name">
          <el-input v-model="editModuleForm.module_en_name"></el-input>
        </el-form-item>
        <el-form-item label="英文描述" prop="module_en_desc">
          <el-input v-model="editModuleForm.module_en_desc"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
          <el-input v-model="editModuleForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editModule = false;resetForm('editModuleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm1('editModuleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  newModuleRule,
  editModuleRule
} from '../../data/detailData.js'
import {
  getModuleList,newModule,editModule,deleteModule
} from '../../config/api';

export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      listLoading: false,
      moduleList: [],
      newModule: false,
      editModule: false,
      newModuleForm: {
        module_code : '',
        module_name : '',
        module_desc : '',
        module_en_name : '',
        module_en_desc : '',
        remarks: ''
      },
      editModuleForm: {
        id: '',
        module_code : '',
        module_name : '',
        module_desc : '',
        module_en_name : '',
        module_en_desc : '',
        remarks: ''
      },
      newModuleRules: newModuleRule,
      editModuleRules: editModuleRule
    }
  },
  methods: {
    handleClick: function(rowData) {
      for (let i in this.editModuleForm) {
        this.editModuleForm[i] = rowData[i];
      }
    },
    getModules: function() {
      let params = {};
      getModuleList(params).then((res) => {
        this.moduleList = res.data;
        this.listLoading = false;
      })
    },
    bindMenu: function(cid,cname) {
      this.$router.push({
        name: '模块绑定菜单',
        params: {
          moduleId: cid,
          moduleName: cname
        }
      });
    },
    //新建模块submit
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认创建新模块吗？', '提示', {}).then(() => {
            this.loading1 = true;
            let para = Object.assign({}, this.newModuleForm);
            newModule(para).then((res) => {
              this.loading1 = false;
              if (res.data.code === "20000") {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.newModule = false;
                this.getModules();
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
    //编辑模块
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改模块信息吗？', '提示', {}).then(() => {
            this.loading2 = true;
            let para = Object.assign({}, this.editModuleForm);
            editModule(para).then((res) => {
              this.loading2 = false;
              if (res.data.code === "20000") {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.editModule = false;
                this.getModules();
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
    deletModule(moduleId) {
      this.$confirm('确认删除模块吗？', '提示', {}).then(() => {
        let para = {id: moduleId};
        deleteModule(para).then((res) => {
          if (res.data.code === "20000") {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getModules();
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
    this.getModules();
  }
}
</script>

<style lang="scss">

</style>
