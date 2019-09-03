<template>
  <el-container class="app-wrapper">
    <el-aside v-bar :width="isSidebarCollapse ? miniAsideWidth : asideWidth" class="bom-tree-container"
              style="border-right:1px solid lightgray;">
      <div>
        <titlebar>
          <template slot="left">
            <div>主题数据集</div>
          </template>
        </titlebar>
        <div>
          <el-tree :data="treeData"
                   ref="tree"
                   highlight-current
                   default-expand-all
                   :expand-on-click-node="false"
                   :props="defaultProps"
                   @node-click="handleNodeClick"
                   node-key="id">
            <span  slot-scope="{ node, data }">
              <template v-if="!data.parentId">
                <svg-icon icon-class="folder" style="font-size: 16px;"></svg-icon>
              </template>
              <template v-else>
                <svg-icon icon-class="wis_weixiugenzongin2"></svg-icon>
              </template>
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </div>
    </el-aside>
    <el-main>
      <div>
        <semantic-main :semantic-id="semanticId"></semantic-main>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import SemanticMain from './SemanticMain'
  import Titlebar from '@/components/titlebarWis/Index'
  import Emitter from 'element-ui/src/mixins/emitter'
  import {fetchThemeList} from '@/api/semanticManage'
  export default {
    name: 'SemanticManage',
    mixins: [Emitter],
    data () {
      return {
        isSidebarCollapse: false,
        asideWidth: '300px',
        miniAsideWidth: '64px',
        treeData: [],
        defaultProps: {
          children: 'childrens',
          label: 'topicName'
        },
        semanticId: ''
      }
    },
    created () {
      this.loadTreeData()
    },
    methods: {
      loadTreeData () {
        fetchThemeList().then((res) => {
          var list = res.result
          var myTree = []
          list.forEach((item) => {
            if (item.childrens.length > 0) {
              myTree.push(item)
            }
          })
          this.treeData = myTree
          this.semanticId = this.treeData[0].childrens[0].id
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.semanticId)
          })
          this.$store.commit('setSemanticId', this.semanticId)
        })
        // setTimeout(() => {
        //   this.treeData = [{
        //     id: '01',
        //     name: '主题分组1',
        //     children: [{
        //       id: '01-1',
        //       name: '主题1'
        //     }, {
        //       id: '01-2',
        //       name: '主题2'
        //     }]
        //   }, {
        //     id: '02',
        //     name: '主题分组2',
        //     children: [{
        //       id: '02-1',
        //       name: '主题1'
        //     }, {
        //       id: '02-2',
        //       name: '主题2'
        //     }]
        //   }]
        //   this.semanticId = this.treeData[0].children[0].id
        //   this.$store.commit('setSemanticId', this.semanticId)
        //   this.$nextTick(() => {
        //     this.$refs.tree.setCurrentKey(this.semanticId)
        //   })
        // }, 30)
      },
      handleNodeClick (data, node) {
        if (data.parentId) {
          if (this.$store.state.customReport.isSemanticDataChange) {
            this.$message({
              message: '查询条件有变化，请先保存',
              type: 'warning'
            })
            this.$refs.tree.setCurrentKey(this.semanticId)
          } else {
            this.semanticId = data.id
            this.$store.commit('setSemanticId', this.semanticId)
          }
        } else {
          this.semanticId = data.id
          this.$store.commit('setSemanticId', '')
        }
      }
    },
    components: {
      Titlebar,
      SemanticMain
    }
  }
</script>

<style scoped>

</style>
