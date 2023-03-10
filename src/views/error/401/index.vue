<template>
  <n-space class="space-container" vertical>
    <div class="result-container">
      <n-result
        status="401"
        title="401 认证失败"
        description="你不必得到所有人的认可"
      >
        <template #footer>
          <n-button>重新登录</n-button>
        </template>
      </n-result>
    </div>
  </n-space>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NotFound",
  setup() {
    const router = useRouter();
    const back = () => {
      router.push({
        path: "/",
      });
    };
    return {
      back,
    };
  },
});
</script>

<style scoped lang="less">
.space-container {
  height: calc(100vh - 240px);

  .result-container {
    width: 100%;
    min-height: calc(100vh - 240px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
