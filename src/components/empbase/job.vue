<template>
  <div class="container">
    <!-- 查询区----start -->
    <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch" :rules="searchRules" class="demo-form-inline">
      <el-form-item label="岗位编号" prop="jobNo">
        <!-- 数字类型要用v-model.number绑定，否则绑定规则不能验证数字类型，数字类型传回也为数字类型 -->
        <el-input v-model="formSearch.jobNo" placeholder="输入数字"></el-input>
      </el-form-item>
      <el-form-item label="岗位名称" prop="jobName">
        <el-input v-model="formSearch.jobName" placeholder="输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区----end -->
    <!-- 操作区----start -->
    <el-row class="mgb15">
      <el-button size="small" round type="primary" @click="dialogAddVisible = true">新增</el-button>
      <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
    </el-row>
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table :data="tableData.slice((pageInfo.pageIndex-1)*pageInfo.pageSize,pageInfo.pageIndex*pageInfo.pageSize)" border stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="jobNo" label="岗位编号" width="180" sortable>
      </el-table-column>
      <el-table-column prop="jobName" label="岗位名称" width="180">
      </el-table-column>
      <el-table-column prop="jobInfo" label="岗位描述">
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.pageIndex"
      :page-size="pageInfo.pageSize" :total="tableData.length" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 表格---end -->

    <!-- 编辑弹框---start -->
    <el-dialog title="岗位信息" :visible.sync="dialogFormVisible" width="700px">
      <el-form :label-position="labelPosition"  :label-width="labelWidth" :inline="true" :model="formEdit" :rules="editRules" class="demo-form-inline" >


        <el-form-item label="岗位名称"  prop="jobName">
          <el-input v-model="formEdit.jobName" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="岗位描述" prop="jobInfo">
          <el-input v-model="formEdit.jobInfo" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框---end -->

    <!-- 新增弹框---start -->
    <el-dialog title="新增岗位" :visible.sync="dialogAddVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formAdd" :rules="addRules"
        class="demo-form-inline">
        <el-form-item label="岗位编号" prop="jobNo">
          <el-input v-model="formAdd.jobNo" placeholder="岗位编号"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" prop="jobName">
          <el-input v-model="formAdd.jobName" :required="true" placeholder="岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="岗位描述" prop="jobInfo">
          <el-input v-model="formAdd.jobInfo" placeholder="请输入"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增弹框---end -->
  </div>
</template>

<style lang="scss">
  // 设置输入框的宽度
  .el-form-item__content {
    width: 220px;
  }
</style>

<script>
  export default {
    name: 'tablepage',
    data() {
      return {
        addRules: {
          jobName: {
            required: true, //是否必填
            message: '岗位名不能为空', //规则提示
            trigger: 'blur' //何事件触发
          },
          jobNo:{
            required: false, //是否必填
            type:"number",
            message: '输入数字或为空', //规则提示
            trigger: 'blur' //何事件触发
          }
        },
        searchRules:{
          jobName: {
            required: false, //是否必填
          },
          // jobNo: {
          //   required: false, //是否必填
          //   message: '输入数字或为空', //规则提示
          //   trigger: 'blur', //何事件触发
          //   type:"number"//规定数字类型
          // },
        },
        editRules: {
          jobName: {
            required: true, //是否必填
            message: '岗位名不能为空', //规则提示
            trigger: 'blur' //何事件触发
          },
        },
        pageInfo: {
          pageIndex: 3,
          pageSize: 5,
          pageTotal: 80
        },
        tableData: [],
        formSearch: { //表单对象
          jobNo: '',
          jobName: '',
          jobInfo: '',
          msg: ''
        },
        //数据库的所有岗位
        allJob: [{
          jobNo: "",
          jobName: "",
          jobInfo: ""
        }],
        labelPosition: 'right', //lable对齐方式
        labelWidth: '80px', //lable宽度

        dialogFormVisible: false,
        dialogAddVisible: false,
        formLabelWidth: '120px',
        formAdd: {
          //表单对象
          jobNo: "",
          jobName: "",
          jobInfo: ""
        },
        formEdit: {
          //表单对象
          jobNo: "",
          jobName: "",
          jobInfo: ""
        },
        multipleSelection: [{
          jobNo: "",
          jobName: "",
          jobInfo: ""
        }]
      };
    },
    methods: {
      //rowData带到编辑框
      handleEdit(index, rowData) {

        this.$message({
          message: rowData,
          type: "success"
        });

        this.formEdit.jobName = rowData.jobName;
        this.formEdit.jobInfo = rowData.jobInfo;
        this.formEdit.jobNo = rowData.jobNo;

        this.dialogFormVisible = true;
      },
      updateTable() {
        var all = {
          jobNo: null,
          jobName: null
        };
        axios.post('http://localhost:8080/job/search', all)
          .then(response => {
            // post 成功，response.data 为返回的数据
            this.tableData = response.data.allJob
            console.log(this.allJob)
          })
          .catch(error => {
            // 请求失败
            console.log(error)
          })
          // 每次更新默认为1
        this.pageInfo.pageIndex=1;
      },
      handleDelete(index, rowData) {
        //undo将rowdata带到后端删除
        var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post('http://localhost:8080/job/delete', rowData)
              .then(response => {
                // post 成功，response.data 为返回的数据
                if (response.data.msg == "1") {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.updateTable();
                } else {
                  this.$message({
                    type: 'fail',
                    message: '删除失败!'
                  });
                  console.log(this.allJob)
                }
              })
          })

          .catch(error => {
            // 请求失败
            this.$message({
              type: 'fail',
              message: '删除失败!'
            });
            console.log(error)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

      },
      handleSizeChange(val) {
        this.pageInfo.pageSize = val;
        this.$message({
          message: '第' + this.pageInfo.pageIndex + '页，' + 'size:' + this.pageInfo.pageSize,
          type: "success"
        });
      },
      handleCurrentChange(val) {
        this.pageInfo.pageIndex = val;
        this.$message({
          message: '第' + this.pageInfo.pageIndex + '页，' + 'size:' + this.pageInfo.pageSize,
          type: "success"
        });

      },
      onSubmit() {

        axios.post('http://localhost:8080/job/search', this.formSearch)
          .then(response => {
            // post 成功，response.data 为返回的数据
            this.allJob = response.data.allJob
            this.tableData = this.allJob
            console.log(this.allJob)
          })
          .catch(error => {
            // 请求失败
            console.log(error)
          })
          this.pageInfo.pageIndex=1;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$message({
          message: '选中的项是:' + JSON.stringify(this.multipleSelection),
          type: "success"
        });
      },
      deleteMany() {
        //undo后端带走this.multipleSelection批量删除

        this.$confirm('此操作将永久删除文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post('http://localhost:8080/job/deleteMul', this.multipleSelection)
              .then(response => {
                // post 成功，response.data 为返回的数据
                if (response.data.msg > 0) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!' + response.data.msg + "项目"
                  });
                  this.updateTable();
                } else {
                  this.$message({
                    type: 'fail',
                    message: '删除失败!'
                  });
                }
              })
          })
          .catch(error => {
            // 请求失败
            this.$message({
              type: 'fail',
              message: '删除失败!'
            });
            console.log(error)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      saveEdit() {
        if(!(this.formEdit.jobName.match(/^[ ]*$/))){
        axios.post('http://localhost:8080/job/edit', this.formEdit)
          .then(response => {
            if (response.data.msg == "1") {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.updateTable();
            } else {
              this.$message({
                message: "修改失败",
                type: "fail",
              });
            }
            console.log(response.data)
          })
          .catch(error => {
            this.$message({
              message: '修改失败',
              type: "fail"
            });
            console.log(error)
          })
          }else{
            this.$message({
              message: '修改失败,岗位名不能为空',
              type: "fail"
            });
          }
        this.dialogFormVisible = false
      },
      save() {
        // 数据空校验

        if(!(this.formAdd.jobName.match(/^[ ]*$/))){
        axios.post('http://localhost:8080/job/add', this.formAdd)
          .then(response => {
            if (response.data.msg == "添加成功") {
              this.$message({
                message: response.data.msg,
                type: "success",
              });
              this.updateTable();
            } else {
              this.$message({
                message: response.data.msg,
                type: "fail",
              });
            }
            console.log(response.data)
          })
          .catch(error => {
            this.$message({
              message: '添加失败',
              type: "fail"
            });
            console.log(error)
          })
          }else{
            this.$message({
              message: '添加失败,岗位名不能为空',
              type: "fail"
            });
          }
        this.dialogAddVisible = false;
      }
    }
  };
</script>
