<template>
    <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
            <!-- 没有缓存的页面 -->
            <component :is="Component" v-if="route.meta.ignoreCache" :key="route.fullPath" />
            <!-- 有缓存的页面 -->
            <keep-alive v-else>
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </transition>
    </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {}
    }
})
</script>

<style scoped lang="less"></style>
  