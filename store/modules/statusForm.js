const state = {
  clearForm: false,
  messageErrorBadRequest: false,
  messageError: ''
}

const mutations = {
  CLEAR_FORM: (state, boolean) => {
    state.clearForm = boolean
  },
  SET_MESSAGE_ERROR: (state, message) => {
    state.messageError = message
  },
  SET_STATUS_ERROR: (state, boolean) => {
    state.messageErrorBadRequest = boolean
  }
}

const actions = {
  clearForm ({ commit }) {
    commit('CLEAR_FORM', true)
  },
  resetClear ({ commit }) {
    commit('CLEAR_FORM', false)
  },
  setMessageErrorBadRequest ({ commit }, error) {
    if (error) {
      commit('SET_MESSAGE_ERROR', error)
    } else {
      commit('SET_MESSAGE_ERROR', 'badRequest')
    }
    commit('SET_STATUS_ERROR', true)
  },
  clearMessageError ({ commit }) {
    commit('SET_MESSAGE_ERROR', null)
    commit('SET_STATUS_ERROR', false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
