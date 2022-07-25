import { IUser, ResPage } from '@/api/interface/index';

import http from '@/service';

export const getUserList = (params: IUser.ReqGetUserParams) => {
  return http.get<ResPage<IUser.ResUserList>>('' + `/user`, params);
};
