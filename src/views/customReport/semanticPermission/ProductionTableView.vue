<template>
  <div class="production-table-view">
    <div>
      <el-form>
        <el-form-item class="topInput">
          <el-input v-model="codeDict" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      @check="handelSelected"
      :render-content="renderContent">
    </el-tree>
    <!--<el-table-->
      <!--ref="table"-->
      <!--:data="data"-->
      <!--style="width: 100%;margin-bottom: 20px;"-->
      <!--row-key="id"-->
      <!--border-->
      <!--stripe-->
      <!--default-expand-all-->
      <!--:tree-props="{children: 'childrens', hasChildren: 'hasChildren'}"-->
      <!--@selection-change="handleSelectionChange"-->
      <!--@select-all="selectAll">-->
      <!--<el-table-column-->
        <!--type="selection"-->
        <!--width="55">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="topicCode"-->
        <!--label="主题编号">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="topicName"-->
        <!--label="主题名称">-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handlePageChange"-->
        <!--:current-page="currentPage"-->
        <!--:page-sizes="[10, 20, 30, 40]"-->
        <!--:page-size="pageSize"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="total">-->
    <!--</el-pagination>-->
  </div>
</template>

<script>
  import {productionList} from '@/api/semanticPermission'
  // import {mixinIgnoreEmptyVal} from '@/utils'
  import QueryForm from '@/components/form/QueryForm'
  export default {
    name: 'ProductionTableView',
    data () {
      return {
        data: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        queryForm: {
          generalParam: ''
        },
        param: {},
        hiddenParam: {},
        codeDict: '',
        defaultProps: {
          children: 'childrens',
          label: 'topicName'
        }
      }
    },
    props: {
      code: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    created () {
      this.codeDict = this.code.name
      this.loadData()
    },
    watch: {
      code (val) {
        if (val) {
          this.codeDict = val.name
          this.loadData()
        }
      }
    },
    computed: {
    },
    methods: {
      renderContent (h, { node, data, store }) {
        // console.info('h', h)
        // console.info('node', node)
        // console.info('data', data)
        // console.info('store', store)
        if (node.level > 1) {
          if (node.data.children) {
            return (<div style=""><i class="repair-i-svg-color i-svg-color-parent"><svg-icon icon-class="wis_weixiugenzongin1"></svg-icon></i><span>{node.data.topicName}</span></div>)
          } else {
            return (<div><i class="repair-i-svg-color i-svg-color-child"><svg-icon icon-class="wis_weixiugenzongin2"></svg-icon></i><span>{node.data.topicName}</span></div>)
          }
        } else {
          return (<div style=""><i class="repair-i-svg-color i-svg-color-parent"><svg-icon icon-class="wis_weixiugenzongin1"></svg-icon></i><span>{node.data.topicName}</span></div>)
        }
      },
      handelSelected (data, node) {
        console.info('data', data)
        console.info('node', node)
        this.$emit('selected', node.checkedNodes)
      },
      // handleSelectionChange (val) {
      //   console.info('选中的', val)
      //   this.$emit('selected', val)
      // },
      // selectAll (val) {
      //   // this.$refs.table.toggleAllSelection()
      //   for (var i in this.data) {
      //     console.info('数据', this.data)
      //     // console.info('进入函数1', i)
      //     // console.info('进入函数2', this.data[i])
      //     // console.info('进入函数3', this.data[i].children)
      //     if (this.data[i].children) {
      //       console.info('nihao', this.data[i].children)
      //       this.toggleSelection(this.data[i].children, val.some((item) => item.id === this.data[i].id))
      //     } else {}
      //   }
      //   console.info('全选', val)
      //   console.info('全选的长度', val.length)
      // },
      // toggleSelection (rows, flag) {
      //   if (rows) {
      //     rows.forEach(row => {
      //       console.log('1')
      //       this.$refs.table.toggleRowSelection(row, !!flag)
      //     })
      //   } else {
      //     console.log('2')
      //     this.$refs.table.clearSelection()
      //   }
      // },
      // handleSizeChange (val) {
      //   this.pageSize = val
      //   this.loadData()
      // },
      // handlePageChange (val) {
      //   this.currentPage = val
      //   this.loadData()
      // },
      loadData () {
        this.$emit('load')
        // let p = {
        //   pageNum: this.currentPage,
        //   pageSize: this.pageSize
        // }
        productionList(this.code.code).then((data) => {
          this.data = data.result
          // this.total = data.result.total
          // this.currentPage = data.result.pageNum || 1
          // this.pageSize = data.result.pageSize
          this.$emit('loaded')
        })
      }
      // query (param = {}) {
      //   this.param = param
      //   mixinIgnoreEmptyVal(this.param, this.queryForm)
      //   mixinIgnoreEmptyVal(this.param, this.hiddenParam)
      //   this.currentPage = 1
      //   this.loadData()
      // },
      // resetQuery (param = {}) {
      //   this.$refs.queryForm.resetFields()
      //   this.queryForm = {}
      //   this.param = param
      //   this.query(this.param)
      // },
      // setHiddenParam (p) {
      //   this.hiddenParam = p
      // },
      // clearSelection () {
      //   this.$refs.table.clearSelection()
      // }
    },
    components: {
      QueryForm
    }
  }
</script>

<style scoped>
  .topInput .el-input.is-disabled /deep/ .el-input__inner {
    text-align: center;
  }
  .topInput /deep/ .el-input{
    max-width: 100%;
  }
</style>
