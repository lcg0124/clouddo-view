<template>
  <el-row class="wrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="wrap-main">
      <el-form size="small" :inline="true">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload :before-upload="beforeUpload" :action="uploadUrl" :data="uploadData" :headers="uploadHeaders"
                     :on-success="onSuccess">
            <el-button type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table :data="fileRows" border size="small">
        <el-table-column label="预览">
          <template slot-scope="scope">
            <img :src="scope.row.url" width="70" height="50">
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 1">图片</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="路径" prop="url"></el-table-column>
        <el-table-column label="创建日期" prop="createDate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="removeFile(scope.row.id)" size="mini" type="danger">删除</el-button>
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
  import API from '../../api/api_file'

  export default {
    name: "List",
    data() {
      return {
        limit: 10,
        page: 1,
        total: 0,
        fileRows: [],
        uploadUrl: '',
        uploadData: {},
        uploadHeaders: {Authorization: ''}
      }
    },
    methods: {
      search: function (val) {
        let that = this
        let params = {
          limit: that.limit,
          page: val
        }
        this.page = val
        API.files(params).then(res => {
          if (res.code === 0) {
            that.fileRows = res.page.rows
            that.total = res.page.total
          }
        })

      },
      beforeUpload: function () {
        let that = this
        return new Promise((resolve, reject) => {
          API.getToken().then(res => {
            let token = res.token
            let key = res.key
            that.uploadData = {token: token, key: key}
            that.uploadHeaders.Authorization = token
            that.uploadUrl = res.url
            resolve(true)
          })
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      },
      removeFile: function (id) {
        let that = this
        return API.remove({id: id}).then(res => {
          if (res.code === 0) {
            that.$message.success(res.msg)
            that.search(this.page);
          }
        })
      },
      onSuccess: function () {
        this.search(this.page)
      }
    },

    mounted() {
      this.search(1);
    }
  }
</script>

<style scoped>

</style>
