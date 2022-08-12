import { ILoginLogger, ResPage, IAdvertise, INotice } from '@/api/interface/index';

import http from '@/service';

export const getLoginLoggerList = (params: ILoginLogger.ReqGetLoginLoggerParams) => {
  return http.get<ResPage<ILoginLogger.ResLoginLogger>>('' + `/login-logger`, params);
};

export const getAdvertiseList = (params: IAdvertise.ReqGetAdvertiseParams) => {
  return http.get<ResPage<IAdvertise.ResAdvertiseList>>('' + `/advertise`, params);
};

export const createAdvertise = (params: IAdvertise.Advertise) => {
  return http.post('' + `/advertise`, params);
};

export const putAdvertise = (id: number, params: IAdvertise.Advertise) => {
  return http.put('' + `/advertise/${id}`, params);
};
export const getNoticeList = (params: INotice.NoticeListReq) => {
  return http.get<ResPage<INotice.INoticeList>>('' + `/notice`, params);
};
//新增
export const addNotice = (params: INotice.NoticeFormItem) => {
  return http.post('' + `/notice`, params);
};
// 通知公告详情
export const getNoticeInfo = (id: number) => {
  return http.get<INotice.INoticeList>('' + `/notice/${id}`);
};
// 编辑公告详情
export const editNoticeInfo = (id: number, params: INotice.NoticeFormItem) => {
  return http.put('' + `/notice/${id}`, params);
};
