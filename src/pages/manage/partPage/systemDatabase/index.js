import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Button, Table, message, Tabs } from 'antd';
import Filter from '../../components/systemFilter';
import OutputModal from '../../components/outputModal';
import { getSystemList } from '../../services';
import styles from './index.less';

export default connect(models => ({
    manage: models.manage,
}))(props => {
    const { setTab } = props;

    const [listParams, setListParams] = useState({});
    const [list, setList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [exportVisible, setExportVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableTotal, setTableTotal] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [loading, setLoading] = useState(false); // 导出
    // const [sorter, setSorter] = useState({ sortColumn: null, sortType: null })

    const updateList = () => {
        const payload = { ...listParams, pageNum: currentPage, pageSize };
        getSystemList(payload).then(res => {
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
            title: '入库时间',
            render: (text, record) => {
                return <div style={{ minWidth: '60px', maxWidth: '300px' }}>{record.syncTime}</div>;
            },
            // sorter: true,
        },
    ];

    const pageChange = pagination => {
        const { current, pageSize: newPageSize } = pagination;
        // setSorter({
        //     sortColumn: sort.columnKey,
        //     // eslint-disable-next-line no-nested-ternary
        //     sortType: sort.order === 'ascend' ? 'asc' : sort.order === 'descend' ? 'desc' : null,
        //   })
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


    const onTabChange = key => {
        setTab(key)
    };

    return (
        <div className="duplicate_page">

            <div className={styles.duplicate_titleWrapper}>
                <Tabs onChange={onTabChange} className={styles.manageTabs} defaultActiveKey="系统数据库">
                    <Tabs.TabPane tab={<span style={{ fontSize: '18px' }}>系统数据库</span>} key="系统数据库">
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<span style={{ fontSize: '18px' }}>自建对比库</span>} key="自建对比库" >
                    </Tabs.TabPane>
                </Tabs>
                <span className={styles.title_btns}>
                    <Button type="primary" onClick={toExport} loading={loading}>导出</Button>
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
                        scroll={{ y: '55vh', x: `${list && list.length ? 'max-content' : '1600px'}` }}
                        onChange={pageChange}
                        rowKey={record => record.id}
                    />
                </div>
            </div>
            <OutputModal
                setLoading={setLoading}
                visible={exportVisible} setVisible={setExportVisible} data={selectedRowKeys}
            />
        </div>
    );
});
