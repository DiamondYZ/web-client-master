<template>
  <div class="full-height production-catalogue-index">
    <!--<toolbar>-->
      <!--<toolbar-group>-->
        <!--<el-button type='border-orange' @click='showAddDialog'>-->
          <!--<svg-icon icon-class='wis_xinzeng'></svg-icon>{{$t('action.add')}}</el-button>-->
        <!--<el-button type='border-orange' @click='confirmRemove' :disabled='!productionCatalogue.id'>-->
          <!--<svg-icon icon-class='wis_shanchu'></svg-icon>{{$t('action.remove')}}</el-button>-->
      <!--</toolbar-group>-->
    <!--</toolbar>-->
    <el-container class="app-wrapper basic-data-production-catalogue full-height">
      <!--<el-row :gutter='24'>-->
      <!--<el-col :span='12'>-->
      <el-aside :width="isSidebarCollapse ? miniAsideWidth : asideWidth" class="catalogue-tree-container full-height">
        <catalogue-tree-view ref='tree' :tree-title='treeTitle' :tree-data='treeData' @node-click='handleTreeClick'
                             @data-change='handleTreeChange' :set-expand-number="setExpandNumber"></catalogue-tree-view>
      </el-aside>
      <!--</el-col>-->
      <!--<el-col :span='12'>-->
      <el-main style="padding:0 20px 0 20px">
        <div>
          <titlebar>
            <template slot='left'>
              <span>主题列表</span>
            </template>
            <template slot='right'>
              <div>
                <el-button type='text-orange' @click='showAddDialog(true)' :disabled='!code.code'>
                  <svg-icon icon-class='wis_bianji'></svg-icon>{{$t('action.edit')}}</el-button>
                <el-button type='text-orange' @click='confirmRemove' :disabled='!(code.code && listData.length > 0 && selectedDataList.length > 0)'>
                  <svg-icon icon-class='wis_shanchu'></svg-icon>{{$t('action.remove')}}</el-button>
              </div>
            </template>
          </titlebar>
          <div class='main-data-view__content'>
            <el-row>
                <details-list-view  ref='list' :code="code" @data-save="saveData" @selected="selectedData"></details-list-view>
            </el-row>
          </div>

          <!-- 新增弹出框  -->
          <el-dialog
            :visible.sync='addDialogVisible'
            width='30%'
            title="应用主题"
            :close-on-press-escape='false' :close-on-click-modal='false' :show-close='false'
            append-to-body>
            <div style="height:260px;overflow: auto">
              <production-table-view :code="code" ref="addTheme" @selected="selectedTree"></production-table-view>
            </div>
            <div slot='footer' class='dialog-footer'>
              <el-button type='bg-black' @click='addDialogVisible = false'>{{$t('action.cancel')}}</el-button>
              <el-button type='bg-orange' @click='confirmAdd' :disabled="!(selectedTreeDataList.length > 0)">{{$t('action.confirm')}}</el-button>
            </div>
          </el-dialog>
        </div>
      </el-main>
      <!--</el-col>-->
      <!--</el-row>-->

    </el-container>
  </div>
</template>

<script>
  import LayoutResizable from '@/components/layoutResizable/Index'
  import CatalogueTreeView from './CatalogueTreeView'
  import DetailsListView from './DetailsListView'
  import {treeList, add, remove} from '@/api/semanticPermission'
  import Titlebar from '@/components/titlebarWis/Index'
  import Toolbar from '@/components/toolbar/Toolbar'
  import ToolbarGroup from '@/components/toolbar/ToolbarGroup'
  import QueryForm from '@/components/form/QueryForm'
  import ProductionTableView from './ProductionTableView'

  export default {
    name: 'ProductionCatalogue',
    data () {
      return {
        setExpandNumber: null,
        param: {},
        code: {},
        listData: [],
        selectedDataList: [],
        selectedTreeDataList: [],
        treeTitle: '应用主题分组',
        isSidebarCollapse: false,
        asideWidth: '300px',
        miniAsideWidth: '64px',
        treeData: [],
        productionCatalogue: {},
        emptyPlaceholder: '-',
        selectProductionDialogVisible: false,
        selectedProductionData: null,
        addDialogVisible: false,
        queryForm: {
          number: ''
        },
        currentPage: 1,
        pageSize: 10,
        total: 0,
        currentRow: null,
        loading: false,
        editable: false
      }
    },
    created () {
      this.getTreeData()
    },
    watch: {
    },
    methods: {
      selectedTree (val) {
        this.selectedTreeDataList = val
        console.info('选中的树数据', this.selectedTreeDataList)
      },
      selectedData (val) {
        this.selectedDataList = val
      },
      saveData (val) {
        console.info('返回的列表数据', val)
        this.listData = val
      },
      // 新增产品分类
      showAddDialog () {
        this.addDialogVisible = true
        this.$nextTick(() => {
          if (this.$refs.addTheme) {
            this.$refs.addTheme.loadData()
          }
        })
        this.selectedTreeDataList = []
      },
      confirmAdd () {
        let data = []
        this.selectedTreeDataList.map((item) => {
          if (item.parentId !== null) {
            data.push(
              {
                code: this.code.code,
                crTopic: {
                  id: item.id,
                  topicCode: item.topicCode,
                  topicName: item.topicName,
                  parentId: item.parentId
                }
              }
            )
          }
        })
        console.info('添加的数据', data)
        add(data).then(() => {
          this.addDialogVisible = false
          this.$message({
            type: 'success',
            message: this.$t('message.addSuccess')
          })
          this.addDialogVisible = false
          this.$refs.list.loadData()
        })
      },
      confirmRemove () {
        this.$confirm(this.$t('action.removeWarning'), this.$t('message.tip'), {
          confirmButtonText: this.$t('action.confirm'),
          cancelButtonText: this.$t('action.cancel'),
          type: 'warning'
        }).then(() => {
          let data = []
          for (let i = 0; i < this.selectedDataList.length; i++) {
            data.push(this.selectedDataList[i].id)
          }
          console.info('删除的数据', data)
          remove(data).then(() => {
            this.$message({
              type: 'success',
              message: this.$t('message.removeSuccess')
            })
            this.$refs.list.loadData()
          })
        })
      },
      getTreeData () {
        treeList({}).then((data) => {
          this.treeData = data.result
          console.info('树数据', this.treeData)
        })
      },
      handleDataChange (val) {
        treeList({}).then((data) => {
          this.treeData = data.result
          this.$nextTick(() => {
            this.$refs.tree.refreshNode(val)
          })
        })
      },
      handleTreeClick (val) {
        if (val.code) {
          this.code = val
          console.info('查询的详情', val)
        }
      },
      handleTreeChange (val) {
        treeList({}).then((data) => {
          this.treeData = data.result
        })
      }
    },
    components: {
      Titlebar,
      Toolbar,
      ToolbarGroup,
      QueryForm,
      ProductionTableView,
      CatalogueTreeView,
      LayoutResizable,
      DetailsListView
    }
  }
</script>

<style>
  .production-catalogue-index {
    overflow-x : hidden;
    overflow-y: hidden
  }
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .basic-data-production-catalogue .el-main {
    border-left: 1px solid #DCDFE6;
  }
  .el-aside .catalogue-tree-view {
    position: relative;
    width: 100% !important;
  }
  .basic-data-production-catalogue .catalogue-tree-container {
    transition: width .28s;
    overflow: visible;
    min-height:400px;
    overflow: initial !important;
  }
  .production-catalogue-index .toolbar{
    box-shadow: 0px 2px 0px #dddddd;
  }
</style>
