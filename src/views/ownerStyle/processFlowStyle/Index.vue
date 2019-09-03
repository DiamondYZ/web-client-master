<template>

  <div style="margin-top: 10px; ">
    <el-row :gutter="24" >
      <el-col :span="10">
        <owner-view  @owner-change="handleOwnerChange"></owner-view>

      </el-col>
      <el-col :span="14"  >
        <layout-resizable>
          <template slot="top">
            <titlebar>
              <template slot="left">
                <div style="font-size: larger; margin: 10px 0px; width: 150px">工艺流程</div>
              </template>
              <template slot="right">
                <el-form ref="queryForm" :model="queryForm" clearable :inline="true">
                  <el-form-item label="物料项目号">
                    <el-input v-model="queryForm.materialProjectNumber" clearable ></el-input>
                  </el-form-item>
                  <el-form-item label="物料编号">
                    <el-input v-model="queryForm.materialNumber" clearable ></el-input>
                  </el-form-item>
                  <el-form-item label="物料描述">
                    <el-input v-model="queryForm.materialDescription" clearable ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="bg-orange" @click="query()" icon="el-icon-search"></el-button>
                  </el-form-item>
                </el-form>
              </template>
            </titlebar>
            <el-table
              ref="table"
              stripe
              border
              tooltip-effect="light"
              :data="data0"
              size="mini"
              highlight-current-row
              @row-click="handleRowClick"
              style="width: 100%">
              <el-table-column
                prop="number"
                label="工艺流程编号">
              </el-table-column>
              <el-table-column
                prop="isDefault"
                label="默认">
              </el-table-column>
              <el-table-column
                prop="materialNumber"
                label="物料编号">
              </el-table-column>
              <el-table-column
                prop="materialProjectNumber"
                label="物料项目号">
              </el-table-column>
              <el-table-column
                prop="materialDescription"
                label="物料描述">
              </el-table-column>
              <el-table-column
                prop="description"
                label="工艺流程描述">
              </el-table-column>
              <el-table-column
                prop="edition"
                label="版本">
              </el-table-column>
              <el-table-column
                prop="isValid"
                label="有效标识">
              </el-table-column>
              <el-table-column
                prop="statusDict"
                label="状态">
              </el-table-column>
              <el-table-column
                prop="authorName"
                label="编制人">
              </el-table-column>
              <el-table-column
                prop="issueDate"
                label="编制日期">
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </template>
          <template slot="bottom">
            <titlebar>
              <template slot="left">
                <div style="font-size: larger; margin: 10px 0px; width: 200px">工序</div>
              </template>
            </titlebar>
            <el-table
              ref="table1"
              stripe
              border
              tooltip-effect="light"
              :data="data1"
              size="mini"
              highlight-current-row
              style="width: 100%">
              <el-table-column
                prop="number"
                label="工序号">
              </el-table-column>
              <el-table-column
                prop="nextNumber"
                label="下序">
              </el-table-column>
              <el-table-column
                prop="sopName"
                label="SOP">
              </el-table-column>
              <el-table-column
                prop="taskDescription"
                label="任务描述">
              </el-table-column>
              <el-table-column
                prop="workCenterName"
                label="工作中心">
              </el-table-column>
              <el-table-column
                prop="prepareTime"
                label="准备时间">
              </el-table-column>
              <el-table-column
                prop="workingTime"
                label="加工时间">
              </el-table-column>
              <el-table-column
                prop="processContent"
                label="工序内容">
              </el-table-column>
              <el-table-column
                prop="processControlDict"
                label="工序控制">
              </el-table-column>
              <el-table-column
                prop="isUseCam"
                label="是否已绑定程序">
              </el-table-column>
              <el-table-column
                prop=""
                label="操作">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.isUseCam!=='1'" type="border-orange" @click="saveCallCam(scope.row.id)">需要关联程序</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handlePageChange1"
              :current-page="currentPage1"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total1">
            </el-pagination>
          </template>
        </layout-resizable>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import LayoutResizable from '@/components/layoutResizable/Index'
  import Titlebar from '../../../components/titlebar/Index.vue'
  import {fetchList, saveCallCam, fetchOwner, fetchOperationList} from '@/api/ownerStyleProcessFlow'

  import OwnerView from '../../common/OwnerView'
  export default {
    name: '',
    data () {
      return {
        owner: null,

        ownerData: [],
        queryFormOwner: {},

        pageSize: 10,
        total: 0,
        currentPage: 1,
        data0: [],
        queryForm: {},
        pageSize1: 10,
        total1: 0,
        currentPage1: 1,
        data1: [],
        queryForm1: {}
      }
    },
    methods: {
      handleOwnerChange (val) {
        this.owner = val
      },
      loadDataOwner () {
        fetchOwner(this.queryFormOwner.companyCode, this.queryFormOwner.companyName).then((data) => {
          this.ownerData = data.result
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
      handlePageChange1 (val) {
        this.currentPage1 = val
        this.loadData1()
      },
      handleSizeChange1 (val) {
        this.pageSize1 = val
        this.loadData1()
      },
      loadData () {
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        this.queryForm.owner = this.owner
        fetchList(this.queryForm, p).then((data) => {
          this.data0 = data.result.list
          this.total = data.result.total
          this.currentPage = data.result.pageNum || 1
        })
      },
      query () {
        if (this.queryForm.materialProjectNumber === '') {
          this.queryForm.materialProjectNumber = null
        }
        if (this.queryForm.materialNumber === '') {
          this.queryForm.materialNumber = null
        }
        if (this.queryForm.materialDescription === '') {
          this.queryForm.materialDescription = null
        }
        this.loadData()
      },
      handleRowClick (row) {
        this.queryForm1.technologyId = row.id
        this.loadData1()
      },
      loadData1 () {
        let p = {
          pageNum: this.currentPage1,
          pageSize: this.pageSize1
        }
        this.queryForm1.owner = this.owner
        fetchOperationList(this.queryForm1, p).then((data) => {
          this.data1 = data.result.list
          this.total1 = data.result.total
          this.currentPage1 = data.result.pageNum || 1
        })
      },
      saveCallCam (id) {
        saveCallCam(id, this.owner).then(() => {
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
          this.loadData1()
        })
      }
    },
    watch: {
      owner (value) {
        if (value) {
          this.loadData()
        }
      }
    },
    mounted () {
      this.loadDataOwner()
    },
    components: {
      Titlebar,
      LayoutResizable,
      OwnerView
    }
  }
</script>
