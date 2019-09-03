<template>
  <div>

    <div style="margin-top: 10px; ">
      <el-row :gutter="24" >
        <el-col :span="10">
          <owner-view  @owner-change="handleOwnerChange"></owner-view>
        </el-col>
        <el-col :span="14"  >
          <div style="margin-left: 40px">

            <titlebar style="margin-top: 20px">
              <template slot="left">
                <div style="font-size: larger; margin: 10px 0px">实施人员列表</div>
              </template>
              <template slot="right">
                      <el-button type="bg-orange" @click="showAddDialog" >添加实施人员</el-button>
              </template>
            </titlebar>
              <el-table style="margin-top: 20px"
                        ref="userTable"
                        stripe
                        border
                        :data="userData"
                        height="850">

                <el-table-column
                  show-overflow-tooltip
                  prop="id"
                  label="人员ID">
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="account"
                  label="账号">
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="member_code"
                  label="会员中心编码">
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="test_user"
                  label="类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.test_user | testUser}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  width="220"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.del_flag==='1'" type="border-orange" @click="set(scope.row.id)">恢复</el-button>
                    <el-button v-if="scope.row.del_flag!=='1'" type="border-orange" @click="cancel(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

        </el-col>
      </el-row>
    </div>

    <el-dialog
      width="30%"
      center
      :visible.sync="addDialogVisible"
      title="添加实施人员"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="postForm" ref="postForm" label-width="150px">
        <el-form-item label="iSesol账号" prop="mobile">
          <el-input v-model="postForm.mobile" >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="bg-black" @click="addDialogVisible = false">取 消</el-button>
        <el-button type="bg-orange" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchList, cancel, set} from '@/api/ownerUser'
  import Titlebar from '../../components/titlebar/Index.vue'
  import OwnerView from '../common/OwnerView'
  import { addUser } from '@/api/openCompany'
  export default {
    name: 'OwnerMenu',
    data () {
      return {
        owner: null,
        userData: [],
        addDialogVisible: false,
        editDialogVisible: false,
        queryForm: {},
        postForm: {
          id: null,
          code: '',
          title: '',
          parent_id: '',
          path: '',
          type: '',
          icon: '',
          order_num: '',
          description: '',
          appOpenMenuList: [],
          appMenuCode: null,
          appMenuList: []
        },
        putForm: {
          id: null,
          code: '',
          title: '',
          parent_id: '',
          path: '',
          type: '',
          icon: '',
          order_num: '',
          description: '',
          appOpenMenuList: [],
          appMenuCode: null,
          appMenuList: []
        },
        formRules: {
          title: [
            {required: true, message: '名称不能为空', trigger: 'change'}
          ]
        }
      }
    },
    filters: {
      testUser (value) {
        if (value === '0') {
          return '普通人员'
        } else if (value === '1') {
          return '实施人员'
        } else {
          return ''
        }
      }
    },
    methods: {
      handleOwnerChange (val) {
        this.owner = val
      },
      set (id) {
        set(id, this.owner).then(() => {
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
          fetchList(this.owner).then((data) => {
            this.userData = data.result
          })
        })
      },
      cancel (id) {
        cancel(id, this.owner).then(() => {
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
          fetchList(this.owner).then((data) => {
            this.userData = data.result
          })
        })
      },
      showAddDialog () {
        if (this.$refs.postForm) {
          this.$refs.postForm.resetFields()
        }
        this.addDialogVisible = true
      },
      confirmAdd () {
        addUser({owner: this.owner, mobile: this.postForm.mobile}).then(() => {
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
          this.addDialogVisible = false
          fetchList(this.owner).then((data) => {
            this.userData = data.result
          })
        })
      }
    },
    watch: {
      owner (value) {
        console.log(value)
        if (value) {
          fetchList(value).then((data) => {
            this.userData = data.result
          })
        }
      }
    },
    components: {
      Titlebar,
      OwnerView
    }
  }
</script>

<style>
</style>
