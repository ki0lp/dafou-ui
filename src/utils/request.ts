// 1. 引入axios依赖包
import axios from "axios";
import { isLogin, getToken } from "@/utils/auth";

// 2. axios创建对象
const request = axios.create({
  baseURL: "https://api.shop.eduwork.cn/", //管理后台要使用的接口的基地址
  timeout: 20000, //超时时间
});

// 3. ，请求拦截器，请求发送出去之前触发的
request.interceptors.request.use(
  (config) => {
    //config 接口请求的配置信息
    // 是否需要设置token
    const isToken = (config.headers || {}).isToken === false;
    config.headers = config.headers || {};
    if (isLogin() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  (error) => {
    //报错的是定义前置拦截器时候抛出一个报错的信息
    return Promise.reject(error);
  }
);

// 4. 接收响应的数据操作以及报错的全局处理方式
request.interceptors.response.use(
  (response) => {
    //响应回来的数据操作
    return response.data;
  },
  (error) => {
    //报错的是时候抛出一个报错的信息
    return Promise.reject(error);
  }
);

// 5. 抛出对象的信息
export default request;
