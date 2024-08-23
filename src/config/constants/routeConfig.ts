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
    meta: { title: '列表-查询' },
    component: () => import('@/views/list1/index.vue')
  },
  {
    path: 'list2',
    meta: { title: '列表-查询-带查看编辑按钮' },
    component: () => import('@/views/list2/index.vue')
  },
  {
    path: 'list3',
    meta: { title: '列表-查询-带批量查看编辑按钮' },
    component: () => import('@/views/list3/index.vue')
  },
  {
    path: 'detail1',
    meta: { title: '详情查看1' },
    component: () => import('@/views/detail1/index.vue')
  },
  {
    path: 'detail2',
    meta: { title: '详情查看2' },
    component: () => import('@/views/detail2/index.vue')
  },
  
];
