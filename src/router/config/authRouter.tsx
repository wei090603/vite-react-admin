import { useLayoutEffect } from 'react';
import { getStorage } from '@/utils/storage';
import { useLocation, Navigate } from 'react-router-dom';
import { AxiosCanceler } from '@/service/helper/axiosCancel';
import { useAppSelector } from '@/hooks';
import useLogin from '@/hooks/useLogin';
import { searchRoute } from '@/utils/router';
import NProgress from '@/config/nprogress';

const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  NProgress.start();
  const { flatResources } = useAppSelector(state => state.user);
  const token = getStorage('token');

  const { pathname } = useLocation();
  const { initAfterLogin } = useLogin();
  const route = searchRoute(pathname, flatResources);

  useLayoutEffect(() => {
    if (token) {
      initAfterLogin();
    }
  }, [token]);

  // * 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending();

  if (pathname === '/login') {
    NProgress.done();
    return props.children;
  }
  // * 判断是否有Token
  if (!token) return <Navigate to="/login" replace />;
  NProgress.done();

  window.document.title = route?.meta?.title || '后台管理系统';

  // * 当前账号有权限返回 Router，正常访问页面
  return props.children;
};

export default AuthRouter;
