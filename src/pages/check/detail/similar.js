import React, { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import { Table } from 'antd';
import styles from '../index.less';
import { getSimilarListAPI } from '../services';
import { output } from '../methods';

const nav = [
  {
    name: '内容检测管理 /  ',
    link: '/check/list',
  },
  {
    name: ' 详情 / ',
    link: 'back',
  },
  {
    name: '相似清单',
  },
];

const Similar = props => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableTotal, setTableTotal] = useState(0);
  const [pageSize] = useState(10);

  const getList = async () => {
    const { checkId, docId } = props.location.query;

    const payload = {
      checkId,
      docId,
      pageNum: currentPage,
      pageSize,
    };
    const res = await getSimilarListAPI(payload);
    if (res) {
      const { total, list: tableData } = res;
      setList(tableData);
      setTableTotal(total);
    }
  };

  useEffect(() => {
    getList();
  }, [currentPage]);

  const pageChange = pagination => {
    setCurrentPage(pagination.current);
  };

  const download = () => {
    const { checkId, docId } = props.location.query;
    output(checkId, [docId], ['相似清单']);
  };

  const columns = [
    {
      title: '送检报告编号',
      dataIndex: 'number',
    },
    {
      title: '送检报告名称',
      dataIndex: 'docName',
    },
    {
      title: '送检报告承担单位',
      dataIndex: 'undertakingDept',
    },
    {
      title: '送检报告作者',
      dataIndex: 'author',
    },
    {
      title: '相似报告编号',
      dataIndex: 'similarNumber',
    },
    {
      title: '相似报告标题',
      dataIndex: 'similarDocName',
    },
    {
      title: '相似报告作者',
      dataIndex: 'similarAuthor',
    },
    { title: '相似报告承担单位', dataIndex: 'similarUndertakingDept' },
    { title: '总相似比', dataIndex: 'similarity' },
  ];

  const pageConfig = {
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

  return (
    <div>
      <Nav data={nav} />
      <div className="duplicate_page">
        <div className="duplicate_titleWrapper hasRight">
          <span className="title">相似清单</span>
          <span onClick={download} className="download">
            下载
          </span>
        </div>
        <div className={styles.similarContent}>
          <div className="tableArea">
            <Table
              columns={columns}
              dataSource={list}
              pagination={pageConfig}
              onChange={pageChange}
              rowKey={record => record.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Similar;
