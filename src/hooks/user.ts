import { useRouter } from "vue-router";

export default function useUser() {
  const router = useRouter();
  const logout = async (logoutTo?: string) => {
    const currentRoute = router.currentRoute.value;
    // @ts-ignore
    window.$message.success("η»εΊζε");
    router.push({
      name: logoutTo && typeof logoutTo === "string" ? logoutTo : "login",
      query: {
        ...router.currentRoute.value.query,
        redirect: currentRoute.name as string,
      },
    });
  };
  return {
    logout,
  };
}
