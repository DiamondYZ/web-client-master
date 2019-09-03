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
  return request.post(base, 'wis-manage/crTopic/getTopicCatalog', {
    entity: param
  })
}

export function productionList (param, p) { // 获取父级目录
  return request.post(base, 'wis-manage/crTopic/getTopicRootCatalog', {
    entity: param, ...p
  })
}

export function add (data) { // 新增主题
  return request.post(base, 'wis-manage/crTopic/add', {entity: data})
}

export function update (data) { // 编辑保存主题（修改主题）
  return request.post(base, 'wis-manage/crTopic/modify', {entity: data})
}

export function fetchDetail (id) { // 查询主题详情
  return request.post(base, 'wis-manage/crTopic/get', {id: id})
}

export function remove (data) { // 删除主题
  return request.post(base, 'wis-manage/crTopic/remove', {
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
