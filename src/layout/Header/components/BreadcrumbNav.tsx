import { FC } from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { useAppSelector } from "@/hooks";

const BreadcrumbNav: FC = () => {
  const { pathname } = useLocation();
  const { breadcrumbList } = useAppSelector((state) => state.app)
	const currentBreadcrumbList = breadcrumbList[pathname] || [];
  console.log(currentBreadcrumbList, 'currentBreadcrumbList');
	return (
		<Breadcrumb>
			<Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>
			{currentBreadcrumbList.map((item: string) => {
				return <Breadcrumb.Item key={item}>{item !== "首页" ? item : null}</Breadcrumb.Item>;
			})}
		</Breadcrumb>
	);
};

export default BreadcrumbNav
