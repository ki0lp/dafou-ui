import type { RouteRecordRaw } from "vue-router";
import { REDIRECT_ROUTE_NAME } from "@/router/constants";

export const DEFAULT_LAYOUT = () => import("@/layout/default-layout.vue");
export const PAGE_LAYOUT = () => import("@/layout/page-layout.vue");

// 公共路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/redirect",
    name: "redirectWrapper",
    component: DEFAULT_LAYOUT,
    meta: {
      requiresAuth: true,
      hideInMenu: true,
    },
    children: [
      {
        path: "/redirect/:path",
        name: REDIRECT_ROUTE_NAME,
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/401",
    component: () => import("@/views/error/401/index.vue"),
    meta: {
      requiresAuth: false,
      hideInMenu: true,
    },
  },
  {
    path: "/403",
    component: () => import("@/views/error/403/index.vue"),
    meta: {
      requiresAuth: false,
      hideInMenu: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/error/404/index.vue"),
    meta: {
      requiresAuth: false,
      hideInMenu: true,
    },
  },
  {
    path: "/418",
    component: () => import("@/views/error/418/index.vue"),
    meta: {
      requiresAuth: false,
      hideInMenu: true,
    },
  },
  {
    path: "/418",
    component: () => import("@/views/error/418/index.vue"),
    meta: {
      requiresAuth: false,
      hideInMenu: true,
    },
  },
  {
    path: "/500",
    component: () => import("@/views/error/500/index.vue"),
    meta: {
      requiresAuth: false,
      hideInMenu: true,
    },
  },
];
