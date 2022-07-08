import { FC, useState, useEffect } from "react";
import { IRoles } from "@/api/interface";
import type { ColumnsType } from "antd/lib/table";
import { getRolesList } from "@/api/permission";
import { Button, Space, Table } from "antd";
import OperateBtn from "@/components/operateBtn";

const Role: FC = () => {
  const columns: ColumnsType<IRoles.ResRolesList> = [
    {
      title: "角色名",
      dataIndex: "roleName",
      key: "roleName"
    },
    {
      title: "标识",
      dataIndex: "mark",
      key: "mark"
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark"
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
          <Button type="primary" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="primary">分配权限</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const [rolesList, setRolesList] = useState<IRoles.ResRolesList[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getRolesList({ page, limit });
    setRolesList(list);
    setTotal(total);
  };

  const handleAdd = () => {};

  const handleDel = () => {};

  const handleEdit = (row: IRoles.ResRolesList) => {
    console.log(row, "row");
  };

  return (
    <>
      <OperateBtn handleAdd={handleAdd} handleDel={handleDel} />
      <Table columns={columns} dataSource={rolesList} rowKey={"id"} pagination={{ total, onChange: page => getRoles(page) }} />
    </>
  );
};

export default Role;
