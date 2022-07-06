import { Layout } from "antd";
import AvatarIcon from "./components/AvatarIcon";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
// import Theme from "./components/Theme";
import Fullscreen from "./components/Fullscreen";
import { useAppSelector } from "@/hooks";

import "./index.less";

const { Header } = Layout;

const LayoutHeader = () => {
  const { userInfo } = useAppSelector((state) => state.user)

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				{/* <Theme /> */}
				<Fullscreen />
        <span className="username">{userInfo.name}</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
