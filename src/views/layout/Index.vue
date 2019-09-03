<template>
  <el-container class="app-wrapper">
    <el-header class="app-header">Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main class="app-content">
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import AppMain from './AppMain'
  export default {
    name: 'Layout',
    components: {
      AppMain
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
</style>