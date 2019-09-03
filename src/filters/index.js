
const sizeUnits = [
  {label: 'GB', value: 1024 * 1024 * 1024},
  {label: 'MB', value: 1024 * 1024},
  {label: 'KB', value: 1024},
  {label: 'B', value: 1}
]
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if (!time) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else if (typeof time === 'string') {
    let tmp = time.split(' ')
    let y = tmp[0].split('-')
    let t = tmp[1].split(':')
    date = new Date()
    date.setFullYear(y[0])
    date.setMonth(parseInt(y[1], 10) - 1)
    date.setDate(y[2])
    date.setHours(t[0])
    date.setMinutes(t[1])
    date.setSeconds(t[2])
  } else {
    date = new Date(parseInt(time, 10))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function fileSize (val) {
  let size = val || 0
  let sizeParts = []
  for (let i = 0, len = sizeUnits.length; i < len; i++) {
    let result = size > sizeUnits[i].value ? size / sizeUnits[i].value : 0
    size = size % sizeUnits[i].value
    if (result > 0) {
      sizeParts.push(Math.round(result * 100) / 100 + sizeUnits[i].label)
      break
    }
    if (size === 0) {
      break
    }
  }
  return sizeParts.join(' ')
}

export function systemFilter (val) {
  let ret = ''
  switch (val) {
    case 'I':
      ret = 'WIS'
      break
    case 'IE':
      ret = 'EOSS'
      break
    case 'E':
      ret = 'EOSS'
      break
    case 'P':
      ret = 'PERSON'
      break
    case 'W':
      ret = 'WEMS'
      break
    default:
      ret = 'WIS'
  }
  return ret
}
