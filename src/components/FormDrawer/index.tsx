import { FC } from 'react';
import { Button, Drawer, Space } from 'antd';

type IProps = {
  visible: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
};

const FormDrawer: FC<IProps> = (props: IProps) => {
  return (
    <>
      <Drawer
        title="新增菜单"
        width={500}
        placement="right"
        onClose={props.handleClose}
        visible={props.visible}
        destroyOnClose={true}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={props.handleClose}>取消</Button>
              <Button type="primary" onClick={props.handleSubmit}>
                确定
              </Button>
            </Space>
          </div>
        }
      ></Drawer>
    </>
  );
};

export default FormDrawer;
