import { Space, Button, Popconfirm, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { INotice } from '@/api/interface/index';
import { getNoticeList } from '@/api/system';
import OperateBtn from '@/components/OperateBtn';
import { useNavigate } from 'react-router-dom';

const Notice: React.FC = () => {
  const [data, setNoticeList] = useState<INotice.INoticeList[]>([]);
  const navigate = useNavigate();
  const columns: ColumnsType<INotice.INoticeList> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },

    {
      title: '消息类型',
      dataIndex: 'type',
      key: 'type',
      render: (_, { type }) => {
        // 类型 1-通知 2-公告
        return <span>{type === 1 ? '通知' : '公告'}</span>;
      }
    },
    {
      title: '发布人',
      dataIndex: 'createBy',
      key: 'createBy'
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => {
        const color = status ? 'green' : 'grey';
        return (
          <>
            <Tag color={color}>{status ? '已发布' : '已撤销'}</Tag>
          </>
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm title="确认撤销此项？" onConfirm={handleDel} okText="确认" cancelText="取消">
            <Button type="link" danger>
              撤销
            </Button>
          </Popconfirm>
          <Button type="link" onClick={() => handleViews(record, true)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleViews(record, false)}>
            查看
          </Button>
        </Space>
      )
    }
  ];
  useEffect(() => {
    reqGetNoticeList();
  }, []);
  const reqGetNoticeList = async (page: number = 1, limit: number = 10) => {
    const body = await getNoticeList({ page, limit, title: '' });
    setNoticeList(body.list);
  };
  const handleAdd = () => {
    navigate('/system/notice/add');
  };
  /**
   * 撤销
   */
  const handleDel = () => {};
  /**
   * 查看
   */
  const handleViews = (record: INotice.INoticeList, isEdit: boolean) => {
    if (isEdit) {
      navigate(`/system/notice/edit?id=${record.id}`);
    } else {
      navigate(`/system/notice/detail?id=${record.id}`);
    }
  };
  return (
    <>
      <OperateBtn handleAdd={() => handleAdd()} />
      <Table columns={columns} dataSource={data} rowKey={'id'} />
    </>
  );
};

export default Notice;
