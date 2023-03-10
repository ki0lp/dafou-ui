import Mock from "mockjs";
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from "@/utils/setup-mock";

import { MockParams } from "@/types/mock";
import { isLogin } from "@/utils/auth";

setupMock({
  setup() {
    // 用户信息
    Mock.mock(new RegExp("/api/user/info"), () => {
      if (isLogin()) {
        return successResponseWrap({
          name: "王立群",
          avatar:
            "//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png",
          email: "wangliqun@email.com",
          job: "frontend",
          jobName: "前端艺术家",
          organization: "Frontend",
          organizationName: "前端",
          location: "beijing",
          locationName: "北京",
          introduction: "人潇洒，性温存",
          personalWebsite: "https://www.arco.design",
          phone: "150****0000",
          registrationDate: "2013-05-10 12:10:00",
          accountId: "15012312300",
          certification: 1,
          roles: ["admin"],
        });
      }
      return failResponseWrap(null, "未登录", 50008);
    });

    // 登录
    Mock.mock(new RegExp("/api/user/login"), (params: MockParams) => {
      const { account, password } = JSON.parse(params.body);
      if (!account) {
        return failResponseWrap(null, "用户名不能为空", 50000);
      }
      if (!password) {
        return failResponseWrap(null, "密码不能为空", 50000);
      }
      if (account === "admin" && password === "admin") {
        window.localStorage.setItem("userRole", "admin");
        return successResponseWrap({
          token: "12345",
        });
      }
      if (account === "user" && password === "user") {
        window.localStorage.setItem("userRole", "user");
        return successResponseWrap({
          token: "54321",
        });
      }
      return failResponseWrap(null, "账号或者密码错误", 50000);
    });

    // 登出
    Mock.mock(new RegExp("/api/user/logout"), () => {
      return successResponseWrap(null);
    });

    // 用户的服务端菜单
    Mock.mock(new RegExp("/api/user/menu"), () => {
      const menuList = [
        {
          path: "/dashboard",
          name: "Dashboard",
          component: "Layout",
          meta: {
            label: "仪表盘",
            key: "dashboard",
            requiresAuth: true,
            icon: "DashboardOutlined",
            order: 1,
          },
          children: [
            {
              path: "/workplace",
              name: "Workplace",
              component: "dashboard/workplace/index",
              meta: {
                label: "工作台",
                key: "workplace",
                requiresAuth: true,
              },
            },
            {
              path: "/realtime",
              name: "Realtime",
              component: "dashboard/realtime/index",
              meta: {
                label: "实时监控",
                key: "realtime",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "/system",
          name: "System",
          component: "Layout",
          meta: {
            label: "系统管理",
            key: "system",
            requiresAuth: true,
            icon: "ControlOutlined",
            order: 2,
          },
          children: [
            {
              path: "user",
              name: "User",
              component: "system/user/index",
              meta: {
                label: "用户管理",
                key: "user",
                requiresAuth: true,
              },
            },
            {
              path: "/role",
              name: "Role",
              component: "system/role/index",
              meta: {
                label: "角色管理",
                key: "role",
                requiresAuth: true,
              },
            },
            {
              path: "/menu",
              name: "Menu",
              component: "system/menu/index",
              meta: {
                label: "菜单管理",
                key: "menu",
                requiresAuth: true,
              },
            },
            {
              path: "/dept",
              name: "Dept",
              component: "system/dept/index",
              meta: {
                label: "部门管理",
                key: "dept",
                requiresAuth: true,
              },
            },
            {
              path: "/post",
              name: "Post",
              component: "system/post/index",
              meta: {
                label: "岗位管理",
                key: "post",
                requiresAuth: true,
              },
            },
            {
              path: "/dict",
              name: "Dict",
              component: "system/dict/index",
              meta: {
                label: "字典管理",
                key: "dict",
                requiresAuth: true,
              },
            },
            {
              path: "/config",
              name: "Config",
              component: "system/config/index",
              meta: {
                label: "参数设置",
                key: "config",
                requiresAuth: true,
              },
            },
            {
              path: "/notice",
              name: "Notice",
              component: "system/notice/index",
              meta: {
                label: "通知公告",
                key: "notice",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "/log",
          name: "Log",
          component: "Layout",
          meta: {
            label: "日志管理",
            key: "log",
            requiresAuth: true,
            icon: "ProjectOutlined",
            order: 3,
          },
          children: [
            {
              path: "/operlog",
              name: "Operlog",
              component: "log/operlog/index",
              meta: {
                label: "操作日志",
                key: "operlog",
                requiresAuth: true,
              },
            },
            {
              path: "/logininfor",
              name: "Logininfor",
              component: "log/logininfor/index",
              meta: {
                label: "登录日志",
                key: "logininfor",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "/monitor",
          name: "Monitor",
          component: "Layout",
          meta: {
            label: "系统监控",
            key: "monitor",
            requiresAuth: true,
            icon: "FundProjectionScreenOutlined",
            order: 4,
          },
          children: [
            {
              path: "/online",
              name: "Online",
              component: "monitor/online/index",
              meta: {
                label: "在线用户",
                key: "online",
                requiresAuth: true,
              },
            },
            {
              path: "/job",
              name: "Job",
              component: "monitor/job/index",
              meta: {
                label: "定时任务",
                key: "job",
                requiresAuth: true,
              },
            },
            {
              path: "/druid",
              name: "Druid",
              meta: {
                label: "数据监控",
                key: "druid",
                requiresAuth: true,
              },
            },
            {
              path: "/server",
              name: "Server",
              component: "monitor/server/index",
              meta: {
                label: "服务监控",
                key: "server",
                requiresAuth: true,
              },
            },
            {
              path: "/cache",
              name: "Cache",
              component: "monitor/cache/index",
              meta: {
                label: "缓存监控",
                key: "cache",
                requiresAuth: true,
              },
            },
            {
              path: "/cacheList",
              name: "CacheList",
              component: "monitor/cacheList/index",
              meta: {
                label: "缓存列表",
                key: "cacheList",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "/tool",
          name: "Tool",
          component: "Layout",
          meta: {
            label: "系统工具",
            key: "tool",
            requiresAuth: true,
            icon: "CodeOutlined",
            order: 5,
          },
          children: [
            {
              path: "/build",
              name: "Build",
              component: "tool/build/index",
              meta: {
                label: "表单构建",
                key: "build",
                requiresAuth: true,
              },
            },
            {
              path: "/gen",
              name: "Gen",
              component: "tool/gen/index",
              meta: {
                label: "代码生成",
                key: "gen",
                requiresAuth: true,
              },
            },
            {
              path: "/swagger",
              name: "Swagger",
              component: "tool/swagger/index",
              meta: {
                label: "系统接口",
                key: "swagger",
                requiresAuth: true,
              },
            },
          ],
        },
      ];

      return successResponseWrap(menuList);
    });
  },
});
