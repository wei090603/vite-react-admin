import React from 'react';
import lazyLoad from '@/router/config/lazyLoad';
import { Layout } from '@/router/layout';
import { RouteObject } from '@/router/interface';

// 数据大屏模块
const userRouter: Array<RouteObject> = [
  {
    element: Layout,
    meta: {
      title: '用户管理',
      key: 'user',
      sort: 2
    },
    children: [
      {
        path: '/userList',
        element: lazyLoad(React.lazy(() => import('@/pages/user'))),
        meta: {
          requiresAuth: true,
          title: '用户列表',
          key: 'userList'
        }
      }
    ]
  }
];

export default userRouter;
