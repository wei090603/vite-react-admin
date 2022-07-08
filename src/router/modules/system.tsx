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
      key: "system"
    },
    children: [
      {
        path: "/system/notice",
        element: lazyLoad(React.lazy(() => import("@/pages/system/notice"))),
        meta: {
          requiresAuth: true,
          title: "通知公告",
          key: "notice"
        }
      }
    ]
  }
];

export default systemRouter;
