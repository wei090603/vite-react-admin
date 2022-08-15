import { createSlice } from '@reduxjs/toolkit';
import { login, loginOut } from '@/api/login';
import { getStorage, removeStorage, setStorage } from '@/utils/storage';
import { ILoginForm } from '@/pages/login';
import { getDynamicRouters, initTree } from '@/utils/reouter';

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
      const treeMenu = getDynamicRouters(initTree(payload));
      console.log(treeMenu, 'treeMenu');
      state.resources = treeMenu;
    },
    setFlatRoutes(state, { payload }) {
      state.flatResources = payload;
    }
  }
});

export const { setToken, setUserInfo, setUserResources, setFlatRoutes } = userSlice.actions;

export const fetchLogin = (payload: ILoginForm) => async (dispatch: any) => {
  const { token } = await login(payload);
  dispatch(setToken(token));
  setStorage('token', token);
};

export const fetchLoginOut = () => async () => {
  await loginOut();
  removeStorage('token');
};

export default userSlice.reducer;
