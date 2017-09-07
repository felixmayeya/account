<template>
  <div>
  <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <!-- <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="createUser">新建客戶</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="clientList" border style="width: 100%" v-loading="listLoading">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="公司地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="开户邮箱">
              <span>{{ props.row.account_email }}</span>
            </el-form-item>
            <el-form-item label="有效产品">
              <div v-for="item in props.row.package_names" :key="item.id">{{item}}</div>
            </el-form-item>
            <el-form-item label="拥有账号">
              <div v-for="item in props.row.user_names" :key="item.id">{{item}}</div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="no" label="客户编码" width="220" sortable>
      </el-table-column>
      <el-table-column prop="type_desc" label="客户性质" width="120">
      </el-table-column>
      <el-table-column prop="valid" label="客户状态" width="100">
      </el-table-column>
      <el-table-column prop="company" label="客户公司">
      </el-table-column>
      <el-table-column prop="leader" label="负责人" width="120">
      </el-table-column>
      <el-table-column prop="create_time" label="开户时间" width="120" sortable>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template scope="scope">
          <el-button @click="handleClick(scope.row.id)" size="small" type="primary">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
	</div>
</template>
<script>
import {
  getUserList
} from '../../config/api';

export default {
  data() {
    return {
      listLoading: false,
      filters: {
        name: ''
      },
      users: [],
      clientList: [],
    }
  },
  methods: {
    createUser: function() {
      this.$router.push({
        path: '/client/new'
      });
    },
    handleClick: function(cid) {
      this.$router.push({
        name: '客戶详情',
        params: {
          clientId: cid
        }
      });
    },
    getUsers: function() {
      let params = {};
      getUserList(params).then((res) => {
        this.clientList = res.data;
        for (let i = 0; i < this.clientList.length; i++) {
          let plist = this.clientList[i].package_names;
          if (plist == null) {
            continue;
          }
          this.clientList[i].package_names = plist.split(",");
        }
        for (let i = 0; i < this.clientList.length; i++) {
          let ulist = this.clientList[i].user_names;
          if (ulist == null) {
            continue;
          }
          this.clientList[i].user_names = ulist.split(",");
        }
        this.listLoading = false;
      })
    }
  },
  mounted() {
    this.listLoading = true;
    this.getUsers();
  }
}
</script>

<style>
table th {
  width: 100%;
  text-align: center;
}

.cell {
  text-align: center;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
