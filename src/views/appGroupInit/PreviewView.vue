<template>

  <div>
    <div class="table-title" style="margin-top: 10px;margin-bottom: 10px">
      APP列表
    </div>
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
        prop="id"
        label="APP ID">
      </el-table-column>
      <el-table-column
        prop="code"
        label="APP编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { fetchAppList } from '@/api/appGroupInit'
  export default {
    data () {
      return {
        data: [],
        currentRow: null,
        loading: false
      }
    },
    methods: {
      initData () {
        this.loading = true
        return new Promise((resolve, reject) => {
          fetchAppList(this.data.id).then((data) => {
            this.data = data.result.data
            this.loading = false
            resolve('done')
          })
        })
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
      }
    },
    mounted () {
      this.initData()
    },
    components: {
    }
  }
</script>
