  import Vue from "vue";
  import Vuex from "vuex";

  Vue.use(Vuex);

  export default new Vuex.Store({
    state: {
      student: {
        test: "hello world",
        profile: {},
        // courses: {},
        // assessments: {},
        // exams: {}
      }
    },
    mutations: {
      setStudentProfile(state, payload) {
        state.student.profile += payload;
      }
    },
    actions: {},
    getters: {
      getStudentProfile(state) {
        return state.student.profile;
      },
      getTest(state) {
        return state.student.test;
      }
    },
    modules: {}
  })