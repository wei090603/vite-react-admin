import { IManager, IRoles, ResPage, IResources } from "@/api/interface/index";

import http from "@/service";

export const getManagerList = (params: IManager.ReqGetManagerParams) => {
  return http.get<ResPage<IManager.ResManagerList>>("" + `/manager`, params);
};

export const getRolesList = (params: IRoles.ReqGetRolesParams) => {
  return http.get<ResPage<IRoles.ResRolesList>>("" + `/role`, params);
};

export const getResourcesList = () => {
  return http.get<IResources.ResResourcesList[]>("" + `/resources`);
};
