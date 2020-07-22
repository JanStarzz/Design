<template>
  <div class="container">
    <!-- 查询区----start -->
    <el-form :label-position="labelPosition" :label-width="labelWidth" :model="formSearch" class="form-inline">
      <el-form-item label="部门名" @click="getDepartment">
        <el-select v-model="formSearch.department" placeholder="部门名">
          <el-option v-for="dept in department" :label="dept" :value="dept"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工编号">
        <el-input v-model="formSearch.empNo" placeholder="员工编号"></el-input>
      </el-form-item>
      <el-form-item label="工资区间">
        <el-input v-model="formSearch.lowSalary" placeholder="请输入数字"></el-input>
        <el-input v-model="formSearch.highSalary" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区----end -->
    <!-- 表格---start -->
    <el-form>
    <el-table :data="tableData" stripe style="width: 1050px">
      <el-table-column prop="order" label="序号" width="80" sortable>
      </el-table-column>
      <el-table-column prop="empNo" label="员工编号" width="120" sortable>
      </el-table-column>
      <el-table-column prop="empName" label="员工姓名" width="150" sortable>
      </el-table-column>
      <el-table-column prop="deptName" label="所属部门" width="150" sortable>
      </el-table-column>
<!--      <el-table-column prop="empName" v-for="item in baseItem" :label="item" width="150" sortable>-->
<!--      </el-table-column>-->
      <el-table-column
        v-for="item in baseItem" :label="item"
        width="180">

        <template scope="scope">

          <div>
            <span >{{scope.row.map[item]}}</span>

          </div>
<!--          <el-input v-model="scope.row.map[item]" v-if="scope.row.seen"-->
<!--                    @blur="loseFcous(scope.$index, scope.row)"  > </el-input>-->

<!--          <span style="margin-left: 10px" v-else >{{ scope.row.map[item] }}</span>-->
        </template>
<!--        <template slot-scope="scope">-->
<!--          <el-popover trigger="hover" placement="top">-->
<!--&lt;!&ndash;            <el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-input v-model="scope.row.map[item] " >&ndash;&gt;-->
<!--&lt;!&ndash;              </el-input>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--              <el-input :placeholder="scope.row.map[item]">-->
<!--              </el-input>-->
<!--          </el-popover>-->
<!--        </template>-->
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
      <el-form :label-position="labelPosition" :label-width="labelWidth"  class="demo-form-inline">
        <el-form-item v-for="item in baseItem":label="item">
<!--          万恶的绑定-->
          <!--          万恶的绑定-->

          <!--          万恶的绑定-->

          <!--          万恶的绑定-->

          <el-input v-model="formEdit.map" width="50" sortable></el-input>
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
        editable:[],
        department: '',
        baseItem: '',
        tableData: '',
        formSearch: {   //表单对象
          department: '',
          empNo: '',
          lowSalary: '',
          highSalary: ''
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
          order: "",
          num: "",
          name: "",
          salary: "",
          bond: "",
          fixed: ""
        },
        map:''
      };
    },
    methods: {
      updateItem(){
        apis.baseManage.updateItem();
        this.dialogFormVisible = false;
      },

      getDepartment() {
        apis.baseManage.department().then((data) => {
          console.log(data.data);
          this.department = data.data.data;
        })
      },
      getBaseItem() {
        apis.baseManage.getBaseItem().then((data) => {

          this.baseItem = data.data.data;
          console.log(this.baseItem);
        })
      },
      handleEdit(index, rowData) {
        this.formEdit = rowData;
        this.dialogFormVisible = true;
        this.$message({
          message: "修改成功！",
          type: "success"
        });

      },
      onSubmit() {
        apis.baseManage.getBaseRecItem(this.formSearch).then((data) => {
          this.tableData = data.data.data;
          console.log(this.tableData[1])
          let i = 1;
          for (let v of this.tableData)
          {
            v.order = i++;
          }
          // console.log(this.map)
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
