<template>
  <n-layout-header class="navbar-container" bordered>
    <div class="n-text logo-container" @click="handleLogoClick">
      <router-link to="/"><img :src="iconImage" /></router-link>
      <span class="logo-content">Dafou CR</span>
    </div>
    <div class="menu-container">
      <n-menu
        class="menu-action"
        mode="horizontal"
        :options="navbars"
        @update:value="handleMenuUpdateValue"
      />
      <n-auto-complete
        class="menu-search"
        v-model:value="searchValue"
        :input-props="{ autocomplete: 'disabled' }"
        :options="searchOptions"
        :on-select="handleSearchSelected"
        placeholder="全局搜索"
        :clear-after-select="true"
      />
    </div>
    <div class="right-container">
      <n-space class="right-action">
        <n-button
          size="small"
          quaternary
          v-for="(action, key) in actions"
          :key="key"
          @click="handleRightActionClick(action)"
        >
          {{ action.label }}
        </n-button>
      </n-space>
      <div class="dropdown-action">
        <n-icon size="20" @click="handleShowDrawer" class="dropdown-icon">
          <icon-menu />
        </n-icon>
      </div>
    </div>
    <n-drawer v-model:show="active" placement="left">
      <n-drawer-content title="Dafou CR">
        <n-scrollbar class="dropdown-menu-action-container">
          <n-menu
            class="dropdown-menu-action"
            :options="appRoute"
            @update:value="handlePopoverMenuUpdateValue"
          />
        </n-scrollbar>
      </n-drawer-content>
    </n-drawer>
  </n-layout-header>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from "vue";
import useUser from "@/hooks/user";
import { useRouter } from "vue-router";
import headers from "@/hooks/headers";
import actions from "@/hooks/action";
import { MenuOption, useMessage } from "naive-ui";
import iconImage from "@/assets/logo.png";
import { useAppStore } from "@/store";
import useMenuTree from "@/hooks/menu-tree";
import { IosMenu as IconMenu } from "@vicons/ionicons4";

export default defineComponent({
  name: "Navbar",
  components: {
    IconMenu,
  },
  setup() {
    // 路由
    const router = useRouter();
    // 消息弹窗
    const message = useMessage();
    // 菜单列表
    const navbars = ref<MenuOption[]>([...headers]);
    const { appRoute } = useMenuTree();

    // 退出事件
    const { logout } = useUser();

    const handleLogout = async () => {
      await logout();
      // 切换到登录页面
      router.push({ path: "/" });
    };

    // 点击菜单事件
    const handleMenuUpdateValue = (key: string, item: MenuOption) => {};

    const handleRightActionClick = (action: any) => {};

    const handleLogoClick = () => {
      router.push({
        path: "/",
      });
    };

    const handlePopoverMenuUpdateValue = (key: string, item: MenuOption) => {};

    const searchValue = ref("");
    const searchOptions = computed(() => {});

    const handleAvatarClick = () => {
      message.info("个人中心还没有做");
    };

    const handleSearchSelected = (value: string) => {};

    const active = ref(false);
    const handleShowDrawer = () => {
      active.value = true;
    };

    return {
      iconImage,
      message,
      navbars,
      appRoute,
      actions,
      handleLogout,
      handleMenuUpdateValue,
      handleRightActionClick,
      handleLogoClick,
      handlePopoverMenuUpdateValue,
      searchValue,
      searchOptions,
      handleAvatarClick,
      handleSearchSelected,
      active,
      handleShowDrawer,
    };
  },
});
</script>

<style lang="less" scoped>
.navbar-container {
  display: grid;
  grid-template-columns: 240px 1fr auto;
  align-items: center;
  height: 64px;
  padding: 0 24px;

  .logo-container {
    display: flex;
    font-size: 18px;
    align-items: center;
    cursor: pointer;

    a {
      display: inline-flex;

      img {
        width: 32px;
        height: 32px;
        margin-right: 16px;
      }
    }
  }

  .menu-container {
    display: flex;
    align-items: center;

    .menu-search {
      max-width: 216px;
    }
  }

  .right-container {
    display: flex;
    align-items: center;

    .right-action {
      display: flex;
      align-items: center;

      .name-action-span {
        display: inline-block;
        vertical-align: middle;
        padding: 3px;
      }

      .logout-action-span {
        display: inline-block;
        padding: 2px;
        vertical-align: middle;
        margin-left: 3px;
        cursor: pointer;
        margin-right: calc((var(--n-height) - 10px) / -2);
      }

      .logout-action-span:hover,
      .logout-action-span:active {
        background-color: var(--n-close-color-hover);
        border-radius: 50%;
      }
    }

    .dropdown-action {
      display: none;
      align-items: center;
      margin-left: 16px;
      padding: 0 !important;
    }
  }
}

/* ipad pro */
@media screen and (max-width: 1024px) {
  // 顶部nav header
  .navbar-container {
    grid-template-columns: auto 1fr auto;
    padding: 0 16px;

    .logo-container {
      .logo-content {
        display: none;
      }
    }

    .menu-container {
      .menu-action {
        display: none;
      }

      .menu-search {
        max-width: inherit;
      }
    }

    .right-container {
      .right-action {
        display: none !important;
      }

      .dropdown-action {
        display: flex;
        margin-left: 16px;
      }
    }
  }

  // 侧边栏
  .sider-container {
    display: none;
  }
}

/* ipad */
@media screen and (max-width: 768px) {
}

/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
}

/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
}

/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
}

/* iphone5 */
@media screen and (max-width: 320px) {
}
</style>

<style lang="less">
.n-drawer .n-drawer-content .n-drawer-body-content-wrapper {
  padding: 0;
}
</style>
