const menus = {
  response: {
    status: 200,
    result: [
      {
        id: 99,
        title: '初始化数据管理',
        label: '初始化数据管理',
        icon: 'el-icon-setting',
        children: [
          {
            id: 991,
            path: '/app-group-init',
            code: 'appGroupInit',
            title: '租户角色初始化管理',
            label: '租户角色初始化管理',
            icon: 'el-icon-setting',
            children: []
          },
          {
            id: 992,
            path: '/mata-data-init',
            code: 'MetaDataInit',
            title: '字典初始化数据管理',
            label: '字典初始化数据管理',
            icon: 'el-icon-setting',
            children: []
          }]
      },
      {
        id: 1,
        title: '租户管理',
        label: '租户管理',
        icon: 'el-icon-setting',
        children: [
          {
            id: 11,
            path: '/mata-data',
            code: 'MetaData',
            title: '租户字典管理',
            label: '租户字典管理',
            icon: 'el-icon-setting',
            children: []
          },
          {
            id: 12,
            path: '/owner-menu',
            code: 'OwnerMenu',
            title: '租户菜单管理',
            label: '租户菜单管理',
            icon: 'el-icon-setting',
            children: []
          },
          {
            id: 13,
            path: '/owner-user',
            code: 'OwnerUser',
            title: '租户人员管理',
            label: '租户人员管理',
            icon: 'el-icon-setting',
            children: []
          },
          {
            id: 14,
            path: '/sale-order-style',
            code: 'saleOrderStyle',
            title: '租户销售订单',
            label: '租户销售订单',
            icon: 'el-icon-setting',
            children: []
          },
          {
            id: 15,
            path: '/process-flow-style',
            code: 'processFlowStyle',
            title: '租户工艺流程',
            label: '租户工艺流程',
            icon: 'el-icon-setting',
            children: []
          }]
      },
      {
        id: 2,
        title: 'WIS管理',
        label: 'WIS管理',
        icon: 'el-icon-setting',
        children: [{
          id: 20,
          path: '/serializeRule',
          code: 'SerializeRule',
          title: '序列号规则',
          label: '序列号规则',
          icon: 'el-icon-setting',
          children: []
        },
        {
          id: 21,
          path: '/report-menu',
          code: 'ReportMenu',
          title: '报表管理',
          label: '报表管理',
          icon: 'el-icon-setting',
          children: []
        },
        {
          id: 22,
          path: '/gatewayMonitoring-data',
          code: 'GatewayMonitoringData',
          title: '网关监控数据',
          label: '网关监控数据',
          icon: 'el-icon-setting',
          children: []
        },

        {
          id: 24,
          path: '/tcc-monitor',
          code: 'TccMonitor',
          title: 'TCC事务明细',
          label: 'TCC事务明细',
          icon: 'el-icon-setting',
          children: []
        },
        {
          id: 25,
          path: '/production-serial-number',
          code: 'productionSerialNumber',
          title: '产品销售序列号管理',
          label: '产品销售序列号管理',
          icon: 'el-icon-setting',
          children: []
        }]
      },
      {
        id: 3,
        title: '自定义报表管理',
        label: '自定义报表管理',
        icon: 'el-icon-setting',
        children: [{
          id: 32,
          title: '主题管理',
          label: '主题管理',
          icon: 'el-icon-setting',
          path: '/theme-manage',
          code: 'themeManage',
          children: []
        }, {
          id: 31,
          title: '语义层管理',
          label: '语义层管理',
          icon: 'el-icon-setting',
          path: '/semantic-manage',
          code: 'semanticManage',
          children: []
        }, {
          id: 33,
          title: '语义层权限',
          label: '语义层权限',
          icon: 'el-icon-setting',
          path: '/semantic-permission',
          code: 'semanticPermission',
          children: []
        }]
      },
      {
        id: 4,
        path: '/message',
        code: 'Message',
        title: '站内信',
        label: '站内信',
        icon: 'el-icon-setting',
        children: []
      }
    ]
  }
}

export default {
  getMenus () {
    return menus
  }
}
