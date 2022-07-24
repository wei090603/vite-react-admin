import { ILoginLogger, ResPage, IAdvertise } from "@/api/interface/index";

import http from "@/service";

export const getLoginLoggerList = (params: ILoginLogger.ReqGetLoginLoggerParams) => {
  return http.get<ResPage<ILoginLogger.ResLoginLogger>>("" + `/login-logger`, params);
};

export const getAdvertiseList = (params: IAdvertise.ReqGetAdvertiseParams) => {
  return http.get<ResPage<IAdvertise.ResAdvertiseList>>("" + `/advertise`, params);
};

export const createAdvertise = (params: IAdvertise.Advertise) => {
  return http.post("" + `/advertise`, params);
};

export const putAdvertise = (id: number, params: IAdvertise.Advertise) => {
  return http.put("" + `/advertise/${id}`, params);
};
