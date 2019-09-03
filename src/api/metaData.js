import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchList (param, p) {
  return request.post(base, 'wis-manage/lookupClasses/lookupClass', {entity: param, ...p})
}

export function remove (id) {
  return request.post(base, 'wis-manage/lookupClasses/removeLookupClass', {
    id: id
  })
}

export function add (data) {
  return request.post(base, 'wis-manage/lookupClasses/addLookupClass', {entity: data})
}

export function update (data) {
  return request.post(base, 'wis-manage/lookupClasses/modifyLookupClass', {entity: data})
}

export function cloneClass (data) {
  return request.post(base, 'wis-manage/lookupClasses/cloneLookupClass', {entity: data})
}
