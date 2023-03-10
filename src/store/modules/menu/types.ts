import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

export interface MenuState {
  isDynamicAddedRoute: boolean;
  routes: RouteLocationNormalized | RouteRecordRaw[];
  addRoutes: RouteLocationNormalized | RouteRecordRaw[];
  navbars: RouteLocationNormalized | RouteRecordRaw[];
  siders: RouteLocationNormalized | RouteRecordRaw[];
  actions: RouteLocationNormalized | RouteRecordRaw[];
}
