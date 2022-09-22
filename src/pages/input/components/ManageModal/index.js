import React from 'react';
import { Modal } from 'antd';
import { addManage } from './service';
import styles from './index.less';

export default props => {
  const { manageVisible, data, setManageVisible, getList } = props;

  const handleOk = () => {
    addManage(data).then(() => {
      getList();
      setManageVisible(false);
    });
  };

  const handleCancel = () => {
    setManageVisible(false);
  };

  return (
    <>
      <Modal
        title="同步至对比库"
        centered
        visible={manageVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.content}>
          已勾选<span>{data.length}</span>项报告，是否确定同步至对比库?
        </div>
      </Modal>
    </>
  );
};
