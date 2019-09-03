<template>
  <div>
    <el-tabs type="border-card" v-model="activeTab"
             :stretch="false" @tab-click="handleTabClick"
             :before-leave="beforeLeave">
      <el-tab-pane label="数据集" name="DataSet" :disabled="!topicId">
        <data-set v-if="show_DataSet" ref="DataSet"></data-set>
      </el-tab-pane>
      <el-tab-pane label="数据集字段" name="DataSetField" :disabled="!topicId">
        <data-set-field v-if="show_DataSetField"></data-set-field>
      </el-tab-pane>
      <el-tab-pane label="关联条件" name="AssociatedConditions" :disabled="!topicId">
        <associated-conditions v-if="show_AssociatedConditions"></associated-conditions>
      </el-tab-pane>
      <el-tab-pane label="查询条件" name="QueryConditions" :disabled="!topicId">
        <query-conditions v-if="show_QueryConditions" ref="QueryConditions"></query-conditions>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import DataSet from './TableViews/DataSet'
  import DataSetField from './TableViews/DataSetField'
  import AssociatedConditions from './TableViews/AssociatedConditions'
  import QueryConditions from './TableViews/QueryConditions'
  export default {
    name: 'SemanticMain',
    props: {
      semanticId: {
        type: String
      }
    },
    data () {
      return {
        activeTab: 'DataSet',
        dataSourceMetaData: [],
        show_DataSet: true,
        show_DataSetField: false,
        show_AssociatedConditions: false,
        show_QueryConditions: false
      }
    },
    created () {
      this.initDataSourceMetaData()
    },
    methods: {
      initDataSourceMetaData () {
        setTimeout(() => {
          this.dataSourceMetaData = [{
            itemCode: 'WIS_PRODUCT_ORDER_INFO',
            itemName: 'WIS_PRODUCT_ORDER_INFO'
          }, {
            itemCode: 'WIS_PRODUCT_TASK_INFO',
            itemName: 'WIS_PRODUCT_TASK_INFO'
          }]
        }, 30)
      },
      beforeLeave (active, old) {
        if (old === 'QueryConditions') {
          if (this.$refs.QueryConditions.isDataChange) {
            this.$message({
              message: '查询条件有变化，请先保存',
              type: 'warning'
            })
            return false
          } else {
            this.show_QueryConditions = false
            return true
          }
        }
      },
      handleTabClick ({name}) {
        this.show_DataSet = false
        this.show_DataSetField = false
        this.show_AssociatedConditions = false
        this['show_' + name] = true
      }
    },
    computed: {
      topicId () {
        return this.$store.state.customReport.semanticId
      }
    },
    watch: {
      semanticId (val) {
        console.log(11111111111)
        this.show_DataSetField = false
        this.show_AssociatedConditions = false
        this.show_QueryConditions = false
        this.show_DataSet = false
        this.show_DataSet = true
        this.activeTab = 'DataSet'
        // this.$nextTick(() => {
        //   this.$refs.DataSet.loadData(val)
        // })
      }
    },
    components: {
      QueryConditions,
      DataSet,
      DataSetField,
      AssociatedConditions
    }
  }
</script>

<style scoped>

</style>
