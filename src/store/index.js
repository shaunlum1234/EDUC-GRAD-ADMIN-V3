  import Vue from "vue";
  import Vuex from "vuex";

  Vue.use(Vuex);

  export default new Vuex.Store({
    state: {
      student: {
        profile: {},
        courses: {},
        assessments: {},
        exams: {},

      }
    },
    mutations: {
      setStudentProfile(state, payload) {
        state.student.profile = payload;
      },
      setStudentCourses(state, payload) {
        state.student.courses = payload;
      },
      setStudentAssessments(state, payload) {
        state.student.assessments = payload;
      },
      setStudentExams(state, payload) {
        state.student.exams = payload;
      }
    },
    actions: {      
    },
    getters: {
      getStudentProfile(state) {
        return state.student.profile;
      },
      getStudentCourses(state) {
        return state.student.courses;
      }
      // getStudentProfile: state => state.student.profiles
    },
    modules: {}
  })