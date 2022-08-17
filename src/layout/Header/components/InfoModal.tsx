import { useState, useImperativeHandle, Ref } from 'react';
import { Modal, message, Form, Input, Select, DatePicker, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
const { Option } = Select;
interface Props {
  innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
}

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
const InfoModal = (props: Props) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>(
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  );
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  useImperativeHandle(props.innerRef, () => ({
    showModal
  }));

  const showModal = (params: { name: number }) => {
    console.log(params);
    setModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        console.log('values', values);
        setModalVisible(false);
        message.success('修改用户信息成功 🎉🎉🎉');
      })
      .catch(() => {})
      .finally(() => {});
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const onFinish = () => {};
  const onFinishFailed = () => {};
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Modal width="500px" title="个人信息" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
      <Form
        name="basic"
        form={form}
        {...formItemLayout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="昵称" name="username" rules={[{ required: true, message: '请输入昵称' }]}>
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item label="性别" name="password" rules={[{ required: true, message: '请选择性别!' }]}>
          <Select placeholder="请选择性别" allowClear>
            <Option value="male">男</Option>
            <Option value="female">女</Option>
          </Select>
        </Form.Item>
        <Form.Item label="生日" name="password">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="password"
          rules={[
            {
              pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: '请输入正确的邮箱格式！'
            }
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="password"
          rules={[
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请输入正确的手机号码格式！'
            }
          ]}
        >
          <Input placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item label="头像" name="password">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default InfoModal;
