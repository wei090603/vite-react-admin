import { FC, useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Button, Form, Input, Select, Space, message } from 'antd';
import { ICategory, ITag } from '@/api/interface';
import { createArticle, getArticleDetail, getCategoryAll, getTagAll } from '@/api/article';
import Editor from '@/components/Editor';
import MyUpload from '@/components/Upload';

import './index.less';

const { Option } = Select;
const ArticleDetail: FC = () => {
  // const params = useParams();
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  // const isAdd = pathname === "/article/add"; // 新增
  const isEdit = pathname === '/article/edit'; // 编辑

  // const [articleDetail, setArticleDetail] = useState<IArticle.ResArticleList>({});

  const [categoryList, setCategoryList] = useState<ICategory.ResCategory[]>([]);
  const [tagList, setTagList] = useState<ITag.ResTag[]>([]);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    _getCategoryAll();
    _getTagAll();
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
    const data = await getArticleDetail(params.get('id')!);
    setFormData(data);
    console.log(data, formData, 'data');
  };

  const onFinish = async (values: any) => {
    message.success('提交的数据为 : ' + JSON.stringify(values));
    values.type = 0;
    values.image = values.image.map((item: any) => item.response.data.filename);
    console.log(values);
    await createArticle(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
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
          <Option value="1">打开回复</Option>
          <Option value="2">关闭回复</Option>
          <Option value="3">仅自己可见</Option>
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
