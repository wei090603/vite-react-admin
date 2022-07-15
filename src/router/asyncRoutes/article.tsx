import React from "react";
import lazyLoad from "@/router/config/lazyLoad";
import { Layout } from "@/router/constant";
import { RouteObject } from "@/router/interface";

// article 模块
const articleRouter: Array<RouteObject> = [
  {
    element: Layout,
    path: "/article",
    meta: {
      title: "文章管理",
      key: "article",
      sort: 5
    },
    children: [
      {
        path: "/article/articleList",
        element: lazyLoad(React.lazy(() => import("@/pages/article/article"))),
        meta: {
          requiresAuth: true,
          title: "文章列表",
          key: "articleList"
        }
      },
      {
        path: "/article/tag",
        element: lazyLoad(React.lazy(() => import("@/pages/article/tag"))),
        meta: {
          requiresAuth: true,
          title: "标签列表",
          key: "tag"
        }
      },
      {
        path: "/article/category",
        element: lazyLoad(React.lazy(() => import("@/pages/article/category"))),
        meta: {
          requiresAuth: true,
          title: "分类列表",
          key: "category"
        }
      },
      {
        path: "/article/add",
        element: lazyLoad(React.lazy(() => import("@/pages/article/articleDetail"))),
        meta: {
          title: "新增文章",
          requiresAuth: true,
          key: "articleAdd",
          hidden: true,
          activeMenu: "/article/articleList"
        }
      },
      {
        path: "/article/edit",
        element: lazyLoad(React.lazy(() => import("@/pages/article/articleDetail"))),
        meta: {
          title: "编辑文章",
          requiresAuth: true,
          key: "articleEdit",
          hidden: true,
          activeMenu: "/article/articleList"
        }
      }
    ]
  }
];

export default articleRouter;
