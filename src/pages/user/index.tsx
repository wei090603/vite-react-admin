import { FC, useEffect, useState } from 'react';
import { IUser } from '@/api/interface';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import OperateBtn from '@/components/OperateBtn';
import { useNavigate } from 'react-router-dom';
import { getUserList } from '@/api/user';

const User: FC = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<IUser.ResUserList> = [
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => <span>{createdAt}</span>
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, { updatedAt }) => <span>{updatedAt}</span>
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record.id)}>
            编辑
          </Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const [userList, setUserList] = useState<IUser.ResUserList[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getUserList({ page, limit });
    setUserList(list);
    setTotal(total);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  // const hasSelected = selectedRowKeys.length > 0;

  const handleAdd = () => {
    navigate('/article/add');
  };

  const handleDel = () => {
    navigate('/article/add');
  };

  const handleEdit = (id: number) => {
    // navigate(`/article/edit/${id}`)
    navigate(`/article/edit?id=${id}`);
  };

  // 改变页码的回调 page代表页码数 pageSize代表每页条数
  const handlePageChange = (page: number) => {
    getUser(page);
  };

  return (
    <>
      <OperateBtn handleAdd={handleAdd} handleDel={handleDel} />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={userList}
        rowKey={'id'}
        pagination={{ total, onChange: page => handlePageChange(page) }}
      />
    </>
  );
};

export default User;
