import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['manage']

export function fetchD (ruleId) {
  return request.post(base, 'wis-manage/serializeRuleDetailInit/all', {entity: {ruleId: ruleId}})
}

export function removeD (id) {
  return request.post(base, 'wis-manage/serializeRuleDetailInit/delete', {id: id})
}

export function addD (data) {
  return request.post(base, 'wis-manage/serializeRuleDetailInit/add', {entity: data})
}

export function updateD (data) {
  return request.post(base, 'wis-manage/serializeRuleDetailInit/update', {entity: data})
}
