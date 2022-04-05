<template>
  <div class="container">
    <h2>Admin Dashboard</h2>
    
    <SiteMessage v-bind:message="this.displayMessage" v-if="displayMessage"></SiteMessage>
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
                <DisplayTable title="Job/Runs" v-bind:items="batchInfoListData"
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
                      <b-btn :id="'batch-job-id-btn'+ row.item.jobExecutionId" variant='link' size="xs" @click="passBatchId(row.item.jobExecutionId)">   
                        All results           
                      </b-btn>
                    </b-popover>
                  </template>
                  <template #cell(failedStudentsProcessed)="row">
                    <b-btn v-if="row.item.failedStudentsProcessed != 0" variant='link' size="xs" @click="passErrorId(row.item.jobExecutionId)">  
                      {{row.item.failedStudentsProcessed}}   
                    </b-btn>  
                    <div v-if="row.item.failedStudentsProcessed == 0">{{row.item.failedStudentsProcessed}}</div>       
                  </template>
                </DisplayTable>
              </div>
              <!-- All batch results -->
              <div v-if="adminSelectedBatchId" class="col-12 col-md-5 float-right pl-2 pr-0">
                <b-card bg-variant="light" :header="'Batch Job '+ this.adminSelectedBatchId" class="text-left mb-2">
                  <b-card-text>
                    <BatchJobSearchResults :selectedBatchId="adminSelectedBatchId"></BatchJobSearchResults>
                  </b-card-text>
                </b-card>
              </div>
              <!-- All error results -->
              <div v-if="adminSelectedErrorId" class="col-12 col-md-5 float-right pl-2 pr-0">
                <b-card bg-variant="light" :header="'Batch Job Error '+ this.adminSelectedErrorId" class="text-left mb-2">
                  <b-card-text>
                    <BatchJobErrorResults :selectedErrorId="adminSelectedErrorId"></BatchJobErrorResults>
                  </b-card-text>
                </b-card>
              </div>
            </b-card-text>
         </b-tab>
         
         <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="'Request ' + i">
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
import SiteMessage from "@/components/SiteMessage";
import DisplayTable from '@/components/DisplayTable.vue';
import BatchJobSearchResults from "@/components/BatchJobSearchResults.vue";
import BatchJobErrorResults from "@/components/BatchJobErrorResults.vue";
import BatchJobForm from "@/components/Dashboard/Batch.vue";
import {
  mapGetters
} from "vuex";
export default {
  name: "test",
  props: [
    //'adminSelectedBatchId',
  ],
  components: {
      SiteMessage: SiteMessage,
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
      let batchDetail = { details: {what: 'what' +this.tabCounter, who: 'who'+this.tabCounter, credential: ""}, students: [{}], schools:[{}], districts: [{}], programs:[{}],blankTranscriptDetails:[{}],blankCertificateDetails:[{}]};
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
    checkBatchForErrors(id){
      //check for what
      if(!this.tabContent[id].details['what']){
        this.validationMessage = "Type of batch Not Specified";
        return false;
      }
      //check for who
      if(!this.tabContent[id].details['who']){
        this.validationMessage = "Group not specified"
        return false;
      }  
      let type = this.tabContent[id].details['who'].toLowerCase() + "s";
      for(const element of this.tabContent[id][type]){
          if(element.name == "PEN not Found"){
            this.validationMessage = element.value + " is not found. Delete this pen and run batch";
            return true;
          }
      }
      return false;
    },
    getBatchData(item){
      if(item.value){
        return item.value
      }
    },
    beforeRouteLeave(to, from, next) { 
      console.log(`I'm called before leaving the route!`) 
      console.log(`I have access to the component instance, here's proof!  Name: ${this.name}`); next(); 
    },
    runbatch(id){
      if(!this.checkBatchForErrors(id)){
        if(this.tabContent[id].details['what'] == 'REGALG'){          
          let pens = this.tabContent[id].students.map(this.getBatchData);
          let districts = this.tabContent[id].districts.map(this.getBatchData);
          let programs = this.tabContent[id].programs.map(this.getBatchData);
          let schools = this.tabContent[id].schools.map(this.getBatchData);
          pens.pop();
          districts.pop();
          programs.pop();
          schools.pop();
  
          let request = {"pens": pens, "schoolOfRecords":schools,"districts":districts,"programs":programs, "validateInput": false}
          console.log(request)
          DashboardService.runREGALG(this.token, request).then(
          (response) => {
            // eslint-disable-next-line
            console.log(response.data)
            this.selectedTab = 0;
            this.cancelBatchJob(id.replace("job-",""));
            this.$bvToast.toast("Batch run has completed" , {
              title: "SUCCESS",
              variant: 'success',
              noAutoHide: true,
            })
            //update the admin dashboard
            this.getAdminDashboardData();
          })
          .catch((error) => {
            if(error.response.status){
              this.$bvToast.toast("ERROR " + error.response.statusText, {
                title: "ERROR" + error.response.status,
                variant: 'danger',
                noAutoHide: true,
              })
            }
          })
        }
      }
    },
    displaySearchResults(value){ 
      this.searchResults = value
    },
    passBatchId(batchId) {
      this.adminSelectedBatchId = batchId.toString();
      this.$refs['popover' + batchId].$emit('close');
      var element = this.$refs['top'];
      var top = element.offsetTop;
      window.scrollTo(0, top);      
    },  
    passErrorId(errorId) {
      this.adminSelectedErrorId = errorId.toString();    
    },      
  },
  computed:{
    results(){
      return this.searchResults;
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
