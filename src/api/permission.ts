import { IManager, IRole, ResPage, IResource } from '@/api/interface/index';

import http from '@/service';

// 管理员模块
export const getManagerList = (params: IManager.ReqGetManagerParams) =>
  http.get<ResPage<IManager.ResManagerList>>(`/manager`, params);

// 角色模块
export const getRoleList = (params: IRole.ReqGetRoleParams) => http.get<ResPage<IRole.ResRoleList>>(`/role`, params);

export const createRole = (params: IRole.Role) => http.post(`/role`, params);

export const putRole = (id: number, params: IRole.Role) => http.put(`/role/${id}`, params);
// 获取角色权限
export const getRoleAuth = (id: number) => http.get<number[]>(`role/${id}`);

export const patchRole = (id: number, params: IRole.ResourcesPatch) => http.patch(`/role/resources/${id}`, params);

// 资源模块
export const getResourceList = () => http.get<IResource.ResResourceList[]>(`/resources`);

export const createResource = (params: IResource.Resource) => http.post(`/resources`, params);

export const putResource = (id: number, params: IResource.Resource) => http.put(`/resources/${id}`, params);
