import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import Nav from '@/components/Nav';
import warning from '@/assets/warning.svg';
import { Steps, Button, Checkbox, Space, Table, Progress, message } from 'antd';
import Modal from './components/checkModal';
import { uploadZip } from './services';
import styles from './check.less';

const { Step } = Steps;

const nav = [
  {
    name: '送检数据录入 /',
    link: '/input/list',
  },
  {
    name: '批量文件上传',
  },
];

const countNotFound = data => {
  const filterArr = data.filter(i => i.matchType === '未找到对应文件');
  return filterArr.length;
};

export default connect(models => ({
  input: models.input,
}))(props => {
  const { input, dispatch } = props;
  const { batchName } = props.location.query;
  const { table = [], loadList = [] } = input[batchName] || {};
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState(table);

  useEffect(() => {
    if (!input || !input[batchName]) {
      router.push('/input/list');
    }
  }, []);

  useEffect(() => {
    setList(table);
  }, [table]);

  const upload = async option => {
    console.log('name', option);
    const { file } = option;
    const params2 = new FormData();
    params2.append('batchName', batchName);
    params2.append('packageFile', file);

    const controller = new AbortController();
    dispatch({
      type: 'input/fetchControl',
      payload: {
        controller,
        batchName,
      },
    });

    dispatch({
      type: 'input/update',
      payload: { load: ['loaded', 'loading'], batchName, zipName: file.name },
    });
    setVisible(false);
    const res = await uploadZip(params2, {
      signal: controller.signal,
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        dispatch({
          type: 'input/progress',
          payload: { continueZipProgress: percent, batchName },
        });
      },
    });
    let payload = {};
    if (res) {
      payload = { load: ['loaded', 'loaded'], table: res, batchName };
      option.onSuccess();
      setTimeout(() => {
        message.info('匹配状态已更新');
      }, 500);
    } else {
      payload = { load: ['loaded', 'load'], batchName };
      option.onError();
    }
    dispatch({
      type: 'input/update',
      payload,
    });
  };

  const cancelUpload = () => {
    const { controller } = input[batchName];
    if (controller) {
      controller.abort();
      message.warning('上传已取消');
    }
    // 取消后，请求不是立即停止，需要延时
    setTimeout(() => {
      dispatch({
        type: 'input/init',
        payload: { batchName },
      });
      router.push('/input/list');
    }, 1000);
    // const { controller } = input[batchName];
    // if (controller) {
    //   controller.abort();
    //   message.warning('上传已取消');
    // }
    // setTimeout(() => {
    //   dispatch({
    //     type: 'input/update',
    //     payload: { load: ['loaded', 'cancel'], batchName },
    //   });
    // }, 500);

    // dispatch({
    //   type: 'input/init',
    //   payload: { batchName },
    // });
    // router.push('/input/upload');
  };

  const toSave1 = () => {
    if (table && table.length !== countNotFound(table)) {
      router.push(`/input/save?batchName=${batchName}`);
    }
  };

  const tofilte = e => {
    if (e.target.checked) {
      setList(table.filter(i => i.matchType === '未找到对应文件'));
    } else {
      setList(table);
    }
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      width: 60,
      align: 'center',
      //   <span>{page.pageSize * (page.pageNum - 1) + index + 1}</span>
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '批次名称',
      dataIndex: 'batchName',
      width: 240,
      ellipsis: true,
    },
    {
      title: '年份',
      dataIndex: 'year',
      width: 70,
    },
    {
      title: '项目编号',
      dataIndex: 'number',
      width: 130,
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      width: 240,
      ellipsis: true,
    },
    {
      title: '计划类别',
      dataIndex: 'planType',
      width: 130,
    },
    {
      title: '承担单位',
      dataIndex: 'undertakingDept',
    },
    {
      title: '项目级别',
      dataIndex: 'level',
      width: 130,
      ellipsis: true,
    },
    {
      title: '报告名称',
      dataIndex: 'docName',
    },
    {
      title: '报告作者单位',
      dataIndex: 'authorDept',
    },
    {
      title: '报告作者',
      dataIndex: 'author',
    },
    {
      title: '报告类型',
      dataIndex: 'docType',
      width: 130,
    },
    {
      title: '项目来源地',
      dataIndex: 'area',
    },
    {
      title: '文件名称',
      dataIndex: 'docOriName',
    },
    {
      title: '匹配状态',
      dataIndex: 'matchType',
      fixed: 'right',
      width: 130,
      render: text => {
        return text === '未找到对应文件' ? <span style={{ color: '#EF4242' }}>{text}</span> : text;
      },
    },
  ];

  const pageConfig = {
    total: list.length,
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

  const renderProgress = () => {
    // const { name, value } = props;
    const batchData = input[batchName];
    const { load } = batchData;
    return (
      <div className={styles.progressWrapper}>
        <div className={styles.name}>
          {batchData.zipName}
          {load[1] === 'loading' ? '正在上传，当前进度：' : ''}
          {load[1] === 'loaded' ? '上传已完成' : ''}
          {load[1] === 'cancel' ? '已取消上传' : ''}
        </div>
        {load[1] === 'loading' ? (
          <div className={styles.progress}>
            <Progress size="samll" strokeWidth={4} percent={input[batchName].continueZipProgress} />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <Nav data={nav} />
      <div className="duplicate_page">
        <div className="duplicate_titleWrapper">
          <span className="title">批量文件上传</span>
        </div>
        {batchName && input[batchName] && input[batchName].continueZipProgress > 0
          ? renderProgress()
          : null}
        {/* {loadList && Object.keys(loadList).length
          ? Object.keys(loadList).map(item => <Progress name={item} value={loadList[item]} />)
          : null} */}
        <div className={styles.stepWrapper}>
          <Steps current={1}>
            <Step title="文件上传" />
            <Step title="匹配核对" />
            <Step title="上传提交" />
          </Steps>
        </div>
        <div className={styles.content}>
          <div className={styles.line}>
            <div>
              <img src={warning} className={styles.warning} alt="" />
              总数<span style={{ color: '#01B2B9' }}>{table.length}</span>项， 已匹配
              <span style={{ color: '#01B2B9' }}>{table.length - countNotFound(table)}</span>项，
              未到找对应文件<span style={{ color: '#EF4242' }}>{countNotFound(table)}</span>项
            </div>
            <div>
              <Checkbox onChange={tofilte}>仅查看未找到对应文件</Checkbox>
              <Button type="primary" onClick={() => setVisible(true)}>
                继续上传文件压缩包
              </Button>
            </div>
          </div>
          <div className="tableArea">
            <Table
              columns={columns}
              dataSource={list}
              pagination={pageConfig}
              scroll={{ y: '50vh', x: 2800 }}
            />
          </div>
          <div className={styles.btns}>
            <Space>
              <Button onClick={cancelUpload}>取消</Button>
              <Button onClick={() => router.push('/input/list')}>后台解析上传</Button>
              <Button
                onClick={toSave1}
                disabled={
                  !(table && table.length) || countNotFound(table) === (table && table.length)
                }
                type="primary"
              >
                提交保存
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <Modal upload={upload} visible={visible} setVisible={setVisible} batchName={batchName} />
    </div>
  );
});
