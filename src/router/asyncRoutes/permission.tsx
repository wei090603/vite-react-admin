import React from "react";
import lazyLoad from "@/router/config/lazyLoad";
import { Layout } from "@/router/constant";
import { RouteObject } from "@/router/interface";

// permission 模块
const permissionRouter: Array<RouteObject> = [
  {
    element: Layout,
    path: "/permission",
    meta: {
      title: "权限管理",
      key: "permission",
      sort: 7
    },
    children: [
      {
        path: "/permission/resource",
        element: lazyLoad(React.lazy(() => import("@/pages/permission/resource"))),
        meta: {
          requiresAuth: true,
          title: "资源列表",
          key: "resource"
        }
      },
      {
        path: "/permission/role",
        element: lazyLoad(React.lazy(() => import("@/pages/permission/role"))),
        meta: {
          requiresAuth: true,
          title: "角色列表",
          key: "role"
        }
      },
      {
        path: "/permission/manager",
        element: lazyLoad(React.lazy(() => import("@/pages/permission/manager"))),
        meta: {
          requiresAuth: true,
          title: "管理员列表",
          key: "manager"
        }
      }
    ]
  }
];

export default permissionRouter;
