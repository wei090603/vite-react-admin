import { Login, User } from '@/api/interface/index';

import http from '@/service';

/**
 * @name 登录模块
 */
// * 用户登录接口
export const login = (params: Login.ReqLoginForm) => {
  // return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } });
  return http.post<Login.ResLogin>('' + `/auth/login`, params);
};

export const userInfo = () => {
  return http.get<User.ResUserInfo>('' + `/auth`);
};

export const loginOut = () => {
  return http.get<void>('' + `/auth/loginOut`);
};
