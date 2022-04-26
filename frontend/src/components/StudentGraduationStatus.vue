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
      <div class="col-12 col-xl-4 col-lg-12 px-2 pb-2">
        <GRADStatus></GRADStatus>
      </div>
      <div class="row col-12 col-xl-8 col-lg-12 px-0 m-0">
        <div class="col-12 col-lg-6 px-2"> 
          <NoncompletionReasons></NoncompletionReasons>
        </div>
        <div class="col-12 col-lg-6 px-2"> 
          <StudentGraduationReports></StudentGraduationReports>         
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
//import GraduationService from "@/services/GraduationService.js";
//import SchoolService from "@/services/SchoolService.js";
//import StudentService from "@/services/StudentService.js";
import sharedMethods from '../sharedMethods';
import NoncompletionReasons from "@/components/GraduationStatus/NoncompletionReasons";
import StudentGraduationReports from "@/components/GraduationStatus/StudentGraduationReports";
import CertificationDogwoods from "@/components/CertificationDogwoods";
import GRADStatus from "@/components/GraduationStatus/GRADStatus";

export default {
  name: "StudentGraduationStatus",
  components: {
    NoncompletionReasons: NoncompletionReasons,
    StudentGraduationReports: StudentGraduationReports,
    CertificationDogwoods: CertificationDogwoods,
    GRADStatus: GRADStatus
  },
  computed: {
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
      programDropdownList: [],
      disableButton:false,
    };
  },
  created() {
    this.programDropdownList = this.$store.dispatch("getGraduationPrograms");
    this.disableButton = false;
    this.showNotification = sharedMethods.showNotification;
  },
  methods: {
    getStudentStatus(code) {
      return sharedMethods.getStudentStatus(code, this.studentStatusOptions);
    },
    // ungradStudent(){
    //   StudentService.ungradStudent(
    //     this.studentId,
    //     this.studentUngradReason,
        
    //     this.token,this.editedGradStatus
    //   )
    //   .then((response) => {
    //     this.updateStatus = response.data;
    //     this.studentGradStatus.pen = response.data.pen;
    //     this.studentGradStatus.program = response.data.program;
    //     this.studentGradStatus.programCompletionDate = response.data.programCompletionDate;
    //     this.studentGradStatus.honoursStanding = response.data.honoursStanding;
    //     this.studentGradStatus.gpa = response.data.gpa;
    //     this.studentGradStatus.studentGrade = response.data.studentGrade;
    //     this.studentGradStatus.schoolOfRecord = response.data.schoolOfRecord;
    //     this.studentGradStatus.studentStatus = response.data.studentStatus;
    //     this.studentGradStatus.studentStatusName = this.getStudentStatus(
    //       response.data.studentStatus
    //     );
    //     this.studentGradStatus.schoolAtGrad = response.data.schoolAtGrad;

    //     this.showTop = !this.showTop;
    //     this.showEdit = false;

    //     this.showNotification("success", "GRAD Status Saved");      
    //   })
    //   .catch((error) => {
    //     this.showNotification(
    //       "danger",
    //       "There was an error: " + error.response.data.messages[0].message
    //     );
    //   });
    // },
    
    // popClose() {
    //   this.show = false;
    // },

    // getSchoolInfo(mincode, type) {
    //   SchoolService.getSchoolInfo(mincode, this.token)
    //   .then((response) => {
    //     if(type == 'schoolOfRecord'){
    //       this.schoolOfRecord = response.data;
    //     }
    //     if(type == 'schoolAtGrad'){
    //       this.schoolAtGraduation = response.data;
    //     }          
    //   })
    //   .catch((error) => {
    //     // eslint-disable-next-line
    //     console.log("There was an error:" + error.response);
    //   });
    // },
    // projectGraduationStatus(id) {
    //   StudentService.getGraduationStatus(id, this.token)
    //   .then((response) => {
    //     this.projectedStudentGradStatus = response.data;
    //     this.projectedStudentGradStatus.studentGradData = JSON.parse(
    //       this.projectedStudentGradStatus.studentGradData
    //     );
    //     this.$bvModal.show("modal-1");
    //     this.showModal = true;
    //   })
    //   .catch((error) => {
    //     // eslint-disable-next-line
    //     console.log("There was an error:" + error.response);
    //   });
    // },
    // updateGraduationStatus: function (pen) {
    //   // eslint-disable-next-line no-use-before-define
    //   GraduationService.graduateStudent(pen, this.token)
    //   .then((response) => {
    //     this.$store.dispatch("setStudentGradStatus", response.data);
    //   })
    //   .catch((error) => {
    //     // eslint-disable-next-line
    //     console.log("There was an error:" + error.response);
    //   });
    // },
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

