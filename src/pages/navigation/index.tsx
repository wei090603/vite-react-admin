import { FC, useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { createNavgation, getNavgationList } from '@/api/navgation';
import { INavgation } from '@/api/interface';
import OperateBtn from '@/components/OperateBtn';
import './index.less';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

const Navigation: FC = () => {
  const [navgationList, setNavgationList] = useState<INavgation.ResNavgationList[]>([]);

  useEffect(() => {
    getNavgation();
  }, []);

  const columns: ColumnsType<INavgation.ResNavgationList> = [
    {
      title: '导航名',
      dataIndex: 'title',
      key: 'title',
      render: title => <span>{title}</span>
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link'
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort'
    },
    {
      title: '创建日期',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: '操作',
      key: 'action',
      width: '150px',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const handleEdit = (row: INavgation.ResNavgationList) => {
    console.log(row, 'row');
  };

  const getNavgation = async () => {
    const data = await getNavgationList();
    setNavgationList(data);
  };

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async values => {
        setConfirmLoading(true);
        await createNavgation(values);
        console.log(values, 'values');
        handleCancel();
        getNavgation();
      })
      .catch(() => {})
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleDel = () => {};

  return (
    <>
      <OperateBtn handleAdd={() => setVisible(true)} handleDel={handleDel} />
      <Table columns={columns} dataSource={navgationList} rowKey={'id'} pagination={false} />

      <Modal
        visible={visible}
        title="新增角色"
        okText="提交"
        cancelText="取消"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} {...formItemLayout} name="form_in_modal" initialValues={{}}>
          <Form.Item name="title" label="导航名称" rules={[{ required: true, message: '' }]}>
            <Input placeholder="前填写导航名称" />
          </Form.Item>
          <Form.Item name="link" label="导航路径" rules={[{ required: true, message: '' }]}>
            <Input placeholder="前填写标签名称" />
          </Form.Item>
          <Form.Item name="sort" label="排序" rules={[{ type: 'number', min: 1, max: 99 }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Navigation;
