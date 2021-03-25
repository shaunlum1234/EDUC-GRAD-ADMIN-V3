  import Vue from "vue";
  import Vuex from "vuex";

  Vue.use(Vuex);
  import CourseService from '@/services/CourseService.js';
  import ProgramManagementService from '@/services/ProgramManagementService.js';
  export default new Vuex.Store({
    init: {
      //Initialize the store
    },
    state: {
      tokenTimeout: "",
      token:"",
      refreshToken: "",
      roles: "unauthenticated",
      student: {
        profile: {},
        courses: "not loaded",
        assessments: "not loaded",
        exams: "not loaded",
        gradStatus: "not loaded",
        hasExams: false,
        hasAssessments: false,
        hasCourses: false,
        hasGradStatus: false,
        hasgradStatusPendingUpdates: false,
        
      }
    },
    mutations: {
      setHasGradStatusPendingUpdates(state, payload) {
      //  console.log(payload);
          state.student.hasGradStatusPendingUpdates = payload;
      },
      setToken(state, payload) {
        //state.token = payload;
       // console.log("PAYLOAD" + payload);
        localStorage.setItem("jwt", payload);
        state.token = payload;
        
      },
      setRefreshToken(state, payload) {
        //state.token = payload;
        //console.log("PAYLOAD" + payload);
        
        localStorage.setItem("refresh", payload);
        state.refreshToken = payload;
      },
      setStudentProfile(state, payload) {
        state.student.profile = payload;
      },
      setStudentCourses(state, payload) {
        state.student.courses = payload;
        if(state.student.courses.length){
          state.student.hasCourses = true;
        }
      },
      setStudentGradStatus(state, payload) {
        state.student.gradStatus = payload;
        //when commiting gradstatus to store, we need to put the json string in to a json object to call it easier
        state.student.gradStatus.studentGradData = JSON.parse(state.student.gradStatus.studentGradData); 
        if(state.student.gradStatus != "not loaded"){
          state.student.hasGradStatus = true;
        }
      },
      setStudentAssessments(state, payload) {
        state.student.assessments = payload;
        if(state.student.assessments.length){
          state.student.hasAssessments = true;
        }
      },
      setStudentExams(state, payload) {
        state.student.exams = payload;
        if(state.student.exams.length){
          state.student.hasExams = true;
        }
      },
      unsetStudent(state) {
        state.student.profile = {};
        state.student.courses = "not loaded";
        state.student.assessments = "not loaded";
        state.student.exams = "not loaded";
        state.student.gradStatus = "not loaded";
        state.student.hasExams = false;
        state.student.hasAssessments = false;
        state.student.hasCourses = false;
        state.student.hasGradStatus = false;
        state.student.hasgradStatusPendingUpdates = false;
      },
      setRoles(state, payload){
        console.log("SETTING ADMINISTRATOR");
        state.roles = payload;

      }
    },
    actions: {
      //Courses Restrictions
      createCourseRestriction({state}, payload) {
        console.log("STORE TOKEN" + state.token);
        console.log("PAYLOAD " + payload);
        CourseService.createCourseRestriction(payload, state.token).then(
          (response) => {
            console.log("got a response from course SErvice");
            return "STORE REspsonse to display table COURSE RESTRICTION:" + response;
          }
        ).catch((error) => {
          console.log(error.response.status);
        });
      },    
      // Programs
      createProgram({state}, payload) {
        console.log("create Program Store" + state.token);
        console.log("PAYLOAD in create Program", payload);
        ProgramManagementService.createProgram(payload, state.token).then(
          (response) => {
            return "STORE REspsonse to display table" + response;
          }
        ).catch((error) => {
          console.log(error.response.status);
        });
      },   
      deleteProgram({state}, payload) {
        
        ProgramManagementService.deleteProgram(payload, state.token).then(
          (response) => {
            console.log(response);
          }
        ).catch((error) => {
          console.log(error.response.status);
        });
      },   
      updateProgram({state}, payload) {
        
        ProgramManagementService.updateProgram(payload, state.token).then(
          (response) => {
            console.log(response);
          }
        ).catch((error) => {
          console.log(error.response.status);
        });
      },   
       // Special Programs
       createSpecialProgram({state}, payload) {
        console.log("create Special Program Store" + state.token);
        console.log("PAYLOAD in create Program", payload);
        ProgramManagementService.createSpecialProgram(payload, state.token).then(
          (response) => {
            return "STORE REspsonse to display table" + response;
          }
        ).catch((error) => {
          console.log(error.response.status);
        });
      },   
      deleteSpecialProgram({state}, payload) {
        
        ProgramManagementService.deleteSpecialProgram(payload, state.token).then(
          (response) => {
            console.log(response);
          }
        ).catch((error) => {
          console.log(error.response.status);
        });
      },   
      updateSpecialProgram({state}, payload) {
        
        ProgramManagementService.updateSpecialProgram(payload, state.token).then(
          (response) => {
            console.log(response);
          }
        ).catch((error) => {
          console.log(error.response.status);
        });
      },   
      getGraduationPrograms({state}) {
        
        ProgramManagementService.getGraduationPrograms(state.token).then(
          (response) => {
            console.log("GET GRAD PROGRAMS" + response.data);
            return response.data;
          }
        ).catch((error) => {
          console.log(error.response.status);
        });
      },    
      setHasGradStatusPendingUpdates({commit}, payload) {
        commit('setHasGradStatusPendingUpdates', payload);
      },
      setToken({commit}, payload) {
        commit('setToken', payload);
      },
      setRefreshToken({commit}, payload) {
        commit('setRefreshToken', payload);
      },
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
      },
      setStudentGradStatus({
        commit
      }, payload) {
        commit('setStudentGradStatus', payload);
      },
      setRoles({
        commit
      }, payload) {
        console.log(payload);
        commit('setRoles', payload);

      },      
    },

    

    getters: {
      getStudentGraduationCreationAndUpdate(state){
        return {
          "createdBy" : state.student.gradStatus.createdBy,
          "createdTimestamp": state.student.gradStatus.createdTimestamp,
          "updatedBy" : state.student.gradStatus.updatedBy,
          "updatedTimestamp": state.student.gradStatus.updatedTimestamp
        }
      },
      getHasGradStatusPendingUpdates(state){
          return state.student.hasGradStatusPendingUpdates;
      },
      getStudentProfile(state) {
        return state.student.profile;
      },
      getStudentFullName(state) {
        //return state.student.profile.studSurname + ", " + state.student.profile.studGiven + " " + state.student.profile.studMiddle + "(" + state.student.profile.pen + ")";
        return {
          "studSurname": state.student.profile.studSurname,
          "studGiven": state.student.profile.studGiven,
          "studMiddle": state.student.profile.studMiddle,
          "studPen": state.student.profile.pen
        };
      },
      getStudentPen(state) {
        return state.student.profile.pen;
      },
      getStudentGradStatus(state) {
        return state.student.gradStatus;
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
      studentHasCourses(state){
        return state.student.hasCourses;
      },
      studentHasExams(state){
        return state.student.hasExams;
      },
      studentHasAssessments(state){
        return state.student.hasAssessments;
      },
      studentHasGradStatus(state){
        return state.student.hasGradStatus;
      },
      gradStatusCourses(state){
        return state.student.gradStatus.studentGradData.studentCourses.studentCourseList;
      },
      getToken(state){
        return state.token;
      },
      getRoles(state){
        return state.roles;
      },
      isAdmin(state){
        return (state.roles == "administrator")
      },
      isAuthenticated(state){
        return (state.roles == "authenticated")
      }
    },
    modules: {}
  })
