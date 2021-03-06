import React from "react";
import lazyLoad from "@/router/config/lazyLoad";
import { RouteObject } from "@/router/interface";
import { Layout } from "@/router/constant";
import Login from "@/pages/login";

// 错误页面模块
const platformRouter: Array<RouteObject> = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login",
      hidden: true,
      sort: 100
    },
    children: []
  },
  {
    element: Layout,
    path: "/platform",
    meta: {
      title: "系统路由",
      key: "platform",
      sort: 100,
      hidden: true
    },
    children: [
      {
        path: "/platform/403",
        element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/403"))),
        meta: {
          requiresAuth: true,
          title: "403页面",
          key: "403"
        }
      },
      {
        path: "/platform/404",
        element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/404"))),
        meta: {
          requiresAuth: false,
          title: "404页面",
          key: "404"
        }
      },
      {
        path: "/platform/500",
        element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/500"))),
        meta: {
          requiresAuth: false,
          title: "500页面",
          key: "500"
        }
      }
    ]
  }
];

export default platformRouter;
