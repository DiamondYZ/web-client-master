<template>
  <div>
    <titlebar>
      <template slot="right">
        <el-button type="border-orange"  @click="handleAdd" :disabled="!topicId">
          <svg-icon icon-class="wis_xinzeng"></svg-icon>{{$t('action.add')}}</el-button>
        <el-button type="border-orange"  @click="handleModify" :disabled="disable||topicId===''">
          <svg-icon icon-class="wis_xiugai"></svg-icon>{{$t('action.revise')}}</el-button>
        <el-button type="border-orange"  @click="handleDelete" :disabled="disable||topicId===''">
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
      <el-table-column v-for="(col, index) in columns" v-if="col.status === 1" :key="col.id"
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
               title="修改数据集"
               :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
               append-to-body>
      <el-form :model="modifyForm" :rules="modifyFormRules" ref="modifyForm" label-width="100px" >
        <el-form-item label="数据集名称" prop="dsCn">
          <el-input v-model="modifyForm.dsCn" placeholder="数据集名称" ></el-input>
        </el-form-item>
        <el-form-item label="数据源名称" prop="dsTable">
          <el-input v-model="modifyForm.dsTable"  placeholder="数据源名称" disabled></el-input>
        </el-form-item>
        <el-form-item label="数据源描述" prop="dsDesc">
          <el-input v-model="modifyForm.dsDesc"  placeholder="数据源描述" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="modifyFormVisible = false"> {{$t('action.cancel')}}</el-button>
        <el-button type="bg-orange" @click="handleModifyConfirm('modifyForm')"> {{$t('action.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!--新增-->
    <data-set-select
      v-model="addFormVisible"
      @data-change="dataAdd">
    </data-set-select>
  </div>
</template>

<script>
    import Titlebar from '@/components/titlebarWis/Index'
    import DataSetSelect from './DataSetSelect'
    import {fetchDataSetColumns, fetchDataSetList, modifyDataSet, fetchDataSetDeleteList} from '@/api/semanticManage'
    export default {
      name: 'DataSet',
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
          modifyFormVisible: false,
          modifyForm: {
            id: '',
            dsCn: '',
            dsTable: '',
            dsDesc: ''
          },
          modifyFormRules: {
            dsCn: [{ required: true, message: '数据集名称为必填', trigger: 'blur' }]
          },
          addFormVisible: false
        }
      },
      created () {
        this.initColumns()
        this.loadData()
      },
      methods: {
        initColumns () {
          fetchDataSetColumns().then((data) => {
            this.columns = data.result
            setTimeout(() => {
              this.tableVisible = true
            }, 0)
          })
        },
        loadData (id) {
          var arr = [10, 20, 30, 40]
          if (this.topicId === '') {
            this.data = []
            this.total = 0
            this.pageSize = 10
            this.currentPage = 1
            return false
          }
          let p = {
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
          this.loading = true
          fetchDataSetList(this.topicId, p).then((res) => {
            this.data = res.result.list
            this.total = res.result.total
            if (arr.indexOf(res.result.pageSize) === -1) {
              this.pageSize = 10
            }
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
          for (var i in this.modifyForm) {
            console.log(this.modifyForm[i])
            this.modifyForm[i] = this.curRow[i]
          }
          this.modifyFormVisible = true
        },
        handleModifyConfirm (formName) {
          var param = {
            id: this.modifyForm.id,
            dsCn: this.modifyForm.dsCn
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              modifyDataSet(param).then((res) => {
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
            fetchDataSetDeleteList(id).then((res) => {
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
        topicId () {
          this.loadData()
        },
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
        DataSetSelect
      }
    }
</script>

<style scoped>

</style>
