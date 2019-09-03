<template>
<el-container class="app-wrapper">
  <el-aside :width="isSidebarCollapse ? miniAsideWidth : asideWidth" class="sidebar-container"><sidebar></sidebar></el-aside>
  <el-container>
    <el-header class="app-header" :height="'auto'">
      <div class="app-header__content">
        <div class="app-header__left">
          <language-view></language-view>
          <tags-view></tags-view>
        </div>
        <div class="app-header__right">
          <header-menu class="app-header__menu"></header-menu>
          <current-user></current-user>
        </div>

      </div>
    </el-header>
    <el-main class="app-content">

      <app-main></app-main>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
  import AppMain from './AppMain'
  import Sidebar from './sidebar/Index'
  import TagsView from './TagsView'
  import LanguageView from './LanguageView'
  import CurrentUser from './CurrentUser'
  import HeaderMenu from './HeaderMenu'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Layout',
    data () {
      return {
        asideWidth: '180px',
        miniAsideWidth: '64px'
      }
    },
    computed: {
      ...mapGetters(['headerbar', 'sidebar']),
      isHeaderbarCollapse () {
        return !this.headerbar.opened
      },
      isSidebarCollapse () {
        return !this.sidebar.opened
      }
    },
    components: {
      AppMain,
      Sidebar,
      TagsView,
      LanguageView,
      CurrentUser,
      HeaderMenu
    }
  }
</script>

<style>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .el-main.app-content {
    padding-top: 0px;
    height: 100%;
  }
  .app-header {
    background-color: #3d3d3d;
    padding: 0px 0px;
  }
  .app-header__content {
    display: flex;
    justify-content: space-between;
  }
  .app-header__right {
    display: flex;
  }
  .app-header__menu {
    align-self: flex-end;
  }
  .sidebar-container {
    transition: width .28s;
    background-color: #1b1b1b;
    overflow: visible;
  }
</style>