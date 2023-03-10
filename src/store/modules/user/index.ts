import { defineStore } from "pinia";
import { LoginData, UserState } from "./types";
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  getRouters,
} from "@/api/user";
import { setToken, clearToken } from "@/utils/auth";
import router from "@/router";
import type { AppRouteRecordRaw } from "@/router/routes/types";
import { DEFAULT_LAYOUT } from "@/router/routes/constant";

const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    roles: [],
  }),

  getters: {
    hasRole(state: UserState): boolean {
      return state.roles.length > 0;
    },
  },

  actions: {
    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      this.setInfo(res.data);
    },

    // Logout
    async logout() {
      try {
        await userLogout();
      } catch (err) {
        clearToken();
        throw err;
      }
    },
  },
});

export default useUserStore;
