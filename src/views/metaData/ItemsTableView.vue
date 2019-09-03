<template>
  <div class="meta-data-items-table-view">
    <titlebar>
      <template slot="left">字典项</template>
      <template slot="right" >
        <el-button type="border-orange" v-show="!editable" @click="editable = true">编辑</el-button>
        <div v-show="editable">
          <el-button type="text-orange" @click="showAddDialog" :disabled="!owner">添加</el-button>
          <el-button type="text-orange" @click="showEditDialog" :disabled="!selectedItem">修改</el-button>
          <el-button type="text-orange" @click="remove" :disabled="!selectedItem">删除</el-button>
        </div>
      </template>
    </titlebar>
    <el-table
      ref="table"
      :data="data"
      style="width: 100%"
      stripe
      border
      tooltip-effect="light"
      highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column
        show-overflow-tooltip
        prop="itemCode"
        label="编码">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="itemName"
        label="名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="crtTime"
        label="创建日期">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="updTime"
        label="更新日期">
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
    <!-- 添加项目 -->
    <el-dialog
      width="30%"
      center
      :visible.sync="addDialogVisible"
      title="添加项目"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="postForm" :rules="formRules" ref="postForm" label-width="150px">
        <el-form-item label="编码" prop="itemCode">
          <el-input v-model="postForm.itemCode" placeholder="编码">
          </el-input>
        </el-form-item>
        <el-form-item label="名称" prop="itemName">
          <el-input v-model="postForm.itemName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="postForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="addDialogVisible = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑替换设备  -->
    <el-dialog
      width="60%"
      center
      :visible.sync="editDialogVisible"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="putForm" :rules="formRules" ref="putForm" label-width="100px">
        <el-form-item label="编码" prop="itemCode">
          <el-input v-model="putForm.itemCode" placeholder="编码">
          </el-input>
        </el-form-item>
        <el-form-item label="名称" prop="itemName">
          <el-input v-model="putForm.itemName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="putForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="editDialogVisible = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Titlebar from '@/components/titlebar/Index'
  import {fetchList, remove, add, update} from '@/api/metaDataItem'
  export default {
    name: 'MetaDataItemsTableView',
    data () {
      return {
        data: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        selectedItem: null,
        editable: false,
        addDialogVisible: false,
        editDialogVisible: false,
        postForm: {
          classId: null,
          classCode: '',
          itemCode: '',
          itemName: '',
          description: ''
        },
        putForm: {
          id: null,
          classId: null,
          itemCode: '',
          itemName: '',
          description: ''
        },
        formRules: {
          itemCode: [
            {required: true, message: '编号不能为空', trigger: 'change'}
          ],
          itemName: [
            {required: true, message: '名称不能为空', trigger: 'change'}
          ]
        }
      }
    },
    props: {
      metaData: {
        type: Object,
        default: {}
      },
      owner: {
        type: String,
        default: null
      }
    },
    watch: {
      metaData (newVal) {
        if (newVal.id) {
          this.loadData()
          this.initForm()
        }
      }
    },
    created () {
      if (this.metaData.id) {
        this.loadData()
      }
    },
    methods: {
      initForm () {
        this.postForm.classId = this.metaData.id
        this.postForm.classCode = this.metaData.classCode
        this.putForm.classId = this.metaData.id
      },
      showAddDialog () {
        if (this.$refs.postForm) {
          this.$refs.postForm.resetFields()
        }
        this.addDialogVisible = true
      },
      showEditDialog () {
        this.putForm.id = this.selectedItem.id
        this.putForm.classId = this.metaData.id
        this.putForm.itemCode = this.selectedItem.itemCode
        this.putForm.itemName = this.selectedItem.itemName
        this.putForm.description = this.selectedItem.description
        this.editDialogVisible = true
      },
      confirmAdd () {
        this.$refs.postForm.validate((valid) => {
          if (valid) {
            this.postForm.owner = this.owner
            add(this.postForm).then((data) => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.addDialogVisible = false
              this.currentPage = 1
              this.loadData()
            })
          }
        })
      },
      confirmEdit () {
        this.$refs.putForm.validate((valid) => {
          if (valid) {
            update(this.putForm).then((data) => {
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
        this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(this.selectedItem.id).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.currentPage = 1
            this.loadData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleCurrentChange (val) {
        this.selectedItem = val
      },
      handleSizeChange (val) {
        this.pagesize = val
        this.loadData()
      },
      handlePageChange (val) {
        this.currentPage = val
        this.loadData()
      },
      loadData () {
        let p = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        let param = {
          classCode: this.metaData.classCode,
          owner: this.owner
        }
        fetchList(param, p).then((data) => {
          this.data = data.result.list
          this.total = data.result.total
          this.currentPage = data.result.pageNum || 1
          this.pageSize = data.result.pageSize
        })
      }
    },
    components: {
      Titlebar
    }
  }
</script>

<style>
</style>
