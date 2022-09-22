import { useRequest } from 'ahooks';
import { getFields, getChains } from '@/services/home';

export function useFields() {
  return useRequest(getFields, {
    cacheKey: 'cacheKey-share',
  });
}

export function useChains() {
  return useRequest(getChains, {
    cacheKey: 'cacheKey-share-1',
  });
}
