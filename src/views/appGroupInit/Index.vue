<template>

  <div>

    <el-row :gutter="24">
      <el-col :span="8">
        <preview-view ref='preview' @row-change="handleRowChange"></preview-view>
      </el-col>
      <el-col :span="16">
        <detail-view :appId="app.id"  v-show="detailDisplay"></detail-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import DetailView from './DetailView'
  import PreviewView from './PreviewView'
  import QueryForm from '@/components/form/QueryForm'

  export default {
    name: 'AppGroupInit',
    data () {
      return {
        detailDisplay: false,
        app: {}
      }
    },
    methods: {
      handleRowChange (val) {
        this.app = val
        this.detailDisplay = true
      }
    },
    components: {
      DetailView,
      PreviewView,
      QueryForm
    }
  }
</script>
