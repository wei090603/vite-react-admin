import { FC, useState, useEffect } from "react";
import { IManager } from "@/api/interface";
import type { ColumnsType } from "antd/lib/table";
import { getManagerList } from "@/api/permission";
import { Button, Space, Table } from "antd";
import OperateBtn from "@/components/OperateBtn";

const Manager: FC = () => {
  const columns: ColumnsType<IManager.ResManagerList> = [
    {
      title: "用户名",
      dataIndex: "account",
      key: "account"
    },
    {
      title: "昵称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      render: avatar => <img width={50} height={50} src={avatar} alt="" />
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "角色",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "状态",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "备注",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => <span>{createdAt}</span>
    },
    {
      title: "更新时间",
      dataIndex: "updateAt",
      key: "updateAt",
      render: (_, { updatedAt }) => <span>{updatedAt}</span>
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const [managerList, setManagerList] = useState<IManager.ResManagerList[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    getManager();
  }, []);

  const getManager = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getManagerList({ page, limit });
    setManagerList(list);
    setTotal(total);
  };

  const handleAdd = () => {};

  const handleDel = () => {};

  const handleEdit = (row: IManager.ResManagerList) => {
    console.log(row, "row");
  };

  return (
    <>
      <OperateBtn handleAdd={handleAdd} handleDel={handleDel} />
      <Table
        columns={columns}
        dataSource={managerList}
        rowKey={"id"}
        pagination={{ total, onChange: page => getManager(page) }}
      />
    </>
  );
};

export default Manager;
