<template>
<div class="meta-data">
  <toolbar>
    <toolbar-group>
      <el-button type="border-orange" @click="showAddDialog" >新增</el-button>
      <el-button type="border-orange" @click="showCloneDialog" :disabled="selection.length <= 0">复制</el-button>
    </toolbar-group>
    <toolbar-line></toolbar-line>
  </toolbar>
  <!-- 添加项目 -->
    <el-dialog
      width="30%"
      center
      :visible.sync="addDialogVisible"
      title="添加项目"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="postForm" :rules="formRules" ref="postForm" label-width="150px">
        <el-form-item label="编码" prop="classCode">
          <el-input v-model="postForm.classCode" placeholder="编码">
          </el-input>
        </el-form-item>
        <el-form-item label="名称" prop="className">
          <el-input v-model="postForm.className"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="postForm.description"></el-input>
        </el-form-item>
        <el-form-item label="语言" prop="lang">
          <el-input v-model="postForm.lang"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="addDialogVisible = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      center
      :visible.sync="cloneDialogVisible"
      title="复制项目"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <div style="font-size: larger; margin: 10px 0px">复制到</div>
      <el-table ref="ownerTable"
                stripe
                border
                :data="ownerData"
                @selection-change="handleOwnerSelectionChange">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="owner"
          label="租户ID">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="companyCode"
          label="租户编号">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="companyName"
          label="租户名">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="cloneDialogVisible = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirmClone">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
  import Toolbar from '@/components/toolbar/Toolbar'
  import ToolbarGroup from '@/components/toolbar/ToolbarGroup'
  import ToolbarLine from '@/components/toolbar/ToolbarLine'
  import {add, remove, cloneClass} from '@/api/metaDataInit'
  import { fetchOwner } from '@/api/ownerMenu'
  export default {
    name: 'MetaDataActionView',
    data () {
      return {
        ownerData: [],
        ownerSelection: [],
        cloneDialogVisible: false,
        addDialogVisible: false,
        postForm: {
          classCode: '',
          className: '',
          description: '',
          lang: ''
        },
        formRules: {
          classCode: [
            {required: true, message: '编号不能为空', trigger: 'change'}
          ],
          className: [
            {required: true, message: '名称不能为空', trigger: 'change'}
          ]
        }
      }
    },
    props: {
      selection: {
        type: Array,
        default: function () {
          return []
        }
      },
      metaData: {
        type: Object,
        default: {}
      }
    },
    methods: {
      handleOwnerSelectionChange (selection) {
        this.ownerSelection = selection
      },
      showCloneDialog () {
        fetchOwner().then((data) => {
          this.ownerData = data.result
          this.cloneDialogVisible = true
        })
      },
      showAddDialog () {
        if (this.$refs.postForm) {
          this.$refs.postForm.resetFields()
        }
        this.addDialogVisible = true
      },
      confirmRemove () {
        this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(this.metaData.id).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.currentPage = 1
            this.$emit('data-change', 'remove')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      confirmAdd () {
        this.$refs.postForm.validate((valid) => {
          if (valid) {
            add(this.postForm).then((data) => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.addDialogVisible = false
              this.currentPage = 1
              this.$emit('data-change', 'add')
            })
          }
        })
      },
      confirmClone () {
        let owners = []
        let ids = []
        this.selection.forEach((item) => {
          ids.push(item.id)
        })
        this.ownerSelection.forEach((item) => {
          owners.push(item.owner)
        })
        cloneClass({ids: ids, owners: owners}).then(() => {
          this.$message({
            type: 'success',
            message: '复制成功!'
          })
          this.cloneDialogVisible = false
        })
      }
    },
    components: {
      Toolbar,
      ToolbarGroup,
      ToolbarLine
    }
  }
</script>

<style>
</style>
