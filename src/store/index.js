import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    profile: []
    // courses: {},
    // assessments: {},
    // exams: {}
  },
  mutations: {
    setStudentProfile(state, payload) {
      state.profile = payload;
    }
  },
  actions: {},
  getters: {
    getStudentProfile(state) {
      return state.profile;
    }
  },
  modules: {}
})