import React, { useEffect, useState } from 'react';
import uploadIcon from '@/assets/upload.svg';
import { Modal, Upload, Form, message } from 'antd';
import { connect } from 'dva';
import { uploadZip } from '../../services';

const { Dragger } = Upload;

async function validatorFile2(rule, value) {
  if (!value?.fileList?.length) {
    throw new Error(rule.message);
  }
}

export default connect(models => ({
  manage: models.manage,
}))(props => {
  const { dispatch, visible, setVisible, batchName, upload } = props;
  const [form] = Form.useForm();
  let fileObj = null;

  const zipProps = {
    name: 'zip',
    // action: '/api/doc/import/package',
    maxCount: 1,
    customRequest: option => {
      upload(option);
      // console.log('name', option);
      // const { file } = option;
      // const params2 = new FormData();
      // params2.append('batchName', batchName);
      // params2.append('packageFile', file);
      // dispatch({
      //   type: 'manage/update',
      //   payload: { load: ['loaded', 'loading'], batchName, zipName: file.name },
      // });
      // setVisible(false);
      // const res = await uploadZip(params2, {
      //   onUploadProgress: event => {
      //     const percent = Math.floor((event.loaded / event.total) * 100);
      //     dispatch({
      //       type: 'manage/progress',
      //       payload: { continueZipProgress: percent, batchName },
      //     });
      //   },
      // });
      // let payload = {};
      // if (res) {
      //   payload = { load: ['loaded', 'loaded'], table: res, batchName };
      //   option.onSuccess();
      //   setTimeout(() => {
      //     message.info('匹配状态已更新');
      //   }, 500);
      // } else {
      //   payload = { load: ['loaded', 'load'], batchName };
      //   option.onError();
      // }
      // dispatch({
      //   type: 'manage/update',
      //   payload,
      // });
    },
    accept: '.zip,.rar',
  };

  const handleOk = () => {
    form.submit();
    if (fileObj) {
      dispatch({
        type: 'manage/uploadZip',
        payload: { zip: fileObj, batchName },
      });
      setVisible(false);
    }
  };

  const handleCancel = () => setVisible(false);

  const changeFile = obj => {
    fileObj = { ...obj };
  };

  return (
    <Modal
      destroyOnClose
      centered
      title="继续上传文件压缩包"
      visible={visible}
      footer={null}
      //   onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form name="continue_Upload" layout="vertical" utoComplete="off" form={form}>
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
          <Dragger {...zipProps} onRemove={changeFile} onChange={changeFile}>
            <p className="ant-upload-drag-icon">
              <img src={uploadIcon} alt="upload" />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到这里上传</p>
            <p className="ant-upload-hint">（仅支持文件压缩包上传）</p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
});
