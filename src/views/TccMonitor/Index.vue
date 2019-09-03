<template>
  <layout-resizable>
    <template slot="top">
      <el-row>
        <el-col :span="24">
          <titlebar>
            <template slot="left">
              <div style="font-size: larger; margin: 10px 0px; width: 200px">TCC事务</div>
            </template>
            <template slot="right">
              <el-form ref="queryForm" :model="queryForm" clearable :inline="true">
                <el-form-item label="事务ID">
                  <el-input v-model="queryForm.transactionTxId" clearable ></el-input>
                </el-form-item>
                <el-form-item label="事务说明">
                  <el-input v-model="queryForm.notes" clearable ></el-input>
                </el-form-item>
                <el-form-item label="类名称">
                  <el-input v-model="queryForm.className" clearable></el-input>
                </el-form-item>
                <el-form-item label="类方法">
                  <el-input v-model="queryForm.methodName" clearable></el-input>
                </el-form-item>
                <el-form-item label="租户编号">
                  <el-input v-model="queryForm.owner" clearable></el-input>
                </el-form-item>
                <el-form-item label="开始日期">
                  <el-date-picker v-model="queryForm.startDate" value-format="yyyyMMdd" type="date" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期">
                  <el-date-picker v-model="queryForm.endDate" value-format="yyyyMMdd" type="date" clearable></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="bg-orange" @click="query()" icon="el-icon-search"></el-button>
                </el-form-item>
              </el-form>
            </template>
          </titlebar>
          <el-table stripe
                    border
                    :data="listData"
                    height="850"
                    @current-change="handleRow">

            <el-table-column
              show-overflow-tooltip
              prop="TRANSACTION_TX_ID"
              label="事务ID">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="NOTES"
              label="事务说明">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="CLASS_NAME"
              label="类名称">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="METHOD_NAME"
              label="方法名称">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="CONTENT"
              label="异常描述">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="STEP_COUNT"
              label="步骤数量">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="RETRIED_COUNT"
              label="重试次数">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="CREATE_TIME"
              label="创建时间">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="UPDATE_TIME"
              label="修改时间">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="CANCEL_TIME"
              label="取消时间">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="OWNER"
              label="租户编号">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="status"
              label="事务状态代码">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="rollback_status"
              label="回滚状态">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </template>
    <template slot="bottom">
      <el-row>
        <el-col :span="24">
          <div>
            <div style="font-size: larger; margin: 10px 0px">TCC事务明细</div>
            <el-table style="margin-top: 20px"
                      stripe
                      border
                      :data="itemData"
                      height="850">
              <el-table-column
                show-overflow-tooltip
                prop="ID"
                label="ID">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="NOTES"
                label="事务注释">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="CLASS_NAME"
                label="类名称">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="METHOD_NAME"
                label="方法名称">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="CONFIRM_METHOD"
                label="成功方法">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="CANCEL_METHOD"
                label="回调方法">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="CONTENT"
                label="异常信息">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="STEP"
                label="当前步骤">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="RETRIED_COUNT"
                label="重试次数">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="CREATE_TIME"
                label="创建时间">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="UPDATE_TIME"
                label="更新时间">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="CANCEL_TIME"
                label="取消时间">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="OWNER"
                label="租户信息">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="MODULE_NAME"
                label="归属模块">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="status"
                label="状态代码">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </template>
  </layout-resizable>
</template>

<script>
  import LayoutResizable from '@/components/layoutResizable/Index'
  import {fetchTccMain, fetchTccDetail} from '@/api/tccMonitor'
  import Titlebar from '../../components/titlebar/Index.vue'

  export default {
    name: 'tccMonitor',
    data () {
      return {
        queryForm: {},
        listData: [],
        itemData: []
      }
    },
    methods: {
      query () {
        fetchTccMain(this.queryForm).then((data) => {
          this.listData = data.result
          this.itemData = []
        })
      },
      loadData () {
        fetchTccMain({}).then((data) => {
          this.listData = data.result
        })
      },
      handleRow (row) {
        fetchTccDetail(row.TRANSACTION_TX_ID).then((data) => {
          this.itemData = data.result
        })
      }
    },
    mounted () {
      this.loadData()
    },
    components: {
      Titlebar,
      LayoutResizable
    }
  }
</script>

<style>
</style>
