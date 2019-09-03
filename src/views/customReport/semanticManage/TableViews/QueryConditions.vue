<template>
 <div>
   <titlebar>
     <template slot="right">
       <el-button type="border-orange"  @click="handleSave" :disabled="!isDataChange">
         <svg-icon icon-class="wis_baocun"></svg-icon>{{$t('action.save')}}</el-button>
     </template>
   </titlebar>
   <el-table ref="table" :data="data"
             :height="tableHeight"
             stripe border
             tooltip-effect="light" v-loading="loading"
             :style="{visibility: tableVisible ? 'visible' : 'hidden'}">
     <el-table-column v-for="(col, index) in columns" v-if="col.status === 1" :key="col.id"
                      :prop="col.prop" show-overflow-tooltip :label="col.label"
                      align="center" :width="col.prop === 'isCheck'?'50px':''">
       <template slot-scope="scope">
         <template v-if="col.prop === 'isCheck'">
           <el-checkbox v-model="scope.row.isCheck" true-label="1" false-label="0">
           </el-checkbox>
         </template>
         <template v-else-if="col.prop === 'ifNull'">
            <el-checkbox v-model="scope.row.ifNull" true-label="1" false-label="0">
            </el-checkbox>
         </template>
         <template v-else-if="col.prop === 'controlType'">
           <el-select v-model="scope.row.controlType" placeholder="请选择" @change="changeVal(scope.row)">
             <el-option
               v-for="item in controlTypeOptions"
               :key="item.dict_key"
               :label="item.dict_value"
               :value="item.dict_key">
             </el-option>
           </el-select>
         </template>
         <template v-else-if="col.prop === 'controlCondition'">
           <el-select v-model="scope.row.controlCondition" placeholder="请选择">
             <el-option
               v-for="item in scope.row.a"
               :key="item.dict_key"
               :label="item.dict_value"
               :value="item.dict_key">
             </el-option>
           </el-select>
         </template>
         <template v-else-if="col.prop === 'showDs'">
           <el-input v-model="scope.row.showDs" placeholder="请输入内容"></el-input>
         </template>
         <template v-else>
           {{scope.row[col.prop]}}
         </template>
         <!--<span v-if="col.type === 'Date'">{{scope.row[col.prop] | parseTime('{y}-{m}-{d}')}}</span>
         <span v-else-if="col.prop === 'sexDict'">{{statusSexMap[scope.row[col.prop]]}}</span>
         <span v-else-if="col.prop === 'identityTypeDict'">{{statusIdentityMap[scope.row[col.prop]]}}</span>
         <span v-else-if="col.prop === 'statusDict'">{{statusMap[scope.row[col.prop]]}}</span>
         <span v-else>{{scope.row[col.prop]}}</span>-->
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
 </div>
</template>

<script>
  import axios from 'axios'
  import Titlebar from '@/components/titlebar/Index'
  import {fetchQueryColumns, fetchQueryConditionList, saveQueryConditionList, findDictionaryList} from '@/api/semanticManage'
  // region[返回数据]
  // var DATA = [{
  //   id: '001',
  //   useable: true,
  //   fieldName: 'order_id',
  //   semanticFieldName: '生产订单编号',
  //   dataSourceName: 'WIS_PRODUCT_ORDER_INFO',
  //   controlTypes: 'TextBox',
  //   conditions: 'Equal',
  //   isEmpty: false,
  //   dataSetName: 'aaaa'
  // }, {
  //   id: '002',
  //   useable: false,
  //   fieldName: 'materal_id',
  //   semanticFieldName: '物料编号',
  //   dataSourceName: 'WIS_PRODUCT_ORDER_INFO',
  //   controlTypes: 'Select',
  //   conditions: 'Less',
  //   isEmpty: true,
  //   dataSetName: 'bbbb'
  // }]
  // endregion
  export default {
    name: 'query-conditions',
    data () {
      return {
        tableHeight: 0,
        data: [],
        compareData: [], // 用于变动对比
        columns: [],
        tableVisible: false,
        loading: false,
        total: 0,
        pageSize: 10,
        currentPage: 1,
        controlTypeOptions: [],
        conditionOptions: [],
        changeValue: null
      }
    },
    created () {
      this.initColumns()
      this.initMetaData()
      if (document.body.clientWidth > 1400) {
        this.tableHeight = 670
      } else {
        this.tableHeight = 360
      }
    },
    methods: {
      changeVal (val) {
        this.changeValue = val.controlType
        if (this.changeValue === 'DatePickerRange') {
          val.controlCondition = 'between'
          val.a = this.conditionOptions.filter((x, index, self) => self.indexOf(x) === 6 || self.indexOf(x) === 7)
        } else if (this.changeValue === 'DateTimePickerRange') {
          val.controlCondition = 'between'
          val.a = this.conditionOptions.filter((x, index, self) => self.indexOf(x) === 6 || self.indexOf(x) === 7)
        } else {
          val.controlCondition = '='
          val.a = this.conditionOptions.filter((x, index, self) => self.indexOf(x) < 6 || self.indexOf(x) === 8)
        }
      },
      initMetaData (callback) {
        var requestList = [
          findDictionaryList({
            classCode: 'kjlx',
            owner: ''
          }),
          findDictionaryList({
            classCode: 'tj',
            owner: ''
          })
        ]
        axios.all(requestList).then(axios.spread((kjlxRes, tjRes) => {
          this.controlTypeOptions = kjlxRes.result
          this.conditionOptions = tjRes.result
          this.loadData()
        }))
      },
      initColumns () {
        fetchQueryColumns().then((data) => {
          this.columns = data.result
          setTimeout(() => {
            this.tableVisible = true
          }, 0)
        })
      },
      loadData () {
        this.loading = true
        console.log('加载数据所需ID：' + this.$store.state.customReport.semanticId)
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          topicId: this.topicId
        }
        fetchQueryConditionList(p).then((res) => {
          this.loading = false
          var _data = res.result.list
          this.currentPage = res.result.pageNum
          this.pageSize = res.result.pageSize
          this.total = res.result.total
          _data.forEach((item) => {
            if (item.controlType === null) {
              item.controlType = 'text'
            }
            if (item.controlCondition === null) {
              item.controlCondition = '='
            }
            item.a = this.conditionOptions
            if (item.controlType === 'DatePickerRange' || item.controlType === 'DateTimePickerRange') {
              if (!item.controlCondition) {
                item.controlCondition = 'between'
              }
              item.a = this.conditionOptions.filter((x, index, self) => self.indexOf(x) === 6 || self.indexOf(x) === 7)
            } else {
              item.a = this.conditionOptions.filter((x, index, self) => self.indexOf(x) < 6 || self.indexOf(x) === 8)
            }
          })
          this.data = JSON.parse(JSON.stringify(_data))
          this.compareData = JSON.parse(JSON.stringify(_data))
        })
        // setTimeout(() => {
        //   this.loading = false
        //   var _data = DATA
        //   this.data = JSON.parse(JSON.stringify(_data))
        //   this.compareData = JSON.parse(JSON.stringify(_data))
        // })
      },
      handleSave () {
        var arr = []
        var flag = false
        this.data.forEach((item) => {
          if (item.isCheck === '1') {
            if (!flag) {
              flag = true
            }
            arr.push({
              id: item.id,
              topicId: this.topicId,
              fieldName: item.fieldName,
              fieldCode: item.fieldCode,
              dsTable: item.dsTable,
              dsTableCode: item.dsTableCode,
              controlType: item.controlType,
              controlCondition: item.controlCondition,
              ifNull: item.ifNull,
              showDs: item.showDs,
              fieldDesc: item.fieldDesc
            })
          }
        })
        if (!flag) {
          arr.push({
            topicId: this.topicId
          })
          saveQueryConditionList(arr).then((res) => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.loadData()
          })
          // this.$confirm('当前没有被选择的关联条件，保存后将初始化关联条件，是否继续？', '提示', {
          //   confirmButtonText: '是',
          //   cancelButtonText: '否',
          //   type: 'warning'
          // }).then(() => {
          //   arr.push({
          //     topicId: this.topicId
          //   })
          //   saveQueryConditionList(arr).then((res) => {
          //     this.$message({
          //       message: '保存成功',
          //       type: 'success'
          //     })
          //     this.loadData()
          //   })
          // })
        } else {
          saveQueryConditionList(arr).then((res) => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.loadData()
          })
        }
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
      isDataChange () {
        var data = JSON.stringify(this.data)
        var compareData = JSON.stringify(this.compareData)
        if (data === compareData) {
          return false
        } else {
          return true
        }
      },
      topicId () {
        return this.$store.state.customReport.semanticId
      }
    },
    watch: {
      data: {
        handler (val) {
          var data = JSON.stringify(val)
          var compareData = JSON.stringify(this.compareData)
          if (data === compareData) {
            this.$store.commit('changeSemanticDataStatus', false)
          } else {
            this.$store.commit('changeSemanticDataStatus', true)
          }
        },
        deep: true
      }
    },
    components: {
      Titlebar
    }
  }
</script>

<style scoped>

</style>
