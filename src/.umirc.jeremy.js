import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
      {
          path:'/gsk',
          component:'../layouts/workshopLayout',
          routes:[
              {path:'/gsk',redirect:'/gsk/overview'},
              {
                  name:'总览页面',
                  path:'/gsk/overview',
                  component:'./gsk/overview',
              },
              {
                  name:'监控页面',
                  path:'/gsk/monitor',
                  component:'./gsk/monitor',
              }
          ]
      },
      {
          path:'/',
          component:'../layouts/index',
          routes:[
                { path: '/', component: '@/pages/index' },
                { path: '/users', component: '@/pages/gsk/overview' },
          ]
      },
  ],
});
