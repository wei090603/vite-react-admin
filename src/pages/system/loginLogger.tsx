import { FC, useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import OperateBtn from "@/components/OperateBtn";
import type { ColumnsType } from "antd/lib/table";
import { ILoginLogger } from "@/api/interface";
import { getLoginLoggerList } from "@/api/system";

const LoginLogger: FC = () => {
  const columns: ColumnsType<ILoginLogger.ResLoginLogger> = [
    {
      title: "账号",
      dataIndex: "manager",
      key: "manager",
      render: (_, { manager }) => <span>{manager.account}</span>
    },
    { title: "ip", dataIndex: "loginIp", key: "loginIp" },
    { title: "地址", dataIndex: "loginAddress", key: "loginAddress" },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => <span>{createdAt}</span>
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, { updatedAt }) => <span>{updatedAt}</span>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" danger onClick={() => handleDel(record.id)}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const [loginLoggerList, setLoginLoggerList] = useState<ILoginLogger.ResLoginLogger[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getLoginLogger();
  }, []);

  const getLoginLogger = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getLoginLoggerList({ page, limit });
    setLoginLoggerList(list);
    setTotal(total);
  };

  const handleDel = (id: number) => {
    console.log(id);
  };

  // 改变页码的回调 page代表页码数 pageSize代表每页条数
  const handlePageChange = (page: number) => {
    getLoginLogger(page);
  };

  const handleSelectDel = () => {};

  return (
    <>
      <OperateBtn handleDel={handleSelectDel} />
      <Table
        columns={columns}
        dataSource={loginLoggerList}
        rowKey={"id"}
        pagination={{ total, onChange: page => handlePageChange(page) }}
      />
    </>
  );
};

export default LoginLogger;
