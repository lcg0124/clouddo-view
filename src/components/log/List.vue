<template>
  <el-row class="wrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="wrap-main">
      <el-table :data="rows">
        <el-table-column label="用户" prop="username"></el-table-column>
        <el-table-column label="操作" prop="operation"></el-table-column>
        <el-table-column label="用时" prop="time"></el-table-column>
        <el-table-column label="操作时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="方法" prop="method"></el-table-column>
        <el-table-column label="ip" prop="ip"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev, pager, next" @current-change="search" :page-size="limit"
                     :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
  import API from '../../api/api_log'

  export default {
    name: "List",
    data() {
      return {
        limit: 10,
        total: 0,
        rows: []
      }
    },
    methods: {
      search: function (val) {
        let that = this
        that.page = val
        let params = {
          limit: that.limit,
          page: val
        }
        API.list(params).then(res => {
          if (res.code === 0) {
            that.rows = res.page.rows
            that.total = res.page.total
          }
        })

      },
      remove: function (id) {
        let that = this
        API.remove({id: id}).then(res => {
          if (res.code === 0) {
            that.$message.success(res.msg)
            that.search(that.page)
          }
        })
      },
    },

    mounted() {
      this.search(1);
    }
  }
</script>

<style scoped>

</style>
