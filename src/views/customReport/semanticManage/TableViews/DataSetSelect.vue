<template>
  <el-dialog
             :visible.sync="cusValue"
             width="60%"
             title="新增数据集"
             :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
             append-to-body>
    <query-form>
      <el-form ref="queryForm" :inline="true">
        <el-form-item label="数据源类型">
          <el-radio-group v-model="queryForm.dataSourceType" @change="handleRadioChange">
            <el-radio label="BASE TABLE">表</el-radio>
            <el-radio label="VIEW">视图</el-radio>
            <el-radio label="">全部</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input clearable v-model="queryForm.dataSource" placeholder="数据源名称或描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="bg-orange" @click="query()" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </query-form>
    <el-table ref="table" :data="data"
              stripe border highlight-current-row
              tooltip-effect="light" v-loading="loading"
              @selection-change="handleSelect">
      <el-table-column
              type="selection"
              width="55">
            </el-table-column>
      <el-table-column v-for="(col, index) in columns" v-if="col.status === 1" :key="col.id"
                       :prop="col.prop" show-overflow-tooltip :label="col.label">
        <template slot-scope="scope">
          <template v-if="col.prop === 'table_description'">
            <div style="width:100%">
              <span style="color:red">*</span>
              <el-input v-model="scope.row['table_cn']"></el-input>
            </div>
          </template>
          <template v-else>
            {{scope.row[col.prop]}}
          </template>
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
      <el-button type="bg-black" @click="cusValue = false"> {{$t('action.cancel')}}</el-button>
      <el-button type="bg-orange" @click="handleConfirm"> {{$t('action.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import QueryForm from '@/components/form/QueryForm'
  import {HideColumns} from '@/utils'
  import {fetchDataSetSelectColumns, fetchDataSetAddList, addDataSet} from '@/api/semanticManage'
  export default {
    name: 'DataSetSelect',
    props: {
      value: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        queryForm: {
          dataSource: '',
          dataSourceType: 'all'
        },
        cusValue: false,
        cusColumns: [],
        loading: false,
        columns: [],
        tableVisible: true,
        data: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        curSelection: []
      }
    },
    created () {
      this.initColumns()
      this.loadData()
    },
    methods: {
      initColumns () {
        fetchDataSetSelectColumns().then((data) => {
          this.columns = data.result
          setTimeout(() => {
            this.tableVisible = true
          }, 0)
        })
      },
      initDialog () {
        this.total = 0
        this.pageSize = 10
        this.currentPage = 1
        this.curSelection = []
        this.queryForm = {
          dataSource: '',
          dataSourceType: ''
        }
        this.loadData()
      },
      loadData () {
        if (!this.topicId) {
          return false
        }
        this.loading = true
        var param = {
          tableType: this.queryForm.dataSourceType,
          tableName: this.queryForm.dataSource,
          topicId: this.topicId,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        fetchDataSetAddList(param).then((res) => {
          this.data = res.result.list
          this.data.forEach((item) => {
            this.$set(item, 'table_cn', item.table_comment)
          })
          this.total = Number(res.result.recordCount)
          this.pageSize = res.result.pageSize
          this.loading = false
        })
        // setTimeout(() => {
        //   this.loading = false
        //   this.data = [{
        //     id: '001',
        //     dataSetName: '生产订单表',
        //     dataSourceType: 'table',
        //     dataSourceName: 'WIS_PRODUCT_ORDER_INFO',
        //     dataSourceDes: '生产订单信息表'
        //   }, {
        //     id: '002',
        //     dataSetName: '生产订单表2',
        //     dataSourceType: 'table',
        //     dataSourceName: 'WIS_PRODUCT_ORDER_INFO',
        //     dataSourceDes: '生产订单信息表'
        //   }]
        // })
      },
      query () {
        this.loadData()
      },
      handleRadioChange (val) {
        this.loadData()
      },
      handleConfirm () {
        var arr = []
        for (var i = 0; i < this.curSelection.length; i++) {
          if (!this.curSelection[i].table_cn) {
            this.$message({
              message: '选中的数据集名称为必填',
              type: 'error'
            })
            return false
          } else {
            arr.push(this.curSelection[i].table_cn)
          }
        }
        // 判断语义名是否重复
        var _arr = arr.sort()
        for (let i = 0; i < _arr.length; i++) {
          if (_arr[i] === _arr[i + 1]) {
            this.$message({
              message: '新增数据集中有重复的语义名',
              type: 'error'
            })
            return false
          }
        }
        var paramList = []
        if (this.curSelection.length > 0) {
          this.curSelection.forEach((item) => {
            var param = {
              topicId: this.topicId,
              dsCn: item.table_cn,
              dsType: item.table_type,
              dsTable: item.table_name,
              dsNum: 1,
              dsDesc: item.table_comment
            }
            paramList.push(param)
          })
          addDataSet(paramList).then(() => {
            this.$emit('data-change')
            this.cusValue = false
          })
        }
      },
      // handleConfirm () {
      //   var arr = []
      //   for (var i = 0; i < this.curSelection.length; i++) {
      //     if (!this.curSelection[i].table_cn) {
      //       this.$message({
      //         message: '选中的数据集名称为必填',
      //         type: 'error'
      //       })
      //       return false
      //     } else {
      //       arr.push(this.curSelection[i].table_cn)
      //     }
      //   }
      //   // 判断语义名是否重复
      //   var _arr = arr.sort()
      //   for (let i = 0; i < _arr.length; i++) {
      //     if (_arr[i] === _arr[i + 1]) {
      //       this.$message({
      //         message: '新增数据集中有重复的语义名',
      //         type: 'error'
      //       })
      //       return false
      //     }
      //   }
      //   var requestList = []
      //   var resList = []
      //   if (this.curSelection.length > 0) {
      //     this.curSelection.forEach((item) => {
      //       var param = [{
      //         topicId: this.topicId,
      //         dsCn: item.table_cn,
      //         dsType: item.table_type,
      //         dsTable: item.table_name,
      //         dsNum: 1,
      //         dsDesc: item.table_comment
      //       }]
      //       requestList.push(addDataSet(param))
      //       resList.push(item.id)
      //     })
      //     axios.all(requestList).then(axios.spread((...resList) => {
      //       this.$emit('data-change')
      //       this.cusValue = false
      //     })).catch(() => {
      //       this.$emit('data-change')
      //       this.cusValue = false
      //     })
      //   } else {
      //     this.$message({
      //       message: '请先选择数据集',
      //       type: 'error'
      //     })
      //   }
      // },
      handleSelect (val) {
        this.curSelection = val
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
      columns (val) {
        if (val) {
          this.cusColumns = HideColumns(['dataSourceDes'], val)
        }
      }
    },
    components: {
      QueryForm
    }
  }
</script>

<style scoped>

</style>
