<template>
  <div class="production-table-view">
    <query-form>
      <el-form ref="queryForm" :model="queryForm" label-width="100px" size="mini" :inline="true">
         <el-form-item>
          <el-input clearable v-model="queryForm.searchValue" placeholder="主题编号或主题名称"></el-input>
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
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        property="parentTopicName"
        label="主题分组名称">
      </el-table-column>
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
      <el-table-column
        show-overflow-tooltip
        property="topicDesc"
        label="主题描述">
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
  import {fetchDetailList} from '@/api/semanticPermission'
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
          searchValue: ''
        },
        param: {},
        hiddenParam: {}
      }
    },
    props: {
      code: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    created () {},
    watch: {
      code (val) {
        if (val) {
          this.queryForm.topicName = ''
          this.loadData()
        }
      }
    },
    methods: {
      handleSelectionChange (val) {
        console.info('选中的', val)
        this.$emit('selected', val)
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
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        fetchDetailList(this.code.code, this.queryForm.searchValue, p).then((data) => {
          console.info('进入函数')
          this.data = data.result.list
          this.total = data.result.total
          this.currentPage = data.result.pageNum || 1
          this.pageSize = data.result.pageSize
          this.$emit('loaded')
          this.$emit('data-save', this.data)
        })
      },
      query () {
        this.currentPage = 1
        this.loadData()
      }
    },
    components: {
      QueryForm
    }
  }
</script>

<style>
</style>
