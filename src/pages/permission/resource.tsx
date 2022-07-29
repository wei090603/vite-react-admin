import React, { useEffect, useState } from 'react';
import { IResource } from '@/api/interface';
import { createResource, getResourceList, putResource } from '@/api/permission';
import OperateBtn from '@/components/OperateBtn';
import { Button, Drawer, Form, Input, InputNumber, message, Radio, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<IResource.ResResourceList> = {
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
  const [id, setId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number>(0);
  const [parentTitle, setParentTitle] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [resourcesList, setResourcesList] = useState<IResource.ResResourceList[]>([]);

  const columns: ColumnsType<IResource.ResResourceList> = [
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: status => <span>{status ? '隐藏' : '显示'}</span>
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
      render: createdAt => <span>{createdAt}</span>
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleAddSOn(record)}>
            添加子级
          </Button>
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

  useEffect(() => {
    getResource();
  }, []);

  const getResource = async () => {
    const data = await getResourceList();
    setResourcesList(data);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
    }
  };

  const handleEdit = (row: IResource.ResResourceList) => {
    setId(row.id);
    form.setFieldsValue({
      title: row.title,
      status: row.status,
      component: row.component,
      path: row.path,
      icon: row.icon,
      type: row.type
    });
    setVisible(true);
  };

  const handleAddSOn = (row: IResource.ResResourceList) => {
    setParentId(row.id);
    setParentTitle(row.title);
    setVisible(true);
  };

  const handleDel = () => {};

  const handleCancel = () => {
    form.resetFields();
  };

  const onClose = () => {
    setId(null);
    setParentId(0);
    form.resetFields();
    setVisible(false);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async values => {
        const params: IResource.Resource = {
          status: values.status,
          component: values.component,
          path: values.path,
          icon: values.icon,
          type: values.type,
          parentId,
          title: values.parentId
        };
        id ? await putResource(id, params) : await createResource(params);
        message.success(id ? '修改成功' : '新增成功');
        handleCancel();
        getResource();
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
          {parentId ? (
            <Form.Item name="parentTitle" label="父级写菜单" rules={[{ required: true, message: '父级写菜单名称' }]}>
              <Input placeholder="前填写父级菜单名称" value={parentTitle} disabled />
            </Form.Item>
          ) : null}
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
              <Radio value="menu">菜单</Radio>
              <Radio value="button">按钮</Radio>
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
