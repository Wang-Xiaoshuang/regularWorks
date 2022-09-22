import request from '@/utils/request';

// 添加检测
export async function addCheck(data = {}) {
  return request('/api/check/add', {
    method: 'POST',
    data,
  });
}

// 添加检测前置操作
export async function beforeAdd(data = {}) {
  return request('/api/check/toAdd', {
    method: 'POST',
    data,
  });
}
