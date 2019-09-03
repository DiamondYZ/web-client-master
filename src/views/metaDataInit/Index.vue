<template>
  <layout-resizable>
    <template slot="top" >
      <action-view :meta-data="metaData" @data-change="handleDataChange"  :selection="selection"></action-view>
      <table-view ref="table" @selected="handleSelected" @row-select="handleRowSelect" @load="handleLoad"></table-view>
    </template>
    <template slot="bottom">
      <detail-view @data-change="updateRecord" :meta-data="metaData"></detail-view>
    </template>
  </layout-resizable>
</template>

<script>
  import LayoutResizable from '@/components/layoutResizable/Index'
  import TableView from './TableView'
  import ActionView from './ActionView'
  import DetailView from './DetailView'
  import OwnerView from './OwnerView'
  export default {
    name: 'MetaData',
    data () {
      return {
        selection: [],
        metaData: {}
      }
    },
    methods: {
      handleRowSelect (val) {
        this.selection = val
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
