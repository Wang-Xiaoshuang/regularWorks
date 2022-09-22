/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import { useState } from 'react';
import { Modal, Form, Checkbox, message } from 'antd';
import { router } from 'umi';
import { checkExportAPI } from '../services';
import warning from '@/assets/warning.svg';
import { download } from '@/utils/utils';

const CheckboxGroup = Checkbox.Group;

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

const wayArr = ['检测清单', '相似清单', '全文版', '送检输入清单', '原文'];

const GenerateCheckboxs = props => {
  const { arr, name, label, form, setWay } = props;
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = list => {
    if (setWay) {
      setWay(list.target.value);
    } else {
      setIndeterminate(!!list.length && list.length < arr.length);
      setCheckAll(list.length === arr.length);
    }
  };

  const onCheckAllChange = e => {
    if (e.target.checked) {
      form.setFields([{ name, value: arr }]);
    } else {
      form.setFields([{ name, value: [] }]);
    }
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Form.Item label={label}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={e => onCheckAllChange(e, arr)}
          checked={checkAll}
        >
          全部
        </Checkbox>
        <Form.Item name={name} noStyle>
          <CheckboxGroup options={arr} onChange={onChange} />
        </Form.Item>
      </Form.Item>
    </>
  );
};

export default props => {
  const { visible, data, setVisible, checkId, setLoading } = props;
  const [form] = Form.useForm();
  const wayCheckboxs = (
    <GenerateCheckboxs form={form} arr={wayArr} name="checkType" label="检测方式" />
  );

  const onFinish = async values => {
    const { checkType } = values;
    if (!checkType) {
      message.warning('请先选择导出类型');
      return;
    }
    const payload = {
      checkId,
      // docIdList: data,
      // exportTypeList: checkType,
      docIdList: (data && data.join(',')) || '',
      exportTypeList: checkType && checkType.join(','),
    };
    setLoading && setLoading(true)
    const res = await checkExportAPI(payload);
    if (res) {
      download(res, setLoading);
      setVisible(false);
    }

    // const params = formartForBackend(values)
    // addCheck({ ...params, checkDocIds: data.join(',') }).then(() => {
    //     setIsModalVisible(false);
    //     router.push('/check/list')
    // })
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <Modal
        centered
        title="导出检测报告"
        destroyOnClose
        width="840px"
        visible={visible}
        okText="导出"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {data && data.length ? (
          <div className="greenLine">
            <img src={warning} alt="" />
            已勾选报告数<span>{data && data.length}</span>项
          </div>
        ) : null}
        <div className="modelGreen">
          <Form form={form} name="outputForm" onFinish={onFinish} {...formItemLayout}>
            <div className="modalTitle">检测报告类别</div>
            {wayCheckboxs}
          </Form>
        </div>
      </Modal>
    </div>
  );
};
