import { useState, useEffect, useRef } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { router } from 'umi';
import warning from '@/assets/warning.svg';
import { Table, message, Tooltip, Button } from 'antd';
import Nav from '@/components/Nav';
import { getDetailList, getBatchStateAPI } from '../services';
import TableHeadModal from '../components/tableHeadModal'; // 改表头弹窗
import OutputModal from '../components/outputModal'; // 导出弹窗
import Filter from '../components/detailFilter';
import styles from '../index.less';
// import uploadImg from '@/assets/check/upload.png';
import setImg from '@/assets/check/set.png';
import closeImg from '@/assets/check/close.png';

const nav = [
  {
    name: '内容检测管理 /',
    link: '/check/list',
  },
  {
    name: '详情',
  },
];

const columns = [
  {
    title: '项目编号',
    dataIndex: 'number',
    render: (text, record) => {
      return <div style={{ minWidth: '100px' }}>{record.number || '--'}</div>;
    },
  },
  {
    title: '项目名称',
    dataIndex: 'name',
    width: '300px',
  },
  {
    title: '承担单位',
    dataIndex: 'undertakingDept',
    render: (text, record) => {
      return <div style={{ minWidth: '100px' }}>{record.undertakingDept || '--'}</div>;
    },
  },
  {
    title: '报告作者',
    dataIndex: 'author',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.author || '--'}</div>;
    },
  },
  {
    title: '检测时间',
    dataIndex: 'checkStartTime',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.checkStartTime || '--'}</div>;
    },
  },
  {
    title: '检测状态',
    dataIndex: 'status',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.status || '--'}</div>;
    },
  },
  {
    title: '总相似比',
    dataIndex: 'similarity',
    render: (text, record) => {
      return <div style={{ minWidth: '60px' }}>{record.similarity || '--'}</div>;
    },
  },
  {
    title: '查看在线报告',
    dataIndex: 'report',
    render: (text, record) => {
      return (
        <>
          {record.status === '检测成功' ? (
            <div
              style={{ minWidth: '90px', cursor: 'pointer', color: '#01B2B9' }}
              onClick={() => {
                router.push(
                  `/check/detail/similar?checkId=${record.checkId}&docId=${record.docId}`,
                );
              }}
            >
              相似清单
            </div>
          ) : (
            <div style={{ minWidth: '90px' }}>--</div>
          )}
        </>
      );
    },
  },
];

export default props => {
  const { id, name } = props.location.query;
  const [listParams, setListParams] = useState({});
  const [list, setList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(columns);
  const [exportVisible, setExportVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableTotal, setTableTotal] = useState(0);
  const [pageSize, setPagesize] = useState(50);
  const [batchState, setBatchState] = useState();
  const [loading, setLoading] = useState(false); // 导出

  const tipsRef = useRef(null);

  const updateList = () => {
    const payload = {
      ...listParams,
      pageNum: currentPage,
      pageSize,
      checkId: id,
    };
    getDetailList(payload).then(res => {
      if (res) {
        const { list: tableData, total } = res;
        const arr = tableData.map(i => {
          return { ...i, key: i.docId };
        });
        setList(arr);
        setTableTotal(total);
      }
    });
  };

  const getBatchState = async () => {
    const payload = {
      id,
    };
    const res = await getBatchStateAPI(payload);
    if (res) {
      setBatchState(res);
    }
  };
  useEffect(() => {
    getBatchState();
  }, []);

  useEffect(() => {
    updateList();
  }, [listParams, currentPage, pageSize]);

  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: selectedKeys => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const selectHead = () => {
    setVisible(true);
  };

  const showExport = () => {
    if (!selectedRowKeys.length) {
      message.warn('请先勾选文件');
    } else {
      // setLoading(true)
      setExportVisible(true);
    }
  };

  const closeTip = () => {
    tipsRef.current.style.display = 'none';
  };

  const pageChange = pagination => {
    setCurrentPage(pagination.current);
    setPagesize(pagination.pageSize);
  };

  const pageConfig = {
    total: tableTotal,
    current: currentPage,
    pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: t => (
      <span>
        共<strong style={{ color: '#01B2B9' }}>{t}</strong>条
      </span>
    ),
    position: ['bottomCenter'],
  };

  const renderTips = () => {
    return (
      <div ref={tipsRef} className={styles.line}>
        <div className={styles.tips}>
          <img src={warning} className={styles.warning} alt="" />
          <div className={styles.text}>
            <span>{name}：</span>
            <span>
              检测成功 <span style={{ color: '#01B2B9' }}>{batchState['检测成功'] || 0}</span> 项，
            </span>
            <span>
              检测失败 <span style={{ color: '#EF4242' }}>{batchState['检测失败'] || 0}</span> 项，
            </span>
            <span>
              待检测报告数 <span style={{ color: '#01B2B9' }}>{batchState['待检测'] || 0}</span>{' '}
              项，
            </span>
            <span>
              检测中 <span style={{ color: '#01B2B9' }}>{batchState['检测中'] || 0}</span> 项
            </span>
            {/* {name}：检测失败<span style={{ color: '#EF4242' }}>{0}</span>项， 待检测报告数
            <span style={{ color: '#01B2B9' }}>{0}</span>项， 检测中
            <span style={{ color: '#01B2B9' }}>{0}</span>项 */}
          </div>
          <img onClick={() => closeTip()} className={styles.closeImg} src={closeImg} alt="" />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Nav data={nav} />
      <div className="duplicate_page">
        <div className={styles.titleWrap}>
          <span className={styles.title}>详情</span>
          <div className={styles.title_btns}>
            <Button
              style={{ marginRight: '20px' }}
              onClick={() => showExport()}
              type="primary"
              icon={<DownloadOutlined />}
              loading={loading}
            >
              导出
            </Button>
            <div onClick={selectHead} className={styles.imgWrap}>
              <Tooltip title="自定义表头">
                <img className={styles.setImg} src={setImg} alt="设置" />
              </Tooltip>
            </div>
          </div>
        </div>
        {batchState ? renderTips() : null}
        <Filter setCurrentPage={setCurrentPage} setListParams={setListParams} />
        <div className={styles.tableContent}>
          <div className="tableArea">
            <Table
              columns={selectedColumns}
              dataSource={list}
              pagination={pageConfig}
              rowSelection={{ ...rowSelection }}
              scroll={{ y: '50vh', x: 'max-content' }}
              onChange={pageChange}
              rowKey={record => record.docId}
            />
          </div>
        </div>
      </div>
      <TableHeadModal
        setSelectedColumns={setSelectedColumns}
        setVisible={setVisible}
        visible={visible}
      />
      <OutputModal
        checkId={id}
        data={selectedRowKeys}
        setVisible={setExportVisible}
        visible={exportVisible}
        setLoading={setLoading}
      />
    </div>
  );
};
