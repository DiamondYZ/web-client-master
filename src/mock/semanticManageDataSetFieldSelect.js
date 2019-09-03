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
    label: '字段名称', // 字段名称
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'column_name',
    cid: 'c2'
  },
  {
    label: '字段类型', // 字段类型
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'column_type',
    cid: 'c3'
  },
  {
    label: '字段描述', // 字段描述
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'column_comment',
    cid: 'c4'
  },
  // {
  //   label: '字段长度', // 字段长度
  //   status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
  //   type: 'String',
  //   prop: 'fieldPrecision',
  //   cid: 'c5'
  // },
  {
    label: '语义名', // 字段语义名
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'field_show_name',
    cid: 'c6'
  },
  {
    label: '数据字典', // 字段语义名
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'classCode',
    cid: 'c6'
  },
  {
    label: '为空默认值', // 为空默认值
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'ifnullValue',
    cid: 'c7'
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
