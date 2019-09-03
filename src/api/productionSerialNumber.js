import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetch (param, p) {
  return request.post(base, 'wis-manage/wisProductionSaleSerialNumber/list', {entity: param, ...p})
}

export function remove (id) {
  return request.post(base, 'wis-manage/wisProductionSaleSerialNumber/delete', {id: id})
}

export function add (data) {
  return request.post(base, 'wis-manage/wisProductionSaleSerialNumber/post', {entity: data})
}

export function update (data) {
  return request.post(base, 'wis-manage/wisProductionSaleSerialNumber/put', {entity: data})
}
