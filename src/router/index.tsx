import { useRoutes } from 'react-router-dom';
import { RouteObject } from './interface';
import constantRoutes from './constantRoutes/platform';

// * 导入所有router
const metaRouters = import.meta.globEager('./asyncRoutes/*.tsx');
// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});

export const rootRouter: RouteObject[] = [...routerArray, ...constantRoutes];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
