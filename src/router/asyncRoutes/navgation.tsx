import React from 'react';
import lazyLoad from '@/router/config/lazyLoad';
import { Layout } from '@/router/layout';
import { RouteObject } from '@/router/interface';

// 数据大屏模块
const navigationRouter: Array<RouteObject> = [
  {
    element: Layout,
    meta: {
      title: '导航管理',
      key: 'navigation'
    },
    children: [
      {
        path: '/navigation',
        element: lazyLoad(React.lazy(() => import('@/pages/navigation'))),
        meta: {
          title: '导航列表',
          key: 'navigation'
        }
      }
    ]
  }
];

export default navigationRouter;
