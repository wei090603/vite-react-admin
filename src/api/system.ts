import { ILoginLogger, ResPage } from "@/api/interface/index";

import http from "@/service";

export const getLoginLoggerList = (params: ILoginLogger.ReqGetLoginLoggerParams) => {
  return http.get<ResPage<ILoginLogger.ResLoginLogger>>("" + `/login-logger`, params);
};
