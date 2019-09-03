<template>

  <div>
    <titlebar>
      <template slot="left">
        <span>详细视图</span>
      </template>
      <template slot="right">
        <el-button type="bg-orange" v-show="!editable" @click="editable = true" :disabled="!group.id">
          编辑</el-button>
        <div v-show="editable">
          <el-button type="text-orange" @click="editable = false">
            取消</el-button>
          <el-button type="text-orange" @click="resetForm">
            恢复</el-button>
          <el-button type="bg-black" @click="saveForm">
            保存</el-button>
        </div>
      </template>
    </titlebar>
    <div class="main-data-view__content">
      <el-row>
        <el-col :span="20">
          <el-form v-show="!editable" label-width="100px" >
            <el-form-item label="产品序列号">
              {{group.serialNumber || emptyPlaceholder}}
            </el-form-item>
            <el-form-item label="生成日期">
              {{group.createDate.substr(0, 10) || emptyPlaceholder}}
            </el-form-item>
            <el-form-item label="销售对象">
              {{group.saleObject || emptyPlaceholder}}
            </el-form-item>
            <el-form-item label="终端类型">
              {{(group.type === 'terminal' ? '终端企业' : '经销商') || emptyPlaceholder}}
            </el-form-item>
          </el-form>
          <el-form ref="updateForm" :model="updateForm" :rules="updateFormRules" v-show="editable" label-width="100px" >
            <el-form-item label="产品序列号" prop="serialNumber">
              <el-input  v-model="updateForm.serialNumber"  placeholder="产品序列号"></el-input>
            </el-form-item>
            <el-form-item label="生成日期" prop="createDate">
              <el-date-picker v-model="updateForm.createDate" value-format="yyyy-MM-dd" type="date" clearable></el-date-picker>
            </el-form-item>
            <el-form-item label="销售对象" prop="saleObject">
              <el-input  v-model="updateForm.saleObject" placeholder="销售对象"></el-input>
            </el-form-item>
            <el-form-item label="终端类型" prop="type">
              <el-select clearable v-model="updateForm.type" placeholder="终端类型">
                <el-option label="终端企业" value="terminal"></el-option>
                <el-option label="经销商" value="distributor"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
  import Titlebar from '@/components/titlebar/Index'
  import { update } from '@/api/productionSerialNumber'

  export default {
    data () {
      return {

        dialogVisible: false,
        queryForm: {
        },
        currentPage: 1,
        pageSize: 10,
        total: 0,
        currentRow: null,
        loading: false,
        emptyPlaceholder: '-',
        editable: false,
        updateForm: {
          id: null,
          saleObject: '',
          type: '',
          createDate: '',
          serialNumber: ''
        },
        updateFormRules: {
          saleObject: [
            { required: true, message: '需要填写销售对象', trigger: 'change' }
          ],
          type: [
            { required: true, message: '需要填写终端类型', trigger: 'change' }
          ],
          createDate: [
            { required: true, message: '需要填写生成日期', trigger: 'change' }
          ],
          serialNumber: [
            { required: true, message: '需要填写产品序列号', trigger: 'change' }
          ]
        }
      }
    },
    props: {
      group: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    watch: {
      group (val) {
        if (val.id) {
          this.initForm()
        }
      }
    },
    methods: {
      initForm () {
        this.updateForm = {
          id: this.group.id,
          saleObject: this.group.saleObject,
          type: this.group.type,
          serialNumber: this.group.serialNumber,
          createDate: this.group.createDate
        }
      },
      resetForm () {
        this.initForm()
      },
      saveForm () {
        this.$refs.updateForm.validate((valid) => {
          if (valid) {
            update(this.updateForm).then(() => {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.$emit('data-change', this.updateForm)
              this.editable = false
            })
          }
        })
      },
      loadData () {
        this.loading = true
      },
      addForm () {
        this.loadData().then(() => {
          this.dialogVisible = true
          this.$nextTick(() => {
            this.resetQuery()
          })
        })
      },
      handleRowClick (row) {
        this.currentRow = row
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.loadData()
      },
      handlePageChange (val) {
        this.currentPage = val
        this.loadData()
      },
      handleCurrentChange (val) {
        if (val) {
          this.currentRow = val
        }
      },
      query () {
        this.currentPage = 1
        this.loadData()
      },
      resetQuery (param = {}) {
        this.queryForm.code = ''
        this.param = param
        this.query(this.param)
      }
    },
    components: {
      Titlebar
    }
  }
</script>
