<template>
  <div class="container">
    <!-- 查询区----start -->
    <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item label="员工编号">
        <el-input v-model="formSearch.empNo" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input v-model="formSearch.empName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="部门名">
        <el-select v-model="formSearch.deptName" placeholder="请选择">
          <el-option v-for="item in allDept" :label="item.deptName" :key="item.deptNo" :value="item.deptName">
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
      <el-button size="small" round type="primary" @click="dialogAddVisible = true">新增</el-button>
      <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
    </el-row>
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
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
      :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 表格---end -->

    <!-- 编辑弹框---start -->
    <el-dialog title="修改员工" :visible.sync="dialogFormVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formEdit" class="demo-form-inline">
        <el-form-item label="员工编号">
          <el-input v-model="formEdit.empNo" placeholder="员工编号"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="formEdit.empName" placeholder="员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="formEdit.deptName" placeholder="请选择">
            <el-option v-for="item in allDept" :label="item.deptName" :key="item.deptNo" :value="item.deptName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select v-model="formEdit.jobName" placeholder="请选择">
          <el-option v-for="item in allJob" :label="item.jobName" :key="item.jobNo" :value="item.jobName">
           </el-option>
           </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框---end -->

    <!-- 新增弹框---start -->
    <el-dialog title="新增员工" :visible.sync="dialogAddVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formAdd" class="demo-form-inline"
        :rules="rules">
        <el-form-item label="员工编号" :required="!dlgoptionprojectDisabled">
          <el-input v-model="formAdd.empNo" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" :required="!dlgoptionprojectDisabled">
          <el-input v-model="formAdd.empName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" :required="!dlgoptionprojectDisabled">
          <el-select v-model="formAdd.deptName" placeholder="请选择">
            <el-option v-for="item in allDept" :label="item.deptName" :key="item.deptNo" :value="item.deptName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属岗位" :required="!dlgoptionprojectDisabled">
          <el-select v-model="formAdd.jobName" placeholder="请选择">
          <el-option v-for="item in allJob" :label="item.jobName" :key="item.jobNo" :value="item.jobName">
           </el-option>
           </el-select>
        </el-form-item>
        <!-- <el-form-item label="审批人">
                    <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
                </el-form-item> -->
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
        pageInfo: {
          pageIndex: 3,
          pageSize: 5,
          pageTotal: 80
        },
        tableData: [{
            empNo: "1",
            empName: "2016-05-02",
            deptName: "李紫婷",
            jobName: "上海市普陀区金沙江路 1518 弄"
          },
          {
           empNo: "2",
           empName: "2016-05-02",
           deptName: "李紫婷",
           jobName: " 1518 弄"
          }
        ],
        formSearch: { //表单对象
          empNo: '',
          empName: '',
          deptName: ''
        },
        labelPosition: 'right', //lable对齐方式
        labelWidth: '80px', //lable宽度
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogFormVisible: false,
        dialogAddVisible: false,
        formLabelWidth: '120px',
        formAdd: {
          //表单对象
          empName: "",
          empNo: "",
          deptName: "",
          jobName: ""
        },
        formEdit: {
          //表单对象
          empName: "",
          empNo: "",
          deptName: "",
          jobName: ""
        },
        allDept: [{
          deptNo: 1,
          deptName: '部门一'
        }],
        allJob: [{
          jobNo: 1,
          jobName: '岗位一'
        }],
        multipleSelection: []
      };
    },
    methods: {
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
        this.dialogFormVisible = true;
      },
      handleDelete(index, rowData) {
        var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //undo后端删除
          this.tableData.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!' + msg
          });
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
        alert(this.formSearch.deptName+this.formSearch.empNo+this.formSearch.empName);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$message({
          message: '选中的项是:' + JSON.stringify(this.multipleSelection),
          type: "success"
        });
      },
      deleteMany() {
        //undo后端删除
        var ids = this.multipleSelection.map(item => item.id).join();
        this.$message({
          message: '删除的项是:' + JSON.stringify(this.multipleSelection),
          type: "success"
        });
      },
      save() {
        let param = Object.assign({}, this.formAdd);
        this.tableData.push(param);
        //undo后端保存
        this.dialogAddVisible = false;
      }
    }
  };
</script>
