/* eslint-disable max-len */
import { Modal } from 'antd';
import styles from './conditionModal.less'

const list = [
  { name: '检测方式', value: 'checkType' },
  { name: '对比库时间范围', value: 'yearStart', value2: 'yearEnd' },
  { name: '项目计划类别', value: 'planType' },
  { name: '报告类型', value: 'docType' },
  { name: '项目级别', value: 'level' },
  { name: '项目来源地', value: 'area' },
  { name: '对比范围', value: 'folder' },
];

export default props => {
  const { visible, data, setVisible } = props;
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Modal
        centered
        title="条件详情"
        destroyOnClose
        width="500px"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <>
          {list.map(item => {
            if (data[item.value]) {
              if (item.name !== '对比库时间范围') {
                return (
                  <div>
                    {item.name}：{data[item.value]}
                  </div>
                );
              }
              return (
                <div>
                  {item.name}：{data[item.value]} - {data[item.value2]}
                </div>
              );
            }
            return null;
          })}
          {data?.affectedBatch?.systemBatch ? <div className={styles.flex}>
            <div className={styles.grey}>系统数据库：</div>
            <div>{data?.affectedBatch?.systemBatch?.join('、')}</div>
          </div> : null}
          {data?.affectedBatch?.comparisonBatch ? <div className={styles.flex}>
            <div className={styles.grey}>自建对比库：</div>
            <div>{data?.affectedBatch?.comparisonBatch?.join('、')}</div>
          </div> : null}
        </>
      </Modal>
    </div>
  );
};
