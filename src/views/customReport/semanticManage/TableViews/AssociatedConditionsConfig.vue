<template>
  <div>
    <el-dialog
               :visible.sync="cusValue"
               v-if="cusValue"
               width="50%"
               title="配置关联条件"
               :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
               append-to-body>
      <titlebar>
        <template slot="right">
          <el-button type="border-orange"  @click="handleAdd">
            <svg-icon icon-class="wis_xinzeng"></svg-icon>{{$t('action.add')}}</el-button>
          <el-button type="border-orange"  @click="handleModify" :disabled="disable">
            <svg-icon icon-class="wis_xiugai"></svg-icon>{{$t('action.revise')}}</el-button>
          <el-button type="border-orange"  @click="handleDelete" :disabled="disable">
            <svg-icon icon-class="wis_shanchu"></svg-icon>{{$t('action.remove')}}</el-button>
        </template>
      </titlebar>
      <el-table ref="table" :data="data"
                stripe border highlight-current-row
                tooltip-effect="light" v-loading="loading"
                @current-change="handleSelect">
        <el-table-column
          key="mainColumn"
          prop="mainColumn"
          label="字段"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.tableMain+'.'+scope.row.mainColumn}}
          </template>
        </el-table-column>
        <el-table-column
          key="relationDesc"
          prop="relationDesc"
          label="关联类型">
          <template slot-scope="scope">
            等于
          </template>
        </el-table-column>
        <el-table-column
          key="assistColumn"
          prop="assistColumn"
          label="关联字段"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.tableAssist+'.'+scope.row.assistColumn}}
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
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="handleCancel">关闭</el-button>
        <!--<el-button type="bg-orange" @click="handleConfirm"> {{$t('action.confirm')}}</el-button>-->
      </div>
    </el-dialog>
    <associated-conditions-form
      v-model="formVisible"
      :relationid="relationId"
      :type="formType"
      :modify="modifyData"
      :table-left="tableLeft"
    @data-change="dataChange">
    </associated-conditions-form>
  </div>
</template>

<script>
  import Titlebar from '@/components/titlebar/Index'
  import AssociatedConditionsForm from './AssociatedConditionsForm'
  import {fetchAssociatedConditionConfigList, deleteAssociatedConditionConfigList} from '@/api/semanticManage'
  export default {
    name: 'AssociatedConditionsConfig',
    props: {
      value: {
        type: Boolean,
        default: true
      },
      columns: {
        type: Array
      },
      row: {
        type: Object
      },
      relationId: {
        type: String
      }
    },
    data () {
      return {
        formType: 'add', // 弹出表单类型
        disable: true,
        cusValue: false,
        loading: false,
        tableVisible: true,
        data: [],
        curSelection: [],
        formVisible: false,
        curRow: '',
        modifyData: '',
        total: 0,
        pageSize: 10,
        currentPage: 1,
        limitTables: [],
        tableLeft: []
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      initDialog () {
        this.curRow = ''
        this.loadData()
      },
      loadData () {
        if (!this.relationId) {
          return false
        }
        this.loading = true
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        fetchAssociatedConditionConfigList(this.relationId, p).then((res) => {
          this.data = res.result.list
          this.total = res.result.total
          this.pageSize = res.result.pageSize
          this.currentPage = res.result.pageNum
          this.loading = false
          // this.curRow = ''
        })
        // this.loading = true
        // setTimeout(() => {
        //   this.loading = false
        //   this.data = [{
        //     id: '001',
        //     fieldName: 'WIS_PRODUCT_ORDER_INFO.order_id',
        //     associativeCondition: '等于',
        //     associativeField: 'WIS_PRODUCT_TASK_INFO.order_no'
        //   }, {
        //     id: '002',
        //     fieldName: 'WIS_PRODUCT_ORDER_INFO.order_id',
        //     associativeCondition: '等于',
        //     associativeField: 'WIS_PRODUCT_TASK_INFO.order_no'
        //   }]
        // })
      },
      dataChange () {
        this.loadData()
      },
      handleCancel () {
        this.cusValue = false
        this.$emit('data-change')
      },
      handleAdd () {
        this.formVisible = true
        this.formType = 'add'
      },
      handleModify () {
        this.formVisible = true
        this.formType = 'modify'
        this.modifyData = this.curRow
        console.log(this.modifyData)
      },
      handleDelete () {
        this.$confirm(this.$t('action.removeWarning'), this.$t('message.tip'), {
          confirmButtonText: this.$t('action.confirm'),
          cancelButtonText: this.$t('action.cancel'),
          type: 'warning'
        }).then(() => {
          var id = this.curRow.id
          deleteAssociatedConditionConfigList(id).then((res) => {
            this.loadData()
            this.$message({
              type: 'success',
              message: this.$t('message.removeSuccess')
            })
          })
        })
      },
      handleConfirm () {
        this.cusValue = false
        this.$emit('data-change')
      },
      handleSelect (val) {
        this.curRow = val
      },
      handlePageChange (val) {
        this.currentPage = val
        this.loadData()
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.loadData()
      }
    },
    computed: {
      topicId () {
        return this.$store.state.customReport.semanticId
      }
    },
    watch: {
      value (val) {
        this.cusValue = val
        if (val) {
          this.initDialog()
        }
      },
      cusValue (val) {
        this.$emit('input', val)
      },
      curRow (val) {
        if (val) {
          this.disable = false
        } else {
          this.disable = true
        }
      },
      data (val) {
        var arr = [this.row.tableAssist, this.row.tableMain]
        val.forEach((item) => {
          if (arr.indexOf(item.tableAssist) === -1) {
            arr.push(item.tableAssist)
          }
          if (arr.indexOf(item.tableMain) === -1) {
            arr.push(item.tableMain)
          }
        })
        this.tableLeft = arr
      }
    },
    components: {
      Titlebar,
      AssociatedConditionsForm
    }
  }
</script>

<style scoped>

</style>
