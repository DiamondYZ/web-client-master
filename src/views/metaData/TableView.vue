<template>
<div class="meta-data-table-view">

  <titlebar>
    <template slot="right">
      <el-form ref="queryForm" :model="queryForm" clearable :inline="true">
        <el-form-item label="字典编码">
          <el-input v-model="queryForm.classCode" clearable ></el-input>
        </el-form-item>
        <el-form-item label="字典名称">
          <el-input v-model="queryForm.className" clearable ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="bg-orange" @click="loadData()" icon="el-icon-search" :disabled="!owner"></el-button>
        </el-form-item>
      </el-form>
    </template>
  </titlebar>
<el-table ref="table"
      stripe
      border
      tooltip-effect="light"
      :data="data"
      highlight-current-row
      v-loading="loading"
      @selection-change="handleSelectionChange"
        @current-change="handleSelectedRowChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="classCode"
        label="编码">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="className"
        label="名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="crtTime"
        label="创建日期">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="updTime"
        label="更新日期">
      </el-table-column>

      <el-table-column
        width="120"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="border-orange" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

</div>
</template>

<script>
  import QueryForm from '@/components/form/QueryForm'
  import {fetchList, remove} from '@/api/metaData'
  import Titlebar from '../../components/titlebar/Index.vue'
  export default {
    name: 'MetaDataTableView',
    props: {
      owner: {
        type: String,
        default: function () {
          return null
        }
      }
    },
    watch: {
      owner (val) {
        this.currentPage = 1
        this.loadData()
      }
    },
    data () {
      return {
        pageSize: 10,
        total: 0,
        currentPage: 1,
        data: [],
        selectedRow: null,
        loading: false,
        queryForm: {}
      }
    },
    methods: {
      handleSelectedRowChange (val) {
        this.selectedRow = val
        if (val) {
          this.$emit('selected', val)
        }
      },
      handleSelectionChange (val) {
        this.$emit('row-select', val)
      },
      handlePageChange (val) {
        this.currentPage = val
        this.loadData()
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.loadData()
      },
      remove (val) {
        this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(val.id).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.currentPage = 1
            this.loadData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      loadData () {
        if (!this.owner) {
          this.data = []
          this.total = 0
          this.currentPage = 1
          return
        }
        this.loading = true
        this.$emit('load')
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        if (this.queryForm.classCode === '') {
          this.queryForm.classCode = null
        }
        if (this.queryForm.className === '') {
          this.queryForm.className = null
        }
        this.queryForm.owner = this.owner
        fetchList(this.queryForm, p).then((data) => {
          this.data = data.result.list
          this.total = data.result.total
          this.currentPage = data.result.pageNum || 1
          this.pageSize = data.result.pageSize
          this.$emit('loaded')
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      refreshRecord (record) {
        let i = -1
        if (this.selectedRow && record.id === this.selectedRow.id) {
          i = this.data.indexOf(this.selectedRow)
        } else {
          i = this.data.findIndex(item => item.id === record.id)
        }
        if (i > -1) {
          this.data.splice(i, 1, record)
          if (this.selectedRow && record.id === this.selectedRow.id) {
            this.setCurrent(record)
          }
        }
      },
      setCurrent (row) {
        this.$refs.table.setCurrentRow(row)
      }
    },
    components: {
      QueryForm,
      Titlebar
    }
  }
</script>

<style>
</style>
