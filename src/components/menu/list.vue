<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" >
          <el-form-item>
            <el-button type="primary" @click="showAddDialog(0,0)">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
      <!--菜单表格-->
      <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
        <tree-table :data="menudata" :columns="columns" border highlight-current-row v-loading="loading"
                    style="width: 100%;">
          <el-table-column label="序号" prop="id"></el-table-column>
          <el-table-column label="路径" prop="object.url"></el-table-column>
          <el-table-column label="权限" prop="object.perms"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="removeUser(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </tree-table>
        <!-- 添加界面 -->
        <el-dialog title="编辑" :visible.sync="addFormVisible" :close-on-click-modal="false">
          <el-form :model="addForm" label-width="80px" :rules="editFormRules" ref="addForm">
            <el-form-item label="名称" prop="name">
              <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="路径" prop="url">
              <el-input v-model="addForm.url" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="perms">
              <el-input v-model="addForm.perms" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
          </div>
        </el-dialog>
        <!-- 编辑界面 -->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="名称" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="路径" prop="url">
              <el-input v-model="editForm.url" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="perms">
              <el-input v-model="editForm.perms" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
          </div>
        </el-dialog>
      </el-col>
  </el-row>
</template>

<script>
  /**

   */
  import treeTable from '@/components/TreeTable'
  import API from '../../api/api_menu'

  export default {
    name: 'treeTableDemo',
    components: {treeTable},
    data() {
      return {
        loading: false,
        addLoading: false,
        columns: [
          {
            text: '名称',
            value: 'text',
            width: 200
          },
        ],
        menudata: [],
        editFormVisible: false,
        editForm: {},
        editFormRules: {},
        addFormVisible:false,
        addForm:{}
      }
    },
    methods: {
      search: function () {
        let that = this
        API.menus().then(
          function (result) {
            that.menudata = result
          }
        )
      },
      showAddDialog: function(index,row){
        this.addFormVisible = true
      },
      showEditDialog: function (index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row.object)
      },
      editSubmit: function () {
        let that = this;
        this.$refs.editForm.validate(valid => {
          if (valid) {
            that.loading = true;
            let params = Object.assign({}, that.editForm);
            API.editMenu(params).then(function (result) {
              if (0 === result.code) {
                that.loading = false;
                that.$message;
                that.$message.success({
                  showClose: true,
                  message: "修改成功",
                  duration: 2000
                });
                that.$refs["editForm"].resetFields();
                that.editFormVisible = false;
                that.search();
              } else {
                that.$message.error({
                  showClose: true,
                  message: "修改失败",
                  duration: 2000
                });
              }
            });
          }
        });
      },
      //新增
      addSubmit: function () {
        let that = this;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            that.loading = true;
            let para = Object.assign({}, this.addForm);
            para.publishAt = (!para.publishAt || para.publishAt === '') ? '' : util.formatDate.format(new Date(para.publishAt), 'yyyy-MM-dd');
            API.add(para).then(function (result) {
              that.loading = false;
              if (result && parseInt(result.errcode) === 0) {
                that.$message.success({showClose: true, message: '新增成功', duration: 2000});
                that.$refs['addForm'].resetFields();
                that.addFormVisible = false;
                that.search();
              } else {
                that.$message.error({showClose: true, message: '修改失败', duration: 2000});
              }
            }, function (err) {
              that.loading = false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch(function (error) {
              that.loading = false;
              console.log(error);
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            });

          }
        });
      },
    },
    mounted() {
      this.search();
    }
  }
</script>
