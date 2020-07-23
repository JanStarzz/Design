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

  updateImportProject:function (formEdit) {
    console.log(formEdit)
   return Axios.put("http://localhost:8080/importProjects",formEdit)
  }
}
