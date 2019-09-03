<template>
  <el-dialog
             :visible.sync="cusValue"
             width="50%"
             title="新建关联条件"
             :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
             append-to-body>
    <el-form :model="conditionForm" v-if="type==='add'" ref="conditionForm" label-width="100px"
             :rules="addFormRules">
      <el-row type="flex" align="middle">
        <el-col :span="10" class="form-border">
          <el-form-item label="数据源名称" prop="dataSourceName_left" >
            <el-select v-model="conditionForm.dataSourceName_left" @change="handleAddDataSourceChange($event,'left')">
              <el-option
                v-for="item in dataSourceList_left"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据源描述" prop="dataSourceDes_left">
            <el-input v-model="conditionForm.dataSourceDes_left"  placeholder="数据源描述" disabled></el-input>
          </el-form-item>
          <el-form-item label="字段名称" prop="fieldName_left"
          ref="fieldName_left">
            <el-select v-model="conditionForm.fieldName_left"
                       @change="handleFieldAddChange($event,'left')">
              <el-option
                v-for="item in fieldList_left"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字段描述" prop="fieldDes_left">
            <el-input v-model="conditionForm.fieldDes_left"  placeholder="字段描述" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4"><div style="text-align: center;font-weight: bold;">等于</div></el-col>
        <el-col :span="10" class="form-border">
          <el-form-item label="数据源名称" prop="dataSourceName_right" >
            <el-select v-model="conditionForm.dataSourceName_right"
            @change="handleAddDataSourceChange($event,'right')">
              <el-option
                v-for="item in dataSourceList_right"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据源描述" prop="dataSourceDes_right">
            <el-input v-model="conditionForm.dataSourceDes_right"  placeholder="数据源描述" disabled></el-input>
          </el-form-item>
          <el-form-item label="字段名称" prop="fieldName_right"
          ref="fieldName_right">
            <el-select v-model="conditionForm.fieldName_right"
                       @change="handleFieldAddChange($event,'right')">
              <el-option
                v-for="item in fieldList_right"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字段描述" prop="fieldDes_right">
            <el-input v-model="conditionForm.fieldDes_right"  placeholder="字段描述" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form :model="conditionFormModify" v-else ref="conditionFormModify" label-width="100px"
             :rules="modifyFormRules">
      <el-row type="flex" align="middle">
        <el-col :span="10" class="form-border">
          <el-form-item label="数据源名称" prop="dataSourceName_left" >
            <el-select v-model="conditionFormModify.dataSourceName_left" @change="handleModifyDataSourceChange($event,'left')">
              <el-option
                v-for="item in dataSourceList_left"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据源描述" prop="dataSourceDes_left">
            <el-input v-model="conditionFormModify.dataSourceDes_left"  placeholder="数据源描述" disabled></el-input>
          </el-form-item>
          <el-form-item label="字段名称" prop="fieldName_left"
                        ref="fieldName_left">
            <el-select v-model="conditionFormModify.fieldName_left"
                       @change="handleFieldModifyChange($event,'left')">
              <el-option
                v-for="item in fieldList_left"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字段描述" prop="fieldDes_left">
            <el-input v-model="conditionFormModify.fieldDes_left"  placeholder="字段描述" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4"><div style="text-align: center;font-weight: bold;">等于</div></el-col>
        <el-col :span="10" class="form-border">
          <el-form-item label="数据源名称" prop="dataSourceName_right">
            <el-select v-model="conditionFormModify.dataSourceName_right"
                       @change="handleModifyDataSourceChange($event,'right')">
              <el-option
                v-for="item in dataSourceList_right"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据源描述" prop="dataSourceDes_right">
            <el-input v-model="conditionFormModify.dataSourceDes_right"  placeholder="数据源描述" disabled></el-input>
          </el-form-item>
          <el-form-item label="字段名称" prop="fieldName_right"
                        ref="fieldName_right">
            <el-select v-model="conditionFormModify.fieldName_right"
                       @change="handleFieldModifyChange($event,'right')">
              <el-option
                v-for="item in fieldList_right"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字段描述" prop="fieldDes_right">
            <el-input v-model="conditionFormModify.fieldDes_right"  placeholder="字段描述" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="bg-black" @click="cusValue = false"> {{$t('action.cancel')}}</el-button>
      <el-button type="bg-orange" @click="handleConfirm"> {{$t('action.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {GetValueFromArray} from '@/utils'
  import {modifyAssociatedConditionConfigList, addAssociatedConditionConfigList, fetchDataSetList, fetchDataSetFieldAddList} from '@/api/semanticManage'
  export default {
    name: 'AssociatedConditionsForm',
    componentName: 'AssociatedConditionsForm',
    props: {
      value: {
        type: Boolean
      },
      type: {
        type: String
      },
      relationid: {
        type: String
      },
      modify: {
        type: [String, Object]
      },
      tableLeft: {
        type: Array
      }
    },
    data () {
      return {
        cusValue: false,
        conditionForm: {
          dataSourceName_left: '',
          dataSourceDes_left: '',
          fieldName_left: '',
          fieldDes_left: '',
          dataSourceName_right: '',
          dataSourceDes_right: '',
          fieldName_right: '',
          fieldDes_right: ''
        },
        conditionFormModify: {
          id: '',
          dataSourceName_left: '',
          dataSourceDes_left: '',
          fieldName_left: '',
          fieldDes_left: '',
          dataSourceName_right: '',
          dataSourceDes_right: '',
          fieldName_right: '',
          fieldDes_right: ''
        },
        fieldList_left: [],
        fieldList_right: [],
        dataSourceList_left: [],
        dataSourceList_right: [],
        tables: [],
        addFormRules: {
          dataSourceName_left: [{required: true, message: '数据源名称为必填', trigger: 'change'}],
          fieldName_left: [{required: true, message: '字段名称为必填', trigger: 'change'}],
          dataSourceName_right: [{required: true, message: '数据源名称为必填', trigger: 'change'}],
          fieldName_right: [{required: true, message: '字段名称为必填', trigger: 'change'}]
        },
        modifyFormRules: {
          dataSourceName_left: [{required: true, message: '数据源名称为必填', trigger: 'change'}],
          fieldName_left: [{required: true, message: '字段名称为必填', trigger: 'change'}],
          dataSourceName_right: [{required: true, message: '数据源名称为必填', trigger: 'change'}],
          fieldName_right: [{required: true, message: '字段名称为必填', trigger: 'change'}]
        }
      }
    },
    created () {
      this.loadSourceData()
      this.$on('click', (row) => {
        console.log('row', row)
        this.tables = [row.tableMain, row.tableAssist]
        this.dataSourceList_left = [{
          itemName: row.tableMain,
          itemCode: row.tableMain,
          itemDesc: row.tableMain,
          disabled: false
        }, {
          itemName: row.tableAssist,
          itemCode: row.tableAssist,
          itemDesc: row.tableAssist,
          disabled: false
        }]
      })
    },
    methods: {
      initForm () {
        this.conditionForm = {
          dataSourceName_left: '',
          dataSourceDes_left: '',
          fieldName_left: '',
          fieldDes_left: '',
          dataSourceName_right: '',
          dataSourceDes_right: '',
          fieldName_right: '',
          fieldDes_right: ''
        }
      },
      loadSourceData () {
        this.dataSourceList = []
        let p = {
          pageNum: 1,
          pageSize: 100
        }
        fetchDataSetList(this.topicId, p).then((res) => {
          var arr = res.result.list
          console.log(23213213, arr)
          var _arr = []
          arr.forEach((item) => {
            if (this.tableLeft.length > 2) {
              if (this.tableLeft.indexOf(item.dsTable) !== -1) {
                _arr.push({
                  itemName: item.dsTable,
                  itemCode: item.dsTable,
                  itemDesc: item.dsDesc,
                  disabled: false
                })
              }
            } else {
              _arr.push({
                itemName: item.dsTable,
                itemCode: item.dsTable,
                itemDesc: item.dsDesc,
                disabled: false
              })
            }
          })
          // this.dataSourceList_left = JSON.parse(JSON.stringify(_arr))
          this.dataSourceList_right = JSON.parse(JSON.stringify(_arr))
        })
        // setTimeout(() => {
        //   var data = [{
        //     id: 'WIS_PRODUCT_ORDER_INFO',
        //     itemCode: 'WIS_PRODUCT_ORDER_INFO',
        //     itemName: '生产订单信息表'
        //   }, {
        //     id: 'WIS_WORK_SHEET_INFO',
        //     itemCode: 'WIS_WORK_SHEET_INFO',
        //     itemName: '生产任务信息表'
        //   }, {
        //     id: 'WIS_PRODUCT_TRANSPORT1',
        //     itemCode: 'WIS_PRODUCT_TRANSPORT1',
        //     itemName: '生产订单其他表1'
        //   }, {
        //     id: 'WIS_PRODUCT_TRANSPORT2',
        //     itemCode: 'WIS_PRODUCT_TRANSPORT2',
        //     itemName: '生产订单其他表2'
        //   }]
        //   data.forEach((item) => {
        //     item.disabled = false
        //   })
        //   this.dataSourceList_left = JSON.parse(JSON.stringify(data))
        //   this.dataSourceList_right = JSON.parse(JSON.stringify(data))
        // }, 30)
      },
      loadFiledData (id, type) {
        if (id) {
          setTimeout(() => {
            this['fieldList_' + type] = JSON.parse(JSON.stringify(this.fieldListData[id]))
          }, 30)
        }
      },
      handleAddDataSourceChange (val, type) {
        var filedListKey = `fieldList_${type}`
        var text = ''
        var arr = this['dataSourceList_right']
        arr.forEach((item) => {
          if (item.itemCode === val) {
            text = item.itemDesc
          }
        })
        this.conditionForm['dataSourceDes_' + type] = text
        this.conditionForm['fieldName_' + type] = ''
        this.conditionForm['fieldDes_' + type] = ''
        var param = {
          tableName: val,
          relation: '1',
          topicId: this.topicId,
          tag: 'all'
        }
        fetchDataSetFieldAddList(param).then((res) => {
          var arr = res.result
          var _arr = []
          arr.forEach((item) => {
            _arr.push({
              itemName: item.column_name,
              itemCode: item.column_name,
              itemText: item.column_comment
            })
          })
          this[filedListKey] = _arr
        })
      },
      handleModifyDataSourceChange (val, type, callback) {
        var filedListKey = `fieldList_${type}`
        // this.conditionForm.dataSourceDes_left = val
        var text = ''
        var arr = this['dataSourceList_right']
        arr.forEach((item) => {
          if (item.itemCode === val) {
            text = item.itemDesc
          }
        })
        this.conditionFormModify['dataSourceDes_' + type] = text
        this.conditionFormModify['fieldName_' + type] = ''
        this.conditionFormModify['fieldDes_' + type] = ''
        var param = {
          tableName: val,
          relation: '1',
          topicId: this.topicId,
          tag: 'all'
        }
        fetchDataSetFieldAddList(param).then((res) => {
          var arr = res.result
          var _arr = []
          arr.forEach((item) => {
            _arr.push({
              itemName: item.column_name,
              itemCode: item.column_name,
              itemText: item.column_comment
            })
          })
          this[filedListKey] = _arr
          if (callback) {
            callback()
          }
        })
      },
      handleDataSourceChange (val, type) {
        var key = `dataSourceDes_${type}`
        var deskey = `fieldDes_${type}`
        var nameKey = `fieldName_${type}`
        var listKey = `dataSourceList_${type}`
        this.conditionForm[deskey] = '' // 清除字段描述
        this.$refs[nameKey].resetField() // 清除字段名称下拉列表校验
        this.conditionForm[key] = GetValueFromArray(this[listKey], 'id', val, 'itemName')
        this.loadFiledData(val, type)
      },
      handleFieldAddChange (val, type) {
        var text = ''
        var arr = this['fieldList_' + type]
        arr.forEach((item) => {
          if (item.itemCode === val) {
            text = item.itemText
          }
        })
        this.conditionForm['fieldDes_' + type] = text
        // var deskey = `fieldDes_${type}`
        // var listKey = `fieldList_${type}`
        // this.conditionForm[deskey] = GetValueFromArray(this[listKey], 'id', val, 'name')
      },
      handleFieldModifyChange (val, type) {
        var text = ''
        var arr = this['fieldList_' + type]
        arr.forEach((item) => {
          if (item.itemCode === val) {
            text = item.itemText
          }
        })
        this.conditionFormModify['fieldDes_' + type] = text
      },
      handleConfirm () {
        if (this.type === 'add') {
          this.addConfirm('conditionForm')
        } else {
          this.modifyConfirm('conditionFormModify')
        }
      },
      addConfirm (formName) {
        var externaltable = ''
        var right = this.conditionForm.dataSourceName_right
        var arr = []
        this.dataSourceList_left.forEach((item) => {
          arr.push(item.itemName)
        })
        if (arr.indexOf(right) === -1) {
          externaltable = right
        }
        var param = {
          relation_id: this.relationid,
          table_main: this.conditionForm.dataSourceName_left,
          main_column: this.conditionForm.fieldName_left,
          table_assist: this.conditionForm.dataSourceName_right,
          assist_column: this.conditionForm.fieldName_right,
          external_table: externaltable
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addAssociatedConditionConfigList(param).then((res) => {
              this.cusValue = false
              this.$emit('data-change')
              this.$message({
                type: 'success',
                message: this.$t('message.addSuccess')
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      modifyConfirm (formName) {
        var externaltable = ''
        var right = this.conditionFormModify.dataSourceName_right
        var arr = []
        this.dataSourceList_left.forEach((item) => {
          arr.push(item.itemName)
        })
        if (arr.indexOf(right) === -1) {
          externaltable = right
        }
        var param = {
          id: this.conditionFormModify.id,
          relation_id: this.relationid,
          table_main: this.conditionFormModify.dataSourceName_left,
          main_column: this.conditionFormModify.fieldName_left,
          table_assist: this.conditionFormModify.dataSourceName_right,
          assist_column: this.conditionFormModify.fieldName_right,
          external_table: externaltable
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            modifyAssociatedConditionConfigList(param).then((res) => {
              this.cusValue = false
              this.$emit('data-change')
              this.$message({
                type: 'success',
                message: this.$t('message.addSuccess')
              })
            })
            // setTimeout(() => {
            //   this.cusValue = false
            //   this.$emit('data-change')
            //   this.$message({
            //     type: 'success',
            //     message: this.$t('message.addSuccess')
            //   })
            // }, 40)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    computed: {
      left () {
        return this.conditionForm.dataSourceName_left
      },
      right () {
        return this.conditionForm.dataSourceName_right
      },
      leftModify () {
        return this.conditionFormModify.dataSourceName_left
      },
      rightModify () {
        return this.conditionFormModify.dataSourceName_right
      },
      topicId () {
        return this.$store.state.customReport.semanticId
      }
    },
    watch: {
      modify (val) {
        if (val) {
          this.conditionFormModify.id = this.modify.id
          this.conditionFormModify.dataSourceName_left = this.modify.tableMain
          this.conditionFormModify.dataSourceDes_left = ''
          this.conditionFormModify.fieldName_left = this.modify.mainColumn
          this.conditionFormModify.fieldDes_left = ''
          this.conditionFormModify.dataSourceName_right = this.modify.tableAssist
          this.conditionFormModify.dataSourceDes_right = ''
          this.conditionFormModify.fieldName_right = this.modify.assistColumn
          this.conditionFormModify.fieldDes_right = ''
          this.handleModifyDataSourceChange(this.modify.tableMain, 'left', () => {
            this.conditionFormModify.fieldName_left = this.modify.mainColumn
            console.log(this.fieldList_left)
            for (var i = 0; i < this.fieldList_left.length; i++) {
              if (this.fieldList_left[i].itemCode === this.conditionFormModify.fieldName_left) {
                this.conditionFormModify.fieldDes_left = this.fieldList_left[i].itemText
                break
              }
            }
          })
          this.handleModifyDataSourceChange(this.modify.tableAssist, 'right', () => {
            this.conditionFormModify.fieldName_right = this.modify.assistColumn
            for (var i = 0; i < this.fieldList_right.length; i++) {
              if (this.fieldList_right[i].itemCode === this.conditionFormModify.fieldName_right) {
                this.conditionFormModify.fieldDes_right = this.fieldList_right[i].itemText
                break
              }
            }
          })
        }
      },
      value (val) {
        this.cusValue = val
        if (val) {
          if (this.type === 'modify') {
            console.log(1)
          } else {
            this.dataSourceList_left.forEach((item) => {
              item.disabled = false
            })
            this.fieldList_left = []
            this.fieldList_right = []
            this.loadSourceData()
            this.initForm()
            this.$nextTick(() => {
              this.$refs.conditionForm.resetFields()
            })
          }
        }
      },
      cusValue (val) {
        this.$emit('input', val)
      },
      leftModify (val) {
        if (this.tables.indexOf(val) !== -1) {
          this.dataSourceList_right.forEach((item) => {
            item.disabled = false
            if (item.itemCode === val) {
              item.disabled = true
            }
          })
        } else {
          this.dataSourceList_right.forEach((item) => {
            item.disabled = false
            if (this.tables.indexOf(item.itemCode) === -1) {
              item.disabled = true
            }
          })
        }
      },
      rightModify (val) {
        if (this.tables.indexOf(val) !== -1) {
          this.dataSourceList_left.forEach((item) => {
            item.disabled = false
            if (item.itemCode === val) {
              item.disabled = true
            }
          })
        } else {
          this.dataSourceList_left.forEach((item) => {
            item.disabled = false
            if (this.tables.indexOf(item.itemCode) === -1) {
              item.disabled = true
            }
          })
        }
      },
      left (val) {
        if (this.tables.indexOf(val) !== -1) {
          this.dataSourceList_right.forEach((item) => {
            item.disabled = false
            if (item.itemCode === val) {
              item.disabled = true
            }
          })
        } else {
          this.dataSourceList_right.forEach((item) => {
            item.disabled = false
            if (this.tables.indexOf(item.itemCode) === -1) {
              item.disabled = true
            }
          })
        }
      },
      right (val) {
        if (this.tables.indexOf(val) !== -1) {
          this.dataSourceList_left.forEach((item) => {
            item.disabled = false
            if (item.itemCode === val) {
              item.disabled = true
            }
          })
        } else {
          this.dataSourceList_left.forEach((item) => {
            item.disabled = false
            if (this.tables.indexOf(item.itemCode) === -1) {
              item.disabled = true
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
.form-border{
  border: 1px solid lightgray;
  padding: 15px 15px 0 0;
  background: #ffffff;
}
</style>
