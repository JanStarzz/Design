<template>
    <div class="container">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :model="formSearch" class="form-inline">
            <el-form-item label="部门名">
                <el-select v-model="formSearch.department" placeholder="部门名">
                    <el-option label="所" value="1"></el-option>
                    <el-option label="有" value="2"></el-option>
                    <el-option label="部" value="3"></el-option>
                    <el-option label="门" value="4"></el-option>
                    <el-option label="名" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="员工编号" >
                <el-input v-model="formSearch.order" placeholder="员工编号"></el-input>
            </el-form-item>
            <el-form-item label="工资区间" >
                <el-input v-model="formSearch.salaryl" placeholder="请输入数字"></el-input>
                <el-input v-model="formSearch.salaryh" placeholder="请输入数字"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="onSubmit" >查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->

            <el-button plain type="primary" @click="dialogAddVisible = true">批量录入</el-button>
      <!-- 操作区----end -->
      <!-- 表格---start -->
      <el-table :data="tableData" stripe style="width: 1050px" >
          <el-table-column prop="order" label="序号"width="80" sortable>
          </el-table-column>
          <el-table-column prop="num" label="员工编号" width="120" sortable>
          </el-table-column>
          <el-table-column prop="name" label="员工姓名" width="150" sortable>
          </el-table-column>
          </el-table-column>
          <el-table-column prop="salary" label="基本工资" width="150" sortable>
          </el-table-column>
          </el-table-column>
          <el-table-column prop="bond" label="采暖补贴"  width="150"sortable>
          </el-table-column>
          </el-table-column>
          <el-table-column prop="fixed" label="固定项目" width="200" sortable>
          </el-table-column>
          </el-table-column>
          <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                  <el-button size="medium" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              </template>
          </el-table-column>
      </el-table>
      <!-- 表格---end -->
        <!-- 批量录入---start -->
        <el-dialog title="新增记录" :visible.sync="dialogAddVisible" width="600px">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :model="formAdd" class="demo-form-inline">
                <el-form-item label="序号">
                    <el-input v-model="formAdd.order" placeholder="序号" width="50"></el-input>
                </el-form-item>
                <el-form-item label="员工编号">
                    <el-input v-model="formAdd.num" placeholder="员工编号"></el-input>
                </el-form-item>
                <el-form-item label="员工姓名">
                    <el-input v-model="formAdd.name" placeholder="员工姓名"></el-input>
                </el-form-item>
                <el-form-item label="基本工资">
                    <el-input v-model="formAdd.salary" placeholder="基本工资"></el-input>
                </el-form-item>
                <el-form-item label="应暖补贴">
                    <el-input v-model="formAdd.bond" placeholder="应暖补贴"></el-input>
                </el-form-item>
                <el-form-item label="固定项目">
                    <el-input v-model="formAdd.fixed" placeholder="固定项目"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 批量录入---end -->
        <!-- 修改---start -->
        <el-dialog title="修改工资信息" :visible.sync="dialogFormVisible" width="700px">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :model="formEdit" class="demo-form-inline">
                <el-form-item label="序号">
                    <el-input v-model="formEdit.order" placeholder="序号" width="50" sortable ></el-input>
                </el-form-item>
                <el-form-item label="员工编号">
                    <el-input v-model="formEdit.name" placeholder="员工编号"></el-input>
                </el-form-item>
                <el-form-item label="员工姓名">
                    <el-input v-model="formEdit.name" placeholder="员工姓名"></el-input>
                </el-form-item>
                <el-form-item label="基本工资">
                    <el-input v-model="formEdit.salary" placeholder="基本工资"></el-input>
                </el-form-item>
                <el-form-item label="应暖补贴">
                    <el-input v-model="formEdit.bond" placeholder="应暖补贴"></el-input>
                </el-form-item>
                <el-form-item label="固定项目">
                    <el-input v-model="formEdit.fixed" placeholder="固定项目"></el-input>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改---end -->

    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {   order:"1",
                    num: "077",
                    name: "管谟业",
                    salary: "1000",
                    bond:"45",
                    fixed:"1234"
                },
                {
                    order:"2",
                    num: "076",
                    name: "狗带",
                    salary: "666",
                    bond:"76",
                    fixed:"567"
                },
                {
                     order:"3",
                     num: "102",
                     name: "杰伦",
                     salary: "999",
                     bond:"43",
                     fixed:"8765"
                },
                {
                     order:"4",
                     num: "88",
                     name: "基努",
                     salary: "777",
                     bond:"14",
                     fixed:"2345"
                }
            ],
            formSearch: {   //表单对象
                department: '',
                order: '',
                salaryl:'',
                salaryh:''
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
        };
    },
    methods: {
        handleEdit(index, rowData) {
          this.formEdit=rowData;
          this.dialogFormVisible = true;
            this.$message({
                message: "修改成功！",
                type: "success"
            });

        },
        onSubmit() {
            console.log('submit!');
        },
        save() {
            let param = Object.assign({}, this.formAdd);
            this.tableData.push(param);
            this.dialogAddVisible = false;
        }
    }
};
</script>
