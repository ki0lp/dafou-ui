import { createPinia } from "pinia";
import useAppStore from "./modules/app";
import useUserStore from "./modules/user";
import useMenuStore from "./modules/menu";

const pinia = createPinia();

export { useAppStore, useUserStore, useMenuStore };
export default pinia;
