import React, { useEffect, useState } from 'react';
import * as Icons from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { searchRoute } from '@/utils/router';
import { RouteObject } from '@/router/interface';
import Logo from './components/Logo';
import { getOpenKeys } from '@/utils';
import { setBreadcrumbList } from '@/store/modules/app';

import './index.less';

const { Sider } = Layout;

const LayoutMenu = () => {
  const dispatch = useAppDispatch();
  const { isCollapse } = useAppSelector(state => state.app);
  const { flatResources, resources } = useAppSelector(state => state.user);
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 刷新页面菜单保持高亮
  useEffect(() => {
    const route = searchRoute(pathname, flatResources);
    if (!route?.activeMenu) setSelectedKeys([pathname]);
    else setSelectedKeys([route?.activeMenu as string]);
    isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
  }, [pathname, isCollapse]);

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  // 定义 menu 类型
  type MenuItem = Required<MenuProps>['items'][number];
  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  };

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
  };

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = (menuList: RouteObject[], newArr: MenuItem[] = []) => {
    menuList.forEach((item: RouteObject) => {
      if (!item.meta?.hidden) {
        // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
        if (!item?.children?.length) return newArr.push(getItem(item.meta?.title, item.path, addIcon('ContainerOutlined')));
        newArr.push(getItem(item.meta?.title, item.path, addIcon('ContainerOutlined'), deepLoopFloat(item.children)));
      }
    });
    return newArr;
  };

  // 获取菜单列表并处理成 antd menu 需要的格式
  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  useEffect(() => {
    const initResources = resources.map(item => {
      if (item.path === '/' && item.children) return item.children[0];
      return item;
    });
    setMenuList(deepLoopFloat(initResources as RouteObject[]));
    dispatch(setBreadcrumbList({ pathname, flatResources }));
  }, []);
  // 点击当前菜单跳转页面
  const navigate = useNavigate();
  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    const route = searchRoute(key, flatResources);
    if (route.isLink) window.open(route.isLink, '_blank');
    navigate(key);
  };

  return (
    <Sider width={240} trigger={null} collapsible collapsed={isCollapse}>
      <div className="menu">
        {!isCollapse ? <Logo /> : null}
        <Menu
          theme="dark"
          mode="inline"
          triggerSubMenuAction="click"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          items={menuList}
          onClick={clickMenu}
          onOpenChange={onOpenChange}
        ></Menu>
      </div>
    </Sider>
  );
};

export default LayoutMenu;
