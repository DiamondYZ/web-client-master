import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchList (param, p) {
  return request.post(base, 'wis-manage/lookupItems/getClassList', {entity: param, ...p})
}

export function remove (id) {
  return request.post(base, 'wis-manage/lookupItems/removeLookupItem', {
    id: id
  })
}

export function add (data) {
  return request.post(base, 'wis-manage/lookupItems/addLookupItem', {entity: data})
}

export function update (data) {
  return request.post(base, 'wis-manage/lookupItems/modifyLookupItem', {entity: data})
}
