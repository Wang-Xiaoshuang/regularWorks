import { useState, useEffect, useRef } from 'react';
import { router } from 'umi';
import { Table, Popconfirm, Progress } from 'antd';
import Filter from './components/filter';
import { getList } from './services';
import { confirm, startcheck, stopcheck, condition } from './methods';
import ConditionModal from './components/conditionModal';
import OutputModal from './components/outputModal'; // 导出弹窗
import styles from './index.less';

const CHECK_STATUS = {
  待检测: '暂停检测',
  已暂停: '开始检测',
  检测中: '暂停检测',
  已完成: '暂停检测',
  检测失败: '重新检测',
};

export default () => {
  const [listParams, setListParams] = useState({});
  const [list, setList] = useState([]);
  const [modalControl, setModal] = useState({
    conditionModal: false,
  });
  const [conditionData, setConditionData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [tableTotal, setTableTotal] = useState(0);
  const [pageSize] = useState(10);
  const [exportVisible, setExportVisible] = useState(false);
  // const [checkId, setCheckId] = useState();
  const [checkId] = useState();

  const timer = useRef();

  const updateList = () => {
    const payload = {
      ...listParams,
      pageNum: currentPage,
      pageSize,
    };
    getList(payload).then(res => {
      if (res) {
        const { list: tableData, total } = res;
        setList(tableData);
        setTableTotal(total);
        processUpdate(tableData);
      }
    });
  };

  const processUpdate = tableData => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    if (tableData && tableData.filter(i => i.status === '检测中' || i.status === '待检测').length) {
      timer.current = setInterval(() => {
        if (tableData.filter(i => i.status === '检测中' || '待检测').length) {
          updateList();
        } else {
          clearInterval(timer.current);
        }
      }, 3000);
    }
  };

  useEffect(() => {
    updateList();
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [listParams, currentPage]);

  // 操作-检测
  const check = record => {
    if (record && record.status === '已完成') {
      return;
    }
    if (record && (record.status === '已暂停' || record.status === '检测失败')) {
      startcheck(record.id, updateList, processUpdate);
      return;
    }
    if ((record && record.status === '检测中') || record.status === '待检测') {
      stopcheck(record.id, updateList);
    }
  };

  // 操作-条件
  const showCondition = record => {
    if (record.checkType === '自比') {
      return;
    }
    condition(record.id, setModal, modalControl, setConditionData);
  };

  // const exportFile = record => {
  //   if (record) {
  //     setCheckId(record.id);
  //     setExportVisible(true);
  //   }
  // };

  const Process = props => {
    const { record } = props;
    return (
      <div>
        <div className={styles.progressWrapper}>
          <div className={styles.progress}>
            <Progress size="small" strokeWidth={4} percent={record.progress} />
          </div>
          <div>{record.status === '待检测' ? '检测中' : record.status}</div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: '批次名称',
      dataIndex: 'batchName',
      ellipsis: true,
    },
    {
      title: '对比范围',
      dataIndex: 'folder',
    },
    {
      title: '检测方式',
      dataIndex: 'checkType',
      width: 90,
    },
    {
      title: '检测开始时间',
      dataIndex: 'checkStartTime',
    },
    {
      title: '检测结束时间',
      dataIndex: 'checkEndTime',
    },
    {
      title: '检测进度',
      dataIndex: 'progress',
      render: (text, record) => {
        return <Process record={record} />;
      },
    },
    {
      title: '操作',
      width: 270,
      render: (_, record) => {
        return (
          <div className={styles.options}>
            <span
              onClick={() => {
                check(record);
              }}
              className={record.status === '已完成' ? styles.gray : ''}
            >
              {CHECK_STATUS[record.status]}
            </span>
            <span
              onClick={() => router.push(`/check/detail?id=${record.id}&name=${record.batchName}`)}
            >
              详情
            </span>
            <span
              className={record.checkType === '自比' ? styles.gray : ''}
              onClick={() => {
                showCondition(record);
              }}
            >
              条件
            </span>
            {/* <span
              onClick={() => {
                exportFile(record);
              }}
            >
              导出
            </span> */}
            <Popconfirm
              title="确定删除该条数据吗？删除后该数据将从列表移除！"
              onConfirm={() => confirm(record.id, updateList)}
            >
              <span>删除</span>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const paginationConfig = {
    total: tableTotal,
    current: currentPage,
    pageSize,
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: t => (
      <span>
        共<strong style={{ color: '#01B2B9' }}>{t}</strong>条
      </span>
    ),
    position: ['bottomCenter'],
  };

  const pageChange = pagination => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="duplicate_page">
      <div className="duplicate_titleWrapper">
        <span className="title">内容检测管理</span>
      </div>
      <Filter setCurrentPage={setCurrentPage} setListParams={setListParams} />
      <div className={styles.content}>
        <div className="tableArea">
          <Table
            columns={columns}
            dataSource={list}
            pagination={paginationConfig}
            scroll={{ y: '50vh' }}
            onChange={pageChange}
            rowKey={record => record.id}
          />
        </div>
      </div>
      <OutputModal checkId={checkId} setVisible={setExportVisible} visible={exportVisible} />
      {modalControl.conditionModal ? (
        <ConditionModal
          data={conditionData}
          visible={modalControl.conditionModal}
          setVisible={setModal}
        />
      ) : null}
    </div>
  );
};
