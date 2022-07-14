import React from "react";
import lazyLoad from "@/router/config/lazyLoad";
import { Layout } from "@/router/constant";
import { RouteObject } from "@/router/interface";

// 数据大屏模块
const userRouter: Array<RouteObject> = [
  {
    element: Layout,
    children: [
      {
        path: "/user",
        element: lazyLoad(React.lazy(() => import("@/pages/user"))),
        meta: {
          requiresAuth: true,
          title: "用户管理",
          key: "user"
        }
      }
    ]
  }
];

export default userRouter;
