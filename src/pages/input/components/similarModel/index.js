/* eslint-disable max-len */
import { useState } from 'react';
import warning from '@/assets/warning.svg';
import { Modal, Form, Checkbox, DatePicker, Input } from 'antd';
import { router } from 'umi';
import Grid from './components/grid';
import { addCheck, beforeAdd } from './service';
import styles from './index.less';
import { planTypeArr1, planTypeArr2, docTypeArr, wayArr, formItemLayout, SELECTAREA, CHECKLIST, table } from './datas'
import GenerateCheckboxs from './components/checkboxs'
import { getAreaListAPI } from '../../services';

const CheckboxGroup = Checkbox.Group;

const { RangePicker } = DatePicker;


export default props => {
  const { visible, data, setVisible } = props;
  const [form] = Form.useForm();
  const [secVisible, setSecVisible] = useState(false)
  const [way, setWay] = useState('对比'); // 自比
  const [database, setDatabase] = useState({ 系统数据库: true, 自建对比库: true })
  const [selectArea, setSelectArea] = useState(SELECTAREA);
  // 批次
  const [batch, setBatch] = useState({})

  const wayCheckboxs = (
    <GenerateCheckboxs radio arr={wayArr} name="checkType" label="检测方式" setWay={setWay} />
  );
  const planTypeCheckboxs1 = disable => {
    return <GenerateCheckboxs disable={disable} arr={planTypeArr1} name="systemPlanType" label="项目计划类别" form={form} />
  };
  const planTypeCheckboxs2 = disable => {
    return <GenerateCheckboxs disable={disable} arr={planTypeArr2} name="planType" label="项目计划类别" form={form} />
  };
  const docTypeArrCheckboxs = (name, disable) => {
    return <GenerateCheckboxs disable={disable} arr={docTypeArr} name={name} label="报告类型" form={form} />
  };

  const changeLevel = async (e, key) => {
    const { checked } = e.target;
    if (checked) {
      const payload = {
        level: key,
      };
      const res = await getAreaListAPI(payload);
      if (res) {
        const obj = { ...selectArea };
        obj[key] = res;
        setSelectArea(obj);
      }
    } else {
      const obj = { ...selectArea };
      obj[key] = '';
      setSelectArea(obj);
    }
  };

  const renderLevel = disable => {
    return (
      <>
        <Form.Item label="项目级别">
          <Form.Item name="level" noStyle>
            <CheckboxGroup>
              {CHECKLIST.map(item => {
                return (
                  <>
                    {/* 一级 */}
                    <Checkbox disabled={disable} value={item.value} onChange={e => changeLevel(e, item.value)}>
                      {item.value}
                    </Checkbox>
                    {/* 二级 */}
                    {selectArea[item.value] && selectArea[item.value].length > 0 ? (
                      <div className={styles.secondCheck}>
                        <Form.Item noStyle name={item.name}>
                          <CheckboxGroup disabled={disable} options={selectArea[item.value] || []} />
                        </Form.Item>
                      </div>
                    ) : (
                      <div />
                    )}
                  </>
                );
              })}
            </CheckboxGroup>
          </Form.Item>
        </Form.Item>
      </>
    );
  };

  const SystemDatabaseValue = propss => {
    const { disable } = propss
    return (
      <div>
        <Form.Item name="systemYear" label="对比库时间范围">
          <RangePicker picker="year" disabled={disable} />
        </Form.Item>
        {planTypeCheckboxs1(disable)}
        {docTypeArrCheckboxs('systemDocType', disable)}
      </div>
    )
  }

  const MyComparisonLibrary = propss => {
    const { disable } = propss
    return (
      <div>
        <Form.Item name="year" label="对比库时间范围">
          <RangePicker picker="year" disabled={disable} />
        </Form.Item>
        {planTypeCheckboxs2(disable)}
        {docTypeArrCheckboxs('docType', disable)}
        {renderLevel(disable)}
      </div>
    )
  }

  const getPayload = value => {
    const { checkType, year, planType, docType, level, province, city, district, folder, systemDocType, systemPlanType, systemYear } = value;
    let areaArr = [];
    if (province) {
      areaArr = [...areaArr, ...province];
    }
    if (city) {
      areaArr = [...areaArr, ...city];
    }
    if (district) {
      areaArr = [...areaArr, ...district];
    }
    const params = {
      checkType,
      isComparison: !database.自建对比库 ? 1 : 0,
      isSystem: !database.系统数据库 ? 1 : 0,
      yearStart: year && year[0].format('YYYY'),
      yearEnd: year && year[1].format('YYYY'),
      systemYearStart: systemYear && systemYear[0].format('YYYY'),
      systemYearEnd: systemYear && systemYear[1].format('YYYY'),
      planType: planType ? planType.join(',') : '',
      systemPlanType: systemPlanType ? systemPlanType.join(',') : '',
      docType: docType ? docType.join(',') : '',
      systemDocType: systemDocType ? systemDocType.join(',') : '',
      level: level ? level.join(',') : '',
      area: areaArr ? areaArr.join(',') : '',
      folder,
    };

    const payload = {
      ...params,
      checkDocIds: data.join(','),
    };
    return payload
  }

  const onFinish = () => {
    const value = form.getFieldValue() || {};
    const payload = getPayload(value)
    beforeAdd(payload).then(res => {
      if (res) {
        setBatch(res)
      }
    })
    setSecVisible(true)
    setVisible(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const secHandleOk = () => {
    // form.submit();
    const value = form.getFieldValue() || {};
    const payload = getPayload(value)
    addCheck(payload).then(() => {
      setSecVisible(false);
      router.push('/check/list');
    });
  };

  const handleCancel = () => {
    setVisible(false);
    // 清空所有状态
    form.resetFields()
    setWay('对比')
    setDatabase({ 系统数据库: true, 自建对比库: true })
    setSelectArea(SELECTAREA)
  };

  const secHandleCancel = () => {
    setSecVisible(false)
    setVisible(true)
  };


  const changeDatabase = (e, key) => {
    const { checked } = e.target;
    const obj = { ...database }
    obj[key] = !checked
    setDatabase({ ...obj })
  };

  const condition = [
    {
      label: <Checkbox value="系统数据库" onChange={e => changeDatabase(e, '系统数据库')}>
        系统数据库
      </Checkbox>,
      value: <SystemDatabaseValue disable={database.系统数据库} />,

    },
    {
      label: <Checkbox value="自建对比库" onChange={e => changeDatabase(e, '自建对比库')}>
        自建对比库
      </Checkbox>,
      value: <MyComparisonLibrary disable={database.自建对比库} />,
    },
  ]

  return (
    <>
      <Modal
        centered
        title="相似性检测"
        destroyOnClose
        width="840px"
        visible={visible}
        okText="提交检测"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="greenLine">
          <img src={warning} alt="" />
          已勾选报告数<span>{data.length}</span>项
        </div>
        <div className={styles.content}>
          <Form form={form} name="similarForm" onFinish={onFinish} {...formItemLayout}>
            <div className="modalTitle">设置检测方式</div>
            {wayCheckboxs}
            {way === '对比' ? (
              <div className={styles.condition}>
                <div className="modalTitle">设置检测条件</div>
                <Grid style={{ margin: '9px 0 15px' }} table={condition} />
              </div>
            ) : null}
            <div className="modalTitle">设置对比范围</div>
            <Form.Item
              name="folder"
              label="对比范围"
              rules={[{ required: true, message: '请设置对比范围' }]}
            >
              <Input style={{ width: 240 }} placeholder="请输入" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        centered
        title="相似性检测"
        destroyOnClose
        width="840px"
        visible={secVisible}
        cancelText="上一步"
        okText="提交"
        onOk={secHandleOk}
        onCancel={secHandleCancel}
      >
        <div className={styles.bold}>您已选中以下对比库中批次进行对比，是否确认提交检测？</div>
        <div className={styles.flex}>
          <div className={styles.grey}>系统数据库：</div>
          <div>{batch?.systemBatch?.join('、')}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.grey}>自建对比库：</div>
          <div>{batch?.comparisonBatch?.join('、')}</div>
        </div>
      </Modal>
    </>
  );
};
