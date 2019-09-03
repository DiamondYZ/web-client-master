<template>
  <div class="header-menu">
    <i @click="toggleHeaderbar" :class="[isCollapse ? 'el-icon-caret-bottom' : 'el-icon-caret-top']"></i>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'HeaderMenu',
    computed: {
      ...mapGetters([
        'headerbar'
      ]),
      isCollapse () {
        return !this.headerbar.opened
      }
    },
    methods: {
      ...mapActions(['toggleHeaderbar'])
    }
  }
</script>

<style>
  .header-menu {
    color: #FFFFFF;
    font-size: 32px;
  }
</style>