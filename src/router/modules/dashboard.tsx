import React from "react";
import lazyLoad from "@/router/config/lazyLoad";
// import { LayoutIndex } from "@/router/constant";
import { RouteObject } from "@/router/interface";

import LayoutApp  from '@/layout'

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
	{
		element: <LayoutApp />,
		meta: {
			title: "Dashboard"
		},
		children: [
			{
				path: "/dashboard",
				element: lazyLoad(React.lazy(() => import('@/pages/dashboard'))),
				meta: {
					requiresAuth: true,
					title: "数据可视化",
					key: "dataVisualize"
				}
			},
		]
	}
];

export default dashboardRouter;
