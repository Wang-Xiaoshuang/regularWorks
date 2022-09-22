import { useState, useEffect } from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import { Button, Table, message, Tabs } from 'antd';
import Filter from '../../components/filter';
import warning from '@/assets/warning.svg';
import OutputModal from '../../components/outputModal';
import DeleteModal from '../../components/deleteModal';
import DetailModal from '../../components/detailModal';
import { getList } from '../../services';
import styles from './index.less';

export default connect(models => ({
  manage: models.manage,
}))(props => {
  const { manage, setTab } = props;

  const [listParams, setListParams] = useState({});
  const [list, setList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [exportVisible, setExportVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableTotal, setTableTotal] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [loading, setLoading] = useState(false); // 导出

  const updateList = () => {
    const payload = { ...listParams, pageNum: currentPage, pageSize };
    getList(payload).then(res => {
      if (res) {
        const { total, list: tableData } = res;
        const arr = tableData.map(i => {
          return { ...i, key: i.id };
        });
        setList(arr);
        // setSelectedRowKeys([]);
        setTableTotal(total);
      }
    });
  };

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

  const columns = [
    {
      title: '批次名称',
      dataIndex: 'batchName',
      render: (text, record) => {
        return <div style={{ minWidth: '60px' }}>{record.batchName || '--'}</div>;
      },
    },
    {
      title: '年份',
      dataIndex: 'year',
    },
    {
      title: '项目编号',
      dataIndex: 'number',
      render: (text, record) => {
        return <div style={{ minWidth: '60px' }}>{record.number || '--'}</div>;
      },
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      // width: '300px',
      render: (text, record) => {
        return <div style={{ minWidth: '60px', maxWidth: '300px' }}>{record.name || '--'}</div>;
      },
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
      // width: '300px',
      render: (text, record) => {
        return <div style={{ minWidth: '60px', maxWidth: '300px' }}>{record.docName || '--'}</div>;
      },
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
      // width: '300px',
      render: (text, record) => {
        return (
          <div style={{ minWidth: '60px', maxWidth: '300px' }}>{record.docOriName || '--'}</div>
        );
      },
    },
    {
      title: '上传时间',
      dataIndex: 'syncTime',
      render: (text, record) => {
        return <div style={{ minWidth: '60px', maxWidth: '300px' }}>{record.syncTime || '--'}</div>;
      },
    },
  ];

  const pageChange = pagination => {
    const { current, pageSize: newPageSize } = pagination;
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
    current: currentPage,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '50', '100', '500'],
    // onShowSizeChange: sizeChange,
    showTotal: t => (
      <span>
        共<strong style={{ color: '#01B2B9' }}>{t}</strong>条
      </span>
    ),
    position: ['bottomCenter'],
  };

  const toExport = () => {
    if (!selectedRowKeys.length) {
      message.warn('请先勾选文件');
    } else {
      setExportVisible(true);
    }
  };

  const toDelete = () => {
    if (!selectedRowKeys.length) {
      message.warn('请先勾选文件');
    } else {
      setDeleteVisible(true);
    }
  };

  const upload = () => {
    router.push('/manage/upload');
  };

  const onTabChange = key => {
    setTab(key)
  };

  return (
    <div className="duplicate_page">

      <div className={styles.duplicate_titleWrapper}>
        <Tabs onChange={onTabChange} className={styles.manageTabs} defaultActiveKey="自建对比库">
          <Tabs.TabPane tab={<span style={{ fontSize: '18px' }}>系统数据库</span>} key="系统数据库">
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span style={{ fontSize: '18px' }}>自建对比库</span>} key="自建对比库" >
          </Tabs.TabPane>
        </Tabs>
        <span className={styles.title_btns}>
          <Button type="primary" onClick={upload}>
            文件上传
          </Button>
          <Button onClick={toExport} loading={loading}>导出</Button>
          <Button onClick={toDelete}>删除</Button>
        </span>
      </div>
      <div className={styles.line}>
        <img src={warning} className={styles.warning} alt="" />
        您有{Object.keys(manage).length}个进程正在上传解析，
        <span
          onClick={() => setDetailVisible(true)}
          style={{ color: '#01B2B9', cursor: 'pointer' }}
        >
          查看详情 {'>>'}
        </span>
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
            dataSource={list}
            pagination={pageConfig}
            rowSelection={rowSelection}
            scroll={{ y: '50vh', x: `${list && list.length ? 'max-content' : '1600px'}` }}
            onChange={pageChange}
            rowKey={record => record.id}
          />
        </div>
      </div>
      <OutputModal setLoading={setLoading} visible={exportVisible} setVisible={setExportVisible} data={selectedRowKeys} />
      <DeleteModal
        updateList={updateList}
        visible={deleteVisible}
        setVisible={setDeleteVisible}
        data={selectedRowKeys}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <DetailModal visible={detailVisible} setVisible={setDetailVisible} data={manage} />
    </div>
  );
});
