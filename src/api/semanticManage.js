import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']
const manage = 'wis-manage'

// 数据字典
export function findDictionaryList (param) {
  return request.post('', manage + '/crDictionary/findDictionaryList', param)
}
// 获取数据集表头数据
export function fetchDataSetColumns () {
  return request.get('/semantic-manage-data-set/columns')
}
export function fetchDataSetSelectColumns () {
  return request.get('/semantic-manage-data-set-select/columns')
}
// 获取数据集字段表头数据
export function fetchDataSetFieldColumns () {
  return request.get('/semantic-manage-data-set-field/columns')
}
export function fetchDataSetFieldSelectColumns () {
  return request.get('/semantic-manage-data-set-field-select/columns')
}
// 获取关联条件表头数据
export function fetchConditionColumns () {
  return request.get('/semantic-manage-condition/columns')
}
// 获取查询条件表头数据
export function fetchQueryColumns () {
  return request.get('/semantic-manage-query/columns')
}
// 主题树列表
// export function fetchThemeList () {
//   return request.post('', manage + '/crBaseManage/topic/getTopicCatalog', {entity: {}})
// }
export function fetchThemeList () {
  return request.post(base, 'wis-manage/crTopic/getTopicCatalog', {
    entity: {}
  })
}
// 数据集-数据集列表
export function fetchDataSetList (topicId, p) {
  return request.post('', manage + '/crTopicElementManage/dsList', {topicId, ...p})
}
// 数据集-新增数据集列表
export function fetchDataSetAddList (param) {
  return request.post('', manage + '/crTopicElementManage/addDsList', param)
}
// 数据集-删除数据集列表
export function fetchDataSetDeleteList (id) {
  return request.post('', manage + '/crTopicElementManage/delDs', {id})
}
// 数据集-修改数据集
export function modifyDataSet (param) {
  return request.post('', manage + '/crTopicElementManage/editDs', {entity: param})
}
// 数据集-新增数据集
export function addDataSet (param) {
  return request.post('', manage + '/crTopicElementManage/addDs', {entity: param})
}
// 数据集字段-数据集字段列表
export function fetchDataSetFieldList (topicId, p) {
  return request.post('', manage + '/crTopicElementManage/crTopicFiledList', {topicId, ...p})
}
// 数据集字段-数据集字段新增列表
export function fetchDataSetFieldAddList (param) {
  return request.post('', manage + '/crTopicElementManage/addCrTopicFiledList', param)
}
// 数据集字段-修改数据集字段
export function modifyDataSetField (param) {
  return request.post('', manage + '/crTopicElementManage/editCrTopicFiled', {entity: param})
}
// 数据集字段-新增数据集字段
export function addDataSetField (param) {
  return request.post('', manage + '/crTopicElementManage/addCrTopicFiled', {entity: param})
}
export function fetchDataSetFieldDeleteList (id) {
  return request.post('', manage + '/crTopicElementManage/delCrTopicFiled', {id})
}
// 关联条件-关联条件列表
export function fetchAssociatedConditionList (topicId, p) {
  return request.post('', manage + '/crTopicElementManage/crTopicDsRelation', {topicId, ...p})
}
// 关联条件-删除关联条件
export function deleteAssociatedConditionList (id) {
  return request.post('', manage + '/crTopicElementManage/delCrTopicDsRelation', {id})
}
// 关联条件-关联条件配置列表
export function fetchAssociatedConditionConfigList (relationId, p) {
  return request.post('', manage + '/crTopicElementManage/crTopicDsRelationConfigList', {relationId, ...p})
}
// 关联条件-配置关联条件列表删除
export function deleteAssociatedConditionConfigList (id) {
  return request.post('', manage + '/crTopicElementManage/delCrTopicDsRelationConfig', {id})
}
// 关联条件-配置关联条件列表修改
export function modifyAssociatedConditionConfigList (param) {
  return request.post('', manage + '/crTopicElementManage/editCrTopicDsRelationConfig', {entity: param})
}
// 关联条件-配置关联条件列表新增
export function addAssociatedConditionConfigList (param, topicId) {
  return request.post('', manage + '/crTopicElementManage/addCrTopicDsRelationConfig', {topicId, entity: param})
}
// 关联条件-关联条件初始化
export function initAssociatedConditionList (topicId) {
  return request.post('', manage + '/crTopicElementManage/crTopicDsRelationInitialize', {topicId})
}
// 关联条件-确定按钮
export function initAssociatedConditionConfirm (topicId) {
  return request.post('', manage + '/crTopicElementManage/checkReportConfigDeploy', {topicId})
}
// 查询条件-查询条件列表
export function fetchQueryConditionList (p) {
  return request.post('', manage + '/crTopicElementManage/crTopicQueryCriteria', p)
}
// 查询条件-保存
export function saveQueryConditionList (param) {
  return request.post('', manage + '/crTopicElementManage/saveCrTopicQueryCriteria', {entity: param})
}
// 删除选中项
export function remove (id) {
  return request.post(base, '/valueshare/project/remove', {
    id: id
  })
}
// 添加项目
export function add (data) {
  return request.post(base, '/valueshare/project/post', {entity: data})
}
// 更新数据 编辑
export function update (data) {
  return request.post(base, '/valueshare/project/put', {entity: data})
}
// 复制数据
export function copy (data) {
  return request.post(base, '/valueshare/project/copy', {entity: data})
}
// 查询详情
export function fetchById (id) {
  return request.post(base, '/valueshare/project/get', {
    id: id
  })
}
// 附件列表查询
export function fetchAttachmentList (param, p) {
  return request.post(base, '/valueshare/project/attachment/getList', {entity: param, ...p})
}
// 附件增加
export function addAttachmentList (data) {
  return request.post(base, '/valueshare/project/attachment/post', {entity: data})
}
// 附件删除
export function removeAttachmentList (data) {
  return request.post(base, '/valueshare/project/attachment/remove', {entity: data})
}
