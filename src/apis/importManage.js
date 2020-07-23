import Axios from "axios";

/**
 * 定义关于部門的接口
 */
export default {
  getImportItem:function(){
    return Axios.get("http://localhost:8080/importItem")
  },

  getImportProject:function(formSearch) {
    return Axios.post("http://localhost:8080/importProjects",formSearch)
  },

  InsertImportProject:function (formAdd) {
    console.log(formAdd)
   //return Axios.put("http://localhost:8080/importProjects",formAdd)
  }
}
