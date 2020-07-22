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
  },

  getProjectName:function () {
    return Axios.get('http://localhost:8080/SalaryProject')
  },

  newSalaryProject:function (salaryProject) {
    let param = {
      itemName:salaryProject.itemName,
      itemType: salaryProject.itemType,
      first:salaryProject.first,
      itemFormula:salaryProject.itemFormula,
      fluctuat:salaryProject.fluctuat
    };
    return Axios.put('http://localhost:8080/SalaryProject',param)

  },
  editSalaryProject:function (salaryProject) {
    let param = {
      id:salaryProject.id,
      fluctuat: salaryProject.fluctuat,
      itemName: salaryProject.itemName,
      itemType: salaryProject.itemType,
      itemFormula: salaryProject.itemFormula
    };
    return Axios.post('http://localhost:8080/SalaryProjects',param)
  },
  deleteProject:function (salaryProject) {
    let param = {
      id:salaryProject.id,
      itemType: salaryProject.itemType,
    };
    return Axios.post('http://localhost:8080/SalaryProjectss',param)
  }
}
