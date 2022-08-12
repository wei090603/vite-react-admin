import { getStorage } from '@/utils/storage';
import { useLocation, Navigate } from 'react-router-dom';
import { searchRoute } from '@/utils/reouter';
import { rootRouter } from '@/router';
import { AxiosCanceler } from '@/service/helper/axiosCancel';
import { useEffect } from 'react';
import useLogin from '@/hooks/useLogin';
// import { HOME_URL } from "@/config/config";

const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: any) => {
  const isToken = getStorage('token');
  const { initAfterLogin } = useLogin();

  useEffect(() => {
    if (isToken) {
      initAfterLogin();
    }
  }, [isToken]);

  const { pathname } = useLocation();
  const route = searchRoute(pathname, rootRouter);
  // * 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending();

  // * 判断是否有Token
  if (!isToken) return <Navigate to="/login" replace />;

  // // * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
  // const dynamicRouter = store.getState().auth.authRouter;
  // // * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
  // const staticRouter = [HOME_URL, "/403"];
  // const routerList = dynamicRouter.concat(staticRouter);
  // // * 如果访问的地址没有在路由表中重定向到403页面
  // if (routerList.indexOf(pathname) == -1) return <Navigate to="/403" />;

  window.document.title = route.meta?.title || '后台管理系统';

  // * 当前账号有权限返回 Router，正常访问页面
  return props.children;

  // return (
  //   <Routes>
  //     <Route path={'/login'} element={<LoginPage />} />
  //     <Route path={'/*'} element={<ILayout />}>
  //       <Route path="" element={<Home />}></Route>
  //       {pages.map(item => (
  //         <Route key={item.path} path={item.path} element={<item.comp></item.comp>} />
  //       ))}
  //       <Route path="*" element={pages.length ? <NotFound /> : <LoadingPage />}></Route>
  //     </Route>
  //   </Routes>
  // );
};

export default AuthRouter;
