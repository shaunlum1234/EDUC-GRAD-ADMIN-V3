<template>
  <div class="container">
    <h2>Admin Dashboard</h2>
    {{tabContent['job-1']}}
    
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
  <div class=" float-left p-0">
    <div>
       
      <b-card no-body>
        <b-tabs v-model="selectedTab" active card >
          <b-tab title="Job/Runs">
            <b-card-text class="row">
              <div :class="adminSelectedBatchId ? 'col-md-7':'col-12'">
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
                    <b-popover :target="'batch-job-id-btn'+ row.item.jobExecutionId" triggers="focus">
                      <template #title>Search batch job</template>
                      <b-btn :id="'batch-job-id-btn'+ row.item.jobExecutionId" variant='link' size="xs" @click="passBatchId(row.item.jobExecutionId)">   
                        All results           
                      </b-btn>
                    </b-popover>
                  </template>
                </DisplayTable>
              </div>
              <div v-if="adminSelectedBatchId" class="col-12 col-md-5 float-left pl-2 pr-0">
                <b-card bg-variant="light" :header="'Batch Job '+ this.adminSelectedBatchId" class="text-left mb-2">
                  <b-card-text>
                    <BatchJobSearchResults :selectedBatchId="adminSelectedBatchId"></BatchJobSearchResults>
                  </b-card-text>
                </b-card>
              </div>
            </b-card-text>
         </b-tab>
         <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="'Job ' + i">
           
           <div class="row">
              <div class="col-2">
                <label>Run Type</label>
                <div>
                  <b-form-select
                    id="inline-form-select-type"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    :options="[{ text: 'Choose...', value: null }, 'TVRRUN', 'REGALG', 'DISTRUN']"
                    :value="tabContent['job-'+i].details['what']"     
                    @change="editBatchJob('job-'+i,'what', $event)"       
                  ></b-form-select>
                </div>
                <div v-if="tabContent['job-'+i].details['what'] == 'DISTRUN'">
                <label>Credential Type</label>
                <b-form-select
                    id="inline-form-select-audience"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    :options="[{ text: 'Choose...', value: null }, 'Blank certificate print', 'Replacement certificate - no principal signature block', 'Reprint certificate – with principal signature block', 'Blank transcript print','Transcript']"
                    :value="tabContent['job-'+i].details['credential']"     
                    @change="editBatchJob('job-'+i,'credential', $event)"       
                  ></b-form-select>
                </div>                           
                <label>Group</label>
                <div>
                <b-form-select
                    id="inline-form-select-audience"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    :options="[{ text: 'Choose...', value: null }, 'Student', 'School', 'District', 'Program', 'Ministry of Advanced Education']"
                    :value="tabContent['job-'+i].details['who']"     
                    @change="editBatchJob('job-'+i,'who', $event)"       
                  ></b-form-select>
                </div>
                <div v-if="tabContent['job-'+i].details['what'] == 'DISTRUN'">
                <label>Copies</label>
                <b-form-input
                    type="number"
                    id="inline-form-select-audience"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    :value="tabContent['job-'+i].details['copies']"     
                    @change="editBatchJob('job-'+i,'copies', $event)"       
                  ></b-form-input>
                </div>                                 
              </div>
              <div class="col-10">
              <b-card v-if="tabContent['job-'+i].details['who']=='Student'" class="mt-3" header="Include Students">
              <b-alert dismissible v-if="validationMessage" :show="validationMessage" variant="danger">{{validationMessage}}</b-alert>
              <div class="row col-12 border-bottom mb-3">
                <div class="col-2"><strong>PEN</strong></div>
                <div class="col-3"><strong>Name</strong></div>
                <div class="col-2"><strong>Date of Birth</strong></div>
                <div class="col-3"><strong>School of Record</strong></div>   
              </div>
              <div v-for="(pen, index) in tabContent['job-' + i].students" :key="index" class="row pl-3 mb-1">
                <div v-if="!pen.dob" class="row col-12">
                  <b-form-input type="number" v-model="pen.value" class="col-2"/>
                  <b-form-input show=false disabled v-model="pen.name" :ref="'pen'+ 'job-'+ i + index" class="col-3"/>
                  <b-form-input show=false disabled v-model="pen.dob" :ref="'dob'+ 'job-'+ i + index" class="col-2"/>
                  <b-form-input show=false disabled v-model="pen.school" :ref="'school'+ 'job-'+ i + index" class="col-3"/>
                  <div v-if="index == tabContent['job-'+i].students.length-1" class="col-2">
                    <b-button  class="btn btn-primary" @click="addValueToTypeInBatchId('job-' + i,'students',pen.value,index)">
                    <b-spinner small v-if="validating"></b-spinner> Add Student 
                    </b-button>   
                  </div>
                </div>
                <div class="row col-12">
                  <div v-if="pen.dob" class="col-2">{{pen.value}}</div>
                  <div v-if="pen.dob" class="col-3">{{pen.name}}</div>
                  <div v-if="pen.dob" class="col-2">{{pen.dob}}</div>
                  <div v-if="pen.dob" class="col-3"> {{pen.school}}</div>   

                  <div v-if="index != tabContent['job-'+i].students.length-1" class="col-2" ><b-button  class="btn btn-primary" @click="deleteValueFromTypeInBatchId('job-' + i, 'students',pen.value)">
                    Remove
                  </b-button>
                  </div>
                </div>
    
               
                
              </div>
            <pre>Test PENS: 106900004     124304700      126604461       101005700</pre>
            </b-card>
             

            <b-card v-if="tabContent['job-'+i].details['who']=='School'" class="mt-3" header="Include Schools">
              <b-alert dismissible v-if="validationMessage" :show="validationMessage" variant="danger">{{validationMessage}}</b-alert>
              <div class="row col-12 border-bottom mb-3">
                  <div class="col-2"><strong>Mincode</strong></div>
                  <div class="col-3"><strong>School Name</strong></div>
                  <div class="col-2"><strong>District Name</strong></div>
                  <div class="col-3"><strong>Address</strong></div>   
              </div>
              <div v-for="(school, index) in tabContent['job-' + i].schools" :key="index" class="row pl-3 mb-1">
                <div v-if="!school.schoolName" class="row col-12">
                  <b-form-input type="number" v-model="school.value" class="col-2"/>
                  <b-form-input show=false disabled v-model="school.schoolName" :ref="'schoolName' + 'job-'+ i + index" class="col-3"/>
                  <b-form-input show=false disabled v-model="school.districtName" :ref="'districtName'+ 'job-'+ i + index" class="col-2"/>
                  <b-form-input show=false disabled v-model="school.address" :ref="'address'+ 'job-'+ i + index" class="col-3"/>
                  <div v-if="index == tabContent['job-'+i].schools.length-1" class="col-2">
                    <b-button  class="btn btn-primary" @click="addValueToTypeInBatchId('job-' + i,'schools',school.value,index)">
                    <b-spinner small v-if="validating"></b-spinner> Add School 
                    </b-button>   
                  </div>
                </div>
                <div class="row col-12">
                  <div v-if="school.value" class="col-2">{{school.value}}</div>
                  <div v-if="school.schoolName" class="col-3">{{school.schoolName}}</div>
                  <div v-if="school.districtName" class="col-2">{{school.districtName}}</div>
                  <div v-if="school.address" class="col-3"> {{school.address}}</div>   

                  <div v-if="index != tabContent['job-'+i].schools.length-1" class="col-2" ><b-button  class="btn btn-primary" @click="deleteValueFromTypeInBatchId('job-' + i, 'schools',school.value)">
                    Remove
                  </b-button>
                  </div>
                </div>
              </div>
            <pre>TEST Schools: 04343000 04399143 02222022 06161064 06161049</pre>

<!-- 
              <div  v-for="(school, index) in tabContent['job-' + i].schools" :key="index" class="row pl-3 mb-1">
                <b-input v-model="school.value" class="col-5"/>
                <b-button  v-show="index != tabContent['job-'+i].schools.length-1" class="col-2 delete-button btn btn-danger" @click="deleteValueFromTypeInBatchId('job-' + i, 'schools',school.value)">
                  Delete
                </b-button>
                <b-button v-show="index == tabContent['job-'+i].schools.length-1" class="col-2 btn btn-primary" @click="addValueToTypeInBatchId('job-' + i,'schools', school.value)">
                  Add School
                </b-button>

              </div> 
              <pre>04343000 04399143 02222022 06161064 06161049</pre>-->
            </b-card>


            <div v-if="tabContent['job-'+i].details['who']=='District'" class="float-left col-12">
       

              <b-card class="mt-3" header="Include Districts">
              <label class="col-12">School category</label>
               <b-form-select
                id="inline-form-select-type"
                class="col-8"
                :options="[{ text: 'Choose...', value: null }, '01 Public', '02 Independent', '03 Federally Operated Band School','04 Yukon School', '09 Offshore']"
                :value="tabContent['job-'+i].districts['categoryCode']"
                @change="editBatchJob('job-'+i,'categoryCode', $event)"
              ></b-form-select>


                  <b-alert dismissible v-if="validationMessage" :show="validationMessage" variant="danger">{{validationMessage}}</b-alert>
              <div class="row col-12 border-bottom">
                  <div class="col-2"><strong>Code</strong></div>
                  <div class="col-5"><strong>District Name</strong></div>

              </div>
              <div v-for="(district, index) in tabContent['job-' + i].districts" :key="index" class="row pl-3 mb-1">
                <div v-if="!district.districtName" class="row col-12">
                  <b-form-input type="number" v-model="district.value" class="col-2"/>
                  <b-form-input show=false disabled v-model="district.districtName" :ref="'districtName' + 'job-'+ i + index" class="col-5"/>
                  <div v-if="index == tabContent['job-'+i].districts.length-1" class="col-4">
                    <b-button  class="btn btn-primary" @click="addValueToTypeInBatchId('job-' + i,'districts',district.value,index)">
                    <b-spinner small v-if="validating"></b-spinner> Add District 
                    </b-button>   
                  </div>
                </div>
                <div class="row col-12">
                  <div v-if="district.value" class="col-2">{{district.value}}</div>
                  <div v-if="district.districtName" class="col-5">{{district.districtName}}</div>

                  <div v-if="index != tabContent['job-'+i].districts.length-1" class="col-2" ><b-button  class="btn btn-primary" @click="deleteValueFromTypeInBatchId('job-' + i, 'districts',district.value)">
                    Remove
                  </b-button>
                  </div>
                </div>
              </div>
            <pre>TEST districts: 061 062 063</pre>
   
                
              </b-card> 
            </div>
            <b-card v-if="tabContent['job-'+i].details['who']=='Program'" class="mt-3" header="Include Programs">
              Program:


             <b-form-checkbox-group
                multiple
                stacked
                :select-size="10"
                id="inline-form-select-audience"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="programOptions"
                value-field="programCode"
                text-field="programCode"
                :value="tabContent['job-'+i].details['who']"     
                @change="editBatchJob('job-'+i,'programs', $event)"      
              ></b-form-checkbox-group>
            </b-card>
            </div>       
            </div>
            <div class="col-2 float-left">
         <br>
            </div>
            <b-card v-if="tabContent['job-'+i].details['credential']=='Blank certificate print'" class="mt-3 col-10" header="Blank Certificate Details">
             <b-form-checkbox-group
                multiple
                stacked
                :select-size="10"
                id="inline-form-select-audience"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="certificateTypes"
                value-field="code"
                text-field="label"
                :value="tabContent['job-'+i].details['credentialDetails']"     
                @change="editBatchJob('job-'+i,'blankCertificateDetails', $event)"      
              ></b-form-checkbox-group>
            </b-card> 

           <b-card v-if="tabContent['job-'+i].details['credential']=='Blank transcript print'" class="mt-3 col-10" header="Blank Transcript Details">
             <b-form-checkbox-group
                multiple
                stacked
                :select-size="10"
                id="inline-form-select-audience"
                class="mb-2 mr-sm-2 mb-sm-0"
                :options="transcriptTypes"
                value-field="code"
                text-field="description"
                :value="tabContent['job-'+i].details['credentialDetails']"     
                @change="editBatchJob('job-'+i,'blankTranscriptDetails', $event)"      
              ></b-form-checkbox-group>
            </b-card>                
           

          <b-button size="sm" variant="danger" class="btn btn-danger float-right col-2 p-2" @click="closeTab(i)">
            Cancel
          </b-button>
          <b-button size="sm" variant="primary" class="btn btn-primary float-right col-2 p-2" @click="runbatch('job-'+i)">
            Run Batch
          </b-button>
        </b-tab>

        <!-- New Tab Button (Using tabs-end slot) -->
        <template #tabs-end>
          <b-nav-item role="presentation" @click.prevent="newBatchJob" href="#"><b>+</b></b-nav-item>
        </template>

        <!-- Render this if no tabs -->
        <template #empty>
          <div class="text-center text-muted">
            There are no open tabs<br>
            Open a new tab using the <b>+</b> button above.
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
import StudentService from "@/services/StudentService.js";
import TRAXService from "@/services/TRAXService.js";
import SchoolService from "@/services/SchoolService.js";
import GraduationCommonService from "@/services/GraduationCommonService.js";
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
      BatchJobSearchResults: BatchJobSearchResults
  },
  data() {
    return {
      validationMessage: "",
      validating: false,
      adminSelectedBatchId:"",
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
    this.transcriptTypes = this.getTranscriptTypes();
    this.certificateTypes = this.getCertificateTypes();
    
    //Vue.set(this.tabContent, this.tabCounter, { what: 'Flint', who:  stats: { goals: 10, assists: 10 }});
  },
  methods: { 
    getCertificateTypes() {
      GraduationCommonService.getCertificateTypes(this.token)
        .then((response) => {
        
          this.certificateTypes = response.data;
        })
        // eslint-disable-next-line
        .catch((error) => {
          this.$bvToast.toast("ERROR " + error.response.statusText, {
            title: "ERROR" + error.response.status,
            variant: "danger",
            noAutoHide: true,
          });
        });
    },
    getTranscriptTypes() {
      GraduationCommonService.getTranscriptTypes(this.token)
        .then((response) => {
          this.transcriptTypes = response.data;
        })
        // eslint-disable-next-line
        .catch((error) => {
          this.$bvToast.toast("ERROR " + error.response.statusText, {
            title: "ERROR" + error.response.status,
            variant: "danger",
            noAutoHide: true,
          });
        });
    },
    closeTab(x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] == x) {
          this.tabs.splice(i, 1);
          this.$store.commit("clearBatchDetails",i);
        }
      }
      
    },      
    addValueToTypeInBatchId(id, type, value, valueIndex){
      this.validationMessage = "";
      if(type == "schools"){
          this.validating = true;
          SchoolService.getSchoolInfo(value,this.token).then(
          (response) => {
            if(response.data.minCode){
              this.$store.commit("addValueToTypeInBatchId", {id,type, value});
              this.$refs['schoolName' + id + valueIndex][0].updateValue(response.data.schoolName);        
              this.$refs['districtName' + id + valueIndex][0].updateValue(response.data.districtName);        
              this.$refs['address' + id + valueIndex][0].updateValue(response.data.address1);        
            }else{
               this.validationMessage = value + " is not a valid School"
               this.deleteValueFromTypeInBatchId(id, type, value);
               this.addTypeToBatchId(id, type);
            }
            this.$forceUpdate();
            this.validating = false;  
            
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error)      
          this.validating = false;
        });
      }
      if(type == "students"){
        //remove duplicates
          this.validating = true;
          StudentService.getStudentByPen(value,this.token).then(
          (response) => {
            if(response.data.length > 0){
              this.$store.commit("addValueToTypeInBatchId", {id,type, value});
              this.$refs['pen' + id + valueIndex][0].updateValue(response.data[0].usualFirstName + " " + (response.data[0].usualMiddleNames?response.data[0].usualMiddleNames+ " ":"") + response.data[0].usualLastName);        
              this.$refs['dob' + id + valueIndex][0].updateValue(response.data[0].dob);        
              this.$refs['school' + id + valueIndex][0].updateValue(response.data[0].schoolOfRecordName);        
            }else{
               this.validationMessage = value + " is not a valid PEN"
               this.deleteValueFromTypeInBatchId(id, type, value);
               this.addTypeToBatchId(id, type);
            }
            this.$forceUpdate();
            this.validating = false;  
            
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error)      
          this.validating = false;
        });
      }
      if(type == "districts"){
        //remove duplicates
          this.validating = true;
          TRAXService.getDistrict(value,this.token).then(
          (response) => {
            if(response.data){
              this.$store.commit("addValueToTypeInBatchId", {id,type, value});
              this.$refs['districtName' + id + valueIndex][0].updateValue(response.data.districtName);        
              
            }else{
               this.validationMessage = value + " is not a valid District"
               this.deleteValueFromTypeInBatchId(id, type, value);
               this.addTypeToBatchId(id, type);
            }
            this.$forceUpdate();
            this.validating = false;  
            
          }
        ).catch((error) => {
          // eslint-disable-next-line
          console.log(error)      
          this.validating = false;
        });
      }      
      
    },
    
    addTypeToBatchId(id, type){
      this.$store.commit("addTypeToBatchId", {type, id});
      this.$forceUpdate();
    },
    
    deleteValueFromTypeInBatchId(id, type, value){
      this.$store.commit("deleteValueFromTypeInBatchId", {id,type, value});
      this.$forceUpdate();
    },
    deleteBatch(id){
      this.$store.commit("deleteStudentBatch", id);
    },
    clearBatchDetails: function (id) {
      this.$store.commit("clearBatchDetails", id);
    },

    addStudent: function (id) {
      this.$store.commit("addStudentToBatch", id);
      this.$forceUpdate();
    },
    addSchool: function (id) {
      this.$store.commit("addSchoolToBatch", id);
      this.$forceUpdate();
    },
    addDistrict: function (id) {
      this.$store.commit("addDistrictToBatch", id);
      this.$forceUpdate();
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
    editBatchJob(id,type,event){
      let batchDetail = this.tabContent[id];
      if(!batchDetail.details[type] && batchDetail.details[type] != event && event == "Blank certificate print" && event == "Blank transcript print" && type != "categoryCode"){
        
        this.clearBatchDetails(id)
      }
      if(type=="programs" || type =="blankTranscriptDetails" || type=="blankCertificateDetails"){
        batchDetail[type] = event;
      }else{
        batchDetail.details[type] = event;
      }

      this.$store.commit("editBatchDetails", {batchDetail, id});
      this.$forceUpdate();
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
    runbatch(id){
      
      if(!this.checkBatchForErrors(id)){
        this.$bvToast.toast('Running: ' + id, {
          title: this.tabContent[id].details['who'] + " " + this.tabContent[id].details['what'] + this.tabContent[id].details['who'],
          variant: 'success',
          noAutoHide: true,
        });
        this.selectedTab = 0;
        setTimeout(()=>{
          let batchJob = {"createUser":"-","createDate":"2022-02-23T07:01:09.000+00:00","updateUser":"-","updateDate":"-","jobExecutionId":"5xxx","startTime":"2022-02-23T07:00:00.643+00:00","endTime":"2022-02-23T07:01:09.529+00:00","expectedStudentsProcessed":"?","actualStudentsProcessed":"?","failedStudentsProcessed":"?","status":"RUNNING","triggerBy":"BATCH", "_rowVariant":"success"}
          batchJob.jobType = this.tabContent[id].details['what'];
          this.batchInfoListData.splice(0,0,batchJob);
          this.closeTab(id.replace("job-",""));
        },1000);
      }


    },
    displaySearchResults(value){ 
      this.searchResults = value
    },
    passBatchId(value) {
      this.adminSelectedBatchId = value.toString();
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
      programOptions: "getProgramOptions"
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
