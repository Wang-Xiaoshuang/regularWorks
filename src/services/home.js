import request from '@/utils/request';

export async function getCount(data = {}) {
  // /api/document/stat
  return request('/api/doc_count', {
    method: 'POST',
    data,
  });
}


export async function getFields() {
  return request('/api/get_search_field', {
    method: 'POST',
  });
}

export async function getChains() {
  return request('/api/get_root_nodes', {
    method: 'POST',
  });
}
