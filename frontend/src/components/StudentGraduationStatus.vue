<template>

  <div class="p-2">
    <div class="row">

    </div>
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
      <div class="col-12 pr-0 col-md-7 ">

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
                      <b-button  :disabled="disableSaveButton" v-on:click="saveGraduationStatus(studentId)" size="sm" variant="primary">Save</b-button>

                      <b-button v-on:click="cancelGradStatus"  size="sm" variant="outline-primary">Cancel</b-button>
                    </b-button-group>
                    <!--b-btn :disabled="disableButton" v-on:click="saveGraduationStatus(studentId)" size="sm" variant="primary">
                        Save 
                    </b-btn>
                    <b-btn v-on:click="cancelGradStatus"  size="sm" variant="outline-primary">
                      Cancel
                    </b-btn-->
                  </div>
                </b-button-group>
                <!-- <div v-if="studentGradStatus && studentGradStatus.programCompletionDate && showEdit">
                  <b-alert show variant="warning" class="p-3">
                    <h4 class="alert-heading">Student status: Graduated</h4>
                    <p class="mb-0">
                      <strong>Reason to unlock:</strong><b-form-select  size="sm" v-model="studentUngradReason" :options="ungradReasons" text-field="description" value-field="code"></b-form-select>
                      <b-button :disabled='!studentUngradReason' @click="ungradStudent" variant="primary" size="sm" class="mt-2">Unlock Student</b-button>
                    </p>
                  </b-alert>
                </div> -->

                <div v-if="studentGradStatus && studentGradStatus.studentStatus == 'N' && showEdit">
                  <b-alert show variant="warning" class="p-3 mb-1">
                    <h4 class="alert-heading">Student status: Not active</h4>
                    <p class="locked-message">
                      This student's status is set to 'Not active'. Re-activate their record by setting their 'Student status' to 'Active' if they are enrolled in a school.
                    </p>
                  </b-alert>
                </div>    
                <div v-else-if="studentGradStatus && studentGradStatus.studentStatus == 'T' && showEdit">
                  <b-alert show variant="warning" class="p-3 mb-1">
                    <h4 class="alert-heading">Student status: Terminated</h4>
                    <p class="locked-message">
                      This student's status is set to 'Terminated'. Re-activate their record by setting their 'Student status' to 'Active' if they are enrolled in a school.
                    </p>
                  </b-alert>
                </div>    
                <div v-else-if="studentGradStatus && studentGradStatus.studentStatus == 'D' && showEdit">
                  <b-alert show variant="info" class="p-3 mb-1">
                    <h4 class="alert-heading">Student status: Deceased</h4>
                    <p class="locked-message">
                      This student's status is set to 'Deceased'. Their data cannot be changed.
                    </p>
                  </b-alert>
                </div>          
                <div v-else-if="studentGradStatus && studentGradStatus.studentStatus == 'M' && showEdit">
                  <b-alert show variant="info" class="p-3 mb-1">
                    <h4 class="alert-heading">Student status: Merged</h4>
                    <p class="locked-message">
                      This student's status is set to 'Merged'. Their data cannot be changed.
                    </p>
                  </b-alert>
                </div>          
                <div v-else-if="studentGradStatus && recalculateFlag">
                  <b-alert show variant="info" class="p-3 mb-1">
                    <h4 class="alert-heading">Grad Status has been updated</h4>
                    <p class="locked-message">
                      Run the graduation algorithm (graduate student) to update the GRAD status
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
                    <td width="50%"><b-form-select :disabled="disableInput || studentGradStatus.programCompletionDate !== null" size="sm" v-model="editedGradStatus.program" :options="programOptions"></b-form-select></td>   
                    
                  </tr>

                  <tr v-if="!showEdit">
                    <td><strong>Program completion date: </strong></td>
                    <td>{{ studentGradStatus.programCompletionDate }}</td>
                  </tr>
            
                  <tr v-if="showEdit">
                    <td><strong>Program completion date: (YYYY/MM)</strong></td>
                    <td><b-input :disabled="disableInput" size="sm" type="text" maxLength="7" @keyup="dateFormat()" v-model='editedGradStatus.programCompletionDate'></b-input></td>
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
                      class="p-0 text-left"
                      id="school-of-record-popover" 
                      variant="link" 
                      @click="getSchoolInfo(studentGradStatus.schoolOfRecord, 'schoolOfRecord')"> 
                      {{studentGradStatus.schoolName}}<br>
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
                        <div v-if="schoolNotFoundWarning" class="form-validation-message text-danger" >Invalid school entered, school does not exist on the school table&nbsp;&nbsp;<i class="fas fa-exclamation-triangle"></i></div>
                        
                      </td>
                      <td><b-input :disabled="disableInput" size="sm" type="number" maxlength="8" minength="8" v-model='editedGradStatus.schoolOfRecord'></b-input></td>
                      
                  </tr>
                  <tr v-if="!showEdit">
                    <td><strong>School at graduation: </strong></td>
                    <td><b-button v-if="studentGradStatus && studentGradStatus.schoolAtGrad" 
                      class="p-0 text-left"
                      id="school-at-graduation-popover"
                      variant="link" 
                      @click="getSchoolInfo(studentGradStatus.schoolAtGrad, 'schoolAtGrad')"> 
                      {{studentGradStatus.schoolAtGradName}}<br>
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
                      <td><strong>School at graduation:</strong><br>
                      <div v-if="schoolAtGraduationWarning" class="form-validation-message text-warning" >School at graduation entered is closed&nbsp;&nbsp;<i class="fas fa-exclamation-triangle"></i></div>
                      <div v-if="schoolAtGradProgramCompletionDateMessage" class="form-validation-message text-danger" >If program completion date is not blank, school at graduation cannot be blank&nbsp;&nbsp;<i class="fas fa-exclamation-triangle"></i></div>
                        <div v-if="schoolAtGraduationNotFoundWarning" class="form-validation-message text-warning" >Invalid school entered, school does not exist on the school table&nbsp;&nbsp;<i class="fas fa-exclamation-triangle"></i></div>
                        </td>
                      <td><b-input :disabled="disableSchoolAtGrad" size="sm" type="number" maxlength="8" v-model='editedGradStatus.schoolAtGrad'></b-input></td>        
                    </tr>        
                    <tr>
                      <td><strong>Honours:</strong></td>
                      <td><span v-if="studentGradStatus.honoursStanding"> {{ studentGradStatus.honoursStanding }}</span></td>
                    </tr>
                    <tr>
                      <td><strong>GPA:</strong></td><td><span v-if="studentGradStatus.gpa && studentGradStatus.gpa > 0 ">{{ studentGradStatus.gpa }}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Optional Programs</strong></td>
                      <td >
                         <!-- OPTIONAL PROGRAMS -->                      
                          <ul class="p-0" v-if="specialPrograms[0] && specialPrograms[0].studentSpecialProgramData" id="optional-programs">
                            <li v-for="item in specialPrograms" :key="item.specialProgramCode">
                              {{ item.specialProgramName }}
                            </li>
                          </ul>
                      </td>
                    </tr>
                
                    </tbody>
                  </table> 
              </b-card-text>
            </b-card>
            
         
          </div> 
 


          <!-- GRADUATION REPORTS -->
          <div class="graduation-reports">
            <b-card
              header="Student Reports"
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

          <!-- CERTIFICATION DOGWOODS -->           
          <div class="certification-dogwoods">
            <b-card
              header="Student Certificates/Dogwoods"
              no-body
             
            >
              <b-card-text class="p-4">
                    {{certificates}}

              </b-card-text>
            </b-card> 
          </div>           
      </div>
      <!-- Right Column -->
      <div class="col-12 pl-3 col-md-5"> 

        <div class="requirements-met-and-not-met">
          <div class="requirements-not-met">
            <b-card
              header="Nongrad Reasons"
              class="w-100"
            >
              <b-card-text v-if="studentGradStatus.studentGradData">

                <div v-if="!nongradReasons">
                  <ul>
                    <li>All graduation requirements have been met</li>
                  </ul>
                </div>
                <div v-else>
                   
                  <b-table :items="nongradReasons" :fields="nongradReasonsFields" small
                  striped>

                  </b-table> 
       
                </div>
              </b-card-text>
            </b-card>
          </div>
          <div class="requirements-met">
             
            <b-card
              header="Requirements met"
              v-if="studentGradStatus.studentGradData"
              no-body
              class="w-100"
            >
              <b-card-text class=" m-3">
               <b-table :items="requirementsMet"  small
                  striped></b-table> 

                <!-- <b-table
                  v-if="requirementsMet"  
                  :items="requirementsMet"
                  small
                  striped
                  filter=null
                  class="requirements-met">  
                </b-table> -->
                
              </b-card-text>
            </b-card>
           
          </div>

          
     
        </div>
      </div>
    </div>

    <div v-if="role == 'administrator'">
      <b-button v-b-toggle.collapse-1 variant="primary">DEBUG</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
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
    recalculateFlag(){
      return this.studentGradStatus.recalculateGradStatus; 
    },
    disableSaveButton(){
      return this.studentGradStatus.studentStatus == "D" || this.disableButton
    },
    ...mapGetters({
      studentGradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      studentGradRequirementCourses: "gradStatusCourses",
      nongradReasons: "getNongradReasons",
      requirementsMet: "getRequirementsMet",      
      studentPen: "getStudentPen",
      studentFullName: "getStudentFullName",
      token: "getToken",
      role: "getRoles",
      specialPrograms: "getStudentSpecialPrograms",
      programOptions: "getProgramOptions",
      studentStatusOptions: "getStudentStatusOptions",
      studentId: "getStudentId",
      username: "getUsername"
    }),
  },
  data() {
    return {
      requirementsMetfields: [
        { key: "rule", label: "Rule", sortable: true },        
        { key: "description", label: "Requirement Name", sortable: true },
      ],
      nongradReasonsfields: [
        { key: "rule", label: "Rule" },
        { key: "description", label: "Requirement Name", sortable: true },
      ],
      specialProgramsfields: [
        { key: "specialProgramCode", label: "Code", class: "text-center"},
        { key: "specialProgramName", label: "Special program" },
        { key: "specialProgramCompletionDate", label: "Date" },
      ],
      certificates:[],
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
      schoolNotFoundWarning: false,
      schoolAtGradProgramCompletionDateMessage: false,
      schoolAtGraduation: "",
      schoolAtGraduationStatus:"",
      schoolAtGraduationWarning: false,
      schoolAtGraduationNotFoundWarning:false,
      programDropdownList: [],
      editedGradStatus: {},
      studentUngradReason: "",
      disableButton:false,
      disableSchoolAtGrad:false,
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
        this.disableSchoolAtGrad = true;
      }
    },
    schoolOfRecordChange:function(){

      //changed due to GRADT-25
      if (this.editedGradStatus.schoolOfRecord.length == ""){
        this.disableButton = true;
      }
      if (this.editedGradStatus.schoolOfRecord.length < 8){
          this.schoolOfRecordWarning = false;
          this.schoolNotFoundWarning = false;
          return;
      }
      if(this.editedGradStatus.schoolOfRecord == this.studentGradStatus.schoolOfRecord){  
      this.schoolOfRecordWarning = false;
      this.schoolNotFoundWarning = false;
      } else {
        if(this.editedGradStatus.schoolOfRecord.length == 8) {
          SchoolService.getSchoolInfo(this.editedGradStatus.schoolOfRecord, this.token)
          .then((response) => {
            this.schoolNotFoundWarning = false;
            this.schoolOfRecordWarning = false;
            this.schoolOfRecordStatus = response.data.openFlag
            if(response.statusText == "No Content"){
              this.schoolNotFoundWarning = true;
            }else {
              this.schoolNotFoundWarning = false; 
              if(this.schoolOfRecordStatus == "N"){
                this.schoolOfRecordWarning = true;
              }
              this.editedGradStatus.schoolName = response.data.schoolName;
            }    
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log("There was an error:" + error.response);
          });
        } else {
            this.schoolNotFoundWarning = true;
        }
      }
    },
    schoolAtGradChange:function(){

      if(this.editedGradStatus.schoolAtGrad == ""){
        if(this.editedGradStatus.programCompletionDate != ""){  
          this.disableButton = true;
          this.schoolAtGradProgramCompletionDateMessage = true;      
        }else{
          this.disableButton = false;
          this.schoolAtGradProgramCompletionDateMessage = false;    
        }
      }else{
        this.disableButton = false;
        this.schoolAtGradProgramCompletionDateMessage = false;
      }
     
      if(this.editedGradStatus.schoolAtGrad && this.editedGradStatus.schoolAtGrad.length < 8){
        this.schoolAtGraduationWarning = false;
        this.schoolAtGraduationNotFoundWarning = false;
        return;
      }      
      if(this.editedGradStatus.schoolAtGrad == this.studentGradStatus.schoolAtGrad){  
        this.schoolAtGraduationWarning = false;
        this.schoolAtGraduationNotFoundWarning = false;
      }else{
         if(this.editedGradStatus.schoolAtGrad.length == 8) {
          SchoolService.getSchoolInfo(this.editedGradStatus.schoolAtGrad, this.token)
          .then((response) => {
            this.schoolAtGraduationNotFoundWarning = false;  
            this.schoolAtGraduationWarning = false;
            this.schoolAtGraduationStatus = response.data.openFlag
            if(response.statusText == "No Content"){
              this.schoolAtGraduationNotFoundWarning = true;
            }else{
              this.schoolAtGraduationNotFoundWarning = false;
              if(this.schoolAtGraduationStatus == "N"){
                this.schoolAtGraduationWarning = true;
                //this.showNotification("warning", "School at graduation closed");
              }
              this.editedGradStatus.schoolAtGradName = response.data.schoolName;
            }
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log("There was an error:" + error.response);
          });
        } else {
          this.schoolAtGraduationNotFoundWarning = true;
        }
      } 
    }  
  },
  methods: {
    dateFormat(){
      var value = this.editedGradStatus.programCompletionDate;    
      this.editedGradStatus.programCompletionDate = value.replace(/^([\d]{4})([\d]{2})$/,"$1/$2");        
     
    },
    getStudentStatus(code) {
      var i = 0;
      for (i = 0; i <= this.studentStatusOptions.length; i++) {
        if (this.studentStatusOptions[i].value == code) {
          return this.studentStatusOptions[i].text;
        }
      }
      return "";
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
        this.saveGraduationStatus(this.studentId);
        this.showNotification(
               "success",
               "Student Record re-activated."
             );
        },
    editGradStatus() {
      //If the student has a programCompletionDate disable input fields
      this.schoolOfRecordWarning = false;
      this.schoolNotFoundWarning = false;
      if(this.studentGradStatus.programCompletionDate != null){
        this.disableInput = false;
        this.disableSchoolAtGrad = false;
        this.disableStudentStatus = false;
      }else{
        // changed state for bug GRADT-19
        this.disableInput = true;
        this.disableStudentStatus = false;
        this.disableSchoolAtGrad = true;
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
        this.$set(this.editedGradStatus, 'programCompletionDate', this.studentGradStatus.programCompletionDate);
      }else{
        this.$set(this.editedGradStatus, 'programCompletionDate', null);
      }
      this.$set(this.editedGradStatus, 'pen', this.studentGradStatus.pen);
      this.$set(this.editedGradStatus, 'program', this.studentGradStatus.program);
      this.$set(this.editedGradStatus, 'studentGrade', this.studentGradStatus.studentGrade);
      this.$set(this.editedGradStatus, 'schoolName', this.studentGradStatus.schoolName);
      this.$set(this.editedGradStatus, 'schoolOfRecord', this.studentGradStatus.schoolOfRecord);
      this.$set(this.editedGradStatus, 'schoolAtGrad', this.studentGradStatus.schoolAtGrad);
      this.$set(this.editedGradStatus, 'schoolAtGradName', this.studentGradStatus.schoolAtGradName);
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
    saveGraduationStatus(id) {
      //add the user info
      this.editedGradStatus.updatedBy = this.username;
      this.editedGradStatus.studentID = id;
      this.editedGradStatus.pen = this.studentPen;
      //process the program completion date
      if(this.editedGradStatus.programCompletionDate == ''){
        this.editedGradStatus.programCompletionDate = null;
      }
      if(this.editedGradStatus.programCompletionDate != null){
        this.editedGradStatus.programCompletionDate = this.editedGradStatus.programCompletionDate.replace("/", "-");
        var date;
        try{
          date = new Date(this.editedGradStatus.programCompletionDate);
          this.editedGradStatus.programCompletionDate = date.toISOString().split('T')[0];
        }catch(error){
          // eslint-disable-next-line
          console.log(error);
        }
      }
      if(this.editedGradStatus.schoolOfRecord == ''){
        this.editedGradStatus.schoolOfRecord = null;
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
          this.studentGradStatus.schoolName = this.editedGradStatus.schoolName;
          this.studentGradStatus.schoolOfRecord = response.data.schoolOfRecord;
          this.studentGradStatus.schoolAtGradName = this.editedGradStatus.schoolAtGradName;
          this.studentGradStatus.schoolAtGrad = response.data.schoolAtGrad;
          this.studentGradStatus.studentStatus = response.data.studentStatus;
          this.studentGradStatus.recalculateGradStatus = response.data.recalculateGradStatus;
          this.studentGradStatus.updatedTimestamp = response.data.updatedTimestamp;
          this.studentGradStatus.studentStatusName = this.getStudentStatus(
            response.data.studentStatus
          );         
          this.showTop = !this.showTop;
          this.showEdit = false;
          this.showNotification("success", "GRAD Status Saved");
        })
        .catch((error) => {
          if(this.editedGradStatus.programCompletionDate != null){
            this.editedGradStatus.programCompletionDate = this.editedGradStatus.programCompletionDate.replace("-", "/").substring(0, 7);
          }         
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
        this.studentId,
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
        this.studentId,
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

#actions{
  position: absolute;
  z-index: 20;
  right: 10px;
  top: -55px;
  text-decoration: none !important;  
}

</style>

