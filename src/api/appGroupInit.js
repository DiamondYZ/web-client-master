import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function post (appId, groupIds) {
  return request.post(base, 'wis-manage/appGroupInit/post', {appId: appId, groupIds: groupIds})
}

export function remove (id) {
  return request.post(base, 'wis-manage/appGroupInit/delete', {id: id})
}
export function fetchList (appId) {
  return request.post(base, 'wis-manage/appGroupInit/list', {appId: appId})
}

export function fetchAppList () {
  return request.post(base, 'wis-manage/appGroupInit/app/list')
}

export function fetchGroupInitList () {
  return request.post(base, 'wis-manage/appGroupInit/groupInit/list')
}
