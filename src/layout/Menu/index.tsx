import React, { useEffect, useState } from 'react'
import * as Icons from "@ant-design/icons";
import { Menu, Spin, Layout } from 'antd'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { searchRoute } from '@/utils/reouter';
import { routerArray, rootRouter } from '@/router'
import { RouteObject } from '@/router/interface';
import Logo from '../Logo'

const { Sider } = Layout

const LayoutMenu = () => {
  const dispatch = useAppDispatch()
  const { isCollapse } = useAppSelector((state) => state.app)

  const { pathname } = useLocation();
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  
	// 刷新页面菜单保持高亮
  useEffect(() => {
    console.log(pathname, 'pathname');
		setSelectedKeys([pathname]);
    // isCollapse ? null : setOpenKeys([pathname]);
    setOpenKeys(['/permission'])
    console.log(openKeys);
	}, [pathname, isCollapse]);

	// 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    console.log(openKeys, 'openKeys')
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};

	// 定义 menu 类型
	type MenuItem = Required<MenuProps>["items"][number];
	const getItem = (
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: "group"
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
			// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.meta?.title, item.path, addIcon('ContainerOutlined')));
			newArr.push(getItem(item.meta?.title, item.meta?.key, addIcon('ContainerOutlined'), deepLoopFloat(item.children)));
		});
		return newArr;
	};

  	// 获取菜单列表并处理成 antd menu 需要的格式
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(false);
	const getMenuData = async () => {
		setLoading(true);
    try {
			// const { data } = await getMenuList();
			// if (!data) return;
      const routeData = routerArray.map(item => {
        if (item.children?.length! > 1) return item
        return item.children
      }).flat() || []
			setMenuList(deepLoopFloat(routeData as  RouteObject[]));
			// // 存储处理过后的所有面包屑导航栏到 redux 中
			// props.setBreadcrumbList(findAllBreadcrumb(data));
			// // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
			// const dynamicRouter = handleRouter(data);
			// props.setAuthRouter(dynamicRouter);
			// props.setMenuList(data);
		} finally {
			setLoading(false);
		}
  };
  
	useEffect(() => {
		getMenuData();
	}, []);

	// 点击当前菜单跳转页面
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		const route = searchRoute(key, rootRouter);
		if (route.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};


  return (
		<Sider width={240}>
			<Spin spinning={loading} tip="Loading...">
				<Logo></Logo>
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
			</Spin>
		</Sider>
	);
}

export default LayoutMenu
