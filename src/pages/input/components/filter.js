import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, DatePicker, Button, Space } from 'antd';
import { getAreaListAPI } from '../services';
import styles from './filter.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const planTypeArr = ['尖兵领雁', '重点研发', '基础公益', '人才团队', '其他'];
const docTypeArr = ['项目申报书', '科技报告', '其他'];
const levelArr = ['省级', '地市级', '县（市、区）级'];
const lastArr = [
  { key: 'batchName', value: '批次名称' },
  { key: 'number', value: '项目编号' },
  { key: 'name', value: '项目名称' },
  { key: 'author', value: '报告作者' },
];

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

const Filter = props => {
  const { setSelectedRowKeys, setListParams, setCurrentPage } = props;
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();

  const toSearch = () => {
    const values = form.getFieldValue() || {};
    const { year, planType, docType, level, area, otherKey = 'batchName', otherValue } = values;
    const params = {
      yearStart: year && year[0].format('YYYY'),
      yearEnd: year && year[1].format('YYYY'),
      planType,
      docType,
      level,
      area,
    };
    if (otherValue) {
      params[otherKey] = otherValue;
    }
    setListParams(params);
    setCurrentPage(1);
    setSelectedRowKeys([]);
  };

  const reset = () => {
    form.resetFields();
    setFields([]);
    setListParams({});
    setCurrentPage(1);
    setSelectedRowKeys([]);
  };

  const CustomizedForm = () => {
    const [areaArr, setAreaArr] = useState([]);

    // 选择项目级别后，级联项目来源地
    const selectLevel = async value => {
      if (value) {
        const payload = {
          level: value,
        };
        const res = await getAreaListAPI(payload);
        setAreaArr(res || []);
      } else {
        setAreaArr([]);
      }
      setTimeout(() => {
        form.setFieldsValue({
          area: undefined,
        });
      });
    };

    return (
      <>
        <Row>
          <Col span={8}>
            <Form.Item name="year" label="年份">
              <RangePicker picker="year" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="planType" label="计划类别">
              <Select allowClear placeholder="请选择">
                {planTypeArr.map(item => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="docType" label="报告类型">
              <Select allowClear placeholder="请选择">
                {docTypeArr.map(item => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item name="level" label="项目级别">
              <Select onChange={selectLevel} allowClear placeholder="请选择">
                {levelArr.map(item => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="area" label="项目来源地">
              <Select allowClear placeholder="请先选择项目级别">
                {areaArr && areaArr.map(item => <Option value={item}>{item}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="其他">
              <div className={styles.flex}>
                <Form.Item initialValue="batchName" name="otherKey">
                  <Select placeholder="请选择">
                    {lastArr.map(item => (
                      <Option value={item.key}>{item.value}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <div className="inputNoLeftLine">
                  <Form.Item name="otherValue">
                    <Input style={{ width: '100%' }} placeholder="请输入" />
                  </Form.Item>
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
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
            // onFieldsChange={(_, fieldItem) => {
            //   setFields(fieldItem);
            // }}
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
