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
  token: getStorage('token') || ''
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
  await getManagerRresources();
};

// 获取权限列表
export const getManagerRresources = async () => {
  const data = await getManagerResources();
  console.log(data, 'data');
};

export const fetchLoginOut = () => async () => {
  await loginOut();
  removeStorage('token');
};

export default userSlice.reducer;
