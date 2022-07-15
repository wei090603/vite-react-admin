import http from "@/service";
import { INavgation } from "./interface";

export const getNavgationList = () => {
  return http.get<INavgation.ResNavgationList[]>("" + `/navgation`);
};
