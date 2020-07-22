import Axios from "axios";

/**
 * 定义关于部門的接口
 */
export default {

  department:function () {

    return Axios.get("http://localhost:8080/department")
  },

  getBaseItem:function () {

    return Axios.get("http://localhost:8080/baseItem")
  },

  getBaseRecItem:function (condition) {

    return Axios.post("http://localhost:8080/baseRec",condition)
  },

  updateItem:function (formEdit) {
    return Axios.post('http://local:8080/baseForJson', formEdit)
  }

}
