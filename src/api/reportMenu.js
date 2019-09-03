import request from '@/utils/request'
import serviceMap from './serviceMap'

const base = serviceMap['manage']

export function fetchOwner () {
  return request.post(base, 'wis-manage/menuManager/getOwnersInfo', {})
}

export function fetchReport (input) {
  return request.post(base, 'wis-manage/frReportMenu/getMenuInfoList', {entity: {owner: input}})
}

export function remove (id) {
  return request.post(base, 'wis-manage/frReportMenu/removeMenuInfo', {entity: {id: id}})
}

export function add (data) {
  return request.post(base, 'wis-manage/frReportMenu/saveMenuInfo', {entity: data})
}

export function update (data) {
  return request.post(base, 'wis-manage/frReportMenu/modifyMenuInfo', {entity: data})
}
