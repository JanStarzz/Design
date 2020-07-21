<template>
  <div class="container">
    <!-- 查询区----start -->
    <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item label="员工编号" prop="empNo">
        <el-input v-model="formSearch.empNo" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名" prop="empName">
        <el-input v-model="formSearch.empName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="部门名" prop="deptName">
        <el-select v-model="formSearch.deptNo" placeholder="请选择" @click.native="updateDept">
          <el-option v-for="item in allDept" :label="item.deptName" :key="item.deptNo" :value="item.deptNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区----end -->
    <!-- 操作区----start -->
    <el-row class="mgb15">
      <el-button size="small" round type="primary" @click="addUpdate">新增</el-button>
      <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
    </el-row>
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table :data="tableData.slice((pageInfo.pageIndex-1)*pageInfo.pageSize,pageInfo.pageIndex*pageInfo.pageSize)" border stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="empNo" label="员工号" width="180" sortable>
      </el-table-column>
      <el-table-column prop="empName" label="员工姓名" width="180">
      </el-table-column>
      <el-table-column prop="deptName" label="所属部门">
      </el-table-column>
      <el-table-column prop="jobName" label="所属岗位">
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
    <el-dialog title="修改员工" :visible.sync="dialogFormVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formEdit" :rules="editRules" class="demo-form-inline">
        <el-form-item label="员工编号" prop="empNo">
          <el-input v-model.number="formEdit.empNo" placeholder="员工编号"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="empName">
          <el-input v-model="formEdit.empName" placeholder="员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptNo">
          <el-select v-model="formEdit.deptNo" placeholder="请选择">
            <el-option v-for="item in allDept" :label="item.deptName" :key="item.deptNo" :value="item.deptNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属岗位" prop="jobNo">
          <el-select v-model="formEdit.jobNo" placeholder="请选择">
            <el-option v-for="item in allJob" :label="item.jobName" :key="item.jobNo" :value="item.jobNo">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框---end -->

    <!-- 新增弹框---start -->
    <el-dialog title="新增员工" :visible.sync="dialogAddVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formAdd" :rules="addRules" class="demo-form-inline">
        <!-- :rules="rules" -->
        <el-form-item label="员工编号" prop="empNo">
          <el-input v-model.number="formAdd.empNo" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="empName">
          <el-input v-model="formAdd.empName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptName">
          <el-select v-model="formAdd.deptNo" placeholder="请选择">
            <el-option v-for="item in allDept" :label="item.deptName" :key="item.deptNo" :value="item.deptNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属岗位">
          <el-select v-model="formAdd.jobNo" placeholder="请选择">
            <el-option v-for="item in allJob" :label="item.jobName" :key="item.jobNo" :value="item.jobNo">
            </el-option>
          </el-select>
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
          empName: {
            required: true, //是否必填
            message: '员工名不能为空', //规则提示

            trigger: 'blur' //何事件触发
          },
          empNo: {
            required: false, //是否必填
            message: '输入数字或为空', //规则提示
            trigger: 'blur', //何事件触发
            type:"number"//规定数字类型
          },
        },editRules: {
          empName: {
            required: true, //是否必填
            message: '员工名不能为空', //规则提示
            trigger: 'blur' //何事件触发
          },empNo: {
            required: false, //是否必填
            message: '输入数字或为空', //规则提示
            trigger: 'blur', //何事件触发
            type:"number"//规定数字类型
          },
        },
        pageInfo: {
          pageIndex: 3,
          pageSize: 5,
          pageTotal: 80
        },
        tableData: [{
          empNo: "",
          empName: "",
          deptName: '',
          deptNo: '',
          jobNo: '',
          jobName: ''
        }],
        formSearch: { //表单对象
          empNo: '',
          empName: '',
          deptNo: ''
        },
        labelPosition: 'right', //lable对齐方式
        labelWidth: '80px', //lable宽度

        dialogFormVisible: false,
        dialogAddVisible: false,
        formLabelWidth: '120px',
        formAdd: {
          //表单对象
          empName: "",
          empNo: "",
          deptNo: '',
          jobNo: ""
        },
        formEdit: {
          //表单对象
          empName: "",
          empNo: "",
          deptName: "",
          deptNo: '',
          jobNo: '',
          jobName: ""
        },
        allDept: [{
          deptNo: ' ',
          deptName: ' ',
          deptInfo: ''
        }],
        allJob: [{
          jobNo: ' ',
          jobName: ' ',
          jobInfo: ''
        }],
        multipleSelection: [{
          empName: "",
          empNo: "",
          deptNo: '',
          jobNo: ""
        }]
      };
    },
    methods: {
      updateTable() {
        axios.post('http://localhost:8080/emp/getAll')
          .then(response => {
            // post 成功，response.data 为返回的数据
            this.tableData = response.data.allEmp
            this.updateName()
            console.log(this.allJob)
          })
          .catch(error => {
            // 请求失败
            console.log(error)
          })
        // 每次更新默认为1
        this.pageInfo.pageIndex = 1;
      },
      addUpdate() {
       this.dialogAddVisible = true
        this.updateJob()
        this.updateDept()

      },
      handleEdit(index, rowData) {

        var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
        this.$message({
          message: msg,
          type: "success"
        });
        //返回数据但不绑定
        this.formEdit.jobName = rowData.jobName;
        this.formEdit.deptName = rowData.deptName;
        this.formEdit.empName = rowData.empName;
        this.formEdit.empNo = rowData.empNo;
        this.formEdit.jobNo = rowData.jobNo;
        this.formEdit.deptNo = rowData.deptNo;
        this.updateDept()
        this.updateJob()
        this.dialogFormVisible = true;
      },
      handleDelete(index, rowData) {
        var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
        this.$message({
          message: msg,
          type: "success"
        });
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post('http://localhost:8080/emp/delete', rowData)
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
      currentSelDept(selVal) {

      },
      updateJob() {
        var all = {
          jobNo: null,
          jobName: null
        };
        axios.post('http://localhost:8080/job/search', all)
          .then(response => {
            // post 成功，response.data 为返回的数据
            this.allJob = response.data.allJob
            console.log(this.allJob)
          })
          .catch(error => {
            // 请求失败
            console.log(error)
          })

      },
      updateDept() {

        var all = {
          deptNo: null,
          deptName: null
        };
        axios.post('http://localhost:8080/dept/search', all)
          .then(response => {
            // post 成功，response.data 为返回的数据
            this.allDept = response.data.allDept
            console.log(this.allDept)
          })
          .catch(error => {
            // 请求失败
            console.log(error)
          })

      },
      updateName() {
        for (var i = 0; i < this.tableData.length; i++) {
          for (var j = 0; j < this.allDept.length; j++) {
            if (this.tableData[i].deptNo == this.allDept[j].deptNo) {
              this.tableData[i].deptName = this.allDept[j].deptName
            }
          }
          for (var k = 0; k < this.allJob.length; k++) {
            if (this.tableData[i].jobNo == this.allJob[k].jobNo) {
              this.tableData[i].jobName = this.allJob[k].jobName
            }
          }
        }
      },
      onSubmit() {
        this.updateDept()
        this.updateJob()
        axios.post('http://localhost:8080/emp/search', this.formSearch)
          .then(response => {
            // post 成功，response.data 为返回的数据
            this.tableData = response.data.allEmp
            // console.log(this.tableData)
            this.updateName()
          })
          .catch(error => {
            // 请求失败
            console.log(error)
          })
        this.pageInfo.pageIndex = 1;
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
            axios.post('http://localhost:8080/emp/deleteMul', this.multipleSelection)
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
        if (!(this.formEdit.empName.match(/^[ ]*$/))) {
          axios.post('http://localhost:8080/emp/edit', this.formEdit)
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
        } else {
          this.$message({
            message: '修改失败,员工名不能为空',
            type: "fail"
          });
        }
        this.dialogFormVisible = false
      },
      save() {
        let param = Object.assign({}, this.formAdd);
        if (!(this.formAdd.empName.match(/^[ ]*$/))) {
          axios.post('http://localhost:8080/emp/add', this.formAdd)
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
        } else {
          this.$message({
            message: '添加失败,员工名不能为空',
            type: "fail"
          });
        }
        //undo后端保存
        this.dialogAddVisible = false;
      }
    }
  };
</script>
