import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Space } from 'antd';
import { transferMoment } from '@/utils/utils';
import styles from './filter.less';

const { Option } = Select;

const statusArr = ['待检测', '检测中', '已暂停', '已完成'];

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
        <Form.Item name="status" label="检测状态">
          <Select allowClear placeholder="请选择">
            {statusArr.map(item => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="batchName" label="批次名称">
          <Input placeholder="请输入" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="folder" label="对比范围">
          <Input placeholder="请输入" />
        </Form.Item>
      </Col>
    </Row>
  </>
);

const Filter = props => {
  const { setListParams, setCurrentPage } = props;
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();

  // const formartForBackend = value => {
  //   const result = {};
  //   let select = '';
  //   let keyword = '';
  //   // eslint-disable-next-line array-callback-return
  //   value.map(i => {
  //     const key = i.name[0];
  //     if (i.value) {
  //       if (key === 'year' && i.value) {
  //         result.yearStart = transferMoment('mts', 'year', i.value[0]);
  //         result.yearEnd = transferMoment('mts', 'year', i.value[1]);
  //       } else if (key === 'lastSelect') {
  //         switch (i.value) {
  //           case '项目编号':
  //             select = 'number';
  //             break;
  //           case '项目名称':
  //             select = 'name';
  //             break;
  //           case '报告作者':
  //             select = 'author';
  //             break;
  //           default:
  //             break;
  //         }
  //       } else if (key === 'keyword') {
  //         keyword = i.value;
  //       } else {
  //         result[i.name[0]] = i.value;
  //       }
  //     }
  //   });
  //   if (select) {
  //     result[select] = keyword;
  //   }
  //   return result;
  // };

  const toSearch = () => {
    // const params = formartForBackend(fields);
    // console.log('---', form.getFieldValue());
    const { batchName, status, folder } = form.getFieldValue();
    const params = {
      batchName,
      status,
      folder,
    };
    setListParams(params);
    setCurrentPage(1);
  };

  const reset = () => {
    form.resetFields();
    setFields([]);
    setListParams({});
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
