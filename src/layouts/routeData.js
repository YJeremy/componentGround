export const menuData = [
    { route: '/', name: '首页' },
    { route: '/jeremy', name: 'Jeremy\'s' },
    { route: '/lucy', name: 'Lucy\'s' },
    { route: '/mary', name: 'React图片插入' },
    { route: '/lifetime', name: '组件生命周期与props传值' },
    { route: '/antduse', name: '带参数用箭头 X UiModal' },
    { route: '/container', name: '容器写法 X UiSpin' },
    { route: '/parentref', name: 'react父子组件传值' },
    { route: '/tablestudy', name: 'UiTable_搜索表格' },
    { route: '/table4screens', name: 'UiTable_响应式表格' },
    { route: '/Responsegrid', name: 'UiGrid_响应式栅格' },
    { route: '/websockettest', name: 'Websocket测试_JSX写法' },
    { route: '/tableoverview', name: '解引&switch' },
    { route: '/gsk/overview', name: '车间管理--总览页面' },
    { route: '/gsk/monitor', name: '车间管理--监控页面' },
    { route: '/table4excel', name: 'excel导出表格' },
    { route: '/refstudy', name: 'Ref学习' },
    { route: '/threestudy', name: 'ThreeJS学习' },
    { route: '/threestudyplus', name: 'ThreeJS学习+' },
    { route: '/quanxian', name: '权限显示学习' },
    { route: '/peopleconfig', name: '显示信息配置',authority:['admin'] },
    { route: '/user/login', name: '登录' },
    { route: '/reacthooks', name: 'hooks学习' },
    { route: '/reacttest', name: 'React单元测试组件' },
    { route: '/mweb', name: 'mweb学习' },
    { route: '/antdform', name: 'AntdForm学习' },

]

export const menuWorkshop = [
    { route: '/', name: '首页' },
    { route: '/gsk/overview', name: '车间管理--总览页面' },
    { route: '/gsk/monitor', name: '车间管理--监控页面' },
    { route: '/gsk/program', name: '程序页面' },
    { route:'/appmweb',name:'手机端'},

]

export const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};
