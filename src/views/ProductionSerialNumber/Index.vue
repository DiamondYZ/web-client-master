<template>

  <div>
    <toolbar>
      <toolbar-group>
        <el-button type="border-orange" @click="showAddDialog">
          新增</el-button>
        <el-button type="border-orange" @click="confirmRemove" :disabled="!group.id">
          删除</el-button>
      </toolbar-group>
    </toolbar>

    <titlebar style="margin-top: 20px">
      <template slot="left">
        <query-form >
          <el-form ref="queryForm" :model="queryForm" size="mini" :inline="true">
            <el-form-item label="销售对象">
              <el-input clearable v-model="queryForm.saleObject" placeholder="销售对象"></el-input>
            </el-form-item>
            <el-form-item label="终端类型">
              <el-select clearable v-model="queryForm.type" placeholder="终端类型">
                <el-option label="终端企业" value="terminal"></el-option>
                <el-option label="经销商" value="distributor"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="bg-orange" @click="handleQuery" icon="el-icon-search"></el-button>
            </el-form-item>
          </el-form>
        </query-form>
      </template>
    </titlebar>

    <el-row :gutter="24">
      <el-col :span="12">
        <preview-view ref='preview' :queryCondition="queryCondition" @row-change="handleRowChange"></preview-view>
      </el-col>
      <el-col :span="12">
        <detail-view :group="group" @data-change="handleDataChange"  v-show="detailDisplay"></detail-view>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="addDialogVisible"
      width="40%"
      title="添加产品销售序列号"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="150px" >
        <el-form-item label="产品序列号" prop="serialNumber">
          <el-input v-model="addForm.serialNumber" placeholder="产品序列号" clearable></el-input>
        </el-form-item>
        <el-form-item label="生成日期" prop="createDate" clearable>
          <el-date-picker v-model="addForm.createDate" value-format="yyyy-MM-dd" type="date" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="销售对象" prop="saleObject">
          <el-input v-model="addForm.saleObject" placeholder="销售对象" clearable></el-input>
        </el-form-item>
        <el-form-item label="终端类型" prop="type">
          <el-select clearable v-model="addForm.type" placeholder="终端类型" clearable>
            <el-option label="终端企业" value="terminal"></el-option>
            <el-option label="经销商" value="distributor"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="addDialogVisible = false">取消</el-button>
        <el-button type="bg-orange" @click="confirmAdd">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Toolbar from '@/components/toolbar/Toolbar'
  import ToolbarGroup from '@/components/toolbar/ToolbarGroup'
  import DetailView from './DetailView'
  import PreviewView from './PreviewView'
  import Titlebar from '@/components/titlebar/Index'
  import { add, remove } from '@/api/productionSerialNumber'
  import QueryForm from '@/components/form/QueryForm'

  export default {
    name: 'ProductionSerialNumber',
    data () {
      return {
        detailDisplay: false,
        copyDialogVisible: false,
        addDialogVisible: false,
        addForm: {
          id: null,
          saleObject: '',
          type: '',
          createDate: '',
          serialNumber: ''
        },
        addFormRules: {
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
        },
        copyForm: {
          id: null,
          saleObject: null,
          type: null,
          createDate: null,
          serialNumber: null
        },
        queryForm: {
          saleObject: null,
          type: null
        },
        queryCondition: {
        },
        group: {}
      }
    },
    methods: {
      showAddDialog () {
        this.addDialogVisible = true
        if (this.$refs.addForm) {
          this.$refs.addForm.resetFields()
        }
      },
      confirmAdd () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            add(this.addForm).then(() => {
              this.addDialogVisible = false
              this.$message({
                type: 'success',
                message: '新增成功'
              })
              this.queryCondition = {saleObject: this.queryForm.saleObject === '' ? null : this.queryForm.saleObject, type: this.queryForm.type === '' ? null : this.queryForm.type}
              this.detailDisplay = false
            })
          }
        })
      },
      confirmRemove () {
        this.$confirm('确定删除此序列号吗', this.$t('message.tip'), {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(this.group.id).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.queryCondition = {saleObject: this.queryForm.saleObject === '' ? null : this.queryForm.saleObject, type: this.queryForm.type === '' ? null : this.queryForm.type}
            this.detailDisplay = false
          })
        })
      },
      handleQuery () {
        this.queryCondition = {saleObject: this.queryForm.saleObject === '' ? null : this.queryForm.saleObject, type: this.queryForm.type === '' ? null : this.queryForm.type}
        this.detailDisplay = false
      },
      handleRowChange (val) {
        this.group = val
        this.detailDisplay = true
      },
      handleDataChange (val) {
        this.$refs.preview.refreshRecord(val)
      }
    },
    components: {
      Titlebar,
      Toolbar,
      ToolbarGroup,
      DetailView,
      PreviewView,
      QueryForm
    }
  }
</script>
