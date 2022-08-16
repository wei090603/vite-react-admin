import { RouteObject } from '@/router/interface';
import lazyLoad from '@/router/config/lazyLoad';
import { lazy } from 'react';
// import { Outlet } from 'react-router-dom';

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
  const route = routes.find(item => item.path === path);
  if (!route) return routes.find(item => item.path === '/404')!;
  else return route;
};

// 转换为树形结构
export const initTree = (data, parentId = null) => {
  // jsonArray 变量数据
  // 第一次以后：根据id去查询parent_id相同的（相同为子数据）
  // 第一次：查找所有parent_id为null的数据组成第一级
  const children = data.filter(item => item.parentId == parentId);
  // 第一次：循环parent_id为null数组
  return children.map(item => ({
    ...item,
    // 当前存在id（id与parent_id应该是必须有的）调用initTree() 查找所有parent_id为本id的数据
    // childs字段写入
    children: initTree(data, item.id)
  }));
};

// 根据后端传入的路由表，进行递归遍历，映射element本地组件
export const getDynamicRouters = (routes: RouteObject[]) => {
  // 递归路由表
  const newRoutes: RouteObject[] = routes.map((item: any) => {
    return {
      // 是否有组件地址，如果没有，则添加的是菜单目录，element用Outlet
      path: item.path,
      element: lazyLoad(
        lazy(() => (item.component === 'layout' ? import('@/layout/index') : import(`../pages/${item.component}`)))
      ),
      meta: {
        title: item.title,
        key: item.name,
        activeMenu: item.activeMenu,
        hidden: item.status
      },
      children: item.children?.length ? getDynamicRouters(item.children) : []
    };
  });
  return newRoutes;
};
