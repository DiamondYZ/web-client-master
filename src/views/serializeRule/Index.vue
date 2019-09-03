<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6">
        <titlebar>
          <template slot="left">
            <div style="font-size: larger; margin: 10px 0px">序列号规则</div>
          </template>
          <template slot="right">
            <el-button type="border-orange" @click="sync">同步到租户</el-button>
            <el-button type="border-orange" @click="showAddDialog">新增</el-button>
            <el-button type="border-orange" @click="showEditDialog" :disabled="!mainSelection.id">修改</el-button>
            <el-button type="border-orange" @click="remove" :disabled="!mainSelection.id">删除</el-button>
          </template>
        </titlebar>
        <el-table
          stripe
          border
          highlight-current-row
          @row-click="handleMainClick"
          :data="data">
          <el-table-column
            show-overflow-tooltip
            prop="number"
            label="编号">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="keyDict"
            label="业务标识">
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
      </el-col>
      <el-col :span="18">
        <titlebar>
          <template slot="left">
            <div style="font-size: larger; margin: 10px 0px">序列号规则详细</div>
          </template>
          <template slot="right">
            <el-button type="border-orange" @click="showAddDialogD" :disabled="!mainSelection.id">新增</el-button>
            <el-button type="border-orange" @click="showEditDialogD" :disabled="!subSelection.id">修改</el-button>
            <el-button type="border-orange" @click="removeD" :disabled="!subSelection.id">删除</el-button>
          </template>
        </titlebar>
        <el-table :data="dataD"
                  stripe
                  border
                  highlight-current-row
                  @row-click="handleSubClick">
          <el-table-column
            show-overflow-tooltip
            prop="sequence"
            label="序号">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ruleTypeDict"
            label="规则类型">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="掩码"
            prop="maskTypeDict">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="位数"
            prop="bit">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="补位符"
            prop="coverSymbol">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="说明"
            prop="description">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="日期格式"
            prop="format">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="补位方向"
            prop="coverDirection">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="前置连接符"
            prop="preConnector">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="手工填写值"
            prop="fixedValue">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 添加项目 -->
    <el-dialog
      width="30%"
      center
      :visible.sync="addDialogVisible"
      title="添加规则"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="postForm" :rules="formRules" ref="postForm" label-width="150px">
        <el-form-item label="编码" prop="number">
          <el-input v-model="postForm.number" >
          </el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="postForm.description"></el-input>
        </el-form-item>
        <el-form-item label="适用类型" prop="type">
          <el-select v-model="postForm.type">
            <el-option label="序列号" value="serialization"></el-option>
            <el-option label="批次号" value="batch"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务标识" prop="description">
          <el-input v-model="postForm.keyDict"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="addDialogVisible = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑替换设备  -->
    <el-dialog
      width="30%"
      title="修改规则"
      center
      :visible.sync="editDialogVisible"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="putForm" :rules="formRules" ref="putForm" label-width="100px">
        <el-form-item label="编码" prop="number">
          <el-input v-model="putForm.number" >
          </el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="putForm.description"></el-input>
        </el-form-item>
        <el-form-item label="适用类型" prop="type">
          <el-select v-model="putForm.type">
            <el-option label="序列号" value="serialization"></el-option>
            <el-option label="批次号" value="batch"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务标识" prop="description">
          <el-input v-model="putForm.keyDict"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="editDialogVisible = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加 -->
    <el-dialog
      width="30%"
      center
      :visible.sync="addDialogVisibleD"
      title="添加规则详细"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="postFormD" :rules="formRulesD" ref="postFormD" label-width="150px">
        <el-form-item label="序号" prop="sequence">
          <el-input v-model="postFormD.sequence" >
          </el-input>
        </el-form-item>
        <el-form-item label="规则类型" prop="ruleTypeDict">
          <el-select v-model="postFormD.ruleTypeDict">
            <el-option label="手工填写" value="manual_filling"></el-option>
            <el-option label="固定值" value="fixed_value"></el-option>
            <el-option label="当日递增" value="increase_in_day"></el-option>
            <el-option label="历史序列" value="historical_sequence"></el-option>
            <el-option label="固定值" value="fixed_value"></el-option>
            <el-option label="当前日期" value="current_date"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="掩码" prop="maskTypeDict">
          <el-input v-model="postFormD.maskTypeDict"></el-input>
        </el-form-item>
        <el-form-item label="位数" prop="bit">
          <el-input v-model="postFormD.bit"></el-input>
        </el-form-item>
        <el-form-item label="补位符" prop="coverSymbol">
          <el-input v-model="postFormD.coverSymbol"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="description">
          <el-input v-model="postFormD.description"></el-input>
        </el-form-item>
        <el-form-item label="日期格式" prop="format">
          <el-input v-model="postFormD.format"></el-input>
        </el-form-item>
        <el-form-item label="补位方向" prop="coverDirection">
          <el-input v-model="postFormD.coverDirection"></el-input>
        </el-form-item>
        <el-form-item label="前置连接符" prop="preConnector">
          <el-input v-model="postFormD.preConnector"></el-input>
        </el-form-item>
        <el-form-item label="手工填写值" prop="fixedValue">
          <el-input v-model="postFormD.fixedValue"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="addDialogVisibleD = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirmAddD">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      width="30%"
      title="修改规则详细"
      center
      :visible.sync="editDialogVisibleD"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="putFormD" :rules="formRulesD" ref="putFormD" label-width="100px">
        <el-form-item label="序号" prop="sequence">
          <el-input v-model="putFormD.sequence" >
          </el-input>
        </el-form-item>
        <el-form-item label="规则类型" prop="ruleTypeDict">
          <el-select v-model="putFormD.ruleTypeDict">
            <el-option label="手工填写" value="manual_filling"></el-option>
            <el-option label="固定值" value="fixed_value"></el-option>
            <el-option label="当日递增" value="increase_in_day"></el-option>
            <el-option label="历史序列" value="historical_sequence"></el-option>
            <el-option label="固定值" value="fixed_value"></el-option>
            <el-option label="当前日期" value="current_date"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="掩码" prop="maskTypeDict">
          <el-input v-model="putFormD.maskTypeDict"></el-input>
        </el-form-item>
        <el-form-item label="位数" prop="bit">
          <el-input v-model="putFormD.bit"></el-input>
        </el-form-item>
        <el-form-item label="补位符" prop="coverSymbol">
          <el-input v-model="putFormD.coverSymbol"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="description">
          <el-input v-model="putFormD.description"></el-input>
        </el-form-item>
        <el-form-item label="日期格式" prop="format">
          <el-input v-model="putFormD.format"></el-input>
        </el-form-item>
        <el-form-item label="补位方向" prop="coverDirection">
          <el-input v-model="putFormD.coverDirection"></el-input>
        </el-form-item>
        <el-form-item label="前置连接符" prop="preConnector">
          <el-input v-model="putFormD.preConnector"></el-input>
        </el-form-item>
        <el-form-item label="手工填写值" prop="fixedValue">
          <el-input v-model="putFormD.fixedValue"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="editDialogVisibleD = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirmEditD">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Titlebar from '../../components/titlebar/Index.vue'

  import Toolbar from '@/components/toolbar/Toolbar'
  import ToolbarGroup from '@/components/toolbar/ToolbarGroup'
  import ToolbarLine from '@/components/toolbar/ToolbarLine'

  import {fetch, add, update, remove, sync} from '@/api/serializeRule'
  import {fetchD, addD, updateD, removeD} from '@/api/serializeRuleDetail'
  export default {
    components: {Titlebar, Toolbar, ToolbarGroup, ToolbarLine},
    data () {
      return {
        pageSize: 10,
        total: 0,
        currentPage: 1,
        data: [],
        selectedRow: null,
        loading: false,
        mainSelection: {},
        subSelection: {},
        addDialogVisible: false,
        editDialogVisible: false,
        formRules: {},
        putForm: {},
        postForm: {},
        dataD: [],
        formRulesD: {},
        putFormD: {},
        postFormD: {},
        addDialogVisibleD: false,
        editDialogVisibleD: false
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.loading = true
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        fetch({}, p).then((data) => {
          this.data = data.result.list
          this.total = data.result.total
          this.currentPage = data.result.pageNum || 1
          this.pageSize = data.result.pageSize
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      handleMainClick (val) {
        this.mainSelection = val
        this.loadDataD(val.id)
      },
      loadDataD (id) {
        fetchD(id).then((data) => {
          this.dataD = data.result
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
      showAddDialog () {
        if (this.$refs.postForm) {
          this.$refs.postForm.resetFields()
        }
        this.addDialogVisible = true
      },
      showEditDialog () {
        this.putForm.id = this.mainSelection.id
        this.putForm.number = this.mainSelection.number
        this.putForm.description = this.mainSelection.description
        this.putForm.keyDict = this.mainSelection.keyDict
        this.putForm.type = this.mainSelection.type
        this.editDialogVisible = true
      },
      confirmAdd () {
        this.$refs.postForm.validate((valid) => {
          if (valid) {
            add(this.postForm).then(() => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.addDialogVisible = false
              this.loadData()
            })
          }
        })
      },
      confirmEdit () {
        this.$refs.putForm.validate((valid) => {
          if (valid) {
            update(this.putForm).then(() => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              })
              this.editDialogVisible = false
              this.loadData()
            })
          }
        })
      },
      remove () {
        remove(this.mainSelection.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadData()
          this.mainSelection = {}
        })
      },
      handleSubClick (row) {
        this.subSelection = row
      },
      showAddDialogD () {
        if (this.$refs.postFormD) {
          this.$refs.postFormD.resetFields()
        }
        console.log('123123')
        this.postFormD.ruleId = this.mainSelection.id
        console.log(this.mainSelection)
        console.log(this.postFormD.ruleId)
        this.addDialogVisibleD = true
      },
      showEditDialogD () {
        this.putFormD.id = this.subSelection.id
        this.putFormD.ruleId = this.subSelection.ruleId
        this.putFormD.sequence = this.subSelection.sequence
        this.putFormD.ruleTypeDict = this.subSelection.ruleTypeDict
        this.putFormD.maskTypeDict = this.subSelection.maskTypeDict
        this.putFormD.bit = this.subSelection.bit
        this.putFormD.coverSymbol = this.subSelection.coverSymbol
        this.putFormD.description = this.subSelection.description
        this.putFormD.format = this.subSelection.format
        this.putFormD.coverDirection = this.subSelection.coverDirection
        this.putFormD.preConnector = this.subSelection.preConnector
        this.putFormD.fixedValue = this.subSelection.fixedValue
        this.editDialogVisibleD = true
      },
      confirmAddD () {
        this.$refs.postFormD.validate((valid) => {
          if (valid) {
            addD(this.postFormD).then(() => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.addDialogVisibleD = false
              this.loadDataD(this.mainSelection.id)
            })
          }
        })
      },
      confirmEditD () {
        this.$refs.putFormD.validate((valid) => {
          if (valid) {
            updateD(this.putFormD).then(() => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              })
              this.editDialogVisibleD = false
              this.loadDataD(this.mainSelection.id)
            })
          }
        })
      },
      sync () {
        this.$confirm('此操作将更新所有租户的初始化序列号规则数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sync().then(() => {
            this.$message({
              type: 'success',
              message: '同步成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消同步'
          })
        })
      },
      removeD () {
        removeD(this.subSelection.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadDataD(this.mainSelection.id)
          this.subSelection = {}
        })
      }
    }
  }
</script>
