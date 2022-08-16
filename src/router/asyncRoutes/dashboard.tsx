import React from 'react';
import lazyLoad from '@/router/config/lazyLoad';
import { Layout } from '@/router/layout';
import { RouteObject } from '@/router/interface';

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
  {
    element: Layout,
    meta: {
      title: 'Dashboard',
      key: 'Dashboard'
    },
    children: [
      {
        path: '/',
        element: lazyLoad(React.lazy(() => import('@/pages/dashboard'))),
        meta: {
          title: '首页',
          key: 'home'
        }
      }
    ]
  }
];

export default dashboardRouter;
