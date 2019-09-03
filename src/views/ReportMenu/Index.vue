<template>
  <div>
    <div style="margin-top: 10px; ">
      <el-row :gutter="24">
        <el-col :span="24">
          <div style="margin: 10px">
            <div style="font-size: larger;margin: 5px;height: 15px">
              <div style="float: left;">
                报表列表
                <el-button type="border-orange" @click="refresh" style="margin-left: 5px">刷新</el-button>
              </div>
              <el-select v-model="selectOwner" filterable placeholder="请选择" style="float: right;margin-left: 5px">
                <el-option
                  v-for="item in ownerData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button style="float: right" type="border-orange" @click="showAddDialog">新建</el-button>
            </div>
            <div style="padding-top: 20px">
              <el-table stripe
                        border
                        :data="reportData"
                        height="850">
                <!--<el-table-column-->
                <!--show-overflow-tooltip-->
                <!--prop="id"-->
                <!--label="菜单ID">-->
                <!--</el-table-column>-->
                <el-table-column
                  width="200"
                  show-overflow-tooltip
                  prop="menu_name"
                  label="名称">
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="url"
                  label="路径">
                </el-table-column>
                <!--<el-table-column-->
                <!--show-overflow-tooltip-->
                <!--prop="parent_id"-->
                <!--label="上级菜单ID">-->
                <!--</el-table-column>-->

                <el-table-column
                  show-overflow-tooltip
                  prop="url_extend_paras"
                  label="延伸路径">
                </el-table-column>
                <!--<el-table-column-->
                <!--show-overflow-tooltip-->
                <!--prop="sort_num"-->
                <!--label="顺序">-->
                <!--</el-table-column>-->

                <!--<el-table-column-->
                <!--show-overflow-tooltip-->
                <!--prop="owner"-->
                <!--label="账号">-->
                <!--</el-table-column>-->

                <el-table-column
                  width="150"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="border-orange" @click="showEditDialog(scope.row)">修改</el-button>
                    <el-button type="border-orange" @click="remove(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 添加项目 -->
    <el-dialog
      width="30%"
      center
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="postForm" :rules="formRules" ref="postForm" label-width="150px"
               style="margin-left: -60px;margin-right: 30px">
        <el-form-item label="ID" prop="id" v-show="postForm.id">
          <el-input v-model="postForm.id" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="名称" prop="menu_name">
          <el-input v-model="postForm.menu_name">
          </el-input>
        </el-form-item>
        <el-form-item label="路径" prop="url">
          <el-input v-model="postForm.url"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单ID" prop="parent_id">
          <el-input v-model="postForm.parent_id"></el-input>
        </el-form-item>
        <el-form-item label="延伸路径" prop="url_extend_paras">
          <el-input v-model="postForm.url_extend_paras"></el-input>
        </el-form-item>
        <el-form-item label="顺序" prop="sort_num">
          <el-input v-model="postForm.sort_num"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="owner">
          <el-input v-model="postForm.owner" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="dialogVisible = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchOwner, fetchReport, remove, add, update} from '@/api/reportMenu'

  export default {
    name: 'ReportMenu',
    data () {
      return {
        ownerData: [],
        selectOwner: '',
        dialogTitle: '',
        reportData: [],
        dialogVisible: false,
        postForm: {
          id: '',
          menu_name: '',
          url: '',
          parent_id: '',
          url_extend_paras: '',
          sort_num: '',
          owner: ''
        },
        formRules: {
          menu_name: [
            {required: true, message: '姓名不能为空', trigger: 'change'}
          ],
          url: [
            {required: true, message: '路径不能为空', trigger: 'change'}
          ],
          parent_id: [
            {required: true, message: '上级菜单ID不能为空', trigger: 'change'}
          ],
          url_extend_paras: [
            {required: true, message: '延伸路径不能为空', trigger: 'change'}
          ],
          sort_num: [
            {required: true, message: '顺序不能为空', trigger: 'change'}
          ],
          owner: [
            {required: true, message: '账号不能为空', trigger: 'change'}
          ]
        }
      }
    },
    watch: {
      selectOwner (val) {
        this.loadData(val)
      }
    },
    methods: {
      getOwner () {
        fetchOwner().then((data) => {
          for (const i in data.result) {
            if (data.result[i].owner) {
              let temp = {}
              temp.value = data.result[i].owner
              temp.label = data.result[i].owner
              this.ownerData.push(temp)
            }
          }
          this.selectOwner = this.ownerData[0].value
          this.loadData(this.selectOwner)
        })
      },
      compare (property) {
        return function (a, b) {
          var value1 = a[property]
          var value2 = b[property]
          return value1 - value2
        }
      },
      refresh () {
        this.loadData(this.selectOwner)
      },
      loadData (selectOwner) {
        fetchReport(selectOwner).then((data) => {
          this.reportData = data.result
          if (this.reportData.length > 0) {
            this.reportData.sort(this.compare('sort_num'))
          }
        })
      },
      remove (id) {
        this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(id).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.loadData(this.selectOwner)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      showAddDialog () {
        this.dialogTitle = '新建列表'
        this.postForm.id = ''
        this.postForm.menu_name = ''
        this.postForm.url = ''
        this.postForm.parent_id = ''
        this.postForm.url_extend_paras = ''
        this.postForm.sort_num = ''
        this.postForm.owner = this.selectOwner
        this.dialogVisible = true
      },
      showEditDialog (row) {
        this.dialogTitle = '修改列表'
        this.postForm.id = row.id
        this.postForm.menu_name = row.menu_name
        this.postForm.url = row.url
        this.postForm.parent_id = row.parent_id
        this.postForm.url_extend_paras = row.url_extend_paras
        this.postForm.sort_num = row.sort_num
        this.postForm.owner = row.owner
        this.dialogVisible = true
      },
      confirm () {
        let obj = {}
        this.$refs.postForm.validate((valid) => {
          if (valid) {
            if (this.postForm.id) {
              obj = {
                id: this.postForm.id,
                menuName: this.postForm.menu_name,
                url: this.postForm.url,
                parentId: this.postForm.parent_id,
                urlExtendParas: this.postForm.url_extend_paras,
                sortNum: this.postForm.sort_num,
                owner: this.postForm.owner
              }
              update(obj).then((data) => {
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                })
                this.dialogVisible = false
                this.loadData(this.selectOwner)
              })
            } else {
              obj = {
                menuName: this.postForm.menu_name,
                url: this.postForm.url,
                parentId: this.postForm.parent_id,
                urlExtendParas: this.postForm.url_extend_paras,
                sortNum: this.postForm.sort_num,
                owner: this.postForm.owner
              }
              add(obj).then((data) => {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.dialogVisible = false
                this.loadData(this.selectOwner)
              })
            }
          }
        })
      }
    },
    mounted () {
      this.getOwner()
    },
    components: {}
  }
</script>

<style>
</style>
