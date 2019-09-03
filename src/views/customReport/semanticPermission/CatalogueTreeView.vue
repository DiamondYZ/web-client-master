<template>
  <div class="catalogue-tree-view full-height" @click="handleClick($event)">
    <scroll-panel>
      <titlebar>
        <template slot="left">
          <div>应用主题分组</div>
        </template>
      </titlebar>
      <el-tree
        :data="treeData"
        node-key="id"
        draggable
        :default-expanded-keys="expandNodeNumber"
        highlight-current
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        ref="tree"
         >
        <span  slot-scope="{ node, data }">
              <template v-if="!data.parentId">
                <svg-icon icon-class="folder" style="font-size: 16px;"></svg-icon>
              </template>
              <template v-else>
                <svg-icon icon-class="wis_weixiugenzongin2"></svg-icon>
              </template>
              <span>{{ data.name }}</span>
            </span>
      </el-tree>
      <div ref="contextmenu" class="custom-tree-node_act" :style="contextmenuStyle" v-show="showContextmenu">
        <ul>
          <li @click="confirmTreeRemove">{{$t('action.remove')}}</li>
          <li @click="showTreeMoveDialog">移动</li>
          <!--<li @click="showTreeRenameDialog">重命名</li>-->
          <li @click="showTreeAddDialog">新建文件夹</li>
        </ul>
      </div>
    </scroll-panel>
    <!--新建文件夹弹出框-->
    <el-dialog
      :visible.sync="addFolderDialogVisible"
      width="700px"
      title="新建文件夹" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="100px" >
        <el-form-item label="文件夹名称"  prop="name">
          <el-input v-model="addForm.name" class="tree_input-max" autofocus></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="addFolderDialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button type="bg-orange" @click="confirmTreeAdd">保存</el-button>
      </div>
    </el-dialog>
    <!--移动文件夹弹出框-->
    <el-dialog
      :visible.sync="moveFolderDialogVisible"
      width="700px"
      title="目标文件夹" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateForm" label-width="100px" >
        <el-form-item label="目标文件夹" prop="parentId">
          <el-input
            placeholder="目标文件夹"
            v-model="catalogName"
            readonly>
            <el-button slot="append" icon="el-icon-caret-right" @click="showCatalogDialog"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="moveFolderDialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button type="bg-orange" @click="confirmTreeMove">保存</el-button>
      </div>
    </el-dialog>
    <!--目标文件夹弹出框-->
    <el-dialog
      width="60%"
      title="文件夹列表"
      :visible.sync="catalogDialogVisible"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <lazy-catalog-tree-view :tree-node="treeNode" ref="catalog" @click-node="handleCatalogSelected" @load="clearCatalogSelect">
      </lazy-catalog-tree-view>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="catalogDialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button type="bg-orange" @click="comfirmCatalogDialog()" :disabled="!selectedCatalogRow.id">{{$t('action.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ScrollPanel from '@/components/scrollPanel/Index'
  import Titlebar from '@/components/titlebarWis/Index'
  import {addForderTree, updateForderTree, removeForderTree} from '@/api/productionProcessStandard'
  export default {
    name: 'CatalogueTreeView',
    data () {
      return {
        treeNode: {},
        expandNodeNumber: [3],
        showContextmenu: false,
        addFolderDialogVisible: false,
        moveFolderDialogVisible: false,
        catalogDialogVisible: false,
        selectedCatalogRow: {},
        filterText: '',
        contextmenuStyle: {},
        defaultProps: {},
        addForm: {
          parentId: null,
          name: ''
        },
        addFormRules: {
          name: [
            { required: true, message: '请输入文件夹名称', trigger: 'change blur' },
            { min: 2, max: 12, message: '长度在 3 到 12 个字符', trigger: 'change blur' }
          ]
        },
        updateForm: {
          id: null,
          parentId: null,
          name: ''
        },
        catalogName: '',
        updateFormRules: {
          name: [
            { required: true, message: '请输入文件夹名称', trigger: 'change blur' },
            { min: 2, max: 12, message: '长度在 3 到 12 个字符', trigger: 'change blur' }
          ]
        }
      }
    },
    props: {
      treeTitle: String,
      treeData: {
        type: [Object, Array],
        default: []
      },
      setExpandNumber: {
        type: [Number, String],
        default: null
      }
    },
    created () {
      this.dataMerge(this.treeData)
    },
    watch: {
      setExpandNumber (val) {
        let array = []
        array.push(val)
        this.expandNodeNumber = array
      }
    },
    methods: {
      renderContent (h, { node, data, store }) {
        // console.info('h', h)
        // console.info('node', node)
        // console.info('data', data)
        // console.info('store', store)
        if (node.level > 1) {
          if (node.data.children) {
            return (<div style=""><i class="repair-i-svg-color i-svg-color-parent"><svg-icon icon-class="wis_weixiugenzongin1"></svg-icon></i><span>{node.data.name}</span></div>)
          } else {
            return (<div><i class="repair-i-svg-color i-svg-color-child"><svg-icon icon-class="wis_weixiugenzongin2"></svg-icon></i><span>{node.data.name}</span></div>)
          }
        } else {
          return (<div style=""><i class="repair-i-svg-color i-svg-color-parent"><svg-icon icon-class="wis_weixiugenzongin1"></svg-icon></i><span>{node.data.name}</span></div>)
        }
      },
      handleNodeClick (val) {
        this.showContextmenu = false
        if (val) {
          this.$emit('node-click', val)
          this.treeNode = val
        } else {
          this.$emit('node-click', {})
          this.treeNode = {}
        }
      },
      handleClick (event) {
        this.showContextmenu = false
      },
      handleDragStart (node, ev) {
        console.log('drag start', node)
      },
      handleDragEnter (draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label)
      },
      handleDragLeave (draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label)
      },
      handleDragOver (draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label)
      },
      handleDragEnd (draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      },
      handleDrop (draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType)
      },
      allowDrop (draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner'
        } else {
          return true
        }
      },
      allowDrag (draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-1-1') === -1
      },
      filter () {
        this.$refs.tree.filter(this.filterText)
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleQuery () {
      },
      refreshNode (val) {
        this.$refs.tree.setCurrentKey(val)
      },
      getNodeContextMenu (event, data, node) {
        if (data.isCatalog === '1') {
          let bcr = this.$el.getBoundingClientRect()
          let cLeft = bcr.left
          let cTop = bcr.top
          this.showContextmenu = false
          this.contextmenuStyle = {
            top: (event.clientY - cTop) + 'px',
            left: (event.clientX - cLeft) + 'px'
          }
        }
      },
      dataMerge (data) {
        if (!data) { return }
        for (var i = 0; i < data.length; i++) {
          let item = data[i]
          item.rightActMenu = false
          if (data[i].children && data[i].children.length > 0) {
            this.dataMerge(data[i].children, data[i])
          }
        }
      },
      showTreeAddDialog () {
        if (this.treeNode.id) {
          this.addFolderDialogVisible = true
          if (this.$refs.addForm) {
            this.$refs.addForm.resetFields()
          }
        }
      },
      confirmTreeAdd () {
        this.addForm.parentId = this.treeNode.id
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            addForderTree(this.addForm).then((data) => {
              this.$message({
                type: 'success',
                message: '添加目录成功'
              })
              this.addFolderDialogVisible = false
              this.$emit('data-change', this.treeNode.id, 'added')
            })
          }
        })
      },
      showTreeMoveDialog () {
        if (this.treeNode.id) {
          this.moveFolderDialogVisible = true
          if (this.$refs.updateForm) {
            this.$refs.updateForm.resetFields()
          }
        }
      },
      confirmTreeMove () {
        this.$refs.updateForm.validate((valid) => {
          if (valid) {
            updateForderTree(this.updateForm).then((data) => {
              this.$message({
                type: 'success',
                message: this.$t('message.updateSuccess')
              })
              this.moveFolderDialogVisible = false
              this.$emit('data-change', this.treeNode.id, 'update')
            })
          }
        })
      },
      showCatalogDialog () {
        this.catalogDialogVisible = true
        if (this.$refs.updateForm) {
          this.$refs.updateForm.resetFields()
        }
        this.catalogName = ''
        this.$nextTick(() => {
          this.$refs.catalog.initTreeData()
        })
      },
      handleCatalogSelected (val) {
        if (val) {
          this.selectedCatalogRow = val
        } else {
          this.selectedCatalogRow = {}
        }
      },
      clearCatalogSelect () {
        this.selectedCatalogRow = {}
      },
      comfirmCatalogDialog () {
        if (this.selectedCatalogRow.id) {
          this.updateForm.id = this.treeNode.id
          this.updateForm.parentId = this.selectedCatalogRow.id
          this.updateForm.name = this.treeNode.label
          this.catalogName = this.selectedCatalogRow.name
        }
        this.catalogDialogVisible = false
      },
      confirmTreeRemove () {
        if (this.treeNode.id) {
          this.$confirm(this.$t('action.removeWarning'), this.$t('message.tip'), {
            confirmButtonText: this.$t('action.confirm'),
            cancelButtonText: this.$t('action.cancel'),
            type: 'warning'
          }).then(() => {
            removeForderTree(this.treeNode.id).then((data) => {
              this.$message({
                type: 'success',
                message: this.$t('message.removeSuccess')
              })
              this.$emit('data-change', this.treeNode.id, 'removed')
            })
          })
        }
      }
    },
    components: {
      ScrollPanel,
      Titlebar
    }
  }
</script>
<style>
  .el-aside  .catalogue-tree-view{
    position: relative;
    width: 100% !important;
  }
  .el-aside  .table-title{
    padding-right: 0 !important;
  }
  .el-aside  .catalogue-tree-view .el-tree {
    height: 90%;
  }
  .catalogue-tree-view .el-input {
    width:120px;
    margin-right: 10px;
  }
  .catalogue-tree-view .el-input .el-input__inner{
    padding: 0 5px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .custom-tree-node_act {
    position: absolute;
    z-index: 1;
  }
  .custom-tree-node_act ul{
    border: 1px solid #dcdfe6;
    padding: 5px 10px;
    background: white;
  }
  .custom-tree-node_act ul li{
    list-style: none;
    border-bottom: 1px solid #dcdfe6;
    text-align: center;
    padding: 5px;
    cursor: pointer;
  }
  .custom-tree-node_act ul li:hover{
  	color: #f7a023;
  }
  .custom-tree-node_act ul li:last-child{
    border: none;
    padding-bottom: 0;
  }
  .tree_input-max input{
    width: 500px;
  }
  .catalogue-tree-view .table-title i {
    color: #fff;
  }
</style>
