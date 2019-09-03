import request from '@/utils/request'
export function fetchMenus () {
  return request.get('/admin/menu/tree')
}
