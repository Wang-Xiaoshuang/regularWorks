import request from '@/utils/request';
import { stringify } from 'qs';
import axiosRequest from '@/utils/axiosRequest';

// 排序加了两个字段sortColumn，sortType 和三大科创一样的，
// sortColumn=create_time 就代表初次上传时间排序
// sortColumn=update_time 就代表最新上传时间排序，
// sortType 代表正序倒序asc就是正序 desc就是倒序
export async function getListAPI(data = {}) {
  return request('/api/inspection/list', {
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

export async function uploadZip(data, config) {
  return axiosRequest('/api/doc/import/package', {
    method: 'POST',
    data,
    onUploadProgress: config && config.onUploadProgress,
    signal: config && config.signal,
  });
}

// 批量保存
export async function toSave(data = {}) {
  return request('/api/inspection/save/batch', {
    method: 'POST',
    data,
  });
}

// 获取项目所在地
export function getAreaListAPI(params) {
  return request(`/api/doc/listAreaByLevel?${stringify(params)}`, {});
}
