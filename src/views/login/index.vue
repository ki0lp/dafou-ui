<template>
  <n-layout class="login-container">
    <n-layout class="page-container">
      <n-layout-content class="content-container">
        <LoginForm />
      </n-layout-content>
      <n-layout-footer class="footer">
        <Footer />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import Footer from "@/components/footer/index.vue";
import LoginForm from "./components/login-form.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  components: {
    Footer,
    LoginForm,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.login-container {
  width: 100vw;
  height: 100vh;

  .page-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .content-container {
      height: 100%;
      padding-bottom: 159px;
      display: flex;
      justify-content: center;
      align-items: center;

      .n-layout-scroll-container {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
      }
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
<style lang="less">
// 不添加scoped，添加了不生效的样式放在这里
.login-container .page-container .content-container {
  .n-layout-scroll-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
