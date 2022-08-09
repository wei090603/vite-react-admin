import React, { FC, useState, useEffect, useMemo } from 'react';
import { IResource, IRole } from '@/api/interface';
import type { ColumnsType } from 'antd/lib/table';
import { createRole, getResourceList, getRoleAuth, getRoleList, patchRole, putRole } from '@/api/permission';
import { Button, Form, Input, message, Space, Table, Tree } from 'antd';
import OperateBtn from '@/components/OperateBtn';
import FormDrawer from '@/components/FormDrawer';

const Role: FC = () => {
  const columns: ColumnsType<IRole.ResRoleList> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '角色编码',
      dataIndex: 'mark',
      key: 'mark'
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
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleAuth(record)}>
            授权
          </Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const [form] = Form.useForm();
  const [id, setId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [rolesList, setRolesList] = useState<IRole.ResRoleList[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [authVisible, setAuthVisible] = useState<boolean>(false);
  const [resourcesList, setResourcesList] = useState<IResource.ResResourceList[]>([]);
  const [defaultKey, setDefaultKey] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const childArr: number[] = [];

  useEffect(() => {
    getRole();
    getResource();
  }, []);

  const getRole = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getRoleList({ page, limit });
    setRolesList(list);
    setTotal(total);
  };

  const getResource = async () => {
    const data = await getResourceList();
    setResourcesList(data);
  };

  const handleEdit = ({ id, roleName, mark, remark }: IRole.ResRoleList) => {
    setVisible(true);
    setId(id);
    form.setFieldsValue({ roleName, mark, remark });
  };

  // 点击授权按钮
  const handleAuth = async ({ id }: IRole.ResRoleList) => {
    const data = await getRoleAuth(id);
    setId(id);
    const uniqueChild = dataClean(data);
    setDefaultKey(uniqueChild);
    setAuthVisible(true);
  };

  // 处理子级
  const getChildData = (data: IResource.ResResourceList[] = resourcesList) => {
    data.forEach(res => {
      if (res.children?.length > 0) {
        getChildData(res.children);
      } else {
        childArr.push(res.id);
      }
    });
    return childArr;
  };

  // 缓存子级菜单
  const resourcesChildList = useMemo(() => getChildData(), [resourcesList]);

  const dataClean = (checkedList: number[]) => checkedList.filter((item: number) => resourcesChildList.includes(item));

  // 处理选中当前id 与父级id
  const onCheck = (checkedKeysValue: React.Key[], e: { halfCheckedKeys: React.Key[] }) => {
    const checkedKeysResult: React.Key[] = [...checkedKeysValue, ...e.halfCheckedKeys];
    setCheckedKeys(checkedKeysResult);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async values => {
        id ? await putRole(id, values) : await createRole(values);
        message.success(id ? '修改成功' : '新增成功');
        getRole();
        handleClose();
      })
      .catch(() => {})
      .finally(() => {});
  };

  const handleAuthSubmit = async () => {
    try {
      await patchRole(id!, { resourcesId: checkedKeys });
      message.success('修改成功');
      handleAuthClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleAuthClose = () => {
    setId(null);
    setAuthVisible(false);
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

  return (
    <>
      <OperateBtn handleAdd={() => setVisible(true)} />
      <Table columns={columns} dataSource={rolesList} rowKey={'id'} pagination={{ total, onChange: page => getRole(page) }} />
      <FormDrawer title={id ? '编辑' : '新增'} handleClose={handleClose} handleSubmit={handleSubmit} visible={visible}>
        <Form form={form} {...formItemLayout} name="form_in_modal" initialValues={{ remark: '' }}>
          <Form.Item name="roleName" label="角色名称" rules={[{ required: true, message: '' }]}>
            <Input placeholder="前填写标签名称" />
          </Form.Item>
          <Form.Item name="mark" label="标签编码" rules={[{ required: true, message: '' }]}>
            <Input placeholder="前填写标签名称" />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </FormDrawer>

      <FormDrawer title="角色权限配置" handleClose={handleAuthClose} handleSubmit={handleAuthSubmit} visible={authVisible}>
        {defaultKey ? (
          <Tree
            checkable
            defaultExpandAll={true}
            fieldNames={{ key: 'id' }}
            treeData={resourcesList}
            defaultCheckedKeys={defaultKey}
            onCheck={onCheck}
          />
        ) : null}
      </FormDrawer>
    </>
  );
};

export default Role;
