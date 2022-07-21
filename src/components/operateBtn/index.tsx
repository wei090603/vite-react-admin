import { FC } from "react";
import { Button } from "antd";

import "./index.less";

interface IProps {
  handleAdd?: () => void;
  handleDel?: () => void;
  handlImport?: () => void;
  handleExport?: () => void;
}

const OperateBtn: FC<IProps> = (props: IProps) => {
  return (
    <div className="operate-wrapper">
      <div className="operate-left-btn">
        {props.handleAdd ? <Button onClick={props.handleAdd}>新增</Button> : null}
        {props.handleDel ? (
          <Button onClick={props.handleDel} danger>
            删除
          </Button>
        ) : null}
      </div>
      <div className="operate-right-btn">
        <Button onClick={props.handlImport} type="primary">
          导入
        </Button>
        <Button onClick={props.handleExport} type="primary">
          导出
        </Button>
      </div>
    </div>
  );
};

export default OperateBtn;
