<template>
  <div class="container">
    <!-- 查询区----start -->
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidth"
      :inline="true"
      :model="formSearch"
      class="demo-form-inline"
    >
      <el-form-item label="项目名称">
        <el-input v-model="formSearch.itemName"></el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select v-model="formSearch.itemType">
          <el-option label="固定项目" value="固定项目"></el-option>
          <el-option label="计算项目" value="计算项目"></el-option>
          <el-option label="导入项目" value="导入项目"></el-option>
          <el-option label="实发项目" value="实发项目"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(formSearch)">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区----end -->
    <!-- 操作区----start -->
    <el-row class="mgb15">
      <el-button size="small" round type="primary" @click="newImport = true">新增导入项目</el-button>
      <el-button size="small" round type="primary" @click="newBase = true">新增固定项目</el-button>
      <el-button size="small" round type="primary" @click="newCacula">新增计算项目</el-button>
      <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
    </el-row>
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="id" label="编号" width="80" sortable></el-table-column>
      <el-table-column prop="itemName" label="项目名称"></el-table-column>
      <el-table-column prop="itemType" label="项目类型"></el-table-column>
      <el-table-column prop="itemFormula" label="计算公式"></el-table-column>
      <el-table-column prop="fluctuat" label="增减项"></el-table-column>

      <el-table-column label="操作" fixed="right" min-width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.itemType=='计算项目'"
            @click="handleEdit1(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            v-if="scope.row.itemType=='导入项目'"
            @click="handleEdit(scope.$index, scope.row, flag=true)"
          >编辑</el-button>
          <el-button
            size="mini"
            v-if="scope.row.itemType=='固定项目'"
            @click="handleEdit(scope.$index, scope.row,flag=false)"
          >编辑</el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,sizes,prev, pager, next,jumper"
      :current-page="pageInfo.pageIndex"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.pageTotal"
      :page-sizes="[5, 10, 20, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <!-- 表格---end -->

    <!-- 编辑弹框 固定项目 导入项目---start -->
    <el-dialog title="编辑项目" :visible.sync="dialogFormVisible" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="baseItem"
        class="demo-form-inline"
      >
        <el-form-item label="项目名称">
          <el-input  v-model="baseItem.itemName"></el-input>
        </el-form-item>

        <el-form-item label="增减项">
          <el-select placeholder="请选择增减项"  v-model="baseItem.fluctuat">
            <el-option label="增" value="增"></el-option>
            <el-option label="减" value="减"></el-option>
            <el-option label="不影响" value="不影响"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 固定项目---end -->

    <!-- 编辑弹框 计算项目---start -->
    <el-dialog title="编辑项目" :visible.sync="dialogFormVisible1" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="calculationItem"
        class="demo-form-inline"
      >
        <el-form-item label="项目名称" v-model="calculationItem.itemName">
          <el-input></el-input>
        </el-form-item>


        <el-form-item label="公式" v-model="calculationItem.itemFormula">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="增减项">
          <el-select v-model="calculationItem.fluctuat">
            <el-option label="+" value="+"></el-option>
            <el-option label="-" value="-"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 计算项目---end -->

    <!-- 新增弹框 导入项目---start -->
    <el-dialog title="新增导入项目" :visible.sync="newImport" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formAdd"
        class="demo-form-inline"
      >
        <el-form-item label="项目类型">
          <el-input
            placeholder="导入项目"
            v-model="formAdd.itemType"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="formAdd.itemName"></el-input>
        </el-form-item>

        <el-form-item label="计算公式" >
          <el-input v-model="formAdd.itemFormula" placeholder="不是计算项目不要输入操作符"></el-input>
        </el-form-item>
        <el-form-item label="增减项">
          <el-select v-model="formAdd.fluctuat">
            <el-option label="增" value="增"></el-option>
            <el-option label="减" value="减"></el-option>
            <el-option label="不影响" value="不影响"></el-option>

          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="newImport = false">取 消</el-button>
        <el-button type="primary" @click="save2">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增固定项目 -->
    <el-dialog title="新增固定项目" :visible.sync="newBase" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="baseAdd"
        class="demo-form-inline"
      >

        <el-form-item label="项目类型">
          <el-input
            placeholder="固定项目"
            v-model="baseAdd.itemType"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="baseAdd.itemName"></el-input>
        </el-form-item>
        <el-form-item label="增减项">
          <el-select v-model="baseAdd.fluctuat">
            <el-option label="增" value="增"></el-option>
            <el-option label="减" value="减"></el-option>
            <el-option label="不影响" value="不影响"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newBase = false">取 消</el-button>
        <el-button type="primary" @click="save1">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增计算项目 -->
    <el-dialog title="新增计算项目" :visible.sync="newcalculation" width="700px">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="calculationAdd"
        class="demo-form-inline"
      >
        <el-form-item label="项目类型">
          <el-input
            placeholder="计算项目"
            v-model="calculationAdd.itemType"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="calculationAdd.itemName"></el-input>
        </el-form-item>
        <el-form-item label="项目类型">
          <el-select v-model="calculationAdd.first">
            <el-option v-for="name in ItemName":label="name" :value="name" ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公式">
          <el-input v-model="calculationAdd.itemFormula"></el-input>
        </el-form-item>
        <el-form-item label="增减项">
          <el-select v-model="calculationAdd.fluctuat">
            <el-option label="增" value="增"></el-option>
            <el-option label="减" value="减"></el-option>
            <el-option label="不影响" value="不影响"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newcalculation = false">取 消</el-button>
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
import apis from "../../apis/salaryProjectApi";

export default {
  name: "tablepage",
  data() {
    return {

      calculationAdd:{
        itemType:'计算项目',
        itemName:'',
      },
      //表格的数据
      tableData: '',
      //后端查出的部门
      dName: [{ value: "研发部" }, { value: "生产部" }],

      pageInfo: {
        pageIndex: 3,
        pageSize: 5,
        pageTotal: 80
      },
      formSearch: {
        //表单对象
        itemName:'',
        itemType:'',
      },
      baseAdd: {
        itemType:'固定项目',
        itemName:'',
        fluctuat:''
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      isImport: false,
      dialogAddVisible: false,
      newImport: false,
      newBase: false,
      newcalculation: false,
      formLabelWidth: "120px",
      formAdd: {
        //表单对象
        itemName:'',
        itemType:'导入项目',
        itemFormula:'',
        fluctuat:''
      },
      calculationItem: {
        //动态获取
        id:'',
        itemType:'计算项目',
        itemName: '',
        fluctuat:'',
        itemFormula: "",
      },

      baseItem: {
        //固定项目，导入项目
        id:'',
        itemType:"",
        deptName: "",
        itemName: "",
        fluctuat: ""
      },
      ItemName:'',
      multipleSelection: [],
      tmpData:''
    };
  },
  methods: {
    newCacula(){
      apis.getProjectName().then((data)=>{
        console.log(data.data)
        this.ItemName = data.data.data
      })
      this.newcalculation=true;
    },

    handleEdit(index, rowData) {
      let msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
      this.$message({
        message: msg,
        type: "success"
      });
      this.baseItem = rowData;
      console.log(this.baseItem)
      this.dialogFormVisible = true;
    },

    handleEdit1(index, rowData) {
      let msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
      this.$message({
        message: msg,
        type: "success"
      });

      this.calculationItem = rowData;
      this.dialogFormVisible1 = true;
    },
    handleDelete(index, rowData) {
      let msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.deleteProject(rowData).then((data)=>{
            console.log(data.data)
            if (data.data.meta.message!=null){
              this.$confirm(data.data.meta.message, "提示", {
                confirmButtonText: "确定",
                type: "warning"
              })
            }else {
              this.onSubmit();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.$message({
        message:
          "第" +
          this.pageInfo.pageIndex +
          "页，" +
          "size:" +
          this.pageInfo.pageSize,
        type: "success"
      });
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.$message({
        message:
          "第" +
          this.pageInfo.pageIndex +
          "页，" +
          "size:" +
          this.pageInfo.pageSize,
        type: "success"
      });
    },
    /**
     * 查询
     */
    onSubmit(formSearch) {
      console.log(formSearch)
      apis.salaryProject(formSearch).then(data=>{
        let item = data.data.data;
        this.tableData = item

      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$message({
        message: "选中的项是:" + JSON.stringify(this.multipleSelection),
        type: "success"
      });
    },
    deleteMany() {
      var ids = this.multipleSelection.map(item => item.id).join();
      this.$message({
        message: "删除的项是:" + JSON.stringify(this.multipleSelection),
        type: "success"
      });
    },
    edit(){
      apis.editSalaryProject(this.baseItem).then((data)=>{
        this.baseItem='',
          this.dialogFormVisible=false
      })
    },
    edit2(){
      apis.editSalaryProject(this.calculationItem).then((data)=>{
        this.calculationItem='',
          this.dialogFormVisible2=false
      })
    },
    /**
     * 新增导入项目
     */
    save() {

      apis.newSalaryProject(this.calculationAdd).then((data)=>{
        this.calculationAdd = ''
        this.newcalculation=false
      })
    },
    save1() {

      apis.newSalaryProject(this.baseAdd).then((data)=>{
        this.baseAdd = ''
        this.newBase=false
      })
    },
    save2() {
      apis.newSalaryProject(this.formAdd).then((data)=>{
        this.formAdd = ''
        this.newImport=false
      })
    }
  }
};
</script>
