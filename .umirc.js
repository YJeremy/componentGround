import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },



    routes: [
         {
            path: '/gsk',
            component: '@/layouts/workshopLayout',
            routes: [
                { path: '/gsk', redirect: '/gsk/overview' },
                {
                    name: '总览页面',
                    path: '/gsk/overview',
                    component: '@/pages/gsk/overview',
                },
                {
                    name: '监控页面',
                    path: '/gsk/monitor',
                    component: '@/pages/gsk/monitor',
                },
            ]
        },
        {// 注意，需要文件夹下的路径,即在path 下级的子路径
            path: '/appmweb',
            component: '@/layouts/mwebLayout',
            routes: [
                { path: '/appmweb', redirect: '/appmweb/mweb' },
                {
                    name: '手机端',
                    path: '/appmweb/mweb',
                    component: '@/pages/appmweb/index',
                },
            ]
        },
         {
            path: '/',
            component: '../layouts/index',
            routes: [
                { path: '/', name: '登录', component:'@/pages/user/login' },
                { path: '/index', component: '@/pages/index' },
                { path: '/mary', component: '@/pages/mary' },
                { path: '/lucy', component: '@/pages/lucy' },
                { path: '/lifetime', component: '@/pages/lifetime' },
                { path: '/users3', component: '@/pages/gsk/overview' },
                { path: '/tablestudy', component: '@/pages/tablestudy' },
                { path: '/table4screens', component: '@/pages/table4screens' },
                { path: '/websockettest', name: 'Websocket测试_JSX写法', component: '@/pages/websockettest' },
                { path: '/tableoverview', name: 'Table整体数据数组解引', component: '@/pages/tableoverview' },

                { path: '/table4excel', name: 'excel导出表格', component: '@/pages/table4excel' },
                { path: '/refstudy', name: 'Ref学习', component: '@/pages/RefStudy' },
                { path: '/threestudy', name: 'ThreeJS学习', component: '@/pages/threestudy' },
                { path: '/threestudyplus', name: 'ThreeJS学习+',component:'@/pages/threestudyplus' },
                { path: '/quanxian', name: '权限显示学习', component:'@/pages/quanxian' },
                { path: '/peopleconfig', name: '人员配置信息', component:'@/pages/peopleconfig' },
                //{ path: '/user/login', name: '登录', component:'@/pages/user/login' },
                { path: '/reacthooks', name: 'hooks学习', component:'@/pages/ReactHooks' },
                { path: '/reacttest', name: 'react单元测试组件', component:'@/pages/ReactTest' },
                { path: '/antdform', name: 'AntdForm学习', component:'@/pages/antdForm' },
            ]
        },
    ],
});
