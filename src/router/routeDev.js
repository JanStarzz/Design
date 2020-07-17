
/**
 * 这里配置开发环境写死的路由和菜单，方便开发
 */

//静态路由
var routeDevList = [
    {
        path: '/dept',
        component: resolve => require(['../components/empbase/dept.vue'], resolve),
        meta: {
            title: '部门管理'
        }
    },
    {
        path: '/job',
        component: resolve => require(['../components/empbase/job.vue'], resolve),
        meta:{
            title:'岗位管理'
        }
    },
   {
       path: '/empinfo',
       component: resolve => require(['../components/empbase/empinfo.vue'], resolve),
       meta: {
           title: '员工信息管理'
       }
   },
   {
       path: '/salaryproject',
       component: resolve => require(['../components/salarymanagement/salaryproject.vue'], resolve),
       meta: {
           title: '工资项目管理'
       }
   },
   
   {
       path: '/fixedsalary',
       component: resolve => require(['../components/salarymanagement/fixedsalary.vue'], resolve),
       meta: {
           title: '固定工资管理'
       }
   },
   {
       path: '/importsalary',
       component: resolve => require(['../components/salarymanagement/importsalary.vue'], resolve),
       meta: {
           title: '导入项目数据录入'
       }
   },
   {
       path: '/paysalary',
       component: resolve => require(['../components/salarymanagement/paysalary.vue'], resolve),
       meta: {
           title: '工资结算'
       }
   },

];
//静态菜单
var menuDevList = [
    {
        icon: 'el-icon-date',
        index: Math.random() + '',
        title: '基本信息管理',
        subs: [
            {
                index: 'dept',
                title: '部门管理'
            },
			{
			    index: 'job',
			    title: '岗位管理'
			},
			{
			    index: 'empinfo',
			    title: '员工基本信息'
			},
        ]
    },
    {
        icon: 'el-icon-date',
        index: Math.random() + '',
        title: '工资管理',
        subs: [
            {
                index: 'salaryproject',
                title: '工资项目管理'
            },
			{
			    index: 'fixedsalary',
			    title: '固定工资管理'
			},
			{
			    index: 'importsalary',
			    title: '导入项目数据录入'
			},
			{
			    index: 'paysalary',
			    title: '工资结算'
			},
        ]
    }
]


var routeDev = {
    ROUTE_DEV: true,//是否写入静态路由（开关）
    routeDevList: routeDevList,
    MENU_DEV: true,//是否写入静态菜单（开关）
    menuDevList: menuDevList,
}
export default routeDev;