import Axios from "axios";

/**
 * 系统认证接口
 */
export default {
    /**
     * 系统登陆
     */
    loginIn: function ({ username, password }) {
        let param = {
            username: username,
            password: password
        };
        return Axios.post('http://localhost:8080/login', param);

    },
    /**
     * 退出登陆
     */
    loginOut: function () {
        return Axios.post('/api/shiro-api/loginout');
    },
    /**
     * 记录登陆日志
     */
    // loginLog: function ({ip,city,type}) {
    //     let param={
    //         ip:ip,
    //         city:city,
    //         type:type
    //     };
    //     return Axios.post('/api/loginlog-api/save', param);
    // },
}
