<template>
  <div class="tags-view">
    <router-link ref="tag" class="tags-view__item" :class="isActive(tag) ? 'active' : ''" v-for="tag in Array.from(visitedViews)" :key="tag.path" :to="tag.path">
      {{tag.title}}
      <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
    </router-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'TagsView',
    computed: {
      ...mapGetters(['visitedViews'])
    },
    watch: {
      $route () {
        this.addViewTags()
        // this.moveToCurrentTag()
      }
    },
    mounted () {
      this.addViewTags()
    },
    methods: {
      generateRoute () {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive (route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      addViewTags () {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.$store.dispatch('addVisitedViews', route)
      },
      moveToCurrentTag () {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag.$el)
              break
            }
          }
        })
      },
      closeSelectedTag (view) {
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView.path)
            } else {
              this.$router.push('/')
            }
          }
        })
      }
    }
  }
</script>

<style>
  .tags-view__item {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin-left: 8px;
    padding: 0 10px;
    background-color: #909399;
  }
  .tags-view__item.active {
    background-color: #FFFFFF;
  }
  .tags-view {
    display: inline-block;
  }
</style>