<template>
  <el-dialog
             :visible.sync="cusValue"
             width="60%"
             title="新增字段"
             :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
             append-to-body>
    <query-form>
      <el-form ref="queryForm" :inline="true">
        <el-form-item label="数据源">
          <el-select v-model="queryForm.dataSource" placeholder="请选择" @change="handleChange">
            <el-option
              v-for="item in dataSourceList"
              :key="item.itemCode"
              :label="item.itemCode"
              :value="item.itemCode">
              <span>{{item.itemCode}} ( {{item.itemName}} )</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input clearable v-model="queryForm.dataSetFiled" placeholder="字段名称或字段描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="bg-orange" @click="query()" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </query-form>
    <el-table ref="table" :data="data"
              stripe border highlight-current-row
              tooltip-effect="light" v-loading="loading"
              @selection-change="handleSelect"
              :height="350">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column v-for="(col, index) in columns" v-if="col.status === 1" :key="col.id"
                       :prop="col.prop" show-overflow-tooltip :label="col.label">
        <template slot-scope="scope">
          <template v-if="col.prop === 'field_show_name'">
            <div style="width:100%">
              <span style="color:red">*</span>
              <el-input v-model="scope.row['field_show_name']"></el-input>
              <!--<el-input v-model="scope.row['table_cn']"></el-input>-->
            </div>
          </template>
          <template v-else-if="col.prop === 'classCode'">
            <el-input v-model="scope.row['classCode']"></el-input>
          </template>
          <template v-else-if="col.prop === 'ifnullValue'">
            <el-input v-model="scope.row['ifnullValue']"></el-input>
          </template>
          <template v-else>
            {{scope.row[col.prop]}}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination
      :style="{visibility: tableVisible ? 'visible' : 'hidden'}"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>-->
    <div slot="footer" class="dialog-footer">
      <el-button type="bg-black" @click="cusValue = false"> {{$t('action.cancel')}}</el-button>
      <el-button type="bg-orange" @click="handleConfirm"> {{$t('action.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
  import QueryForm from '@/components/form/QueryForm'
  import {fetchDataSetList, fetchDataSetFieldSelectColumns, fetchDataSetFieldAddList, addDataSetField} from '@/api/semanticManage'
  import {SortColumns} from '@/utils'
  export default {
    name: 'DataSetFieldSelect',
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
          dataSetFiled: ''
        },
        dataSourceList: [],
        cusValue: false,
        cusColumns: [],
        columns: [],
        loading: false,
        tableVisible: true,
        data: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        curSelection: []
      }
    },
    created () {
      // this.loadData()
      this.initColumns()
      this.loadDataSourceList()
    },
    methods: {
      initColumns () {
        fetchDataSetFieldSelectColumns().then((data) => {
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
          dataSetFiled: ''
        }
        // this.loadData()
        this.loadDataSourceList()
      },
      loadDataSourceList () {
        this.dataSourceList = []
        let p = {
          pageNum: 1,
          pageSize: 100
        }
        fetchDataSetList(this.topicId, p).then((res) => {
          var arr = res.result.list
          arr.forEach((item) => {
            this.dataSourceList.push({
              itemCode: item.dsTable,
              itemName: item.dsCn
            })
          })
          this.queryForm.dataSource = this.dataSourceList[0].itemCode
          this.loadData()
        })
      },
      handleChange (val) {
        this.queryForm.dataSource = val
        this.loadData()
      },
      query () {
        this.loadData()
      },
      loadData () {
        this.loading = true
        // let p = {
        //   pageNum: this.currentPage,
        //   pageSize: this.pageSize
        // }
        var param = {
          tableName: this.queryForm.dataSource,
          column: this.queryForm.dataSetFiled,
          relation: '0',
          topicId: this.topicId,
          tag: 'part'
        }
        fetchDataSetFieldAddList(param).then((res) => {
          this.data = res.result
          this.data.forEach((item) => {
            this.$set(item, 'field_show_name', '')
            item.field_show_name = item.column_comment
          })
          // this.total = ''
          // this.pageSize = ''
          // this.currentPage = ''
          this.loading = false
        })
      },
      handleConfirm () {
        var requestList = []
        var resList = []
        for (var i = 0; i < this.curSelection.length; i++) {
          if (!this.curSelection[i].field_show_name) {
            this.$message({
              message: '选中的数据集字段语义名为必填',
              type: 'error'
            })
            return false
          }
        }
        if (this.curSelection.length > 0) {
          this.curSelection.forEach((item) => {
            var param = {
              topicId: this.topicId,
              field_code: item.column_name,
              ds_table: item.table_name,
              field_type: item.column_type,
              field_show_name: item.field_show_name,
              field_desc: item.column_comment,
              classCode: item.classCode,
              ifnullValue: item.ifnullValue
            }
            requestList.push(addDataSetField(param))
            resList.push(item.id)
          })
          axios.all(requestList).then(axios.spread((...resList) => {
            this.$emit('data-change')
          }))
          this.cusValue = false
        } else {
          this.$message({
            message: '请先选择数据集',
            type: 'error'
          })
        }
        // if (this.curSelection.length > 0) {
        //   var selection = PropToArray('id', this.curSelection)
        //   console.log(selection)
        //   this.$emit('data-change')
        //   this.cusValue = false
        // } else {
        //   this.$message({
        //     message: '请先选择数据集',
        //     type: 'warning'
        //   })
        // }
      },
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
          var arr = ['fieldName', 'fieldType', 'filedDes', 'filedLength', 'semanticFieldName']
          this.cusColumns = SortColumns(arr, val)
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
