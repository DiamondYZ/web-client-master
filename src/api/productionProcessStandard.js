import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['production']

export function fetchList (param, p) {
  return request.post(base, '/standard/technology/getList', {entity: param, ...p})
}

export function fetchById (id) {
  return request.post(base, '/standard/technology/get', {
    id: id
  })
}

export function fetchColumns () {
  return request.get('/production-process-standard/columns')
}

export function fetchProcessListColumns () {
  return request.get('/production-process-standard-process-list/columns')
}

// 删除工艺
export function remove (param) {
  return request.post(base, '/standard/technology/delete', {
    entity: param
  })
}
// 新增工艺
export function add (param) {
  return request.post(base, '/standard/technology/post', {
    entity: param
  })
}
// 修改工艺
export function update (param) {
  return request.post(base, '/standard/technology/put', {
    entity: param
  })
}
// 复制工艺
export function copy (param) {
  return request.post(base, '/standard/technology/copy', {
    entity: param
  })
}
export function treeList (param) {
  return request.post(base, '/technology/standard/catalogue/getAll', {
    entity: param
  })
}
// 添加文件夹
export function addForderTree (param) {
  return request.post(base, '/technology/standard/catalogue/post', {
    entity: param
  })
}
// 编辑文件夹
export function updateForderTree (param) {
  return request.post(base, '/technology/standard/catalogue/put', {
    entity: param
  })
}
// 删除文件夹
export function removeForderTree (id) {
  return request.post(base, '/technology/standard/catalogue/delete', {
    id: id
  })
}
// 根据ID懒加载获取目录
export function fetchLazyCatalogById (id) {
  return request.post(base, '/technology/standard/catalogue/get', {
    parentId: id
  })
}
// 移动文件夹（过滤自己）
export function fetchLazyCatalogByIdOutItself (param) {
  return request.post(base, '/technology/standard/catalogue/getOutItself', {
    entity: param
  })
}
// 查询工序清单列表
export function fetchDetailsList (param, p) {
  return request.post(base, '/standard/technology/getOperationList', {
    entity: param,
    ...p
  })
}
// 新增工序清单
export function postOperation (param) {
  return request.post(base, '/standard/technology/postOperation', {
    entity: param
  })
}
// 修改工序清单
export function modifyOperation (param) {
  return request.post(base, '/standard/technology/modifyOperation', {
    entity: param
  })
}
// 删除工艺
export function removeOperation (param) {
  return request.post(base, '/standard/technology/deleteOperation', {
    entity: {
      ids: param
    }
  })
}

// 修改工序详情
export function modifyOperationDetail (param) {
  return request.post(base, '/standard/technology/modifyOperationDetail', {
    entity: param
  })
}
