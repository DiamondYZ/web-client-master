<template>
  <div>

    <el-button type="border-orange" style="margin-top: 10px" @click="save" :disabled="menuSelection.length === 0 || ownerSelection.length === 0">保存</el-button>
    <div style="margin-top: 10px; ">
      <el-row :gutter="24" >
        <el-col :span="8">

          <div style="font-size: larger; margin: 10px 0px">租户列表</div>
          <titlebar>
            <template slot="right">
              <el-form ref="queryForm" :model="queryForm" clearable :inline="true">
                <el-form-item label="租户名">
                  <el-input v-model="queryForm.companyName" clearable ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="bg-orange" @click="loadData()" icon="el-icon-search"></el-button>
                </el-form-item>
              </el-form>
            </template>
          </titlebar>
          <el-table ref="ownerTable"
                    stripe
                    border
                    :data="ownerData"
                    height="850"
                    @selection-change="handleOwnerSelectionChange">

            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="owner"
              label="租户ID">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="companyName"
              label="租户名">
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="origin"
              label="所属系统">
              <template slot-scope="scope">
                <span>{{scope.row.origin | systemFilter}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column-->
              <!--width="160"-->
              <!--fixed="right"-->
              <!--label="操作">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button type="border-orange" @click="clear(scope.row)">清除</el-button>-->
                <!--<el-button type="border-orange" @click="recover(scope.row)">恢复</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->

          </el-table>
        </el-col>
        <el-col :span="16"  >

          <div style="margin-left: 40px">
            <div style="font-size: larger; margin: 10px 0px">菜单列表
              <el-button style="float: right" type="border-orange" @click="showAddDialog">新建</el-button></div>
            <el-table style="margin-top: 20px"
                      ref="menuTable"
                      stripe
                      border
                      :data="menuData"
                      height="850"
                      @selection-change="handleMenuSelectionChange">

              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="id"
                label="菜单ID">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="code"
                label="菜单编号">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="title"
                label="菜单名">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="title_en"
                label="菜单名（英文）">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="type"
                label="菜单类型">
                <template slot-scope="scope">
                  <span>{{scope.row.type | menuType}}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="parent_id"
                label="上级菜单ID">
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                prop="path"
                label="路径">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="icon"
                label="图标">
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                prop="order_num"
                label="序号">
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                prop="description"
                label="描述">
              </el-table-column>

              <el-table-column
                width="220"
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="border-orange" @click="showEditDialog(scope.row)">修改</el-button>
                  <el-button type="border-orange" @click="remove(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 添加项目 -->
    <el-dialog
      width="30%"
      center
      :visible.sync="addDialogVisible"
      title="添加菜单"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="postForm" :rules="formRules" ref="postForm" label-width="150px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="postForm.id" >
          </el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="postForm.code" >
          </el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>

        <el-form-item label="标题（英文）" prop="title_en">
          <el-input v-model="postForm.title_en"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type" >
          <el-select v-model="postForm.type" clearable>
            <el-option label="WIS" value="wis"></el-option>
            <el-option label="小程序" value="miniprog"></el-option>
            <el-option label="EOSS" value="eoss"></el-option>
            <el-option label="WEMS" value="wems"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="父菜单ID" prop="parent_id">
          <el-input v-model="postForm.parent_id"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="postForm.path"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="postForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="order_num">
          <el-input v-model="postForm.order_num"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="postForm.description"></el-input>
        </el-form-item>


        <el-form-item label="所属APP" prop="appMenuList">
          <el-form-item>
            <el-button type="bg-orange" @click="addMenu(postForm.appMenuList)">新增</el-button>
          </el-form-item>
          <template v-for="(item,index) in postForm.appMenuList">
            <div style="display: block">
              <el-select v-model="item.value" clearable style="margin-bottom: 4px;">
                <el-option label="基础" value="BASIC"></el-option>
                <el-option label="仓储" value="WAREHOUSE"></el-option>
                <el-option label="标准" value="STANDARD"></el-option>
                <el-option label="价值分享" value="VALUESHARE"></el-option>
                <el-option label="质检" value="INSPECTION"></el-option>
                <el-option label="设备云眼" value="EQUIPMENT_CLOUD"></el-option>
                <el-option label="计划排程" value="PLANNING_SCHEDULING"></el-option>
                <el-option label="E车间" value="E_WORKSHOP"></el-option>
                <el-option label="生产管控" value="VA"></el-option>
                <el-option label="计划管理" value="PLANNING"></el-option>
                <el-option label="设备管理" value="EQUIPMENT"></el-option>
                <el-option label="EOSS" value="EOSS"></el-option>
                <el-option label="WEMS" value="WEMS"></el-option>
                <el-option label="DNC" value="DNC"></el-option>
                <el-option label="自定义报表" value="CUSTOM_REPORT"></el-option>
              </el-select>
              <el-button type="bg-orange" @click="removeMenu(postForm.appMenuList, index)">移除</el-button>
            </div>
          </template>
        </el-form-item>

        <el-form-item label="依赖APP" prop="appMenuList">
          <el-form-item>
            <el-button type="bg-orange" @click="addOpenMenu(postForm.appOpenMenuList)">新增</el-button>
          </el-form-item>
          <template v-for="(item,index) in postForm.appOpenMenuList">
            <el-select v-model="item.value" clearable style="margin-bottom: 4px">
              <el-option label="基础" value="BASIC"></el-option>
              <el-option label="仓储" value="WAREHOUSE"></el-option>
              <el-option label="标准" value="STANDARD"></el-option>
              <el-option label="价值分享" value="VALUESHARE"></el-option>
              <el-option label="质检" value="INSPECTION"></el-option>
              <el-option label="设备云眼" value="EQUIPMENT_CLOUD"></el-option>
              <el-option label="计划排程" value="PLANNING_SCHEDULING"></el-option>
              <el-option label="E车间" value="E_WORKSHOP"></el-option>
              <el-option label="生产管控" value="VA"></el-option>
              <el-option label="计划管理" value="PLANNING"></el-option>
              <el-option label="设备管理" value="EQUIPMENT"></el-option>
              <el-option label="EOSS" value="EOSS"></el-option>
              <el-option label="WEMS" value="WEMS"></el-option>
              <el-option label="DNC" value="DNC"></el-option>
              <el-option label="自定义报表" value="CUSTOM_REPORT"></el-option>
            </el-select>
            <el-button type="bg-orange" @click="removeOpenMenu(postForm.appOpenMenuList, index)">移除</el-button>
          </template>
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
      title="修改菜单"
      center
      :visible.sync="editDialogVisible"
      :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false"
      append-to-body>
      <el-form :model="putForm" :rules="formRules" ref="putForm" label-width="100px">
        <el-form-item label="编码" prop="code">
          <el-input v-model="putForm.code">
          </el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="putForm.title"></el-input>
        </el-form-item>
        <el-form-item label="标题（英文）" prop="title_en">
          <el-input v-model="putForm.title_en"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" >
          <el-select v-model="putForm.type" clearable>
            <el-option label="WIS" value="wis"></el-option>
            <el-option label="小程序" value="miniprog"></el-option>
            <el-option label="EOSS" value="eoss"></el-option>
            <el-option label="WEMS" value="wems"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父菜单ID" prop="parent_id">
          <el-input v-model="putForm.parent_id"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="putForm.path"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="putForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="order_num">
          <el-input v-model="putForm.order_num"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="putForm.description"></el-input>
        </el-form-item>

        <el-form-item label="所属APP" prop="appMenuList">
          <el-form-item>
            <el-button type="bg-orange" @click="addMenu(putForm.appMenuList)">新增</el-button>
          </el-form-item>
          <template v-for="(item,index) in putForm.appMenuList">
            <div style="display: block">
              <el-select v-model="item.value" clearable style="margin-bottom: 4px;">
                <el-option label="基础" value="BASIC"></el-option>
                <el-option label="仓储" value="WAREHOUSE"></el-option>
                <el-option label="标准" value="STANDARD"></el-option>
                <el-option label="价值分享" value="VALUESHARE"></el-option>
                <el-option label="质检" value="INSPECTION"></el-option>
                <el-option label="设备云眼" value="EQUIPMENT_CLOUD"></el-option>
                <el-option label="计划排程" value="PLANNING_SCHEDULING"></el-option>
                <el-option label="E车间" value="E_WORKSHOP"></el-option>
                <el-option label="生产管控" value="VA"></el-option>
                <el-option label="计划管理" value="PLANNING"></el-option>
                <el-option label="设备管理" value="EQUIPMENT"></el-option>
                <el-option label="EOSS" value="EOSS"></el-option>
                <el-option label="WEMS" value="WEMS"></el-option>
                <el-option label="DNC" value="DNC"></el-option>
                <el-option label="自定义报表" value="CUSTOM_REPORT"></el-option>
              </el-select>
              <el-button type="bg-orange" @click="removeMenu(putForm.appMenuList, index)">移除</el-button>
            </div>
          </template>
        </el-form-item>

        <el-form-item label="依赖APP" prop="appOpenMenuList">
          <el-form-item>
            <el-button type="bg-orange" @click="addOpenMenu(putForm.appOpenMenuList)">新增</el-button>
          </el-form-item>
          <template v-for="(item,index) in putForm.appOpenMenuList">
            <div style="display: block">
              <el-select v-model="item.value" clearable style="margin-bottom: 4px;">
                <el-option label="基础" value="BASIC"></el-option>
                <el-option label="仓储" value="WAREHOUSE"></el-option>
                <el-option label="标准" value="STANDARD"></el-option>
                <el-option label="价值分享" value="VALUESHARE"></el-option>
                <el-option label="质检" value="INSPECTION"></el-option>
                <el-option label="设备云眼" value="EQUIPMENT_CLOUD"></el-option>
                <el-option label="计划排程" value="PLANNING_SCHEDULING"></el-option>
                <el-option label="E车间" value="E_WORKSHOP"></el-option>
                <el-option label="生产管控" value="VA"></el-option>
                <el-option label="计划管理" value="PLANNING"></el-option>
                <el-option label="设备管理" value="EQUIPMENT"></el-option>
                <el-option label="EOSS" value="EOSS"></el-option>
                <el-option label="WEMS" value="WEMS"></el-option>
                <el-option label="DNC" value="DNC"></el-option>
                <el-option label="自定义报表" value="CUSTOM_REPORT"></el-option>
              </el-select>
              <el-button type="bg-orange" @click="removeOpenMenu(putForm.appOpenMenuList, index)">移除</el-button>
            </div>
          </template>
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
  import {fetchList, fetchOwner, remove, add, update, saveOwnerMenu, getAppMenu, clearOwnerData, recoverOwnerData} from '@/api/ownerMenu'
  import Titlebar from '../../components/titlebar/Index.vue'
  export default {
    name: 'OwnerMenu',
    data () {
      return {
        menuSelection: [],
        ownerSelection: [],
        ownerData: [],
        menuData: [],
        addDialogVisible: false,
        editDialogVisible: false,
        queryForm: {},
        postForm: {
          id: null,
          code: '',
          title: '',
          title_en: '',
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
          title_en: '',
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
          ],
          title_en: [
            {required: true, message: '名称（英文）不能为空', trigger: 'change'}
          ]
        }
      }
    },
    filters: {
      menuType (value) {
        if (value === 'miniprog') {
          return '小程序'
        } else if (value === 'wis') {
          return 'WIS'
        } else if (value === 'eoss') {
          return 'EOSS'
        } else if (value === 'wems') {
          return 'WEMS'
        } else {
          return ''
        }
      }
    },
    methods: {
      clear (row) {
        this.$confirm('此操作将清除该租户所有业务数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          clearOwnerData(row.owner).then(() => {
            this.$message({
              type: 'success',
              message: '清除成功!'
            })
          })
        })
      },
      recover (row) {
        this.$confirm('此操作将恢复该租户被清除的所有业务数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          recoverOwnerData(row.owner).then(() => {
            this.$message({
              type: 'success',
              message: '恢复成功!'
            })
          })
        })
      },
      removeOpenMenu (source, index) {
        source.splice(index, 1)
      },
      addOpenMenu (source) {
        source.push({})
      },
      addMenu (source) {
        source.push({})
      },
      removeMenu (source, index) {
        source.splice(index, 1)
      },
      save () {
        let owners = []
        let menuIds = []
        this.menuSelection.forEach((item) => {
          menuIds.push(item.id)
        })
        this.ownerSelection.forEach((item) => {
          owners.push(item.owner)
        })
        saveOwnerMenu({owners: owners, menuIds: menuIds}).then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        })
      },
      handleOwnerSelectionChange (selection) {
        this.ownerSelection = selection
      },
      handleMenuSelectionChange (selection) {
        this.menuSelection = selection
      },
      loadData () {
        fetchList().then((data) => {
          this.menuData = data.result
        })
        fetchOwner(this.queryForm.companyName).then((data) => {
          this.ownerData = data.result
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
            this.loadData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      showAddDialog () {
        if (this.$refs.postForm) {
          this.$refs.postForm.resetFields()
        }
        this.addDialogVisible = true
      },
      showEditDialog (row) {
        this.putForm.id = row.id
        this.putForm.code = row.code
        this.putForm.title = row.title
        this.putForm.title_en = row.title_en
        this.putForm.parent_id = row.parent_id
        this.putForm.path = row.path
        this.putForm.type = row.type
        this.putForm.icon = row.icon
        this.putForm.order_num = row.order_num
        this.putForm.description = row.description
        getAppMenu(this.putForm.id).then((data) => {
          this.putForm.appMenuList = []
          this.putForm.appOpenMenuList = []
          data.result.appMenu.forEach((item) => {
            this.putForm.appMenuList.push({value: item.app_code})
          })
          data.result.appOpenMenu.forEach((item) => {
            this.putForm.appOpenMenuList.push({value: item.app_code})
          })
        })
        this.editDialogVisible = true
      },
      confirmAdd () {
        this.$refs.postForm.validate((valid) => {
          if (valid) {
            let codes = []
            this.postForm.appOpenMenuList.forEach((item) => {
              if (item.value) {
                codes.push(item.value)
              }
            })
            let menuCodes = []
            this.postForm.appMenuList.forEach((item) => {
              if (item.value) {
                menuCodes.push(item.value)
              }
            })
            add(
              {
                menu: this.postForm,
                appMenuCodes: menuCodes,
                appOpenMenuCodes: codes
              }).then(() => {
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
            let codes = []
            this.putForm.appOpenMenuList.forEach((item) => {
              if (item.value) {
                codes.push(item.value)
              }
            })
            let menuCodes = []
            this.putForm.appMenuList.forEach((item) => {
              if (item.value) {
                menuCodes.push(item.value)
              }
            })
            update(
              {
                menu: this.putForm,
                appMenuCodes: menuCodes,
                appOpenMenuCodes: codes
              }).then(() => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              })
              this.editDialogVisible = false
              this.loadData()
            })
          }
        })
      }
    },
    mounted () {
      this.loadData()
    },
    components: {
      Titlebar
    }
  }
</script>

<style>
</style>
