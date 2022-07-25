import { HOME_URL } from '@/config/config';
import { createSlice } from '@reduxjs/toolkit';

export interface IAppState {
  isCollapse: boolean;
  breadcrumbList: {
    [key: string]: any;
  };
  tabsList: Menu.MenuOptions[];
  tabsActive: string;
}

const initialState: IAppState = {
  isCollapse: false,
  breadcrumbList: {},
  tabsList: [{ title: '首页', path: HOME_URL }],
  tabsActive: HOME_URL
};

const namespaces = 'app';

const appSlice = createSlice({
  name: namespaces,
  initialState,
  reducers: {
    setCollapsed(state) {
      state.isCollapse = !state.isCollapse;
    },
    setBreadcrumbList(state, data) {
      console.log(data.payload, 'state reducers');
      state.breadcrumbList = data.payload;
    },
    setTabsList(state, data) {
      state.tabsList.push(data.payload);
    },
    delTabsList(state, data) {
      state.tabsList = data.payload;
    }
  }
});

export const { setCollapsed, setBreadcrumbList, setTabsList, delTabsList } = appSlice.actions;

export default appSlice.reducer;
