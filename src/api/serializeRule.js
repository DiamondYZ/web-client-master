import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetch (param, p) {
  return request.post(base, 'wis-manage/serializeRuleInit/page', {entity: param, ...p})
}

export function remove (id) {
  return request.post(base, 'wis-manage/serializeRuleInit/delete', {id: id})
}

export function add (data) {
  return request.post(base, 'wis-manage/serializeRuleInit/add', {entity: data})
}

export function update (data) {
  return request.post(base, 'wis-manage/serializeRuleInit/update', {entity: data})
}

export function sync () {
  return request.post(base, 'wis-manage/serializeRuleInit/sync')
}
