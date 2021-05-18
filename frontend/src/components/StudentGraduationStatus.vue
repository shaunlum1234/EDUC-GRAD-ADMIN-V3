<template>
  <div class="p-2">
    <div class="row">
      <div class="col-12">
        <b-card  header="Graduation Information" class="col-12" no-body v-if="studentGradStatus != 'not loaded' && !hasGradStatus">
          <b-card-body>
            <b-card-text>
              <div v-if="!hasGradStatus">
                {{studentFullName.legalFirstName }} found on the PEN database <strong>but does not have a GRAD system record</strong>
              </div>
            </b-card-text>
          </b-card-body>
        </b-card>
      </div>
    </div>

    <div class="row">
      <!-- Left col -->
      
      <div class="col-12 pr-0 col-md-6 ">
          <div class="graduation-status">
          <b-card
            no-body
            header="GRAD status"
          >

            <b-card-text class="p-3">
              
                <b-button-group v-if="this.role =='administrator'" class="gradstatus-actions float-right">
                  <div v-if="!showEdit">
                    <b-link href="#" class="edit" v-on:click="editGradStatus" size="sm" variant="primary">
                        Edit 
                    </b-link>
                  </div>
                  <div v-if="showEdit">
                    <b-button-group>
                      <b-button  :disabled="disableSaveButton" v-on:click="editGraduationStatus(studentId)" size="sm" variant="primary">Save</b-button>

                      <b-button v-on:click="cancelGradStatus"  size="sm" variant="outline-primary">Cancel</b-button>
                    </b-button-group>
                    <!--b-btn :disabled="disableButton" v-on:click="editGraduationStatus(studentId)" size="sm" variant="primary">
                        Save 
                    </b-btn>
                    <b-btn v-on:click="cancelGradStatus"  size="sm" variant="outline-primary">
                      Cancel
                    </b-btn-->
      
                  </div>
                </b-button-group>

                <div v-if="studentGradStatus && studentGradStatus.programCompletionDate && showEdit">
                  <b-alert show variant="info" class="p-3 mb-1">
                    <h4 class="alert-heading">GRAD RECORD LOCKED</h4>
                    <p class="locked-message">
                      This student has graduated and this record cannot be edited unless a ungrad reason is provided.
                    </p>
                    <hr>
                    <p class="mb-0">
                      <strong>Ungrad Reason:</strong><b-form-select  size="sm" v-model="studentUngradReason" :options="ungradReasons" text-field="description" value-field="code"></b-form-select>
                      <b-button :disabled='!studentUngradReason' @click="ungradStudent" variant="primary" size="sm" class="mt-2">Ungrad Student</b-button>
                    </p>
                  </b-alert>
                </div>

                <div v-else-if="studentGradStatus && studentGradStatus.studentStatus == 'N' && showEdit">
                  <b-alert show variant="info" class="p-3 mb-1">
                    <h4 class="alert-heading">GRAD record not active</h4>
                    <p class="locked-message">
                      This student is 'Not Active'. Re-activate by setting their status to 'Active' if they are currently attending school
                    </p>
                  </b-alert>
                </div>    
                <div v-else-if="studentGradStatus && studentGradStatus.studentStatus == 'T' && showEdit">
                  <b-alert show variant="info" class="p-3 mb-1">
                    <h4 class="alert-heading">GRAD record terminated</h4>
                    <p class="locked-message">
                      This student is 'Terminated'. Re-activate by setting their status to 'Active' if they are currently attending school
                    </p>
                    <hr>
                  </b-alert>
                </div>    
                <div v-else-if="studentGradStatus && studentGradStatus.studentStatus == 'D' && showEdit">
                  <b-alert show variant="info" class="p-3 mb-1">
                    <h4 class="alert-heading">GRAD record status: Deceased</h4>
                    <p class="locked-message">
                      This student is showing as 'Deceased'. Student GRAD data cannot be updated for students with a status of 'Deceased'.
                    </p>
                  </b-alert>
                </div>          
                <div v-else-if="studentGradStatus && studentGradStatus.studentStatus == 'M' && showEdit">
                  <b-alert show variant="info" class="p-3 mb-1">
                    <h4 class="alert-heading">GRAD record merged</h4>
                    <p class="locked-message">
                      "Cannot edit students with a status of 'Merged'
                    </p>
                  </b-alert>
                </div>                                                    

                <table class="table  table-hover table-sm" >
                  <tbody>
                  <tr v-if="!showEdit">
                    <td width="50%" ><strong>Program: </strong></td>
                    <td width="50%"><span v-b-tooltip.hover title="Program">{{ studentGradStatus.program }}</span></td>
                  </tr>
  
                  <tr v-if="showEdit">
                    <td width="50%"><strong>Program: </strong>
                      <div v-if="editedGradStatus.program == '1950-EN'">
                        <div class="form-validation-message text-danger" v-if="!(editedGradStatus.studentGrade == 'AD' || editedGradStatus.studentGrade == 'AN')">Student grade should be one of <strong>AD or AN</strong> if the student program is 1950</div>
                      </div>   
                    </td>
                    <td width="50%"><b-form-select :disabled="disableInput" size="sm" v-model="editedGradStatus.program" :options="programOptions"></b-form-select></td>   
                    
                  </tr>
                  <tr>
                    <td><strong>Program completion date: </strong></td>
                    <td>{{ studentGradStatus.programCompletionDate }}</td>
                  </tr>
            
                  
                  <tr v-if="!showEdit">
                    <td><strong>Student status: </strong></td>
                    <td><span v-if="studentGradStatus.studentStatus">{{ studentGradStatus.studentStatusName}}</span></td>
                  </tr>                     
                  <tr v-if="showEdit">
                    <td><strong>Student status: </strong></td>
                    <td class="p-1 "><b-form-select 
                        size="sm"
                        v-model="editedGradStatus.studentStatus"
                        :options="studentStatusOptions"
                        :disabled="disableStudentStatus"
                      ></b-form-select>
                    </td>
                  </tr>
              
                  <tr v-if="!showEdit">
                    <td><strong>Student grade: </strong></td>
                    <td><span v-if="studentGradStatus.studentGrade">{{ studentGradStatus.studentGrade }}</span></td>
                  </tr>
                  <tr v-if="showEdit">
                      <td><strong>Student grade: </strong>
                        <div v-if="editedGradStatus.program != '1950-EN'">
                          <div class="form-validation-message text-danger" v-if="editedGradStatus.studentGrade == 'AD' || editedGradStatus.studentGrade == 'AN'">Student grade should not be AD or AN for this program</div>
                        </div> 
                         
                      </td>
                      <td><b-form-select 
                        size="sm"
                        v-model="editedGradStatus.studentGrade"
                        :options="gradeOptions"
                        :disabled="disableInput"
                      ></b-form-select>
                      </td>
                  </tr>
                  
                  <tr v-if="!showEdit">
                    <td><strong>School of record: </strong></td>
                    <td><b-button v-if="studentGradStatus.schoolOfRecord" 
                      class="p-0"
                      id="school-of-record-popover" 
                      variant="link" 
                      @click="getSchoolInfo(studentGradStatus.schoolOfRecord, 'schoolOfRecord')"> 
                      {{studentGradStatus.schoolOfRecord}}
                    </b-button>
                    <b-popover   
                      :boundary-padding="50" 
                      delay=800
                      target="school-of-record-popover"  
                      title="School Information"
                      triggers="focus"
                      v-if="studentGradStatus.schoolOfRecord" >
                      <table>
                        <tbody>
                        <tr>
                          <td><strong>District:</strong> {{schoolOfRecord.districtName}}</td>
                        </tr>
                        <tr>
                          <td><strong>School name:</strong> <br> {{schoolOfRecord.schoolName}}</td>
                        </tr> 
                          <tr>                        
                          <td><strong>Status: </strong> {{ schoolOfRecord.openFlag == 'Y' ? 'Open': 'Closed' }}</td>
                        </tr>
                          <tr>                        
                          <td><strong>Independent type:</strong> {{schoolOfRecord.independentDesignation}}</td>
                        </tr>
                          <tr>                        
                          <td><strong>Independent affiliation:</strong> {{schoolOfRecord.independentAffiliation}}</td>
                        </tr>
                          <tr>                        
                          <td><strong>Transcript eligible:</strong> {{schoolOfRecord.transcriptEligibility}}</td>
                        </tr>
                        <tr>                        
                          <td><strong>Dogwood eligibility:</strong> {{schoolOfRecord.certificateEligibility}}</td>
                        </tr>
                        </tbody>
                        
                      </table>
                      <!-- <b-button class="px-1" @click="popClose">Close</b-button> -->
                    </b-popover>                       
                    </td>
                  </tr>
                  <tr v-if="showEdit">
                      <td><strong>School of record:</strong><br>
                        <div v-if="schoolOfRecordWarning" class="form-validation-message text-warning" >School of record entered is closed&nbsp;&nbsp;<i class="fas fa-exclamation-triangle"></i></div>
                      </td>
                      <td><b-input :disabled="disableInput" size="sm" type="number" v-model='editedGradStatus.schoolOfRecord'></b-input></td>
                      
                  </tr>
                  <tr v-if="!showEdit">
                    <td><strong>School at graduation: </strong></td>
                    <td><b-button v-if="studentGradStatus && studentGradStatus.schoolAtGrad" 
                      class="p-0"
                      id="school-at-graduation-popover"
                      variant="link" 
                      @click="getSchoolInfo(studentGradStatus.schoolAtGrad, 'schoolAtGrad')"> 
                      {{studentGradStatus.schoolAtGrad}}
                    </b-button>
                    <b-popover
                    v-if="studentGradStatus && studentGradStatus.schoolAtGrad" 
                      :boundary-padding="50"
                      delay=800
                      target="school-at-graduation-popover"
                      title="School Information"
                      triggers="focus">
                      <table>
                        <tr>
                          <td><strong>District:</strong> {{schoolAtGraduation.districtName}}</td>
                        </tr>
                        <tr>
                          <td><strong>School name:</strong> <br> {{schoolAtGraduation.schoolName}}</td>
                        </tr> 
                          <tr>                        
                          <td><strong>Status:</strong> {{schoolAtGraduation.openFlag == 'Y' ? 'Open': 'Closed'}}</td>
                        </tr>
                          <tr>                        
                          <td><strong>Independent type:</strong> {{schoolAtGraduation.independentDesignation}}</td>
                        </tr>
                          <tr>                        
                          <td><strong>Independent affiliation:</strong> {{schoolAtGraduation.independentAffiliation}}</td>
                        </tr>
                          <tr>                        
                          <td><strong>Transcript eligible:</strong> {{schoolAtGraduation.transcriptEligibility}}</td>
                        </tr>
                        <tr>                        
                          <td><strong>Dogwood eligibility:</strong> {{schoolAtGraduation.certificateEligibility}}</td>
                        </tr>               
                      </table>
                    </b-popover> </td>
                    </tr>    
                    <tr v-if="showEdit">
                      <td><strong>School at graduation:</strong></td>
                      <td>{{editedGradStatus.schoolAtGrad}}</td>          
                    </tr>        
                    <tr>
                      <td><strong>Honours:</strong></td>
                      <td><span v-if="studentGradStatus.honoursStanding"> {{ studentGradStatus.honoursStanding }}</span></td>
                    </tr>
                    <tr>
                      <td><strong>GPA:</strong></td><td><span v-if="studentGradStatus.gpa">{{ studentGradStatus.gpa }}</span></td>
                    </tr>
                    </tbody>
                  </table> 
              </b-card-text>
            </b-card>
          </div> 

          <!-- CERTIFICATION DOGWOODS -->           
          <div class="certification-dogwoods">
            <b-card
              header="Certification/Dogwoods"
              no-body
             
            >
              <b-card-text class="p-4">
              
                <strong>Certificate #1:</strong>
                <div v-if="studentGradStatus.certificateType1">
                  {{ studentGradStatus.certificateType1 }}
                </div>
                <div v-if="studentGradStatus.certificateType1Date">
                  <strong>Date obtained:</strong>
                  {{ studentGradStatus.certificateType1Date }}
                </div>
              </b-card-text>
            </b-card> 
          </div>  


          <!-- SPECIAL PROGRAMS --> 
          <div class="special-programs">
            
            <b-card
              header="Special programs"
              no-body
            >
              <b-card-text class="p-3" v-if="specialPrograms[0] && specialPrograms[0].studentSpecialProgramData">
                <b-table :items="specialPrograms" :fields="specialProgramsfields" small striped>
                </b-table>
                <h4>Requirements Met</h4>
                <hr>
                <div v-if="specialPrograms[0].studentSpecialProgramData.specialRequirementsMet === null">No Requirements have been met</div>
                <b-table v-else :items="specialPrograms[0].studentSpecialProgramData.specialRequirementsMet" sortBy='gradReqMetDetail'>
                </b-table>
                
                <h4>Requirements Not Met</h4><hr>
                <div v-if="specialPrograms[0].studentSpecialProgramData.specialNonGradReasons === null">All graduation requirements have been met</div>
                <b-table v-else :items="specialPrograms[0].studentSpecialProgramData.specialNonGradReasons" sortBy='gradReqMetDetail'>
                </b-table>
              </b-card-text>
            </b-card>
          </div>
          <!-- GRADUATION REPORTS -->
          <div class="graduation-reports">
            <b-card
              header="Graduation reports"
            >
              <b-card-text>
                  <div>
                    <i class="fas fa-file"></i>
                    <a v-on:click="getStudentAchievementReportPDF" href="#" class="pl-3">Achievement Report (PDF)</a>
                   </div>
                  <div>
                    <i class="fas fa-file"></i>
                      <a v-on:click="getStudentTranscriptPDF" href="#" class="pl-3">Transcript (PDF)</a>
                  </div>
                 
              </b-card-text>
            </b-card>       
            
          </div>
      </div>
      <!-- Right Column -->
      <div class="col-12 pl-3 col-md-6"> 

        <div class="requirements-met-and-not-met">
   
          <div class="requirements-met">
            <b-card
              header="Requirements met"
              v-if="studentGradStatus.studentGradData"
              no-body
              class="w-100"
            >
              <b-card-text class=" m-3">
                <b-table  
                  :items="studentGradRequirementCourses"
                  :fields="requirementsMetfields"
                  small
                  striped
                  
                  filter=null
                  :filter-function="filterGradReqCourses"
                  class="requirements-met">  
                </b-table>
                
              </b-card-text>
            </b-card>
           
          </div>

          
          <div class="requirements-not-met">
            <b-card
              header="Non-GRAD reasons"
              class="w-100"
            >
              <b-card-text v-if="studentGradStatus.studentGradData">
               
                <div v-if="!studentGradStatus.studentGradData.nonGradReasons">
                  <ul>
                    <li>All graduation requirements have been met</li>
                  </ul>
                </div>
                <div v-if="studentGradStatus.studentGradData.nonGradReasons">
                  <b-table :items="studentGradStatus.studentGradData.nonGradReasons" :fields="{key:'rule', key:'description'}"  small
                  striped></b-table> 
                  <!-- <ul  class="non-grad-reasons px-0">
                    <li v-for="requirement in studentGradStatus.studentGradData.nonGradReasons" :key="requirement.rule">
                      {{ requirement.description }} (Rule
                      {{ requirement.rule }})
                    </li>
                  </ul> -->
                </div>
              </b-card-text>
            </b-card>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="graduation-actions">
        <b-card
            header="GRAD Actions"
          >
            <b-card-text v-if="studentGradStatus.studentGradData">
            <div v-if="hasGradStatus" class="text-left mb-3">
              <strong>Created by:</strong> {{ studentGradStatus.createdBy }}
              <strong>Created:</strong> {{ studentGradStatus.createdTimestamp }}
              
              <strong>Updated by:</strong> {{ studentGradStatus.updatedBy }}
              <strong>Updated:</strong> {{ studentGradStatus.updatedTimestamp }}
            </div>
            <div class="row">
              <div class="col-2">
                <a href="#" @click="projectGraduationStatus(studentPen)" class="float-left">
                  <i class="fas fa-eye"></i> Projected<br> Graduation Status
                </a>
                <b-modal id="modal-1" size="lg" class="float-left">
                  <div v-if="showModal" class="row col-12">
                        PROJECTED GRAD STATUS
                  </div>
                </b-modal>
              </div>
              <div class="col-2">
                <a href="#" v-on:click="updateGraduationStatus(studentPen)" class="">
                  <i class="fas fa-sync"></i> Run Graduation<br>Algorithm
                </a>
              </div>
            </div>
                
    

            </b-card-text>
          </b-card>

        </div>     
    </div>
    <div v-if="role == 'administrator'">
      <b-button v-b-toggle.collapse-1 variant="primary">DEBUG</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
             
                    <strong>Program completion date (June, 2018): </strong>
                    <b-input :disabled="disableInput" size="sm" max="9999-12" type="month" pattern="[0-9]{4}-[0-9]{2}" v-model='editedGradStatus.programCompletionDate'></b-input>   
              

                    <strong>School at graduation:</strong>
                     <b-input :disabled="disableInput" size="sm" type="number" :required="reqProgramCompletionSchoolAtGrad" v-model='editedGradStatus.schoolAtGrad'></b-input>
          <pre>{{ JSON.stringify(studentGradStatus, null, '\t') }}</pre>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GraduationCommonService from "@/services/GraduationCommonService.js";
import GraduationService from "@/services/GraduationService.js";
import GraduationStatusService from "@/services/GraduationStatusService.js";
import SchoolService from "@/services/SchoolService.js";

export default {
  name: "StudentGraduationStatus",
  components: {},
  computed: {
    studentGradeChange(){
      return this.editedGradStatus.studentGrade;
    },
    programCompletionDateChange(){
      return this.editedGradStatus.programCompletionDate;
    },
    schoolOfRecordChange(){
      return this.editedGradStatus.schoolOfRecord;
    },
    schoolAtGradChange(){
      return this.editedGradStatus.schoolAtGrad;
    },
    programChange(){
      return this.editedGradStatus.program;
    },
    disableSaveButton(){
      return this.studentGradStatus.studentStatus == "D" || this.studentGradStatus.programCompletionDate
    },
    ...mapGetters({
      studentGradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      studentGradRequirementCourses: "gradStatusCourses",
      studentPen: "getStudentPen",
      studentFullName: "getStudentFullName",
      token: "getToken",
      role: "getRoles",
      specialPrograms: "getStudentSpecialPrograms",
      programOptions: "getProgramOptions",
      studentStatusOptions: "getStudentStatusOptions",
      studentId: "getStudentId",
      ungradReasons: "getUngradReasons",
      username: "getUsername"
    }),
  },
  data() {
    return {
      requirementsMetfields: [
        { key: "gradReqMetDetail", label: "Requirement Code", sortable: true },
        { key: "courseName", label: "Course Name" },
        { key: "sessionDate", label: "Session" },
      ],
      requirementsNotMetfields: [
        { key: "gradReqMetDetail", label: "Requirement Code" },
        { key: "courseName", label: "Course Name" },
      ],
      specialProgramsfields: [
        { key: "specialProgramCode", label: "Code", class: "text-center"},
        { key: "specialProgramName", label: "Special Program" },
        { key: "specialProgramCompletionDate", label: "Date" },
      ],
      dismissSecs: 3,
      dismissCountDown: 0,
      showModal: false,
      showTop: false,
      showEdit: false,
      show: false,
      projectedStudentGradStatus: [],
      updateStatus: [],
      schoolOfRecord: "",
      schoolOfRecordStatus:"",
      schoolOfRecordWarning: false,
      schoolAtGraduation: "",
      schoolAtGraduationStatus:"",
      schoolAtGraduationWarning: false,
      programDropdownList: [],
      editedGradStatus: {},
      studentUngradReason: "",
      disableButton:false,
      reqProgramCompletionSchoolAtGrad:true,
      disableInput:false,
      disableStudentStatus:false,
      gradeOptions: [
        { text: "08", value: "8" },
        { text: "09", value: "9" },
        { text: "10", value: "10" },
        { text: "11", value: "11" },
        { text: "12", value: "12" },
        { text: "HS - Homeschool", value: "HS" },
        { text: "GA - Graduated Adult", value: "GA" },
        { text: "SU - Secondary Upgraded", value: "SU" },
        { text: "OT - Other", value: "OT" },
        { text: "AD - Adult expected to graduate", value: "AD" },
        { text: "AN - Adult not expected to graduate", value: "AN" },     
      ],
    };
  },
  created() {
    this.programDropdownList = this.$store.dispatch("getGraduationPrograms");
    this.disableButton = false;


  },
  watch:{
    studentGradeChange:function(){
      if(this.editedGradStatus.studentGrade == 'AD' || this.editedGradStatus.studentGrade == 'AN'){
        if(this.editedGradStatus.program == '1950-EN'){
          this.disableButton = false;
        }
        if(this.editedGradStatus.program != '1950-EN'){
          this.disableButton = true;
        }
      }
      if(this.editedGradStatus.studentGrade != 'AD' && this.editedGradStatus.studentGrade != 'AN'){
        if(this.editedGradStatus.program == '1950-EN'){
          this.disableButton = true;
        }else{
          this.disableButton = false;
        }
      }
    },
    programChange:function(){
       if(this.editedGradStatus.program == '1950-EN'){
        if(this.editedGradStatus.studentGrade == 'AD' || this.editedGradStatus.studentGrade == 'AN'){
          this.disableButton = false;
        }else{
          this.disableButton = true;
        }
      }
      if(this.editedGradStatus.program != '1950-EN'){
        if(this.editedGradStatus.studentGrade == 'AD' || this.editedGradStatus.studentGrade == 'AN'){
          this.disableButton = true;
        }else{
          this.disableButton = false;
        }
      }
    },
    programCompletionDateChange:function(){
      if(this.editedGradStatus.programCompletionDate == ""){
        this.reqProgramCompletionSchoolAtGrad = false;
        if(this.editedGradStatus.schoolAtGrad == ""){
          this.disableButton = false
        }else{
          this.disableButton = true
        }
      }
      if(this.editedGradStatus.programCompletionDate != ""){
        this.reqProgramCompletionSchoolAtGrad = true;
      }
    },
    schoolOfRecordChange:function(){
      if(this.editedGradStatus.schoolOfRecord) {
        if(this.editedGradStatus.schoolOfRecord.length == 8) {
          SchoolService.getSchoolInfo(this.editedGradStatus.schoolOfRecord, this.token)
          .then((response) => {
            this.schoolOfRecordStatus = response.data.openFlag
            if(this.schoolOfRecordStatus == "N"){
              this.schoolOfRecordWarning = true;
              this.showNotification("warning", "School of record closed");
            }else{
              this.schoolOfRecordWarning = false;
            }
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log("There was an error:" + error.response);
          });
        }  
      }
    },
    schoolAtGradChange:function(){
      if(this.editedGradStatus.schoolAtGrad == "" && this.editedGradStatus.programCompletionDate != ""){
        this.disableButton = true
      }else{
        this.disableButton = false
      }
      if(this.editedGradStatus.schoolAtGrad) {
        if(this.editedGradStatus.schoolAtGrad.length == 8) {
          SchoolService.getSchoolInfo(this.editedGradStatus.schoolAtGrad, this.token)
          .then((response) => {
            this.schoolAtGraduationStatus = response.data.openFlag
            if(this.schoolAtGraduationStatus == "N"){
              this.schoolAtGraduationWarning = true;
              this.showNotification("warning", "School at graduation closed");
            }else{
              this.schoolAtGraduationWarning = false;
            }
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log("There was an error:" + error.response);
          });
        } 
      }
    }  
  },
  methods: {
    
    getStudentStatus(code) {
      var i = 0;
      for (i = 0; i <= this.studentStatusOptions.length; i++) {
        if (this.studentStatusOptions[i].value == code) {
          return this.studentStatusOptions[i].text;
        }
      }
      return "";
    },
    filterGradReqCourses(row) {
      if (row.gradReqMet.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    showNotification(variant = null, bodyContent) {
      let title = variant;
      let delay = 30000;
      if(title == "success"){
        title ="success";
        delay = 5000;
      }else if(title == "danger"){
        title ="Error";
      }else if(title == "warning"){
        title ="Warning";
      }
      this.$bvToast.toast(bodyContent, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: delay,
      });

    },
    reactivateStudentRecord(){
        this.editedGradStatus.studentStatus = "A";
        this.editGraduationStatus(this.studentId);
        this.showNotification(
               "success",
               "Student Record re-activated."
             );
        },
    editGradStatus() {
      //If the student has a programCompletionDate disable input fields

      if(this.studentGradStatus.programCompletionDate != null){
        this.disableInput = true;
        this.disableStudentStatus = true;
      }else{
        this.disableInput = false;
        this.disableStudentStatus = false;
      }
      if(this.studentGradStatus.studentStatus == 'M'){
        this.disableInput = true;
        this.disableStudentStatus = true;
      }
      else if(this.studentGradStatus.studentStatus == 'T'){
        this.disableInput = false;
        this.disableStudentStatus = false;
      }
      else if(this.studentGradStatus.studentStatus == 'N'){
        this.disableInput = false;
        this.disableStudentStatus = false;
        
      }
      else if(this.studentGradStatus.studentStatus == 'D'){
        this.disableInput = true;
        this.disableStudentStatus = true;
        
        
      }
      this.showEdit = true;  
      if(this.studentGradStatus.programCompletionDate){
        this.$set(this.editedGradStatus, 'programCompletionDate', new Date(this.studentGradStatus.programCompletionDate).toISOString().slice(0, 7));
      }else{
        this.$set(this.editedGradStatus, 'programCompletionDate', null);
      }
      this.$set(this.editedGradStatus, 'pen', this.studentGradStatus.pen);
      this.$set(this.editedGradStatus, 'program', this.studentGradStatus.program);
      this.$set(this.editedGradStatus, 'studentGrade', this.studentGradStatus.studentGrade);
      this.$set(this.editedGradStatus, 'schoolOfRecord', this.studentGradStatus.schoolOfRecord);
      this.$set(this.editedGradStatus, 'schoolAtGrad', this.studentGradStatus.schoolAtGrad);
      this.$set(this.editedGradStatus, 'studentStatus', this.studentGradStatus.studentStatus);
      this.$set(this.editedGradStatus, 'studentID', this.studentGradStatus.studentID);
      this.$set(this.editedGradStatus, 'gpa', this.studentGradStatus.gpa);
      this.$set(this.editedGradStatus, 'honoursStanding', this.studentGradStatus.honoursStanding);
    },
    cancelGradStatus() {
      this.showEdit = false;
      this.studentUngradReason = "";   
    },
    ungradStudent(){
      GraduationStatusService.ungradStudent(
        this.studentId,
        this.studentUngradReason,
        
        this.token,this.editedGradStatus
      )
        .then((response) => {
          this.updateStatus = response.data;
          this.studentGradStatus.pen = response.data.pen;
          this.studentGradStatus.program = response.data.program;
          this.studentGradStatus.programCompletionDate = response.data.programCompletionDate;
          this.studentGradStatus.honoursStanding = response.data.honoursStanding;
          this.studentGradStatus.gpa = response.data.gpa;
          this.studentGradStatus.studentGrade = response.data.studentGrade;
          this.studentGradStatus.schoolOfRecord = response.data.schoolOfRecord;
          this.studentGradStatus.studentStatus = response.data.studentStatus;
          this.studentGradStatus.studentStatusName = this.getStudentStatus(
            response.data.studentStatus
          );
          this.studentGradStatus.schoolAtGrad = response.data.schoolAtGrad;

          this.showTop = !this.showTop;
          this.showEdit = false;

          this.showNotification("success", "GRAD Status Saved");
          
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error.response);
          this.showNotification(
            "danger",
            "There was an error: " + error.response.data.messages[0].message
          );

          //console.log('There was an error:' + error.response);
        });
    },
    editGraduationStatus(id) {
      //add the user info
      var current = new Date().toISOString().slice(0, 10)
      this.editedGradStatus.createdBy = this.username;
      this.editedGradStatus.createdTimestamp = current;
      this.editedGradStatus.studentID = id;
      this.editedGradStatus.pen = this.studentPen;
      this.editedGradStatus.recalculateGradStatus = this.recalculateGradStatus;
      //process the program completion date
      if(this.editedGradStatus.programCompletionDate == ''){
        this.editedGradStatus.programCompletionDate = null;
      }
      if(this.editedGradStatus.programCompletionDate != null){
        this.editedGradStatus.programCompletionDate = this.editedGradStatus.programCompletionDate.concat("-01");
      }
      if(this.editedGradStatus.schoolAtGrad == ''){
        this.editedGradStatus.schoolAtGrad = null;
      }

      GraduationStatusService.editGraduationStatus(
        id,
        this.token,
        this.editedGradStatus
      )
        .then((response) => {
          this.updateStatus = response.data;
          this.studentGradStatus.pen = response.data.pen;
          this.studentGradStatus.program = response.data.program;
          this.studentGradStatus.programCompletionDate = response.data.programCompletionDate;
          this.studentGradStatus.honoursStanding = response.data.honoursStanding;
          this.studentGradStatus.gpa = response.data.gpa;
          this.studentGradStatus.studentGrade = response.data.studentGrade;
          this.studentGradStatus.schoolOfRecord = response.data.schoolOfRecord;
          this.studentGradStatus.studentStatus = response.data.studentStatus;
          this.studentGradStatus.studentStatusName = this.getStudentStatus(
            response.data.studentStatus
          );
          this.studentGradStatus.schoolAtGrad = response.data.schoolAtGrad;

          this.showTop = !this.showTop;
          this.showEdit = false;

          this.showNotification("success", "GRAD Status Saved");
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error.response);
          this.showNotification(
            "danger",
            "There was an error: " + error.response.data.messages[0].message
          );

          //console.log('There was an error:' + error.response);
        });
    },

    popClose() {
      this.show = false;
    },
    getSchoolInfo(mincode, type) {
      SchoolService.getSchoolInfo(mincode, this.token)
        .then((response) => {
          if(type == 'schoolOfRecord'){
            this.schoolOfRecord = response.data;
          }
          if(type == 'schoolAtGrad'){
            this.schoolAtGraduation = response.data;
          }          
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log("There was an error:" + error.response);
        });
    },
    projectGraduationStatus(id) {
      //  console.log( "PROJECTED" + this.projectedStudentGradStatus);
      GraduationStatusService.getGraduationStatus(id, this.token)
        .then((response) => {
          this.projectedStudentGradStatus = response.data;
          this.projectedStudentGradStatus.studentGradData = JSON.parse(
            this.projectedStudentGradStatus.studentGradData
          );
          //console.log( "PROJECTED" + this.projectedStudentGradStatus);
          this.$bvModal.show("modal-1");
          this.showModal = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log("There was an error:" + error.response);
        });
    },
    updateGraduationStatus: function (pen) {
      // eslint-disable-next-line no-use-before-define
      GraduationService.graduateStudent(pen, this.token)
        .then((response) => {
          //console.log(response.data);
          this.$store.dispatch("setStudentGradStatus", response.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log("There was an error:" + error.response);
        });
    },
    getStudentAchievementReportPDF: function () {
      GraduationCommonService.getAchievementReport(
        this.studentGradStatus.pen,
        this.token
      )
        .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {
            type: "application/pdf",
          });
          //Build a URL from the file
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // IE
            window.navigator.msSaveOrOpenBlob(file);
          } else {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL); //Open the URL on new Window
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          //console.log('There was an error:' + error.response);
        });
    },
    getStudentTranscriptPDF: function () {
      //  console.log("transcript");
      GraduationCommonService.getStudentTranscript(
        this.studentGradStatus.pen,
        this.token
      )
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: "application/pdf",
        });
        //Build a URL from the file
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // IE
          window.navigator.msSaveOrOpenBlob(file);
        } else {
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL); //Open the URL on new Window
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:' + error.response);
      });
    },
  },
};
</script>

<style scoped>
.graduation-status table tr td{
  vertical-align:top;
  height:42px !important
}

ul.requirements-met,
ul.non-grad-reasons {
  list-style: none;
}

ul.requirements-met li,
ul.non-grad-reasons li {
  border-bottom: 1px solid #ccc;
}

.card-body {
  border-bottom: 1px solid #ccc;
}
.card {
  
  margin-bottom: 10px;
}

.card-header {
  font-weight: 700;
  
}


span.link {
  color: #1a5a96;
  text-decoration: underline;
  background-color: transparent;
}

span.link:hover {
  color: #0000f3;
  text-decoration: underline;
  cursor: pointer;
}
h5.modal-title {
  font-size: 30px !important;
}
.gradstatus-actions {
  position: absolute;
  top: 10px;
  right: 10px;
}
.edit {
  padding: 10px;
}
.form-validation-message{
  font-size: 11px;
}
.form-control:disabled{
    color: #6c757d;
    background-color: #e9ecef;
}


</style>

