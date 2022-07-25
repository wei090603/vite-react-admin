import { IResources } from '@/api/interface';
import { getResourcesList } from '@/api/permission';
import OperateBtn from '@/components/OperateBtn';
import { Button, Drawer, Form, Input, InputNumber, Radio, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';

const columns: ColumnsType<IResources.ResResourcesList> = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    key: 'type',
    render: type => <a>{type === 'menu' ? '菜单' : '按钮'}</a>
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon'
  },
  {
    title: '组件',
    dataIndex: 'component',
    key: 'component'
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path'
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (_, { createdAt }) => <span>{createdAt}</span>
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 100,
    render: (_, record) => (
      <Space size="middle">
        <Button type="link">添加子级</Button>
        <Button type="link">编辑 {record.id}</Button>
        <Button type="link" danger>
          删除
        </Button>
      </Space>
    )
  }
];

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<IResources.ResResourcesList> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};

const Resources: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const [resourcesList, setResourcesList] = useState<IResources.ResResourcesList[]>([]);

  useEffect(() => {
    getManager();
  }, []);

  const getManager = async () => {
    const data = await getResourcesList();
    setResourcesList(data);
  };

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

  const handleDel = () => {};

  const handleCancel = () => {
    form.resetFields();
  };

  const onClose = () => {
    handleCancel();
    setVisible(false);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async values => {
        console.log(values, 'values');
        handleCancel();
      })
      .catch(() => {});
  };

  return (
    <>
      <OperateBtn handleAdd={() => setVisible(true)} handleDel={handleDel} />
      <Table rowKey={'id'} columns={columns} rowSelection={{ ...rowSelection, checkStrictly: true }} dataSource={resourcesList} />

      <Drawer
        title="新增菜单"
        width={500}
        placement="right"
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={handleCancel}>重置</Button>
            <Button onClick={handleSubmit} type="primary">
              提交
            </Button>
          </Space>
        }
      >
        <Form {...formItemLayout} form={form} name="form_in_modal" initialValues={{ sort: 1, switch: false, type: 1 }}>
          <Form.Item name="title" label="菜单名称" rules={[{ required: true, message: '前填写菜单名称' }]}>
            <Input placeholder="前填写菜单名称" />
          </Form.Item>
          <Form.Item name="path" label="访问路径" rules={[{ required: true, message: '前填写访问路径' }]}>
            <Input placeholder="前填写访问路径" />
          </Form.Item>
          <Form.Item name="component" label="前端组件" rules={[{ required: true, message: '前填写前端组件' }]}>
            <Input placeholder="前填写前端组件" />
          </Form.Item>
          <Form.Item name="sort" label="排序" rules={[{ type: 'number', min: 1, max: 99 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true, message: '类型' }]}>
            <Radio.Group>
              <Radio value={1}>菜单</Radio>
              <Radio value={2}>按钮</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="switch" label="是否隐藏" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Resources;
