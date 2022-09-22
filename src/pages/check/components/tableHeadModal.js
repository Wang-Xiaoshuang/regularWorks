import { useState } from 'react';
import { Modal, Checkbox, Row, Col, message } from 'antd';
import styles from './tableHeadModal.less';
import { router } from 'umi';

const CheckboxGroup = Checkbox.Group;
const TABLE_FIELD = [
  '项目编号',
  '项目名称',
  '承担单位',
  '报告作者',
  '检测时间',
  '检测状态',
  '总相似比',
  '查看在线报告',
  '项目来源地',
  '报告作者单位',
  '上传时间',
  '报告名称',
  '报告文件名称',
  '报告类型',
  '计划类别',
  '年份',
];
const DEFAULT_TABLE_FIELD = ['项目编号', '项目名称', '承担单位', '报告作者', '检测时间'];

const DATA_INDEX = {
  项目编号: {
    title: '项目编号',
    dataIndex: 'number',
    render: (text, record) => {
      return <div style={{ minWidth: '100px' }}>{record.number || '--'}</div>;
    },
  },
  项目名称: {
    title: '项目名称',
    dataIndex: 'name',
    width: '300px',
  },
  承担单位: {
    title: '承担单位',
    dataIndex: 'undertakingDept',
    render: (text, record) => {
      return <div style={{ minWidth: '100px' }}>{record.undertakingDept || '--'}</div>;
    },
  },
  报告作者: {
    title: '报告作者',
    dataIndex: 'author',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.author || '--'}</div>;
    },
  },
  检测时间: {
    title: '检测时间',
    dataIndex: 'checkStartTime',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.checkStartTime || '--'}</div>;
    },
  },
  检测状态: {
    title: '检测状态',
    dataIndex: 'status',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.status || '--'}</div>;
    },
  },
  总相似比: {
    title: '总相似比',
    dataIndex: 'similarity',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.similarity || '--'}</div>;
    },
  },
  查看在线报告: {
    title: '查看在线报告',
    dataIndex: 'report',
    render: (text, record) => {
      return (
        <>
          {record.status === '检测成功' ? (
            <span
              style={{ minWidth: '60px', cursor: 'pointer', color: '#01B2B9' }}
              onClick={() => {
                router.push(
                  `/check/detail/similar?checkId=${record.checkId}&docId=${record.docId}`,
                );
              }}
            >
              相似清单
            </span>
          ) : (
            <div style={{ minWidth: '90px' }}>--</div>
          )}
        </>
      );
    },
  },
  项目来源地: {
    title: '项目来源地',
    dataIndex: 'area',
    render: (text, record) => {
      return <div style={{ minWidth: '75px' }}>{record.area || '--'}</div>;
    },
  },
  报告作者单位: {
    title: '报告作者单位',
    dataIndex: 'authorDept',
    render: (text, record) => {
      return <div style={{ minWidth: '90px' }}>{record.authorDept || '--'}</div>;
    },
  },
  上传时间: {
    title: '上传时间',
    dataIndex: 'createTime',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.createTime || '--'}</div>;
    },
  },
  报告名称: {
    title: '报告名称',
    dataIndex: 'docName',
    render: (text, record) => {
      return <div style={{ minWidth: '60px', maxWidth: '300px' }}>{record.docName || '--'}</div>;
    },
  },
  报告文件名称: {
    title: '报告文件名称',
    dataIndex: 'docOriName',
    render: (text, record) => {
      return <div style={{ minWidth: '90px' }}>{record.docOriName || '--'}</div>;
    },
  },
  报告类型: {
    title: '报告类型',
    dataIndex: 'docType',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.docType || '--'}</div>;
    },
  },
  计划类别: {
    title: '计划类别',
    dataIndex: 'planType',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.planType || '--'}</div>;
    },
  },
  年份: {
    title: '年份',
    dataIndex: 'year',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.year || '--'}</div>;
    },
  },
};

export default props => {
  const { visible, setVisible, setSelectedColumns } = props;
  const [checkedList, setCheckedList] = useState(DEFAULT_TABLE_FIELD);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const fieldToDataIndex = list => {
    return list.map(item => {
      return DATA_INDEX[item];
    });
  };

  const handleOk = () => {
    if (checkedList.length < 1) {
      message.warning('请先选择表头');
      return;
    }
    const list = fieldToDataIndex(checkedList);
    setSelectedColumns(list);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // 选择复选框
  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < TABLE_FIELD.length);
    setCheckAll(list.length === TABLE_FIELD.length);
  };

  // 全选复选框
  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? TABLE_FIELD : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const renderCheckbox = () => {
    return (
      <>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          全选
        </Checkbox>
        <CheckboxGroup style={{ width: '100%' }} value={checkedList} onChange={onChange}>
          <Row>
            {TABLE_FIELD.map(item => (
              <Col md={6}>
                <Checkbox checked={checkAll} value={item}>
                  <div className={styles.field}>{item}</div>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </CheckboxGroup>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <div className={styles.footer}>
        <div className={`${styles.button} ${styles.cancel}`} onClick={handleCancel}>
          取消
        </div>
        <div
          className={`${styles.button} ${styles.ok}`}
          key="submit"
          type="primary"
          onClick={handleOk}
        >
          确定
        </div>
      </div>
    );
  };

  return (
    <div>
      <Modal
        centered
        title="自定义表头"
        destroyOnClose
        width="840px"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={renderFooter()}
      >
        <div className={styles.content}>
          <div className={styles.title}>选择表头字段：</div>
          {renderCheckbox()}
        </div>
      </Modal>
    </div>
  );
};
