import http from "@/service";
import { INavgation } from "./interface";

export const getNavgationList = () => {
  return http.get<INavgation.ResNavgationList[]>("" + `/navgation`);
};

export const createArticle = (params: INavgation.ReqPostNavgationList) => {
  return http.post("" + `/article`, params);
};
