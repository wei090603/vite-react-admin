import { FC } from 'react';
import { Table } from 'antd';

type IProps = {
  columns: object;
  dataList: any[];
  total: number;
  handlePagination: () => void;
};

const TablePagination: FC<IProps> = (props: IProps) => {
  const { columns, dataList, total, handlePagination } = props;
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataList}
        rowKey={'id'}
        pagination={{ total, onChange: page => handlePagination(page) }}
      />
    </>
  );
};

export default TablePagination;
