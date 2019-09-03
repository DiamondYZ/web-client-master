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
    label: '字段语义名', // 字段语义名
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'fieldShowName',
    cid: 'c2'
  },
  {
    label: '字段名称', // 字段名称
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'fieldCode',
    cid: 'c3'
  },
  {
    label: '数据源名称', // 数据源名称
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'dsTable',
    cid: 'c4'
  },
  {
    label: '字段类型', // 字段类型
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'fieldType',
    cid: 'c5'
  },
  {
    label: '字段长度', // 字段长度
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'fieldPrecision',
    cid: 'c6'
  },
  {
    label: '字段描述', // 字段描述
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'fieldDesc',
    cid: 'c7'
  },
  {
    label: '数据字典', // 字段描述
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'classCode',
    cid: 'c8'
  },
  {
    label: '为空默认值', // 为空默认值
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'ifnullValue',
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
