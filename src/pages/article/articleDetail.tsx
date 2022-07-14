import { FC, useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Button, Form, Input, Select, Space, message } from "antd";
import { ICategory, ITag } from "@/api/interface";
import { getCategoryAll, getTagAll } from "@/api/article";
import Editor from "@/components/Editor";
import "./index.less";

const { Option } = Select;
const ArticleDetail: FC = () => {
  // const params = useParams();
  const location = useLocation();
  const [params] = useSearchParams();
  const id = params.get("id");
  console.log(id, "id");
  console.log(location, "location");

  // isAdd: route.name === 'noticeAdd', // 新增
  // isEdit: route.name === 'noticeEdit', // 编辑

  const [categoryList, setCategoryList] = useState<ICategory.ResCategory[]>([]);
  const [tagList, setTagList] = useState<ITag.ResTag[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    _getCategoryAll();
    _getTagAll();
  }, []);

  const _getCategoryAll = async () => {
    const data = await getCategoryAll();
    setCategoryList(data);
  };

  const _getTagAll = async () => {
    const data = await getTagAll();
    setTagList(data);
  };

  const onFinish = (values: any) => {
    message.success("提交的数据为 : " + JSON.stringify(values));
    console.log(JSON.stringify(values));
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish} labelCol={{ span: 1 }}>
      <Form.Item name="title" label="标题" rules={[{ required: true, message: "请填写标题" }]}>
        <Input placeholder="前填写文章标题" />
      </Form.Item>

      <Form.Item name="category" label="分类" rules={[{ required: true, message: "请选择分类" }]}>
        <Select placeholder="请选择分类" allowClear>
          {categoryList.map(item => (
            <Option value={item.id} key={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="tag" label="标签" rules={[{ required: true, message: "请选择标签" }]}>
        <Select placeholder="请选择标签" mode="multiple" allowClear>
          {tagList.map(item => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="状态" rules={[{ required: true, message: "请选择帖子状态" }]}>
        <Select placeholder="请选择帖子状态">
          <Option value="1">打开回复</Option>
          <Option value="2">关闭回复</Option>
          <Option value="3">仅自己可见</Option>
        </Select>
      </Form.Item>
      <Form.Item name="content" label="内容" rules={[{ required: true, message: "请填写内容" }]}>
        <Editor />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 1 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ArticleDetail;
