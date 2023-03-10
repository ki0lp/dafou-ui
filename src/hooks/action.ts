import { ref } from "vue";
import { useAppStore } from "@/store";
import type { MenuOption } from "naive-ui";

const appState = useAppStore();

const actions = ref<MenuOption[]>([
  {
    label: appState.dark ? "浅色" : "深色",
    key: "theme",
    path: "theme",
  },
  {
    label: "English",
    key: "locale",
    path: "locale",
  },
  {
    label: "Github",
    key: "github",
    path: "github",
  },
  {
    label: "2.34.3",
    key: "2.34.3",
    path: "2.34.3",
  },
]);

export default actions;
