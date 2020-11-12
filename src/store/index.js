  import Vue from "vue";
  import Vuex from "vuex";

  Vue.use(Vuex);
  export default new Vuex.Store({
    init: {
      //Initialize the store
    },
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
      setStudentProfile({
        commit
      }, payload) {
        commit('setStudentProfile', payload);
      },
      setStudentCourses({
        commit
      }, payload) {
        commit('setStudentCourses', payload);
      },
      setStudentAssessments(state, payload) {
        state.student.assessments = payload;
      },
      setStudentExams({
        commit
      }, payload) {
        commit('setStudentExams', payload);
      }

    },
    getters: {
      getStudentProfile(state) {
        return state.student.profile;
      },
      getStudentFullName(state) {
        return state.student.profile.studSurname + ", " + state.student.profile.studGiven + " " + state.student.profile.studMiddle + "(" + state.student.profile.pen + ")";
      },
      getStudentCourses(state) {
        return state.student.courses;
      },
      getStudentExams(state) {
        return  state.student.exams;
      }
      // getStudentProfile: state => state.student.profiles
    },
    modules: {}
  })
