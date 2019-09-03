<template>
  <div>
    <div style="font-size: larger; margin: 10px 0px">租户列表</div>
    <titlebar>
      <template slot="right">
        <el-form ref="queryForm" :model="queryForm" clearable :inline="true">
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
  import { fetchOwnerPage } from '@/api/ownerMenu'
  import Titlebar from '../../components/titlebar/Index.vue'
  export default {
    data () {
      return {
        owners: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        queryForm: {}
      }
    },
    mounted () {
      this.loadOwner()
    },
    methods: {
      handleSizeChange (val) {
        this.pageSize = val
        this.loadOwner()
      },
      handlePageChange (val) {
        this.currentPage = val
        this.loadOwner()
      },
      handleRowClick (row) {
        this.$emit('owner-change', row.owner)
      },
      loadOwner () {
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        let param = {
          companyName: this.queryForm.companyName
        }
        fetchOwnerPage(param, p).then((data) => {
          this.owners = data.result.list
          this.total = data.result.total
          this.currentPage = data.result.pageNum || 1
          this.pageSize = data.result.pageSize
        })
      }
    },
    components: {
      Titlebar
    }
  }
</script>
