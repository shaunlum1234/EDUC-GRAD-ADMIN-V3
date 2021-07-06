  import Vue from "vue";
  import Vuex from "vuex";

  Vue.use(Vuex);
  //import CourseService from '@/services/CourseService.js';
  import ProgramManagementService from '@/services/ProgramManagementService.js';
  import SchoolService from '@/services/SchoolService.js';
  import CodeService from '@/services/CodeService.js';
  export default new Vuex.Store({
    init: {
      //Initialize the store
    },
    state: {
      advancedSearchProps:"",
      tokenTimeout: "",
      token:"",
      refreshToken: "",
      roles: "unauthenticated",
      permissions: "",
      username: "",
      student: {
        profile: {},
        courses: "not loaded",
        assessments: "not loaded",
        exams: "not loaded",
        notes: [],
        gradStatus: "not loaded",
        specialPrograms: "not loaded",
        hasExams: false,
        hasAssessments: false,
        hasCourses: false,
        hasGradStatus: false,
        hasgradStatusPendingUpdates: false,
        hasNotes: false,
        certificates: "not loaded",
        ungradReasons: ""
      },
      applicationVariables:{
        programOptions:[],
        studentStatusOptions:[],
        ungradReasons:[]
      },

    },
    mutations: {
      setAdvancedSearchProps(state, payload){
        state.advancedSearchProps = payload; 
      },
      setStudentUngradReasons(state, payload){
        state.student.ungradReasons = payload; 
      },
      setStudentCertificates(state, payload){
        state.student.certificates = payload         
      },
      setProgramOptions(state, payload){
        let programs = payload;
        let i=0;
         for(i=0; i < programs.length; i++){
           state.applicationVariables.programOptions.push({"value": programs[i].programCode, "text":programs[i].programCode});
         }
      },
      setStudentStatusCodesOptions(state, payload){
        
        let studentCodes = payload;
        let i=0;
         for(i=0; i < studentCodes.length; i++){
           state.applicationVariables.studentStatusOptions.push({"value": studentCodes[i].code, "text":studentCodes[i].description});
         }         
      },
      setUngradReasons(state, payload){
        state.applicationVariables.ungradReasons = payload;
      },      
      setUsername(state, payload){
        state.username = payload;
      },
      setPermissions(state, payload){
        state.permissions = payload;
      },
      setStudentGradStatusSpecialPrograms(state, payload) {
      //  console.log(payload);
        
        state.student.specialPrograms = payload;
        let i = 0;
        for (i = 0; i < state.student.specialPrograms.length; i++) {
          state.student.specialPrograms[i].studentSpecialProgramData = JSON.parse(state.student.specialPrograms[i].studentSpecialProgramData); 
        }
        
        
      },
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
      setStudentNotes(state, payload) {
        state.student.notes = payload;
        if(state.student.notes.length){
          state.student.hasNotes = true;
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
        state.student.notes = [];
        state.student.id = "not loaded";
        state.student.courses = "not loaded";
        state.student.assessments = "not loaded";
        state.student.exams = "not loaded";
        state.student.gradStatus = "not loaded";
        state.student.specialPrograms = "not loaded";
        state.student.hasExams = false;
        state.student.hasAssessments = false;
        state.student.hasCourses = false;
        state.student.hasNotes = false;
        state.student.hasGradStatus = false;
        state.student.hasgradStatusPendingUpdates = false;
        
      },
      setRoles(state, payload){
        state.roles = payload;
      }
    },
    actions: {
      
      setApplicationVariables({commit,state}) {
        ProgramManagementService.getGraduationPrograms(state.token).then(
          (response) => {
            commit('setProgramOptions', response.data);
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });
        CodeService.getStudentStatusCodes(state.token).then(
          (response) => {
            commit('setStudentStatusCodesOptions', response.data);
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });
        CodeService.getUngradReasons(state.token).then(
          (response) => {
            commit('setUngradReasons', response.data);
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });        
      }, 
      setUsername({commit}, payload){
        commit('setUsername', payload);
      },
      setPermissions({commit}, payload){
        commit('setPermissions', payload);
      },

      // Programs
      
      createProgram({state}, payload) {
        ProgramManagementService.createProgram(payload, state.token).then(
          (response) => {
            return "STORE REspsonse to display table" + response;
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });
      },   
      deleteProgram({state}, payload) {
        
        ProgramManagementService.deleteProgram(payload, state.token).then(
          (response) => {
            // eslint-disable-next-line
            console.log(response);
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });
      },   
      updateProgram({state}, payload) {
        
        ProgramManagementService.updateProgram(payload, state.token).then(
          (response) => {
            // eslint-disable-next-line
            console.log(response);
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });
      },   
       // Special Programs
       createSpecialProgram({state}, payload) {
        ProgramManagementService.createSpecialProgram(payload, state.token).then(
          (response) => {
            return "STORE REspsonse to display table" + response;
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });
      },   
      deleteSpecialProgram({state}, payload) {
        
        ProgramManagementService.deleteSpecialProgram(payload, state.token).then(
          (response) => {
            // eslint-disable-next-line
            console.log(response);
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });
      },   
      updateSpecialProgram({state}, payload) {
        
        ProgramManagementService.updateSpecialProgram(payload, state.token).then(
          (response) => {
            // eslint-disable-next-line
            console.log(response);
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });
      },   
      getGraduationPrograms({state}) {
        
        ProgramManagementService.getGraduationPrograms(state.token).then(
          (response) => {
            return response.data;
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.status);
        });
      },    

      setStudentCertificates({commit}, payload) {
        commit('setStudentCertificates', payload);
      },
      setAdvancedSearchProps({commit}, payload) {
        commit('setAdvancedSearchProps', payload);
      },
      setStudentUngradReasons({commit}, payload) {
        commit('setStudentUngradReasons', payload);
      },      
      setHasGradStatusPendingUpdates({commit}, payload) {
        commit('setHasGradStatusPendingUpdates', payload);
      },
      setStudentGradStatusSpecialPrograms({commit}, payload) {
        commit('setStudentGradStatusSpecialPrograms', payload);
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
        commit('setStudentProfile', payload[0]);
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
        commit('setRoles', payload);

      },    
      setStudentNotes({
        commit
      }, payload) {
        commit('setStudentNotes', payload);
      },    
      // SEARCH
      searchSchools({state},payload) {
        SchoolService.searchSchools(payload,state.token).then(
          (response) => {
            return response.data;
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      }
    },

    

    getters: {
      
      getAdvancedSearchProps(state){
        return state.advancedSearchProps;
      },
      getStudentUngradReasons(state){
        return state.student.ungradReasons;
      },
      getStudentCertificates(state){
          return state.student.certificates;
      },
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
      getStudentId(state) {
        return state.student.profile.studentID;
      },
      getStudentProfile(state) {
        return state.student.profile;
      },
      getStudentFullName(state) {
  

        return {
          "legalLastName": state.student.profile.legalLastName,
          "legalFirstName": state.student.profile.legalFirstName,
          "legalMiddleNames": state.student.profile.legalMiddleNames,
          "pen": state.student.profile.pen
        };
      },
      getStudentPen(state) {
        return state.student.profile.pen;
      },
      getStudentGradStatus(state) {
        return state.student.gradStatus;
      },
      getStudentSpecialPrograms(state) {
        return state.student.specialPrograms;
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
      getStudentNotes(state) {
        return state.student.notes;
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
      studentHasNotes(state){
        return state.student.hasNotes;
      },
      gradStatusCourses(state){
        return state.student.gradStatus.studentGradData.studentCourses.studentCourseList;
      },
      gradStatusAssessments(state){
        return state.student.gradStatus.studentGradData.studentAssessments.studentAssessmentList;
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
      },
      getPermissions(state){
        return state.permissions;
      },
      getUsername(state){
        return state.username;
      },
      getProgramOptions(state){
        return state.applicationVariables.programOptions;
      },
      getStudentStatusOptions(state){
        return state.applicationVariables.studentStatusOptions;
      },
      getUngradReasons(state){
        return state.applicationVariables.ungradReasons;
      },
      getRequirementsMet(state){
        return state.student.gradStatus.studentGradData.requirementsMet;
      },
      getNongradReasons(state){
        return state.student.gradStatus.studentGradData.nonGradReasons;
      }      
    },
    modules: {}
  })
