import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['user']

export function open (data) {
  return request.post(base, 'wis-authority/dubboTest2/openWisTenant', data)
}

export function addUser2 (data) {
  return request.post(base, 'wis-authority/dubboTest2/addUserForCloud', data)
}

export function addUser (data) {
  return request.post(base, 'wis-authority/user/test/add', data)
}
