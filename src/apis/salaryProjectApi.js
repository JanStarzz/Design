import Axios from "axios";


/**
 * 定义关于工资项目的接口
 */
export default {


  salaryProject: function(salaryProject){
    let param = {
      itemName:salaryProject.itemName,
      itemType:salaryProject.itemType
    };
    return Axios.post('http://localhost:8080/SalaryProject',param);
  }

}
