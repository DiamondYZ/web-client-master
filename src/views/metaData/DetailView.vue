<template>
<div class="meta-data-detail-view full-height" v-show="metaData.id">
<el-row class="full-height">
  <el-col :span="6" class="full-height">
    <scroll-panel>
      <main-data :meta-data="metaData" @data-change="handleChange"></main-data>
    </scroll-panel>
  </el-col>
  <el-col :span="18" class="full-height">
    <scroll-panel>
      <items-table-view :meta-data="metaData" :owner="owner"></items-table-view>
    </scroll-panel>
  </el-col>
</el-row>
</div>
</template>

<script>
  import ScrollPanel from '@/components/scrollPanel/Index'
  import MainData from './MainDataView'
  import ItemsTableView from './ItemsTableView'
  export default {
    name: 'MetaDataDetailView',
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
    methods: {
      handleChange (val) {
        this.$emit('data-change', val)
      }
    },
    components: {
      ScrollPanel,
      MainData,
      ItemsTableView
    }
  }
</script>

<style>
</style>
