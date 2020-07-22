
import adminApi from './adminApi';
import shiroApi from './shiroApi';
import mayiApi from './mayiApi';
import msgApi from './msgApi';
import salaryProjectApi from "./salaryProjectApi";
import baseManage from "./baseManage";
/**
 * 接口汇总
 */
export default {
    /**用户,角色,组织等管理接口 */
    adminApi: adminApi,
    /**认证接口 */
    shiroApi: shiroApi,
    /**蚂蚁种树接口 */
    mayiApi:mayiApi,
    /**消息接口 */
    msgApi:msgApi,

    // 工资项目接口
    salaryProjectApi:salaryProjectApi,
    // 部門相關接口
    baseManage:baseManage
}
