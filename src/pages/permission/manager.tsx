import { FC, useState, useEffect } from 'react';
import { IRole } from '@/api/interface';
import { IManager } from '@/api/interface';
import type { ColumnsType } from 'antd/lib/table';
import { getManagerList } from '@/api/permission';
import { Button, Space, Switch, Table, Form, Input, Select } from 'antd';
const { Option } = Select;
import OperateBtn from '@/components/OperateBtn';
import FormDrawer from '@/components/FormDrawer';

const Manager: FC = () => {
  const columns: ColumnsType<IManager.ResManagerList> = [
    {
      title: '用户名',
      dataIndex: 'account',
      key: 'account'
    },
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: avatar => <img width={50} height={50} src={avatar} alt="" />
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => <Switch checkedChildren="启用" unCheckedChildren="禁用" checked={status} />
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt'
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
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const [managerList, setManagerList] = useState<IManager.ResManagerList[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [id, setId] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState<IRole.RoleUpdate[]>([]);
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
  useEffect(() => {
    getManager();
    setRoleList([
      {
        mark: '部长',
        remark: '以及',
        roleName: '耳机',
        id: 3
      }
    ]);
  }, []);

  const getManager = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getManagerList({ page, limit });
    setManagerList(list);
    setTotal(total);
  };

  const handleAdd = () => {
    setVisible(true);
  };

  const handleDel = () => {};

  const handleEdit = (row: IManager.ResManagerList) => {
    console.log(row, '000row');
    setId(row.id);
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };
  const handleSubmit = () => {};
  return (
    <>
      <OperateBtn handleAdd={handleAdd} handleDel={handleDel} />
      <Table
        columns={columns}
        dataSource={managerList}
        rowKey={'id'}
        pagination={{ total, onChange: page => getManager(page) }}
      />
      <FormDrawer title={id ? '编辑' : '新增'} handleClose={handleClose} handleSubmit={handleSubmit} visible={visible}>
        <Form form={form} {...formItemLayout} name="form_in_modal" initialValues={{ remark: '' }}>
          <Form.Item
            name="roleName"
            label="用户名"
            rules={[
              { required: true, message: '请输入内容' },
              {
                min: 2,
                max: 15,
                message: '长度在 2 到 15 个字符'
              }
            ]}
          >
            <Input placeholder="请填写用户名" />
          </Form.Item>
          <Form.Item name="mark" label="姓名" rules={[{ required: true, message: '请输入内容' }]}>
            <Input placeholder="请填写姓名" />
          </Form.Item>
          <Form.Item name="mark" label="角色" rules={[{ required: true, message: '请输入内容' }]}>
            <Select placeholder="请选择角色" allowClear>
              {roleList.map(item => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.roleName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="mark"
            label="邮箱"
            rules={[
              { required: true, message: '请输入内容' },
              {
                pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                message: '请输入正确的邮箱格式！'
              }
            ]}
          >
            <Input placeholder="请填写邮箱" />
          </Form.Item>
          <Form.Item
            name="mark"
            label="手机号码"
            rules={[
              { required: true, message: '请输入内容' },
              {
                pattern: /^1[3456789]\d{9}$/,
                message: '请输入正确的手机号码格式！'
              }
            ]}
          >
            <Input placeholder="请填写手机号码" />
          </Form.Item>
          <Form.Item name="remark" label="描述">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </FormDrawer>
    </>
  );
};

export default Manager;
