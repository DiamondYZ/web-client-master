import Mock from 'mockjs'
import menuAPI from './menu'
import semanticManageDataSetAPI from './semanticManageDataSet'
import semanticManageDataSetFieldAPI from './semanticManageDataSetField'
import semanticManageConditionAPI from './semanticManageCondition'
import semanticManageQueryAPI from './semanticManageQuery'
import semanticManageDataSetSelect from './semanticManageDataSetSelect'
import semanticManageDataSetFieldSelect from './semanticManageDataSetFieldSelect'
// 自定义报表--语义层管理-关联条件
Mock.mock(/\/semantic-manage-condition\/columns/, 'get', semanticManageConditionAPI.getColumns)
// 自定义报表--语义层管理-查询条件
Mock.mock(/\/semantic-manage-query\/columns/, 'get', semanticManageQueryAPI.getColumns)
// 菜单项
Mock.mock(/\/admin\/menu\/tree/, 'get', menuAPI.getMenus)
// 自定义报表--语义层管理-数据集
Mock.mock(/\/semantic-manage-data-set\/columns/, 'get', semanticManageDataSetAPI.getColumns)
// 自定义报表--语义层管理-数据集字段
Mock.mock(/\/semantic-manage-data-set-field\/columns/, 'get', semanticManageDataSetFieldAPI.getColumns)
// 自定义报表--语义层管理-数据集新增
Mock.mock(/\/semantic-manage-data-set-select\/columns/, 'get', semanticManageDataSetSelect.getColumns)
// 自定义报表--语义层管理-数据集字段新增
Mock.mock(/\/semantic-manage-data-set-field-select\/columns/, 'get', semanticManageDataSetFieldSelect.getColumns)
