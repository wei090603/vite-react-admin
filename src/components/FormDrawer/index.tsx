import { FC } from 'react';
import { Button, Drawer, Space } from 'antd';

type IProps = {
  title: string;
  visible: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  children: React.ReactNode;
};

const FormDrawer: FC<IProps> = (props: IProps) => {
  const { title, visible, handleClose, handleSubmit, children } = props;
  return (
    <>
      <Drawer
        title={title}
        width={500}
        placement="right"
        onClose={handleClose}
        visible={visible}
        destroyOnClose={true}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleClose}>取消</Button>
              <Button type="primary" onClick={handleSubmit}>
                确定
              </Button>
            </Space>
          </div>
        }
      >
        {children}
      </Drawer>
    </>
  );
};

export default FormDrawer;
