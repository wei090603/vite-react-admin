import React, { useEffect } from 'react'
import { Layout } from 'antd'
import LeftSider from './Menu'
import { Outlet } from 'react-router-dom'
import HeaderMain from './Header'
import Tabs from './Tabs'
import { useAppDispatch } from '@/hooks'
import { getUserInfo } from '@/store/modules/user'

import './index.less'
import LayoutFooter from './Footer'

const { Content } = Layout

const LayoutApp: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  return (
    <Layout className="app">
      <LeftSider />
      <Layout className="site-layout">
        <HeaderMain />
        <Tabs />
        <Content className="content">
          <Outlet />
        </Content>
        <LayoutFooter />
      </Layout>
    </Layout>
  )
}

export default LayoutApp
