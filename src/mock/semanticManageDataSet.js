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
    label: '数据集名称', // 数据集名称
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'dsCn',
    cid: 'c2'
  },
  {
    label: '数据源类型', // 数据源类型
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'dsType',
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
    label: '数据源描述', // 数据源描述
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'dsDesc',
    cid: 'c5'
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
