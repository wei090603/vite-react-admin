import { FC, useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { getNavgationList } from "@/api/navgation";
import { INavgation } from "@/api/interface";
import "./index.less";

const Navigation: FC = () => {
  const [navgationList, setNavgationList] = useState<INavgation.ResNavgationList[]>([]);

  useEffect(() => {
    getNavgation();
  }, []);

  const columns: ColumnsType<INavgation.ResNavgationList> = [
    {
      title: "导航名",
      dataIndex: "title",
      key: "title",
      render: title => <span>{title}</span>
    },
    {
      title: "链接",
      dataIndex: "link",
      key: "link"
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort"
    },
    {
      title: "创建日期",
      dataIndex: "createdAt",
      key: "createdAt"
    },
    {
      title: "更新日期",
      dataIndex: "updatedAt",
      key: "updatedAt"
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const handleEdit = (row: INavgation.ResNavgationList) => {
    console.log(row, "row");
  };

  const getNavgation = async () => {
    const data = await getNavgationList();
    setNavgationList(data);
  };

  return <Table columns={columns} dataSource={navgationList} rowKey={"id"} />;
};

export default Navigation;
