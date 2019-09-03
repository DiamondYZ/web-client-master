<template>
  <div class="production-table-view">
    <query-form>
      <el-form ref="queryForm" :model="queryForm" label-width="100px" size="mini" :inline="true">
         <el-form-item>
          <el-input clearable v-model="queryForm.field" placeholder="主题编号或主题名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="bg-orange" @click="query()" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </query-form>
    <el-table
      :data="data"
      style="width: 100%"
      stripe
      border
      tooltip-effect="light"
      highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column
        show-overflow-tooltip
        property="topicCode"
        label="主题编号">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        property="topicName"
        label="主题名称">
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
  import {productionList} from '@/api/themeManage'
  import {mixinIgnoreEmptyVal} from '@/utils'
  import QueryForm from '@/components/form/QueryForm'
  export default {
    name: 'ProductionTableView',
    data () {
      return {
        data: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        queryForm: {
          field: ''
        },
        param: {},
        hiddenParam: {}
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      handleCurrentChange (val) {
        this.$emit('selected', val, 'production')
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.loadData()
      },
      handlePageChange (val) {
        this.currentPage = val
        this.loadData()
      },
      loadData () {
        this.$emit('load')
        console.info('val', this.pageSize)
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        productionList(this.param, p).then((data) => {
          this.data = data.result.list
          this.total = data.result.total
          this.currentPage = data.result.pageNum || 1
          this.pageSize = data.result.pageSize || 10
          this.$emit('loaded')
        })
      },
      query (param = {}) {
        this.param = param
        mixinIgnoreEmptyVal(this.param, this.queryForm)
        mixinIgnoreEmptyVal(this.param, this.hiddenParam)
        this.currentPage = 1
        this.loadData()
      },
      resetQuery (param = {}) {
        this.$refs.queryForm.resetFields()
        this.queryForm = {}
        this.param = param
        this.query(this.param)
      },
      setHiddenParam (p) {
        this.hiddenParam = p
      },
      clearSelection () {
        this.$refs.table.clearSelection()
      }
    },
    components: {
      QueryForm
    }
  }
</script>

<style>
</style>
