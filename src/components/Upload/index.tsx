import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

interface Props {
  onChange?: (arg: any) => void;
  maxCount?: number;
  form: any;
  imageList: UploadFile[];
}
const MyUpload: React.FC<Props> = ({ form, imageList, maxCount = 1 }) => {
  const { token } = useAppSelector(state => state.user);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList(imageList);
  }, [imageList]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.every((item: any) => item.status === 'done' && item?.response?.code === 200)) {
      const imageArr: string[] = [];
      newFileList.forEach((item: any) => {
        imageArr.push(item.response.data.filename);
      });
      form.setFieldsValue({ image: imageArr });
    }
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = form.getFieldValue('image').filter((item: string) => item !== file.name);
    form.setFieldsValue({ image: newFileList });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        maxCount={maxCount}
        action={import.meta.env.VITE_API_URL + '/upload/file'}
        headers={{ Authorization: `Bearer ${token}` }}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MyUpload;
