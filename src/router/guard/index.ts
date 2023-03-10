import type { Router } from "vue-router";
import { setRouteEmitter } from "@/utils/route-listener";
import setupPermissionGuard from "./permission";

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to);
  });
}

export default function createRouteGuard(router: Router) {
  // 监听页面跳转
  setupPageGuard(router);
  // 权限校验
  setupPermissionGuard(router);
}
