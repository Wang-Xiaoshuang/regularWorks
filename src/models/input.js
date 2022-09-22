/* eslint-disable @typescript-eslint/camelcase */
import { message } from 'antd';
import { uploadExcel, uploadZip } from '@/pages/input/services';
import { routerRedux } from 'dva/router';

// 根据batchName（批次名称）确定是哪个进程

export default {
  namespace: 'input',
  state: {
    // 下面是数据格式
    // // step 1 的状态
    // excel: null,
    // zip: null,
    // load: [null, null], // excel, zip
    // batchName: '',
    // // step 2 的状态
    // table: [],
    // loadList: {},
    // step: 1或2
  },
  reducers: {
    update(state, { payload }) {
      const { batchName } = payload;
      const temp = state;
      if (temp[batchName]) {
        temp[batchName] = { ...temp[batchName], ...payload };
      } else {
        temp[batchName] = { ...payload };
      }
      return { ...temp };
    },
    updateLoadList(state, { payload }) {
      const { loadList = {} } = state;
      const { name, table, batchName } = payload;
      // 处理batchName对象的loadList属性
      const tempZip = loadList;
      tempZip[name] = true;
      // 处理state,修改state里属性名为batchName的对象
      const temp = state;
      if (temp[batchName]) {
        temp[batchName] = { ...temp[batchName], table, loadList: { ...tempZip } };
      } else {
        temp[batchName] = { table, loadList: { ...tempZip }, step: 2 };
      }
      return { ...temp };
    },
    init(state, { payload }) {
      const { batchName } = payload;
      const temp = state;
      delete temp[batchName];
      return { ...temp };
    },
    progress(state, { payload }) {
      const { batchName, excelProgress, zipProgress, continueZipProgress } = payload;
      const temp = state;
      if (batchName) {
        if (excelProgress) {
          temp[batchName] = { ...temp[batchName], excelProgress };
        }
        if (zipProgress) {
          temp[batchName] = { ...temp[batchName], zipProgress };
        }
        if (continueZipProgress) {
          temp[batchName] = { ...temp[batchName], continueZipProgress };
        }
      }
      return { ...temp };
    },
    fetchControl(state, { payload }) {
      const { batchName, controller } = payload;
      const temp = state;
      if (batchName) {
        temp[batchName] = { ...temp[batchName], controller };
      }
      return { ...temp };
    },
  },
  effects: {
    *uploadZip(state, { call, put }) {
      const { zip, batchName } = state.payload;
      const { name, originFileObj } = zip.file;
      const params2 = new FormData();
      params2.append('batchName', batchName);
      params2.append('packageFile', originFileObj);
      const res2 = yield call(uploadZip, params2);
      if (res2) {
        yield put({
          type: 'updateLoadList',
          payload: { name, batchName, table: res2 },
        });
      }
    },
    *upload(state, { call, put }) {
      const { excel, zip, setBatchName } = state.payload;
      const params = new FormData();
      params.append('excelFile', excel.file.originFileObj);
      const res = yield call(uploadExcel, params);
      if (res) {
        message.success('excel文件上传成功');
        setBatchName(res[0].batchName);
        yield put({
          type: 'update',
          payload: { step: 1, load: [false, true], excel, zip, batchName: res[0].batchName },
          // payload: { step: 1, load: [false, true], batchName: res[0].batchName },
        });

        const params2 = new FormData();
        params2.append('batchName', res[0].batchName);
        params2.append('packageFile', zip.file.originFileObj);
        const res2 = yield call(uploadZip, params2);
        if (res2) {
          message.success('文件压缩包上传成功');
          yield put({
            type: 'update',
            payload: { load: [false, false], table: res2, batchName: res[0].batchName },
          });
        } else {
          // 上传失败，重新上传
          yield put({
            type: 'init',
            payload: { batchName: res[0].batchName },
          });
          yield put(routerRedux.push('/input/upload'));
        }
      }
    },
  },
};
