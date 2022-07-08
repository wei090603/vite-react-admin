import http from "@/service";
import { Navgation } from "./interface";

export const navgationList = () => {
  return http.get<Navgation.ResMenuList>("" + `/menu`);
};
