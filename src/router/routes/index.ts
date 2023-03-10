import type { RouteRecordNormalized } from "vue-router";

const modules = import.meta.glob("./modules/*.ts", { eager: true });

// 通过动态导入方式读取modules目录下所有的路由配置
function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);
