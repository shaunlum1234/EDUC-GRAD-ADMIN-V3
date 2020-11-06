  import Vue from "vue";
  import Vuex from "vuex";

  Vue.use(Vuex);

  export default new Vuex.Store({
    state: {
      student: {
        test: "hello world",
        profiles: {}
        // courses: {},
        // assessments: {},
        // exams: {}
      }
    },
    mutations: {
      setStudentProfile(state, payload) {
        state.student.profiles = payload;
      }
    },
    actions: {
      
    },
    getters: {
      // getStudentProfile(state) {
      //   return state.student.profiles;
      // },
      getStudentProfile: state => state.student.profiles,
      getTest(state) {
        return state.student.test;
      }
    },
    modules: {}
  })