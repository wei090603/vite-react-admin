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
      key: 'article'
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
		]
	}
];

export default articleRouter;
