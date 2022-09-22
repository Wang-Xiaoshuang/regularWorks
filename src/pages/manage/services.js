import request from '@/utils/request';
import { stringify } from 'qs';
import axiosRequest from '@/utils/axiosRequest';

export async function getList(data = {}) {
  return request('/api/comparison/list', {
    method: 'POST',
    data,
  });
}


export async function getSystemList(data = {}) {
  return request('/api/system/list', {
    method: 'POST',
    data,
  });
}

export async function uploadExcel(data = {}, config) {
  return axiosRequest('/api/doc/upload/excel', {
    method: 'POST',
    data,
    onUploadProgress: config && config.onUploadProgress,
    signal: config && config.signal,
  });
}

export async function uploadZip(data = {}, config) {
  return axiosRequest('/api/doc/import/package', {
    method: 'POST',
    data,
    onUploadProgress: config && config.onUploadProgress,
    signal: config && config.signal,
  });
}

// 批量保存
export async function toSave(data = {}) {
  return request('/api/comparison/save/batch', {
    method: 'POST',
    data,
  });
}

// 删除文件
export async function deleteFiles(data = {}) {
  return request('/api/comparison/delete', {
    method: 'POST',
    data,
  });
}

// 导出文件
export async function exportFiles(data = {}) {
  return request('/api/comparison/export', {
    method: 'POST',
    data,
  });
}

// 获取项目所在地
export function getAreaListAPI(params) {
  return request(`/api/doc/listAreaByLevel?${stringify(params)}`, {});
}

// 导出文件
export function exportFileAPI(data) {
  const { docIdList, exportTypeList, url } = data;
  const url2 = url ?
    `${url}?docIdList=${docIdList}&exportTypeList=${exportTypeList}`
    : `/api/comparison/export?docIdList=${docIdList}&exportTypeList=${exportTypeList}`
  const res = fetch(
    url2,
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
}
