import type { MenuOption } from "naive-ui";

const headers: MenuOption[] = [
  {
    name: "Home",
    label: "首页",
    path: "/",
    key: "/",
    meta: {
      icon: "icon-home",
      locale: "menu.home",
    },
  },
  {
    name: "Post",
    label: "文档",
    path: "/article",
    key: "/article",
    meta: {
      icon: "icon-align-right",
      locale: "menu.post",
    },
  },
  {
    name: "About",
    label: "关于",
    path: "/about",
    key: "/about",
    meta: {
      icon: "icon-rotate-right",
      locale: "menu.category",
    },
  },
];

export default headers;
