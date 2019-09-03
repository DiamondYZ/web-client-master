let serviceMap
switch (process.env.ENV_CONFIG) {
  case 'dev': // 开发
    serviceMap = {
      equipment: '',
      lookup: '',
      'external': '',
      user: '',
      warehouse: '',
      manage: ''
    }
    break
  case 'preprod': // 预生产
    serviceMap = {
      equipment: '',
      lookup: '',
      'external': '',
      user: '',
      warehouse: '',
      manage: ''
    }
    break
  default: // 生产
    serviceMap = {
      equipment: '',
      lookup: '',
      'external': '',
      user: '',
      warehouse: '',
      manage: ''
    }
}

export default serviceMap
