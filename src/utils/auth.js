import Cookies from 'js-cookie'

const TokenKey = 'Member-Token'
const UserID = 'userID'
const Owner = 'owner'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
export function getUserID () {
  return Cookies.get(UserID)
}

export function setUserID (userID) {
  return Cookies.set(UserID, userID)
}

export function removeUserID () {
  return Cookies.remove(UserID)
}
export function getOwner () {
  return Cookies.get(Owner)
}

export function setOwner (owner) {
  return Cookies.set(Owner, owner)
}

export function removeOwner () {
  return Cookies.remove(Owner)
}
