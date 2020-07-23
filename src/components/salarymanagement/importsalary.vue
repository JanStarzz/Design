<template>
  <div class="container">
    <!-- 查询区----start -->
    <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch"
             class="demo-form-inline">
      <el-form-item label="部门名">
        <el-select v-model="formSearch.deptName" placeholder="部门名">
          <el-option v-for="dept in deptName":value="dept"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工编号">
        <el-input v-model="formSearch.empNo" placeholder="员工编号"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="getImportProject()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区----end -->
    <!-- 操作区----start -->
    <el-row class="mgb15">
      <el-button size="small" round type="primary" @click="dialogAddVisible = true">新增</el-button>
    </el-row>
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="order" label="序号" width="50" sortable>
      </el-table-column>
      <el-table-column prop="empNo" label="员工编号" width="50" sortable>
      </el-table-column>
      <el-table-column prop="empName" label="员工姓名" width="100" sortable>
      </el-table-column>
      <el-table-column prop="deptName" label="部门名" width="100" sortable>
      </el-table-column>
      <el-table-column label="年月" width="100" sortable>
        <template scope="scope">
          <div>
            <span>{{scope.row.year+"-"+scope.row.month}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="item in importItem":label="item" width="100" sortable>

          <template scope="scope">
            <div>
              <span>{{scope.row.map[item]}}</span>
            </div>
          </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.pageIndex"
                   :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 表格---end -->

    <!-- 编辑弹框---start -->
    <el-dialog title="员工信息" :visible.sync="dialogFormVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formEdit"
               class="demo-form-inline">
        <el-form-item label="序号">
          <el-input v-model="formEdit.id" placeholder="序号"></el-input>
        </el-form-item>
        <el-form-item label="员工编号">
          <el-input v-model="formEdit.id1" placeholder="员工编号"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="formEdit.name" placeholder="员工姓名"></el-input>
        </el-form-item>
          <el-form-item v-for="(item,index) in importItem" :label="item">
            <el-input v-model="formAdd.map[item]" width="50" sortable></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框---end -->

    <!-- 新增弹框---start -->
    <el-dialog title="新增记录" :visible.sync="dialogAddVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formAdd"
               class="demo-form-inline">
        <el-form-item label="员工编号">
          <el-input v-model="formAdd.empNo" placeholder="员工编号"></el-input>
        </el-form-item>
          <el-form-item v-for="item in importItem" :label="item">
            <el-input v-model="formAdd.map[item]" width="50" ></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertImportProject">确 定</el-button>
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
  import apis from "../../apis/apis";

  export default {
    mounted() {
      this.$nextTick(() => {
        this.getDepartment();

      })
    },
    data() {
      return {
        pageInfo: {
          pageIndex: 3,
          pageSize: 5,
          pageTotal: 80
        },
        tableData:{
        } ,

        formSearch: {
        },
        labelPosition: 'right', //lable对齐方式
        labelWidth: '100px',  //lable宽度
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
          empNo:'',
          map:''
        },
        forUpdate:{

        },
        formEdit: {
        },
        multipleSelection: [],
        importItem:[],
        deptName:[]
      };
    },
    methods: {
      insertImportProject(){
        apis.importManage.InsertImportProject(this.formAdd);
        this.dialogAddVisible = false
      },

      getDepartment() {
        apis.baseManage.department().then((data) => {
          this.deptName = data.data.data;
        })
      },
      getImportItem(){
        apis.importManage.getImportItem().then((data)=>{
          this.importItem = data.data.data;
        })
      },

      getImportProject(){
        console.log("+++++++++++++++");
        this.getImportItem();
        apis.importManage.getImportProject(this.formSearch).then((data)=>{
          this.tableData = data.data.data;
          this.formEdit = this.tableData;
          this.formAdd = this.tableData;
          console.log(this.tableData);
          let i = 1;
          for (let v of this.tableData) {
            v.order = i++;
          }
        })
      },
      handleEdit(index, rowData) {
        var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
        console.log(this.formEdit)
        this.$message({
          message: msg,
          type: "success"
        });
        this.dialogFormVisible = true;
      },
      handleDelete(index, rowData) {
        var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        console.log('submit!');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$message({
          message: '选中的项是:' + JSON.stringify(this.multipleSelection),
          type: "success"
        });
      },
      deleteMany() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.tableData.length; i++) {
            const element = this.tableData[i];
            element.id = i
          }
          if (this.multipleSelection.length == 0)
            this.$message.error('请先至少选择一项')
          this.multipleSelection.forEach(element => {
            this.tableData.forEach((e, i) => {
              if (element.id == e.id) {
                this.tableData.splice(i, 1)
              }
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      save() {
        let param = Object.assign({}, this.formAdd);
        this.tableData.push(param);
        this.dialogAddVisible = false;
      }
    }
  };
</script>
