import request from '@/utils/request'
import serviceMap from './serviceMap'
const base = serviceMap['external']
const base2 = serviceMap['manage']
export function login (username, password, owner) {
  return request.post(base, 'wis-authority/account/login', {
    entity: {
      username: username,
      password: password,
      owner: owner
    }
  })
}
export function loginByToken () {
  return request.post(base2, 'wis-manage/userAuthority/verifyToken', {
    entity: {
    }
  })
}

export function loginWithVerifyKey (username, password, owner, verifyKey, verifyValue) {
  return request.post(base, 'wis-authority/account/login', {
    entity: {
      username: username,
      password: password,
      owner: owner,
      verifyKey: verifyKey,
      verifyValue: verifyValue
    }
  })
}

export function genVerifyImage (uuid) {
  return request.post(base, 'memberCenter/verifyImage/getImage', {
    verifyKey: uuid
  })
}

export function uuidv4 () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0
    let v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function logout () {
  return request.post(base, 'wis-authority/account/logout')
}

export function getMemberInfo (userId) {
  return request.post(base, 'saas-wis-external/userController/user', {
    entity: {
      userId: userId
    }
  })
}
