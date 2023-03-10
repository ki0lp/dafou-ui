import request from "@/utils/request";
import type { RouteRecordNormalized } from "vue-router";
import { UserState, LoginData } from "@/store/modules/user/types";

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return request<LoginRes>({
    url: "/api/user/login",
    headers: {
      isToken: false,
    },
    method: "post",
    data: data,
  });
}

export function logout() {
  return request<LoginRes>({
    url: "/api/user/logout",
    method: "get",
  });
}

export function getUserInfo() {
  return request<UserState>({
    url: "/api/user/info",
    method: "post",
  });
}

export function getRouters() {
  return request<RouteRecordNormalized[]>({
    url: "/api/user/menu",
    method: "post",
  });
}
