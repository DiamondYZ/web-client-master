const customReport = {
  state: {
    reportConfigId: '',
    reportPreviewId: '',
    isSemanticDataChange: false, // 语义层管理--查询条件tab数据是否发生变化
    semanticId: ''
  },
  mutations: {
    changeSemanticDataStatus (state, status) {
      state.isSemanticDataChange = status
    },
    setSemanticId (state, id) {
      state.semanticId = id
    },
    setReportPreviewId (state, id) {
      state.reportPreviewId = id
    },
    setReportConfigId (state, id) {
      state.reportConfigId = id
    }
  }
}

export default customReport
