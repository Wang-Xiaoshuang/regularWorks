import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Alert, Carousel } from 'antd';
import styles from './login.less';

const calarray = [
  { title: '产业地图', subTitle: ['全球产业链精准合作招商平台'] },
  {
    title: '智能项目管理',
    subTitle: ['行程与记录工具、报送、初审、研判进度', '实时掌握团队组织，项目管理更智能更快捷'],
  },
  { title: '智慧招商', subTitle: ['大数据招商解决方案'] },
];
@connect(({ loading }) => ({
  loading,
}))
class LoginPageForm extends Component {
  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/login',
          payload: { ...values, errorCallBack: this.errorCallBack },
        });
      }
    });
  };

  errorCallBack = error => {
    this.setState({
      error,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { error } = this.state;
    const { loading } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <Carousel autoplay>
              {calarray.map((v, idx) => {
                const clas = `cal${idx.toString()}`;
                return (
                  <div className={`${styles.back} ${styles[clas]}`} key={idx.toString()}>
                    <div className={styles.calTitle}>{v.title}</div>
                    {v.subTitle.map(m => (
                      <div className={styles.calSubTitle} key={m}>
                        {m}
                      </div>
                    ))}
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className={styles.right}>
            <div className={styles.main}>
              <Form
                onSubmit={this.handleSubmit}
                colon={false}
                className="login-form"
                hideRequiredMark
              >
                <Form.Item>
                  <div className={styles.title1}>欢迎登录</div>
                  <div className={styles.title}>浙江省工业和信息化</div>
                  <div className={styles.title}>精准合作重点项目平台</div>
                </Form.Item>
                {error ? <Form.Item>{this.renderMessage(error)}</Form.Item> : null}
                <Form.Item label="手机号码" style={{ marginBottom: '0.8rem' }}>
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入手机号码"
                  />
                </Form.Item>
                <Form.Item label="密码">
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />
                </Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const LoginPage = Form.create({ name: 'normal_login' })(LoginPageForm);

export default LoginPageForm;
