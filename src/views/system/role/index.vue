<template>
  <div class="about-container">
    <n-space class="space-container" vertical> role </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const handleGoPost = () => {
      router.push({
        path: "/article/post",
      });
    };
    return {
      handleGoPost,
    };
  },
});
</script>

<style lang="less" scoped>
.about-container {
  min-height: calc(100vh - 225px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  .space-container {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep .n-result {
      .n-result-header {
        .n-result-header__title {
          margin-bottom: 24px;
        }
      }
    }

    .icon-container {
      img {
        max-width: 360px;
        border-radius: 5px;
      }
    }
  }
}
</style>
