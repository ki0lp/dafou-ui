import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

export interface MenuState {
  isDynamicAddedRoute: boolean;
  routes: RouteRecordRaw[];
  addRoutes: RouteRecordRaw[];
  navbars: RouteRecordRaw[];
  siders: RouteRecordRaw[];
  actions: RouteRecordRaw[];
}
