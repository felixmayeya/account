<template>
<div>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true" :model="filters">
      <!-- <el-form-item>
        <el-input v-model="filters.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="getEmployee">查询</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="createEmployee">新建员工</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-table :data="employeeList" highlight-current-row border style="width: 100%" v-loading="listLoading">
    <el-table-column prop="name" label="姓名" width="80">
    </el-table-column>
    <el-table-column prop="gender" label="性别" width="80">
    </el-table-column>
    <el-table-column prop="phone" label="手机号" width="150">
    </el-table-column>
    <el-table-column prop="department" label="部门" width="150">
    </el-table-column>
    <el-table-column prop="job_number" label="工号" width="120">
    </el-table-column>
    <el-table-column prop="position" label="岗位" min-width="300">
    </el-table-column>
    <el-table-column prop="status_desc" label="状态" width="80">
    </el-table-column>
    <el-table-column label="操作" width="80">
      <template scope="scope">
        <el-button @click="ehandleClick(scope.row.id)" type="primary" size="small">详情</el-button>
      </template>
      </el-table-column>
  </el-table>
</div>
</template>
<script>
import {
  getEmployeeList
} from '../../config/api';

export default {
  data() {
    return {
      listLoading: false,
      filters: {
        name: ''
      },
      employeeList: []
    }
  },
  methods: {
    createEmployee: function() {
      this.$router.push({
        path: '/employee/new'
      });
    },
    ehandleClick: function(data) {
      this.$router.push({
        name: '员工详情',
        path: '/employee/detail',
        params: {
          employeeId: data
        }
      });
    },
    getEmployee: function() {
      let params = {};
      getEmployeeList(params).then((res) => {
        this.employeeList = res.data;
        this.listLoading = false;
      })
    }
  },
  mounted() {
    this.listLoading = true;
    this.getEmployee();
  }
}
</script>
