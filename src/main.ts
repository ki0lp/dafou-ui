import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局样式
import "./styles/tailwind.css";
import "./styles/index.less";

// 接口模拟
import "./mock";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
