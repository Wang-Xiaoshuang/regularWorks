import request from '@/utils/request';
// import { stringify } from 'qs';

export function getAllFields() {
  return request('/api/common/app/field');
}

// 获取项目列表
export function getTable(params) {
  return request('/api/project/list', {
    method: 'POST',
    data: params,
  });
}
