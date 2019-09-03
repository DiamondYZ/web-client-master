<template>
  <div class="meta-data-main-data-view">
    <titlebar>
      <template slot="right">
        <el-button type="border-orange" v-show="!editable" @click="showEditView">编辑</el-button>
        <div v-show="editable">
          <el-button type="text-orange" @click="editable = false">取消</el-button>
          <el-button type="text-orange" @click="initPutForm">恢复</el-button>
          <el-button type="bg-black" @click="update">保存</el-button>
        </div>
      </template>
    </titlebar>
    <el-form label-width="150px" label-position="left" v-show="!editable">
        <el-form-item label="编码">
          {{metaData.classCode || emptyPlaceholder}}
        </el-form-item>
        <el-form-item label="名称">
          {{metaData.className || emptyPlaceholder}}
        </el-form-item>
        <el-form-item label="描述">
          {{metaData.description || emptyPlaceholder}}
        </el-form-item>
        <el-form-item label="语言">
          {{metaData.lang || emptyPlaceholder}}
        </el-form-item>
        <el-form-item label="创建日期">
          {{metaData.crtTime || emptyPlaceholder}}
        </el-form-item>
        <el-form-item label="更新日期">
          {{metaData.updTime || emptyPlaceholder}}
        </el-form-item>
    </el-form>
    <el-form label-width="150px" ref="putForm" :model="putForm" label-position="left" v-show="editable">
      <el-form-item label="编码" prop="classCode">
        <el-input v-model="putForm.classCode" placeholder="编码"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="className">
          <el-input v-model="putForm.className" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="putForm.description" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item label="语言" prop="lang">
          <el-input v-model="putForm.lang" placeholder="语言"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          {{metaData.crtTime || emptyPlaceholder}}
        </el-form-item>
        <el-form-item label="更新日期">
          {{metaData.updTime || emptyPlaceholder}}
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Titlebar from '@/components/titlebar/Index'
  import {update} from '@/api/metaData'
  export default {
    name: 'MetaDataMainDataView',
    data () {
      return {
        editable: false,
        emptyPlaceholder: '-',
        putForm: {
          id: null,
          classCode: '',
          className: '',
          description: '',
          lang: ''
        },
        crtTime: '',
        updTime: ''
      }
    },
    props: {
      metaData: {
        type: Object,
        default: {}
      }
    },
    watch: {
      metaData (newVal) {
        if (newVal.id) {
          this.initPutForm()
        }
      }
    },
    methods: {
      initPutForm () {
        this.putForm = {
          id: this.metaData.id,
          classCode: this.metaData.classCode,
          className: this.metaData.className,
          description: this.metaData.description,
          lang: this.metaData.lang
        }
        this.crtTime = this.metaData.crtTime
        this.updTime = this.metaData.updTime
      },
      update () {
        this.$refs.putForm.validate((valid) => {
          if (valid) {
            update(this.putForm).then((data) => {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.$emit('data-change', Object.assign({}, this.putForm))
            })
          }
        })
      },
      showEditView () {
        this.initPutForm()
        this.editable = true
      }
    },
    components: {
      Titlebar
    }
  }
</script>

<style>
</style>