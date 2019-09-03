import Cookies from 'js-cookie'
let storage = window.localStorage || window.sessionStorage || Cookies
export default {
  get (k) {
    return storage.get ? storage.get(k) : storage.getItem(k)
  },
  set (k, v) {
    storage.set ? storage.set(k, v) : storage.setItem(k, v)
  },
  remove (k) {
    storage.remove ? storage.remove(k) : storage.removeItem(k)
  }
}
