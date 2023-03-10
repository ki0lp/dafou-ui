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
      :options="appRoute"
      @update:value="handleMenuUpdateValue"
    />
  </n-layout-sider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { useRouter } from "vue-router";
import useMenuTree from "@/hooks/menu-tree";

export default defineComponent({
  components: {},
  mounted() {},
  setup() {
    const collapsed = ref<boolean>(false);
    const message = useMessage();
    const { appRoute } = useMenuTree();
    const router = useRouter();

    const handleMenuUpdateValue = (key: string, item: MenuOption) => {
      router.push({
        // @ts-ignore
        name: item?.name,
      });
    };

    return {
      collapsed,
      message,
      appRoute,
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
