<template>
  <div class="sidebar">
    <el-menu :default-active="$route.path" :collapse="isCollapse" :router="true" mode="vertical" background-color="#1b1b1b" text-color="#ffffff" active-text-color="#fabf40">
      <el-menu-item index="/workbench">
        <i class="el-icon-menu"></i>
        <span slot="title">工作空间</span>
      </el-menu-item>
      <template v-for="menu in menus">
        <!-- menu level 1, no submenu -->
        <el-menu-item v-if="menu.children.length === 0" :key="menu.id" :index="menu.path || menu.id + ''">
          <i v-if="menu.icon" :class="[menu.icon]"></i>
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
        <!-- menu level 1, has submenu-->
          <el-submenu v-else :key="menu.id" :index="menu.path || menu.id + ''">
            <template slot="title">
              <i v-if="menu.icon" :class="[menu.icon]"></i>
              <span slot="title">{{menu.title}}</span>
            </template>
            <template v-for="child1 in menu.children">
              <!-- menu level 2, no submenu -->
              <el-menu-item v-if="child1.children.length === 0" :key="child1.id" :index="child1.path || child1.id + ''">
                <i v-if="child1.icon" :class="[child1.icon]"></i>
                <span slot="title">{{child1.title}}</span>
              </el-menu-item>
              <!-- menu level 2, has submenu -->
              <el-submenu v-else :key="child1.id" :index="child1.path || child1.id + ''">
                <template slot="title">
                  <i v-if="child1.icon" :class="[child1.icon]"></i>
                  <span slot="title">{{child1.title}}</span>
                </template>
                <template v-for="child2 in child1.children">
                  <!-- menu level 3, no submenu -->
                  <el-menu-item :key="child2.id" :index="child2.path || child2.id + ''">
                    <i v-if="child2.icon" :class="[child2.icon]"></i>
                    <span slot="title">{{child2.title}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-submenu>
      </template>
    </el-menu>
    <div class="sidebar__toggle-open">
      <span class="sidebar__toggle-btn" @click="toggleSidebar">
        <i :class="[isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Sidebar',
    computed: {
      ...mapGetters([
        'menus',
        'sidebar'
      ]),
      isCollapse () {
        return !this.sidebar.opened
      }
    },
    methods: {
      ...mapActions(['toggleSidebar'])
    }
  }
</script>

<style>

  .sidebar__toggle-open {
    position: relative;
    font-size: 32px;
    text-align: center;
    transition: width .28s;
    background-color: #1b1b1b;
    color: #FFFFFF;
  }
  /*.sidebar__toggle-btn {
    background-color: #1b1b1b;
  }
  .sidebar__toggle-open::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: #FFFFFF;
    z-index: 0;
  }*/
</style>