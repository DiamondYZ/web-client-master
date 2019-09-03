<template>
  <div class="current-user">
    <div class="current-user__info">
      {{memberName}}
    </div>
    <div class="current-user__avatar" :class="[isCollapse ? 'current-user__avatar--mini' : '']">
      <svg-icon class-name="current-user__avatar-placeholder" icon-class="account" />
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'CurrentUser',
    computed: {
      ...mapGetters(['memberName', 'headerbar']),
      isCollapse () {
        return !this.headerbar.opened
      }
    }
  }
</script>

<style>
  .current-user {
    display: flex;
    padding: 12px 15px;
  }
  .current-user__avatar-placeholder {
    font-size: 60px;
  }
  .current-user__avatar--mini {
    display: none;
  }
</style>