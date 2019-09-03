import request from '@/utils/request'
import serviceMap from './serviceMap'

const base = serviceMap['manage']

export function fetchTccMain (data) {
  return request.post(base, 'wis-manage/tccManager/getTccTransactionMainList', {entity: data})
}

export function fetchTccDetail (id) {
  return request.post(base, 'wis-manage/tccManager/getTccTransactionStepList', {entity: {transactionTxId: id}})
}
