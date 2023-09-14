import { defineStore } from "pinia";
import BatchProcessingService from "@/services/BatchProcessingService.js";
import { isProxy, toRaw } from "vue";

export const useBatchProcessingStore = defineStore("batchProcessing", {
  namespaced: true,
  state: () => ({
    scheduledBatchJobs: [],
    batchRuns: [],
    batchRoutines: [],
    schools: [],
    districts: [],
    programs:[],
    students:[],
    psi:[],
    who:"",
    where:"BC Mail",
    gradDate:"Current Students",
    gradDateFrom:"",
    gradDateTo:"",
    psiYear:"",
    psiTransmissionMode:"",     
    blankCertificateDetails:[{}],
    blankTranscriptDetails:[{}],
    credential:"",
    categoryCode:"",
    copies:"1",
    allPsi:false,
    allDistricts:false,
    localDownload: false
  }),
  actions: {
    async setGroup(payload) {
      this.who = payload;
    },
    async setBatchRoutines(payload) {
      this.batchRoutines = payload;
    },
    async setScheduledBatchJobs(payload) {
      this.scheduledBatchJobs = payload;
      for (let value of this.scheduledBatchJobs) {
        value.jobParameters = JSON.parse(value.jobParameters);
      }
    },
    async setBatchJobs(payload) {
      this.batchRuns = payload;
      if (this.batchJobs) {
        for (let value of this.batchJobs) {
          value.jobParameters = JSON.parse(value.jobParameters);
        }
      }
    },
    async removeScheduledJobs({ state }, payload) {
      if (state.scheduledBatchJobs)
        return BatchProcessingService.removeScheduledJobs(payload["id"]);
    },
    async setStudents (payload){
      console.log("setting students")
      this.students = payload
    },
    async setSchools (payload){
      this.schools = payload
    },
    async setDistricts (payload){
      this.districts = payload
    },
    async setPsi (payload){
      this.psi = payload
    },
    async setPrograms (payload){
      this.programs = payload
    },            
    async clearBatchGroupData(){
      this.schools=[];
      this.districts=[];
      this.programs=[];
      this.students=[];
      this.psi=[];
    }, 
    async setJwtToken(token = null){
      if (token) {
        this.isAuthenticated = true;
        this.jwtToken = token;
        localStorage.setItem('jwtToken', token);
      } else {
        this.isAuthenticated = false;
        this.jwtToken = null;
        localStorage.removeItem('jwtToken');
      }
    },
    async clearBatch(){
      let date = new Date();
      let psiCurrentYear = String(date.getFullYear());
      if (date.getMonth() + 1 > 8) {
        psiCurrentYear = String(date.getFullYear() + 1);
      }
      this.schools=[];
      this.districts=[];
      this.programs=[];
      this.students=[];
      this.psi=[];
      this.who="";
      this.where="BC Mail";
      this.gradDate="Current Students";
      this.gradDateFrom="";
      this.gradDateTo="";
      this.psiYear=psiCurrentYear;
      this.psiTransmissionMode="";      
      
      this.blankCertificateDetails=[{}];
      this.blankTranscriptDetails=[{}];
      this.credential="";
      this.categoryCode="";
      this.copies="1";
      this.allPsi=false;
      this.allDistricts=false;
    },
  },
  getters: {

    getGroupData: (state) => {
      
      if (state.who === "Student") {
        return state.students.map(student => student.pen);
      } else if (state.who === "District") {
        return state.districts;
      } else if (state.who === "Program") {
        return state.programs;
      } else if (state.who === "School") {
        return state.schools;
      } else if (state.who === "Psi") {
        return state.psi;
      } else {
        // Return an empty array for any other value
        return [];
      }
    },
    // New getter to check if groupData is empty
    getGroupDataIsEmpty: (state, getters) => {
      const groupData = getters.getGroupData;
      return groupData.length === 1;
    },
    getScheduledBatchRuns: (state) => state.scheduledBatchJobs,
    getGroup: (state) => state.who,
    getBatchRuns: (state) => state.batchRuns,
    getBatchRoutines: (state) => state.batchRoutines,
    getStudents: (state) => state.students,
    getSchools: (state) => state.schools,
    getDistricts: (state) => state.districts,
    getPrograms: (state) => state.programs,
    getPsi: (state) => state.psi,
    getBatchRequest: (state) => {
      console.log(state.who)
      return {
          pens: state.who === "Student" ? state.students.map(student => student.pen) : [],
          schoolOfRecords: state.who === "School" ? state.schools.map(school => school.mincode) : [],
          districts: state.who === "District" ? state.districts.map(district => district.district) : [],
          programs: state.who === "Program" ? state.programs.map(program => program.program) : [],
          psiCodes: state.who === "Psi" ? state.psi.map(postSecondaryInstitution => postSecondaryInstitution.psi) : [],
          credentialTypeCode: state.credentialTypeCode,
          schoolCategoryCodes: state.categoryCode,
          gradDateFrom: state.gradDateFrom,
          gradDateTo: state.gradDateTo,
          validateInput: false,
          quantity: state.copies,
          localDownload: state.localDownload,
      }
    }    
  },
});
