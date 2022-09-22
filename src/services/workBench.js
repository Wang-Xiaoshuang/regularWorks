import request from '@/utils/request';

// 收藏列表
export async function getListCollectApi(data) {
  return request('/api/document/listCollect', {
    method: 'GET',
    params: data,
  });
}

// 素材列表
export async function getListMaterialApi(data) {
  return request('/api/material/listByUser', {
    method: 'GET',
    params: data,
  });
}

// 类型筛选项
export async function getListBehaviorSearchApi(data) {
  return request('/api/document/listBehaviorSearch', {
    method: 'GET',
    params: data,
  });
}

// 阅读/引用列表
export async function getListBehaviorApi(data) {
  return request('/api/document/listBehavior', {
    method: 'GET',
    params: data,
  });
}

// 删除阅读/引用记录
export async function deleteBehaviorApi(data) {
  return request('/api/document/deleteBehavior', {
    method: 'POST',
    data: data,
  });
}

// 文档列表
export async function getUserDocListApi(data) {
  return request('/api/userDoc/list', {
    method: 'GET',
    params: data,
  });
}
// 文档删除
export async function deleteUserDocApi(data) {
  return request('/api/userDoc/delete', {
    method: 'POST',
    data: data,
  });
}
// 文档保存
export async function saveDocApi(data) {
  return request('/api/userDoc/saveFile', {
    method: 'POST',
    data: data,
  });
}
// 获取详情
export async function getUserDocInfo(data) {
  return request('/api/userDoc/get', {
    method: 'GET',
    params: data,
  });
}

export async function getImportDocInfo(data) {
  return request('/api/document/import', {
    method: 'GET',
    params: data,
  });
}
