<template>
    <n-layout class="default-container">
        <NavBar />
        <n-layout position="absolute" style="top: 64px" has-sider>
            <Sidebar />
            <n-layout :native-scrollbar="false">
                <n-spin class="spin-container" :show="false">
                    <PageLayout />
                    <Footer />
                    <n-back-top :right="24" />
                </n-spin>
            </n-layout>
        </n-layout>
    </n-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NLayout, NSpin, NBackTop } from "naive-ui";
import PageLayout from "./page-layout.vue";
// components
import NavBar from '@/components/navbar/index.vue'
import Sidebar from '@/components/sidebar/index.vue'
import Footer from '@/components/footer/index.vue'

export default defineComponent({
    components: {
        PageLayout,
        NavBar,
        Sidebar,
        Footer
    },
    setup(props, context) {
        return {
        };
    },
});
</script>

<style lang="less" scoped>
.default-container {
    width: 100vw;
    height: 100vh;
}
</style>