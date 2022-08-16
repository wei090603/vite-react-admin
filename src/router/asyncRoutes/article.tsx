import React from 'react';
import lazyLoad from '@/router/config/lazyLoad';
import { Layout } from '@/router/layout';
import { RouteObject } from '@/router/interface';

// article 模块
const articleRouter: Array<RouteObject> = [
  {
    element: Layout,
    path: '/article',
    meta: {
      title: '文章管理',
      key: 'article'
    },
    children: [
      {
        path: '/article/tag',
        element: lazyLoad(React.lazy(() => import('@/pages/article/tag'))),
        meta: {
          title: '标签列表',
          key: 'tag'
        }
      },
      {
        path: '/article/category',
        element: lazyLoad(React.lazy(() => import('@/pages/article/category'))),
        meta: {
          title: '分类列表',
          key: 'category'
        }
      },
      {
        path: '/article/articleList',
        element: lazyLoad(React.lazy(() => import('@/pages/article/articleList'))),
        meta: {
          title: '文章列表',
          key: 'articleList'
        }
      },
      {
        path: '/article/add',
        element: lazyLoad(React.lazy(() => import('@/pages/article/articleDetail'))),
        meta: {
          title: '新增文章',

          key: 'articleAdd',
          hidden: true,
          activeMenu: '/article/articleList'
        }
      },
      {
        path: '/article/edit',
        element: lazyLoad(React.lazy(() => import('@/pages/article/articleDetail'))),
        meta: {
          title: '编辑文章',

          key: 'articleEdit',
          hidden: true,
          activeMenu: '/article/articleList'
        }
      }
    ]
  }
];

export default articleRouter;
