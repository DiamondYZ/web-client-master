export default {
  'MetaData': () => import('./metaData/Index'),
  'MetaDataInit': () => import('./metaDataInit/Index'),
  'OwnerMenu': () => import('./OwnerMenu/Index'),
  'OwnerUser': () => import('./OwnerUser/Index'),
  'Message': () => import('./message/Index'),
  'OpenCompany': () => import('./openCompany/Index'),
  'SerializeRule': () => import('./serializeRule/Index'),
  'ReportMenu': () => import('./ReportMenu/Index'),
  'GatewayMonitoringData': () => import('./GatewayMonitoringData/Index'),
  'TccMonitor': () => import('./TccMonitor/Index'),
  'productionSerialNumber': () => import('./ProductionSerialNumber/Index'),
  'appGroupInit': () => import('./appGroupInit/Index'),
  'saleOrderStyle': () => import('./ownerStyle/saleOrderStyle/Index'),
  'processFlowStyle': () => import('./ownerStyle/processFlowStyle/Index'),
  'semanticManage': () => import('./customReport/semanticManage/Index'),
  'themeManage': () => import('./customReport/themeManage/Index'),
  'semanticPermission': () => import('./customReport/semanticPermission/Index')
}
