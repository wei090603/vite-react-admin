import React, { FC } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCollapsed } from "@/store/modules/app";

const CollapseIcon: FC = () => {
  const dispatch = useAppDispatch();
  const { isCollapse } = useAppSelector(state => state.app);
  return (
    <>
      {React.createElement(isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "collapsed",
        onClick: () => dispatch(setCollapsed())
      })}
    </>
  );
};

export default CollapseIcon;
