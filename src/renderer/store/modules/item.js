const state = {
  name: '',
  bednum: '',
  patientId: '',

  inFile: '',
  outFile: '',
  reasons: ''
}

const mutations = {
  updateCase (state, values) {
    state.name = values.name
    state.bednum = values.bednum
    state.patientId = values.patientId
    state.reasons = values.reasons
  }
}

export default {
  state,
  mutations
}
