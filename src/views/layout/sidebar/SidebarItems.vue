<template>
  <div class="sidebar">
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <el-menu-item v-if="item.children.length === 1 && !item.children[0].children" :key="item.children[0].name" :index="item.path + '/' + item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
        <i v-if="item.children[0].meta && item.children[0].meta.icon" :class="[item.children[0].meta.icon]"></i>
        <span slot="title">{{item.children[0].meta.title}}</span>
      </el-menu-item>
      <el-submenu v-else :index="item.name || item.path" :key="item.name">
        <template slot="title">
          <i v-if="item.meta&&item.meta.icon" :class="[item.meta.icon]"></i>
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-items :is-nest="true" v-if="child.children && child.children.length > 0" :routes="[child]" :key="child.path"></sidebar-items>
          <el-menu-item v-else :index="item.paht + '/' + child.path" :key="child.name">
            <i v-if="child.meta && child.meta.icon" :class="[child.meta.icon]"></i>
            <span v-if="child.meta && child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItems',
    props: {
      routes: {
        type: Array,
        required: true,
        isNest: {
          type: Boolean,
          default: false
        }
      }
    }
  }
</script>

<style>
</style>