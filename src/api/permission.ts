import { IManager, IRole, ResPage, IResources } from '@/api/interface/index';

import http from '@/service';

export const getManagerList = (params: IManager.ReqGetManagerParams) => {
  return http.get<ResPage<IManager.ResManagerList>>('' + `/manager`, params);
};

export const getRoleList = (params: IRole.ReqGetRoleParams) => {
  return http.get<ResPage<IRole.ResRoleList>>('' + `/role`, params);
};

export const createRole = (params: IRole.Role) => {
  return http.post('' + `/role`, params);
};

export const getResourcesList = () => {
  return http.get<IResources.ResResourcesList[]>('' + `/resources`);
};
