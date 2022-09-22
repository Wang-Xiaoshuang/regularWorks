import request from '@/utils/request';
import { stringify } from 'qs';

export async function getList(data = {}) {
  return request('/api/check/list', {
    method: 'POST',
    data,
  });
}

// 删除检测
export async function deleteData(data = {}) {
  return request('/api/check/delete', {
    method: 'POST',
    data,
  });
}

// 启动检测
export async function start(data = {}) {
  return request('/api/check/start', {
    method: 'POST',
    data,
  });
}

// 暂停检测
export async function stop(data = {}) {
  return request('/api/check/stop', {
    method: 'POST',
    data,
  });
}

// 获取检测条件
export function getCondition(params) {
  return request(`/api/check/detail?${stringify(params)}`);
}

// detail.js
// 检测批次统计
export function getBatchStateAPI(params) {
  return request(`/api/check/batchStat?${stringify(params)}`);
}

export async function getDetailList(data = {}) {
  return request('/api/check/listDoc', {
    method: 'POST',
    data,
  });
}

export function checkExportAPI(data) {
  const { checkId, docIdList, exportTypeList } = data;
  const res = fetch(
    `/api/comparison/export?checkId=${checkId}&docIdList=${docIdList}&exportTypeList=${exportTypeList}`,
    {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  );
  return res;
  // return request(`/api/check/export?${stringify(params)}`);
}

// 获取相似清单
export function getSimilarListAPI(data) {
  return request('/api/check/listDocSimilarity', {
    method: 'POST',
    data,
  });
}
