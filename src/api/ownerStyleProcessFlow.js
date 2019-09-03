import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchList (param, p) {
  return request.post(base, 'wis-manage/ownerStyleManager/technologyFlows', {entity: param, ...p})
}

export function fetchOperationList (param, p) {
  return request.post(base, 'wis-manage/ownerStyleManager/technologyFlow/technologyOperations', {entity: param, ...p})
}

export function saveCallCam (id, owner) {
  return request.post(base, 'wis-manage/ownerStyleManager/technologyFlow/technologyOperation/saveCallCam', {id: id, owner: owner})
}

export function fetchOwner (companyCode, companyName) {
  return request.post(base, 'wis-manage/menuManager/getOwnersInfo', {companyCode: companyCode, companyName: companyName})
}
