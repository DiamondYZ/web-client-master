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
    label: '表', // 表
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'tableMain',
    cid: 'c2'
  },
  {
    label: '关联表', // 关联表
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'tableAssist',
    cid: 'c3'
  },
  {
    label: '状态', // 状态
    status: 1, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'relationFlag',
    cid: 'c4'
  },
  {
    label: '关联字段', // 关联字段
    status: 2, // 0: 不允许显示, 1: 显示, 2: 隐藏,
    type: 'String',
    prop: 'relationDesc',
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
