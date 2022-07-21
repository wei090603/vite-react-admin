import { IAdvertise } from "@/api/interface";
import { getAdvertiseList } from "@/api/system";
import OperateBtn from "@/components/OperateBtn";
import { Button, Form, Input, InputNumber, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";

const type = {
  home: "首页"
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

const Advertise: React.FC = () => {
  const [advertiseList, setResAdvertiseList] = useState<IAdvertise.ResAdvertiseList[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getAdvertise();
  }, []);

  const getAdvertise = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getAdvertiseList({ page, limit });
    setResAdvertiseList(list);
    setTotal(total);
  };

  const columns: ColumnsType<IAdvertise.ResAdvertiseList> = [
    {
      title: "广告标题",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "位置",
      dataIndex: "type",
      key: "type",
      render: (value: IAdvertise.Type) => type[value]
    },
    {
      title: "图片",
      dataIndex: "picture",
      key: "picture"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => <span>{status ? "隐藏" : "显示"}</span>
    },
    {
      title: "描述",
      dataIndex: "describe",
      key: "describe"
    },
    {
      title: "操作",
      key: "action",
      width: "150px",
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

  const handleEdit = (row: IAdvertise.ResAdvertiseList) => {
    console.log(row, "row");
  };

  // 改变页码的回调 page代表页码数 pageSize代表每页条数
  const handlePageChange = (page: number) => {
    getAdvertise(page);
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
        console.log(values, "values");
        handleCancel();
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
      <Table
        columns={columns}
        dataSource={advertiseList}
        rowKey={"id"}
        pagination={{ total, onChange: page => handlePageChange(page) }}
      />

      <Modal
        visible={visible}
        title="新增广告"
        okText="提交"
        cancelText="取消"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} {...formItemLayout} name="form_in_modal" initialValues={{}}>
          <Form.Item name="title" label="广告标题" rules={[{ required: true, message: "" }]}>
            <Input placeholder="前填写广告标题" />
          </Form.Item>
          <Form.Item name="link" label="导航路径" rules={[{ required: true, message: "" }]}>
            <Input placeholder="前填写标签名称" />
          </Form.Item>
          <Form.Item name="sort" label="排序" rules={[{ type: "number", min: 1, max: 99 }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Advertise;
