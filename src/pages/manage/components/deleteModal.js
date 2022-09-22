/* eslint-disable max-len */
import React from 'react';
import { Modal, message } from 'antd';
import { deleteFiles } from '../services';

export default props => {
  const { visible, data, setVisible, updateList, currentPage, setCurrentPage } = props;

  const handleOk = () => {
    deleteFiles({ id: data.join(',') }).then(() => {
      message.success('删除成功！');
      setVisible(false);
      if (currentPage === 1) {
        updateList();
      } else {
        setCurrentPage(1);
      }
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <Modal
        centered
        title="提示"
        destroyOnClose
        width="400px"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500' }}>
          确定删除勾选的<span style={{ color: '#01B2B9' }}>{data.length}</span>条数据吗？
        </div>
        <div style={{ textAlign: 'center', color: '#808080' }}>删除后数据将从对比库移除</div>
      </Modal>
    </div>
  );
};
