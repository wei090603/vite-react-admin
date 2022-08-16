// 懒加载 Layout
import React from 'react';
import lazyLoad from '@/router/config/lazyLoad';
export const Layout = lazyLoad(React.lazy(() => import('@/layout/index')));
