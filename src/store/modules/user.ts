import { createSlice } from '@reduxjs/toolkit';
import { login, loginOut, userInfo } from '@/api/login';
import { getStorage, removeStorage, setStorage } from '@/utils/storage';
import { ILoginForm } from '@/pages/login';
import { getManagerResources } from '@/api/permission';

interface IUserInfo {
  account: string;
  avatar: string;
  createdAt: string;
  email: string;
  id: number | string;
  name: string;
  phone: string;
  remark: string;
}

export interface ICounterState {
  userInfo: IUserInfo;
  token: string;
  resources: any[];
  flatResources: any[];
}

const initialState: ICounterState = {
  userInfo: {
    account: '',
    avatar: '',
    createdAt: '',
    email: '',
    id: '',
    name: '',
    phone: '',
    remark: ''
  },
  token: getStorage('token') || '',
  resources: [],
  flatResources: []
};

const namespaces = 'user';

const userSlice = createSlice({
  name: namespaces,
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
    setUserResources(state, { payload }) {
      console.log(payload, 'payload');
      state.flatResources = payload.flat();
      state.resources = payload;
    }
  }
});

export const { setToken, setUserInfo, setUserResources } = userSlice.actions;

export const fetchLogin = (payload: ILoginForm) => async (dispatch: any) => {
  const { token } = await login(payload);
  dispatch(setToken(token));
  setStorage('token', token);
};

export const getUserInfo = () => async (dispatch: any) => {
  const data = await userInfo();
  dispatch(setUserInfo(data));
};

// 获取权限列表
export const getPermission = () => async (dispatch: any) => {
  const data = await getManagerResources();
  dispatch(setUserResources(data));
};

export const fetchLoginOut = () => async () => {
  await loginOut();
  removeStorage('token');
};

export default userSlice.reducer;
