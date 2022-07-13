import React, { FC, useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import OperateBtn from "@/components/operateBtn";
import type { ColumnsType } from "antd/lib/table";
import { ICategory } from "@/api/interface";
import { createCategory, getCategoryList } from "@/api/article";

const Category: FC = () => {
  const columns: ColumnsType<ICategory.ResCategoryList> = [
    { title: "分类名", dataIndex: "title", key: "title" },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => <span>{createdAt}</span>
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
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
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const [categoryList, setCategoryList] = useState<ICategory.ResCategoryList[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getCategoryList({ page, limit });
    setCategoryList(list);
    setTotal(total);
  };

  const handleAdd = () => {
    showModal();
  };

  const handleDel = () => {};

  const handleEdit = (row: ICategory.ResCategoryList) => {
    console.log(row, "row");
  };

  // 改变页码的回调 page代表页码数 pageSize代表每页条数
  const handlePageChange = (page: number) => {
    getCategory(page);
  };

  const showModal = () => {
    setVisible(true);
  };

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);

    form
      .validateFields()
      .then(async values => {
        form.resetFields();
        values.grade = 0;
        values.parentId = 0;
        await createCategory(values);

        setConfirmLoading(false);
        setVisible(false);
        getCategory();
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <OperateBtn handleAdd={handleAdd} handleDel={handleDel} />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.title}</p>,
          rowExpandable: record => record.title !== "Not Expandable"
        }}
        dataSource={categoryList}
        rowKey={"id"}
        pagination={{ total, onChange: page => handlePageChange(page) }}
      />

      <Modal
        visible={visible}
        title="新增分类"
        okText="提交"
        cancelText="取消"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} name="form_in_modal" initialValues={{ title: "" }}>
          <Form.Item name="title" label="分类名称" rules={[{ required: true, message: "前填写分类名称" }]}>
            <Input placeholder="前填写分类名称" />
          </Form.Item>
          {/* <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item> */}
          {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
            <Radio.Group>
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </Radio.Group>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default Category;
