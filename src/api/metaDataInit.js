import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchList (param, p) {
  return request.post(base, 'wis-manage/lookupClassesInit/lookupClassInit', {entity: param, ...p})
}

export function remove (id) {
  return request.post(base, 'wis-manage/lookupClassesInit/removeLookupClassInit', {
    id: id
  })
}

export function add (data) {
  return request.post(base, 'wis-manage/lookupClassesInit/addLookupClassInit', {entity: data})
}

export function update (data) {
  return request.post(base, 'wis-manage/lookupClassesInit/modifyLookupClassInit', {entity: data})
}

export function cloneClass (data) {
  return request.post(base, 'wis-manage/lookupClassesInit/cloneLookupClassInit', {entity: data})
}
