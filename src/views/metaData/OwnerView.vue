<template>
  <div>
    <div style="font-size: larger; margin: 10px 0px">租户列表</div>
    <titlebar>
      <template slot="right">
        <el-form ref="queryForm" :model="queryForm" clearable :inline="true">
          <el-form-item label="租户编号">
            <el-input v-model="queryForm.companyCode" clearable ></el-input>
          </el-form-item>
          <el-form-item label="租户名">
            <el-input v-model="queryForm.companyName" clearable ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="bg-orange" @click="loadOwner()" icon="el-icon-search"></el-button>
          </el-form-item>
        </el-form>
      </template>
    </titlebar>
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
      <el-table-column
        show-overflow-tooltip
        prop="origin"
        label="所属系统">
        <template slot-scope="scope">
          <span>{{scope.row.origin | systemFilter}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { fetchOwner } from '@/api/ownerMenu'
  import Titlebar from '../../components/titlebar/Index.vue'
  export default {
    data () {
      return {
        owners: [],
        queryForm: {}
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
        fetchOwner(this.queryForm.companyCode, this.queryForm.companyName).then((data) => {
          this.owners = data.result
        })
      }
    },
    components: {
      Titlebar
    }
  }
</script>
