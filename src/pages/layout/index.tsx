import React from 'react'
import { Layout } from 'antd'
import LeftSider from './Menu'
import { Outlet } from 'react-router-dom'
import HeaderMain from './Header'
import Tabs from './Tabs'

import './index.less'

const { Content } = Layout

const LayoutApp: React.FC = () => {
  return (
    <Layout className="app">
      <LeftSider />
      <Layout className="site-layout">
        <HeaderMain />
        <Tabs />
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutApp
