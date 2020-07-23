<template>
  <div class="container">
    <!-- 查询区----start -->
    <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch"
             class="demo-form-inline">
      <el-form-item label="部门名">
        <el-select v-model="formSearch.deptName" placeholder="部门名">
          <el-option v-for="dept in deptName" :value="dept"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-input v-model="formSearch.date" placeholder="日期"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="getPayment">计算</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区----end -->
    <!-- 操作区----start -->
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="empNo" label="员工编号" width="50" sortable>
      </el-table-column>
      <el-table-column prop="empName" label="员工姓名" width="100" sortable>
      </el-table-column>

      <el-table-column v-for="item in tableItem":label="item" width="100" sortable>

        <template scope="scope">
          <div>
            <span>{{scope.row.map[item]}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="baseSalary" label="应发工资" width="100" sortable>
      </el-table-column>
      <el-table-column prop="reallySalary" label="实发工资" width="100" sortable>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.pageIndex"
                   :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 表格---end -->
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
    name: 'tablepage',
    data() {
      return {
        deptName:'',
        pageInfo: {
          pageIndex: 3,
          pageSize: 5,
          pageTotal: 80
        },
        tableData: '',
        formSearch: {   //表单对象
          user: '',
          region: ''
        },
        tableItem:'',
        labelPosition: 'right', //lable对齐方式
        labelWidth: '80px',  //lable宽度
        dialogFormVisible: false,
        dialogAddVisible: false,
        formLabelWidth: '120px',
      };
    },
    methods: {
      getDepartment() {
        apis.baseManage.department().then((data) => {
          console.log("----------")
          this.deptName = data.data.data;
        })
      },
      getPayment(){
        apis.payApi.getPayment(this.formSearch).then((data)=>{
          if (data.data.meta.message="ok"){
            this.tableData = data.data.data;
            let map = this.tableData[0].map
            let v = new Array();
            for(let key in map){
               v.push(key)
            }
            this.tableItem = v;
          }else {
            alert(data.data.meta.message)
          }

          })
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
    }
  };
</script>
