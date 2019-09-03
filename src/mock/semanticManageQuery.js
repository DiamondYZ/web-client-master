// import {i18n} from '@/lang/i18n-setup'
const columns = [
  {
    label: 'id',
    status: 0, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'id',
    cid: 'c1'
  },
  {
    label: '', // 是否可用
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'Boolean',
    prop: 'isCheck',
    cid: 'c2'
  },
  {
    label: '数据源名称', // 数据源名称
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'dsTableCode',
    cid: 'c3'
  },
  {
    label: '字段名称', // 字段名称
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'fieldCode',
    cid: 'c4'
  },
  {
    label: '语义名', // 语义名
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'fieldName',
    cid: 'c5'
  },
  {
    label: '控件类型', // 控件类型
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'controlType',
    cid: 'c6'
  },
  {
    label: '条件', // 条件
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'controlCondition',
    cid: 'c7'
  },
  {
    label: '是否必填', // 是否必填
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'Boolean',
    prop: 'ifNull',
    cid: 'c8'
  },
  {
    label: '数据集合', // 数据集合
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'showDs',
    cid: 'c9'
  }
]
export default{
  getColumns () {
    return {
      response: {
        status: 200,
        result: columns
      }
    }
  }
}
