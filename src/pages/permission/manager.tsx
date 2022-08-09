import { FC, useState, useEffect } from 'react';
import { IManager, IRole } from '@/api/interface';
import type { ColumnsType } from 'antd/lib/table';
import { getManagerList, putManager, createManager, getNoPageRoleList, deleteManager } from '@/api/permission';
import { Button, Space, Switch, Table, Form, Input, Select, message, Popconfirm } from 'antd';
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
      width: 160
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
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: IRole.ResRoleList[]) => {
        return (
          <>
            {roles.map(item => {
              return (
                <p style={{ width: '100px' }} key={item.id}>
                  {item.roleName}&nbsp;
                </p>
              );
            })}
          </>
        );
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
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
      width: 180,
      render: (_, record) => (
        <Space size="middle">
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
    setVisible(true);
  };

  const handleDel = (record: IManager.ResManagerList) => {
    console.log('ee', record);
    setId(record.id);
    deleteManager(3);
  };

  const handleEdit = ({ id, name, account, email, phone, remark }: IManager.ResManagerList) => {
    setId(id);
    setVisible(true);
    form.setFieldsValue({ name, account, email, phone, remark });
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
        rowKey={'id'}
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
