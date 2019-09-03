<template>

  <div>
    <div class="table-title" style="margin-top: 10px;margin-bottom: 10px">
      概览视图
    </div>
    <el-table
      ref="table"
      stripe
      border
      tooltip-effect="light"
      :data="dialogData"
      size="mini"
      highlight-current-row
      @current-change="handleCurrentChange"
      @row-click="handleRowClick"
      style="width: 100%">
      <el-table-column
        prop="serialNumber"
        label="生产序列号">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="生成日期">
        <template slot-scope="scope">
          {{ scope.row.createDate.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="saleObject"
        label="销售对象">
      </el-table-column>
      <el-table-column
        prop="type"
        label="终端类型">
        <template slot-scope="scope">
          {{ scope.row.type | type }}
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
  import { fetch } from '@/api/productionSerialNumber'
  export default {
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        dialogData: [],
        currentRow: null,
        loading: false,
        param: {}
      }
    },
    props: {
      queryCondition: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    watch: {
      queryCondition (val) {
        if (val) {
          this.initData()
        }
      }
    },
    methods: {

      initData () {
        this.loading = true
        return new Promise((resolve, reject) => {
          let p = {
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }

          fetch(this.queryCondition, p).then((data) => {
            this.dialogData = data.result.list
            this.total = data.result.total
            this.currentPage = data.result.pageNum || 1
            this.pageSize = data.result.pageSize
            this.loading = false
            resolve('done')
          })
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.initData()
      },
      handlePageChange (val) {
        this.currentPage = val
        this.initData()
      },
      handleCurrentChange (val) {
        if (val) {
          this.currentRow = val
          this.$emit('row-change', val)
        }
      },
      handleRowClick (row) {
        this.currentRow = row
        this.$emit('row-change', row)
      },
      query () {
        this.currentPage = 1
        this.initData()
      },
      resetQuery (param = {}) {
        this.queryForm.code = ''
        this.param = param
        this.query(this.param)
      },
      refreshRecord (record) {
        let i = -1
        if (this.currentRow && record.id === this.currentRow.id) {
          i = this.dialogData.indexOf(this.currentRow)
        } else {
          i = this.dialogData.findIndex(item => item.id === record.id)
        }
        if (i > -1) {
          this.dialogData.splice(i, 1, record)
          if (this.currentRow && record.id === this.currentRow.id) {
            this.setCurrent(record)
          }
        }
      },
      setCurrent (row) {
        this.$refs.table.setCurrentRow(row)
      }
    },
    filters: {
      type: function (value) {
        if (value === 'terminal') {
          return '终端企业'
        } else if (value === 'distributor') {
          return '经销商'
        }
      }
    },
    mounted () {
      this.initData()
    },
    components: {
    }
  }
</script>
