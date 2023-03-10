import { h, computed } from "vue";
import { useAppStore } from "@/store";
import usePermission from "@/hooks/permission";
// 路由
import { useRoute, useRouter, RouteRecordRaw } from "vue-router";
// 图标
import { NIcon } from "naive-ui";

import appClientMenus from "@/router/app-menus";
import * as $Icons from "@vicons/antd";

export default function useMenuTree() {
  const permission = usePermission();
  const appStore = useAppStore();

  const appRoute = computed(() => {
    if (appStore.menuFromServer) {
      return appStore.appAsyncMenus.map((m) => {
        return {
          ...m,
          key: m?.meta?.key ? m?.meta?.key : "",
          label: m?.meta?.label ? m?.meta?.label : "",
          icon: () =>
            h(NIcon, null, {
              // @ts-ignore
              default: m?.meta?.icon ? () => h($Icons[m.meta.icon]) : null,
            }),
          children:
            m?.children && m?.children.length !== 0
              ? m?.children.map((c) => {
                  return {
                    ...c,
                    key: c?.meta?.key ? c?.meta?.key : "",
                    label: c?.meta?.label ? c?.meta?.label : "",
                  };
                })
              : null,
        };
      });
    }
    return appClientMenus;
  });
  return { appRoute };
}
