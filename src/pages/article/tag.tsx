import { FC, useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import OperateBtn from '@/components/OperateBtn';
import type { ColumnsType } from 'antd/lib/table';
import { ITag } from '@/api/interface';
import { createTag, getTagList, putTag } from '@/api/article';

const Tag: FC = () => {
  const columns: ColumnsType<ITag.ResTagList> = [
    { title: '标签名', dataIndex: 'name', key: 'name' },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => <span>{createdAt}</span>
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: updatedAt => <span>{updatedAt}</span>
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

  const [tagList, setTagList] = useState<ITag.ResTagList[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [id, setId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getTag();
  }, []);

  const getTag = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getTagList({ page, limit });
    setTagList(list);
    setTotal(total);
  };

  const handleDel = () => {};

  const handleEdit = ({ id, name }: ITag.ResTagList) => {
    setId(id);
    form.setFieldsValue({ name });
    setVisible(true);
  };

  // 改变页码的回调 page代表页码数 pageSize代表每页条数
  const handlePageChange = (page: number) => {
    getTag(page);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async values => {
        setConfirmLoading(true);
        id ? await putTag(id, values) : await createTag(values);
        message.success(id ? '修改成功' : '新增成功');
        handleCancel();
        getTag();
      })
      .catch(() => {})
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setId(null);
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <OperateBtn handleAdd={showModal} handleDel={handleDel} />
      <Table
        columns={columns}
        dataSource={tagList}
        rowKey={'id'}
        pagination={{ total, onChange: page => handlePageChange(page) }}
      />

      <Modal
        visible={visible}
        title="新增标签"
        okText="提交"
        cancelText="取消"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} name="form_in_modal" initialValues={{}}>
          <Form.Item name="name" label="标签名称" rules={[{ required: true, message: '前填写标签名称' }]}>
            <Input placeholder="前填写标签名称" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Tag;
