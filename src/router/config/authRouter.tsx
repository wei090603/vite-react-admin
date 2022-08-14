import { useEffect } from 'react';
import { getStorage } from '@/utils/storage';
import { useLocation, Navigate } from 'react-router-dom';
import { AxiosCanceler } from '@/service/helper/axiosCancel';
import { useAppSelector } from '@/hooks';
import useLogin from '@/hooks/useLogin';
// import { HOME_URL } from "@/config/config";

const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由守卫组件
 * */
const AuthRouter = ({ children }: any) => {
  const isToken = getStorage('token');
  const { resources } = useAppSelector(state => state.user);
  const { pathname } = useLocation();
  const { initAfterLogin } = useLogin();

  useEffect(() => {
    console.log(111);
    if (isToken) {
      initAfterLogin();
    }
  }, [isToken]);

  // * 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending();

  if (pathname === '/login') return children;
  // * 判断是否有Token
  if (!isToken) return <Navigate to="/login" replace />;

  // 静态路由，合动态路由合并。
  // const routes = rootRouter(resources);

  console.log(pathname, resources, 'rootRouter');
  const route = resources.find(item => item.path === pathname);
  console.log(route, 'route');

  // // * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
  // const dynamicRouter = store.getState().auth.authRouter;
  // // * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
  // const staticRouter = [HOME_URL, "/403"];
  // const routerList = dynamicRouter.concat(staticRouter);
  // // * 如果访问的地址没有在路由表中重定向到403页面
  // if (routerList.indexOf(pathname) == -1) return <Navigate to="/403" />;

  // window.document.title = route.meta?.title || '后台管理系统';

  // * 当前账号有权限返回 Router，正常访问页面
  return children;
};

export default AuthRouter;
