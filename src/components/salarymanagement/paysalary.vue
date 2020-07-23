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
        <el-input v-model="formSearch.user" placeholder="日
        期"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="onSubmit">计算</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区----end -->
    <!-- 操作区----start -->
    <!-- 操作区----end -->
    <!-- 表格---start -->
    <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="序号" width="50" sortable>
      </el-table-column>
      <el-table-column prop="id1" label="员工编号" width="50" sortable>
      </el-table-column>
      <el-table-column prop="name" label="员工姓名" width="100" sortable>
      </el-table-column>
      <el-table-column prop="npay" label="实发工资" width="100" sortable>
      </el-table-column>
      <el-table-column prop="gpay" label="基本工资" width="100" sortable>
      </el-table-column>
      <el-table-column prop="subsidy" label="采暖补贴" width="100" sortable>
      </el-table-column>
      <el-table-column prop="day" label="事假天数" width="100" sortable>
      </el-table-column>
      <el-table-column prop="deduct" label="事假扣除" width="100" sortable>
      </el-table-column>
      <el-table-column prop="tax" label="个人所得税" width="100" sortable>
      </el-table-column>
      <el-table-column prop="insurance" label="保险" width="100" sortable>
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
        tableData: [
          {
            id: "1",
            id1: "12",
            name: "张三",
            region: "会计",
            npay: "5250",
            gpay: "6000",
            subsidy: "200",
            day: "2",
            deduct: "200",
            tax: "250",
            insurance: "500",
          },
          {
            id: "2",
            id1: "18",
            name: "赵四",
            region: "出纳",
            npay: "5150",
            gpay: "6000",
            subsidy: "200",
            day: "3",
            deduct: "300",
            tax: "250",
            insurance: "500",
          },
          {
            id: "3",
            id1: "14",
            name: "小明",
            region: "项目经理",
            npay: "11200",
            gpay: "12000",
            subsidy: "200",
            day: "0",
            deduct: "0",
            tax: "500",
            insurance: "500",
          },
          {
            id: "4",
            id1: "22",
            name: "小红",
            region: "销售员",
            npay: "7250",
            gpay: "8000",
            subsidy: "200",
            day: "1",
            deduct: "100",
            tax: "350",
            insurance: "500",
          }
        ],
        formSearch: {   //表单对象
          user: '',
          region: ''
        },
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
