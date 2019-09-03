<template>

  <div style="margin-top: 10px; ">
    <el-row :gutter="24" >
      <el-col :span="10">
        <owner-view  @owner-change="handleOwnerChange"></owner-view>
      </el-col>
      <el-col :span="14"  >
        <div>
          <titlebar>
            <template slot="left">
              <div style="font-size: larger; margin: 10px 0px; width: 200px">个性化销售订单</div>
            </template>
            <template slot="right">
            <el-form ref="queryForm" :model="queryForm" clearable :inline="true">
              <el-form-item label="销售订单编号">
                <el-input v-model="queryForm.salesOrderNumber" clearable ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="bg-orange" @click="query()" icon="el-icon-search"></el-button>
              </el-form-item>
            </el-form>
          </template>
          </titlebar>
          <el-table
            ref="table"
            stripe
            border
            tooltip-effect="light"
            :data="data1"
            size="mini"
            highlight-current-row
            style="width: 100%">
            <el-table-column
              prop="salesOrderNumber"
              label="WIS销售订单编号">
            </el-table-column>
            <el-table-column
              prop="platformOrderNumber"
              label="平台销售订单编号">
            </el-table-column>
            <el-table-column
              prop="materialNumber"
              label="产品信息">
            </el-table-column>
            <el-table-column
              prop="salesOrderLineInfo"
              label="销售订单行">
            </el-table-column>
            <el-table-column
              prop="productionOrderNumber"
              label="生产订单">
            </el-table-column>
            <el-table-column
              prop="productionTaskNumber"
              label="生产任务">
            </el-table-column>
            <el-table-column
              prop="dispatchListNumber"
              label="派工单">
            </el-table-column>
            <el-table-column
              prop="statusDict"
              label="执行结果">
            </el-table-column>
            <el-table-column
              prop=""
              label="操作">
              <template slot-scope="scope">
                <el-button type="border-orange" @click="retry(scope.row.id)">重试下单</el-button>
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

      </el-col>
    </el-row>
  </div>
</template>
<script>
import Titlebar from '../../../components/titlebar/Index.vue'

import {fetchList, retry, fetchOwner} from '@/api/ownerStyleSaleOrder'

import OwnerView from '../../common/OwnerView'
export default {
  name: '',
  data () {
    return {
      owner: null,
      queryFormOwner: {},

      pageSize: 10,
      total: 0,
      currentPage: 1,
      data1: [],
      queryForm: {}
    }
  },
  methods: {
    handleOwnerChange (val) {
      this.owner = val
    },
    loadDataOwner () {
      fetchOwner(this.queryFormOwner.companyCode, this.queryFormOwner.companyName).then((data) => {
        this.ownerData = data.result
      })
    },
    handlePageChange (val) {
      this.currentPage = val
      this.loadData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.loadData()
    },
    query () {
      if (this.queryForm.salesOrderNumber === '') {
        this.queryForm.salesOrderNumber = null
      }
      this.loadData()
    },
    loadData () {
      let p = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.queryForm.owner = this.owner
      fetchList(this.queryForm, p).then((data) => {
        this.data1 = data.result.list
        this.total = data.result.total
        this.currentPage = data.result.pageNum || 1
      })
    },
    retry (id) {
      retry(id, this.owner).then(() => {
        this.$message({
          type: 'success',
          message: '重试下单成功!'
        })
        this.loadData()
      })
    }
  },
  watch: {
    owner (value) {
      if (value) {
        this.loadData()
      }
    }
  },
  mounted () {
    this.loadDataOwner()
  },
  components: {
    Titlebar,
    OwnerView
  }
}
</script>
