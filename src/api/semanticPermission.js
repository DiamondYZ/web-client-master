import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchColumns () {
  return request.get('/basic-data-task/columns')
}

export function fetchList (data, p) {
  return request.post(base, '/task/getList', {entity: data, ...p})
}

export function fetchParentList (data, p) {
  return request.post(base, '/task/getParentList', {entity: data, ...p})
}

export function treeList (param) { // 获取目录
  return request.post(base, 'wis-manage/crAuthorityManage/crTopicAppName')
}

export function productionList (code) { // 获取新增列表
  return request.post(base, 'wis-manage/crAuthorityManage/addCrTopicAuthorityManagerList', {code: code})
}

export function add (data) { // 新增
  return request.post(base, 'wis-manage/crAuthorityManage/addCrTopicAuthorityManager', {entity: data})
}

export function update (data) { // 修改
  return request.post(base, 'wis-manage/crTopic/modify', {entity: data})
}

export function fetchDetailList (code, searchValue, p) { // 查询详情列表
  return request.post(base, 'wis-manage/crAuthorityManage/crTopicAuthorityManagerList', {code: code, searchValue: searchValue, ...p})
}

export function remove (data) { // 删除
  return request.post(base, 'wis-manage/crAuthorityManage/delCrTopicAuthorityManager', {
    id: data
  })
}

export function fetchAttachmentList (data, p) {
  return request.post(base, '/task/attachment/getList', {entity: data, ...p})
}

export function addAttachmentList (data) {
  return request.post(base, '/task/attachment/postList', {
    entity: data
  })
}

export function removeAttachmentList (data) {
  return request.post(base, '/task/attachment/deleteList', {
    entity: {
      ids: data
    }
  })
}
