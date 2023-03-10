<template>
  <n-layout-sider
    class="sider-container"
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :native-scrollbar="false"
  >
    <n-menu
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :options="siders"
      @update:value="handleMenuUpdateValue"
    />
  </n-layout-sider>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, unref } from "vue";
import { useMessage } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import { useMenuStore } from "@/store";
import { generatorMenu } from "@/utils/menu";

export default defineComponent({
  components: {},
  mounted() {
    this.updateMenu();
  },
  setup() {
    // 当前路由
    const currentRoute = useRoute();
    const collapsed = ref<boolean>(false);
    const message = useMessage();
    const router = useRouter();
    const menuStore = useMenuStore();
    const siders = ref<any[]>([]);
    const selectedKeys = ref<string>(currentRoute.name as string);

    // 获取当前打开的子菜单
    const matched = currentRoute.matched;

    const getOpenKeys =
      matched && matched.length ? matched.map((item) => item.name) : [];

    const state = reactive({
      openKeys: getOpenKeys,
    });

    const updateMenu = () => {
      siders.value = generatorMenu(menuStore.getSiders);
      updateSelectedKeys();
    };

    const updateSelectedKeys = () => {
      const matched = currentRoute.matched;
      state.openKeys = matched.map((item) => item.name);
      const activeMenu: string =
        (currentRoute.meta?.activeMenu as string) || "";
      selectedKeys.value = activeMenu
        ? (activeMenu as string)
        : (currentRoute.name as string);
    };

    const handleMenuUpdateValue = (key: string, item: MenuOption) => {
      router.push({
        // @ts-ignore
        name: item?.name,
      });
    };

    return {
      collapsed,
      message,
      siders,
      updateMenu,
      handleMenuUpdateValue,
    };
  },
});
</script>

<style lang="less" scoped>
.layout-sider-container {
  :deep .n-menu-item {
    padding: 0 6px;
  }
}

@media screen and (max-width: 1024px) {
  .sider-container {
    display: none;
  }
}
</style>
