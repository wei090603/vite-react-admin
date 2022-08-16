import { FC, useState, useEffect } from 'react';
import { IManager, IRole } from '@/api/interface';
import type { ColumnsType } from 'antd/lib/table';
import {
  getManagerList,
  putManager,
  createManager,
  getNoPageRoleList,
  deleteManager,
  putManagerStatus,
  putManagerPassword
} from '@/api/permission';
import { Button, Space, Switch, Table, Form, Input, Select, message, Popconfirm, Tag, Image } from 'antd';
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
      key: 'email',
      width: 180
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 70,
      render: avatar => <Image width={50} src={avatar} />
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 140
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      width: 120,
      render: (roles: IRole.ResRoleList[]) => (
        <>
          {roles?.map(item => (
            <Tag color="green" key={item.id}>
              {item.roleName}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: boolean, row: IManager.ResManagerList) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={status}
          onChange={() => {
            updateStatus(status, row);
          }}
        />
      )
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 260,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => changePwd(record)}>
            重置密码
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除此项？"
            onConfirm={() => {
              handleDel(record);
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const [managerList, setManagerList] = useState<IManager.ResManagerList[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [id, setId] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState<IRole.NoPageItem[]>([]);

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

  const getNoPageRole = async () => {
    const list = await getNoPageRoleList();
    setRoleList(list);
  };
  const getManager = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getManagerList({ page, limit });
    setManagerList(list);
    setTotal(total);
  };

  const handleAdd = () => {
    setId(null);
    form.resetFields();
    setVisible(true);
  };

  const handleDel = (record: IManager.ResManagerList) => {
    deleteManager(record.id);
    message.success('删除成功');
    getManager();
  };

  const handleEdit = ({ id, name, account, email, phone, remark, roles }: IManager.ResManagerList) => {
    setId(id);
    const roleId = roles.map((item: IRole.ResRoleList) => item.id);
    form.setFieldsValue({ name, account, email, phone, remark, roles: roleId });
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then(async values => {
        id ? await putManager(id, values) : await createManager(values);
        message.success(!id ? '编辑成功' : '新增成功');
        getManager();
        handleClose();
      })
      .catch(() => {})
      .finally(() => {});
  };
  const updateStatus = async (status: boolean, row: IManager.ResManagerList) => {
    await putManagerStatus(row.id);
    message.success(status ? '禁用成功' : '启用成功');
    getManager();
  };
  const changePwd = async (row: IManager.ResManagerList) => {
    await putManagerPassword(row.id);
    message.success('重置密码成功');
    getManager();
  };
  useEffect(() => {
    getManager();
    getNoPageRole();
  }, []);
  return (
    <>
      <OperateBtn handleAdd={handleAdd} />
      <Table
        columns={columns}
        dataSource={managerList}
        rowKey="id"
        pagination={{ total, onChange: page => getManager(page) }}
        scroll={{ x: '100%' }}
      />
      <FormDrawer title={id ? '编辑' : '新增'} handleClose={handleClose} handleSubmit={handleSubmit} visible={visible}>
        <Form form={form} {...formItemLayout} name="form_in_modal" initialValues={{ remark: '' }}>
          <Form.Item
            name="account"
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
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入内容' }]}>
            <Input placeholder="请填写姓名" />
          </Form.Item>
          <Form.Item name="roles" label="角色" rules={[{ required: true, message: '请输入内容' }]}>
            <Select placeholder="请选择角色" allowClear mode="multiple">
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
            name="email"
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
            name="phone"
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
