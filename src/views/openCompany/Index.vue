<template>
<layout-resizable>
  <template slot="top">

    <div style="font-size: larger; margin: 10px 0px">开通租户</div>
    <el-form :model="companyForm"  ref="companyForm" label-width="150px" style="margin-top: 20px">
      <el-form-item label="Node ID" prop="nodeId">
        <el-input v-model="companyForm.nodeId" >
        </el-input>
      </el-form-item>
      <el-form-item label="App Code" prop="appCode">
        <el-select v-model="companyForm.appCode">
          <el-option label="仓储" value="WAREHOUSE"></el-option>
          <el-option label="标准" value="STANDARD"></el-option>
          <el-option label="价值分享" value="VALUESHARE"></el-option>
          <el-option label="质检" value="INSPECTION"></el-option>
          <el-option label="设备云眼" value="EQUIPMENT_CLOUD"></el-option>
          <el-option label="计划排程" value="PLANNING_SCHEDULING"></el-option>
          <el-option label="设备管理" value="EQUIPMENT"></el-option>
          <el-option label="E车间" value="E_WORKSHOP"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
      <el-button type="border-orange"  @click="send" :disabled="btnCompanyDisabled">开通</el-button>
      </el-form-item>
    </el-form>
  </template>
  <template slot="bottom">
    <div style="font-size: larger; margin: 10px 0px">添加实施人员账号</div>
    <el-form :model="userForm"  ref="userForm" label-width="150px" style="margin-top: 20px">
      <el-form-item label="Owner" prop="owner">
        <el-input v-model="userForm.owner" >
        </el-input>
      </el-form-item>
      <el-form-item label="Mobile" prop="mobile">
        <el-input v-model="userForm.mobile" >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="border-orange"  @click="addUser" :disabled="btnUserDisabled">添加</el-button>
      </el-form-item>
    </el-form>
  </template>
</layout-resizable>
</template>

<script>
  import { open, addUser } from '@/api/openCompany'
  import LayoutResizable from '../../components/layoutResizable/Index.vue'
  export default {
    components: {LayoutResizable},
    data () {
      return {
        btnCompanyDisabled: false,
        companyForm: {
          nodeId: '',
          appCode: ''
        },
        btnUserDisabled: false,
        userForm: {
          owner: '',
          mobile: ''
        },
        formRules: []
      }
    },
    methods: {
      send () {
        this.btnCompanyDisabled = true
        open(this.companyForm).then(() => {
          this.$message({
            type: 'success',
            message: '开通成功!'
          })
          this.companyForm = {
            nodeId: '',
            appCode: ''}
          this.btnCompanyDisabled = false
        })
      },
      addUser () {
        addUser(this.userForm).then(() => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.userForm = {
            nodeId: '',
            mobile: '',
            memberCode: ''}
          this.btnUserDisabled = false
        })
      }
    }
}
</script>
