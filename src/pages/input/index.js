import { useState, useEffect, useRef } from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import { Button, Table, message } from 'antd';
import Filter from './components/filter';
import warning from '@/assets/warning.svg';
// import closeImg from '@/assets/check/close.png';
import SimilarModel from './components/similarModel';
import ManageModal from './components/ManageModal';
import DetailModal from './components/detailModal';
import { getListAPI } from './services';
import styles from './index.less';

export default connect(models => ({
  input: models.input,
}))(props => {
  const { input } = props;
  const [listParams, setListParams] = useState({ pageNum: 1, pageSize: 10 });
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [similarVisible, setSimilarVisible] = useState(false);
  const [manageVisible, setManageVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableTotal, setTableTotal] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [sorter, setSorter] = useState({ sortColumn: null, sortType: null })
  const tipsRef = useRef(null);

  const getList = () => {
    getListAPI({ ...listParams, pageNum: currentPage, pageSize, ...sorter }).then(res => {
      if (res) {
        const { total, list } = res;
        const arr = list.map(i => {
          return { ...i, key: i.id };
        });
        setTableData(arr);
        // setSelectedRowKeys([]);
        setTableTotal(total);
      }
    });
  };

  useEffect(() => {
    getList();
  }, [listParams, currentPage, pageSize, sorter]);

  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: selectedKeys => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: '批次名称',
      dataIndex: 'batchName',
      fixed: 'left',
    },
    {
      title: '年份',
      dataIndex: 'year',
      fixed: 'left',
    },
    {
      title: '项目编号',
      dataIndex: 'number',
      fixed: 'left',
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      width: '300px',
      fixed: 'left',
    },
    {
      title: '计划类别',
      dataIndex: 'planType',
      render: (text, record) => {
        return <div style={{ minWidth: '60px' }}>{record.planType || '--'}</div>;
      },
    },
    {
      title: '承担单位',
      dataIndex: 'undertakingDept',
      render: (text, record) => {
        return <div style={{ minWidth: '60px' }}>{record.undertakingDept || '--'}</div>;
      },
    },
    {
      title: '项目级别',
      dataIndex: 'level',
      render: (text, record) => {
        return <div style={{ minWidth: '60px' }}>{record.level || '--'}</div>;
      },
    },
    {
      title: '报告名称',
      dataIndex: 'docName',
      width: '300px',
    },
    {
      title: '报告作者单位',
      dataIndex: 'authorDept',
      render: (text, record) => {
        return <div style={{ minWidth: '90px' }}>{record.authorDept || '--'}</div>;
      },
    },
    {
      title: '报告作者',
      dataIndex: 'author',
      render: (text, record) => {
        return <div style={{ minWidth: '60px', maxWidth: '300px' }}>{record.author || '--'}</div>;
      },
    },
    {
      title: '报告类型',
      dataIndex: 'docType',
      render: (text, record) => {
        return <div style={{ minWidth: '60px' }}>{record.docType || '--'}</div>;
      },
    },
    {
      title: '项目来源地',
      dataIndex: 'area',
      render: (text, record) => {
        return <div style={{ minWidth: '75px' }}>{record.area || '--'}</div>;
      },
    },
    {
      title: '文件名称',
      dataIndex: 'docOriName',
      width: '300px',
    },
    {
      title: '初次上传时间',
      dataIndex: 'createTime',
      key: 'create_time',
      render: (text, record) => {
        return <div style={{ minWidth: '60px', maxWidth: '300px' }}>{record.syncTime || '--'}</div>;
      },
      sorter: true,
    },
    {
      title: '最新上传时间',
      dataIndex: 'updateTime',
      key: 'update_time',
      render: (text, record) => {
        return <div style={{ minWidth: '60px', maxWidth: '300px' }}>{record.syncTime || '--'}</div>;
      },
      sorter: true,
    },
  ];

  const pageChange = (pagination, _, sort) => {
    const { current, pageSize: newPageSize } = pagination;
    // console.log(sort)
    setSorter({
      sortColumn: sort.columnKey,
      // eslint-disable-next-line no-nested-ternary
      sortType: sort.order === 'ascend' ? 'asc' : sort.order === 'descend' ? 'desc' : null,
    })
    if (pageSize !== newPageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    } else {
      setCurrentPage(current);
    }
  };

  const pageConfig = {
    total: tableTotal,
    pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    current: currentPage,
    pageSizeOptions: ['10', '50', '100', '500'],
    // onShowSizeChange: sizeChange,
    showTotal: t => (
      <span>
        共<strong style={{ color: '#01B2B9' }}>{t}</strong>条
      </span>
    ),
    position: ['bottomCenter'],
  };

  const upload = () => {
    router.push('/input/upload');
  };

  const toSimilar = () => {
    if (!selectedRowKeys.length) {
      message.warn('请先勾选文件');
    } else {
      setSimilarVisible(true);
    }
  };
  const toManange = () => {
    if (!selectedRowKeys.length) {
      message.warn('请先勾选文件');
    } else {
      setManageVisible(true);
    }
  };

  return (
    <div className="duplicate_page">
      <div className="duplicate_titleWrapper">
        <span className="title">送检数据录入</span>
        <span className={styles.title_btns}>
          <Button type="primary" onClick={upload}>
            批量文件上传
          </Button>
          <Button onClick={toSimilar}>相似度检测</Button>
          <Button onClick={toManange}>同步至对比库</Button>
        </span>
      </div>
      <div ref={tipsRef} className={styles.line}>
        <div className={styles.tipWrap}>
          <img src={warning} className={styles.warning} alt="" />
          您有<span className={styles.num}>{Object.keys(input).length}</span>个进程正在上传解析，
          <span onClick={() => setDetailVisible(true)} className={styles.detail}>
            查看详情 {'>>'}
          </span>
        </div>
        {/* <img onClick={() => closeTip()} className={styles.closeImg} src={closeImg} alt="" /> */}
      </div>
      <Filter
        setSelectedRowKeys={setSelectedRowKeys}
        setCurrentPage={setCurrentPage}
        setListParams={setListParams}
      />
      <div className={styles.content}>
        <div className="tableArea">
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={pageConfig}
            rowSelection={{ ...rowSelection }}
            scroll={{ y: '50vh', x: `${tableData && tableData.length ? 'max-content' : '2300px'}` }}
            onChange={pageChange}
            rowKey={record => record.id}
          />
        </div>
      </div>

      <SimilarModel
        visible={similarVisible}
        setVisible={setSimilarVisible}
        data={selectedRowKeys}
      />
      <ManageModal
        manageVisible={manageVisible}
        setManageVisible={setManageVisible}
        data={selectedRowKeys}
        getList={getList}
      />
      <DetailModal visible={detailVisible} setVisible={setDetailVisible} data={input} />
    </div>
  );
});
