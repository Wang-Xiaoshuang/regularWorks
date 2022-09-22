import React, { useState } from 'react';
import { Form, Select, Row, Col, DatePicker, Button, Space } from 'antd';
import { getAreaListAPI } from '../services';
import styles from './filter.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const planTypeArr = ['尖兵领雁', '重点研发', '基础公益', '人才团队', '其他'];
const docTypeArr = ['项目申报书', '科技报告', '其他'];
const levelArr = ['省级', '地市级', '县（市、区）级'];

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

const CustomizedForm = props => {
  const [areaArr, setAreaArr] = useState([]);
  const { form } = props;

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
          <Form.Item name="date" label="入库日期">
            <RangePicker />
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
              {areaArr.map(item => (
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
    </>
  );
};

const Filter = props => {
  const { setSelectedRowKeys, setListParams, setCurrentPage } = props;
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();
  const toSearch = () => {
    const { year, planType, date, level, area, docType } = form.getFieldValue();
    const params = {
      yearStart: year && year[0].format('YYYY'),
      yearEnd: year && year[1].format('YYYY'),
      planType,
      syncStartTime: date && date[0].format('YYYY-MM-DD'),
      syncEndTime: date && date[1].format('YYYY-MM-DD'),
      level,
      area,
      docType,
    };
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
            <CustomizedForm form={form} />
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
