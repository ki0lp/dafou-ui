<template>
  <n-space class="space-container" vertical>
    <div class="result-container">
      <n-result
        status="418"
        title="418 我是个杯具"
        description="一切尽在不言中"
      >
        <template #footer>
          <n-button>接受真相就是这么简单</n-button>
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
