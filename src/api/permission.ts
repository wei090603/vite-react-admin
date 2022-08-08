import { IManager, IRole, ResPage, IResource } from '@/api/interface/index';

import http from '@/service';

export const getManagerList = (params: IManager.ReqGetManagerParams) => {
  return http.get<ResPage<IManager.ResManagerList>>('' + `/manager`, params);
};

export const getRoleList = (params: IRole.ReqGetRoleParams) => {
  return http.get<ResPage<IRole.ResRoleList>>('' + `/role`, params);
};
export const getNoPageRoleList = () => {
  return http.get<IRole.NoPageItem[]>('' + `/role/list`);
};
export const createRole = (params: IRole.Role) => {
  return http.post('' + `/role`, params);
};

export const putRole = (id: number, params: IRole.Role) => {
  return http.put('' + `/role/${id}`, params);
};

export const getResourceList = () => {
  return http.get<IResource.ResResourceList[]>('' + `/resources`);
};

export const createResource = (params: IResource.Resource) => {
  return http.post('' + `/resources`, params);
};

export const putResource = (id: number, params: IResource.Resource) => {
  return http.put('' + `/resources/${id}`, params);
};

export const createManager = (params: IManager.Manager) => {
  return http.post('' + `/manager`, params);
};
export const putManager = (id: number, params: IManager.UpManager) => {
  return http.put('' + `/manager/${id}`, params);
};

export const deleteManager = (id: number) => {
  return http.delete<IResource.ResResourceList[]>('' + `/manager/${id}`);
};
