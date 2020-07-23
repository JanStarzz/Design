import Axios from "axios";

/**
 * 定义关于部門的接口
 */
export default {

  getPayment:function (field) {
    return  Axios.post("http://localhost:8080/payment",field)
  }
}
