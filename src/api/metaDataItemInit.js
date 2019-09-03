import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchList (param, p) {
  return request.post(base, 'wis-manage/lookupItemsInit/getClassList', {entity: param, ...p})
}

export function remove (id) {
  return request.post(base, 'wis-manage/lookupItemsInit/removeLookupItemInit', {
    id: id
  })
}

export function add (data) {
  return request.post(base, 'wis-manage/lookupItemsInit/addLookupItemInit', {entity: data})
}

export function update (data) {
  return request.post(base, 'wis-manage/lookupItemsInit/modifyLookupItemInit', {entity: data})
}
