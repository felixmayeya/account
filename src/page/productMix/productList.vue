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
          <el-button type="primary" @click="newProduct = true">新建产品</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="productList" border style="width: 100%" v-loading="listLoading">
      <el-table-column prop="product_name" label="产品名称" width="150">
      </el-table-column>
      <el-table-column prop="product_desc" label="产品描述" width="200" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="product_en_name" label="英文名" width="220">
      </el-table-column>
      <el-table-column prop="product_en_desc" label="英文描述" width="250" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="背景图(已激活)" width="150">
        <template scope="scope">
          {{scope.row.on_image?"已上传":"未上传"}}
        </template>
      </el-table-column>
      <el-table-column label="背景图(未激活)" width="150">
        <template scope="scope">
          {{scope.row.on_image?"已上传":"未上传"}}
        </template>
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="uptime" label="更新时间" width="120">
      </el-table-column>
      <el-table-column prop="remarks" label="备注" min-width="160">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="140">
        <template scope="scope">
          <el-button @click="editProduct = true;handleClick(scope.row)" size="small" type="primary">编辑</el-button>
          <el-button @click="deleteProduct(scope.row.id)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建产品" v-model="newProduct" @close="resetForm('newProductForm')">
      <el-form :model="newProductForm" :rules="newProductRules" ref="newProductForm" label-width="120px" v-loading="loading1">
        <el-form-item label="产品名称" prop="product_name">
          <el-input v-model="newProductForm.product_name"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" prop="product_desc">
          <el-input v-model="newProductForm.product_desc"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="product_en_name">
          <el-input v-model="newProductForm.product_en_name"></el-input>
        </el-form-item>
        <el-form-item label="英文描述" prop="product_en_desc">
          <el-input v-model="newProductForm.product_en_desc"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
          <el-input v-model="newProductForm.remarks"></el-input>
        </el-form-item>
        <el-form-item label="背景图">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarChange1">
            <img v-if="newProductForm.on_image" :src="newProductForm.on_image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            ref="upload"
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarChange2">
            <img v-if="newProductForm.off_image" :src="newProductForm.off_image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <br/>
          <span class="imgtitle">已激活</span>
          <span class="imgtitle">未激活</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newProduct = false;resetForm('newProductForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('newProductForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑产品" v-model="editProduct" @close="resetForm('editProductForm')">
      <el-form :model="editProductForm" :rules="editProductRules" ref="editProductForm" label-width="120px" v-loading="loading2">
        <el-form-item label="产品名称" prop="product_name">
          <el-input v-model="editProductForm.product_name"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" prop="product_desc">
          <el-input v-model="editProductForm.product_desc"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="product_en_name">
          <el-input v-model="editProductForm.product_en_name"></el-input>
        </el-form-item>
        <el-form-item label="英文描述" prop="product_en_desc">
          <el-input v-model="editProductForm.product_en_desc"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
          <el-input v-model="editProductForm.remarks"></el-input>
        </el-form-item>
        <el-form-item label="背景图">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarChange3">
            <img v-if="editProductForm.on_image" :src="editProductForm.on_image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            ref="upload"
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarChange4">
            <img v-if="editProductForm.off_image" :src="editProductForm.off_image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <br/>
          <span class="imgtitle">已激活</span>
          <span class="imgtitle">未激活</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editProduct = false;resetForm('editProductForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm1('editProductForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  newProductRule,
  editProductRule
} from '../../data/detailData.js'
import {
  getProductList,newProduct,editProduct,deleteProduct
} from '../../config/api';

export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      listLoading: false,
      productList: [],
      newProduct: false,
      editProduct: false,
      newProductForm: {
        product_name : '',
        product_desc : '',
        product_en_name : '',
        product_en_desc : '',
        remarks: '',
        on_image: '',
        off_image: ''
      },
      editProductForm: {
        id: '',
        product_name : '',
        product_desc : '',
        product_en_name : '',
        product_en_desc : '',
        remarks: '',
        on_image: '',
        off_image: ''
      },
      newProductRules: newProductRule,
      editProductRules: editProductRule
    }
  },
  methods: {
    handleClick: function(rowData) {
      for (let i in this.editProductForm) {
        this.editProductForm[i] = rowData[i];
      }
    },
    handleAvatarChange1(file) {
      let that = this;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(){
        that.newProductForm.on_image = reader.result;
      }
    },
    handleAvatarChange2(file) {
      let that = this;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(){
        that.newProductForm.off_image = reader.result;
      }
    },
    handleAvatarChange3(file) {
      let that = this;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(){
        that.editProductForm.on_image = reader.result;
      }
    },
    handleAvatarChange4(file) {
      let that = this;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(){
        that.editProductForm.off_image = reader.result;
      }
    },
    getProducts: function() {
      let params = {};
      getProductList(params).then((res) => {
        this.productList = res.data;
        this.listLoading = false;
      })
    },
    //新建产品submit
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确认创建新产品吗？', '提示', {}).then(() => {
              this.loading1 = true;
              let para = Object.assign({}, this.newProductForm);
              newProduct(para).then((res) => {
                this.loading1 = false;
                if (res.data.code === "20000") {
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  });
                  this.newProduct = false;
                  this.getProducts();
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
    //编辑产品
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认修改产品信息吗？', '提示', {}).then(() => {
            this.loading2 = true;
            let para = Object.assign({}, this.editProductForm);
            editProduct(para).then((res) => {
              this.loading2 = false;
              if (res.data.code === "20000") {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.editProduct = false;
                this.getProducts();
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
    deleteProduct(productId) {
      this.$confirm('确认删除产品吗？', '提示', {}).then(() => {
        let para = {id: productId};
        deleteProduct(para).then((res) => {
          if (res.data.code === "20000") {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getProducts();
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
    this.getProducts();
  }
}
</script>

<style lang="scss" scoped>
.imgtitle{
  display: inline-block;
  width: 178px;
  text-align: center;
}
.avatar-uploader{
  display:inline-block
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
