import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import routeConfig from '@/config/constants/routeConfig';
export const Layout = () => import('@/layout/index.vue');
// 静态路由
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [...routeConfig]
  }
];

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
