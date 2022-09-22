import React, { useEffect, useState } from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import Nav from '@/components/Nav';
import uploadIcon from '@/assets/upload.svg';
import { Steps, Upload, Form, Button, Space, Progress, message } from 'antd';
import * as XLSX from 'xlsx/xlsx.mjs';
import styles from './upload.less';
import { uploadExcel, uploadZip } from './services';

const { Dragger } = Upload;
const { Step } = Steps;

const nav = [
  {
    name: '对比库管理 /',
    link: '/manage/list',
  },
  {
    name: '文件上传',
  },
];

export default connect(models => ({
  manage: models.manage,
}))(props => {
  const { dispatch, manage } = props;
  const batchnameFromUrl = props.location.query.batchName;
  const [batchName, setBatchName] = useState(batchnameFromUrl);
  const [load, setLoad] = useState(['load', 'load']); // load的顺序为 excel, zip
  const [form] = Form.useForm();

  useEffect(() => {
    if (manage[batchName]) {
      setLoad(manage[batchName].load);
    } else {
      setBatchName(null);
      setLoad(['load', 'load']);
    }
  }, [manage]);

  // 取消上传
  const cancel = () => {
    const { controller } = manage[batchName];
    if (controller) {
      controller.abort();
      message.warning('上传已取消');
    }
    // 取消后，请求不是立即停止，需要延时
    setTimeout(() => {
      dispatch({
        type: 'manage/init',
        payload: { batchName },
      });
      router.push('/manage/list');
    }, 1000);
  };

  async function validatorFile1(rule, value) {
    if (!value?.fileList?.length && !manage.excel) {
      throw new Error(rule.message);
    }
  }
  async function validatorFile2(rule, value) {
    if (!value?.fileList?.length && !manage.zip) {
      throw new Error(rule.message);
    }
  }

  const disabledBtn = () => {
    // let flag = false;
    // load.forEach(i => {
    //   if (i !== false) {
    //     flag = true;
    //   }
    // });
    // return flag;
    return !(batchName && load && load[0] === 'loaded' && load[1] === 'loaded');
  };
  const disabledupLoadBtn = () => {
    return batchName && load && load[0] === 'loaded' && load[1] === 'loaded';
  };

  const tocheck = () => {
    if (!disabledBtn()) {
      dispatch({
        type: 'manage/update',
        payload: { batchName, step: 2, load: ['loaded', 'load'] },
      });
      router.push(`/manage/check?batchName=${batchName}`);
    }
  };

  const onFinish = res => {
    const { excel, zip } = res;
    dispatch({
      type: 'manage/upload',
      payload: { excel, zip, setBatchName },
    });
    // router.push('/manage/list');
  };

  const getBatchName = file => {
    return new Promise(resolve => {
      // js 解析 Excel 获取批次名
      const rABS = true;
      const reader = new FileReader();
      reader.onload = e => {
        let data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        const workbook = XLSX.read(data, {
          type: rABS ? 'binary' : 'array',
        });
        const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonArr = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
        if (jsonArr && jsonArr[1]) {
          resolve(jsonArr[1][0]);
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const excelProps = {
    name: 'excel',
    // action: '/api/doc/upload/excel',
    maxCount: 1,

    customRequest: async option => {
      const { file } = option;
      const name = await getBatchName(file);

      if (name) {
        setBatchName(name);
      }
      const params = new FormData();
      params.append('excelFile', file);

      const controller = new AbortController();
      dispatch({
        type: 'manage/fetchControl',
        payload: {
          controller,
          batchName: name || batchName,
        },
      });

      const res = await uploadExcel(params, {
        signal: controller.signal,
        onUploadProgress: event => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          dispatch({
            type: 'manage/progress',
            payload: { excelProgress: percent, batchName: name || batchName },
          });
        },
      });
      if (res) {
        setBatchName(res[0] && res[0].batchName);
        dispatch({
          type: 'manage/update',
          payload: {
            step: 1,
            load: ['loaded', 'load'],
            batchName: res[0].batchName,
            excel: file,
            zip: '',
            zipProgress: 0,
          },
        });
        dispatch({
          type: 'manage/progress',
          payload: { excelProgress: 100, batchName: res[0] && res[0].batchName },
        });
        option.onSuccess();
      } else {
        dispatch({
          type: 'manage/init',
          payload: { batchName: name || batchName },
        });
        option.onError();
      }
    },
    accept: '.xls,.xlsx',
  };

  const zipProps = {
    name: 'zip',
    // action: '/api/doc/import/package',
    maxCount: 1,
    customRequest: async option => {
      const { file } = option;
      const params2 = new FormData();
      const controller = new AbortController();
      dispatch({
        type: 'manage/fetchControl',
        payload: {
          controller,
          batchName,
        },
      });

      params2.append('batchName', batchName);
      params2.append('packageFile', file);
      dispatch({
        type: 'manage/update',
        payload: { load: ['loaded', 'loading'], batchName, zip: file },
      });

      const res = await uploadZip(params2, {
        signal: controller.signal,
        onUploadProgress: event => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          dispatch({
            type: 'manage/progress',
            payload: { zipProgress: percent, batchName },
          });
        },
      });
      let payload = {};
      if (res) {
        payload = { load: ['loaded', 'loaded'], table: res, batchName };
        option.onSuccess();
      } else {
        payload = { step: 1, load: ['loaded', 'load'], batchName, zip: '' };
        option.onError();
      }
      dispatch({
        type: 'manage/update',
        payload,
      });
    },
    accept: '.zip,.rar',
  };

  const checkZip = () => {
    return !(batchName && load && load[1] === 'load');
  };

  const toHome = () => {
    router.push('/manage/list');
  };

  const onRemove = (file, type) => {
    // console.log(file)
    dispatch({
      type: 'manage/progress',
      payload: { zipProgress: 0, batchName },
    });
  }

  return (
    <div>
      <Nav data={nav} />
      <div className="duplicate_page">
        <div className="duplicate_titleWrapper">
          <span className="title">文件上传</span>
        </div>
        <div className={styles.content}>
          <Steps current={0}>
            <Step title="文件上传" />
            <Step title="匹配核对" />
            <Step title="上传提交" />
          </Steps>
          <div className={styles.uploads}>
            <Form
              name="validate_other"
              layout="vertical"
              // initialValues={initialValues}
              autoComplete="off"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                label="选择excel文件上传"
                name="excel"
                rules={[
                  {
                    required: true,
                    message: '请先上传文件',
                    validator: validatorFile1,
                  },
                ]}
              >
                <Dragger
                  {...excelProps}
                  disabled={!!batchName}
                  defaultFileList={
                    batchnameFromUrl && manage[batchnameFromUrl] && manage[batchnameFromUrl].excel
                      ? [manage[batchnameFromUrl].excel]
                      : []
                  }
                >
                  <p className="ant-upload-drag-icon">
                    <img src={uploadIcon} alt="upload" />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到这里上传</p>
                  <p className="ant-upload-hint">（仅支持excel文件上传）</p>
                </Dragger>
                {batchName && manage[batchName] && manage[batchName].excelProgress > 0 ? (
                  <Progress
                    size="samll"
                    strokeWidth={4}
                    percent={manage[batchName].excelProgress}
                  />
                ) : null}
              </Form.Item>
              <Form.Item
                label="选择文件压缩包上传"
                name="zip"
                rules={[
                  {
                    required: true,
                    message: '请上传文件压缩包',
                    validator: validatorFile2,
                  },
                ]}
              >
                <Dragger
                  {...zipProps}
                  // disabled={!!batchName}
                  disabled={checkZip()}
                  onRemove={file => onRemove(file, 'zip')}
                  // onChange={() => onChange('zip')}
                  defaultFileList={
                    batchnameFromUrl && manage[batchnameFromUrl] && manage[batchnameFromUrl].zip
                      ? [manage[batchnameFromUrl].zip]
                      : []
                  }
                >
                  <p className="ant-upload-drag-icon">
                    <img src={uploadIcon} alt="upload" />
                  </p>
                  <p className="ant-upload-text">
                    {batchName ? '点击或拖拽文件到这里上传' : '请先上传Excel'}
                  </p>
                  <p className="ant-upload-hint">（仅支持文件压缩包上传）</p>
                </Dragger>
                {batchName && manage[batchName]?.zipProgress > 0 && !(manage[batchName].load[1] === 'load' && manage[batchName]?.zipProgress === 100) ? (
                // {batchName && manage[batchName] && manage[batchName].zipProgress > 0 ? (
                  <Progress strokeWidth={4} percent={manage[batchName].zipProgress} />
                ) : null}
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
              >
                <Space>
                  <Button onClick={cancel}>取消上传</Button>
                  <Button disabled={disabledupLoadBtn()} onClick={toHome}>
                    后台解析上传
                  </Button>
                  <Button disabled={disabledBtn()} type="primary" onClick={tocheck}>
                    匹配核对
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
          {/* <div>{load[0] !== null && !load[0] && 'excel文件上传成功'}</div>
          <div>{load[1] !== null && load[1] && '文件压缩包上传中'}</div>
          <div>{load[1] !== null && !load[1] && '文件压缩包上传成功'}</div> */}
        </div>
      </div>
    </div>
  );
});
