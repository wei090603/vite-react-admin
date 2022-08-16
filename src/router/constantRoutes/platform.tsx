import React from 'react';
import { Navigate } from 'react-router-dom';
import lazyLoad from '@/router/config/lazyLoad';
import { RouteObject } from '@/router/interface';
import { Layout } from '@/router/layout';
import Login from '@/pages/login';

// 错误页面模块
const platformRouter: Array<RouteObject> = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录页',
      key: 'login',
      hidden: true
    },
    children: []
  },
  {
    element: Layout,
    meta: {
      title: '系统路由',
      key: 'platform',
      hidden: true
    },
    children: [
      {
        path: '/403',
        element: lazyLoad(React.lazy(() => import('@/components/ErrorMessage/403'))),
        meta: {
          title: '403页面',
          key: '403'
        }
      },
      {
        path: '/404',
        element: lazyLoad(React.lazy(() => import('@/components/ErrorMessage/404'))),
        meta: {
          title: '404页面',
          key: '404'
        }
      },
      {
        path: '/500',
        element: lazyLoad(React.lazy(() => import('@/components/ErrorMessage/500'))),
        meta: {
          title: '500页面',
          key: '500'
        }
      },
      {
        path: '*',
        element: <Navigate to="/404" />
      }
    ]
  }
];

export default platformRouter;
