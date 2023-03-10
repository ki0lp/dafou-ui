import { createRouter, createWebHistory } from "vue-router";
// 加载进度条
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";

// 引入路由守卫、监听
import createRouteGuard from "./guard";
// 引入动态路由
import { constantRoutes } from "./routes/constant";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
