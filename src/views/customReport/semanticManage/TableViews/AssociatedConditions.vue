<template>
  <div>
    <titlebar>
      <template slot="right">
        <el-button type="border-orange"  @click="handleInit">
          <svg-icon icon-class="wis_xinzeng"></svg-icon>{{$t('action.init')}}</el-button>
        <el-button type="border-orange"  @click="handleDelete" :disabled="!curRow||(curRow&&curRow.relationFlag==='1')">
          <svg-icon icon-class="wis_shanchu"></svg-icon>{{$t('action.remove')}}</el-button>
        <el-button type="border-orange"  @click="handleConfirm">
          {{$t('action.confirm')}}</el-button>
      </template>
    </titlebar>
    <el-table ref="table" :data="data"
              stripe border highlight-current-row
              tooltip-effect="light" v-loading="loading"
              :style="{visibility: tableVisible ? 'visible' : 'hidden'}"
              @current-change="handleSelectedRowChange"
              @selection-change="handleSelectionChange">
      <el-table-column v-for="(col, index) in columns" v-if="col.status === 1" :key="col.id"
                       :prop="col.prop" show-overflow-tooltip :label="col.label">
        <template slot-scope="scope">
          <template v-if="col.prop === 'relationFlag'">
            {{scope.row[col.prop]|relationFormat}}
          </template>
          <template v-else>
            {{scope.row[col.prop]}}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="100" align="center">
        <template slot-scope="scope">
          <el-button type="border-orange"
                     size="small"
                     @click.stop="handleConfig(scope.row)">配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :style="{visibility: tableVisible ? 'visible' : 'hidden'}"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--配置-->
    <associated-conditions-config
      :row="curConfigRow"
      v-model="configVisible"
      :relationId = 'relationId'
      @data-change="dataChange">
    </associated-conditions-config>
  </div>
</template>

<script>
  import Titlebar from '@/components/titlebar/Index'
  import AssociatedConditionsConfig from './AssociatedConditionsConfig'
  import {fetchConditionColumns, fetchAssociatedConditionList, initAssociatedConditionList, deleteAssociatedConditionList, initAssociatedConditionConfirm} from '@/api/semanticManage'
  import Emitter from 'element-ui/src/mixins/emitter'
  export default {
    name: 'AssociatedConditions',
    mixins: [Emitter],
    data () {
      return {
        data: [],
        columns: [],
        tableVisible: false,
        loading: false,
        total: 0,
        pageSize: 10,
        currentPage: 1,
        disable: true,
        curRow: '',
        configVisible: false,
        associatedTables: [],
        relationId: '',
        curConfigRow: {}
      }
    },
    created () {
      this.initColumns()
      this.loadData()
    },
    methods: {
      initColumns () {
        fetchConditionColumns().then((data) => {
          this.columns = data.result
          setTimeout(() => {
            this.tableVisible = true
          }, 0)
        })
      },
      loadData () {
        this.loading = true
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        fetchAssociatedConditionList(this.topicId, p).then((res) => {
          this.data = res.result.list
          this.total = res.result.total
          this.pageSize = res.result.pageSize
          this.currentPage = res.result.pageNum
          this.loading = false
          this.curRow = ''
        })
        // this.loading = true
        // console.log('加载数据所需ID：' + this.$store.state.customReport.semanticId)
        // setTimeout(() => {
        //   this.loading = false
        //   this.curRow = ''
        //   this.data = [{
        //     tableName: 'WIS_WORK_SHEET_INFO',
        //     associativeTable: 'WIS_PRODUCT_ORDER_INFO',
        //     status: true,
        //     associativeField: 'WIS_PRODUCT_TASK_INFO.order_id= WIS_PRODUCT_ORDER_INFO.order_no'
        //   }]
        // })
      },
      handleConfig (row) {
        this.configVisible = true
        this.relationId = row.id
        this.broadcast('AssociatedConditionsForm', 'click', row)
        this.curConfigRow = row
      },
      handleConfirm () {
        initAssociatedConditionConfirm(this.topicId).then((res) => {
          if (res.result) {
            this.$message({
              message: res.result,
              type: 'error'
            })
          } else {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        })
      },
      dataChange () {
        this.loadData()
      },
      handleInit () {
        initAssociatedConditionList(this.topicId).then((res) => {
          this.loadData()
          // console.log(13212421432, res)
          // this.loading = true
          // console.log('加载数据所需ID：' + this.$store.state.customReport.semanticId)
          // setTimeout(() => {
          //   this.loading = false
          //   this.curRow = ''
          //   this.data = [{
          //     tableName: 'WIS_WORK_SHEET_INFO',
          //     associativeTable: 'WIS_PRODUCT_ORDER_INFO',
          //     status: true,
          //     associativeField: 'WIS_PRODUCT_TASK_INFO.order_id= WIS_PRODUCT_ORDER_INFO.order_no'
          //   }]
          // })
        })
      },
      handleDelete () {
        this.$confirm(this.$t('action.removeWarning'), this.$t('message.tip'), {
          confirmButtonText: this.$t('action.confirm'),
          cancelButtonText: this.$t('action.cancel'),
          type: 'warning'
        }).then(() => {
          var id = this.curRow.id
          deleteAssociatedConditionList(id).then((res) => {
            this.$message({
              type: 'success',
              message: this.$t('message.removeSuccess')
            })
            this.loadData()
          })
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
      handleSelectedRowChange (val) {
        this.curRow = val
      },
      handleSelectionChange () {
        console.log(1)
      }
    },
    filters: {
      relationFormat (val) {
        if (val === '1') {
          return '已关联'
        } else {
          return '待关联'
        }
      }
    },
    computed: {
      topicId () {
        return this.$store.state.customReport.semanticId
      },
      isDel () {
        if (this.curRow.relationFlag === '1') {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
      curRow (val) {
        if (val) {
          this.disable = false
        } else {
          this.disable = true
        }
      }
    },
    components: {
      Titlebar,
      AssociatedConditionsConfig
    }
  }
</script>

<style scoped>

</style>
