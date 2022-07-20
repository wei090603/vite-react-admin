import { FC, useState, useEffect } from "react";
import { IRoles } from "@/api/interface";
import type { ColumnsType } from "antd/lib/table";
import { getRolesList } from "@/api/permission";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import OperateBtn from "@/components/OperateBtn";

const Role: FC = () => {
  const columns: ColumnsType<IRoles.ResRolesList> = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName"
    },
    {
      title: "角色编码",
      dataIndex: "mark",
      key: "mark"
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark"
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => <span>{createdAt}</span>
    },
    {
      title: "更新时间",
      dataIndex: "updateAt",
      key: "updateAt",
      render: (_, { updatedAt }) => <span>{updatedAt}</span>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="primary">分配权限</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const [rolesList, setRolesList] = useState<IRoles.ResRolesList[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getRolesList({ page, limit });
    setRolesList(list);
    setTotal(total);
  };

  const handleDel = () => {};

  const handleEdit = (row: IRoles.ResRolesList) => {
    console.log(row, "row");
  };

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    form
      .validateFields()
      .then(async values => {
        setConfirmLoading(true);

        console.log(values, "values");
      })
      .catch(() => {})
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
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
      <OperateBtn handleAdd={() => setVisible(true)} handleDel={handleDel} />
      <Table columns={columns} dataSource={rolesList} rowKey={"id"} pagination={{ total, onChange: page => getRoles(page) }} />

      <Modal
        visible={visible}
        title="新增角色"
        okText="提交"
        cancelText="取消"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} {...formItemLayout} name="form_in_modal" initialValues={{}}>
          <Form.Item name="roleName" label="角色名称" rules={[{ required: true, message: "" }]}>
            <Input placeholder="前填写标签名称" />
          </Form.Item>
          <Form.Item name="mark" label="标签编码" rules={[{ required: true, message: "" }]}>
            <Input placeholder="前填写标签名称" />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Role;
