import { IAdvertise } from "@/api/interface";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<IAdvertise.AdvertiseList> = [
  {
    title: "广告标题",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
];

const Advertise: React.FC = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Advertise;
