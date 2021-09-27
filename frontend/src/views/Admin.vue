<template>
  <div class="container">
    <h2>Admin Dashboard</h2>
<SiteMessage v-bind:message="this.displayMessage" v-if="displayMessage"></SiteMessage>
Dashboard data: {{dashboardData}}
<div>
      <b-card-group deck>
      <b-card class="text-left m-1">
        
        <b-card-text>
          <div class="row">
            <div class="col-12">
              <strong> Processed:</strong>
              <h2><i class="fas fa-times-circle text-danger"></i> {{processed}}</h2>
              <hr>
              <strong>Last Run:</strong> {{ processedLastRun }}
            </div>
          </div>
          </b-card-text>   
      </b-card>
      <b-card class="text-left m-1"> 
        <b-card-text>
          <div class="row">
            <div class="col-12">
              <strong> Errors:</strong>
              <h2><i class="fas fa-times-circle text-danger"></i> {{errors}} Records</h2> 
              <hr>
              <a href="#">View Errors</a>
            </div>
          </div>
          </b-card-text>   
      </b-card>      
      <b-card class="text-left m-1">
        <b-card-text>
          <div class="row">
            <div class="col-12">
              <strong> Processing Time: </strong>
                <h2><i class="fas fa-info-circle text-info"></i> {{processingTime}}</h2>          
                <hr>
                <strong>Timespan:</strong> {{timespan}}<br/>
                <strong>Time Per Record:</strong> {{timePerRecord}}              
            </div>
          </div>
          </b-card-text>   
      </b-card>      
            <b-card class="text-left m-1">
        
        <b-card-text>
          <div class="row">
            <div class="col-12">
              <strong>Expected: </strong>
                <h2><i class="fas fa-info-circle text-info"></i> {{expected}} Records</h2>          
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
                <b-table small striped :items="jobs" :fields="jobFields" :tbody-tr-class="rowClass">
                 <template #cell(view)="data">
                  <div>
                    <!-- Using modifiers -->
                    <b-button v-b-modal="'modal-' + data.item.id">View</b-button>

                    <!-- The modal -->
                    <b-modal :id="'modal-' + data.item.id">
                      <table>
                        <tr><td>1234561</td><td>Success</td><td></td></tr>
                        <tr><td>1234562</td><td>Failure</td><a href="#">Rerun</a></tr>
                        <tr><td>1234563</td><td>Success</td><td></td></tr>
                        <tr><td>1234564</td><td>Success</td><td></td></tr>
                        <tr><td>1234565</td><td>Success</td><td></td></tr>
                        <tr><td>1234566</td><td>Failure</td><a href="#">Rerun</a></tr>
                        <tr><td>1234567</td><td>Success</td><td></td></tr>
                        <tr><td>1234568</td><td>Success</td><td></td></tr>                        
                      </table>                        

                    </b-modal>
                  </div>
                </template>
                <template #cell(success)="data">
                   {{data.item.status}} ({{data.item.success}})
                </template>   
                <template #cell(status)="data">
                   {{data.item.status}} <b-spinner small v-if="data.item.status=='Running'"></b-spinner>
                </template>                                
              </b-table>

            </b-card-text>
          </b-tab>
          <b-tab title="Errors (32)">
            <b-card-text>
                      <table>
                        <tr><td>1234561</td><td>Success</td><td></td></tr>
                        <tr><td>1234562</td><td>Failure</td><td><a href="#">Rerun</a></td></tr>
                        <tr><td>1234563</td><td>Success</td><td></td></tr>
                        <tr><td>1234564</td><td>Success</td><td></td></tr>
                        <tr><td>1234565</td><td>Success</td><td></td></tr>
                        <tr><td>1234566</td><td>Failure</td><td><a href="#">Rerun</a></td></tr>
                        <tr><td>1234567</td><td>Success</td><td></td></tr>
                        <tr><td>1234568</td><td>Success</td><td></td></tr>                        
                        <tr><td>1234561</td><td>Success</td><td></td></tr>
                        <tr><td>1234562</td><td>Failure</td><td><a href="#">Rerun</a></td></tr>
                        <tr><td>1234563</td><td>Success</td><td></td></tr>
                        <tr><td>1234564</td><td>Success</td><td></td></tr>
                        <tr><td>1234565</td><td>Success</td><td></td></tr>
                        <tr><td>1234566</td><td>Failure</td><td><a href="#">Rerun</a></td></tr>
                        <tr><td>1234567</td><td>Success</td><td></td></tr>
                        <tr><td>1234568</td><td>Success</td></tr> 
                        <tr><td>1234561</td><td>Success</td></tr>
                        <tr><td>1234562</td><td>Failure</td><a href="#">Rerun</a></tr>
                        <tr><td>1234563</td><td>Success</td></tr>
                        <tr><td>1234564</td><td>Success</td></tr>
                        <tr><td>1234565</td><td>Success</td></tr>
                        <tr><td>1234566</td><td>Failure</td><a href="#">Rerun</a></tr>
                        <tr><td>1234567</td><td>Success</td></tr>
                        <tr><td>1234568</td><td>Success</td></tr>                                                 
                      </table> 

            </b-card-text>
          </b-tab>
          <b-tab title="Last Run Details" class="p-2 m-0">
            <b-card-text>
              <b-table small striped :items="items" :fields="fields" :tbody-tr-class="rowClass">
                 <template #cell(view)="data">
                  <div>
                    <!-- Using modifiers -->
                    <b-button v-b-modal="'modal-' + data.item.id">View</b-button>

                    <!-- The modal -->
                    <b-modal :id="'modal-' + data.item.id">
                      <table>
                        <tr><td>1234561</td><td>Success</td><td></td></tr>
                        <tr><td>1234562</td><td>Failure</td><a href="#">Rerun</a></tr>
                        <tr><td>1234563</td><td>Success</td><td></td></tr>
                        <tr><td>1234564</td><td>Success</td><td></td></tr>
                        <tr><td>1234565</td><td>Success</td><td></td></tr>
                        <tr><td>1234566</td><td>Failure</td><a href="#">Rerun</a></tr>
                        <tr><td>1234567</td><td>Success</td><td></td></tr>
                        <tr><td>1234568</td><td>Success</td><td></td></tr>                        
                      </table>                        

                    </b-modal>
                  </div>
                </template>
                <template #cell(success)="data">
                   {{data.item.status}} ({{data.item.success}})
                </template>                
              </b-table>
            </b-card-text>
          </b-tab>
                    
        </b-tabs>
      </b-card>
    </div>    
  </div>
    <!-- <SearchForm v-on:searchResults="displaySearchResults" searchAPI="searchSchools" :searchAPIFields="searchAPIFields"></SearchForm>
    <DisplayTable v-if="searchResults" :items="searchResults" :fields="schoolFields" title="schoolsearch" ></DisplayTable> -->
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
      <b-card bg-variant="Placeholder" header="Placeholder 2" class="text-left mb-2">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>            
    </div>
    <!-- <SearchForm v-on:searchResults="displaySearchResults" searchAPI="searchSchools" :searchAPIFields="searchAPIFields"></SearchForm>
    <DisplayTable v-if="searchResults" :items="searchResults" :fields="schoolFields" title="schoolsearch" ></DisplayTable> -->
   </div>  


    <!-- <b-card-group deck>
      <b-card class="text-center m-1">
        <b-card-text><i class="fas fa-times-circle text-danger h2"></i><h3>231/232</h3></b-card-text>
      </b-card>
            <b-card class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2"></i><h3>175/175</h3></b-card-text>
      </b-card>
      <b-card class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2"></i><h3>0</h3></b-card-text>
      </b-card>
      <b-card  class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2"></i><h3>81/81</h3></b-card-text>
      </b-card>
      <b-card class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2"></i><h3>100/100</h3></b-card-text>
      </b-card>                                      
    </b-card-group>
  </div>
  <div class="mt-3">
    <b-card-group deck>
      <b-card header="1986" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2"></i><h3>232/232</h3></b-card-text>
      </b-card>
            <b-card header="2018-PF" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2"></i><h3>175/175</h3></b-card-text>
      </b-card>
      <b-card header="1950" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2"></i><h3>0</h3></b-card-text>
      </b-card>
      <b-card header="SCCP" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2"></i><h3>81/81</h3></b-card-text>
      </b-card>
      <b-card header="2004-PF" class="text-center m-1">
        <b-card-text><i class="fas fa-times-circle text-danger h2"></i><h3>100/200</h3></b-card-text>
      </b-card> 
    </b-card-group>
  </div> 
  <div>-->
      <!-- For each job:

      Time
      Date
      Who ran it
      Status (run, cancelled, in queue, running, failed)
      Expected  (eg. 1000) - How many students have the process flag set to Y (How many we are expecting to Graduation)

      400 did not run in the job (technical problem)
      Processed (600/1000) - Total number of students picked up for the batch grad run by date – i.e.

      Success: Number of graduated students and changes to students
      Failed records (any error message [change, graduation, certificate production etc])
      Once run then the flag goes from Y to N – if there is a failure at any point the flag stays at Y -->
  </div>

</div>
 
</template>

<script>
// @ is an alias to /src
//import SearchForm from "@/components/SearchForm.vue"
//import { store } from "@/store.js";
import DashboardService from "@/services/DashboardService.js";
import SiteMessage from "@/components/SiteMessage";

import {
  mapGetters
} from "vuex";
export default {
  name: "test",
  components: {
      SiteMessage: SiteMessage,
  },
  data() {
    return {
      displayMessage: null,
      dashboardData:"",
      processed: "200/232",
      processedLastRun: "Yesterday September 14, 2021 at 6:00pm",
      errors: "32",
      expected: "56",
      processingTime: "1 Hr 12 Min",
      timespan: "6:00pm to 7:12pm",
      timePerRecord: "18s",
      fields: ['date','program', 'success', 'view'],
      jobFields: ['date','user', 'success', 'status'],
      items: [
        { id: "1", date: 'Sept 16, 2021', program: "1950", success: "10/20", total: 20, status: 'fail' },
        { id: "2", date: 'Sept 16, 2021', program: "2018-EN", success: "10/10", total: 20, status: 'success' },
        { id: "3", date: 'Sept 16, 2021', program: "2018-PF", success: "10/10", total: 20, status: 'success' },          
        { id: "4", date: 'Sept 16, 2021', program: "SCCP", success: "10/20", total: 20, status: 'fail' },
        { id: "5", date: 'Sept 16, 2021', program: "1996", success: "10/10", total: 20, status: 'success' },
        { id: "6", date: 'Sept 16, 2021', program: "1986", success: "10/10", total: 20, status: 'success' },          
        { id: "7", date: 'Sept 16, 2021', program: "NOPROG", success: "10/20", total: 20, status: 'fail' },
        { id: "8", date: 'Sept 16, 2021', program: "2004-EN", success: "10/10", total: 20, status: 'success' },
        { id: "9", date: 'Sept 16, 2021', program: "2004-PF", success: "10/10", total: 20, status: 'success' },          
      ],
      jobs: [
        { id: "1", date: '9/21/2021 6:00', user: "GRAD BATCH", success: "N/A", status: 'Queued' },
        { id: "1", date: '9/20/2021 6:00', user: "GRAD BATCH", success: "N/A", status: 'Completed' },
        { id: "1", date: '9/19/2021 6:00', user: "GRAD BATCH", success: "200/200", status: 'Completed' },
        { id: "2", date: '9/18/2021 6:12', user: "JANE DOE", success: "2/2", status: 'Completed' },
        { id: "1", date: '9/17/2021 6:00', user: "GRAD BATCH", success: "200/200", status: 'Completed' },
        { id: "2", date: '9/16/2021 6:12', user: "JANE DOE", success: "2/2", status: 'Completed' },
        { id: "9", date: '9/16/2021 6:00', user: "GRAD BATCH", success: "100/198", status: 'Failed' },
        { id: "9", date: '9/16/2021 6:00', user: "GRAD BATCH", success: "100/198", status: 'Cancelled' },
        { id: "3", date: '9/15/2021 6:00', user: "GRAD BATCH", success: "23/23", status: 'Completed' },
        { id: "4", date: '9/15/2021 6:00', user: "GRAD BATCH", success: "200/200", status: 'Completed' },
        { id: "5", date: '9/14/2021 6:34', user: "JOHN SMITH", success: "23/23", status: 'Completed' },
        { id: "6", date: '9/14/2021 6:00', user: "GRAD BATCH", success: "277/300", status: 'Failed' },
        { id: "7", date: '9/13/2021 6:00', user: "GRAD BATCH", success: "100/100", status: 'Completed' },         
      ],   
      selectedTab: 0,     
      searchResults: [],
      searchAPIFields: {
        schoolName:{
          value:"",
          contains:false
        },
        mincode:{
          value:"",
          contains:false
        }
      },
      schoolFields: [
        {
          key: 'more',
          label: '',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'minCode',
          label: 'Mincode',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'schoolName',
          label: 'School Name',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'districtName',
          label: 'District',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'openFlag',
          label: 'Open',
          sortable: true,
          class: 'text-center'
        },
        {
          key: '',
          label: 'Schl Org',
          sortable: true,
          class: 'text-center'
        },
        {
          key: '',
          label: 'Indep Type',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'independentAffiliation',
          label: 'Indep Affil',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'transcriptEligibility',
          label: 'Tran Elig',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'certificateEligibility',
          label: 'Cert Elig',
          sortable: true,
          class: 'text-center'
        },
        {
          key: '',
          label: 'Marks Display',
          sortable: true,
          class: 'text-center'
        },
        {
          key: '',
          label: 'Append Trans',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'signatureDistrict',
          label: 'Sig Distno',
          sortable: true,
          class: 'text-center'
        },
        {
          key: '',
          label: 'New School Code',
          sortable: true,
          class: 'text-center'
        },
      ],        
    };
    
  },
  created() {
    this.getAdminDashboardData()
  },
  methods: {
    getAdminDashboardData(){
      DashboardService.getDashboardInfo(this.token).then(
        (response) => {
            this.dashboardData = response.data
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
      setTimeout(() => this.processingTime="8s", 10000);
      setTimeout(() => this.timespan="6:00pm to 6:01pm", 10000);
      setTimeout(() => this.errors=3, 10000);
      setTimeout(() => this.processedLastRun="Just now", 10000);    
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
