import { useRequest } from 'ahooks';
import { Form, Input, Button } from 'antd';
import IconFont from '@/components/Icon';
import { loginUp } from './service';
import { setAuthority } from '@/utils/authority';
import Left from './Left';

import styles from './index.less';

const Login = () => {
  const { run, loading } = useRequest(loginUp, {
    manual: true,
    onSuccess: res => {
      setAuthority(res.token);
      window.location.href = '/';
    },
  });

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <Left />
      </div>
      <div className={styles.right}>
        <div className={styles.formWrap}>
          <div className={styles.title}>
            <span className={styles.underscore}>帐号密码</span>登录
          </div>
          <Form name="basic" onFinish={run} autoComplete="off" size="large">
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<IconFont type="iconyonghu" />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<IconFont type="iconmima" />} />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
