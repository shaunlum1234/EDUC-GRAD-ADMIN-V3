<template>
  <div>
    <div class="row">
      <div class="col-12 m-0 p-2">
        <b-card  header="Graduation Information" class="col-12 p-0" no-body v-if="studentGradStatus != 'not loaded' && !hasGradStatus">
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
    <!-- GRAD Status View -->
    <div class="row px-2">
      <!-- Left Column -->
      <!-- <div class="col-12 px-2 col-xl-4 col-lg-7">
        <GraduationStatus></GraduationStatus>
      </div> -->
      <!-- Mid Column -->
      <!-- <div class="col-12 px-2 col-xl-4 col-lg-5">
        <NoncompletionReasons></NoncompletionReasons>
      </div> -->
      <!-- Right Column -->
      <!-- <div class="col-12 px-2 col-xl-4 col-lg-12">
        <GraduationReports></GraduationReports>         
        <CertificationDogwoods></CertificationDogwoods>
      </div> -->
      <div class="col-12 col-xl-4 col-lg-12 px-2 pb-2">
        <GraduationStatus></GraduationStatus>
      </div>
      <div class="row col-12 col-xl-8 col-lg-12 px-0 m-0">
        <div class="col-12 col-lg-6 px-2"> 
          <NoncompletionReasons></NoncompletionReasons>
        </div>
        <div class="col-12 col-lg-6 px-2"> 
          <GraduationReports></GraduationReports>         
          <CertificationDogwoods></CertificationDogwoods>
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
import GraduationService from "@/services/GraduationService.js";
import SchoolService from "@/services/SchoolService.js";
import StudentService from "@/services/StudentService.js";
import sharedMethods from '../sharedMethods';
import NoncompletionReasons from "@/components/NoncompletionReasons";
import GraduationReports from "@/components/GraduationReports";
import CertificationDogwoods from "@/components/CertificationDogwoods";
import GraduationStatus from "@/components/GraduationStatus";

export default {
  name: "StudentGraduationStatus",
  components: {
    NoncompletionReasons: NoncompletionReasons,
    GraduationReports: GraduationReports,
    CertificationDogwoods: CertificationDogwoods,
    GraduationStatus: GraduationStatus
  },
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
    ...mapGetters({
      studentGradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      studentGradRequirementCourses: "gradStatusCourses",   
      studentPen: "getStudentPen",
      studentFullName: "getStudentFullName",
      token: "getToken",
      role: "getRoles",
      programOptions: "getProgramOptions",
      studentStatusOptions: "getStudentStatusOptions",
      studentId: "getStudentId",
      username: "getUsername",
      certificates: "getStudentCertificates",  
      reports: "getStudentReports",
      transcripts: "getStudentTranscripts"
    }),
  },
  data() {
    return {
      programCompletionEffectiveDateList:[],
      programCompletionDateRangeError:false,
      programChangeWarning:false,
      programEffectiveDate: "",
      programExpiryDate: "", 
      errorMessage:"",
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
      schoolOfRecordMissing: false,
      schoolOfRecordWarning: false,
      schoolNotFoundWarning: false,
      schoolOfRecordInputWarning: false,
      schoolFound: false,
      schoolAtGradProgramCompletionDateMessage: false,
      schoolAtGraduation: "",
      schoolAtGraduationStatus:"",
      schoolAtGraduationWarning: false,
      schoolAtGraduationNotFoundWarning:false,
      schoolAtGraduationInputWarning:false,
      schoolAtGraduationFound: false,
      programDropdownList: [],
      editedGradStatus: {},
      studentUngradReason: "",
      disableButton:false,
      disableSchoolAtGrad:false,
      disableStudentStatus:false,
    };
  },
  created() {
    this.programDropdownList = this.$store.dispatch("getGraduationPrograms");
    this.disableButton = false;
    this.showNotification = sharedMethods.showNotification;
  },
  mounted(){
  },
  watch:{
    studentGradeChange:function(){
      if(this.editedGradStatus.studentGrade == 'AD' || this.editedGradStatus.studentGrade == 'AN'){
        if(this.editedGradStatus.program == '1950'){
          if (this.editedGradStatus.schoolOfRecord == ""){
            this.schoolOfRecordMissing = true;
            this.disableButton = true;
          } else {
            this.schoolOfRecordMissing = false;
            this.disableButton = false;
          }
        }
        if(this.editedGradStatus.program != '1950'){
          this.disableButton = true;
        }
      }
      if(this.editedGradStatus.studentGrade != 'AD' && this.editedGradStatus.studentGrade != 'AN'){

        if(this.editedGradStatus.program == '1950'){
          this.disableButton = true;
        } else {
          if(this.editedGradStatus.schoolOfRecord == "") {
            this.schoolOfRecordMissing = true;
            this.disableButton = true;
          } else {
            this.schoolOfRecordMissing = false;
            this.disableButton = false;
          }        
        }
        if(this.editedGradStatus.schoolOfRecord == ""){
          this.schoolOfRecordMissing = true;
          this.disableButton = true;
        } else {
          this.schoolOfRecordMissing = false;
          this.disableButton = false;
        }
      }
    },
    programChange:function(){
       if(this.editedGradStatus.program == '1950'){
        if(this.editedGradStatus.studentGrade == 'AD' || this.editedGradStatus.studentGrade == 'AN'){
          this.disableButton = false;
        }else{
          this.disableButton = true;
        }
      }
  
      if(this.editedGradStatus.program != '1950'){
        if(this.editedGradStatus.studentGrade == 'AD' || this.editedGradStatus.studentGrade == 'AN'){
          this.disableButton = true;
        }else{
          this.disableButton = false;
        }
      }
      this.programChangeWarning = true;
    },
    programCompletionDateChange:function(){
      var programNameSearch = this.editedGradStatus.program;
      for (var i=0 ; i < this.programOptions.length ; i++)
      {
          if (this.programOptions[i].programCode == programNameSearch) {
              this.programCompletionEffectiveDateList.push(this.programOptions[i]);
          }
          
      }
      this.programEffectiveDate = this.programCompletionEffectiveDateList[0].effectiveDate
      this.programExpiryDate = this.programCompletionEffectiveDateList[0].expiryDate

      if(this.editedGradStatus.programCompletionDate == ""){
        if(this.editedGradStatus.program == 'SCCP'){
          this.disableButton = false;
        } else {
          this.disableSchoolAtGrad = true;
          this.disableButton = true;
        }
        
      } else {
        if(this.editedGradStatus.programCompletionDate > this.programExpiryDate || this.editedGradStatus.programCompletionDate < this.programEffectiveDate)
        {
          this.disableButton = true;
          this.programCompletionDateRangeError = true;
        } else {
          this.programCompletionDateRangeError = false;
          this.disableButton = false;
        }
      }
    },
    schoolOfRecordChange:function(){
      if (this.editedGradStatus.schoolOfRecord.length == ""){
        this.disableButton = true;
      }else {
        this.schoolOfRecordMissing = false;
        this.disableButton = false;
      }
      if (this.editedGradStatus.schoolOfRecord.length < 8){
          this.schoolOfRecordWarning = false;
          this.schoolNotFoundWarning = false;
          this.schoolOfRecordInputWarning = true;
          return;
      }
      if(this.editedGradStatus.schoolOfRecord == this.studentGradStatus.schoolOfRecord){  
      this.schoolOfRecordWarning = false;
      this.schoolNotFoundWarning = false;
      this.schoolOfRecordInputWarning = false;
      this.schoolFound = false;
      } else {
        if(this.editedGradStatus.schoolOfRecord.length == 8) {
          this.schoolNotFoundWarning = false;
          this.schoolOfRecordWarning = false;
          this.schoolOfRecordInputWarning = false;
          this.schoolFound = false;
          SchoolService.getSchoolInfo(this.editedGradStatus.schoolOfRecord, this.token)
          .then((response) => {
            this.schoolOfRecordStatus = response.data.openFlag
            if(response.statusText == "No Content"){
              this.schoolNotFoundWarning = true;
            }else {
              this.schoolNotFoundWarning = false; 
              if(this.schoolOfRecordStatus == "N"){
                this.schoolOfRecordWarning = true;
              }
              this.schoolFound = true;
              this.editedGradStatus.schoolName = response.data.schoolName;
            }    
          })
          .catch((error) => {
            this.showNotification("danger", error.response);
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
        this.schoolAtGraduationInputWarning = true;
        this.schoolAtGraduationFound= false;
        return;
      }else{
        this.schoolAtGraduationInputWarning = false;
      }      
      if(this.editedGradStatus.schoolAtGrad == this.studentGradStatus.schoolAtGrad){  
        this.schoolAtGraduationWarning = false;
        this.schoolAtGraduationNotFoundWarning = false;
        this.schoolAtGraduationInputWarning = false;
        this.schoolAtGraduationFound= false;
      }else{
         if(this.editedGradStatus.schoolAtGrad.length == 8) {
          this.schoolAtGraduationNotFoundWarning = false;  
          this.schoolAtGraduationWarning = false;
          this.schoolAtGraduationInputWarning = false;
          this.schoolAtGraduationFound= false;
          SchoolService.getSchoolInfo(this.editedGradStatus.schoolAtGrad, this.token)
          .then((response) => {         
            this.schoolAtGraduationStatus = response.data.openFlag
            if(response.statusText == "No Content"){
              this.schoolAtGraduationNotFoundWarning = true;
            }else{
              this.schoolAtGraduationNotFoundWarning = false;
              if(this.schoolAtGraduationStatus == "N"){
                this.schoolAtGraduationWarning = true;
              }
              this.schoolAtGraduationFound= true;
              this.editedGradStatus.schoolAtGradName = response.data.schoolName;
            }
          })
          .catch((error) => {
            this.showNotification("danger", error.response);        
          });
        } else {
          this.schoolAtGraduationInputWarning = true;
        }
      } 
    }  
  },
  methods: {
    getStudentStatus(code) {
      for (var i = 0; i <= this.studentStatusOptions.length; i++) {
        if (this.studentStatusOptions[i].code == code) {
          return this.studentStatusOptions[i].label;
        }
      }
      return "";
    },
    reactivateStudentRecord(){
        this.editedGradStatus.studentStatus = "A";
        this.saveGraduationStatus(this.studentId);
        this.showNotification("success", "Student Record re-activated.");
    },
    ungradStudent(){
      StudentService.ungradStudent(
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
        this.showNotification(
          "danger",
          "There was an error: " + error.response.data.messages[0].message
        );
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

      StudentService.editGraduationStatus(
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
        //Update the student audit history
        this.$store.dispatch("updateStudentAuditHistory");
        this.showNotification("success", "GRAD Status Saved");
      })
      .catch((error) => {
        if(this.editedGradStatus.programCompletionDate != null){
          this.editedGradStatus.programCompletionDate = this.editedGradStatus.programCompletionDate.replace("-", "/").substring(0, 7);
        }         
        if(error.response.data){
          if(error.response.data.messages){
            this.errorMessage = error.response.data.messages[0].message;
          }
        }
        this.showNotification(
          "danger",
          this.errorMessage
        );
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
      StudentService.getGraduationStatus(id, this.token)
      .then((response) => {
        this.projectedStudentGradStatus = response.data;
        this.projectedStudentGradStatus.studentGradData = JSON.parse(
          this.projectedStudentGradStatus.studentGradData
        );
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
        this.$store.dispatch("setStudentGradStatus", response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log("There was an error:" + error.response);
      });
    },
  },
};
</script>

<style scoped>
.pdf-link::before{
   font-family: "Font Awesome 5 Free", sans-serif; 
   font-weight: 900;
   content: "\f15b";
   padding-right:10px
}
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
  color: #666;
}

</style>

