import { IAdvertise } from "@/api/interface";
import { createAdvertise, getAdvertiseList, putAdvertise } from "@/api/system";
import OperateBtn from "@/components/OperateBtn";
import MyUpload from "@/components/Upload";
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const position = {
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
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IAdvertise.Advertise>({
    title: "",
    picture: "",
    position: IAdvertise.Type.HOME,
    status: true,
    describe: "",
    link: "",
    sort: 1
  });
  const [id, setId] = useState<number>(0);

  const columns: ColumnsType<IAdvertise.ResAdvertiseList> = [
    {
      title: "广告标题",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "位置",
      dataIndex: "position",
      key: "position",
      render: (value: IAdvertise.Type) => position[value]
    },
    {
      title: "图片",
      dataIndex: "picture",
      key: "picture",
      render: picture => <img width={50} height={50} src={import.meta.env.VITE_FILE_URL + picture} alt="" />
    },
    {
      title: "链接",
      dataIndex: "link",
      key: "link",
      width: "200px"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => <Switch checkedChildren="显示" unCheckedChildren="隐藏" checked={status} />
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort"
    },
    {
      title: "描述",
      dataIndex: "describe",
      key: "describe"
    },
    {
      title: "操作",
      key: "action",
      width: "200px",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm title="确认删除此项？" onConfirm={handleDel} okText="确认" cancelText="取消">
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  useEffect(() => {
    getAdvertise();
  }, []);

  const getAdvertise = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getAdvertiseList({ page, limit });
    setResAdvertiseList(list);
    setTotal(total);
  };

  const handleEdit = (row: IAdvertise.ResAdvertiseList) => {
    setId(row.id);
    setFormData(row);
    setVisible(true);
  };

  // 改变页码的回调 page代表页码数 pageSize代表每页条数
  const handlePageChange = (page: number) => {
    getAdvertise(page);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async values => {
        setConfirmLoading(true);
        values.picture = values.picture[0].response.data.filename;

        if (id) {
          await putAdvertise(id, values);
        } else {
          await createAdvertise(values);
        }
        getAdvertise();
        handleCancel();
      })
      .catch(() => {})
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleDel = () => {};

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
        <Form form={form} {...formItemLayout} name="form_in_modal" initialValues={formData}>
          <Form.Item name="title" label="广告标题" rules={[{ required: true, message: "前填写广告标题" }]}>
            <Input placeholder="前填写广告标题" />
          </Form.Item>
          <Form.Item name="link" label="广告跳转" rules={[{ required: true, message: "前填写广告跳转" }]}>
            <Input placeholder="前填写广告跳转" />
          </Form.Item>
          <Form.Item name="position" label="广告位置" rules={[{ required: true, message: "请选择广告位置" }]}>
            <Select placeholder="请选择广告位置" allowClear>
              <Option value="home">首页</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="图片"
            name="picture"
            getValueFromEvent={normFile}
            extra=""
            rules={[{ required: true, message: "请选择广告图片" }]}
          >
            <MyUpload />
          </Form.Item>
          <Form.Item label="描述" name="describe">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="状态" valuePropName="status" rules={[{ required: true, message: "请选择广告状态" }]}>
            <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
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
