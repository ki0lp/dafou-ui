import { ref } from "vue";
import { GlobalThemeOverrides } from "naive-ui";

const lightThemeOverrides = ref<GlobalThemeOverrides>({
  Card: {},
});

const darkThemeOverrides = ref<GlobalThemeOverrides>({
  Card: {
    color: "#101015",
  },
});

export { lightThemeOverrides, darkThemeOverrides };
