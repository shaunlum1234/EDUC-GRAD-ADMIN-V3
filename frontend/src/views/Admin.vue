<template>
  <div class="container">
    <h2>Admin Dashboard</h2>
<SiteMessage v-bind:message="this.displayMessage" v-if="displayMessage"></SiteMessage>
<!-- Dashboard data: {{dashboardData}} -->
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
              <!-- <a href="#">View Errors</a> -->
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
                <!-- <strong>Time Per Record:</strong> {{timePerRecord}}               -->
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
                <!-- <template #cell(updateDate)="data">
                   {{data.item.updateDate|formatTime}})
                </template>    -->
               
              </DisplayTable>
                <!-- <b-table small striped :items="jobs" :fields="jobFields" :tbody-tr-class="rowClass">
                 <template #cell(view)="data">
                  <div>
                    
                    <b-button v-b-modal="'modal-' + data.item.id">View</b-button>
                    
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
              </b-table> -->

            </b-card-text>
         </b-tab>
          <!--  <b-tab title="Errors (32)">
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
          </b-tab> -->
          <!-- <b-tab title="Last Run Details" class="p-2 m-0">
            <b-card-text>
              <b-table small striped :items="items" :fields="fields" :tbody-tr-class="rowClass">
                 <template #cell(view)="data">
                  <div>
          
                    <b-button v-b-modal="'modal-' + data.item.id">View</b-button>

      
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
                     -->
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
      <!-- <b-card bg-variant="Placeholder" header="Placeholder 2" class="text-left mb-2">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>             -->
    </div>
    <!-- <SearchForm v-on:searchResults="displaySearchResults" searchAPI="searchSchools" :searchAPIFields="searchAPIFields"></SearchForm>
    <DisplayTable v-if="searchResults" :items="searchResults" :fields="schoolFields" title="schoolsearch" ></DisplayTable> -->
   </div>  


    <!-- <b-card-group deck>
      <b-card class="text-center m-1">
        <b-card-text><i class="fas fa-times-circle text-danger h2" aria-hidden="true"></i><h3>231/232</h3></b-card-text>
      </b-card>
            <b-card class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2" aria-hidden="true"></i><h3>175/175</h3></b-card-text>
      </b-card>
      <b-card class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2" aria-hidden="true"></i><h3>0</h3></b-card-text>
      </b-card>
      <b-card  class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2" aria-hidden="true"></i><h3>81/81</h3></b-card-text>
      </b-card>
      <b-card class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2" aria-hidden="true"></i><h3>100/100</h3></b-card-text>
      </b-card>                                      
    </b-card-group>
  </div>
  <div class="mt-3">
    <b-card-group deck>
      <b-card header="1986" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2" aria-hidden="true"></i><h3>232/232</h3></b-card-text>
      </b-card>
            <b-card header="2018-PF" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2" aria-hidden="true"></i><h3>175/175</h3></b-card-text>
      </b-card>
      <b-card header="1950" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2" aria-hidden="true"></i><h3>0</h3></b-card-text>
      </b-card>
      <b-card header="SCCP" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h2" aria-hidden="true"></i><h3>81/81</h3></b-card-text>
      </b-card>
      <b-card header="2004-PF" class="text-center m-1">
        <b-card-text><i class="fas fa-times-circle text-danger h2" aria-hidden="true"></i><h3>100/200</h3></b-card-text>
      </b-card> 
    </b-card-group>
  </div> 
  <div>-->
    
  </div>

</div>
 
</template>

<script>
// @ is an alias to /src
//import SearchForm from "@/components/SearchForm.vue"
//import { store } from "@/store.js";
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
            key: 'updateUser',
            label: 'Update user',
            sortable: true,
            class: 'text-left',
            editable: true,
           
          },    
          {
            key: 'triggerBy',
            label: 'Trigger ID',
            sortable: true,
            class: 'text-left',
            editable: true
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
      // value.toLocaleString('en-CA', { timeZone: 'PST' })
      // return value;
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
      // setTimeout(() => this.processingTime="8s", 10000);
      setTimeout(() => this.timespan="6:00pm to 6:01pm", 10000);
      setTimeout(() => this.errors=3, 10000);
      // setTimeout(() => this.processedLastRun="Just now", 10000);    
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
