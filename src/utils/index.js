export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
export function parseForm (datas, form) {
  datas.forEach((item) => {
    if (item.type !== 'row' && item.type !== 'col') {
      form[item.name] = item.value
    } else {
      parseForm(item.columns || item.children, form)
    }
  })
}

export function mixinIgnoreEmptyVal (src, target) {
  for (let [key, value] of Object.entries(target)) {
    if (typeof value === 'string') {
      if (value.trim()) {
        src[key] = value.trim()
      }
    } else if (typeof value !== 'undefined' && value !== null && key !== 'isTrusted') {
      src[key] = value
    }
  }
}

export function parseDate (dateStr, format = 'YYYY-MM-dd HH:mm:ss') {
  let tmp = dateStr.split(' ')
  let y = tmp[0].split('-')
  let t = tmp[1].split(':')
  let d = new Date()
  d.setFullYear(parseInt(y[0], 10))
  d.setMonth(parseInt(y[1], 10) - 1)
  d.setDate(parseInt(y[2], 10))
  d.setHours(parseInt(t[0], 10))
  d.setMinutes(parseInt(t[1], 10))
  d.setSeconds(parseInt(t[2], 10))
  d.setMilliseconds(0)
  return d
}
export function PropToArray (prop, arr) {
  var _arr = []
  arr.forEach((item) => {
    _arr.push(item[prop])
  })
  return _arr
}
export function HideColumns (props, arr) {
  var _arr = JSON.parse(JSON.stringify(arr))
  for (var i = 0; i < props.length; i++) {
    _arr.forEach((item) => {
      if (item.prop === props[i]) {
        item.status = 0
      }
    })
  }
  return _arr
}
export function SortColumns (sorts, arr) {
  var _arr = JSON.parse(JSON.stringify(arr))
  sorts.unshift('id')
  var _curArr = []
  for (var i = 0; i < sorts.length; i++) {
    _arr.forEach((item) => {
      if (item.prop === sorts[i]) {
        item.cid = 'c' + (i + 1)
        _curArr.push(item)
      }
    })
  }
  return _curArr
}
export function GetValueFromArray (arr, id, value, prop) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][id] === value) {
      return arr[i][prop]
    }
  }
}
