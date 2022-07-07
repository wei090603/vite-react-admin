import { Tabs, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { routerArray } from "@/router";
import MoreButton from "./components/MoreButton";
import { searchRoute } from "@/utils/reouter";

import "./index.less";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setTabsList } from "@/store/modules/app";

const LayoutTabs = () => {
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const navigate = useNavigate();
  const [activeValue, setActiveValue] = useState<string>(pathname);
  
  const dispatch = useAppDispatch()
  const { tabsList } = useAppSelector((state) => state.app)

	useEffect(() => {
		addTabs();
	}, [pathname]);

	// click tabs
	const clickTabs = (path: string) => {
		navigate(path);
	};

	// add tabs
	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
    let currentTabsList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(tabsList));
    if (tabsList.every((item: any) => item.path !== route.path)) {
			currentTabsList.push({ title: route.meta!.title, path: route.path!  });
    }
		dispatch(setTabsList(currentTabsList));
		setActiveValue(pathname);
	};

	// delete tabs
	const delTabs = (tabPath?: string) => {
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("你删除了Tabs标签 😆😆😆");
		dispatch(setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath)));
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
									{item.path == HOME_URL ? <HomeFilled /> : ""}
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
