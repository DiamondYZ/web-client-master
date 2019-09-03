<template>
  <layout-resizable>
    <template slot="top">
      <el-row>
        <el-col :span="24">
          <div style="font-size: larger; margin: 10px 0px">主机信息</div>
          <el-table stripe
                    border
                    :data="listData"
                    height="850"
                    @current-change="handleRow">
            <el-table-column
              show-overflow-tooltip
              prop="id"
              label="主机ID">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="hostName"
              label="主机名称">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="routeContext"
              label="路由上下文">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="route"
              label="路由">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </template>
    <template slot="bottom">
      <el-row>
        <el-col :span="24">
          <div>
            <div style="font-size: larger; margin: 10px 0px">信息列表</div>
            <el-table style="margin-top: 20px"
                      stripe
                      border
                      :data="itemData"
                      height="850">
              <el-table-column
                show-overflow-tooltip
                prop="key"
                label="键">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="value"
                label="值">
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
  import {fetchjmxList, fetchjmxItem} from '@/api/gatewayMonitoringData'

  export default {
    name: 'GatewayMonitoringData',
    data () {
      return {
        listData: [],
        itemData: []
      }
    },
    methods: {
      loadData () {
        fetchjmxList().then((data) => {
          this.listData = data.result
        })
      },
      handleRow (row) {
        fetchjmxItem(row.id).then((data) => {
          this.itemData = data.result
        })
      }
    },
    mounted () {
      this.loadData()
    },
    components: {
      LayoutResizable
    }
  }
</script>

<style>
</style>
