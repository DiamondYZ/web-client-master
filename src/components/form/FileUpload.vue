<template>
  <el-upload
    ref="upload"
    :data="uploadData"
    name="file"
    :accept="accept"
    :before-upload="handleBeforeUpload"
    :action="url"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-change="onChange"
    :on-progress="handleProgress">
     <el-button slot="trigger" size="small" type="text">{{label}}</el-button>
  </el-upload>
</template>

<script>
  import {fetchUploadToken} from '@/api/fileUpload'
  export default {
    name: 'FileUpload',
    data () {
      return {
        uploadData: {
          token: ''
        },
        url: 'http://upload.qiniu.com/'
      }
    },
    props: {
      accept: {
        type: String,
        default: '*'
      },
      onSuccess: Function,
      onError: Function,
      onProgress: Function,
      onRemove: Function,
      label: {
        type: String,
        default: '选择文件'
      },
      onChange: Function,
      beforeUpload: Function,
      sizeLimit: {
        type: Number,
        default: 1024 * 1024 * 50
      }
    },
    methods: {
      handleSuccess (res, rawFile) {
        this.onSuccess(res, rawFile)
      },
      handleError (err, rawFile) {
        this.onError(err, rawFile)
      },
      handleProgress (err, rawFile) {
        this.onProgress(err, rawFile)
      },
      handleBeforeUpload (file) {
        if (typeof this.beforeUpload === 'function') {
          this.beforeUpload()
        }
        return fetchUploadToken(file.name).then((data) => {
          this.uploadData.token = data.result
        })
      },
      handleRemove (file, fileList) {
        this.onRemove(file, fileList)
      },
      clearFiles () {
        this.$refs.upload.clearFiles()
      }
    }
  }
</script>

<style>
</style>