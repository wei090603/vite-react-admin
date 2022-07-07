import { FC, useEffect, useState } from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { navgationList } from '@/api/navgation';

import './index.less';

interface DataType {
  key: string;
  title: string;
  sort: number;
  link: string;
  createdAt: string
  updatedAt: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '导航名',
    dataIndex: 'title',
    key: 'title',
    render: title => <span>{title}</span>,
  },
  {
    title: '链接',
    dataIndex: 'link',
    key: 'link',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: '创建日期',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '更新日期',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary">编辑</Button>
        <Button type="primary" danger>删除</Button>
      </Space>
    ),
  },
];


const Navigation: FC = () => {
  const [list, setList] = useState([])

  const [params, setParams] = useState({
    page: 1
  })

  useEffect(() => {
    getNavgation()
  }, [])


  const getNavgation = async () => {
    // const data = await navgationList({})
    // setList(data)
  }

  return (
    <Table columns={columns} dataSource={list} rowKey={'id'} />
  )
};

export default Navigation;