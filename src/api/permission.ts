import { IManager, IRole, ResPage, IResource } from '@/api/interface/index';

import http from '@/service';

// 管理员模块
export const getManagerList = (params: IManager.ReqGetManagerParams) =>
  http.get<ResPage<IManager.ResManagerList>>(`/manager`, params);

export const createManager = (params: IManager.Manager) => http.post(`/manager`, params);

export const putManager = (id: number, params: IManager.UpManager) => http.put(`/manager/${id}`, params);

export const deleteManager = (id: number) => http.delete(`/manager/${id}`);

export const putManagerStatus = (id: number) => http.patch(`/manager/status/${id}`);

export const putManagerPassword = (id: number) => http.patch(`/manager/restPassword/${id}`);

// 获取当前用户菜单权限
export const getManagerResources = () => http.get<IResource.ResResourceList[]>(`/manager/resources`);

// 角色模块
export const getRoleList = (params: IRole.ReqGetRoleParams) => http.get<ResPage<IRole.ResRoleList>>(`/role`, params);
// 无分页角色列表
export const getNoPageRoleList = () => http.get<IRole.NoPageItem[]>(`/role/list`);

export const createRole = (params: IRole.Role) => http.post(`/role`, params);

export const putRole = (id: number, params: IRole.Role) => http.put(`/role/${id}`, params);
// 获取角色权限
export const getRoleAuth = (id: number) => http.get<number[]>(`role/${id}`);

export const patchRole = (id: number, params: IRole.ResourcesPatch) => http.patch(`/role/resources/${id}`, params);

// 资源模块
export const getResourceList = () => http.get<IResource.ResResourceList[]>(`/resources`);

export const createResource = (params: IResource.Resource) => http.post(`/resources`, params);

export const putResource = (id: number, params: IResource.Resource) => http.put(`/resources/${id}`, params);

export const delResource = (id: number) => http.delete(`/resources/${id}`);
