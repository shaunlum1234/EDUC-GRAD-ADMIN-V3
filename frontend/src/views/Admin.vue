<template>
  <div class="container">
    <h2>Admin Dashboard</h2>
    <div>
      <b-card-group deck>
      <b-card class="text-left m-1"> 
        <b-card-text>
          <div class="row">
            <div class="col-12 col-md-12">
              <strong> Processed:</strong>
              <h2><i class="fas fa-info-circle text-info" aria-hidden="true"></i> {{processed}} / {{lastExpectedStudentsProcessed}}</h2>
              <hr>
              <strong>Last run:</strong> {{ processedLastRun }}<br>
              <strong>Last run status: {{lastRunStatus}}</strong>
            </div>
          </div>
          </b-card-text>   
      </b-card>
      <b-card class="text-left m-1"> 
        <b-card-text>
          <div class="row">
            <div class="col-12 col-md-12">
              <strong> Errors:</strong>
              <h2><i class="fas fa-times-circle text-danger" aria-hidden="true"></i>  {{errors}} Records</h2> 
              <hr>
            </div>
          </div>
          </b-card-text>   
      </b-card>      
      <b-card class="text-left m-1">
        <b-card-text>
          <div class="row">
            <div class="col-12 col-md-12">
              <strong> Processing Time: </strong>
                <h2><i class="fas fa-info-circle text-info" aria-hidden="true"></i> {{processingTime}} hours</h2>          
                <hr>
                <strong>Timespan:</strong><br/>{{processedLastJobstartTime}} <strong>to</strong> <br/> {{processedLastJobendTime}} <br/>
            </div>
          </div>
          </b-card-text>   
      </b-card>      
            <b-card class="text-left m-1">
        
        <b-card-text>
          <div class="row">
            <div class="col-12">
              <strong>Expected: </strong>
                <h2><i class="fas fa-info-circle text-info" aria-hidden="true"></i> {{expected}} Records</h2>          
                <hr>
            </div>
          </div>
          </b-card-text>   
      </b-card>                                   
    </b-card-group>
  <div class="mt-2 row">
  <div class="col-12 float-left p-0">
    <div ref="top">
      <b-card no-body>
        <b-tabs v-model="selectedTab" active card >
          <b-tab title="Job/Runs">
            <b-card-text class="row">
              <div :class="adminSelectedBatchId || adminSelectedErrorId ? 'col-12 col-md-7':'col-12'">
                <DisplayTable title="Job/Runs" :items="batchInfoListData"
                  v-bind:fields="jobRunFields" id="id" :showFilter=false pagination="true"
                >
                  <template #cell(jobExecutionId)="row">
                    <b-btn v-if="row.item.status == 'COMPLETED'" :id="'batch-job-id-btn'+ row.item.jobExecutionId" variant='link' size="xs">   
                      {{row.item.jobExecutionId}}   
                    </b-btn>
                    <b-btn v-else disabled variant='link' size="xs">  
                      {{row.item.jobExecutionId}}   
                    </b-btn>                  
                    <b-popover :target="'batch-job-id-btn'+ row.item.jobExecutionId" triggers="focus" :ref="'popover'+row.item.jobExecutionId">
                      <template #title>Search batch job</template>
                      <b-btn :id="'batch-job-id-btn'+ row.item.jobExecutionId" variant='link' size="xs" @click="setBatchId(row.item.jobExecutionId, 'batch')">   
                        All results           
                      </b-btn>
                    </b-popover>
                  </template>
                  <template #cell(failedStudentsProcessed)="row">
                    <b-btn v-if="row.item.failedStudentsProcessed != 0" variant='link' size="xs" @click="setBatchId(row.item.jobExecutionId, 'error')">  
                      {{row.item.failedStudentsProcessed}}   
                    </b-btn>  
                    <div v-if="row.item.failedStudentsProcessed == 0">{{row.item.failedStudentsProcessed}}</div>       
                  </template>
                </DisplayTable>
              </div>
              <!-- All batch results -->
              <div v-if="adminSelectedBatchId" v-show="isBatchShowing" class="col-12 col-md-5 float-right pl-2 pr-0">
                <b-card bg-variant="light" :header="'Batch Job '+ this.adminSelectedBatchId" class="text-left mb-2">
                  <b-card-text>                
                    <BatchJobSearchResults :selectedBatchId="adminSelectedBatchId"></BatchJobSearchResults>
                    <b-btn variant="danger" size="xs" class="float-right" @click="isBatchShowing ^= true">  
                      Close 
                    </b-btn> 
                  </b-card-text>
                </b-card>
              </div>
              <!-- All error results -->
              <div v-if="adminSelectedErrorId" v-show="isErrorShowing" class="col-12 col-md-5 float-right pl-2 pr-0">
                <b-card bg-variant="light" :header="'Batch Job Error '+ this.adminSelectedErrorId" class="text-left mb-2">
                  <b-card-text>                   
                    <BatchJobErrorResults :selectedErrorId="adminSelectedErrorId"></BatchJobErrorResults>
                     <b-btn variant="danger" size="xs" class="float-right" @click="isErrorShowing ^= true">  
                      Close 
                    </b-btn> 
                  </b-card-text>
                </b-card>
              </div>
            </b-card-text>
         </b-tab>
         
         <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="'Request ' + i">
           <b-overlay :ref="'job-request' + i"></b-overlay>
            <b-alert v-if="validationMessage" show>{{validationMessage}}</b-alert>
           <BatchJobForm :i="i" @runbatch="runbatch" @cancelBatchJob="cancelBatchJob" ></BatchJobForm>
        </b-tab>

        <!-- New Tab Button (Using tabs-end slot) -->
        <template #tabs-end>
          <b-nav-item role="presentation" @click.prevent="newBatchJob" href="#">+ New Request</b-nav-item>
        </template>

        <!-- Render this if no tabs -->
        <template #empty>
          <div class="text-center text-muted">
            There are no open tabs<br>
            Open a new tab using the <strong>+</strong> button above.
          </div>
        </template>
        </b-tabs>
      </b-card>
    </div>    
  </div>
   </div>  
  </div>

</div>
 
</template>

<script>
// @ is an alias to /src
import DashboardService from "@/services/DashboardService.js";
import DisplayTable from '@/components/DisplayTable.vue';
import BatchJobSearchResults from "@/components/BatchJobSearchResults.vue";
import BatchJobErrorResults from "@/components/BatchJobErrorResults.vue";
import BatchJobForm from "@/components/Dashboard/Batch.vue";
import {
  mapGetters
} from "vuex";
export default {
  name: "test",
  computed:{
    results(){
      return this.searchResults;
    },
    batchInfoListDataChange(){
      return this.batchInfoListData;
    },
    ...mapGetters({
      tabCounter: "getBatchCounter",
      tabContent: "getBatchDetails",
      tabs: "getTabs",
      token: "getToken",
      courses: "getStudentCourses",
      gradStatusCourses: "gradStatusCourses",
      studentGradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      gradStatusPendingUpdates: "getHasGradStatusPendingUpdates",

    }),
  },
  // watch:{
  //   batchInfoListDataChange(){
  //     return this.batchInfoListData;
  //   }
  // },
  props: [
    //'adminSelectedBatchId',
  ],
  components: {
      DisplayTable: DisplayTable,
      BatchJobSearchResults: BatchJobSearchResults,
      BatchJobErrorResults: BatchJobErrorResults,
      BatchJobForm: BatchJobForm
  },
  data() {
    return {
      validationMessage: "",
      validating: false,
      adminSelectedBatchId:"",
      adminSelectedErrorId:"",
      errorOn: false,
      displayMessage: null,
      dashboardData:"",
      processed: "",
      lastRunStatus:"",
      lastExpectedStudentsProcessed:"",
      processedLastRun: "",
      errors: "32",
      expected: "56",
      processingTime: "",
      lastJobstartTime:"",
      lastJobendTime:"",
      processedLastJobstartTime:"",
      processedLastJobendTime:"",
      timespan: "6:00pm to 7:12pm",
      timePerRecord: "18s",
      isErrorShowing: false,
      isBatchShowing: false,
      batchInfoListData:[],
      certificateTypes:[],
      transcriptTypes:[],
      jobRunFields: [
         {
            key: 'jobExecutionId',
            label: 'Job Execution ID',
            sortable: true,
            class: 'text-left',
            editable: true
          },  
          {
            key: 'jobType',
            label: 'Batch Job Type Code',
            sortable: true,
            class: 'text-left',
            editable: true,
           
          },     
          {
            key: 'triggerBy',
            label: 'Batch Job Trigger',
            sortable: true,
            class: 'text-left',
            editable: true
          },       
          {
            key: 'updateDate',
            label: 'Update date',
            sortable: true,
            class: 'text-left',
            editable: true,
            sortDirection: 'desc',
            formatter: (value) => {
              let newValue = new Date(value);           
              value = newValue.toLocaleString('en-CA', { timeZone: 'PST' })
              return value
            }
          },
          {
            key: 'status',
            label: 'Status',
            sortable: true,
            class: 'text-left',
            editable: true
          },
        
          {
            key: 'expectedStudentsProcessed',
            label: 'Expected',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'actualStudentsProcessed',
            label: 'Actual',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'failedStudentsProcessed',
            label: 'Error',
            sortable: true,
            class: 'text-center',
            editable: true
          }

      ],
      fields: ['date','program', 'success', 'view'],
      jobFields: ['date','user', 'success', 'status'],
      items: [],
      jobs: [],   
      selectedTab: 0,     
      searchResults: [], 
      
      
    };
    
  },
  created() {
    this.getAdminDashboardData()
  },
  methods: { 
    cancelBatchJob(id) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] == id) {
          this.tabs.splice(i, 1);
          this.$store.commit("clearBatchDetails",i);
        }
      }
      
    },      
    
    newBatchJob() {
      let batchDetail = { details: {what: "", who: "", credential: ""}, students: [{}], schools:[{}], districts: [{}], programs:[{}],blankTranscriptDetails:[{}],blankCertificateDetails:[{}]};
      let id = "job-" + this.tabCounter;
      this.$store.commit("editBatchDetails",  {batchDetail, id});
      this.$store.commit("addBatchJob", this.tabCounter);
        requestAnimationFrame(() => {
          this.selectedTab = this.tabs.length;
        })
    },
    formatDate(value) {    
      return  value.toLocaleString('en-CA', { timeZone: 'PST' });
    },
    getAdminDashboardData(){
      DashboardService.getDashboardInfo(this.token).then(
        (response) => {
            this.dashboardData = response.data;
            this.batchInfoListData = response.data.batchInfoList;
            //Processed
            this.processed = this.dashboardData.lastActualStudentsProcessed;
            this.lastExpectedStudentsProcessed = this.dashboardData.lastExpectedStudentsProcessed;
            this.lastRunStatus = this.dashboardData.lastStatus
            //Errors
            this.errors = this.dashboardData.lastFailedStudentsProcessed
            if(this.errors > 0){
              this.errorOn = true;
            }else{
              this.errorOn = false;
            }
            //Processing time bucket
            this.lastJobendTime = new Date(this.dashboardData.lastJobendTime);
            this.lastJobstartTime = new Date(this.dashboardData.lastJobstartTime)
            var lastJobProcessTimeInMilli = this.lastJobendTime.getTime() - this.lastJobstartTime.getTime();
            this.processingTime = (lastJobProcessTimeInMilli / (1000 * 60 * 60)).toFixed(1);
            this.processedLastJobstartTime = this.lastJobstartTime.toLocaleString('en-CA', { timeZone: 'PST' })
            this.processedLastJobendTime = this.lastJobendTime.toLocaleString('en-CA', { timeZone: 'PST' })
            this.processedLastRun = this.lastJobendTime.toLocaleString('en-CA', { timeZone: 'PST' })
            //Expected
            this.expected = this.dashboardData.lastExpectedStudentsProcessed
          }
        ).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
      });
    },
    batchHasErrors(batch){
      batch.validationMessage = "";
      //check for what
      if(!batch.details['what']){
        batch.validationMessage = "Type of batch Not Specified";
        return true;
      }
      //check for who
      if(!batch.details['who']){
        batch.validationMessage = "Group not specified"
        return true;
      }  
      return false;
    },
    getBatchData(item){
      if(item.value){
        return item.value;
      }else{
        return item;
      }
    },
    runTVRRUN(request, id){
        DashboardService.runTVRRUN(this.token, request).then(
        (response) => {
           //update the admin dashboard
          this.getAdminDashboardData();
          // eslint-disable-next-line
          console.log(response)
          this.selectedTab = 0;
          this.cancelBatchJob(id.replace("job-",""));
          this.$bvToast.toast("Batch run has completed" , {
            title: "SUCCESS",
            variant: 'success',
            noAutoHide: true,
          })
         
        })
        .catch((error) => {
          if(error.response.status){
            this.selectedTab = 0;
            this.cancelBatchJob(id.replace("job-",""));
            this.$bvToast.toast("Batch run in progress" , {
              title: "SUCCESS",
              variant: 'success',
              noAutoHide: true,
            })
          }
        })
    },
    runREGALG(request, id){
        DashboardService.runREGALG(this.token, request).then(
        (response) => {
          // eslint-disable-next-line
          console.log(response)
          this.getAdminDashboardData();
          this.selectedTab = 0;
          this.cancelBatchJob(id.replace("job-",""));
          this.$bvToast.toast("Batch run has completed" , {
            title: "SUCCESS",
            variant: 'success',
            noAutoHide: true,
          })
          //update the admin dashboard
         
        })
        .catch((error) => {
          if(error.response.status){
            this.selectedTab = 0;
            this.cancelBatchJob(id.replace("job-",""));
            this.$bvToast.toast("Batch run in progress" , {
              title: "SUCCESS",
              variant: 'success',
              noAutoHide: true,
            })
          }
        })
    },
    runbatch(id){
        let pens = [], schools = [], districts = [], programs = [], districtCategoryCode="";
        if(this.tabContent[id].details['who'] == 'School'){
          schools = this.tabContent[id].schools.map(this.getBatchData);  
          schools.pop();
          if(!schools.length){
            this.validationMessage = "Please select a school."
            return
          }
        }else if(this.tabContent[id].details['who'] == 'Student'){
          
          pens = this.tabContent[id].students.map(this.getBatchData);  
          pens.pop();
          if(!pens.length){
            this.validationMessage = "Please select a student."
            return
          }
        }else if(this.tabContent[id].details['who'] == 'District'){
          districts = this.tabContent[id].districts.map(this.getBatchData);  
          districtCategoryCode = this.tabContent[id]['details'].categoryCode;
          districts.pop();
          if(!districtCategoryCode){
            this.validationMessage = "Please select a district category"
          }
          if(!districts.length){
            this.validationMessage = "Please select a district."
            return
          }
        }else if(this.tabContent[id].details['who'] == 'Program'){
          programs = this.tabContent[id].programs.map(this.getBatchData);  
          programs.pop();
          
          if(!programs.length){
            this.validationMessage = "Please select a program."
            return
          }
        }
      let request = {"pens": pens, "schoolOfRecords":schools,"districts":districts, "schoolCategoryCodes": [districtCategoryCode], "programs":programs, "validateInput": false}
      if(this.batchHasErrors(this.tabContent[id])){
        return;
      }
      if(this.tabContent[id].details['what'] == 'REGALG'){     
        this.runREGALG(request, id)
      }else if(this.tabContent[id].details['what'] == 'TVRRUN'){     
        this.runTVRRUN(request, id)
      }
    },
    displaySearchResults(value){ 
      this.searchResults = value
    },
    setBatchId(id, type){
      if(type == 'batch'){
        this.isBatchShowing = true
        this.adminSelectedBatchId = id.toString();
        this.$refs['popover' + id].$emit('close');
      }
      if (type == 'error'){
        this.isErrorShowing = true;
        this.adminSelectedErrorId = id.toString(); 
      }
      var element = this.$refs['top'];
      var top = element.offsetTop;
      window.scrollTo(0, top);  
    }, 
  },
  
};
</script>
<style scoped>
.alert,
.card,
.btn.btn-primary {
  position: inherit;
}
h6 {
  font-size: 1.5rem;
}
.find {
  padding-bottom: 1rem;
}
.delete-button{
  border-radius: 0px;
}

</style>
