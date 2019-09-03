<template>
  <div class="app-main">
     <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'AppMain',
    computed: {
      ...mapGetters(['cachedViews'])
    }
  }
</script>

<style>
  .app-main {
    height: 100%;
  }
</style>