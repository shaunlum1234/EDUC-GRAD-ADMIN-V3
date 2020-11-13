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
        courses: "not loaded",
        assessments: "not loaded",
        exams: "not loaded",
        hasExams: false,
        hasAssessments: false,

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
        console.log("state.student.assessments");
        console.log(state.student.assessments);
        console.log(state.student.assessments.length);
        if(state.student.assessments.length){
          state.student.hasAssessments = true;
        }
      },
      setStudentExams(state, payload) {
        state.student.exams = payload;
        if(state.student.exams){
          state.student.hasExams = true;
        }
      },
      unsetStudent(state) {
        state.student.profile = {};
        state.student.courses = {};
        state.student.assessments = {};
        state.student.exams = {};
      },
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
      setStudentAssessments({
        commit
      }, payload) {
        commit('setStudentAssessments', payload);
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
      },
      getStudentAssessments(state) {
        return  state.student.assessments;
      },
      studentHasExams(state){
        return state.student.hasExams;
      },
      studentHasAssessments(state){
        return state.student.hasAssessments;
      }

      // getStudentProfile: state => state.student.profiles
    },
    modules: {}
  })
