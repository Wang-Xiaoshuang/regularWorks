import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Space, InputNumber } from 'antd';
import styles from './filter.less';

const { Option } = Select;
const lastArr = ['项目编号', '项目名称', '报告作者'];
// const statusArr = ['待检测', '检测中', '已暂停', '已完成'];
const statusArr = ['检测成功', '检测失败', '待检测', '检测中'];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const CustomizedForm = () => (
  <>
    <Row>
      <Col span={8}>
        <Form.Item label="相似度范围">
          <div className={styles.flex}>
            <Form.Item name="similarityStart">
              <InputNumber min={0} max={100} addonAfter="%" />
            </Form.Item>
            <div className={styles.line}> - </div>
            <Form.Item name="similarityEnd">
              <InputNumber min={0} max={100} addonAfter="%" />
            </Form.Item>
          </div>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="status" label="检测状态">
          <Select allowClear placeholder="请选择">
            {statusArr.map(item => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="" wrapperCol={{ offset: 1 }}>
          <div className={styles.flex}>
            <Form.Item name="lastSelect">
              <Select defaultValue="项目编号" placeholder="请选择">
                {lastArr.map(item => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="keyword">
              <div className="inputNoLeftLine">
                <Input style={{ width: '100%' }} placeholder="请输入" />
              </div>
            </Form.Item>
          </div>
        </Form.Item>
      </Col>
    </Row>
  </>
);

const formartForBackend = form => {
  const data = form.getFieldValue();
  const params = {
    status: data.status,
    similarityStart: data.similarityStart,
    similarityEnd: data.similarityEnd,
  };
  if (data.keyword) {
    if (data.lastSelect) {
      params.name = data.lastSelect === '项目名称' ? data.keyword : '';
      params.number = data.lastSelect === '项目编号' ? data.keyword : '';
      params.author = data.lastSelect === '报告作者' ? data.keyword : '';
    } else {
      params.number = data.keyword;
    }
  }
  return params;
};

const Filter = props => {
  const { setListParams, setCurrentPage } = props;
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();

  const toSearch = () => {
    const params = formartForBackend(form);
    setListParams(params);
    setCurrentPage(1);
  };

  const reset = () => {
    form.resetFields();
    setFields([]);
    setListParams();
    setCurrentPage(1);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Form
            {...formItemLayout}
            name="input_filter"
            form={form}
            fields={fields}
            onFieldsChange={(_, fieldItem) => {
              setFields(fieldItem);
            }}
          >
            <CustomizedForm />
          </Form>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="primary" onClick={toSearch}>
              查询
            </Button>
            <Button onClick={reset}>重置</Button>
          </Space>
        </div>
      </div>
    </>
  );
};

export default Filter;
