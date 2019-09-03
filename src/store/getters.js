const getters = {
  sidebar: state => state.app.sidebar,
  headerbar: state => state.app.headerbar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.member.token,
  avatar: state => state.member.avatar,
  memberName: state => state.member.memberName,
  status: state => state.member.status,
  roles: state => state.member.roles,
  menus: state => state.permission.menus,
  addRouters: state => state.permission.addRouters
}
export default getters
