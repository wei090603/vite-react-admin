import { createSlice } from '@reduxjs/toolkit';
import { login, loginOut, userInfo } from '@/api/login';
import { getStorage, removeStorage, setStorage } from '@/utils/storage';
import { ILoginForm } from '@/pages/login';

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
      console.log(payload, 'payload');
      state.token = payload;
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    }
  }
});

export const { setToken, setUserInfo } = userSlice.actions;

export const fetchLogin = (payload: ILoginForm) => async (dispatch: any) => {
  const { token } = await login(payload);
  dispatch(setToken(token));
  setStorage('token', token);
};

export const getUserInfo = () => async (dispatch: any) => {
  const data = await userInfo();
  dispatch(setUserInfo(data));
};

export const fetchLoginOut = () => async () => {
  await loginOut();
  removeStorage('token');
};

export default userSlice.reducer;
