<template>

  <div>
    <titlebar>
      <template slot="left">
        <span>角色初始化数据</span>
      </template>
      <template slot="right">
        <div>
          <el-button type="bg-orange" @click="add">
            添加</el-button>
        </div>
      </template>
    </titlebar>
    <div class="main-data-view__content">
      <el-table
        ref="table"
        stripe
        border
        tooltip-effect="light"
        :data="data"
        size="mini"
        highlight-current-row
        @current-change="handleCurrentChange"
        @row-click="handleRowClick"
        style="width: 100%">
        <el-table-column
          prop="groupId"
          label="角色ID">
        </el-table-column>
        <el-table-column
          prop="code"
          label="角色编号">
        </el-table-column>
        <el-table-column
          prop="description"
          label="角色名">
        </el-table-column>
        <el-table-column
          prop="system"
          label="系统类型">
        </el-table-column>
        <el-table-column
          width="110"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="border-orange" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      title="添加角色"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-table
        ref="addTable"
        stripe
        border
        tooltip-effect="light"
        :data="addData"
        size="mini"
        highlight-current-row
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="角色ID">
        </el-table-column>
        <el-table-column
          prop="code"
          label="角色编号">
        </el-table-column>
        <el-table-column
          prop="description"
          label="角色名">
        </el-table-column>
        <el-table-column
          prop="system"
          label="系统类型">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="dialogVisible = false">取消</el-button>
        <el-button type="bg-orange" @click="confirmAdd">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { fetchList, remove, fetchGroupInitList, post } from '@/api/appGroupInit'
  import Titlebar from '@/components/titlebar/Index'
  export default {
    data () {
      return {
        dialogVisible: false,
        data: [],
        addData: [],
        currentRow: null,
        loading: false,
        addSelection: []
      }
    },
    props: {
      appId: {
        type: String,
        default: function () {
          return null
        }
      }
    },
    watch: {
      appId (val) {
        if (val) {
          this.init()
        }
      }
    },
    methods: {
      remove (id) {
        remove(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.init()
        })
      },
      add () {
        this.addSelection = []
        fetchGroupInitList().then((data) => {
          this.addData = data.result.data
          this.dialogVisible = true
        })
      },
      init () {
        fetchList(this.appId).then((data) => {
          this.data = data.result.data
          this.loading = false
        })
      },
      handleSelectionChange (selection) {
        this.addSelection = selection
      },
      confirmAdd () {
        if (this.addSelection.length <= 0) {
          this.$message({
            type: 'success',
            message: '请至少选择一条记录!'
          })
        }
        let ids = this.addSelection.map(data => data.id)
        post(this.appId, ids).then(() => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.init()
        })
      }
    },
    components: {
      Titlebar
    }
  }
</script>
