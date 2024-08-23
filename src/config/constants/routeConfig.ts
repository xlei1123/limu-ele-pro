export default [
  // {
  //   path: 'home',
  //   component: () => import('@/views/home/index.vue'),
  //   meta: { title: '首页' }
  // }, code snippet
  {
    path: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: 'list1',
    meta: { title: '页面-列表-查询', dependencies: ['LimuPagination'] },
    component: () => import('@/views/list1/index.vue')
  },
  {
    path: 'list2',
    meta: { title: '页面-列表-查询-带操作', dependencies: ['LimuPagination'] },
    component: () => import('@/views/list2/index.vue')
  },
  {
    path: 'list3',
    meta: { title: '页面-列表-查询-带批量操作', dependencies: ['LimuPagination'] },
    component: () => import('@/views/list3/index.vue')
  },
  {
    path: 'limu-dashboard',
    meta: { title: '工作台' },
    component: () => import('@/views/limu-dashboard/index.vue')
  },
  {
    path: 'detail1',
    meta: { title: '用户详情' },
    component: () => import('@/views/detail1/index.vue')
  },
  {
    path: 'detail2',
    meta: { title: '审批流详情' },
    component: () => import('@/views/detail2/index.vue')
  },
  {
    path: 'detail3',
    meta: { title: '自定义审批流' },
    component: () => import('@/views/detail3/index.vue')
  },
  {
    path: 'basicDetail',
    meta: { title: '基础详情页' },
    component: () => import('@/views/basicDetail/index.vue')
  },
];
