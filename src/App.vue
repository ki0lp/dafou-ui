<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
    :inline-theme-disabled="true"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-message-provider>
      <n-loading-bar-provider>
        <router-view />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
// theme
import { darkTheme, GlobalTheme } from "naive-ui";
import { lightThemeOverrides, darkThemeOverrides } from "./theme";
// locale & dateLocale
import { zhCN, dateZhCN } from "naive-ui";
// 持久层
import { useAppStore } from "./store";

export default defineComponent({
  setup() {
    const appStore = useAppStore();

    const theme = computed<GlobalTheme | null>(() => {
      return appStore.dark ? darkTheme : null;
    });

    return {
      theme,
      lightThemeOverrides,
      darkThemeOverrides,
      zhCN,
      dateZhCN,
    };
  },
});
</script>

<style scoped lang="less"></style>
