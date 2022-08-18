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
  breadcrumbList: [],
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
      state.breadcrumbList = [];
      const pathnameArr = data.payload.pathname.split('/');
      let arr: string[] = [];
      const flatResources = data.payload.flatResources;
      pathnameArr.forEach((item: any, index: number) => {
        arr[0] = '';
        if (index > 0) {
          arr[index] = arr[index - 1] + '/' + pathnameArr[index];
        }
        flatResources.forEach((filItem: any) => {
          if (filItem.path === arr[index]) {
            state.breadcrumbList.push(filItem);
          }
        });
      });
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
