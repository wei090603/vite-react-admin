import { Tabs } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HOME_URL } from '@/config/config';
import MoreButton from './components/MoreButton';
import { searchRoute } from '@/utils/router';

import './index.less';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { delTabsList, setTabsList } from '@/store/modules/app';

const LayoutTabs = () => {
  const { TabPane } = Tabs;
  const { flatResources } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeValue, setActiveValue] = useState<string>(pathname);

  const { tabsList } = useAppSelector(state => state.app);

  useEffect(() => {
    addTabs();
  }, [pathname]);

  // click tabs
  const clickTabs = (path: string) => {
    navigate(path);
  };

  // add tabs
  const addTabs = () => {
    const route = searchRoute(pathname, flatResources);
    const currentRoute = route.meta?.activeMenu ? searchRoute(route.meta.activeMenu, flatResources) : route;

    if (tabsList.every((item: { path: string }) => item.path !== currentRoute.path)) {
      dispatch(setTabsList({ title: currentRoute.title, path: currentRoute.path! }));
    }
    setActiveValue(currentRoute.path as string);
  };

  // delete tabs
  const delTabs = (tabPath: string) => {
    if (tabPath === HOME_URL) return;
    if (pathname === tabPath) {
      tabsList.forEach((item: Menu.MenuOptions, index: number) => {
        if (item.path !== pathname) return;
        const nextTab = tabsList[index + 1] || tabsList[index - 1];
        if (!nextTab) return;
        navigate(nextTab.path);
      });
    }
    dispatch(delTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath)));
  };

  return (
    <div className="tabs">
      <Tabs
        activeKey={activeValue}
        onChange={clickTabs}
        hideAdd
        type="editable-card"
        onEdit={path => {
          delTabs(path as string);
        }}
      >
        {tabsList.map((item: Menu.MenuOptions) => {
          return (
            <TabPane
              key={item.path}
              tab={
                <span>
                  {item.path == HOME_URL ? <HomeFilled /> : ''}
                  {item.title}
                </span>
              }
              closable={item.path !== HOME_URL}
            ></TabPane>
          );
        })}
      </Tabs>
      <MoreButton delTabs={delTabs}></MoreButton>
    </div>
  );
};

export default LayoutTabs;
