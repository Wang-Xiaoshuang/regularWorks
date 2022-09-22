import { useRequest } from 'ahooks'
import { getAllFields } from '@/services/common'

export default (cacheKey = 'allFields') => {
  const { data: fieldData } = useRequest(getAllFields, {
    cacheKey,
    cacheTime: -1,
    staleTime: -1,
  })
  return {
    fieldData,
  }
}
