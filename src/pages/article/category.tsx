import React, { FC, useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import OperateBtn from '@/components/OperateBtn';
import type { ColumnsType } from 'antd/lib/table';
import { ICategory } from '@/api/interface';
import { createCategory, getCategoryList, putCategory } from '@/api/article';

const Category: FC = () => {
  const [id, setId] = useState<number | null>(null);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryList, setCategoryList] = useState<ICategory.ResCategoryList[]>([]);
  const [total, setTotal] = useState<number>(0);

  const columns: ColumnsType<ICategory.ResCategoryList> = [
    { title: '分类名', dataIndex: 'title', key: 'title' },
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
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link">子级</Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getCategoryList({ page, limit });
    setCategoryList(list);
    setTotal(total);
  };

  const handleAdd = () => {
    showModal();
  };

  const handleDel = () => {};

  const handleEdit = ({ title, id }: ICategory.ResCategoryList) => {
    const data = { title };
    setFormData(data);
    setId(id);
    setVisible(true);
  };

  // 改变页码的回调 page代表页码数 pageSize代表每页条数
  const handlePageChange = (page: number) => {
    getCategory(page);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleSubmit = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then(async values => {
        values.parentId = 0;
        id ? await putCategory(id, values) : await createCategory(values);
        message.success(id ? '修改成功' : '新增成功');
        handleCancel();
        getCategory();
      })
      .catch(() => {})
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setId(null);
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <OperateBtn handleAdd={handleAdd} handleDel={handleDel} />
      <Table
        rowKey={'id'}
        columns={columns}
        rowSelection={{ checkStrictly: true }}
        dataSource={categoryList}
        pagination={{ total, onChange: page => handlePageChange(page) }}
      />

      <Modal
        visible={visible}
        destroyOnClose={true}
        title={id ? '编辑分类' : '新增分类'}
        okText="提交"
        cancelText="取消"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} name="form_in_modal" initialValues={formData}>
          <Form.Item name="title" label="分类名称" rules={[{ required: true, message: '前填写分类名称' }]}>
            <Input placeholder="前填写分类名称" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Category;
