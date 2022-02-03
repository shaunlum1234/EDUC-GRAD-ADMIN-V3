<template>
  <div class="container">
    {{batchInfoListData}}
    <h2>Admin Dashboard</h2>
<SiteMessage v-bind:message="this.displayMessage" v-if="displayMessage"></SiteMessage>
<div>
      <b-card-group deck>
      <b-card class="text-left m-1">
        
        <b-card-text>
          <div class="row">
            <div class="col-12">
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
            <div class="col-12">
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
            <div class="col-12">
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
              <strong>Next Run:</strong> Today at 6:00PM
            </div>
          </div>
          </b-card-text>   
      </b-card>                                   
    </b-card-group>
  <div class="mt-2 row">
  <div class="col-8 float-left p-0">
    <div>
      <b-card no-body>
        <b-tabs v-model="selectedTab" active card >
          <b-tab title="Job/Runs">
            <b-card-text>
              <DisplayTable title="Job/Runs" v-bind:items="batchInfoListData"
                v-bind:fields="jobRunFields" id="id" :showFilter=false pagination="true"
               >
              </DisplayTable>
            </b-card-text>
         </b-tab>
        </b-tabs>
      </b-card>
    </div>    
  </div>
    <div class="col-4 float-left pl-2 pr-0">
      <b-card bg-variant="light" header="Graduation Batch" class="text-left mb-2">
        <b-card-text>
          <ul>
            <li><a @click="runbatch" href="#">Run Batch</a></li>
          </ul>
        </b-card-text>
      </b-card>

      <b-card bg-variant="Placeholder" header="Placeholder 1" class="text-left mb-2">
        <b-card-text>
          <ul>
            <li><a @click="runbatch" href="#">Clear Logs</a></li>
            <li><a href="#">Download Logs</a></li>
          </ul>
        </b-card-text>
      </b-card>
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
import {
  mapGetters
} from "vuex";
export default {
  name: "test",
  components: {
      SiteMessage: SiteMessage,
      DisplayTable: DisplayTable
  },
  data() {
    return {
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
      jobRunFields: [
         {
            key: 'jobExecutionId',
            label: 'Job Execution ID',
            sortable: true,
            class: 'text-left',
            editable: true
          },  
          {
            key: 'updateUser',
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
            class: 'text-left',
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
    runbatch(){
      let d = new Date();
      var today =  (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear() + " " +
      d.getHours() + ":" + d.getMinutes();
      this.selectedTab = 0;
      setTimeout(() => this.jobs.splice(0, 0,{ id: "9", date: 'Less than 1 minute ago', user: "JOHN DOE", success: "N/A", status: 'Running' }), 1000);
      setTimeout(() => this.jobs.splice(0, 1,{ id: "9", date: today, user: "JOHN DOE", success: "53/56", status: 'Complete' }), 10000);
      setTimeout(() => this.expected=3, 10000);
      setTimeout(() => this.timespan=0, 10000);
      setTimeout(() => this.processed="53/56", 10000);
      setTimeout(() => this.timePerRecord="1s", 10000);
      setTimeout(() => this.timespan="6:00pm to 6:01pm", 10000);
      setTimeout(() => this.errors=3, 10000);
    },
    displaySearchResults(value){ 
      this.searchResults = value
    }
  },
  computed:{
    results(){
      return this.searchResults;
    },
    ...mapGetters({
      token: "getToken",
      courses: "getStudentCourses",
      gradStatusCourses: "gradStatusCourses",
      studentGradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      gradStatusPendingUpdates: "getHasGradStatusPendingUpdates"
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
</style>
