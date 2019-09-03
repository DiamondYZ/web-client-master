import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import errors from './zh/error-zh'

export default {
  zh: {
    ...elementZhLocale,
    server: {
      6001: '查询失败，请确认查询条件是否有错误',
      6002: '非分页查询返回记录数超过最大设置',
      6101: '新增数据错误，请再次确认数据格式是否有错误',
      6201: '修改数据错误，请确认',
      6202: '未找到要修改的数据，请刷新页面后确认',
      6301: '删除错误，请从新尝试删除',
      6302: '未找到删除对象，请刷新页面后，确认',
      8001: '提交表单数据格式错误，请再次确认后提交',
      8002: '产品销售序列号重复，请更改后再次提交',
      8003: '表单必填项没有填写，请再次确认后提交',
      8004: '表单必填项没有填写，请再次确认后提交',
      9001: '请求参数错误，请再次确认后提交',
      9002: '编号重复，请再次确认后提交',
      403: '会话超时，请重新登录',
      40131: '你已被登出，可以取消继续留在该页面，或者重新登录',
      40331: '客户端无权限',
      40101: 'token异常',
      40102: '会话超时，请重新登录',
      40103: '手机号码、密码或租户不正确',
      40104: '会话超时，请重新登录',
      40105: '注册失败，请联系管理员',
      40106: '登出失败',
      70001: '请求参数错误',
      80001: '数据集存在已关联的字段，不能删除，如删除，请先删除表的字段！',
      80002: '修改名称重复！',
      80003: '数据集下有已保存关联条件，不许删除',
      80004: '主题名称重复',
      80005: '数据集字段有关联不能删除',
      80006: '查询条件已关联报表，不可勾掉！',
      90001: '一级菜单下有二级菜单，无法删除！',
      90005: '主题下有数据集不能删除',
      500: '系统异常，请联系管理员'
    },
    login: {
      nameRequired: '用户名不能为空',
      passRequired: '密码不能为空',
      ownerRequired: '租户不能为空',
      verifyKeyRequired: '验证码不能为空'
    },
    action: {
      confirm: '确定',
      cancel: '取消',
      remove: '删除',
      add: '新增',
      copy: '复制',
      import: '导入',
      export: '导出',
      edit: '编辑',
      revise: '修改',
      save: '保存',
      sync: '同步',
      enable: '启用',
      disable: '不启用',
      reset: '恢复',
      launch: '启动',
      pause: '暂停',
      launchManual: '手动执行',
      normal: '点检正常',
      exception: '点检异常',
      unexecuted: '未执行',
      review: '跟踪',
      assign: '下达',
      finish: '完成',
      close: '关闭',
      init: '初始化',
      removeWarning: '此操作将永久删除选中数据, 是否继续?',
      changeActionWaring: '此操作将状态更改为{0}, 是否继续?'
    },
    message: {
      copySuccess: '复制成功',
      copyFailed: '复制失败',
      removeSuccess: '删除成功',
      removeFailed: '删除失败',
      numberConflict: '编号重复',
      addSuccess: '添加成功',
      addFailed: '添加失败',
      updateSuccess: '修改成功',
      updateFailed: '修改失败',
      launchManualSuccess: '手动执行成功',
      launchManualFailed: '手动执行失败',
      changeStateSuccess: '状态修改成功',
      changeStateFailed: '状态修改失败',
      tip: '提示'
    },
    page: {

    },
    errors: {
      ...errors
    },
    entity: {}
  }
}
