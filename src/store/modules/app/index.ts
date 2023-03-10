import { defineStore } from "pinia";
import { AppState } from "./types";
// 持久数据层
import storage from "@/utils/storage";
// 常量
import constant from "@/utils/constant";
// 默认样式配置
import defaultSettings from "@/config/setting.json";
// 路由类型
import type { RouteRecordNormalized } from "vue-router";
import { getRouters } from "@/api/user";
import { createDiscreteApi } from "naive-ui";

const useAppStore = defineStore("app", {
  state: (): AppState => ({
    ...defaultSettings,
  }),

  getters: {
    dark(): boolean {
      return !!this.theme;
    },
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },
    async setDarkTheme(dark: boolean) {
      this.theme = dark;
      storage.save(constant.theme, dark);
    },
    async fetchServerMenuConfig() {
      const { message } = createDiscreteApi(["message"]);
      try {
        message.info("loading");
        const { data } = await getRouters();
        this.serverMenu = data;
        message.success("success");
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message.error("error");
      }
    },
  },
});

export default useAppStore;
