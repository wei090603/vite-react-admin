import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Button, Form, Input, Select, Space, message } from 'antd';
import { IArticle, ICategory, ITag } from '@/api/interface';
import { createArticle, getArticleDetail, getCategoryAll, getTagAll, putArticle } from '@/api/article';
import Editor from '@/components/Editor';
import MyUpload from '@/components/Upload';

import './index.less';

const { Option } = Select;
const ArticleDetail: FC = () => {
  // const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const [id, setId] = useState<number | null>(null);

  // const isAdd = pathname === "/article/add"; // 新增
  const isEdit = pathname === '/article/edit'; // 编辑

  const [categoryList, setCategoryList] = useState<ICategory.ResCategory[]>([]);
  const [tagList, setTagList] = useState<ITag.ResTag[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    _getCategoryAll();
    _getTagAll();
    const id = Number(params.get('id'));
    setId(id);
    if (isEdit) {
      getArticle();
    }
  }, []);

  const _getCategoryAll = async () => {
    const data = await getCategoryAll();
    setCategoryList(data);
  };

  const _getTagAll = async () => {
    const data = await getTagAll();
    setTagList(data);
  };

  const getArticle = async () => {
    const { title, tag, category, image, status } = await getArticleDetail(params.get('id')!);
    const tagList = tag.map(item => item.id);
    form.setFieldsValue({ title, tag: tagList, category: category.id, image, status });
  };

  const onFinish = async (values: any) => {
    const params: IArticle.ReqArticleParams = {
      status: values.status,
      title: values.title,
      image: values.image.map((item: any) => item.response.data.filename),
      content: values.content,
      category: values.category,
      tag: values.tag
    };
    id ? await putArticle(id, params) : await createArticle(params);
    message.success(id ? '修改成功' : '新增成功');
    navigate(-1);
  };

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish} labelCol={{ span: 1 }} initialValues={{ image: [], content: '' }}>
      <Form.Item name="title" label="标题" rules={[{ required: true, message: '请填写标题' }]}>
        <Input placeholder="前填写文章标题" />
      </Form.Item>

      <Form.Item name="category" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
        <Select placeholder="请选择分类" allowClear>
          {categoryList.map(item => (
            <Option value={item.id} key={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="tag" label="标签" rules={[{ required: true, message: '请选择标签' }]}>
        <Select placeholder="请选择标签" mode="multiple" allowClear>
          {tagList.map(item => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择帖子状态' }]}>
        <Select placeholder="请选择帖子状态">
          <Option value={1}>打开回复</Option>
          <Option value={2}>关闭回复</Option>
          <Option value={3}>仅自己可见</Option>
        </Select>
      </Form.Item>
      <Form.Item label="图片" name="image" getValueFromEvent={normFile} extra="">
        <MyUpload />
      </Form.Item>
      <Form.Item name="content" label="内容" rules={[{ required: true, message: '请填写内容' }]}>
        <Editor />
      </Form.Item>
      {/* <Form.Item label="状态" name="status" valuePropName="checked">
        <Switch checkedChildren="开启" unCheckedChildren="禁用" />
      </Form.Item> */}
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
