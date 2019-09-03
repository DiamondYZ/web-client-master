import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function send (data) {
  return request.post(base, 'wis-manage/message/add', {entity: data})
}
