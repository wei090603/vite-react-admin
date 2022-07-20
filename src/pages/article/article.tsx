import { FC, useEffect, useState } from "react";
import { getArticle } from "@/api/article";
import { IArticle } from "@/api/interface";
import { Table, Tag, Button, Space } from "antd";
import type { ColumnsType } from "antd/lib/table";
import OperateBtn from "@/components/OperateBtn";
import { useNavigate } from "react-router-dom";

const Article: FC = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<IArticle.ResArticleList> = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: title => <span>{title}</span>
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
      render: category => <Tag color="green">{category?.title}</Tag>
    },
    {
      title: "标签",
      key: "tag",
      dataIndex: "tag",
      render: (_, { tag }) => (
        <>
          {tag.map(item => {
            return (
              <Tag color="green" key={item.id}>
                {item.name}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: "点赞",
      dataIndex: "likes",
      key: "likes"
    },
    {
      title: "评论",
      dataIndex: "comments",
      key: "comments"
    },
    {
      title: "阅读",
      dataIndex: "reading",
      key: "reading"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: status => <span>{status}</span>
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      render: (_, { author }) => <span>{author.nickName}</span>
    },
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
          <Button type="primary" onClick={() => handleEdit(record.id)}>
            编辑
          </Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const [articleList, setArticleList] = useState<IArticle.ResArticleList[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    _getArticle();
  }, []);

  const _getArticle = async (page: number = 1, limit: number = 10) => {
    const { list, total } = await getArticle({ page, limit });
    setArticleList(list);
    setTotal(total);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  // const hasSelected = selectedRowKeys.length > 0;

  const handleAdd = () => {
    navigate("/article/add");
  };

  const handleDel = () => {
    navigate("/article/add");
  };

  const handleEdit = (id: number) => {
    // navigate(`/article/edit/${id}`);
    navigate(`/article/edit?id=${id}`);
  };

  // 改变页码的回调 page代表页码数 pageSize代表每页条数
  const handlePageChange = (page: number) => {
    _getArticle(page);
  };

  return (
    <>
      <OperateBtn handleAdd={handleAdd} handleDel={handleDel} />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={articleList}
        rowKey={"id"}
        pagination={{ total, onChange: page => handlePageChange(page) }}
      />
    </>
  );
};

export default Article;
