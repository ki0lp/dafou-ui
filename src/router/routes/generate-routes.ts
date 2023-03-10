import { h, computed } from "vue";
import { RouteRecordRaw } from "vue-router";
import { DEFAULT_LAYOUT, PAGE_LAYOUT } from "@/router/routes/constant";
import type { AppRouteRecordRaw } from "@/router/routes/types";
import { getRouters } from "@/api/user";
// 图标
import * as $Icons from "@vicons/antd";
import { renderIcon } from "@/utils/icon";

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
// @ts-ignore
export const routeGenerator = (routerMap, parent?): any[] => {
  // @ts-ignore
  return routerMap.map((item) => {
    console.log(item);
    const currentRouter: any = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${(parent && parent.path) || ""}/${item.path}`,
      // 路由名称，建议唯一
      name: item.name || "",
      // 该路由对应页面的 组件
      component: item.component,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        ...item.meta,
        // @ts-ignore
        icon: item.meta.icon ? renderIcon($Icons[item.meta.icon]) : null,
        permissions: item.meta.permissions || null,
      },
    };

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace("//", "/");

    // 如果icon是null，删除icon
    if (!currentRouter.meta.icon) {
      delete currentRouter.meta.icon;
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect);
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      //如果未定义 redirect 默认第一个子路由为 redirect
      !item.redirect &&
        (currentRouter.redirect = `${item.path}/${item.children[0].path}`);
      // Recursion
      currentRouter.children = routeGenerator(item.children, currentRouter);
    }
    return currentRouter;
  });
};

/**
 * 动态生成菜单
 *
 * @returns {Promise<Router>}
 */
export const generateDynamicRoutes = (): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve, reject) => {
    getRouters()
      .then((result) => {
        const routeList = routeGenerator(result.data);
        asyncImportRoute(routeList);
        resolve(routeList);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * 查找views中对应的组件文件
 */
let viewsModules: Record<string, () => Promise<Recordable>>;
export const asyncImportRoute = (
  routes: AppRouteRecordRaw[] | undefined
): void => {
  viewsModules = viewsModules || import.meta.glob("@/views/**/*.{vue,tsx}");
  if (!routes) {
    return;
  }
  routes.forEach((item) => {
    const { component, name } = item;
    const { children } = item;
    if (component) {
      if ((component as string) == "Layout") {
        item.component = DEFAULT_LAYOUT;
      } else {
        item.component = dynamicImport(viewsModules, component as string);
      }
    } else if (name) {
      item.component = PAGE_LAYOUT;
    }
    children && asyncImportRoute(children);
  });
};

/**
 * 动态导入
 */
export const dynamicImport = (
  viewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) => {
  const keys = Object.keys(viewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace("/src/views/", "");
    const lastIndex = k.lastIndexOf(".");
    k = k.substring(0, lastIndex);
    return k === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return viewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn(
      "Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure"
    );
    return;
  }
};
