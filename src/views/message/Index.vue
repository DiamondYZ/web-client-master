<template>

  <el-form :model="postForm" :rules="formRules" ref="postForm" label-width="150px" style="margin-top: 20px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="postForm.title" >
      </el-input>
    </el-form-item>
    <el-form-item label="内容" prop="contents">
      <el-input  v-model="postForm.contents" type="textarea"
                :autosize="{ minRows: 6, maxRows: 6}"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="border-orange"  @click="send" :disabled="btnDisabled">发送</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { send } from '@/api/message'
  export default {
    data () {
      return {
        btnDisabled: false,
        postForm: {title: '', contents: ''},
        formRules: []
      }
    },
    methods: {
      send () {
        this.btnDisabled = true
        send(this.postForm).then(() => {
          this.$message({
            type: 'success',
            message: '发送成功!'
          })
          this.postForm = {title: '', contents: ''}
          this.btnDisabled = false
        })
      }
    }
}
</script>
