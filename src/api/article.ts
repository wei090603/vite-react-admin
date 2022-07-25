import { IArticle, ICategory, ITag, ResPage } from '@/api/interface/index';

import http from '@/service';

export const getArticle = (params: IArticle.ReqGetArticleParams) => {
  return http.get<ResPage<IArticle.ResArticleList>>('' + `/article`, params);
};

export const createArticle = (params: IArticle.ReqArticleParams) => {
  return http.post('' + `/article`, params);
};

export const getArticleDetail = (id: string) => {
  return http.get<IArticle.ResArticleList>('' + `/article/${id}`);
};

export const getCategoryAll = () => {
  return http.get<ICategory.ResCategory[]>('' + `/category/all`);
};

export const getTagAll = () => {
  return http.get<ITag.ResTag[]>('' + `/tag/all`);
};

export const getCategoryList = (params: ICategory.ReqGetCategoryParams) => {
  return http.get<ResPage<ICategory.ResCategoryList>>('' + `/category`, params);
};

export const createCategory = (params: ICategory.CreateCategory) => {
  return http.post('' + `/category`, params);
};

export const putCategory = (id: number, params: ICategory.CreateCategory) => {
  return http.put('' + `/category/${id}`, params);
};

export const getTagList = (params: ITag.ReqGetTagParams) => {
  return http.get<ResPage<ITag.ResTagList>>('' + `/tag`, params);
};

export const createTag = (params: ITag.ReqCreateTagParams) => {
  return http.post('' + `/tag`, params);
};

// // * 批量添加用户
// export const BatchAddUser = (params: any) => {
// 	return http.post(PORT1 + `/user/import`, params, { headers: { "Content-Type": "multipart/form-data" } });
// };
// // * 导出用户数据
// export const exportUserInfo = (params: User.ReqGetUserParams) => {
// 	return http.post<BlobPart>(PORT1 + `/user/export`, params, { responseType: "blob" });
// };
