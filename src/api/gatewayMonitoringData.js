import request from '@/utils/request'
import serviceMap from './serviceMap'

const base = serviceMap['manage']

export function fetchjmxList () {
  return request.post(base, 'wis-manage/gatewayMonitor/jmxList', {})
}

export function fetchjmxItem (id) {
  return request.post(base, 'wis-manage/gatewayMonitor/jmxItem', {id: id})
}
