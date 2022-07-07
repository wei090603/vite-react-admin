import { IArticle, ResPage } from "@/api/interface/index";

import http from "@/service";


export const getArticle = (params: IArticle.ReqGetArticleParams) => {
	return http.get<ResPage<IArticle.ResArticleList>>('' + `/article`, params);
};


// // * 批量添加用户
// export const BatchAddUser = (params: any) => {
// 	return http.post(PORT1 + `/user/import`, params, { headers: { "Content-Type": "multipart/form-data" } });
// };
// // * 导出用户数据
// export const exportUserInfo = (params: User.ReqGetUserParams) => {
// 	return http.post<BlobPart>(PORT1 + `/user/export`, params, { responseType: "blob" });
// };
