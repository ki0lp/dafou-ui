import { toRaw, unref } from "vue";
import { defineStore } from "pinia";
import { MenuState } from "./types";
// 持久数据层
import storage from "@/utils/storage";
// 常量
import constant from "@/utils/constant";
// 路由类型
import { RouteRecordRaw } from "vue-router";
import { getRouters } from "@/api/user";
import router from "@/router";
import type { AppRouteRecordRaw } from "@/router/routes/types";
import { DEFAULT_LAYOUT } from "@/router/routes/constant";
import { constantRoutes } from "@/router/routes/constant";
import { generateDynamicRoutes } from "@/router/routes/generate-routes";

const useMenuStore = defineStore("menu", {
  state: (): MenuState => ({
    isDynamicAddedRoute: false,
    routes: [],
    addRoutes: [],
    navbars: [],
    siders: [],
    actions: [],
  }),

  getters: {
    hasRole(state: MenuState): boolean {
      return state.isDynamicAddedRoute;
    },
  },

  actions: {
    /**
     * 设置动态路由初始化状态
     * @param added 是否已经初始化动态路由
     */
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    /**
     * 设置动态路由
     * @param routers
     */
    setRoutes(routers) {
      this.addRoutes = routers;
      this.routes = constantRoutes.concat(routers);
    },
    /**
     * 设置侧边菜单
     * @param siders
     */
    setSiders(siders) {
      // 设置动态路由
      this.siders = siders;
    },
    /**
     * 解析动态路由
     * @returns 路由列表
     */
    async generateRoutes() {
      let accessedRoutes: RouteRecordRaw[] = [];
      // 动态获取菜单
      try {
        accessedRoutes = await generateDynamicRoutes();
      } catch (error) {
        console.log(error);
      }
      // accessedRoutes = accessedRoutes.filter(routeFilter);
      this.setRoutes(accessedRoutes);
      this.setSiders(accessedRoutes);
      return toRaw(accessedRoutes);
    },
  },
});

export default useMenuStore;
