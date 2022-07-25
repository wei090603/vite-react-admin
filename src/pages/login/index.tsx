import React, { FC } from 'react';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.less';
import { fetchLogin } from '@/store/modules/user';
import { useAppDispatch } from '@/hooks';
import { HOME_URL } from '@/config/config';

export interface ILoginForm {
  account: string;
  password: string;
}
// 导入样式文件
const Login: FC = () => {
  const navigate = useNavigate();
  // 获取store中的test空间的状态变量变量
  // const { userInfo } = useAppSelector((state) => state.user)
  // 获取dispath用于向store中派发方法
  const dispatch = useAppDispatch();
  async function onFinish(values: ILoginForm) {
    await dispatch(fetchLogin(values));
    // 跳转首页
    navigate(HOME_URL, { replace: true });
  }

  return (
    <div className="login">
      <Card className="login-container">
        <h3 className="title">后台管理系统</h3>
        {/* 登录表单 */}
        {/* 子项用到的触发事件 需要在Form中都声明一下才可以 */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            remember: true,
            account: 'admin',
            password: ''
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="account"
            rules={[
              {
                required: true,
                message: '请输入账号'
              }
            ]}
          >
            <Input size="large" placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码'
              },
              {
                min: 1,
                message: '请输入密码',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
