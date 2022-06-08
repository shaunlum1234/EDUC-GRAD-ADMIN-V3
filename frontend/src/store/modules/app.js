import ApiService from '../../common/apiService.js';

export default {
    namespaced: true,
    state: {
      programOptions:[],
      studentStatusOptions:[],
      ungradReasons:[]
    },
    getters: {
      getProgramOptions(state){
        return state.programOptions;
      },
      getStudentStatusOptions(state){
        return state.studentStatusOptions;
      },
      getUngradReasons(state){
        return state.ungradReasons;
      },
    },
    mutations: {
      setProgramOptions(state, payload){
        console.log("Setting program options")
        console.log(payload)
        state.programOptions = payload;
      },
      setStudentStatusCodesOptions(state, payload){
        state.studentStatusOptions = payload;
      },
      setUngradReasons(state, payload){
        state.ungradReasons = payload;
      },      
    },
    actions: {
      setApplicationVariables({commit}) {
        //ApiService.getGraduationProgram();
        if(localStorage.getItem('jwtToken')){
          commit('setProgramOptions', ApiService.apiAxios.get('/api/v1/program/programs'));
          commit('setStudentStatusCodesOptions', ApiService.apiAxios.get('/api/v1/student/studentstatus'));
          commit('setUngradReasons', ApiService.apiAxios.get('/api/v1/undocompletion/undocompletionreason'));
        }   
      }, 
    },
  };