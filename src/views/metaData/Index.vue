<template>
  <layout-resizable>
    <template slot="top" >
      <el-row :gutter="24">
        <el-col :span="10">
          <owner-view  @owner-change="handleOwnerChange"></owner-view>
        </el-col>
        <el-col :span="14">
          <action-view :meta-data="metaData" @data-change="handleDataChange" :owner="owner" :selection="selection"></action-view>
          <table-view ref="table" @selected="handleSelected" @row-select="handleRowSelect" :owner="owner" @load="handleLoad"></table-view>
        </el-col>
      </el-row>
    </template>
    <template slot="bottom">
      <detail-view @data-change="updateRecord" :meta-data="metaData" v-show="owner" :owner="owner"></detail-view>
    </template>
  </layout-resizable>
</template>

<script>
  import LayoutResizable from '@/components/layoutResizable/Index'
  import TableView from './TableView'
  import ActionView from './ActionView'
  import DetailView from './DetailView'
  import OwnerView from '../common/OwnerView'
  export default {
    name: 'MetaData',
    data () {
      return {
        selection: [],
        owner: null,
        metaData: {}
      }
    },
    methods: {
      handleRowSelect (val) {
        this.selection = val
      },
      handleOwnerChange (val) {
        this.owner = val
      },
      handleDataChange () {
        this.$refs.table.loadData()
      },
      handleSelected (val) {
        this.metaData = val
      },
      handleLoad () {
        this.metaData = {}
      },
      updateRecord (val) {
        this.$refs.table.refreshRecord(val)
      }
    },
    components: {
      TableView,
      ActionView,
      LayoutResizable,
      DetailView,
      OwnerView
    }
  }
</script>

<style>
</style>
