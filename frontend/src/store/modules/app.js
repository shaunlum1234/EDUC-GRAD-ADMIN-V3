// import StudentService from '@/services/StudentService.js';
// import ProgramManagementService from '@/services/ProgramManagementService.js';
import ApiService from '../../common/apiService.js';
//import { REQUEST_TYPES } from '../../utils/constants';


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
          console.log("setting application variables")
          
          commit('setProgramOptions', ApiService.getGraduationPrograms());
        }

        // StudentService.getStudentStatusCodes(rootState.auth.token).then(
        //   (response) => {
        //     commit('setStudentStatusCodesOptions', response.data);
        //   }
        // ).catch((error) => {
        //   // eslint-disable-next-line
        //   console.log(error.response.status);
        // });
        // StudentService.getUngradReasons(rootState.auth.token).then(
        //   (response) => {
        //     commit('setUngradReasons', response.data);
        //   }
        // ).catch((error) => {
        //   // eslint-disable-next-line
        //   console.log(error.response.status);
        // });        
      }, 
    },
  };