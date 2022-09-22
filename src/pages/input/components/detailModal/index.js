/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Modal, Table, Popconfirm, Space } from 'antd';
import { router } from 'umi';
import { connect } from 'dva';
import styles from './index.less';

export default connect(models => ({
  input: models.input,
}))(props => {
  const { visible, setVisible, data, dispatch, input } = props;
  const [list, setList] = useState([]);

  const toDetail = record => {
    if (record.step === 1) {
      router.push(`/input/upload?batchName=${record.batchName}`);
    } else {
      router.push(`/input/check?batchName=${record.batchName}`);
    }
  };
  const cancel = record => {
    dispatch({
      type: 'input/init',
      payload: { batchName: record.batchName },
    });
    setList(setList(Object.keys(input).map(i => input[i])));
  };
  const getProgress = record => {
    let status = '';
    if (!record) {
      return '';
    }
    const { load, step } = record;
    if (step === 1 && (load[1] === 'load' || load[1] === 'loading')) {
      status = '上传中';
    } else {
      status = '已完成';
    }
    return <span style={{ color: status === '上传中' ? '#FDA359' : '' }}>{status}</span>;
    // if (record.step === 1) {
    //   if (record.load && record.load[1] === 'loaded') {
    //     return '已完成';
    //   }
    //   return <span style={{ color: '#FDA359' }}>上传中</span>;
    // }
    // let flag = false;
    // if (record.loadList) {
    //   // eslint-disable-next-line array-callback-return
    //   Object.keys(record.loadList).map(i => {
    //     if (record[i] === true) flag = true;
    //   });
    // }
    // if (flag) return <span style={{ color: '#FDA359' }}>上传中</span>;
    // return '已完成';
  };

  const columns = [
    {
      title: '批次名称',
      dataIndex: 'batchName',
    },
    {
      title: '上传进度',
      render: (_, record) => {
        return getProgress(record);
      },
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <div className={styles.options}>
            <Space>
              <span onClick={() => toDetail(record)}>进入详情</span>
              <Popconfirm title="确定取消进程吗？" onConfirm={() => cancel(record)}>
                <span>取消进程</span>
              </Popconfirm>
            </Space>
          </div>
        );
      },
    },
  ];

  const pageConfig = {
    total: Object.keys(data).length,
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: t => (
      <span>
        共<strong style={{ color: '#01B2B9' }}>{t}</strong>条
      </span>
    ),
    position: ['bottomCenter'],
  };

  useEffect(() => {
    setVisible(visible);
    setList(Object.keys(data).map(i => data[i]));
  }, [visible]);

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Modal
        centered
        title="上传进程"
        destroyOnClose
        footer={null}
        width="840px"
        visible={visible}
        onCancel={handleCancel}
      >
        <div className={styles.content}>
          <div className="tableArea">
            <Table columns={columns} dataSource={list} pagination={pageConfig} />
          </div>
        </div>
      </Modal>
    </div>
  );
});
