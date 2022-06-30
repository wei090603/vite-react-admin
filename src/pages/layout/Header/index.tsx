import React, { FC, Fragment, useEffect } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Breadcrumb } from 'antd'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { getUserInfo } from '@/store/modules/user'
import { setCollapsed } from '@/store/modules/app'

import './index.less'

const { Header } = Layout

const HeaderMain: FC = () => {
  const dispatch = useAppDispatch()
  const { collapsed } = useAppSelector((state) => state.app)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  return (
    <Header className="header-main">
      <div className="left-box">
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: () => dispatch(setCollapsed())
          }
        )}
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">Application Center</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">Application List</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="right-box">33333</div>
    </Header>
  )
}

export default HeaderMain
