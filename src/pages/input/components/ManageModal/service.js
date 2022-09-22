import request from '@/utils/request';

// 同步至对比库
export async function addManage(data = []) {
  return request('/api/inspection/sync', {
    method: 'POST',
    data,
  });
}
