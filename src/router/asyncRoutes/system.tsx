import React from "react";
import lazyLoad from "@/router/config/lazyLoad";
import { Layout } from "@/router/constant";
import { RouteObject } from "@/router/interface";

// article 模块
const systemRouter: Array<RouteObject> = [
  {
    element: Layout,
    path: "/system",
    meta: {
      title: "系统管理",
      key: "system",
      sort: 8
    },
    children: [
      {
        path: "/system/advertise",
        element: lazyLoad(React.lazy(() => import("@/pages/system/advertise"))),
        meta: {
          requiresAuth: true,
          title: "广告列表",
          key: "advertise"
        }
      },
      {
        path: "/system/notice",
        element: lazyLoad(React.lazy(() => import("@/pages/system/notice"))),
        meta: {
          requiresAuth: true,
          title: "通知公告",
          key: "notice"
        }
      },
      {
        path: "/system/loginLogger",
        element: lazyLoad(React.lazy(() => import("@/pages/system/loginLogger"))),
        meta: {
          requiresAuth: true,
          title: "登录日志",
          key: "loginLogger"
        }
      }
    ]
  }
];

export default systemRouter;
