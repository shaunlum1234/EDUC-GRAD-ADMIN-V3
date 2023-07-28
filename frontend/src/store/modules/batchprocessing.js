import { defineStore } from "pinia";
import BatchProcessingService from "@/services/BatchProcessingService.js";

export const useBatchProcessingStore = defineStore("batchProcessing", {
  namespaced: true,
  state: () => ({
    scheduledBatchJobs: [],
    batchRuns: [],
    batchRoutines: [],
  }),
  actions: {
    // setBatchId(id, type) {
    //   if (type == "batch") {
    //     this.isBatchShowing = true;
    //     this.isErrorShowing = false;
    //     this.adminSelectedBatchId = id.toString();
    //     this.$refs["popover" + id].$emit("close");
    //   }
    //   if (type == "error") {
    //     this.isBatchShowing = false;
    //     this.isErrorShowing = true;
    //     this.adminSelectedErrorId = id.toString();
    //   }
    //   var element = this.$refs["top"];
    //   var top = element.offsetTop;
    //   window.scrollTo(0, top);
    // },
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
      if (state.batchJobs) {
        for (let value of state.batchJobs) {
          value.jobParameters = JSON.parse(value.jobParameters);
        }
      }
    },
    removeScheduledJobs({ state }, payload) {
      if (state.scheduledBatchJobs)
        return BatchProcessingService.removeScheduledJobs(payload["id"]);
    },
  },
  getters: {
    getScheduledBatchRuns: (state) => state.scheduledBatchJobs,
    getBatchRuns: (state) => state.batchRuns,
    getBatchRoutines: (state) => state.batchRoutines,
  },
});
