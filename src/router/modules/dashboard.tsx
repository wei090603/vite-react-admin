import React from "react";
import lazyLoad from "@/router/config/lazyLoad";
import { Layout } from "@/router/constant";
import { RouteObject } from "@/router/interface";

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
	{
		element: Layout,
		meta: {
			title: "Dashboard"
		},
		children: [
			{
				path: "/dashboard",
				element: lazyLoad(React.lazy(() => import('@/pages/dashboard'))),
				meta: {
					requiresAuth: true,
					title: "首页",
					key: "dashboard"
				}
			},
		]
	}
];

export default dashboardRouter;
