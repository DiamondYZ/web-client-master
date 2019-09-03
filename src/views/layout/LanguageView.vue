<template>
  <div class="language-view" :class="[isCollapse ? 'language-view--mini': '']">
    中文
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'LanguageView',
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
  .language-view {
    color: #FFFFFF;
    padding-left: 26px;
    height: 72px;
    line-height: 72px;
  }
  .language-view.language-view--mini {
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
</style>