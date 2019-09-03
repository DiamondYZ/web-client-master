<template>
  <div>
    <div style="font-size: larger; margin: 10px 0px">租户列表</div>
    <el-table ref="ownerTable"
              stripe
              border
              :data="owners"
              tooltip-effect="light"
              highlight-current-row
              @row-click="handleRowClick">

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
  </div>
</template>
<script>
  import { fetchOwner } from '@/api/ownerMenu'
  export default {
    data () {
      return {
        owners: []
      }
    },
    mounted () {
      this.loadOwner()
    },
    methods: {
      handleRowClick (row) {
        this.$emit('owner-change', row.owner)
      },
      loadOwner () {
        fetchOwner().then((data) => {
          this.owners = data.result
        })
      }
    }
  }
</script>
