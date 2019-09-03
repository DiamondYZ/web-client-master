<template>
  <div>
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
              :style="{visibility: tableVisible ? 'visible' : 'hidden'}"
              @current-change="handleSelectedRowChange"
              @selection-change="handleSelectionChange">
      <!--<el-table-column
        type="selection"
        width="55">
      </el-table-column>-->
      <el-table-column v-for="(col, index) in curColumns" v-if="col.status === 1" :key="col.id"
                       :prop="col.prop" show-overflow-tooltip :label="col.label">
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
    <!--修改-->
    <el-dialog
               :visible.sync="modifyFormVisible"
               width="30%"
               title="修改数据集字段"
               :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
               append-to-body>
      <el-form :model="modifyForm" :rules="modifyFormRules" ref="modifyForm" label-width="100px" >
        <el-form-item label="语义名称" prop="fieldShowName">
          <el-input v-model="modifyForm.fieldShowName" placeholder="语义名称" ></el-input>
        </el-form-item>
        <el-form-item label="字段名称" prop="fieldCode">
          <el-input v-model="modifyForm.fieldCode"  :placeholder="$t('common.staff.name')" disabled></el-input>
        </el-form-item>
        <el-form-item label="数据源名称" prop="dsTable">
          <el-input v-model="modifyForm.dsTable"  :placeholder="$t('common.staff.name')" disabled></el-input>
        </el-form-item>
        <el-form-item label="数据源描述" prop="dsTableDesc">
          <el-input v-model="modifyForm.dsTableDesc"  placeholder="数据源描述" disabled></el-input>
        </el-form-item>
        <el-form-item label="数据字典" prop="classCode">
          <el-input v-model="modifyForm.classCode"  placeholder="数据字典"></el-input>
        </el-form-item>
        <el-form-item label="为空默认值" prop="ifnullValue">
          <el-input v-model="modifyForm.ifnullValue"  placeholder="为空默认值"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="modifyFormVisible = false"> {{$t('action.cancel')}}</el-button>
        <el-button type="bg-orange" @click="handleModifyConfirm('modifyForm')"> {{$t('action.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!--新增-->
    <data-set-filed-select
      v-model="addFormVisible"
      :columns="columns"
      @data-change="dataAdd">
    </data-set-filed-select>
  </div>
</template>

<script>
  import Titlebar from '@/components/titlebar/Index'
  import DataSetFiledSelect from './DataSetFiledSelect'
  import {fetchDataSetFieldColumns, fetchDataSetFieldList, modifyDataSetField, fetchDataSetFieldDeleteList} from '@/api/semanticManage'
  import {HideColumns} from '@/utils'
  export default {
    name: 'DataSetField',
    data () {
      return {
        data: [],
        curColumns: [],
        columns: [],
        tableVisible: false,
        loading: false,
        total: 0,
        pageSize: 10,
        currentPage: 1,
        disable: true,
        curRow: '',
        modifyFormVisible: false,
        modifyForm: {
          id: '',
          fieldShowName: '',
          fieldCode: '',
          dsTable: '',
          dsDesc: '',
          dsTableDesc: '',
          classCode: '',
          ifnullValue: ''
        },
        modifyFormRules: {fieldShowName: [{ required: true, message: '语义名称为必填', trigger: 'blur' }]},
        addFormVisible: false
      }
    },
    created () {
      this.initColumns()
      this.loadData()
    },
    methods: {
      initColumns () {
        fetchDataSetFieldColumns().then((data) => {
          this.columns = data.result
          this.curColumns = HideColumns(['filedDes'], data.result)
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
        fetchDataSetFieldList(this.topicId, p).then((res) => {
          this.data = res.result.list
          this.total = res.result.total
          this.pageSize = res.result.pageSize
          this.currentPage = res.result.pageNum
          this.loading = false
          this.curRow = ''
        })
      },
      handleAdd () {
        this.addFormVisible = true
      },
      dataAdd () {
        this.loadData()
      },
      handleModify () {
        if (this.$refs.modifyForm) {
          this.$refs.modifyForm.resetFields()
        }
        console.log(this.curRow)
        for (var i in this.modifyForm) {
          this.modifyForm[i] = this.curRow[i]
        }
        this.modifyFormVisible = true
      },
      handleModifyConfirm (formName) {
        var param = {
          id: this.modifyForm.id,
          field_show_name: this.modifyForm.fieldShowName,
          classCode: this.modifyForm.classCode,
          ifnullValue: this.modifyForm.ifnullValue
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            modifyDataSetField(param).then((res) => {
              this.loadData()
              this.modifyFormVisible = false
              this.$message({
                type: 'success',
                message: this.$t('message.updateSuccess')
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleDelete () {
        this.$confirm(this.$t('action.removeWarning'), this.$t('message.tip'), {
          confirmButtonText: this.$t('action.confirm'),
          cancelButtonText: this.$t('action.cancel'),
          type: 'warning'
        }).then(() => {
          var id = this.curRow.id
          fetchDataSetFieldDeleteList(id).then((res) => {
            this.$message({
              type: 'success',
              message: this.$t('message.removeSuccess')
            })
            this.loadData()
          })
        })
      },
      handleSelectedRowChange (val) {
        this.curRow = val
      },
      handleSelectionChange () {
        alert(1)
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
      DataSetFiledSelect
    }
  }
</script>

<style scoped>

</style>
