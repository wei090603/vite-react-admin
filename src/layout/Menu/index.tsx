import React from 'react'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useAppSelector } from '@/hooks'
import Logo from '../Logo'
import { useLocation, useNavigate } from 'react-router-dom'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('仪表盘', '/', <PieChartOutlined />),
  getItem('导航管理', '/navigation', <DesktopOutlined />),
  getItem('权限管理', '/permission', <ContainerOutlined />),

  getItem('文章管理', 'articleManage', <MailOutlined />, [
    getItem('分类列表', 'category'),
    getItem('标签列表', 'tag'),
    getItem('文章列表', 'article')
  ]),

  getItem('系统管理', 'sub2', <AppstoreOutlined />, [
    getItem('登录日志', '9'),
    getItem('系统日志', '10'),

    getItem('Submenu', 'sub3', null, [
      getItem('Option 11', '11'),
      getItem('Option 12', '12')
    ])
  ])
]

const LeftSider: React.FC = () => {
  const navigate = useNavigate()
  const { collapsed } = useAppSelector((state) => state.app)
  const { pathname } = useLocation()

  console.log(pathname, 'vpathname');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    navigate(e.key)
  }

  return (
    <Sider width={240} trigger={null} collapsible collapsed={collapsed}>
      <Logo />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[]}
        items={items}
        onClick={onClick}
      />
    </Sider>
  )
}

export default LeftSider
