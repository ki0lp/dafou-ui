<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const gotoPath = route.params.path as string;
    router.replace({ path: gotoPath });
    return {};
  },
});
</script>

<style scoped lang="less"></style>
