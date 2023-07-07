
import { defineStore } from 'pinia';
import BatchProcessingService from '@/services/BatchProcessingService.js';

export const useBatchProcessingStore = defineStore('batchProcessing', {
  namespaced: true,
  state: () => ({
    scheduledBatchJobs: [],
    batchRuns: [],
    batchRoutines: [],
  }),
  actions: {
    setBatchRoutines(payload) {
      this.batchRoutines = payload;
    },
    setScheduledBatchJobs(payload) {
      this.scheduledBatchJobs = payload;
      for (let value of state.scheduledBatchJobs) {
        value.jobParameters = JSON.parse(value.jobParameters); 
      }
    },
    setBatchJobs(payload) {
      this.batchRuns = payload;
      for (let value of state.batchJobs) {
        value.jobParameters = JSON.parse(value.jobParameters); 
      }
    },
    removeScheduledJobs({state}, payload) {
      if(state.scheduledBatchJobs)
       return BatchProcessingService.removeScheduledJobs(payload['id']);
    },       
  },
  getters: {
    getScheduledBatchRuns: (state) => state.scheduledBatchJobs,
    getBatchRuns: (state)  => state.batchRuns,
    getBatchRoutines: (state) => state.batchRoutines
  },  
});
