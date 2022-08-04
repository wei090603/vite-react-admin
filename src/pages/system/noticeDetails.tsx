import React, { FC, useEffect } from 'react';
import { Button, Form, Input, Radio, Space, message } from 'antd';
import Editor from '@/components/Editor';
// import { INotice } from '@/api/interface/index';
import { addNotice, getNoticeInfo, editNoticeInfo } from '@/api/system';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

const NoticeDetails: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  const [params] = useSearchParams();
  const { pathname } = useLocation();
  const id = Number(params.get('id'));

  const isAdd = pathname === '/system/addNotice';
  // const isEdit = pathname === '/system/editNotice';
  const isView = pathname === '/system/viewsNotice';
  // 提交成功回调
  const onFinish = async (values: any) => {
    try {
      const param = {
        ...values,
        status: false
      };
      !id ? await addNotice(param) : await editNoticeInfo(id, param);
      message.success(!id ? '编辑成功' : '新增成功');
      navigate(-1);
    } catch (error) {
      console.log('error', error);
    }
  };
  // 提交失败回调
  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };
  const onReset = () => {
    form.resetFields();
  };
  // 获取详情
  const reqGetNoticeInfo = async (id: number) => {
    const body = await getNoticeInfo(id);
    form.setFieldsValue(body);
  };
  useEffect(() => {
    if (!isAdd) {
      reqGetNoticeInfo(id);
    }
  }, []);
  return (
    <Form
      name="basic"
      form={form}
      {...layout}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="消息类型" name="type" rules={[{ required: true, message: '请选择消息类型!' }]}>
        <Radio.Group>
          <Radio value={1}> 通知 </Radio>
          <Radio value={2}> 公告 </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="摘要" name="content" rules={[{ required: true, message: '请输入摘要!' }]}>
        <Editor></Editor>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 1 }}>
        <Space>
          <Button disabled={isView} type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default NoticeDetails;
