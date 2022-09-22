import React from 'react';
import uploadIcon from '@/assets/upload.svg';
import { Modal, Upload, Form } from 'antd';
import { connect } from 'dva';

const { Dragger } = Upload;

async function validatorFile2(rule, value) {
  if (!value?.fileList?.length) {
    throw new Error(rule.message);
  }
}

export default connect(models => ({
  input: models.input,
}))(props => {
  const { visible, setVisible, upload } = props;
  const [form] = Form.useForm();

  const zipProps = {
    name: 'zip',
    maxCount: 1,
    customRequest: option => {
      upload(option);
    },
    accept: '.zip,.rar',
  };

  const handleCancel = () => setVisible(false);

  // const changeFile = obj => {
  //   // fileObj = { ...obj };
  // };

  return (
    <Modal
      destroyOnClose
      centered
      title="继续上传文件压缩包"
      visible={visible}
      footer={null}
      // onOk={handleOk}
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
          <Dragger {...zipProps}>
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
