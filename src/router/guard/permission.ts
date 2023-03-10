import { DEFAULT_LAYOUT } from "./../routes/constant";
import type { Router, LocationQueryRaw } from "vue-router";
import NProgress from "nprogress"; // progress bar

import { useMenuStore, useUserStore } from "@/store";
import { isLogin } from "@/utils/auth";
import { WHITE_LIST, LOGIN_PATH } from "../constants";
import type { RouteRecordRaw } from "vue-router";

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    const menuStore = useMenuStore();

    // Whitelist can be directly entered
    if (WHITE_LIST.includes(to.path)) {
      next();
      return;
    }

    // 没有登录
    if (!isLogin()) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      // redirect login page
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // 判断是否已经初始化过动态路由，如果初始化过，直接跳转
    if (menuStore.isDynamicAddedRoute) {
      next();
      return;
    }

    await userStore.info();
    const routes = await menuStore.generateRoutes();
    console.log(routes);

    // 动态添加可访问路由表
    routes.forEach((item) => {
      router.addRoute(item as unknown as RouteRecordRaw);
    });

    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect };
    menuStore.setDynamicAddedRoute(true);
    next(nextData);
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
