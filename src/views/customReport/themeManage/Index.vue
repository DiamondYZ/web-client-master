<template>
  <div class="full-height production-catalogue-index">
    <toolbar>
      <toolbar-group>
        <el-button type='border-orange' @click='showAddDialog'>
          <svg-icon icon-class='wis_xinzeng'></svg-icon>{{$t('action.add')}}</el-button>
        <el-button type='border-orange' @click='confirmRemove' :disabled='!productionCatalogue.id'>
          <svg-icon icon-class='wis_shanchu'></svg-icon>{{$t('action.remove')}}</el-button>
      </toolbar-group>
    </toolbar>
    <el-container class="app-wrapper basic-data-production-catalogue full-height">
      <!--<el-row :gutter='24'>-->
      <!--<el-col :span='12'>-->
      <el-aside :width="isSidebarCollapse ? miniAsideWidth : asideWidth" class="catalogue-tree-container">
        <catalogue-tree-view ref='tree' :tree-title='treeTitle' :tree-data='treeData' @node-click='handleTreeClick'
                             @data-change='handleTreeChange'></catalogue-tree-view>
      </el-aside>
      <!--</el-col>-->
      <!--<el-col :span='12'>-->
      <el-main style="padding:0 20px 0 20px;">
        <div >
          <titlebar>
            <template slot='left'>
              <div>主题详情</div>
            </template>
            <template slot='right'>
              <el-button type='bg-orange' v-show='!editable' @click='editable = true' :disabled='!productionCatalogue.id'>
                <svg-icon icon-class='wis_bianji'></svg-icon>{{$t('action.edit')}}</el-button>
              <div v-show='editable'>
                <el-button type='text-orange' @click='editable = false'>
                  <svg-icon icon-class='wis_quxiao'></svg-icon>{{$t('action.cancel')}}</el-button>
                <el-button type='text-orange' @click='resetForm'>
                  <svg-icon icon-class='wis_huifu'></svg-icon>{{$t('action.reset')}}</el-button>
                <el-button type='bg-black' @click='saveForm'>
                  <svg-icon icon-class='wis_baocun'></svg-icon>{{$t('action.save')}}</el-button>
              </div>
            </template>
          </titlebar>
          <div class='main-data-view__content' style="box-shadow: 1px 1px 2px #c1c1c1;padding-top: 20px;">
            <el-row>
              <el-col :span='20'>
                <el-form v-show='!editable' label-width='100px' >
                  <el-form-item label="主题编号">
                    {{productionCatalogue.topicCode || emptyPlaceholder}}
                  </el-form-item>
                  <el-form-item label="主题名称">
                    {{productionCatalogue.topicName || emptyPlaceholder}}
                  </el-form-item>
                  <el-form-item label="上级编号">
                    {{productionCatalogue.parentTopicCode || emptyPlaceholder }}
                  </el-form-item>
                  <el-form-item label="上级名称">
                    {{productionCatalogue.parentTopicName || emptyPlaceholder}}
                  </el-form-item>
                  <el-form-item label="主题描述">
                    {{productionCatalogue.topicDesc || emptyPlaceholder}}
                  </el-form-item>
                </el-form>
                <el-form ref='postForm' :model='putForm' :rules='putFormRules' v-if='editable' label-width='130px' >
                  <el-form-item label="主题编号" prop='topicCode'>
                    <el-input  v-model='putForm.topicCode' placeholder="主题编号"></el-input>
                  </el-form-item>
                  <el-form-item label="主题名称" prop='topicName'>
                    <el-input  v-model='putForm.topicName' placeholder="主题名称" :maxlength='200'></el-input>
                  </el-form-item>
                  <el-form-item label="上级编号" prop='parentTopicCode'>
                    <el-input v-model='putForm.parentTopicCode' clearable readonly @clear='clearParent' :disabled="isOk">
                      <el-button slot='append' icon='el-icon-caret-right' @click='showProductionList(true)' :disabled="isOk"></el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="上级名称" prop='parentTopicName'>
                    <span >{{putForm.parentTopicName}}</span>
                  </el-form-item>
                  <el-form-item label="主题描述" prop='topicDesc'>
                    <el-input type='textarea' :rows='10' placeholder="主题描述" v-model='putForm.topicDesc'>
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>

          <!-- 选择主题弹出框  -->
          <el-dialog
            width='60%'
            title="主题名称"
            :visible.sync='selectProductionDialogVisible'
            :close-on-press-escape='false' :close-on-click-modal='false' :show-close='false'
            append-to-body>
            <production-table-view  ref='productionTable' @selected='handleSelectedProductionData' @load='clearSelectedProductionData'>
            </production-table-view>
            <div slot='footer' class='dialog-footer'>
              <el-button type='bg-black' @click='selectProductionDialogVisible = false'>{{$t('action.cancel')}}</el-button>
              <el-button type='bg-orange' @click='comfireProductionNumber' :disabled='!selectedProductionData'>{{$t('action.confirm')}}</el-button>
            </div>
          </el-dialog>

          <!-- 新增产品分类弹出框  -->
          <el-dialog
            :visible.sync='addDialogVisible'
            width='40%'
            title="新增主题"
            :close-on-press-escape='false' :close-on-click-modal='false' :show-close='false'
            append-to-body>
            <el-form ref='addForm' :model='addForm' :rules='addFormRules' label-width='130px' >
              <el-form-item label="主题编号" prop='topicCode'>
                <el-input  v-model='addForm.topicCode' placeholder="主题编号"></el-input>
              </el-form-item>
              <el-form-item label="主题名称" prop='topicName'>
                <el-input  v-model='addForm.topicName' placeholder="主题名称" :maxlength='200'></el-input>
              </el-form-item>
              <el-form-item label="上级编号" prop='parentTopicCode'>
                <el-input v-model='addForm.parentTopicCode' clearable readonly @clear='clearAddParent'>
                  <el-button slot='append' icon='el-icon-caret-right' @click='showProductionList(false)'></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="上级名称" prop='parentTopicName'>
                <span >{{addForm.parentTopicName}}</span>
              </el-form-item>
              <el-form-item label="主题描述" prop='topicDesc'>
                <el-input type='textarea' :rows='10' placeholder="主题描述" v-model='addForm.topicDesc'>
                </el-input>
              </el-form-item>
            </el-form>
            <div slot='footer' class='dialog-footer'>
              <el-button type='bg-black' @click='addDialogVisible = false'>{{$t('action.cancel')}}</el-button>
              <el-button type='bg-orange' @click='confirmAdd'>{{$t('action.confirm')}}</el-button>
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
  import {treeList, add, update, remove, fetchDetail} from '@/api/themeManage'
  import Titlebar from '@/components/titlebarWis/Index'
  import Toolbar from '@/components/toolbar/Toolbar'
  import ToolbarGroup from '@/components/toolbar/ToolbarGroup'
  import QueryForm from '@/components/form/QueryForm'
  import ProductionTableView from './ProductionTableView'

  export default {
    name: 'ProductionCatalogue',
    data () {
      return {
        // setExpandNumber: null,
        param: {},
        treeTitle: '数据集主题',
        isSidebarCollapse: false,
        asideWidth: '300px',
        miniAsideWidth: '64px',
        treeData: [],
        productionCatalogue: {},
        productionCatalogues: {},
        emptyPlaceholder: '-',
        selectProductionDialogVisible: false,
        selectedProductionData: null,
        addDialogVisible: false,
        queryForm: {
          topicCode: ''
        },
        currentPage: 1,
        pageSize: 10,
        total: 0,
        currentRow: null,
        loading: false,
        editable: false,
        isAdd: false,
        putForm: {
          id: null,
          topicCode: null,
          topicName: null,
          parentId: null,
          parentTopicCode: null,
          parentTopicName: null,
          topicDesc: null
        },
        addForm: {
          id: null,
          topicCode: null,
          topicName: null,
          parentId: null,
          parentTopicCode: null,
          parentTopicName: null,
          topicDesc: null
        },
        putFormRules: {
          topicCode: [
            { required: true, message: '主题编码不能为空', trigger: 'change' }
          ],
          topicName: [
            { required: true, message: '主题名称不能为空', trigger: 'change' }
          ]
        },
        addFormRules: {
          topicCode: [
            { required: true, message: '主题编码不能为空', trigger: 'change' }
          ],
          topicName: [
            { required: true, message: '主题名称不能为空', trigger: 'change' }
          ]
        }
      }
    },
    created () {
      this.getTreeData()
    },
    watch: {
      productionCatalogue (val) {
        if (val.id) {
          this.initForm()
        }
      }
    },
    computed: {
      isOk () {
        console.info('传值', this.productionCatalogues)
        if (this.productionCatalogues && this.productionCatalogues.childrens.length > 0) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      // 新增页面选择上级分类
      showProductionList (val) {
        this.isAdd = val
        this.selectProductionDialogVisible = true
        if (this.isAdd) {
          this.$nextTick(() => {
            if (this.putForm.id) {
              this.param.id = this.putForm.id
              this.$refs.productionTable.setHiddenParam({
                id: this.param.id
              })
              this.$refs.productionTable.resetQuery()
            } else {
              let param = {}
              this.$refs.productionTable.setHiddenParam(param)
              this.$refs.productionTable.resetQuery()
            }
          })
        } else {
          this.$nextTick(() => {
            if (this.addForm.id) {
              this.param.id = this.addForm.id
              this.$refs.productionTable.setHiddenParam({
                id: this.param.id
              })
              this.$refs.productionTable.resetQuery()
            } else {
              let param = {}
              this.$refs.productionTable.setHiddenParam(param)
              this.$refs.productionTable.resetQuery()
            }
          })
        }
      },
      clearParent () {
        this.putForm.parentId = null
        this.putForm.parentTopicCode = null
        this.putForm.parentTopicName = null
      },
      clearAddParent () {
        this.addForm.parentId = null
        this.addForm.parentTopicCode = null
        this.addForm.parentTopicName = null
      },
      handleSelectedProductionData (val) {
        this.selectedProductionData = val
      },
      clearSelectedProductionData () {
        this.selectedProductionData = null
      },
      comfireProductionNumber () {
        console.log(this.selectedProductionData)
        if (this.isAdd) {
          console.info('判断的值', this.isAdd)
          this.putForm.parentId = this.selectedProductionData.id
          this.putForm.parentTopicCode = this.selectedProductionData.topicCode
          this.putForm.parentTopicName = this.selectedProductionData.topicName
        } else {
          console.info('判断的值', this.isAdd)
          this.addForm.parentId = this.selectedProductionData.id
          this.addForm.parentTopicCode = this.selectedProductionData.topicCode
          this.addForm.parentTopicName = this.selectedProductionData.topicName
        }
        this.selectProductionDialogVisible = false
      },
      // 新增产品分类
      showAddDialog () {
        this.addDialogVisible = true
        this.editable = false
        this.$nextTick(() => {
          if (this.$refs.addForm) {
            this.$refs.addForm.resetFields()
          }
        })
        this.addForm = {
          id: null,
          topicCode: null,
          topicName: null,
          parentId: null,
          parentTopicCode: null,
          parentTopicName: null,
          topicDesc: null
        }
      },
      confirmAdd () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            add(this.addForm).then((data) => {
              this.addDialogVisible = false
              this.$message({
                type: 'success',
                message: this.$t('message.addSuccess')
              })
              this.addDialogVisible = false
              // this.setExpandNumber = this.putForm.parentId
              this.handleTreeChange()
            })
          }
        })
      },
      confirmRemove () {
        this.$confirm(this.$t('action.removeWarning'), this.$t('message.tip'), {
          confirmButtonText: this.$t('action.confirm'),
          cancelButtonText: this.$t('action.cancel'),
          type: 'warning'
        }).then(() => {
          remove([this.productionCatalogue.id]).then((data) => {
            this.$message({
              type: 'success',
              message: this.$t('message.removeSuccess')
            })
            // this.setExpandNumber = this.productionCatalogue.parentId
            this.handleTreeChange()
          })
        })
      },
      initForm () {
        this.putForm = {
          id: this.productionCatalogue.id,
          topicCode: this.productionCatalogue.topicCode,
          topicName: this.productionCatalogue.topicName,
          parentId: this.productionCatalogue.parentId,
          parentTopicCode: this.productionCatalogue.parentTopicCode,
          parentTopicName: this.productionCatalogue.parentTopicName,
          topicDesc: this.productionCatalogue.topicDesc
        }
      },
      resetForm () {
        this.initForm()
      },
      saveForm () {
        this.$refs.postForm.validate((valid) => {
          if (valid) {
            // this.putForm.updBizCode = 'basic'
            update(this.putForm).then(() => {
              this.$message({
                type: 'success',
                message: this.$t('message.updateSuccess')
              })
              this.editable = false
              // this.setExpandNumber = this.putForm.parentId
              this.handleTreeChange()
            })
          }
        })
      },
      handleTableChange (val) {
        this.dropColumns = val
      },
      getTreeData () {
        treeList({}).then((data) => {
          this.treeData = data.result
        })
      },
      handleDataChange (val) {
        treeList({}).then((data) => {
          this.treeData = data.result
          this.$nextTick(() => {
            this.$refs.tree.refreshNode(val)
            this.productionCatalogue = val
          })
        })
      },
      handleTreeClick (val) {
        console.log(val)
        if (val.id) {
          this.productionCatalogues = val
          this.productionCatalogue = val
          fetchDetail(this.productionCatalogue.id).then((data) => {
            this.editable = false
            this.productionCatalogue = data.result
            this.putForm = data.result
          })
        } else {
          this.productionCatalogue = {}
        }
      },
      handleTreeChange (val) {
        treeList({}).then((data) => {
          this.treeData = data.result
        })
        this.productionCatalogue = {}
      },
      handleSelected (val) {
        this.productionCatalogue = val
      },
      handleSelectedSeletion (val) {
        this.productionCatalogues = val
      },
      handleLoad () {
        this.productionCatalogue = {}
      },
      updateRecord () {
      }
    },
    components: {
      Titlebar,
      Toolbar,
      ToolbarGroup,
      QueryForm,
      ProductionTableView,
      CatalogueTreeView,
      LayoutResizable
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
    height: calc(100% - 70px);
  }
  .production-catalogue-index .toolbar{
    box-shadow: 0px 2px 0px #dddddd;
  }
</style>
