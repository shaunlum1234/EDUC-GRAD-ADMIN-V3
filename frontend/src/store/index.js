import Vue from "vue";
import Vuex from "vuex";
import app from '@/store/modules/app.js';
import auth from '@/store/modules/auth.js';
import batchprocessing from '@/store/modules/batchprocessing.js';
import SchoolService from '@/services/SchoolService.js';
import ProgramManagementService from '@/services/ProgramManagementService.js';
import student from '@/store/modules/student.js';

Vue.use(Vuex);

export default new Vuex.Store({
  
  state: {
    advancedSearchProps:"",
    tokenTimeout: "",
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    token:"",
    refreshToken: "",
    correlationID: "",
    roles: "administrator",
    permissions: "",
    username: "",
    pageTitle: null,
    quickSearchPen: "",
    student: {
      profile: {},
      courses: "not loaded",
      assessments: "not loaded",
      exams: "not loaded",
      notes: [],
      gradStatus: "not loaded",
      optionalPrograms: "not loaded",
      hasExams: false,
      hasAssessments: false,
      hasCourses: false,
      hasGradStatus: false,
      hasgradStatusPendingUpdates: false,
      hasNotes: false,
      certificates: [],
      reports: [],
      transcripts: [],
      xmlReports: [],
      ungradReasons: "",
      careerPrograms: [],
      auditHistory:[],
      auditHistoryOptionalPrograms:[],
    },
  },
  mutations: {
    setPageTitle: (state, pageTitle) => {
      state.pageTitle = pageTitle;
    },
    setAdvancedSearchProps(state, payload){
      state.advancedSearchProps = payload; 
    },
    setQuickSearchPen(state, payload){
      state.quickSearchPen = payload;
    },
    setPermissions(state, payload){
      state.permissions = payload;
    },
    setRoles(state, payload){
      state.roles = payload;
    },    
    unsetStudent(state) {
      state.student.profile = {};
      state.student.notes = [];
      state.student.id = "not loaded";
      state.student.courses = "not loaded";
      state.student.assessments = "not loaded";
      state.student.exams = "not loaded";
      state.student.gradStatus = "not loaded";
      state.student.optionalPrograms = "not loaded";
      state.student.hasExams = false;
      state.student.hasAssessments = false;
      state.student.hasCourses = false;
      state.student.hasNotes = false;
      state.student.hasGradStatus = false;
      state.student.hasgradStatusPendingUpdates = false;
      state.student.certificates = [];
      state.student.reports = [];
      state.student.transcripts = [];
      state.student.xmlReports = [];
      state.student.ungradReasons = [];
      state.student.careerPrograms = [];
    },     
  },
  actions: {
    setQuickSearchPen({commit}, payload){
      commit('setQuickSearchPen', payload);
    },
    setPermissions({commit}, payload){
      commit('setPermissions', payload);
    },
    // Programs      
    createProgram({state}, payload) {
      ProgramManagementService.createProgram(payload, state.auth.token).then(
        (response) => {
          return "STORE REspsonse to display table" + response;
        }
      ).catch((error) => {
        // eslint-disable-next-line
        console.log(error.response.status);
      });
    },   
    deleteProgram({state}, payload) {
      
      ProgramManagementService.deleteProgram(payload, state.auth.token).then(
        () => {
          // eslint-disable-next-line
         
        }
      ).catch((error) => {
        // eslint-disable-next-line
        console.log(error.response.status);
      });
    },   
    updateProgram({state}, payload) {
      
      ProgramManagementService.updateProgram(payload, state.auth.token).then(
        () => {
          
        }
      ).catch((error) => {
        // eslint-disable-next-line
        console.log(error.response.status);
      });
    },   
     // Optional Programs
     createOptionalProgram({state}, payload) {
      ProgramManagementService.createOptionalProgram(payload, state.auth.token).then(
        () => {}
      ).catch((error) => {
        // eslint-disable-next-line
        console.log(error.response.status);
      });
    },   
    deleteOptionalProgram({state}, payload) {
      
      ProgramManagementService.deleteOptionalProgram(payload, state.auth.token).then(
        () => {}
      ).catch((error) => {
        // eslint-disable-next-line
        console.log(error.response.status);
      });
    },   
    updateOptionalProgram({state}, payload) {
      ProgramManagementService.updateOptionalProgram(payload, state.auth.token).then(
        () => {
        }
      ).catch((error) => {
        // eslint-disable-next-line
        console.log(error.response.status);
      });
    },   
    getGraduationPrograms() {
      
      ProgramManagementService.getGraduationPrograms().then(
        (response) => {
          return response.data;
        }
      ).catch((error) => {
        // eslint-disable-next-line
        console.log(error.response.status);
      });
    },       
         
    setAdvancedSearchProps({commit}, payload) {
      commit('setAdvancedSearchProps', payload);
    },

    setRoles({
      commit
    }, payload) {
      commit('setRoles', payload);

    },    

    // SEARCH
    searchSchools({state},payload) {
      SchoolService.searchSchools(payload,state.auth.token).then(
        (response) => {
          return response.data;
        }
      ).catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    },      
  },
  getters: {

    getAdvancedSearchProps(state){
      return state.advancedSearchProps;
    },
    getStudentCertificates(state){
        return state.student.certificates;
    },
    getRoles(state){
      return state.roles;
    },
    isAdmin(state){
      return (state.roles == "administrator")
    },
    isAuthenticated(state){
      return (state.roles == "authenticated")
    },
    getPermissions(state){
      return state.permissions;
    },
    getUsername(state){
      return state.username;
    },
    getQuickSearchPen(state){
      return state.quickSearchPen;
    }
  },
  modules: {
    student,
    app,
    auth,
    batchprocessing
  }
})