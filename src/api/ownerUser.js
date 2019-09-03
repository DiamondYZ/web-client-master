import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchOwner (companyCode, companyName) {
  return request.post(base, 'wis-manage/menuManager/getOwnersInfo', {companyCode: companyCode, companyName: companyName})
}

export function fetchList (owner) {
  return request.post(base, 'wis-manage/userManager/owner/users', {owner: owner})
}

export function cancel (userId, owner) {
  return request.post(base, 'wis-manage/userManager/owner/testUser/cancel', {userId: userId, owner: owner})
}

export function set (userId, owner) {
  return request.post(base, 'wis-manage/userManager/owner/testUser/set', {userId: userId, owner: owner})
}
