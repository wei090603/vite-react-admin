import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/hooks';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

interface Props {
  value?: any;
  onChange?: (arg: any) => void;
  maxCount?: number;
}
const MyUpload: React.FC<Props> = ({ value, onChange, maxCount = 1 }) => {
  const { token } = useAppSelector(state => state.user);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList(value);
  }, [value]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
    console.log(file, 'file');

    if (file.status === 'error') {
      message.error('上传出错！');
    }
    if (onChange) {
      onChange(
        newFileList?.map(v => ({
          ...v,
          status: 'done'
        }))
      );
    }
    // if (newFileList?.response?.code === 200) {
    //   props.onChange?.(newFileList?.response.data.filename);
    // }

    console.log(newFileList, 'newFileList');
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
