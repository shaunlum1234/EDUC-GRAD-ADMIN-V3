import StudentService from '@/services/StudentService.js';
import BatchProcessingService from '@/services/BatchProcessingService.js';
export default {
  namespaced: true,
  state: {
    scheduledBatchJobs: [],
    batchRuns: [],
    batchRoutines: [],
    
  },
  mutations: {
    setBatchJobs(state, payload){
      state.batchRuns = payload;
      
      for (let value of state.batchJobs) {
        value.jobParameters = JSON.parse(value.jobParameters); 
      }
    },  
    setBatchRoutines(state, payload){
      state.batchRoutines = payload;
    },  
    setScheduledBatchJobs(state, payload){
      state.scheduledBatchJobs = payload;

      for (let value of state.scheduledBatchJobs) {
        value.jobParameters = JSON.parse(value.jobParameters); 
      }
    }  
          
  },
  actions: {
    setBatchRoutines({commit}, payload) {
      commit('setBatchRoutines', payload);
    },
    setScheduledBatchJobs({commit}, payload) {
      commit('setScheduledBatchJobs', payload);
    },
    setBatchJobs({commit}, payload) {
      commit('setBatchJobs', payload);
    },
    removeScheduledJobs({state}, payload) {
      if(state.scheduledBatchJobs)
       return BatchProcessingService.removeScheduledJobs(payload['id']);
    },       
  },
  getters: {
 
    getScheduledBatchRuns(state){
      return state.scheduledBatchJobs;
    },    
    getBatchRuns(state){
      return state.batchRuns;
    },     
    getBatchRoutines(state){
      return state.batchRoutines;
    },         
  
  },  
};
