<template>
  <div class="container">
    <!-- 查询区----start -->
    <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch"
             class="demo-form-inline">
      <el-form-item label="项目名称">
        <el-input v-model="formSearch.itemName"></el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select v-model="formSearch.itemType" placeholder="固定项目">
          <el-option label="固定项目" value="1"></el-option>
          <el-option label="计算项目" value="2"></el-option>
          <el-option label="导入项目" value="3"></el-option>
          <el-option label="实发项目" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label=" ">
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
    <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="itemId" label="编号" width="80" sortable>
      </el-table-column>
      <el-table-column prop="itemName" label="项目名称">
      </el-table-column>
      <el-table-column prop="itemType" label="项目类型">
      </el-table-column>
      <el-table-column prop="formula" label="计算公式">
      </el-table-column>
      <el-table-column prop="fluctuat" label="增减项">
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.itemType=='计算项目'" @click="handleEdit1(scope.$index, scope.row, )">编辑
          </el-button>
          <el-button size="mini" v-if="scope.row.itemType=='导入项目'" @click="handleEdit(scope.$index, scope.row, flag=true)">编辑
          </el-button>
          <el-button size="mini" v-if="scope.row.itemType=='固定项目'" @click="handleEdit(scope.$index, scope.row,flag=false)">编辑
          </el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.pageIndex"
                   :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 表格---end -->

    <!-- 编辑弹框 固定项目---start -->
    <el-dialog title="编辑项目" :visible.sync="dialogFormVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formEdit"
               class="demo-form-inline">
        <el-form-item label="项目名称" v-model="formEdit.itemName">
          <el-input></el-input>
        </el-form-item>
        <el-form-item v-show="!isImport" label="部门名称" :data="dName" v-model="formEdit.deptName">
          <el-select>
            <el-option v-for="name in dName" :label="name.value" :value="name.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数值" v-model="formEdit.num">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="增减项" v-model="formEdit.fluctuat">
          <el-select>
            <el-option value="+"></el-option>
            <el-option value="-"></el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 固定项目---end -->

    <!-- 编辑弹框 固定项目---start -->
    <el-dialog title="编辑项目" :visible.sync="dialogFormVisible1" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="caculationItem"
               class="demo-form-inline">
        <el-form-item label="项目名称" v-model="caculationItem.itemName">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="项目类型">
          <el-select v-model="caculationItem.itemName" placeholder="固定项目">
            <el-option label="固定项目" value="1"></el-option>
            <el-option label="导入项目" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作符">
          <el-select v-model="caculationItem.operation" placeholder="+">
            <el-option label="+" value="+"></el-option>
            <el-option label="-" value="-"></el-option>
            <el-option label="*" value="*"></el-option>
            <el-option label="/" value="/"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数值" v-model="formEdit.num">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="增减项" v-model="formEdit.fluctuat">
          <el-select>
            <el-option value="+"></el-option>
            <el-option value="-"></el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 固定项目---end -->

    <!-- 新增弹框---start -->
    <el-dialog title="新增记录" :visible.sync="dialogAddVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formAdd"
               class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formAdd.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formAdd.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="日期"
                          v-model="formAdd.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增记录" :visible.sync="dialogAddVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formAdd"
               class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formAdd.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formAdd.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="日期"
                          v-model="formAdd.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
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
        //表格的数据
        tableData: [{
          itemId: 1,
          itemName: '工作保险',
          itemType: '计算项目',
          formula: '基本工资×2%',
          fluctuat: '减'
        },
          {
            itemId: 2,
            itemName: '基本工资',
            itemType: '固定项目',
            formula: '3000',
            fluctuat: '加'
          },
          {
            itemId: 3,
            itemName: '基本工资',
            itemType: '导入项目',
            formula: '20',
            fluctuat: '加'
          }
        ],
        //后端查出的部门
        dName: [
          {value: '研发部'}
          , {value: '生产部'}
        ],

        pageInfo: {
          pageIndex: 3,
          pageSize: 5,
          pageTotal: 80
        },
        formSearch: {   //表单对象
          user: '',
          region: ''
        },
        labelPosition: 'right', //lable对齐方式
        labelWidth: '80px',  //lable宽度
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
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        isImport: false,
        dialogAddVisible: false,
        formLabelWidth: '120px',
        formAdd: {
          //表单对象
          name: "",
          address: "",
          date: "",
          other: ""
        },
        caculationItem:{
          //动态获取
          itemName: ['工作保险','导入项目'],
          itemType:'',
          operation:'',
          secondOp:''
        },

        formEdit: {
          //表单对象
          deptName: "",
          itemName: "",
          num: 0,
          fluctuat: "+",
        },
        multipleSelection: []
      };
    },
    methods: {
      handleEdit(index, rowData, flag) {

        this.isImport = flag;
        console.log(this.isImport);
        var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
        this.$message({
          message: msg,
          type: "success"
        });
        this.dialogFormVisible = true;
      },

      handleEdit1(index, rowData) {
        var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
        this.$message({
          message: msg,
          type: "success"
        });

        this.formEdit = rowData;
        this.dialogFormVisible1 = true;
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
        var ids = this.multipleSelection.map(item => item.id).join();
        this.$message({
          message: '删除的项是:' + JSON.stringify(this.multipleSelection),
          type: "success"
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
