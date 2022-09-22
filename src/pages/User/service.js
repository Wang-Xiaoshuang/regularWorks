import request from '@/utils/request';
import { encrypt } from '@/utils/utils';

export async function changePassword(params) {
  const data = {
    passwordOld: encrypt(params.passwordOld),
    passwordNew: encrypt(params.passwordNew),
  };
  const result = await request('/api/project/changePassword', {
    method: 'POST',
    data,
  });
  return result;
}

export function loginUp(data = {}) {
  const nd = new FormData();
  Object.keys(data).forEach(k => {
    nd.append(k, data[k]);
  });
  return request('/api/login', {
    method: 'POST',
    data: nd,
  });
}
