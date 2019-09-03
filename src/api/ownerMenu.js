import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchOwner (companyName) {
  return request.post(base, 'wis-manage/menuManager/getOwnersInfo', {companyName: companyName})
}
export function fetchOwnerPage (param, p) {
  return request.post(base, 'wis-manage/menuManager/getOwnersPage', {entity: param, ...p})
}

export function clearOwnerData (owner) {
  return request.post(base, 'wis-manage/menuManager/clearOwnerData', {owner: owner})
}
export function recoverOwnerData (owner) {
  return request.post(base, 'wis-manage/menuManager/recoverOwnerData', {owner: owner})
}

export function fetchList () {
  return request.post(base, 'wis-manage/menuManager/getMenuInfoList', {entity: {}})
}

export function remove (id) {
  return request.post(base, 'wis-manage/menuManager/removeMenuInfo', {entity: {menu: {id: id}}})
}

export function add (data) {
  return request.post(base, 'wis-manage/menuManager/saveMenuInfo', {entity: data})
}

export function update (data) {
  return request.post(base, 'wis-manage/menuManager/modifyMenuInfo', {entity: data})
}

export function saveOwnerMenu (data) {
  return request.post(base, 'wis-manage/menuManager/batchSaveOwnerMenuList', {entity: data})
}
export function getAppMenu (id) {
  return request.post(base, 'wis-manage/menuManager/getMenuConfigMsg', {entity: {id: id}})
}
