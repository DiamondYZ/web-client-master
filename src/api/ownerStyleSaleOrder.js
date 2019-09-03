import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchList (param, p) {
  return request.post(base, 'wis-manage/ownerStyleManager/saleOrders', {entity: param, ...p})
}

export function retry (id, owner) {
  return request.post(base, 'wis-manage/ownerStyleManager/saleOrder/retry', {id: id, owner: owner})
}

export function fetchOwner (companyCode, companyName) {
  return request.post(base, 'wis-manage/menuManager/getOwnersInfo', {companyCode: companyCode, companyName: companyName})
}
