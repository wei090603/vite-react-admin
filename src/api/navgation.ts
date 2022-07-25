import http from '@/service';
import { INavgation } from './interface';

export const getNavgationList = () => {
  return http.get<INavgation.ResNavgationList[]>('' + `/navgation`);
};

export const createNavgation = (params: INavgation.Navgation) => {
  return http.post('' + `/navgation`, params);
};

export const patchNavgation = ({ id, ...params }: INavgation.ReqUpdateNavationParams) => {
  return http.post('' + `/navgation/${id}`, params);
};
