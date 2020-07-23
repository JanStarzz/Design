<template>
  <div class="container">
    <!-- 查询区----start -->
    <el-form :label-position="labelPosition" :label-width="labelWidth" :model="formSearch" class="form-inline">
      <el-form-item label="部门名">
        <el-select v-model="formSearch.deptName" placeholder="部门名">
          <el-option v-for="dept in deptName" :label="dept" :value="dept"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区----end -->
    <!-- 表格---start -->
    <el-form>
      <el-table :data="tableData" stripe style="width: 1050px">
        <el-table-column prop="deptNo" label="部门编号" width="120" sortable>
        </el-table-column>
        <el-table-column prop="deptName" label="部门名称" width="150" sortable>
        </el-table-column>

        <el-table-column
          v-for="item in baseItem" :label="item"
          width="180">
          <template scope="scope">
            <div>
              <span>{{scope.row.map[item]}}</span>
            </div>
          </template>

        </el-table-column>
        <el-table-column prop="" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="medium" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- 表格---end -->
    <!-- 修改---start -->
    <el-dialog title="修改工资信息" :visible.sync="dialogFormVisible" width="700px">
      <el-form :label-position="labelPosition" :label-width="labelWidth" class="demo-form-inline">
        <el-form-item v-for="(item,index) in baseItem" :label="item">

          <el-input v-model="formEdit.map[item]" width="50" sortable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateItem(formEdit)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改---end -->

  </div>
</template>
<script>
  import apis from "../../apis/apis";

  export default {
    mounted() {

      this.$nextTick(() => {

        this.getDepartment();
        this.getBaseItem();
      })

    },
    data() {

      return {
        editable: [],
        deptName: '',
        baseItem: '',
        tableData: [{
        }],
        formSearch: {   //表单对象
         deptName: '',
        },
        labelPosition: 'right', //lable对齐方式
        labelWidth: '100px',  //lable宽度
        form: {
          order: "",
          num: "",
          name: "",
          salary: "",
          bond: "",
          fixed: ""
        },
        dialogFormVisible: false,
        dialogAddVisible: false,
        formAdd: {
          //表单对象
          order: "",
          num: "",
          name: "",
          salary: "",
          bond: "",
          fixed: "0"
        },
        formEdit: {
          //表单对象

        },
        map: ''
      };
    },
    methods: {
      updateItem() {
        console.log(this.formEdit)
        apis.baseManage.updateItem(this.formEdit);
        this.dialogFormVisible = false;
        this.onSubmit();
      },

      getDepartment() {
        apis.baseManage.department().then((data) => {
          console.log(data.data);
          this.deptName = data.data.data;
        })
      },
      getBaseItem() {
        apis.baseManage.getBaseItem().then((data) => {
        console.log(data.data)
          this.baseItem = data.data.data;
          //console.log(this.baseItem);
        })
      },
      handleEdit(index, rowData) {
        this.formEdit = rowData;
        this.dialogFormVisible = true;
        this.$message({
          message: JSON.stringify(this.formEdit),
          type: "success"
        });

      },
      onSubmit() {
        apis.baseManage.getBaseRecItem(this.formSearch.deptName).then((data) => {
          this.tableData = data.data.data;
          this.formEdit = this.tableData;
          let i = 1;
          for (let v of this.tableData) {
            v.order = i++;
          }
        })

      },
      save() {
        let param = Object.assign({}, this.formAdd);
        this.tableData.push(param);
        this.dialogAddVisible = false;
      }
    }
  };
</script>
